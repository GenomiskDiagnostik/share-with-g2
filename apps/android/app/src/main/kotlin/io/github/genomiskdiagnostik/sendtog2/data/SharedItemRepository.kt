package io.github.genomiskdiagnostik.sendtog2.data

import io.github.genomiskdiagnostik.sendtog2.domain.SharedItem
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

class SharedItemRepository(
    private val dao: SharedItemDao,
) : SharedItemStore {
    override fun observeAll(): Flow<List<SharedItem>> =
        dao.observeAll().map { items -> items.map(SharedItemEntity::toDomain) }

    override suspend fun insert(item: SharedItem) {
        dao.insert(item.toEntity())
    }

    override suspend fun getAll(): List<SharedItem> =
        dao.getAll().map(SharedItemEntity::toDomain)

    override suspend fun getById(id: String): SharedItem? =
        dao.getById(id)?.toDomain()

    override suspend fun deleteById(id: String): Boolean =
        dao.deleteById(id) > 0

    override suspend fun clearAll() {
        dao.clearAll()
    }
}
