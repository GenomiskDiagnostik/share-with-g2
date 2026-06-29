package io.github.genomiskdiagnostik.sendtog2.data

import io.github.genomiskdiagnostik.sendtog2.domain.DynamicSource
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItem
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

class SharedItemRepository(
    private val dao: SharedItemDao,
    private val dynamicSourceDao: DynamicSourceDao,
) : SharedItemStore, DynamicSourceStore {
    override fun observeAll(): Flow<List<SharedItem>> =
        dao.observeAll().map { items -> items.map(SharedItemEntity::toDomain) }

    override suspend fun insert(item: SharedItem) {
        dao.insert(item.toEntity())
    }

    override suspend fun upsertDynamicItem(item: SharedItem) {
        dao.upsert(item.toEntity())
    }

    override suspend fun getAll(): List<SharedItem> =
        dao.getAll().map(SharedItemEntity::toDomain)

    override suspend fun getById(id: String): SharedItem? =
        dao.getById(id)?.toDomain()

    override suspend fun updateLinkContent(
        id: String,
        expectedUrl: String,
        title: String?,
        text: String,
    ): Boolean =
        dao.updateLinkContent(id, expectedUrl, title, text) > 0

    override suspend fun updateRead(id: String, read: Boolean): Boolean =
        dao.updateRead(id, read) > 0

    override suspend fun deleteById(id: String): Boolean =
        dao.deleteById(id) > 0

    override suspend fun clearAll() {
        dao.clearAll()
    }

    override fun observeDynamicSources(): Flow<List<DynamicSource>> =
        dynamicSourceDao.observeAll().map { sources -> sources.map(DynamicSourceEntity::toDomain) }

    override suspend fun getDynamicSources(): List<DynamicSource> =
        dynamicSourceDao.getAll().map(DynamicSourceEntity::toDomain)

    override suspend fun getDynamicSourceById(id: String): DynamicSource? =
        dynamicSourceDao.getById(id)?.toDomain()

    override suspend fun upsertDynamicSource(source: DynamicSource) {
        dynamicSourceDao.upsert(source.toEntity())
    }

    override suspend fun deleteDynamicSourceById(id: String): Boolean {
        val deleted = dynamicSourceDao.deleteById(id) > 0
        if (deleted) dao.deleteByDynamicSourceId(id)
        return deleted
    }

    override suspend fun deleteDynamicItemForSource(sourceId: String): Boolean =
        dao.deleteByDynamicSourceId(sourceId) > 0
}
