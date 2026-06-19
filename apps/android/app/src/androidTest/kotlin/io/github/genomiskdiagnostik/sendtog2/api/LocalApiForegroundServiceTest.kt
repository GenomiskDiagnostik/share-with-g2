package io.github.genomiskdiagnostik.sendtog2.api

import androidx.test.core.app.ActivityScenario
import androidx.test.ext.junit.runners.AndroidJUnit4
import io.github.genomiskdiagnostik.sendtog2.ui.MainActivity
import java.net.HttpURLConnection
import java.net.URL
import org.junit.Assert.assertEquals
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class LocalApiForegroundServiceTest {
    @Test
    fun openingMainActivityMakesHealthEndpointAvailable() {
        ActivityScenario.launch(MainActivity::class.java).use {
            val responseCode = awaitHealthResponse()
            assertEquals(200, responseCode)
        }
    }

    private fun awaitHealthResponse(): Int {
        repeat(20) {
            val result = runCatching {
                (URL("http://127.0.0.1:8765/health").openConnection() as HttpURLConnection)
                    .run {
                        connectTimeout = 250
                        readTimeout = 250
                        try {
                            responseCode
                        } finally {
                            disconnect()
                        }
                    }
            }.getOrNull()
            if (result != null) return result
            Thread.sleep(100)
        }
        return -1
    }
}
