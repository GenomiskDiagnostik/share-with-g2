package io.github.genomiskdiagnostik.sendtog2.api

import java.net.HttpURLConnection
import java.net.URL
import java.util.Locale
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update

data class LocalApiRequestSnapshot(
    val receivedAt: Long,
    val method: String,
    val path: String,
    val client: String?,
    val origin: String?,
    val userAgent: String?,
    val remoteAddress: String?,
)

data class LocalApiDiagnosticsState(
    val requestCount: Long = 0,
    val lastRequest: LocalApiRequestSnapshot? = null,
    val lastEvenHubRequest: LocalApiRequestSnapshot? = null,
)

class LocalApiDiagnostics(
    private val now: () -> Long = System::currentTimeMillis,
) {
    private val mutableState = MutableStateFlow(LocalApiDiagnosticsState())
    val state: StateFlow<LocalApiDiagnosticsState> = mutableState.asStateFlow()

    fun record(request: ApiRequest) {
        val snapshot = LocalApiRequestSnapshot(
            receivedAt = now(),
            method = request.method.take(MAX_METHOD_LENGTH),
            path = request.path.take(MAX_PATH_LENGTH),
            client = request.header(CLIENT_HEADER)?.take(MAX_HEADER_VALUE_LENGTH),
            origin = request.header("origin")?.take(MAX_HEADER_VALUE_LENGTH),
            userAgent = request.header("user-agent")?.take(MAX_HEADER_VALUE_LENGTH),
            remoteAddress = request.remoteAddress?.take(MAX_ADDRESS_LENGTH),
        )
        mutableState.update { current ->
            current.copy(
                requestCount = current.requestCount + 1,
                lastRequest = snapshot,
                lastEvenHubRequest = if (snapshot.client == EVEN_HUB_CLIENT) {
                    snapshot
                } else {
                    current.lastEvenHubRequest
                },
            )
        }
    }

    private fun ApiRequest.header(name: String): String? =
        headers[name.lowercase(Locale.ROOT)]?.takeIf(String::isNotBlank)

    companion object {
        const val CLIENT_HEADER = "x-send-to-g2-client"
        const val EVEN_HUB_CLIENT = "even-hub"
        const val SELF_TEST_CLIENT = "android-self-test"
        private const val MAX_METHOD_LENGTH = 16
        private const val MAX_PATH_LENGTH = 256
        private const val MAX_HEADER_VALUE_LENGTH = 300
        private const val MAX_ADDRESS_LENGTH = 64
    }
}

sealed interface LocalApiSelfTestState {
    data object Idle : LocalApiSelfTestState
    data object Running : LocalApiSelfTestState
    data class Success(val checkedAt: Long, val version: String) : LocalApiSelfTestState
    data class Failure(val checkedAt: Long, val reason: String) : LocalApiSelfTestState
}

fun interface LocalApiHealthCheck {
    fun check(baseUrl: String): LocalApiSelfTestState
}

class HttpLocalApiHealthCheck(
    private val now: () -> Long = System::currentTimeMillis,
) : LocalApiHealthCheck {
    override fun check(baseUrl: String): LocalApiSelfTestState {
        val connection = URL("$baseUrl/health").openConnection() as HttpURLConnection
        return try {
            connection.connectTimeout = TIMEOUT_MILLIS
            connection.readTimeout = TIMEOUT_MILLIS
            connection.requestMethod = "GET"
            connection.setRequestProperty("Accept", "application/json")
            connection.setRequestProperty(
                "X-Send-To-G2-Client",
                LocalApiDiagnostics.SELF_TEST_CLIENT,
            )
            val status = connection.responseCode
            if (status != 200) {
                LocalApiSelfTestState.Failure(now(), "HTTP $status")
            } else {
                val body = connection.inputStream.bufferedReader().use { it.readText() }
                val version = VERSION_PATTERN.find(body)?.groupValues?.get(1)
                if (version == null) {
                    LocalApiSelfTestState.Failure(now(), "invalid_response")
                } else {
                    LocalApiSelfTestState.Success(now(), version)
                }
            }
        } catch (error: Exception) {
            LocalApiSelfTestState.Failure(now(), error.javaClass.simpleName)
        } finally {
            connection.disconnect()
        }
    }

    private companion object {
        const val TIMEOUT_MILLIS = 3_000
        val VERSION_PATTERN = Regex(""""version"\s*:\s*"([^"]+)"""")
    }
}
