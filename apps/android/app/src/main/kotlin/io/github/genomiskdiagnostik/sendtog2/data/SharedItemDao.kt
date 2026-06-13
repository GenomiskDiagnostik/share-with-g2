package io.github.genomiskdiagnostik.sendtog2.data

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import kotlinx.coroutines.flow.Flow

@Dao
interface SharedItemDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(item: SharedItemEntity)

    @Query("SELECT * FROM shared_items ORDER BY createdAt DESC")
    fun observeAll(): Flow<List<SharedItemEntity>>

    @Query("SELECT * FROM shared_items ORDER BY createdAt DESC")
    suspend fun getAll(): List<SharedItemEntity>

    @Query("SELECT * FROM shared_items WHERE id = :id")
    suspend fun getById(id: String): SharedItemEntity?

    @Query(
        """
        UPDATE shared_items
        SET title = :title, text = :text
        WHERE id = :id AND type = 'url' AND text = :expectedUrl
        """,
    )
    suspend fun updateLinkContent(
        id: String,
        expectedUrl: String,
        title: String?,
        text: String,
    ): Int

    @Query("DELETE FROM shared_items WHERE id = :id")
    suspend fun deleteById(id: String): Int

    @Query("DELETE FROM shared_items")
    suspend fun clearAll()
}
