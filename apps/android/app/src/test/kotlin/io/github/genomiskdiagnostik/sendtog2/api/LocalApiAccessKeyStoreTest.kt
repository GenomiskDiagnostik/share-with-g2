package io.github.genomiskdiagnostik.sendtog2.api

import kotlinx.coroutines.runBlocking
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNotEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class LocalApiAccessKeyStoreTest {
    @Test
    fun `generated keys contain 192 bits encoded as base64url`() {
        val first = newAccessKey()
        val second = newAccessKey()

        assertEquals(32, first.length)
        assertTrue(first.matches(Regex("[A-Za-z0-9_-]{32}")))
        assertNotEquals(first, second)
    }

    @Test
    fun `bearer authorizer requires exact token`() = runBlocking {
        val authorizer = BearerTokenAuthorizer { "correct-token" }

        assertTrue(authorizer.isAuthorized(request("Bearer correct-token")))
        assertTrue(authorizer.isAuthorized(request("bearer correct-token")))
        assertFalse(authorizer.isAuthorized(request("Bearer wrong-token")))
        assertFalse(authorizer.isAuthorized(ApiRequest("GET", "/items")))
    }

    private fun request(header: String) = ApiRequest(
        method = "GET",
        path = "/items",
        headers = mapOf("authorization" to header),
    )
}
