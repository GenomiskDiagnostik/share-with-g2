package io.github.genomiskdiagnostik.sendtog2.data

import androidx.room.Entity
import androidx.room.PrimaryKey
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItem
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItemType

@Entity(tableName = "shared_items")
data class SharedItemEntity(
    @PrimaryKey val id: String,
    val type: String,
    val title: String?,
    val text: String,
    val sourceApp: String?,
    val createdAt: Long,
    val read: Boolean,
)

fun SharedItem.toEntity() = SharedItemEntity(
    id = id,
    type = type.name.lowercase(),
    title = title,
    text = text,
    sourceApp = sourceApp,
    createdAt = createdAt,
    read = read,
)

fun SharedItemEntity.toDomain() = SharedItem(
    id = id,
    type = SharedItemType.valueOf(type.uppercase()),
    title = title,
    text = text,
    sourceApp = sourceApp,
    createdAt = createdAt,
    read = read,
)
