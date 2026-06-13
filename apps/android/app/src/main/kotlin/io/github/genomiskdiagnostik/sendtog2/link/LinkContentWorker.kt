package io.github.genomiskdiagnostik.sendtog2.link

import android.content.Context
import androidx.work.Constraints
import androidx.work.CoroutineWorker
import androidx.work.ExistingWorkPolicy
import androidx.work.NetworkType
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.WorkManager
import androidx.work.WorkerParameters
import androidx.work.workDataOf
import io.github.genomiskdiagnostik.sendtog2.SendToG2Application
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItem
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItemType
import io.github.genomiskdiagnostik.sendtog2.notification.SharedNotificationService
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.util.concurrent.TimeUnit

class LinkContentWorker(
    appContext: Context,
    workerParameters: WorkerParameters,
) : CoroutineWorker(appContext, workerParameters) {
    override suspend fun doWork(): Result {
        val itemId = inputData.getString(KEY_ITEM_ID) ?: return Result.failure()
        val url = inputData.getString(KEY_URL) ?: return Result.failure()
        val application = applicationContext as SendToG2Application
        val enricher = LinkContentEnricher(
            store = application.repository,
            fetcher = HttpUrlContentFetcher(),
        )

        return when (
            val result = withContext(Dispatchers.IO) {
                enricher.enrich(itemId, url)
            }
        ) {
            is LinkEnrichmentResult.Updated -> {
                SharedNotificationService.show(applicationContext, result.item)
                Result.success()
            }
            LinkEnrichmentResult.Retry ->
                if (runAttemptCount < MAX_RETRIES) Result.retry() else Result.success()
            LinkEnrichmentResult.Skipped -> Result.success()
        }
    }

    companion object {
        internal const val KEY_ITEM_ID = "item_id"
        internal const val KEY_URL = "url"
        private const val MAX_RETRIES = 2
    }
}

object LinkContentWorkScheduler {
    fun enqueue(context: Context, item: SharedItem) {
        if (item.type != SharedItemType.URL) return

        val constraints = Constraints.Builder()
            .setRequiredNetworkType(NetworkType.CONNECTED)
            .build()
        val request = OneTimeWorkRequestBuilder<LinkContentWorker>()
            .setConstraints(constraints)
            .setBackoffCriteria(
                androidx.work.BackoffPolicy.EXPONENTIAL,
                30,
                TimeUnit.SECONDS,
            )
            .setInputData(
                workDataOf(
                    LinkContentWorker.KEY_ITEM_ID to item.id,
                    LinkContentWorker.KEY_URL to item.text,
                ),
            )
            .build()

        WorkManager.getInstance(context).enqueueUniqueWork(
            "link-content-${item.id}",
            ExistingWorkPolicy.REPLACE,
            request,
        )
    }
}
