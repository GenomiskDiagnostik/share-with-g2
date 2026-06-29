package io.github.genomiskdiagnostik.sendtog2.link

import android.content.Context
import androidx.work.Constraints
import androidx.work.CoroutineWorker
import androidx.work.ExistingPeriodicWorkPolicy
import androidx.work.ExistingWorkPolicy
import androidx.work.NetworkType
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.PeriodicWorkRequestBuilder
import androidx.work.WorkManager
import androidx.work.WorkerParameters
import androidx.work.workDataOf
import io.github.genomiskdiagnostik.sendtog2.SendToG2Application
import io.github.genomiskdiagnostik.sendtog2.data.DynamicSourceStore
import io.github.genomiskdiagnostik.sendtog2.data.SharedItemStore
import io.github.genomiskdiagnostik.sendtog2.domain.DynamicSource
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItem
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItemOrigin
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItemType
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.util.UUID
import java.util.concurrent.TimeUnit

class DynamicSourceWorker(
    appContext: Context,
    workerParameters: WorkerParameters,
) : CoroutineWorker(appContext, workerParameters) {
    override suspend fun doWork(): Result {
        val sourceId = inputData.getString(KEY_SOURCE_ID) ?: return Result.failure()
        val application = applicationContext as SendToG2Application
        val refresher = DynamicSourceRefresher(
            itemStore = application.repository,
            sourceStore = application.repository,
            fetcher = DynamicLinkContentFetcher(),
        )
        return when (
            withContext(Dispatchers.IO) { refresher.refresh(sourceId) }
        ) {
            DynamicSourceRefreshResult.Success -> Result.success()
            DynamicSourceRefreshResult.NotFound,
            DynamicSourceRefreshResult.Disabled,
            DynamicSourceRefreshResult.PermanentFailure,
            -> Result.success()
            DynamicSourceRefreshResult.TemporaryFailure ->
                if (runAttemptCount < MAX_RETRIES) Result.retry() else Result.success()
        }
    }

    companion object {
        internal const val KEY_SOURCE_ID = "source_id"
        private const val MAX_RETRIES = 2
    }
}

sealed interface DynamicSourceRefreshResult {
    data object Success : DynamicSourceRefreshResult
    data object NotFound : DynamicSourceRefreshResult
    data object Disabled : DynamicSourceRefreshResult
    data object TemporaryFailure : DynamicSourceRefreshResult
    data object PermanentFailure : DynamicSourceRefreshResult
}

class DynamicSourceRefresher(
    private val itemStore: SharedItemStore,
    private val sourceStore: DynamicSourceStore,
    private val fetcher: DynamicLinkContentFetcher,
    private val now: () -> Long = System::currentTimeMillis,
    private val newItemId: () -> String = { UUID.randomUUID().toString() },
) {
    suspend fun refresh(sourceId: String): DynamicSourceRefreshResult {
        val source = sourceStore.getDynamicSourceById(sourceId)
            ?: return DynamicSourceRefreshResult.NotFound
        if (!source.enabled) return DynamicSourceRefreshResult.Disabled

        val fetchedAt = now()
        return when (val result = fetcher.fetch(source.url, source.cssSelector)) {
            is DynamicLinkFetchResult.Success -> {
                val existing = itemStore.getAll().firstOrNull {
                    it.dynamicSourceId == source.id
                }
                val content = result.content
                sourceStore.upsertDynamicItem(
                    SharedItem(
                        id = existing?.id ?: newItemId(),
                        type = SharedItemType.URL,
                        title = content.title ?: source.name,
                        text = content.text,
                        sourceApp = "dynamic:${source.name}",
                        createdAt = fetchedAt,
                        read = existing?.takeIf {
                            it.dynamicFingerprint == content.fingerprint
                        }?.read ?: false,
                        origin = SharedItemOrigin.DYNAMIC,
                        dynamicSourceId = source.id,
                        dynamicFingerprint = content.fingerprint,
                    ),
                )
                sourceStore.upsertDynamicSource(
                    source.copy(
                        lastFetchedAt = fetchedAt,
                        lastSuccessAt = fetchedAt,
                        lastError = null,
                    ),
                )
                DynamicSourceRefreshResult.Success
            }
            DynamicLinkFetchResult.TemporaryFailure -> {
                sourceStore.upsertDynamicSource(
                    source.copy(
                        lastFetchedAt = fetchedAt,
                        lastError = "temporary_fetch_failure",
                    ),
                )
                DynamicSourceRefreshResult.TemporaryFailure
            }
            DynamicLinkFetchResult.PermanentFailure -> {
                sourceStore.upsertDynamicSource(
                    source.copy(
                        lastFetchedAt = fetchedAt,
                        lastError = "content_not_available",
                    ),
                )
                DynamicSourceRefreshResult.PermanentFailure
            }
        }
    }
}

object DynamicSourceWorkScheduler {
    suspend fun scheduleAll(context: Context) {
        val application = context.applicationContext as SendToG2Application
        application.repository.getDynamicSources().forEach { source ->
            schedule(context, source)
        }
    }

    fun schedule(context: Context, source: DynamicSource) {
        val manager = WorkManager.getInstance(context)
        if (!source.enabled) {
            manager.cancelUniqueWork(periodicWorkName(source.id))
            return
        }
        val request = PeriodicWorkRequestBuilder<DynamicSourceWorker>(
            source.frequencyMinutes.coerceAtLeast(DynamicSource.MIN_FREQUENCY_MINUTES),
            TimeUnit.MINUTES,
        )
            .setConstraints(networkConstraints())
            .setInputData(workDataOf(DynamicSourceWorker.KEY_SOURCE_ID to source.id))
            .build()
        manager.enqueueUniquePeriodicWork(
            periodicWorkName(source.id),
            ExistingPeriodicWorkPolicy.UPDATE,
            request,
        )
    }

    fun enqueueManualRefresh(context: Context, sourceId: String) {
        val request = OneTimeWorkRequestBuilder<DynamicSourceWorker>()
            .setConstraints(networkConstraints())
            .setInputData(workDataOf(DynamicSourceWorker.KEY_SOURCE_ID to sourceId))
            .build()
        WorkManager.getInstance(context).enqueueUniqueWork(
            "dynamic-source-refresh-$sourceId",
            ExistingWorkPolicy.REPLACE,
            request,
        )
    }

    fun cancel(context: Context, sourceId: String) {
        WorkManager.getInstance(context).cancelUniqueWork(periodicWorkName(sourceId))
    }

    private fun networkConstraints(): Constraints =
        Constraints.Builder()
            .setRequiredNetworkType(NetworkType.CONNECTED)
            .build()

    private fun periodicWorkName(sourceId: String): String =
        "dynamic-source-periodic-$sourceId"
}
