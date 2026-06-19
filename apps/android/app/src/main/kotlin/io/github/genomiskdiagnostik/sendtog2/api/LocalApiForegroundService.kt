package io.github.genomiskdiagnostik.sendtog2.api

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.pm.ServiceInfo
import android.os.Build
import android.os.IBinder
import androidx.core.app.NotificationCompat
import androidx.core.content.ContextCompat
import io.github.genomiskdiagnostik.sendtog2.R
import io.github.genomiskdiagnostik.sendtog2.SendToG2Application
import io.github.genomiskdiagnostik.sendtog2.ui.MainActivity

class LocalApiForegroundService : Service() {
    private val server: LocalApiServer
        get() = (application as SendToG2Application).localApiServer

    override fun onCreate() {
        super.onCreate()
        createChannel()
    }

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        if (intent?.action == ACTION_STOP) {
            stopBridge()
            return START_NOT_STICKY
        }

        startAsForeground()
        server.start()
        return START_STICKY
    }

    override fun onDestroy() {
        server.stop()
        super.onDestroy()
    }

    override fun onTimeout(startId: Int, fgsType: Int) {
        stopBridge()
    }

    private fun stopBridge() {
        server.stop()
        stopForeground(STOP_FOREGROUND_REMOVE)
        stopSelf()
    }

    private fun startAsForeground() {
        val openApp = PendingIntent.getActivity(
            this,
            0,
            Intent(this, MainActivity::class.java),
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
        )
        val stopService = PendingIntent.getService(
            this,
            1,
            Intent(this, LocalApiForegroundService::class.java).setAction(ACTION_STOP),
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
        )
        val notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(getString(R.string.local_api_notification_title))
            .setContentText(getString(R.string.local_api_notification_body))
            .setContentIntent(openApp)
            .addAction(
                0,
                getString(R.string.local_api_notification_stop),
                stopService,
            )
            .setOngoing(true)
            .setCategory(NotificationCompat.CATEGORY_SERVICE)
            .build()

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            startForeground(
                NOTIFICATION_ID,
                notification,
                ServiceInfo.FOREGROUND_SERVICE_TYPE_DATA_SYNC,
            )
        } else {
            startForeground(NOTIFICATION_ID, notification)
        }
    }

    private fun createChannel() {
        val manager = getSystemService(NotificationManager::class.java)
        manager.createNotificationChannel(
            NotificationChannel(
                CHANNEL_ID,
                getString(R.string.local_api_channel_name),
                NotificationManager.IMPORTANCE_LOW,
            ).apply {
                description = getString(R.string.local_api_channel_description)
            },
        )
    }

    companion object {
        private const val CHANNEL_ID = "local_api_to_g2"
        private const val NOTIFICATION_ID = 4022
        private const val ACTION_STOP =
            "io.github.genomiskdiagnostik.sendtog2.action.STOP_LOCAL_API"

        fun start(context: Context) {
            val application = context.applicationContext as SendToG2Application
            application.localApiServer.start()
            ContextCompat.startForegroundService(
                context,
                Intent(context, LocalApiForegroundService::class.java),
            )
        }
    }
}
