package io.github.genomiskdiagnostik.sendtog2.share

import android.content.Intent
import androidx.test.ext.junit.runners.AndroidJUnit4
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class IntentSharePayloadFactoryTest {
    @Test
    fun extractsPlainTextAndSubject() {
        val intent = Intent(Intent.ACTION_SEND).apply {
            type = "text/plain"
            putExtra(Intent.EXTRA_TEXT, "Delt tekst")
            putExtra(Intent.EXTRA_SUBJECT, "Emne")
        }

        val payload = IntentSharePayloadFactory.from(intent, "com.example.source")

        assertEquals("text/plain", payload?.mimeType)
        assertEquals("Delt tekst", payload?.text)
        assertEquals("Emne", payload?.subject)
        assertEquals("com.example.source", payload?.sourceApp)
    }

    @Test
    fun flattensHtmlToPlainText() {
        val intent = Intent(Intent.ACTION_SEND).apply {
            type = "text/html"
            putExtra(Intent.EXTRA_TEXT, "fallback")
            putExtra(Intent.EXTRA_HTML_TEXT, "<p>Hej <strong>G2</strong></p>")
        }

        val payload = IntentSharePayloadFactory.from(intent, null)

        assertEquals("Hej G2\n\n", payload?.text)
    }

    @Test
    fun extractsSelectedProcessText() {
        val intent = Intent(Intent.ACTION_PROCESS_TEXT).apply {
            type = "text/plain"
            putExtra(Intent.EXTRA_PROCESS_TEXT, "Markeret tekst")
        }

        val payload = IntentSharePayloadFactory.from(intent, "com.example.editor")

        assertEquals("text/plain", payload?.mimeType)
        assertEquals("Markeret tekst", payload?.text)
        assertEquals(null, payload?.subject)
        assertEquals("com.example.editor", payload?.sourceApp)
    }

    @Test
    fun rejectsNonSendActions() {
        val intent = Intent(Intent.ACTION_VIEW)

        assertNull(IntentSharePayloadFactory.from(intent, null))
    }
}
