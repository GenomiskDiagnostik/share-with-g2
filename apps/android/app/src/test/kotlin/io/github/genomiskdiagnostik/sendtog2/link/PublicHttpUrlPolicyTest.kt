package io.github.genomiskdiagnostik.sendtog2.link

import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test
import java.net.InetAddress
import java.net.URI

class PublicHttpUrlPolicyTest {
    @Test
    fun `allows public http and https destinations`() {
        val publicAddress = InetAddress.getByName("93.184.216.34")
        val resolver = { _: String -> arrayOf(publicAddress) }

        assertTrue(
            PublicHttpUrlPolicy.isAllowed(
                URI("https://example.com/article"),
                resolver,
            ),
        )
        assertTrue(
            PublicHttpUrlPolicy.isAllowed(
                URI("http://example.com/article"),
                resolver,
            ),
        )
    }

    @Test
    fun `blocks loopback private link-local and local hostnames`() {
        val blockedAddresses = listOf(
            "127.0.0.1",
            "10.0.0.1",
            "172.16.0.1",
            "192.168.1.1",
            "169.254.1.1",
            "::1",
            "fc00::1",
        )

        blockedAddresses.forEach { address ->
            assertFalse(PublicHttpUrlPolicy.isPublicAddress(InetAddress.getByName(address)))
        }
        assertFalse(
            PublicHttpUrlPolicy.isAllowed(
                URI("http://localhost/private"),
                InetAddress::getAllByName,
            ),
        )
    }

    @Test
    fun `blocks credentials and unsupported schemes`() {
        val publicAddress = InetAddress.getByName("93.184.216.34")
        val resolver = { _: String -> arrayOf(publicAddress) }

        assertFalse(
            PublicHttpUrlPolicy.isAllowed(
                URI("https://user:secret@example.com"),
                resolver,
            ),
        )
        assertFalse(
            PublicHttpUrlPolicy.isAllowed(
                URI("file:///data/local/tmp/private"),
                resolver,
            ),
        )
    }
}
