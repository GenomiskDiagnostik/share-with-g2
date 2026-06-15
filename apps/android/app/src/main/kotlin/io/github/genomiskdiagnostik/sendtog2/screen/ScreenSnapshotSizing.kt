package io.github.genomiskdiagnostik.sendtog2.screen

data class SnapshotSize(
    val width: Int,
    val height: Int,
)

object ScreenSnapshotSizing {
    const val MAX_WIDTH = 288
    const val MAX_HEIGHT = 144

    fun fitWithin(
        sourceWidth: Int,
        sourceHeight: Int,
        maxWidth: Int = MAX_WIDTH,
        maxHeight: Int = MAX_HEIGHT,
    ): SnapshotSize {
        require(sourceWidth > 0) { "sourceWidth must be positive" }
        require(sourceHeight > 0) { "sourceHeight must be positive" }
        require(maxWidth > 0) { "maxWidth must be positive" }
        require(maxHeight > 0) { "maxHeight must be positive" }

        val scale = minOf(
            maxWidth.toDouble() / sourceWidth.toDouble(),
            maxHeight.toDouble() / sourceHeight.toDouble(),
            1.0,
        )
        return SnapshotSize(
            width = maxOf(1, (sourceWidth * scale).toInt()),
            height = maxOf(1, (sourceHeight * scale).toInt()),
        )
    }
}
