package io.github.genomiskdiagnostik.sendtog2.notification

import android.os.Build
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class SharedNotificationServiceTest {
    @Test
    fun `pre Android 13 does not require runtime permission`() {
        assertTrue(
            SharedNotificationService.shouldPostNotification(
                sdkInt = Build.VERSION_CODES.S_V2,
                permissionGranted = false,
            ),
        )
    }

    @Test
    fun `Android 13 and newer require runtime permission`() {
        assertFalse(
            SharedNotificationService.shouldPostNotification(
                sdkInt = Build.VERSION_CODES.TIRAMISU,
                permissionGranted = false,
            ),
        )
        assertTrue(
            SharedNotificationService.shouldPostNotification(
                sdkInt = Build.VERSION_CODES.TIRAMISU,
                permissionGranted = true,
            ),
        )
    }
}
