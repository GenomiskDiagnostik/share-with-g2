package io.github.genomiskdiagnostik.sendtog2.share

import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.lifecycle.lifecycleScope
import io.github.genomiskdiagnostik.sendtog2.R
import io.github.genomiskdiagnostik.sendtog2.SendToG2Application
import io.github.genomiskdiagnostik.sendtog2.domain.ShareParseResult
import io.github.genomiskdiagnostik.sendtog2.domain.ShareParser
import io.github.genomiskdiagnostik.sendtog2.notification.SharedNotificationService
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class ShareReceiverActivity : ComponentActivity() {
    private val parser = ShareParser()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        lifecycleScope.launch(Dispatchers.IO) {
            val payload = IntentSharePayloadFactory.from(intent, callingPackage)
            val result = payload?.let(parser::parse) ?: ShareParseResult.Unsupported

            val message = when (result) {
                is ShareParseResult.Success -> {
                    val application = application as SendToG2Application
                    application.repository.insert(result.item)
                    SharedNotificationService.show(this@ShareReceiverActivity, result.item)
                    R.string.share_saved
                }

                ShareParseResult.TooLarge -> R.string.share_too_large
                ShareParseResult.Empty,
                ShareParseResult.Unsupported,
                -> R.string.share_invalid
            }

            withContext(Dispatchers.Main) {
                Toast.makeText(this@ShareReceiverActivity, message, Toast.LENGTH_SHORT).show()
                finish()
            }
        }
    }
}
