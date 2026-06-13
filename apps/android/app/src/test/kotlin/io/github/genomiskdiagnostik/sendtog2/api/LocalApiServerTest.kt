package io.github.genomiskdiagnostik.sendtog2.api

import java.net.HttpURLConnection
import java.net.URL
import org.junit.Assert.assertEquals
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
}
