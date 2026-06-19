package io.github.genomiskdiagnostik.sendtog2.screen

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.pm.ServiceInfo
import android.graphics.Bitmap
import android.graphics.PixelFormat
import android.hardware.display.DisplayManager
import android.hardware.display.VirtualDisplay
import android.media.ImageReader
import android.media.projection.MediaProjection
import android.media.projection.MediaProjectionManager
import android.os.Build
import android.os.Handler
import android.os.HandlerThread
import android.os.IBinder
import android.os.SystemClock
import androidx.core.app.NotificationCompat
import io.github.genomiskdiagnostik.sendtog2.R
import io.github.genomiskdiagnostik.sendtog2.SendToG2Application
import java.util.UUID

class ScreenSnapshotService : Service() {
    private var projection: MediaProjection? = null
    private var projectionCallback: MediaProjection.Callback? = null
    private var virtualDisplay: VirtualDisplay? = null
    private var imageReader: ImageReader? = null
    private var handlerThread: HandlerThread? = null
    private var captureIntervalMillis = ScreenShareIntervals.DEFAULT_MILLIS
    private var lastCapturedAt = Long.MIN_VALUE
    @Volatile
    private var captureActive = false

    override fun onCreate() {
        super.onCreate()
        createChannel()
    }

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        if (intent?.action == ACTION_STOP) {
            stopSelf()
            return START_NOT_STICKY
        }

        captureIntervalMillis = ScreenShareIntervals.normalize(
            intent?.getLongExtra(
                EXTRA_INTERVAL_MILLIS,
                ScreenShareIntervals.DEFAULT_MILLIS,
            ) ?: ScreenShareIntervals.DEFAULT_MILLIS,
        )
        startAsForeground(captureIntervalMillis)

        val resultCode = intent?.getIntExtra(EXTRA_RESULT_CODE, 0) ?: 0
        val resultData = intent?.parcelableIntentExtra(EXTRA_RESULT_DATA)
        if (resultCode == 0 || resultData == null) {
            stopSelf(startId)
            return START_NOT_STICKY
        }

        runCatching { capture(resultCode, resultData, startId) }
            .onFailure { stopSelf(startId) }
        return START_NOT_STICKY
    }

    override fun onDestroy() {
        releaseCapture()
        snapshotStore().stopSharing()
        super.onDestroy()
    }

    private fun capture(resultCode: Int, resultData: Intent, startId: Int) {
        releaseCapture()
        lastCapturedAt = Long.MIN_VALUE
        val metrics = resources.displayMetrics
        val width = metrics.widthPixels
        val height = metrics.heightPixels
        val density = metrics.densityDpi
        val thread = HandlerThread("send-to-g2-screen-snapshot").also { it.start() }
        val handler = Handler(thread.looper)
        handlerThread = thread

        val reader = ImageReader.newInstance(width, height, PixelFormat.RGBA_8888, 2)
        imageReader = reader
        reader.setOnImageAvailableListener(
            { source ->
                if (!captureActive) {
                    source.acquireLatestImage()?.close()
                    return@setOnImageAvailableListener
                }
                val now = SystemClock.elapsedRealtime()
                if (
                    lastCapturedAt != Long.MIN_VALUE &&
                    now - lastCapturedAt < captureIntervalMillis
                ) {
                    source.acquireLatestImage()?.close()
                    return@setOnImageAvailableListener
                }
                if (runCatching { handleImage(source) }.getOrDefault(false)) {
                    lastCapturedAt = now
                }
            },
            handler,
        )

        val manager = getSystemService(MediaProjectionManager::class.java)
        val mediaProjection = manager.getMediaProjection(resultCode, resultData)
        if (mediaProjection == null) {
            stopSelf(startId)
            return
        }
        projection = mediaProjection
        val callback = object : MediaProjection.Callback() {
            override fun onStop() {
                projection = null
                stopSelf(startId)
            }
        }
        projectionCallback = callback
        mediaProjection.registerCallback(callback, handler)
        virtualDisplay = mediaProjection.createVirtualDisplay(
            "send-to-g2-screen-share",
            width,
            height,
            density,
            DisplayManager.VIRTUAL_DISPLAY_FLAG_AUTO_MIRROR,
            reader.surface,
            null,
            handler,
        )
        captureActive = true
        snapshotStore().startSharing(captureIntervalMillis)
    }

    private fun handleImage(reader: ImageReader): Boolean {
        val image = reader.acquireLatestImage() ?: return false
        image.use {
            val plane = image.planes.firstOrNull() ?: return false
            val buffer = plane.buffer
            val pixelStride = plane.pixelStride
            if (pixelStride <= 0) return false
            val rowStride = plane.rowStride
            val rowPadding = rowStride - pixelStride * image.width
            val bitmapWidth = image.width + rowPadding / pixelStride
            val bitmap = Bitmap.createBitmap(
                bitmapWidth,
                image.height,
                Bitmap.Config.ARGB_8888,
            )
            bitmap.copyPixelsFromBuffer(buffer)
            val cropped = if (bitmapWidth == image.width) {
                bitmap
            } else {
                Bitmap.createBitmap(bitmap, 0, 0, image.width, image.height).also {
                    bitmap.recycle()
                }
            }

            try {
                val encoded = ScreenSnapshotEncoder.encode(cropped)
                if (!captureActive) return false
                snapshotStore().replace(
                    ScreenSnapshot(
                        id = UUID.randomUUID().toString(),
                        createdAt = System.currentTimeMillis(),
                        width = encoded.width,
                        height = encoded.height,
                        mimeType = encoded.mimeType,
                        imageBase64 = encoded.imageBase64,
                    ),
                )
            } finally {
                cropped.recycle()
            }
        }
        return true
    }

    private fun startAsForeground(intervalMillis: Long) {
        val stopIntent = Intent(this, ScreenSnapshotService::class.java)
            .setAction(ACTION_STOP)
        val stopPendingIntent = PendingIntent.getService(
            this,
            0,
            stopIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
        )
        val notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(getString(R.string.screen_snapshot_notification_title))
            .setContentText(
                getString(
                    R.string.screen_snapshot_notification_body,
                    formatInterval(intervalMillis),
                ),
            )
            .setOngoing(true)
            .setCategory(NotificationCompat.CATEGORY_SERVICE)
            .addAction(
                0,
                getString(R.string.screen_snapshot_stop),
                stopPendingIntent,
            )
            .build()
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            startForeground(
                NOTIFICATION_ID,
                notification,
                ServiceInfo.FOREGROUND_SERVICE_TYPE_MEDIA_PROJECTION,
            )
        } else {
            startForeground(NOTIFICATION_ID, notification)
        }
    }

    private fun releaseCapture() {
        captureActive = false
        imageReader?.setOnImageAvailableListener(null, null)
        virtualDisplay?.release()
        virtualDisplay = null
        imageReader?.close()
        imageReader = null
        val currentProjection = projection
        val currentCallback = projectionCallback
        projection = null
        projectionCallback = null
        if (currentProjection != null && currentCallback != null) {
            currentProjection.unregisterCallback(currentCallback)
        }
        currentProjection?.stop()
        handlerThread?.quitSafely()
        handlerThread = null
    }

    private fun snapshotStore() =
        (application as SendToG2Application).screenSnapshotStore

    private fun formatInterval(intervalMillis: Long): String =
        getString(
            if (intervalMillis == ScreenShareIntervals.FAST_MILLIS) {
                R.string.screen_snapshot_interval_fast
            } else {
                R.string.screen_snapshot_interval_default
            },
        )

    private fun createChannel() {
        val manager = getSystemService(NotificationManager::class.java)
        val channel = NotificationChannel(
            CHANNEL_ID,
            getString(R.string.screen_snapshot_channel_name),
            NotificationManager.IMPORTANCE_LOW,
        ).apply {
            description = getString(R.string.screen_snapshot_channel_description)
        }
        manager.createNotificationChannel(channel)
    }

    companion object {
        private const val CHANNEL_ID = "screen_snapshot_to_g2"
        private const val NOTIFICATION_ID = 4021
        private const val ACTION_STOP =
            "io.github.genomiskdiagnostik.sendtog2.screen.STOP"
        private const val EXTRA_RESULT_CODE = "result_code"
        private const val EXTRA_RESULT_DATA = "result_data"
        private const val EXTRA_INTERVAL_MILLIS = "interval_millis"

        fun start(
            context: Context,
            resultCode: Int,
            resultData: Intent,
            intervalMillis: Long,
        ) {
            val intent = Intent(context, ScreenSnapshotService::class.java)
                .putExtra(EXTRA_RESULT_CODE, resultCode)
                .putExtra(EXTRA_RESULT_DATA, resultData)
                .putExtra(
                    EXTRA_INTERVAL_MILLIS,
                    ScreenShareIntervals.normalize(intervalMillis),
                )
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                context.startForegroundService(intent)
            } else {
                context.startService(intent)
            }
        }

        fun stop(context: Context) {
            context.stopService(Intent(context, ScreenSnapshotService::class.java))
        }
    }
}

@Suppress("DEPRECATION")
private fun Intent.parcelableIntentExtra(name: String): Intent? =
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
        getParcelableExtra(name, Intent::class.java)
    } else {
        getParcelableExtra(name)
    }
