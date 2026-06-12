package io.github.genomiskdiagnostik.sendtog2.share

import android.content.Intent
import androidx.core.text.HtmlCompat
import io.github.genomiskdiagnostik.sendtog2.domain.SharePayload

object IntentSharePayloadFactory {
    fun from(intent: Intent, sourceApp: String?): SharePayload? {
        if (intent.action != Intent.ACTION_SEND) return null

        val rawText = intent.getCharSequenceExtra(Intent.EXTRA_TEXT)?.toString()
        val htmlText = intent.getStringExtra(Intent.EXTRA_HTML_TEXT)
        val normalizedText = if (!htmlText.isNullOrBlank()) {
            HtmlCompat.fromHtml(htmlText, HtmlCompat.FROM_HTML_MODE_LEGACY).toString()
        } else {
            rawText
        }

        return SharePayload(
            mimeType = intent.type,
            text = normalizedText,
            subject = intent.getStringExtra(Intent.EXTRA_SUBJECT),
            sourceApp = sourceApp,
        )
    }
}
