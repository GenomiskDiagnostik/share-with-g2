package io.github.genomiskdiagnostik.sendtog2.api

import io.github.genomiskdiagnostik.sendtog2.data.DynamicSourceStore
import io.github.genomiskdiagnostik.sendtog2.data.SharedItemStore
import io.github.genomiskdiagnostik.sendtog2.domain.DynamicSource
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItem
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItemOrigin
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItemType
import io.github.genomiskdiagnostik.sendtog2.link.DynamicSourceRefreshResult
import io.github.genomiskdiagnostik.sendtog2.link.DynamicSourceRefresher
import io.github.genomiskdiagnostik.sendtog2.screen.ScreenSnapshot
import io.github.genomiskdiagnostik.sendtog2.screen.ScreenSnapshotStore
import java.net.URI
import java.util.UUID
import kotlinx.serialization.SerializationException
import kotlinx.serialization.Serializable
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

data class ApiRequest(
    val method: String,
    val path: String,
    val headers: Map<String, String> = emptyMap(),
    val remoteAddress: String? = null,
    val body: String = "",
)

data class ApiResponse(
    val status: Int,
    val body: String = "",
    val headers: Map<String, String> = emptyMap(),
)

class LocalApiRouter(
    private val store: SharedItemStore,
    private val version: String = API_VERSION,
    private val dynamicSourceStore: DynamicSourceStore = NoopDynamicSourceStore,
    private val dynamicSourceRefresher: DynamicSourceRefresher? = null,
    private val authorizer: LocalApiAuthorizer = LocalApiAuthorizer { true },
    private val screenSnapshotStore: ScreenSnapshotStore = ScreenSnapshotStore(),
    private val trustLoopback: Boolean = false,
) {
    private val json = Json {
        encodeDefaults = true
        explicitNulls = false
    }

    suspend fun route(request: ApiRequest): ApiResponse {
        if (request.method == "OPTIONS") {
            return ApiResponse(status = 204, headers = corsHeaders())
        }

        if (request.method !in SUPPORTED_METHODS) {
            return jsonResponse(
                status = 405,
                value = ErrorDto("method_not_allowed"),
                extraHeaders = mapOf("Allow" to "GET, POST, PATCH, DELETE, OPTIONS"),
            )
        }

        if (request.path != "/health" && !trustLoopback && !authorizer.isAuthorized(request)) {
            return jsonResponse(
                status = 401,
                value = ErrorDto("unauthorized"),
                extraHeaders = mapOf(
                    "WWW-Authenticate" to """Bearer realm="Send to G2"""",
                ),
            )
        }

        if (request.path == "/health") {
            return if (request.method == "GET") {
                jsonResponse(
                    status = 200,
                    value = HealthDto(ok = true, version = version),
                )
            } else {
                jsonResponse(
                    status = 405,
                    value = ErrorDto("method_not_allowed"),
                    extraHeaders = mapOf("Allow" to "GET, OPTIONS"),
                )
            }
        }

        return when (request.path) {
            "/screen-snapshot" -> routeScreenSnapshot(request.method)

            "/items" -> routeItems(request.method)

            "/dynamic-sources" -> routeDynamicSources(request)

            else -> routeItem(request)
        }
    }

    private fun routeScreenSnapshot(method: String): ApiResponse = when (method) {
        "GET" -> {
            val snapshot = screenSnapshotStore.get()
            if (snapshot == null) {
                jsonResponse(status = 404, value = ErrorDto("not_found"))
            } else {
                jsonResponse(status = 200, value = snapshot.toDto())
            }
        }

        else -> jsonResponse(
            status = 405,
            value = ErrorDto("method_not_allowed"),
            extraHeaders = mapOf("Allow" to "GET, OPTIONS"),
        )
    }

    private suspend fun routeItems(method: String): ApiResponse = when (method) {
        "GET" -> jsonResponse(
            status = 200,
            value = store.getAll().map(SharedItem::toDto),
        )

        "DELETE" -> {
            store.clearAll()
            ApiResponse(status = 204, headers = corsHeaders())
        }

        else -> jsonResponse(
            status = 405,
            value = ErrorDto("method_not_allowed"),
            extraHeaders = mapOf("Allow" to "GET, DELETE, OPTIONS"),
        )
    }

    private suspend fun routeItem(request: ApiRequest): ApiResponse {
        if (request.path.startsWith(DYNAMIC_SOURCE_PATH_PREFIX)) {
            return routeDynamicSourceItem(request)
        }
        val id = request.path.removePrefix(ITEM_PATH_PREFIX)
        if (!request.path.startsWith(ITEM_PATH_PREFIX) || id.isBlank() || '/' in id) {
            return jsonResponse(status = 404, value = ErrorDto("not_found"))
        }

        return when (request.method) {
            "GET" -> {
                val item = store.getById(id)
                if (item == null) {
                    jsonResponse(status = 404, value = ErrorDto("not_found"))
                } else {
                    jsonResponse(status = 200, value = item.toDto())
                }
            }

            "DELETE" -> {
                if (store.deleteById(id)) {
                    ApiResponse(status = 204, headers = corsHeaders())
                } else {
                    jsonResponse(status = 404, value = ErrorDto("not_found"))
                }
            }

            "PATCH" -> routeItemPatch(id, request.body)

            else -> error("Unsupported method passed routing guard")
        }
    }

    private suspend fun routeDynamicSources(request: ApiRequest): ApiResponse = when (request.method) {
        "GET" -> jsonResponse(
            status = 200,
            value = dynamicSourceStore.getDynamicSources().map(DynamicSource::toDto),
        )

        "POST" -> {
            val input = decodeDynamicSourceInput(request.body)
                ?: return jsonResponse(status = 400, value = ErrorDto("bad_request"))
            val source = input.toSource(id = UUID.randomUUID().toString(), existing = null)
                ?: return jsonResponse(status = 400, value = ErrorDto("bad_request"))
            dynamicSourceStore.upsertDynamicSource(source)
            jsonResponse(status = 201, value = source.toDto())
        }

        else -> jsonResponse(
            status = 405,
            value = ErrorDto("method_not_allowed"),
            extraHeaders = mapOf("Allow" to "GET, POST, OPTIONS"),
        )
    }

    private suspend fun routeDynamicSourceItem(request: ApiRequest): ApiResponse {
        val suffix = request.path.removePrefix(DYNAMIC_SOURCE_PATH_PREFIX)
        if (suffix.isBlank() || suffix.startsWith('/')) {
            return jsonResponse(status = 404, value = ErrorDto("not_found"))
        }
        val refresh = suffix.endsWith("/refresh")
        val id = if (refresh) suffix.removeSuffix("/refresh") else suffix
        if (id.isBlank() || '/' in id) {
            return jsonResponse(status = 404, value = ErrorDto("not_found"))
        }

        if (refresh) {
            if (request.method != "POST") {
                return jsonResponse(
                    status = 405,
                    value = ErrorDto("method_not_allowed"),
                    extraHeaders = mapOf("Allow" to "POST, OPTIONS"),
                )
            }
            val refresher = dynamicSourceRefresher
                ?: return jsonResponse(status = 503, value = ErrorDto("refresh_unavailable"))
            return when (refresher.refresh(id)) {
                DynamicSourceRefreshResult.Success,
                DynamicSourceRefreshResult.TemporaryFailure,
                DynamicSourceRefreshResult.PermanentFailure,
                -> {
                    val source = dynamicSourceStore.getDynamicSourceById(id)
                        ?: return jsonResponse(status = 404, value = ErrorDto("not_found"))
                    jsonResponse(status = 200, value = source.toDto())
                }
                DynamicSourceRefreshResult.Disabled ->
                    jsonResponse(status = 409, value = ErrorDto("source_disabled"))
                DynamicSourceRefreshResult.NotFound ->
                    jsonResponse(status = 404, value = ErrorDto("not_found"))
            }
        }

        return when (request.method) {
            "GET" -> {
                val source = dynamicSourceStore.getDynamicSourceById(id)
                    ?: return jsonResponse(status = 404, value = ErrorDto("not_found"))
                jsonResponse(status = 200, value = source.toDto())
            }
            "PATCH" -> {
                val current = dynamicSourceStore.getDynamicSourceById(id)
                    ?: return jsonResponse(status = 404, value = ErrorDto("not_found"))
                val input = decodeDynamicSourceInput(request.body)
                    ?: return jsonResponse(status = 400, value = ErrorDto("bad_request"))
                val source = input.toSource(id = id, existing = current)
                    ?: return jsonResponse(status = 400, value = ErrorDto("bad_request"))
                dynamicSourceStore.upsertDynamicSource(source)
                jsonResponse(status = 200, value = source.toDto())
            }
            "DELETE" -> {
                if (dynamicSourceStore.deleteDynamicSourceById(id)) {
                    ApiResponse(status = 204, headers = corsHeaders())
                } else {
                    jsonResponse(status = 404, value = ErrorDto("not_found"))
                }
            }
            else -> jsonResponse(
                status = 405,
                value = ErrorDto("method_not_allowed"),
                extraHeaders = mapOf("Allow" to "GET, PATCH, DELETE, OPTIONS"),
            )
        }
    }

    private suspend fun routeItemPatch(id: String, body: String): ApiResponse {
        val update = try {
            json.decodeFromString<UpdateItemDto>(body)
        } catch (_: SerializationException) {
            return jsonResponse(status = 400, value = ErrorDto("bad_request"))
        } catch (_: IllegalArgumentException) {
            return jsonResponse(status = 400, value = ErrorDto("bad_request"))
        }

        val read = update.read
            ?: return jsonResponse(status = 400, value = ErrorDto("bad_request"))

        return if (store.updateRead(id, read)) {
            val item = store.getById(id)
            if (item == null) {
                jsonResponse(status = 404, value = ErrorDto("not_found"))
            } else {
                jsonResponse(status = 200, value = item.toDto())
            }
        } else {
            jsonResponse(status = 404, value = ErrorDto("not_found"))
        }
    }

    private inline fun <reified T> jsonResponse(
        status: Int,
        value: T,
        extraHeaders: Map<String, String> = emptyMap(),
    ): ApiResponse = ApiResponse(
        status = status,
        body = json.encodeToString(value),
        headers = corsHeaders() + mapOf(
            "Content-Type" to "application/json; charset=utf-8",
        ) + extraHeaders,
    )

    private fun corsHeaders(): Map<String, String> = mapOf(
        "Access-Control-Allow-Origin" to "*",
        "Access-Control-Allow-Methods" to "GET, POST, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers" to
            "Authorization, Content-Type, X-Send-To-G2-Client",
        "Access-Control-Max-Age" to "600",
        "Access-Control-Allow-Private-Network" to "true",
    )

    companion object {
        const val API_VERSION = "0.2.2"
        private const val ITEM_PATH_PREFIX = "/items/"
        private const val DYNAMIC_SOURCE_PATH_PREFIX = "/dynamic-sources/"
        private val SUPPORTED_METHODS = setOf("GET", "POST", "PATCH", "DELETE")
    }
}

@Serializable
private data class HealthDto(
    val ok: Boolean,
    val version: String,
)

@Serializable
private data class ErrorDto(
    val error: String,
)

@Serializable
private data class UpdateItemDto(
    val read: Boolean? = null,
)

@Serializable
private data class DynamicSourceInputDto(
    val name: String? = null,
    val url: String? = null,
    val cssSelector: String? = null,
    val frequencyMinutes: Long? = null,
    val enabled: Boolean? = null,
)

@Serializable
private data class SharedItemDto(
    val id: String,
    val type: String,
    val title: String?,
    val text: String,
    val sourceApp: String?,
    val createdAt: Long,
    val read: Boolean,
    val origin: String,
    val dynamicSourceId: String?,
    val dynamicFingerprint: String?,
)

@Serializable
private data class DynamicSourceDto(
    val id: String,
    val name: String,
    val url: String,
    val cssSelector: String,
    val frequencyMinutes: Long,
    val enabled: Boolean,
    val lastFetchedAt: Long?,
    val lastSuccessAt: Long?,
    val lastError: String?,
)

@Serializable
private data class ScreenSnapshotDto(
    val id: String,
    val createdAt: Long,
    val width: Int,
    val height: Int,
    val mimeType: String,
    val imageBase64: String,
)

private fun SharedItem.toDto(): SharedItemDto = SharedItemDto(
    id = id,
    type = when (type) {
        SharedItemType.TEXT -> "text"
        SharedItemType.URL -> "url"
    },
    title = title,
    text = text,
    sourceApp = sourceApp,
    createdAt = createdAt,
    read = read,
    origin = when (origin) {
        SharedItemOrigin.SHARE -> "share"
        SharedItemOrigin.DYNAMIC -> "dynamic"
    },
    dynamicSourceId = dynamicSourceId,
    dynamicFingerprint = dynamicFingerprint,
)

private fun DynamicSource.toDto(): DynamicSourceDto = DynamicSourceDto(
    id = id,
    name = name,
    url = url,
    cssSelector = cssSelector,
    frequencyMinutes = frequencyMinutes,
    enabled = enabled,
    lastFetchedAt = lastFetchedAt,
    lastSuccessAt = lastSuccessAt,
    lastError = lastError,
)

private fun decodeDynamicSourceInput(body: String): DynamicSourceInputDto? = try {
    Json.decodeFromString<DynamicSourceInputDto>(body)
} catch (_: SerializationException) {
    null
} catch (_: IllegalArgumentException) {
    null
}

private fun DynamicSourceInputDto.toSource(
    id: String,
    existing: DynamicSource?,
): DynamicSource? {
    val name = (name ?: existing?.name)?.trim()
        ?.take(DynamicSource.MAX_NAME_LENGTH)
        ?: return null
    val url = (url ?: existing?.url)?.trim()
        ?.take(DynamicSource.MAX_URL_LENGTH)
        ?: return null
    val cssSelector = (cssSelector ?: existing?.cssSelector)?.trim()
        ?.take(DynamicSource.MAX_SELECTOR_LENGTH)
        ?: return null
    val frequency = (frequencyMinutes ?: existing?.frequencyMinutes)
        ?.coerceAtLeast(DynamicSource.MIN_FREQUENCY_MINUTES)
        ?: return null
    val enabled = enabled ?: existing?.enabled ?: true
    if (name.isBlank() || cssSelector.isBlank() || !isPublicHttpUrlShape(url)) return null
    return DynamicSource(
        id = id,
        name = name,
        url = url,
        cssSelector = cssSelector,
        frequencyMinutes = frequency,
        enabled = enabled,
        lastFetchedAt = existing?.lastFetchedAt,
        lastSuccessAt = existing?.lastSuccessAt,
        lastError = existing?.lastError,
    )
}

private fun isPublicHttpUrlShape(url: String): Boolean {
    val uri = runCatching { URI(url) }.getOrNull() ?: return false
    return uri.scheme?.lowercase() in setOf("http", "https") &&
        uri.host?.isNotBlank() == true &&
        uri.userInfo == null
}

private object NoopDynamicSourceStore : DynamicSourceStore {
    override fun observeDynamicSources() =
        kotlinx.coroutines.flow.flowOf(emptyList<DynamicSource>())

    override suspend fun getDynamicSources(): List<DynamicSource> = emptyList()
    override suspend fun getDynamicSourceById(id: String): DynamicSource? = null
    override suspend fun upsertDynamicSource(source: DynamicSource) = Unit
    override suspend fun deleteDynamicSourceById(id: String): Boolean = false
    override suspend fun upsertDynamicItem(item: SharedItem) = Unit
    override suspend fun deleteDynamicItemForSource(sourceId: String): Boolean = false
}

private fun ScreenSnapshot.toDto(): ScreenSnapshotDto = ScreenSnapshotDto(
    id = id,
    createdAt = createdAt,
    width = width,
    height = height,
    mimeType = mimeType,
    imageBase64 = imageBase64,
)
