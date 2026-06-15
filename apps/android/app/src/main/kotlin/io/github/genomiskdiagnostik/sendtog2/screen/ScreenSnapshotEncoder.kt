package io.github.genomiskdiagnostik.sendtog2.screen

import android.graphics.Bitmap
import android.util.Base64
import java.io.ByteArrayOutputStream

object ScreenSnapshotEncoder {
    const val MIME_TYPE = "image/png"

    fun encode(bitmap: Bitmap): EncodedSnapshot {
        val size = ScreenSnapshotSizing.fitWithin(bitmap.width, bitmap.height)
        val scaled = Bitmap.createScaledBitmap(bitmap, size.width, size.height, true)
        val bytes = ByteArrayOutputStream().use { output ->
            check(scaled.compress(Bitmap.CompressFormat.PNG, 100, output)) {
                "Could not encode screen snapshot"
            }
            output.toByteArray()
        }
        if (scaled !== bitmap) {
            scaled.recycle()
        }
        return EncodedSnapshot(
            width = size.width,
            height = size.height,
            mimeType = MIME_TYPE,
            imageBase64 = Base64.encodeToString(bytes, Base64.NO_WRAP),
        )
    }
}

data class EncodedSnapshot(
    val width: Int,
    val height: Int,
    val mimeType: String,
    val imageBase64: String,
)
