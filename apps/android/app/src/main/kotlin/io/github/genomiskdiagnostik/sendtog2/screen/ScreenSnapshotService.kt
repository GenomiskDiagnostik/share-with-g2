package io.github.genomiskdiagnostik.sendtog2.screen

import android.app.NotificationChannel
import android.app.NotificationManager
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
import androidx.core.app.NotificationCompat
import io.github.genomiskdiagnostik.sendtog2.R
import io.github.genomiskdiagnostik.sendtog2.SendToG2Application
import java.util.UUID
import java.util.concurrent.atomic.AtomicBoolean

class ScreenSnapshotService : Service() {
    private var projection: MediaProjection? = null
    private var virtualDisplay: VirtualDisplay? = null
    private var imageReader: ImageReader? = null
    private var handlerThread: HandlerThread? = null
    private val captured = AtomicBoolean(false)

    override fun onCreate() {
        super.onCreate()
        createChannel()
    }

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        startAsForeground()

        val resultCode = intent?.getIntExtra(EXTRA_RESULT_CODE, 0) ?: 0
        val resultData = intent?.parcelableIntentExtra(EXTRA_RESULT_DATA)
        if (resultCode == 0 || resultData == null) {
            stopSelf(startId)
            return START_NOT_STICKY
        }

        capture(resultCode, resultData, startId)
        return START_NOT_STICKY
    }

    override fun onDestroy() {
        releaseCapture()
        super.onDestroy()
    }

    private fun capture(resultCode: Int, resultData: Intent, startId: Int) {
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
                if (!captured.compareAndSet(false, true)) return@setOnImageAvailableListener
                handler.removeCallbacksAndMessages(null)
                handleImage(source)
                stopSelf(startId)
            },
            handler,
        )

        handler.postDelayed(
            {
                if (captured.compareAndSet(false, true)) {
                    stopSelf(startId)
                }
            },
            CAPTURE_TIMEOUT_MILLIS,
        )

        val manager = getSystemService(MediaProjectionManager::class.java)
        val mediaProjection = manager.getMediaProjection(resultCode, resultData)
        if (mediaProjection == null) {
            stopSelf(startId)
            return
        }
        projection = mediaProjection
        mediaProjection.registerCallback(
            object : MediaProjection.Callback() {
                override fun onStop() {
                    releaseCapture()
                }
            },
            handler,
        )
        virtualDisplay = mediaProjection.createVirtualDisplay(
            "send-to-g2-screen-snapshot",
            width,
            height,
            density,
            DisplayManager.VIRTUAL_DISPLAY_FLAG_AUTO_MIRROR,
            reader.surface,
            null,
            handler,
        )
    }

    private fun handleImage(reader: ImageReader) {
        reader.acquireLatestImage()?.use { image ->
            val plane = image.planes.firstOrNull() ?: return
            val buffer = plane.buffer
            val pixelStride = plane.pixelStride
            val rowStride = plane.rowStride
            val rowPadding = rowStride - pixelStride * image.width
            val bitmapWidth = image.width + rowPadding / pixelStride
            val bitmap = Bitmap.createBitmap(
                bitmapWidth,
                image.height,
                Bitmap.Config.ARGB_8888,
            )
            bitmap.copyPixelsFromBuffer(buffer)
            val cropped = Bitmap.createBitmap(bitmap, 0, 0, image.width, image.height)
            bitmap.recycle()

            try {
                val encoded = ScreenSnapshotEncoder.encode(cropped)
                (application as SendToG2Application).screenSnapshotStore.replace(
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
    }

    private fun startAsForeground() {
        val notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(getString(R.string.screen_snapshot_notification_title))
            .setContentText(getString(R.string.screen_snapshot_notification_body))
            .setOngoing(true)
            .setCategory(NotificationCompat.CATEGORY_SERVICE)
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
        virtualDisplay?.release()
        virtualDisplay = null
        imageReader?.close()
        imageReader = null
        val currentProjection = projection
        projection = null
        currentProjection?.stop()
        handlerThread?.quitSafely()
        handlerThread = null
    }

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
        private const val CAPTURE_TIMEOUT_MILLIS = 5_000L
        private const val EXTRA_RESULT_CODE = "result_code"
        private const val EXTRA_RESULT_DATA = "result_data"

        fun start(context: Context, resultCode: Int, resultData: Intent) {
            val intent = Intent(context, ScreenSnapshotService::class.java)
                .putExtra(EXTRA_RESULT_CODE, resultCode)
                .putExtra(EXTRA_RESULT_DATA, resultData)
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                context.startForegroundService(intent)
            } else {
                context.startService(intent)
            }
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
