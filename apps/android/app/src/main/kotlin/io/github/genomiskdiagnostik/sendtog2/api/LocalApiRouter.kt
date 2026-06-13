package io.github.genomiskdiagnostik.sendtog2.api

import io.github.genomiskdiagnostik.sendtog2.data.SharedItemStore
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItem
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItemType
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

data class ApiRequest(
    val method: String,
    val path: String,
    val headers: Map<String, String> = emptyMap(),
    val remoteAddress: String? = null,
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
) {
    private val json = Json {
        encodeDefaults = true
        explicitNulls = false
    }

    suspend fun route(request: ApiRequest): ApiResponse {
        if (request.method == "OPTIONS") {
            return ApiResponse(status = 204, headers = corsHeaders())
        }

        if (request.method != "GET") {
            return jsonResponse(
                status = 405,
                value = ErrorDto("method_not_allowed"),
                extraHeaders = mapOf("Allow" to "GET, OPTIONS"),
            )
        }

        if (request.path != "/health" && !authorizer.isAuthorized(request)) {
            return jsonResponse(
                status = 401,
                value = ErrorDto("unauthorized"),
                extraHeaders = mapOf(
                    "WWW-Authenticate" to """Bearer realm="Send to G2"""",
                ),
            )
        }

        return when (request.path) {
            "/health" -> jsonResponse(
                status = 200,
                value = HealthDto(ok = true, version = version),
            )

            "/items" -> jsonResponse(
                status = 200,
                value = store.getAll().map(SharedItem::toDto),
            )

            else -> routeItem(request.path)
        }
    }

    private suspend fun routeItem(path: String): ApiResponse {
        val id = path.removePrefix(ITEM_PATH_PREFIX)
        if (!path.startsWith(ITEM_PATH_PREFIX) || id.isBlank() || '/' in id) {
            return jsonResponse(status = 404, value = ErrorDto("not_found"))
        }

        val item = store.getById(id)
        return if (item == null) {
            jsonResponse(status = 404, value = ErrorDto("not_found"))
        } else {
            jsonResponse(status = 200, value = item.toDto())
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
        "Access-Control-Allow-Methods" to "GET, OPTIONS",
        "Access-Control-Allow-Headers" to
            "Authorization, Content-Type, X-Send-To-G2-Client",
        "Access-Control-Max-Age" to "600",
    )

    companion object {
        const val API_VERSION = "0.1.0"
        private const val ITEM_PATH_PREFIX = "/items/"
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
private data class SharedItemDto(
    val id: String,
    val type: String,
    val title: String?,
    val text: String,
    val sourceApp: String?,
    val createdAt: Long,
    val read: Boolean,
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
