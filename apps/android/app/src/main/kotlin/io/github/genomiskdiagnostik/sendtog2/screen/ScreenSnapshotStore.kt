package io.github.genomiskdiagnostik.sendtog2.screen

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

class ScreenSnapshotStore {
    private val snapshot = MutableStateFlow<ScreenSnapshot?>(null)

    fun observe(): StateFlow<ScreenSnapshot?> = snapshot.asStateFlow()

    fun get(): ScreenSnapshot? = snapshot.value

    fun replace(value: ScreenSnapshot) {
        snapshot.value = value
    }

    fun clear() {
        snapshot.value = null
    }
}
