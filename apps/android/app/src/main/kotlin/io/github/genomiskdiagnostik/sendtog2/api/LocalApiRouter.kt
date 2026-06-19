package io.github.genomiskdiagnostik.sendtog2.api

import io.github.genomiskdiagnostik.sendtog2.data.SharedItemStore
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItem
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItemType
import io.github.genomiskdiagnostik.sendtog2.screen.ScreenSnapshot
import io.github.genomiskdiagnostik.sendtog2.screen.ScreenSnapshotStore
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
                extraHeaders = mapOf("Allow" to "GET, PATCH, DELETE, OPTIONS"),
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
        "Access-Control-Allow-Methods" to "GET, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers" to
            "Authorization, Content-Type, X-Send-To-G2-Client",
        "Access-Control-Max-Age" to "600",
        "Access-Control-Allow-Private-Network" to "true",
    )

    companion object {
        const val API_VERSION = "0.1.2"
        private const val ITEM_PATH_PREFIX = "/items/"
        private val SUPPORTED_METHODS = setOf("GET", "PATCH", "DELETE")
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
private data class SharedItemDto(
    val id: String,
    val type: String,
    val title: String?,
    val text: String,
    val sourceApp: String?,
    val createdAt: Long,
    val read: Boolean,
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
)

private fun ScreenSnapshot.toDto(): ScreenSnapshotDto = ScreenSnapshotDto(
    id = id,
    createdAt = createdAt,
    width = width,
    height = height,
    mimeType = mimeType,
    imageBase64 = imageBase64,
)
