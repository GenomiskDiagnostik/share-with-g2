package io.github.genomiskdiagnostik.sendtog2.screen

object ScreenShareIntervals {
    const val DEFAULT_MILLIS = 1_000L
    const val FAST_MILLIS = 500L

    fun normalize(value: Long): Long =
        if (value == FAST_MILLIS) FAST_MILLIS else DEFAULT_MILLIS
}
