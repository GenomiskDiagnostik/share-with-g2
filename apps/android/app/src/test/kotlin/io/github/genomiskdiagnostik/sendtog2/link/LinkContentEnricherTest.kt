package io.github.genomiskdiagnostik.sendtog2.link

import io.github.genomiskdiagnostik.sendtog2.api.FakeSharedItemStore
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItem
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItemType
import kotlinx.coroutines.runBlocking
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class LinkContentEnricherTest {
    @Test
    fun `replaces a stored url with readable content and preserves the source url`() = runBlocking {
        val url = "https://example.com/article"
        val store = FakeSharedItemStore(listOf(linkItem(url)))
        val enricher = LinkContentEnricher(store) {
            UrlFetchResult.Success(
                ExtractedLinkContent(
                    title = "Readable title",
                    text = "Readable content from the linked page.",
                ),
            )
        }

        val result = enricher.enrich("link-1", url)

        assertTrue(result is LinkEnrichmentResult.Updated)
        val updated = store.getById("link-1")
        assertEquals("Readable title", updated?.title)
        assertEquals(
            "Readable content from the linked page.\n\n$url",
            updated?.text,
        )
    }

    @Test
    fun `keeps the original url when fetching permanently fails`() = runBlocking {
        val url = "https://example.com/private"
        val store = FakeSharedItemStore(listOf(linkItem(url)))
        val enricher = LinkContentEnricher(store) {
            UrlFetchResult.PermanentFailure
        }

        assertEquals(LinkEnrichmentResult.Skipped, enricher.enrich("link-1", url))
        assertEquals(url, store.getById("link-1")?.text)
    }

    @Test
    fun `does not recreate an item deleted before background enrichment`() = runBlocking {
        val url = "https://example.com/article"
        val store = FakeSharedItemStore()
        val enricher = LinkContentEnricher(store) {
            UrlFetchResult.Success(ExtractedLinkContent("Title", "Readable content"))
        }

        assertEquals(LinkEnrichmentResult.Skipped, enricher.enrich("missing", url))
        assertTrue(store.getAll().isEmpty())
    }

    private fun linkItem(url: String) = SharedItem(
        id = "link-1",
        type = SharedItemType.URL,
        title = url,
        text = url,
        sourceApp = "com.openai.chatgpt",
        createdAt = 1_710_000_000_000,
        read = false,
    )
}
