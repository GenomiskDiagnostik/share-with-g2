package io.github.genomiskdiagnostik.sendtog2.ui

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import io.github.genomiskdiagnostik.sendtog2.api.HttpLocalApiHealthCheck
import io.github.genomiskdiagnostik.sendtog2.api.LocalApiAccessKeyStore
import io.github.genomiskdiagnostik.sendtog2.api.LocalApiHealthCheck
import io.github.genomiskdiagnostik.sendtog2.api.LocalApiSelfTestState
import io.github.genomiskdiagnostik.sendtog2.api.LocalApiServer
import io.github.genomiskdiagnostik.sendtog2.data.SharedItemStore
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItem
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

class MainViewModel(
    private val repository: SharedItemStore,
    private val localApiServer: LocalApiServer,
    private val accessKeyStore: LocalApiAccessKeyStore,
    private val screenSnapshotStore: ScreenSnapshotStore,
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

    class Factory(
        private val repository: SharedItemStore,
        private val localApiServer: LocalApiServer,
        private val accessKeyStore: LocalApiAccessKeyStore,
        private val screenSnapshotStore: ScreenSnapshotStore,
    ) : ViewModelProvider.Factory {
        @Suppress("UNCHECKED_CAST")
        override fun <T : ViewModel> create(modelClass: Class<T>): T {
            require(modelClass.isAssignableFrom(MainViewModel::class.java))
            return MainViewModel(
                repository,
                localApiServer,
                accessKeyStore,
                screenSnapshotStore,
            ) as T
        }
    }
}
