package io.github.genomiskdiagnostik.sendtog2.link

import io.github.genomiskdiagnostik.sendtog2.data.SharedItemStore
import io.github.genomiskdiagnostik.sendtog2.domain.ShareParser
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItem
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItemType

sealed interface LinkEnrichmentResult {
    data class Updated(val item: SharedItem) : LinkEnrichmentResult
    data object Skipped : LinkEnrichmentResult
    data object Retry : LinkEnrichmentResult
}

class LinkContentEnricher(
    private val store: SharedItemStore,
    private val fetcher: UrlContentFetcher,
) {
    suspend fun enrich(itemId: String, url: String): LinkEnrichmentResult {
        val current = store.getById(itemId)
            ?.takeIf { it.type == SharedItemType.URL && it.text == url }
            ?: return LinkEnrichmentResult.Skipped

        return when (val result = fetcher.fetch(url)) {
            UrlFetchResult.PermanentFailure -> LinkEnrichmentResult.Skipped
            UrlFetchResult.TemporaryFailure -> LinkEnrichmentResult.Retry
            is UrlFetchResult.Success -> update(current, url, result.content)
        }
    }

    private suspend fun update(
        current: SharedItem,
        url: String,
        content: ExtractedLinkContent,
    ): LinkEnrichmentResult {
        val suffix = "\n\n$url"
        val availableBodyLength = ShareParser.MAX_TEXT_LENGTH - suffix.length
        if (availableBodyLength < 1) return LinkEnrichmentResult.Skipped

        val text = content.text.take(availableBodyLength).trimEnd() + suffix
        val title = content.title?.takeIf(String::isNotBlank) ?: current.title
        val updated = current.copy(title = title, text = text)
        return if (
            store.updateLinkContent(
                id = current.id,
                expectedUrl = url,
                title = updated.title,
                text = updated.text,
            )
        ) {
            LinkEnrichmentResult.Updated(updated)
        } else {
            LinkEnrichmentResult.Skipped
        }
    }
}
