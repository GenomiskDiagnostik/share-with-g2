package io.github.genomiskdiagnostik.sendtog2.api

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import java.security.MessageDigest
import java.security.SecureRandom
import java.util.Base64
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.filterNotNull
import kotlinx.coroutines.flow.map

private val Context.localApiPreferences: DataStore<Preferences> by preferencesDataStore(
    name = "local_api_preferences",
)

class LocalApiAccessKeyStore(
    private val dataStore: DataStore<Preferences>,
    private val generateKey: () -> String = ::newAccessKey,
) {
    constructor(context: Context) : this(context.localApiPreferences)

    val accessKey: Flow<String> = dataStore.data
        .map { preferences -> preferences[ACCESS_KEY] }
        .filterNotNull()

    suspend fun getOrCreate(): String {
        var result: String? = null
        dataStore.edit { preferences ->
            result = preferences[ACCESS_KEY] ?: generateKey().also { generated ->
                preferences[ACCESS_KEY] = generated
            }
        }
        return requireNotNull(result)
    }

    suspend fun rotate(): String {
        val generated = generateKey()
        dataStore.edit { preferences ->
            preferences[ACCESS_KEY] = generated
        }
        return generated
    }

    suspend fun matches(candidate: String?): Boolean {
        if (candidate.isNullOrBlank()) return false
        val expected = getOrCreate()
        return MessageDigest.isEqual(
            expected.toByteArray(Charsets.UTF_8),
            candidate.toByteArray(Charsets.UTF_8),
        )
    }

    private companion object {
        val ACCESS_KEY = stringPreferencesKey("access_key")
    }
}

internal fun newAccessKey(): String {
    val bytes = ByteArray(24)
    SecureRandom().nextBytes(bytes)
    return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes)
}

fun interface LocalApiAuthorizer {
    suspend fun isAuthorized(request: ApiRequest): Boolean
}

class BearerTokenAuthorizer(
    private val expectedAccessKey: suspend () -> String,
) : LocalApiAuthorizer {
    constructor(accessKeyStore: LocalApiAccessKeyStore) : this(accessKeyStore::getOrCreate)

    override suspend fun isAuthorized(request: ApiRequest): Boolean {
        val header = request.headers["authorization"] ?: return false
        if (!header.startsWith(BEARER_PREFIX, ignoreCase = true)) return false
        val candidate = header.substring(BEARER_PREFIX.length).trim()
        if (candidate.isBlank()) return false
        return MessageDigest.isEqual(
            expectedAccessKey().toByteArray(Charsets.UTF_8),
            candidate.toByteArray(Charsets.UTF_8),
        )
    }

    private companion object {
        const val BEARER_PREFIX = "Bearer "
    }
}
