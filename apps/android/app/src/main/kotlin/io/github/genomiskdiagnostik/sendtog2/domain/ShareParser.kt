package io.github.genomiskdiagnostik.sendtog2.domain

import java.net.URI
import java.util.UUID

data class SharePayload(
    val mimeType: String?,
    val text: String?,
    val subject: String? = null,
    val sourceApp: String? = null,
)

sealed interface ShareParseResult {
    data class Success(val item: SharedItem) : ShareParseResult
    data object Unsupported : ShareParseResult
    data object Empty : ShareParseResult
    data object TooLarge : ShareParseResult
}

class ShareParser(
    private val now: () -> Long = System::currentTimeMillis,
    private val newId: () -> String = { UUID.randomUUID().toString() },
) {
    fun parse(payload: SharePayload): ShareParseResult {
        val mimeType = payload.mimeType?.lowercase()?.trim()
        if (mimeType == null || !mimeType.startsWith("text/")) {
            return ShareParseResult.Unsupported
        }

        val normalizedText = normalize(payload.text)
        if (normalizedText.isEmpty()) {
            return ShareParseResult.Empty
        }
        if (normalizedText.length > MAX_TEXT_LENGTH) {
            return ShareParseResult.TooLarge
        }

        val type = if (isHttpUrl(normalizedText)) SharedItemType.URL else SharedItemType.TEXT
        val preferredTitle = normalize(payload.subject).ifEmpty { normalizedText.lineSequence().first() }
        val title = preferredTitle.take(MAX_TITLE_LENGTH).ifBlank { null }

        return ShareParseResult.Success(
            SharedItem(
                id = newId(),
                type = type,
                title = title,
                text = normalizedText,
                sourceApp = payload.sourceApp?.takeIf { it.isNotBlank() },
                createdAt = now(),
                read = false,
            ),
        )
    }

    private fun normalize(value: String?): String {
        if (value == null) return ""

        return value
            .replace("\r\n", "\n")
            .replace('\r', '\n')
            .filter { character ->
                character == '\n' ||
                    character == '\t' ||
                    !character.isISOControl()
            }
            .lineSequence()
            .joinToString("\n") { line -> line.trimEnd() }
            .trim()
    }

    private fun isHttpUrl(value: String): Boolean {
        if (value.any(Char::isWhitespace)) return false

        return runCatching {
            val uri = URI(value)
            (uri.scheme == "http" || uri.scheme == "https") && !uri.host.isNullOrBlank()
        }.getOrDefault(false)
    }

    companion object {
        const val MAX_TEXT_LENGTH = 65_536
        const val MAX_TITLE_LENGTH = 80
    }
}
