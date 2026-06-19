package io.github.genomiskdiagnostik.sendtog2.share

import android.content.Intent
import androidx.core.text.HtmlCompat
import io.github.genomiskdiagnostik.sendtog2.domain.SharePayload

object IntentSharePayloadFactory {
    fun from(intent: Intent, sourceApp: String?): SharePayload? {
        if (intent.action !in SUPPORTED_ACTIONS) return null

        val processText = intent.action == Intent.ACTION_PROCESS_TEXT
        val rawText = intent.getCharSequenceExtra(
            if (processText) Intent.EXTRA_PROCESS_TEXT else Intent.EXTRA_TEXT,
        )?.toString()
        val htmlText = if (processText) null else intent.getStringExtra(Intent.EXTRA_HTML_TEXT)
        val normalizedText = if (!htmlText.isNullOrBlank()) {
            HtmlCompat.fromHtml(htmlText, HtmlCompat.FROM_HTML_MODE_LEGACY).toString()
        } else {
            rawText
        }

        return SharePayload(
            mimeType = intent.type,
            text = normalizedText,
            subject = if (processText) null else intent.getStringExtra(Intent.EXTRA_SUBJECT),
            sourceApp = sourceApp,
        )
    }

    private val SUPPORTED_ACTIONS = setOf(Intent.ACTION_SEND, Intent.ACTION_PROCESS_TEXT)
}
