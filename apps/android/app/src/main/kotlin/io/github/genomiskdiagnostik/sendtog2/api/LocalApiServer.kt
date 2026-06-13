package io.github.genomiskdiagnostik.sendtog2.api

import java.io.BufferedInputStream
import java.io.BufferedOutputStream
import java.net.InetAddress
import java.net.InetSocketAddress
import java.net.ServerSocket
import java.net.Socket
import java.nio.charset.StandardCharsets
import java.util.Locale
import java.util.concurrent.Executors
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.runBlocking

enum class LocalApiPhase {
    STOPPED,
    RUNNING,
    FAILED,
}

data class LocalApiState(
    val phase: LocalApiPhase,
    val url: String,
    val error: String? = null,
)

class LocalApiServer(
    private val router: LocalApiRouter,
    private val host: String = DEFAULT_HOST,
    private val port: Int = DEFAULT_PORT,
) {
    private val bindAddress = InetAddress.getByName(host).also {
        require(it.isLoopbackAddress) { "Local API must bind to a loopback address" }
    }
    private val acceptExecutor = Executors.newSingleThreadExecutor(::daemonThread)
    private val clientExecutor = Executors.newFixedThreadPool(MAX_CLIENTS, ::daemonThread)
    private val mutableState = MutableStateFlow(
        LocalApiState(LocalApiPhase.STOPPED, "http://$host:$port"),
    )
    private var serverSocket: ServerSocket? = null

    val state: StateFlow<LocalApiState> = mutableState.asStateFlow()

    @Synchronized
    fun start() {
        if (serverSocket != null) return

        var socket: ServerSocket? = null
        try {
            val candidate = ServerSocket()
            socket = candidate
            candidate.reuseAddress = true
            candidate.bind(InetSocketAddress(bindAddress, port))
            serverSocket = candidate
            mutableState.value = LocalApiState(
                phase = LocalApiPhase.RUNNING,
                url = "http://$host:${candidate.localPort}",
            )
            acceptExecutor.execute { acceptLoop(candidate) }
        } catch (error: Exception) {
            socket?.close()
            mutableState.value = LocalApiState(
                phase = LocalApiPhase.FAILED,
                url = "http://$host:$port",
                error = error.javaClass.simpleName,
            )
        }
    }

    @Synchronized
    fun stop() {
        serverSocket?.close()
        serverSocket = null
        acceptExecutor.shutdownNow()
        clientExecutor.shutdownNow()
        mutableState.value = LocalApiState(LocalApiPhase.STOPPED, "http://$host:$port")
    }

    private fun acceptLoop(socket: ServerSocket) {
        while (!socket.isClosed) {
            try {
                val client = socket.accept()
                clientExecutor.execute { handle(client) }
            } catch (_: Exception) {
                if (!socket.isClosed) {
                    mutableState.value = LocalApiState(
                        phase = LocalApiPhase.FAILED,
                        url = mutableState.value.url,
                        error = "accept_failed",
                    )
                }
            }
        }
    }

    private fun handle(socket: Socket) {
        socket.use { client ->
            client.soTimeout = SOCKET_TIMEOUT_MILLIS
            val input = BufferedInputStream(client.getInputStream())
            val output = BufferedOutputStream(client.getOutputStream())
            val response = try {
                val request = readRequest(input)
                runBlocking { router.route(request) }
            } catch (_: InvalidRequestException) {
                ApiResponse(
                    status = 400,
                    body = """{"error":"bad_request"}""",
                    headers = mapOf("Content-Type" to "application/json; charset=utf-8"),
                )
            } catch (_: Exception) {
                ApiResponse(
                    status = 500,
                    body = """{"error":"internal_error"}""",
                    headers = mapOf("Content-Type" to "application/json; charset=utf-8"),
                )
            }
            writeResponse(output, response)
        }
    }

    private fun readRequest(input: BufferedInputStream): ApiRequest {
        val requestLine = readLine(input, MAX_REQUEST_LINE_BYTES)
        val parts = requestLine.split(' ', limit = 3)
        if (parts.size != 3 || !parts[2].startsWith("HTTP/1.")) {
            throw InvalidRequestException()
        }

        var headerBytes = 0
        while (true) {
            val line = readLine(input, MAX_HEADER_LINE_BYTES)
            headerBytes += line.length
            if (headerBytes > MAX_HEADER_BYTES) throw InvalidRequestException()
            if (line.isEmpty()) break
            if (!line.contains(':')) throw InvalidRequestException()
        }

        val path = parts[1].substringBefore('?')
        if (!path.startsWith('/')) throw InvalidRequestException()
        return ApiRequest(
            method = parts[0].uppercase(Locale.ROOT),
            path = path,
        )
    }

    private fun readLine(input: BufferedInputStream, maxBytes: Int): String {
        val bytes = ArrayList<Byte>()
        while (bytes.size <= maxBytes) {
            val value = input.read()
            if (value == -1) throw InvalidRequestException()
            if (value == '\n'.code) {
                if (bytes.lastOrNull() == '\r'.code.toByte()) {
                    bytes.removeAt(bytes.lastIndex)
                }
                return bytes.toByteArray().toString(StandardCharsets.US_ASCII)
            }
            bytes.add(value.toByte())
        }
        throw InvalidRequestException()
    }

    private fun writeResponse(output: BufferedOutputStream, response: ApiResponse) {
        val body = response.body.toByteArray(StandardCharsets.UTF_8)
        val headers = response.headers + mapOf(
            "Content-Length" to body.size.toString(),
            "Connection" to "close",
            "Cache-Control" to "no-store",
        )
        val head = buildString {
            append("HTTP/1.1 ${response.status} ${reasonPhrase(response.status)}\r\n")
            headers.forEach { (name, value) -> append("$name: $value\r\n") }
            append("\r\n")
        }
        output.write(head.toByteArray(StandardCharsets.US_ASCII))
        output.write(body)
        output.flush()
    }

    private fun reasonPhrase(status: Int): String = when (status) {
        200 -> "OK"
        204 -> "No Content"
        400 -> "Bad Request"
        404 -> "Not Found"
        405 -> "Method Not Allowed"
        else -> "Internal Server Error"
    }

    private class InvalidRequestException : Exception()

    companion object {
        const val DEFAULT_HOST = "127.0.0.1"
        const val DEFAULT_PORT = 8765
        private const val SOCKET_TIMEOUT_MILLIS = 5_000
        private const val MAX_REQUEST_LINE_BYTES = 4_096
        private const val MAX_HEADER_LINE_BYTES = 8_192
        private const val MAX_HEADER_BYTES = 16_384
        private const val MAX_CLIENTS = 4

        private fun daemonThread(task: Runnable): Thread =
            Thread(task, "send-to-g2-local-api").apply { isDaemon = true }
    }
}
