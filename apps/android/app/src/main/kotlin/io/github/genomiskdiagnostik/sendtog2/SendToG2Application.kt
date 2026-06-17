package io.github.genomiskdiagnostik.sendtog2

import android.app.Application
import androidx.room.Room
import io.github.genomiskdiagnostik.sendtog2.BuildConfig
import io.github.genomiskdiagnostik.sendtog2.api.LocalApiRouter
import io.github.genomiskdiagnostik.sendtog2.api.LocalApiServer
import io.github.genomiskdiagnostik.sendtog2.api.LocalApiAccessKeyStore
import io.github.genomiskdiagnostik.sendtog2.api.BearerTokenAuthorizer
import io.github.genomiskdiagnostik.sendtog2.data.SharedDatabase
import io.github.genomiskdiagnostik.sendtog2.data.SharedItemRepository
import io.github.genomiskdiagnostik.sendtog2.notification.SharedNotificationService
import io.github.genomiskdiagnostik.sendtog2.screen.ScreenSnapshotStore
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch

class SendToG2Application : Application() {
    private val applicationScope = CoroutineScope(SupervisorJob() + Dispatchers.IO)
    lateinit var repository: SharedItemRepository
        private set
    lateinit var accessKeyStore: LocalApiAccessKeyStore
        private set
    lateinit var localApiServer: LocalApiServer
        private set
    lateinit var screenSnapshotStore: ScreenSnapshotStore
        private set

    override fun onCreate() {
        super.onCreate()

        val database = Room.databaseBuilder(
            applicationContext,
            SharedDatabase::class.java,
            SharedDatabase.NAME,
        ).build()

        repository = SharedItemRepository(database.sharedItemDao())
        accessKeyStore = LocalApiAccessKeyStore(applicationContext)
        screenSnapshotStore = ScreenSnapshotStore()
        localApiServer = LocalApiServer(
            router = LocalApiRouter(
                store = repository,
                screenSnapshotStore = screenSnapshotStore,
                authorizer = BearerTokenAuthorizer(accessKeyStore),
                trustLoopback = BuildConfig.DEBUG,
            ),
        )
        applicationScope.launch { accessKeyStore.getOrCreate() }
        localApiServer.start()
        SharedNotificationService.createChannel(this)
    }

    override fun onTerminate() {
        localApiServer.stop()
        super.onTerminate()
    }
}
