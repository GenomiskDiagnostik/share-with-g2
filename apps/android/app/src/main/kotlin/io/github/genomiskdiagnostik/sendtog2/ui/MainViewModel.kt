package io.github.genomiskdiagnostik.sendtog2.ui

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import io.github.genomiskdiagnostik.sendtog2.api.HttpLocalApiHealthCheck
import io.github.genomiskdiagnostik.sendtog2.api.LocalApiAccessKeyStore
import io.github.genomiskdiagnostik.sendtog2.api.LocalApiHealthCheck
import io.github.genomiskdiagnostik.sendtog2.api.LocalApiSelfTestState
import io.github.genomiskdiagnostik.sendtog2.api.LocalApiServer
import io.github.genomiskdiagnostik.sendtog2.data.SharedItemStore
import io.github.genomiskdiagnostik.sendtog2.data.DynamicSourceStore
import io.github.genomiskdiagnostik.sendtog2.domain.DynamicSource
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItem
import io.github.genomiskdiagnostik.sendtog2.link.DynamicSourceWorkScheduler
import io.github.genomiskdiagnostik.sendtog2.screen.ScreenSnapshot
import io.github.genomiskdiagnostik.sendtog2.screen.ScreenSnapshotStore
import io.github.genomiskdiagnostik.sendtog2.screen.ScreenShareStatus
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import java.net.URI
import java.util.UUID

class MainViewModel(
    private val repository: SharedItemStore,
    private val dynamicSourceStore: DynamicSourceStore,
    private val localApiServer: LocalApiServer,
    private val accessKeyStore: LocalApiAccessKeyStore,
    private val screenSnapshotStore: ScreenSnapshotStore,
    private val appContext: Context,
    private val healthCheck: LocalApiHealthCheck = HttpLocalApiHealthCheck(),
) : ViewModel() {
    val items: StateFlow<List<SharedItem>> = repository.observeAll().stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5_000),
        initialValue = emptyList(),
    )
    private val mutableSelfTest = MutableStateFlow<LocalApiSelfTestState>(
        LocalApiSelfTestState.Idle,
    )
    val selfTest: StateFlow<LocalApiSelfTestState> = mutableSelfTest.asStateFlow()
    val accessKey: StateFlow<String> = accessKeyStore.accessKey.stateIn(
        scope = viewModelScope,
        started = SharingStarted.Eagerly,
        initialValue = "",
    )
    val screenSnapshot: StateFlow<ScreenSnapshot?> = screenSnapshotStore.observe().stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5_000),
        initialValue = null,
    )
    val screenShareStatus: StateFlow<ScreenShareStatus> =
        screenSnapshotStore.observeSharing().stateIn(
            scope = viewModelScope,
            started = SharingStarted.Eagerly,
            initialValue = ScreenShareStatus(),
        )
    val dynamicSources: StateFlow<List<DynamicSource>> =
        dynamicSourceStore.observeDynamicSources().stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5_000),
            initialValue = emptyList(),
        )

    init {
        viewModelScope.launch(Dispatchers.IO) {
            accessKeyStore.getOrCreate()
        }
    }

    fun delete(id: String) {
        viewModelScope.launch {
            repository.deleteById(id)
        }
    }

    fun clearAll() {
        viewModelScope.launch {
            repository.clearAll()
        }
    }

    fun updateRead(id: String, read: Boolean) {
        viewModelScope.launch {
            repository.updateRead(id, read)
        }
    }

    fun runLocalApiSelfTest() {
        if (mutableSelfTest.value == LocalApiSelfTestState.Running) return
        mutableSelfTest.value = LocalApiSelfTestState.Running
        viewModelScope.launch(Dispatchers.IO) {
            mutableSelfTest.value = healthCheck.check(localApiServer.state.value.url)
        }
    }

    fun restartLocalApi() {
        mutableSelfTest.value = LocalApiSelfTestState.Idle
        viewModelScope.launch(Dispatchers.IO) {
            localApiServer.restart()
        }
    }

    fun rotateAccessKey() {
        viewModelScope.launch(Dispatchers.IO) {
            accessKeyStore.rotate()
        }
    }

    fun clearScreenSnapshot() {
        screenSnapshotStore.clear()
    }

    fun addDynamicSource(
        name: String,
        url: String,
        cssSelector: String,
        frequencyMinutes: Long,
    ) {
        val source = buildDynamicSource(
            id = UUID.randomUUID().toString(),
            name = name,
            url = url,
            cssSelector = cssSelector,
            frequencyMinutes = frequencyMinutes,
            enabled = true,
            existing = null,
        ) ?: return
        viewModelScope.launch(Dispatchers.IO) {
            dynamicSourceStore.upsertDynamicSource(source)
            DynamicSourceWorkScheduler.schedule(appContext, source)
            DynamicSourceWorkScheduler.enqueueManualRefresh(appContext, source.id)
        }
    }

    fun updateDynamicSource(source: DynamicSource) {
        val normalized = buildDynamicSource(
            id = source.id,
            name = source.name,
            url = source.url,
            cssSelector = source.cssSelector,
            frequencyMinutes = source.frequencyMinutes,
            enabled = source.enabled,
            existing = source,
        ) ?: return
        viewModelScope.launch(Dispatchers.IO) {
            dynamicSourceStore.upsertDynamicSource(normalized)
            DynamicSourceWorkScheduler.schedule(appContext, normalized)
        }
    }

    fun deleteDynamicSource(id: String) {
        viewModelScope.launch(Dispatchers.IO) {
            dynamicSourceStore.deleteDynamicSourceById(id)
            DynamicSourceWorkScheduler.cancel(appContext, id)
        }
    }

    fun refreshDynamicSource(id: String) {
        DynamicSourceWorkScheduler.enqueueManualRefresh(appContext, id)
    }

    class Factory(
        private val repository: SharedItemStore,
        private val dynamicSourceStore: DynamicSourceStore,
        private val localApiServer: LocalApiServer,
        private val accessKeyStore: LocalApiAccessKeyStore,
        private val screenSnapshotStore: ScreenSnapshotStore,
        private val appContext: Context,
    ) : ViewModelProvider.Factory {
        @Suppress("UNCHECKED_CAST")
        override fun <T : ViewModel> create(modelClass: Class<T>): T {
            require(modelClass.isAssignableFrom(MainViewModel::class.java))
            return MainViewModel(
                repository,
                dynamicSourceStore,
                localApiServer,
                accessKeyStore,
                screenSnapshotStore,
                appContext,
            ) as T
        }
    }
}

private fun buildDynamicSource(
    id: String,
    name: String,
    url: String,
    cssSelector: String,
    frequencyMinutes: Long,
    enabled: Boolean,
    existing: DynamicSource?,
): DynamicSource? {
    val cleanName = name.trim().take(DynamicSource.MAX_NAME_LENGTH)
    val cleanUrl = url.trim().take(DynamicSource.MAX_URL_LENGTH)
    val cleanSelector = cssSelector.trim().take(DynamicSource.MAX_SELECTOR_LENGTH)
    if (
        cleanName.isBlank() ||
        cleanSelector.isBlank() ||
        !isHttpUrlShape(cleanUrl)
    ) {
        return null
    }
    return DynamicSource(
        id = id,
        name = cleanName,
        url = cleanUrl,
        cssSelector = cleanSelector,
        frequencyMinutes = frequencyMinutes.coerceAtLeast(DynamicSource.MIN_FREQUENCY_MINUTES),
        enabled = enabled,
        lastFetchedAt = existing?.lastFetchedAt,
        lastSuccessAt = existing?.lastSuccessAt,
        lastError = existing?.lastError,
    )
}

private fun isHttpUrlShape(value: String): Boolean {
    val uri = runCatching { URI(value) }.getOrNull() ?: return false
    return uri.scheme?.lowercase() in setOf("http", "https") &&
        uri.host?.isNotBlank() == true &&
        uri.userInfo == null
}
