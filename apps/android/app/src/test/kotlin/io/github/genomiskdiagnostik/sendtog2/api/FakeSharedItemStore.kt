package io.github.genomiskdiagnostik.sendtog2.api

import io.github.genomiskdiagnostik.sendtog2.data.SharedItemStore
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItem
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow

class FakeSharedItemStore(
    items: List<SharedItem> = emptyList(),
) : SharedItemStore {
    private val values = MutableStateFlow(items)

    override fun observeAll(): Flow<List<SharedItem>> = values

    override suspend fun insert(item: SharedItem) {
        values.value = (values.value + item).sortedByDescending(SharedItem::createdAt)
    }

    override suspend fun getAll(): List<SharedItem> = values.value

    override suspend fun getById(id: String): SharedItem? =
        values.value.firstOrNull { it.id == id }

    override suspend fun updateLinkContent(
        id: String,
        expectedUrl: String,
        title: String?,
        text: String,
    ): Boolean {
        val current = getById(id)
        if (current?.text != expectedUrl) return false

        values.value = values.value.map { item ->
            if (item.id == id) item.copy(title = title, text = text) else item
        }
        return true
    }

    override suspend fun updateRead(id: String, read: Boolean): Boolean {
        var updated = false
        values.value = values.value.map { item ->
            if (item.id == id) {
                updated = true
                item.copy(read = read)
            } else {
                item
            }
        }
        return updated
    }

    override suspend fun deleteById(id: String): Boolean {
        val original = values.value
        values.value = original.filterNot { it.id == id }
        return values.value.size != original.size
    }

    override suspend fun clearAll() {
        values.value = emptyList()
    }
}
