package io.github.genomiskdiagnostik.sendtog2.screen

import org.junit.Assert.assertEquals
import org.junit.Assert.assertThrows
import org.junit.Test

class ScreenSnapshotSizingTest {
    @Test
    fun `fits phone portrait screen into G2 image bounds`() {
        val size = ScreenSnapshotSizing.fitWithin(1080, 2400)

        assertEquals(SnapshotSize(width = 64, height = 144), size)
    }

    @Test
    fun `fits landscape screen into G2 image bounds`() {
        val size = ScreenSnapshotSizing.fitWithin(2400, 1080)

        assertEquals(SnapshotSize(width = 288, height = 129), size)
    }

    @Test
    fun `does not upscale small images`() {
        val size = ScreenSnapshotSizing.fitWithin(120, 80)

        assertEquals(SnapshotSize(width = 120, height = 80), size)
    }

    @Test
    fun `rejects invalid dimensions`() {
        assertThrows(IllegalArgumentException::class.java) {
            ScreenSnapshotSizing.fitWithin(0, 100)
        }
    }
}
