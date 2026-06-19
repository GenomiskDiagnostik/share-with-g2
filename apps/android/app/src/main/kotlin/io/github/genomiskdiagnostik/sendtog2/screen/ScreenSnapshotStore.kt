package io.github.genomiskdiagnostik.sendtog2.screen

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

class ScreenSnapshotStore {
    private val snapshot = MutableStateFlow<ScreenSnapshot?>(null)
    private val sharing = MutableStateFlow(ScreenShareStatus())

    fun observe(): StateFlow<ScreenSnapshot?> = snapshot.asStateFlow()

    fun observeSharing(): StateFlow<ScreenShareStatus> = sharing.asStateFlow()

    fun get(): ScreenSnapshot? = snapshot.value

    fun replace(value: ScreenSnapshot) {
        snapshot.value = value
    }

    fun clear() {
        snapshot.value = null
    }

    fun startSharing(intervalMillis: Long) {
        sharing.value = ScreenShareStatus(
            active = true,
            intervalMillis = ScreenShareIntervals.normalize(intervalMillis),
        )
    }

    fun stopSharing() {
        sharing.value = sharing.value.copy(active = false)
    }
}

data class ScreenShareStatus(
    val active: Boolean = false,
    val intervalMillis: Long = ScreenShareIntervals.DEFAULT_MILLIS,
)
