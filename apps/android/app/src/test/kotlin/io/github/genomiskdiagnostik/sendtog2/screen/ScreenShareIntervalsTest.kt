package io.github.genomiskdiagnostik.sendtog2.screen

import org.junit.Assert.assertEquals
import org.junit.Test

class ScreenShareIntervalsTest {
    @Test
    fun `normalizes supported intervals`() {
        assertEquals(500L, ScreenShareIntervals.normalize(500L))
        assertEquals(1_000L, ScreenShareIntervals.normalize(1_000L))
    }

    @Test
    fun `falls back to one second for unsupported intervals`() {
        assertEquals(1_000L, ScreenShareIntervals.normalize(0L))
        assertEquals(1_000L, ScreenShareIntervals.normalize(250L))
    }
}
