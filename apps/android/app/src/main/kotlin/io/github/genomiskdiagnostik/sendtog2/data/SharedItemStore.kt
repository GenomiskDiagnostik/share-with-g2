package io.github.genomiskdiagnostik.sendtog2.data

import io.github.genomiskdiagnostik.sendtog2.domain.DynamicSource
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItem
import kotlinx.coroutines.flow.Flow

interface SharedItemStore {
    fun observeAll(): Flow<List<SharedItem>>

    suspend fun insert(item: SharedItem)

    suspend fun getAll(): List<SharedItem>

    suspend fun getById(id: String): SharedItem?

    suspend fun updateLinkContent(
        id: String,
        expectedUrl: String,
        title: String?,
        text: String,
    ): Boolean

    suspend fun updateRead(id: String, read: Boolean): Boolean

    suspend fun deleteById(id: String): Boolean

    suspend fun clearAll()
}

interface DynamicSourceStore {
    fun observeDynamicSources(): Flow<List<DynamicSource>>

    suspend fun getDynamicSources(): List<DynamicSource>

    suspend fun getDynamicSourceById(id: String): DynamicSource?

    suspend fun upsertDynamicSource(source: DynamicSource)

    suspend fun deleteDynamicSourceById(id: String): Boolean

    suspend fun upsertDynamicItem(item: SharedItem)

    suspend fun deleteDynamicItemForSource(sourceId: String): Boolean
}
