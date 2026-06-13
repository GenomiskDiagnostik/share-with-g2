package io.github.genomiskdiagnostik.sendtog2.link

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import java.net.InetAddress

class HttpUrlContentFetcherTest {
    private val publicAddress = InetAddress.getByName("93.184.216.34")
    private val resolver = { _: String -> arrayOf(publicAddress) }

    @Test
    fun `extracts a successful html response`() {
        val fetcher = HttpUrlContentFetcher(
            addressResolver = resolver,
            pageLoader = HttpPageLoader {
                HttpPageResponse(
                    status = 200,
                    contentType = "text/html; charset=utf-8",
                    location = null,
                    body = """
                        <html><body><article>
                        <h1>Article title</h1>
                        <p>This public article has enough readable content for the glasses.</p>
                        </article></body></html>
                    """.trimIndent().encodeToByteArray(),
                )
            },
        )

        val result = fetcher.fetch("https://example.com/article")

        assertTrue(result is UrlFetchResult.Success)
        assertEquals(
            "Article title",
            (result as UrlFetchResult.Success).content.title,
        )
    }

    @Test
    fun `revalidates redirects and blocks a private destination`() {
        var loads = 0
        val fetcher = HttpUrlContentFetcher(
            addressResolver = { host ->
                if (host == "private.example") {
                    arrayOf(InetAddress.getByName("192.168.1.10"))
                } else {
                    arrayOf(publicAddress)
                }
            },
            pageLoader = HttpPageLoader {
                loads += 1
                HttpPageResponse(
                    status = 302,
                    contentType = null,
                    location = "http://private.example/secret",
                    body = ByteArray(0),
                )
            },
        )

        assertEquals(
            UrlFetchResult.PermanentFailure,
            fetcher.fetch("https://example.com/redirect"),
        )
        assertEquals(1, loads)
    }

    @Test
    fun `treats server failures as retryable`() {
        val fetcher = HttpUrlContentFetcher(
            addressResolver = resolver,
            pageLoader = HttpPageLoader {
                HttpPageResponse(
                    status = 503,
                    contentType = "text/html",
                    location = null,
                    body = ByteArray(0),
                )
            },
        )

        assertEquals(
            UrlFetchResult.TemporaryFailure,
            fetcher.fetch("https://example.com/unavailable"),
        )
    }
}
