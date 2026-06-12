package com.example.sendtog2.share

import android.content.Intent
import android.os.Bundle
import android.util.Patterns
import androidx.activity.ComponentActivity
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.launch
import java.util.UUID

/**
 * Example only. Wire this to real DI/repository during implementation.
 */
class ShareReceiverActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        lifecycleScope.launch {
            val item = parseSharedIntent(intent)

            if (item != null) {
                // SharedRepository.insert(item)
                // SharedNotificationService.showSharedNotification(this@ShareReceiverActivity, item)
            }

            finish()
        }
    }

    private fun parseSharedIntent(intent: Intent): SharedItemDraft? {
        if (intent.action != Intent.ACTION_SEND) return null

        val mimeType = intent.type.orEmpty()
        if (!mimeType.startsWith("text/")) return null

        val text = intent.getStringExtra(Intent.EXTRA_TEXT)
            ?: intent.getCharSequenceExtra(Intent.EXTRA_TEXT)?.toString()
            ?: return null

        val normalized = text.trim()
        if (normalized.isBlank()) return null

        return SharedItemDraft(
            id = UUID.randomUUID().toString(),
            type = detectTextType(normalized),
            title = makeTitle(normalized),
            text = normalized,
            createdAt = System.currentTimeMillis(),
            read = false,
        )
    }

    private fun detectTextType(text: String): String {
        return if (Patterns.WEB_URL.matcher(text.trim()).matches()) "url" else "text"
    }

    private fun makeTitle(text: String): String {
        return text
            .replace("\n", " ")
            .trim()
            .take(80)
            .ifBlank { "Shared text" }
    }
}

data class SharedItemDraft(
    val id: String,
    val type: String,
    val title: String,
    val text: String,
    val createdAt: Long,
    val read: Boolean,
)
