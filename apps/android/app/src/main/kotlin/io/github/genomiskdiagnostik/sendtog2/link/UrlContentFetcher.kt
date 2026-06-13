package io.github.genomiskdiagnostik.sendtog2.link

import io.github.genomiskdiagnostik.sendtog2.domain.ShareParser
import org.jsoup.Jsoup
import org.jsoup.nodes.Element
import java.io.ByteArrayOutputStream
import java.io.IOException
import java.net.HttpURLConnection
import java.net.InetAddress
import java.net.URI
import java.nio.charset.Charset

data class ExtractedLinkContent(
    val title: String?,
    val text: String,
)

sealed interface UrlFetchResult {
    data class Success(val content: ExtractedLinkContent) : UrlFetchResult
    data object TemporaryFailure : UrlFetchResult
    data object PermanentFailure : UrlFetchResult
}

fun interface UrlContentFetcher {
    fun fetch(url: String): UrlFetchResult
}

class HttpUrlContentFetcher internal constructor(
    private val extractor: LinkContentExtractor = LinkContentExtractor(),
    private val addressResolver: (String) -> Array<InetAddress> = InetAddress::getAllByName,
    private val pageLoader: HttpPageLoader = BoundedHttpPageLoader,
) : UrlContentFetcher {
    override fun fetch(url: String): UrlFetchResult {
        var current = runCatching { URI(url) }.getOrNull()
            ?: return UrlFetchResult.PermanentFailure

        repeat(MAX_REDIRECTS + 1) { redirectCount ->
            if (!PublicHttpUrlPolicy.isAllowed(current, addressResolver)) {
                return UrlFetchResult.PermanentFailure
            }

            val response = try {
                pageLoader.load(current)
            } catch (_: ResponseTooLargeException) {
                return UrlFetchResult.PermanentFailure
            } catch (_: IOException) {
                return UrlFetchResult.TemporaryFailure
            }

            if (response.status in 300..399) {
                val location = response.location
                    ?: return UrlFetchResult.PermanentFailure
                if (redirectCount == MAX_REDIRECTS) {
                    return UrlFetchResult.PermanentFailure
                }
                current = runCatching { current.resolve(location) }.getOrNull()
                    ?: return UrlFetchResult.PermanentFailure
                return@repeat
            }

            if (response.status == 429 || response.status >= 500) {
                return UrlFetchResult.TemporaryFailure
            }
            if (response.status !in 200..299) {
                return UrlFetchResult.PermanentFailure
            }

            val mediaType = response.contentType
                ?.substringBefore(';')
                ?.trim()
                ?.lowercase()
                ?: return UrlFetchResult.PermanentFailure
            val charset = parseCharset(response.contentType)
            val body = response.body.toString(charset)
            val extracted = when (mediaType) {
                "text/html", "application/xhtml+xml" ->
                    extractor.extractHtml(body, current.toString())
                "text/plain" -> extractor.extractPlainText(body)
                else -> null
            } ?: return UrlFetchResult.PermanentFailure

            return UrlFetchResult.Success(extracted)
        }

        return UrlFetchResult.PermanentFailure
    }

    private fun parseCharset(contentType: String?): Charset {
        val charsetName = contentType
            ?.split(';')
            ?.drop(1)
            ?.map(String::trim)
            ?.firstOrNull { it.startsWith("charset=", ignoreCase = true) }
            ?.substringAfter('=')
            ?.trim()
            ?.trim('"')
        return charsetName
            ?.let { runCatching { Charset.forName(it) }.getOrNull() }
            ?: Charsets.UTF_8
    }

    private companion object {
        const val MAX_REDIRECTS = 3
    }
}

internal fun interface HttpPageLoader {
    @Throws(IOException::class)
    fun load(uri: URI): HttpPageResponse
}

internal data class HttpPageResponse(
    val status: Int,
    val contentType: String?,
    val location: String?,
    val body: ByteArray,
)

internal object BoundedHttpPageLoader : HttpPageLoader {
    override fun load(uri: URI): HttpPageResponse {
        val connection = uri.toURL().openConnection() as HttpURLConnection
        return try {
            connection.instanceFollowRedirects = false
            connection.connectTimeout = CONNECT_TIMEOUT_MS
            connection.readTimeout = READ_TIMEOUT_MS
            connection.requestMethod = "GET"
            connection.setRequestProperty("Accept", "text/html, text/plain;q=0.9")
            connection.setRequestProperty("User-Agent", USER_AGENT)

            val status = connection.responseCode
            val contentLength = connection.contentLengthLong
            if (contentLength > MAX_RESPONSE_BYTES) {
                throw ResponseTooLargeException()
            }
            val body = if (status in 200..299) {
                connection.inputStream.use(::readBounded)
            } else {
                ByteArray(0)
            }

            HttpPageResponse(
                status = status,
                contentType = connection.contentType,
                location = connection.getHeaderField("Location"),
                body = body,
            )
        } finally {
            connection.disconnect()
        }
    }

    private fun readBounded(input: java.io.InputStream): ByteArray {
        val output = ByteArrayOutputStream()
        val buffer = ByteArray(DEFAULT_BUFFER_SIZE)
        var total = 0

        while (true) {
            val count = input.read(buffer)
            if (count < 0) break
            total += count
            if (total > MAX_RESPONSE_BYTES) throw ResponseTooLargeException()
            output.write(buffer, 0, count)
        }

        return output.toByteArray()
    }

    private const val CONNECT_TIMEOUT_MS = 5_000
    private const val READ_TIMEOUT_MS = 7_000
    private const val MAX_RESPONSE_BYTES = 1_048_576
    private const val USER_AGENT = "SendToG2/0.1"
}

internal class ResponseTooLargeException : IOException()

class LinkContentExtractor {
    fun extractHtml(html: String, baseUri: String): ExtractedLinkContent? {
        val document = Jsoup.parse(html, baseUri)
        document.select(
            "script, style, noscript, nav, header, footer, aside, form, " +
                "svg, canvas, iframe, template",
        ).remove()

        val assistantMessages = document.select("[data-message-author-role=assistant]")
        val text = if (assistantMessages.isNotEmpty()) {
            assistantMessages.lastOrNull()?.let(::extractBlocks).orEmpty()
        } else {
            val candidates = sequenceOf(
                document.select("article").toList(),
                document.select("main, [role=main]").toList(),
                listOfNotNull(document.body()),
            ).firstOrNull { it.isNotEmpty() }.orEmpty()

            candidates
                .map(::extractBlocks)
                .maxByOrNull(String::length)
                .orEmpty()
        }

        val normalizedText = normalize(text)
        if (!hasReadableContent(normalizedText)) return null

        val title = sequenceOf(
            document.selectFirst("meta[property=og:title]")?.attr("content"),
            document.selectFirst("meta[name=twitter:title]")?.attr("content"),
            document.selectFirst("h1")?.text(),
            document.title(),
        ).map(::normalize)
            .firstOrNull(String::isNotEmpty)
            ?.take(ShareParser.MAX_TITLE_LENGTH)

        return ExtractedLinkContent(
            title = title,
            text = normalizedText.take(MAX_EXTRACTED_TEXT_LENGTH).trimEnd(),
        )
    }

    fun extractPlainText(text: String): ExtractedLinkContent? {
        val normalized = normalize(text)
        if (!hasReadableContent(normalized)) return null
        return ExtractedLinkContent(
            title = null,
            text = normalized.take(MAX_EXTRACTED_TEXT_LENGTH).trimEnd(),
        )
    }

    private fun extractBlocks(element: Element): String {
        val blocks = element.select(BLOCK_SELECTOR)
            .filter { block -> block.select(BLOCK_SELECTOR).isEmpty() }
            .map(Element::text)
            .filter(String::isNotBlank)
        return if (blocks.isNotEmpty()) blocks.joinToString("\n\n") else element.text()
    }

    private fun normalize(value: String?): String {
        if (value == null) return ""
        return value
            .replace('\u00a0', ' ')
            .replace("\r\n", "\n")
            .replace('\r', '\n')
            .lineSequence()
            .map { line -> line.trim().replace(Regex("[\\t ]+"), " ") }
            .fold(mutableListOf<String>()) { lines, line ->
                if (line.isNotEmpty() || lines.lastOrNull()?.isNotEmpty() == true) {
                    lines += line
                }
                lines
            }
            .joinToString("\n")
            .trim()
    }

    private fun hasReadableContent(text: String): Boolean =
        text.length >= MIN_CONTENT_LENGTH && text.count(Char::isLetterOrDigit) >= 20

    private companion object {
        const val BLOCK_SELECTOR = "h1,h2,h3,h4,h5,h6,p,li,pre,blockquote"
        const val MIN_CONTENT_LENGTH = 40
        const val MAX_EXTRACTED_TEXT_LENGTH = 60_000
    }
}

internal object PublicHttpUrlPolicy {
    fun isAllowed(
        uri: URI,
        resolver: (String) -> Array<InetAddress> = InetAddress::getAllByName,
    ): Boolean {
        if (uri.scheme?.lowercase() !in setOf("http", "https")) return false
        if (uri.userInfo != null || uri.host.isNullOrBlank()) return false
        if (uri.host.equals("localhost", ignoreCase = true) ||
            uri.host.endsWith(".local", ignoreCase = true)
        ) {
            return false
        }

        val addresses = runCatching { resolver(uri.host) }.getOrNull()
            ?: return false
        return addresses.isNotEmpty() && addresses.all(::isPublicAddress)
    }

    internal fun isPublicAddress(address: InetAddress): Boolean {
        if (address.isAnyLocalAddress ||
            address.isLoopbackAddress ||
            address.isLinkLocalAddress ||
            address.isSiteLocalAddress ||
            address.isMulticastAddress
        ) {
            return false
        }

        val bytes = address.address.map(Byte::toInt)
        if (bytes.size == 4) {
            val first = bytes[0] and 0xff
            val second = bytes[1] and 0xff
            return when {
                first == 0 || first == 10 || first == 127 || first >= 224 -> false
                first == 100 && second in 64..127 -> false
                first == 169 && second == 254 -> false
                first == 172 && second in 16..31 -> false
                first == 192 && second == 168 -> false
                first == 198 && second in 18..19 -> false
                else -> true
            }
        }

        if (bytes.size == 16) {
            val first = bytes[0] and 0xff
            val second = bytes[1] and 0xff
            if (first and 0xfe == 0xfc) return false
            if (first == 0x20 && second == 0x01 &&
                (bytes[2] and 0xff) == 0x0d && (bytes[3] and 0xff) == 0xb8
            ) {
                return false
            }
        }

        return true
    }
}
