package io.github.genomiskdiagnostik.sendtog2.data

import androidx.room.Entity
import androidx.room.PrimaryKey
import io.github.genomiskdiagnostik.sendtog2.domain.DynamicSource

@Entity(tableName = "dynamic_sources")
data class DynamicSourceEntity(
    @PrimaryKey val id: String,
    val name: String,
    val url: String,
    val cssSelector: String,
    val frequencyMinutes: Long,
    val enabled: Boolean,
    val lastFetchedAt: Long?,
    val lastSuccessAt: Long?,
    val lastError: String?,
)

fun DynamicSource.toEntity() = DynamicSourceEntity(
    id = id,
    name = name,
    url = url,
    cssSelector = cssSelector,
    frequencyMinutes = frequencyMinutes,
    enabled = enabled,
    lastFetchedAt = lastFetchedAt,
    lastSuccessAt = lastSuccessAt,
    lastError = lastError,
)

fun DynamicSourceEntity.toDomain() = DynamicSource(
    id = id,
    name = name,
    url = url,
    cssSelector = cssSelector,
    frequencyMinutes = frequencyMinutes,
    enabled = enabled,
    lastFetchedAt = lastFetchedAt,
    lastSuccessAt = lastSuccessAt,
    lastError = lastError,
)
