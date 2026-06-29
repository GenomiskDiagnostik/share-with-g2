package io.github.genomiskdiagnostik.sendtog2.api

import io.github.genomiskdiagnostik.sendtog2.data.DynamicSourceStore
import io.github.genomiskdiagnostik.sendtog2.domain.DynamicSource
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItem
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow

class FakeDynamicSourceStore(
    sources: List<DynamicSource> = emptyList(),
) : DynamicSourceStore {
    private val values = MutableStateFlow(sources)
    private val dynamicItems = MutableStateFlow(emptyList<SharedItem>())

    override fun observeDynamicSources(): Flow<List<DynamicSource>> = values

    override suspend fun getDynamicSources(): List<DynamicSource> = values.value

    override suspend fun getDynamicSourceById(id: String): DynamicSource? =
        values.value.firstOrNull { it.id == id }

    override suspend fun upsertDynamicSource(source: DynamicSource) {
        values.value = (values.value.filterNot { it.id == source.id } + source)
            .sortedBy { it.name.lowercase() }
    }

    override suspend fun deleteDynamicSourceById(id: String): Boolean {
        val original = values.value
        values.value = original.filterNot { it.id == id }
        dynamicItems.value = dynamicItems.value.filterNot { it.dynamicSourceId == id }
        return values.value.size != original.size
    }

    override suspend fun upsertDynamicItem(item: SharedItem) {
        dynamicItems.value = dynamicItems.value.filterNot {
            it.dynamicSourceId == item.dynamicSourceId
        } + item
    }

    override suspend fun deleteDynamicItemForSource(sourceId: String): Boolean {
        val original = dynamicItems.value
        dynamicItems.value = original.filterNot { it.dynamicSourceId == sourceId }
        return dynamicItems.value.size != original.size
    }
}
