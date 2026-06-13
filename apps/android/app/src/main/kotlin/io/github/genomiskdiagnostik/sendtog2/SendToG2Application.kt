package io.github.genomiskdiagnostik.sendtog2

import android.app.Application
import androidx.room.Room
import io.github.genomiskdiagnostik.sendtog2.api.LocalApiRouter
import io.github.genomiskdiagnostik.sendtog2.api.LocalApiServer
import io.github.genomiskdiagnostik.sendtog2.data.SharedDatabase
import io.github.genomiskdiagnostik.sendtog2.data.SharedItemRepository
import io.github.genomiskdiagnostik.sendtog2.notification.SharedNotificationService

class SendToG2Application : Application() {
    lateinit var repository: SharedItemRepository
        private set
    lateinit var localApiServer: LocalApiServer
        private set

    override fun onCreate() {
        super.onCreate()

        val database = Room.databaseBuilder(
            applicationContext,
            SharedDatabase::class.java,
            SharedDatabase.NAME,
        ).build()

        repository = SharedItemRepository(database.sharedItemDao())
        localApiServer = LocalApiServer(
            router = LocalApiRouter(repository),
        )
        localApiServer.start()
        SharedNotificationService.createChannel(this)
    }

    override fun onTerminate() {
        localApiServer.stop()
        super.onTerminate()
    }
}
