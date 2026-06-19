package io.github.genomiskdiagnostik.sendtog2.api

import androidx.test.core.app.ActivityScenario
import androidx.test.ext.junit.runners.AndroidJUnit4
import io.github.genomiskdiagnostik.sendtog2.SendToG2Application
import io.github.genomiskdiagnostik.sendtog2.ui.MainActivity
import org.junit.Assert.assertEquals
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class LocalApiForegroundServiceTest {
    @Test
    fun openingMainActivityStartsLocalApi() {
        ActivityScenario.launch(MainActivity::class.java).use { scenario ->
            scenario.onActivity { activity ->
                val application = activity.application as SendToG2Application
                assertEquals(
                    LocalApiPhase.RUNNING,
                    application.localApiServer.state.value.phase,
                )
            }
        }
    }
}
