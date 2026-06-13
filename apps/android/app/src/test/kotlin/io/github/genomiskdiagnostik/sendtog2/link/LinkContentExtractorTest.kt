package io.github.genomiskdiagnostik.sendtog2.link

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

class LinkContentExtractorTest {
    private val extractor = LinkContentExtractor()

    @Test
    fun `prefers the latest ChatGPT assistant message`() {
        val content = extractor.extractHtml(
            """
            <html>
              <head><meta property="og:title" content="Shared ChatGPT answer"></head>
              <body>
                <main>
                  <div data-message-author-role="assistant">
                    <p>Earlier assistant answer with enough readable content.</p>
                  </div>
                  <div data-message-author-role="user"><p>Follow-up question.</p></div>
                  <div data-message-author-role="assistant">
                    <p>This is the latest answer that should appear on the glasses.</p>
                    <ul><li>First useful point</li><li>Second useful point</li></ul>
                  </div>
                </main>
              </body>
            </html>
            """.trimIndent(),
            "https://chatgpt.com/share/example",
        )

        assertEquals("Shared ChatGPT answer", content?.title)
        assertTrue(content?.text?.startsWith("This is the latest answer") == true)
        assertTrue(content?.text?.contains("First useful point") == true)
        assertFalse(content?.text?.contains("Earlier assistant answer") == true)
    }

    @Test
    fun `extracts article blocks and removes navigation and scripts`() {
        val content = extractor.extractHtml(
            """
            <html>
              <head><title>Example article</title></head>
              <body>
                <nav>Account Pricing Products Contact</nav>
                <article>
                  <h1>Example article heading</h1>
                  <p>The first paragraph contains readable article content.</p>
                  <p>The second paragraph contains additional useful details.</p>
                  <script>secretTrackingValue()</script>
                </article>
              </body>
            </html>
            """.trimIndent(),
            "https://example.com/article",
        )

        assertEquals("Example article heading", content?.title)
        assertTrue(content?.text?.contains("first paragraph") == true)
        assertTrue(content?.text?.contains("second paragraph") == true)
        assertFalse(content?.text?.contains("Pricing") == true)
        assertFalse(content?.text?.contains("secretTrackingValue") == true)
    }

    @Test
    fun `rejects pages without readable content`() {
        assertNull(
            extractor.extractHtml(
                "<html><body><main>Sign in</main></body></html>",
                "https://example.com/login",
            ),
        )
    }
}
