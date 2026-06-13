package io.github.genomiskdiagnostik.sendtog2.api

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

class LocalApiDiagnosticsTest {
    @Test
    fun `tracks latest request and latest Even Hub request separately`() {
        val diagnostics = LocalApiDiagnostics(now = { 100 })
        diagnostics.record(
            ApiRequest(
                method = "GET",
                path = "/items",
                headers = mapOf(
                    "x-send-to-g2-client" to "even-hub",
                    "origin" to "app://even",
                ),
                remoteAddress = "127.0.0.1",
            ),
        )
        diagnostics.record(
            ApiRequest(
                method = "GET",
                path = "/health",
                headers = mapOf(
                    "x-send-to-g2-client" to "android-self-test",
                ),
                remoteAddress = "127.0.0.1",
            ),
        )

        val state = diagnostics.state.value
        assertEquals(2, state.requestCount)
        assertEquals("android-self-test", state.lastRequest?.client)
        assertEquals("even-hub", state.lastEvenHubRequest?.client)
        assertEquals("app://even", state.lastEvenHubRequest?.origin)
    }

    @Test
    fun `does not infer Even Hub without the explicit client header`() {
        val diagnostics = LocalApiDiagnostics()
        diagnostics.record(
            ApiRequest(
                method = "OPTIONS",
                path = "/items",
                headers = mapOf("origin" to "https://example.invalid"),
            ),
        )

        assertEquals(1, diagnostics.state.value.requestCount)
        assertNull(diagnostics.state.value.lastEvenHubRequest)
    }

    @Test
    fun `bounds diagnostic header values`() {
        val diagnostics = LocalApiDiagnostics()
        diagnostics.record(
            ApiRequest(
                method = "GET",
                path = "/health",
                headers = mapOf(
                    "x-send-to-g2-client" to "even-hub",
                    "user-agent" to "x".repeat(1_000),
                ),
            ),
        )

        assertEquals(300, diagnostics.state.value.lastEvenHubRequest?.userAgent?.length)
    }
}
