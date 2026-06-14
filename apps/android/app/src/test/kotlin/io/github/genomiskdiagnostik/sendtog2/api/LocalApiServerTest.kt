package io.github.genomiskdiagnostik.sendtog2.api

import io.github.genomiskdiagnostik.sendtog2.domain.SharedItem
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItemType
import java.net.HttpURLConnection
import java.net.Socket
import java.net.URI
import java.net.URL
import java.nio.charset.StandardCharsets
import kotlinx.coroutines.runBlocking
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertThrows
import org.junit.Assert.assertTrue
import org.junit.Test

class LocalApiServerTest {
    @Test
    fun `server binds loopback and serves health over http`() {
        val server = LocalApiServer(
            router = LocalApiRouter(FakeSharedItemStore(), "0.1.0-test"),
            port = 0,
        )

        try {
            server.start()
            val state = server.state.value
            assertEquals(LocalApiPhase.RUNNING, state.phase)
            assertTrue(state.url.startsWith("http://127.0.0.1:"))

            val connection = URL("${state.url}/health").openConnection() as HttpURLConnection
            assertEquals(200, connection.responseCode)
            assertTrue(connection.inputStream.bufferedReader().readText().contains("0.1.0-test"))
        } finally {
            server.stop()
        }
    }

    @Test
    fun `server rejects non-loopback bind addresses`() {
        assertThrows(IllegalArgumentException::class.java) {
            LocalApiServer(
                router = LocalApiRouter(FakeSharedItemStore(), "0.1.0-test"),
                host = "0.0.0.0",
                port = 0,
            )
        }
    }

    @Test
    fun `server captures privacy-safe Even Hub request metadata`() {
        val server = server()

        try {
            server.start()
            val endpoint = URI(server.state.value.url)
            Socket(endpoint.host, endpoint.port).use { socket ->
                val request = buildString {
                    append("GET /items?private=not-recorded HTTP/1.1\r\n")
                    append("Host: ${endpoint.host}:${endpoint.port}\r\n")
                    append("Origin: app://even-hub\r\n")
                    append("User-Agent: EvenHubWebView/1.0\r\n")
                    append("X-Send-To-G2-Client: even-hub\r\n")
                    append("Connection: close\r\n")
                    append("\r\n")
                }
                socket.getOutputStream().write(
                    request.toByteArray(StandardCharsets.US_ASCII),
                )
                socket.getOutputStream().flush()
                val response = socket.getInputStream().bufferedReader().readText()
                assertTrue(response.startsWith("HTTP/1.1 200"))
            }

            val snapshot = server.diagnostics.value.lastEvenHubRequest
            assertEquals("GET", snapshot?.method)
            assertEquals("/items", snapshot?.path)
            assertEquals("even-hub", snapshot?.client)
            assertEquals("app://even-hub", snapshot?.origin)
            assertEquals("EvenHubWebView/1.0", snapshot?.userAgent)
            assertTrue(snapshot?.remoteAddress?.contains("127.0.0.1") == true)
        } finally {
            server.stop()
        }
    }

    @Test
    fun `self-test does not masquerade as Even Hub`() {
        val server = server()

        try {
            server.start()
            val result = HttpLocalApiHealthCheck(now = { 123 })
                .check(server.state.value.url)

            assertEquals(
                LocalApiSelfTestState.Success(123, "0.1.0-test"),
                result,
            )
            assertEquals(
                LocalApiDiagnostics.SELF_TEST_CLIENT,
                server.diagnostics.value.lastRequest?.client,
            )
            assertNull(server.diagnostics.value.lastEvenHubRequest)
        } finally {
            server.stop()
        }
    }

    @Test
    fun `server can restart after being stopped`() {
        val server = server()

        try {
            server.start()
            assertEquals(200, responseCode("${server.state.value.url}/health"))

            server.restart()

            assertEquals(LocalApiPhase.RUNNING, server.state.value.phase)
            assertEquals(200, responseCode("${server.state.value.url}/health"))
        } finally {
            server.stop()
        }
    }

    @Test
    fun `server handles delete through loopback http`() {
        val store = FakeSharedItemStore(
            listOf(
                SharedItem(
                    id = "one",
                    type = SharedItemType.TEXT,
                    title = "One",
                    text = "Text",
                    sourceApp = null,
                    createdAt = 100,
                    read = false,
                ),
            ),
        )
        val server = LocalApiServer(
            router = LocalApiRouter(store, "0.1.0-test"),
            port = 0,
        )

        try {
            server.start()
            val connection = URL("${server.state.value.url}/items/one")
                .openConnection() as HttpURLConnection
            connection.requestMethod = "DELETE"

            assertEquals(204, connection.responseCode)
            assertTrue(runBlocking { store.getAll() }.isEmpty())
        } finally {
            server.stop()
        }
    }

    private fun server() = LocalApiServer(
        router = LocalApiRouter(FakeSharedItemStore(), "0.1.0-test"),
        port = 0,
    )

    private fun responseCode(url: String): Int =
        (URL(url).openConnection() as HttpURLConnection).run {
            try {
                responseCode
            } finally {
                disconnect()
            }
        }
}
