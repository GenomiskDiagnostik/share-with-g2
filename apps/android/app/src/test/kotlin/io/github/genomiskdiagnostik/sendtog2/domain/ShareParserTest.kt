package io.github.genomiskdiagnostik.sendtog2.domain

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

class ShareParserTest {
    private val parser = ShareParser(
        now = { 1_710_000_000_000 },
        newId = { "item-1" },
    )

    @Test
    fun `parses plain text and normalizes controls`() {
        val result = parser.parse(
            SharePayload(
                mimeType = "text/plain",
                text = "  Første linje\u0000  \r\nAnden linje  ",
                sourceApp = "com.example.source",
            ),
        )

        val item = (result as ShareParseResult.Success).item
        assertEquals("item-1", item.id)
        assertEquals(SharedItemType.TEXT, item.type)
        assertEquals("Første linje", item.title)
        assertEquals("Første linje\nAnden linje", item.text)
        assertEquals("com.example.source", item.sourceApp)
        assertEquals(1_710_000_000_000, item.createdAt)
    }

    @Test
    fun `classifies a complete http url`() {
        val result = parser.parse(
            SharePayload(
                mimeType = "text/plain",
                text = "https://example.com/article?id=42",
            ),
        )

        val item = (result as ShareParseResult.Success).item
        assertEquals(SharedItemType.URL, item.type)
    }

    @Test
    fun `does not classify surrounding prose as a url`() {
        val result = parser.parse(
            SharePayload(
                mimeType = "text/plain",
                text = "Læs https://example.com senere",
            ),
        )

        val item = (result as ShareParseResult.Success).item
        assertEquals(SharedItemType.TEXT, item.type)
    }

    @Test
    fun `uses and truncates a supplied subject`() {
        val result = parser.parse(
            SharePayload(
                mimeType = "text/plain",
                text = "Indhold",
                subject = "a".repeat(100),
            ),
        )

        val item = (result as ShareParseResult.Success).item
        assertEquals(ShareParser.MAX_TITLE_LENGTH, item.title?.length)
    }

    @Test
    fun `rejects unsupported mime types`() {
        val result = parser.parse(
            SharePayload(
                mimeType = "image/png",
                text = "not accepted",
            ),
        )

        assertEquals(ShareParseResult.Unsupported, result)
    }

    @Test
    fun `rejects blank text`() {
        val result = parser.parse(
            SharePayload(
                mimeType = "text/plain",
                text = " \n\t ",
            ),
        )

        assertEquals(ShareParseResult.Empty, result)
    }

    @Test
    fun `rejects oversized text`() {
        val result = parser.parse(
            SharePayload(
                mimeType = "text/plain",
                text = "x".repeat(ShareParser.MAX_TEXT_LENGTH + 1),
            ),
        )

        assertEquals(ShareParseResult.TooLarge, result)
    }

    @Test
    fun `keeps optional metadata absent`() {
        val result = parser.parse(
            SharePayload(
                mimeType = "text/plain",
                text = "Content",
            ),
        )

        val item = (result as ShareParseResult.Success).item
        assertNull(item.sourceApp)
        assertTrue(!item.read)
    }
}
