package io.github.genomiskdiagnostik.sendtog2.api

import java.io.BufferedInputStream
import java.io.BufferedOutputStream
import java.nio.charset.StandardCharsets
import java.security.MessageDigest
import java.util.Base64
import java.util.Locale
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.Serializable
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

@Serializable
internal data class WebSocketApiRequest(
    val id: Int,
    val method: String,
    val path: String,
    val accessKey: String? = null,
    val body: String = "",
)

@Serializable
internal data class WebSocketApiResponse(
    val id: Int,
    val status: Int,
    val body: String = "",
)

internal class LocalApiWebSocketSession(
    private val router: LocalApiRouter,
) {
    private val json = Json {
        encodeDefaults = true
        explicitNulls = false
        ignoreUnknownKeys = false
    }

    fun isUpgrade(request: ApiRequest): Boolean =
        request.method == "GET" &&
            request.header("upgrade")?.equals("websocket", ignoreCase = true) == true &&
            request.header("connection")
                ?.split(',')
                ?.any { it.trim().equals("upgrade", ignoreCase = true) } == true &&
            request.header("sec-websocket-version") == "13" &&
            isValidKey(request.header("sec-websocket-key"))

    fun run(
        request: ApiRequest,
        input: BufferedInputStream,
        output: BufferedOutputStream,
    ) {
        writeHandshake(output, request.header("sec-websocket-key")!!)
        val frame = try {
            readFrame(input)
        } catch (_: Exception) {
            writeApiResponse(output, WebSocketApiResponse(0, 400, BAD_REQUEST_BODY))
            return
        }

        when (frame.opcode) {
            OPCODE_CLOSE -> writeFrame(output, OPCODE_CLOSE, frame.payload)
            OPCODE_PING -> writeFrame(output, OPCODE_PONG, frame.payload)
            OPCODE_TEXT -> route(frame, request.remoteAddress, output)
            else -> writeClose(output, CLOSE_UNSUPPORTED_DATA)
        }
    }

    private fun route(
        frame: WebSocketFrame,
        remoteAddress: String?,
        output: BufferedOutputStream,
    ) {
        val envelope = try {
            json.decodeFromString<WebSocketApiRequest>(
                frame.payload.toString(StandardCharsets.UTF_8),
            )
        } catch (_: Exception) {
            writeApiResponse(output, WebSocketApiResponse(0, 400, BAD_REQUEST_BODY))
            return
        }

        if (
            envelope.id < 0 ||
            envelope.method.length > MAX_METHOD_LENGTH ||
            envelope.path.length > MAX_PATH_LENGTH ||
            !envelope.path.startsWith('/') ||
            envelope.accessKey?.length?.let { it > MAX_ACCESS_KEY_LENGTH } == true ||
            envelope.body.toByteArray(StandardCharsets.UTF_8).size > MAX_BODY_BYTES
        ) {
            writeApiResponse(output, WebSocketApiResponse(envelope.id, 400, BAD_REQUEST_BODY))
            return
        }

        val headers = buildMap {
            put(LocalApiDiagnostics.CLIENT_HEADER, LocalApiDiagnostics.EVEN_HUB_CLIENT)
            envelope.accessKey
                ?.takeIf(String::isNotBlank)
                ?.let { put("authorization", "Bearer $it") }
        }
        val apiResponse = try {
            runBlocking {
                router.route(
                    ApiRequest(
                        method = envelope.method.uppercase(Locale.ROOT),
                        path = envelope.path.substringBefore('?'),
                        headers = headers,
                        body = envelope.body,
                        remoteAddress = remoteAddress,
                    ),
                )
            }
        } catch (_: Exception) {
            ApiResponse(status = 500, body = INTERNAL_ERROR_BODY)
        }
        writeApiResponse(
            output,
            WebSocketApiResponse(envelope.id, apiResponse.status, apiResponse.body),
        )
    }

    private fun readFrame(input: BufferedInputStream): WebSocketFrame {
        val first = readRequired(input)
        val second = readRequired(input)
        val finalFrame = first and 0x80 != 0
        val reservedBits = first and 0x70
        val masked = second and 0x80 != 0
        if (!finalFrame || reservedBits != 0 || !masked) throw WebSocketProtocolException()

        val length = when (val shortLength = second and 0x7f) {
            in 0..125 -> shortLength.toLong()
            126 -> readUnsigned(input, 2)
            else -> readUnsigned(input, 8)
        }
        if (length > MAX_INCOMING_FRAME_BYTES) throw WebSocketProtocolException()

        val mask = readBytes(input, 4)
        val payload = readBytes(input, length.toInt())
        payload.indices.forEach { index ->
            payload[index] = (payload[index].toInt() xor mask[index % mask.size].toInt()).toByte()
        }
        return WebSocketFrame(first and 0x0f, payload)
    }

    private fun writeHandshake(output: BufferedOutputStream, key: String) {
        val digest = MessageDigest.getInstance("SHA-1").digest(
            (key.trim() + WEBSOCKET_GUID).toByteArray(StandardCharsets.US_ASCII),
        )
        val accept = Base64.getEncoder().encodeToString(digest)
        val response = buildString {
            append("HTTP/1.1 101 Switching Protocols\r\n")
            append("Upgrade: websocket\r\n")
            append("Connection: Upgrade\r\n")
            append("Sec-WebSocket-Accept: $accept\r\n")
            append("Cache-Control: no-store\r\n")
            append("\r\n")
        }
        output.write(response.toByteArray(StandardCharsets.US_ASCII))
        output.flush()
    }

    private fun isValidKey(value: String?): Boolean = try {
        value != null && Base64.getDecoder().decode(value.trim()).size == 16
    } catch (_: IllegalArgumentException) {
        false
    }

    private fun writeApiResponse(
        output: BufferedOutputStream,
        response: WebSocketApiResponse,
    ) {
        writeFrame(
            output,
            OPCODE_TEXT,
            json.encodeToString(response).toByteArray(StandardCharsets.UTF_8),
        )
    }

    private fun writeClose(output: BufferedOutputStream, status: Int) {
        writeFrame(
            output,
            OPCODE_CLOSE,
            byteArrayOf((status ushr 8).toByte(), status.toByte()),
        )
    }

    private fun writeFrame(
        output: BufferedOutputStream,
        opcode: Int,
        payload: ByteArray,
    ) {
        output.write(0x80 or opcode)
        when {
            payload.size <= 125 -> output.write(payload.size)
            payload.size <= 0xffff -> {
                output.write(126)
                output.write(payload.size ushr 8)
                output.write(payload.size)
            }
            else -> {
                output.write(127)
                for (shift in 56 downTo 0 step 8) {
                    output.write(payload.size.toLong().ushr(shift).toInt())
                }
            }
        }
        output.write(payload)
        output.flush()
    }

    private fun readUnsigned(input: BufferedInputStream, byteCount: Int): Long {
        var value = 0L
        repeat(byteCount) {
            val next = readRequired(input)
            if (value > (MAX_INCOMING_FRAME_BYTES.toLong() ushr 8)) {
                throw WebSocketProtocolException()
            }
            value = (value shl 8) or next.toLong()
        }
        return value
    }

    private fun readBytes(input: BufferedInputStream, count: Int): ByteArray {
        val result = ByteArray(count)
        var offset = 0
        while (offset < count) {
            val read = input.read(result, offset, count - offset)
            if (read == -1) throw WebSocketProtocolException()
            offset += read
        }
        return result
    }

    private fun readRequired(input: BufferedInputStream): Int =
        input.read().takeIf { it >= 0 } ?: throw WebSocketProtocolException()

    private fun ApiRequest.header(name: String): String? =
        headers[name.lowercase(Locale.ROOT)]

    private data class WebSocketFrame(val opcode: Int, val payload: ByteArray)
    private class WebSocketProtocolException : Exception()

    companion object {
        const val PATH = "/even-hub-ws"
        private const val WEBSOCKET_GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
        private const val OPCODE_TEXT = 0x1
        private const val OPCODE_CLOSE = 0x8
        private const val OPCODE_PING = 0x9
        private const val OPCODE_PONG = 0xA
        private const val CLOSE_UNSUPPORTED_DATA = 1003
        private const val MAX_INCOMING_FRAME_BYTES = 8_192
        private const val MAX_METHOD_LENGTH = 16
        private const val MAX_PATH_LENGTH = 256
        private const val MAX_ACCESS_KEY_LENGTH = 512
        private const val MAX_BODY_BYTES = 4_096
        private const val BAD_REQUEST_BODY = "{\"error\":\"bad_request\"}"
        private const val INTERNAL_ERROR_BODY = "{\"error\":\"internal_error\"}"
    }
}
