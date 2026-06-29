package io.github.genomiskdiagnostik.sendtog2.data

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import kotlinx.coroutines.flow.Flow

@Dao
interface DynamicSourceDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun upsert(source: DynamicSourceEntity)

    @Query("SELECT * FROM dynamic_sources ORDER BY name COLLATE NOCASE ASC")
    fun observeAll(): Flow<List<DynamicSourceEntity>>

    @Query("SELECT * FROM dynamic_sources ORDER BY name COLLATE NOCASE ASC")
    suspend fun getAll(): List<DynamicSourceEntity>

    @Query("SELECT * FROM dynamic_sources WHERE id = :id")
    suspend fun getById(id: String): DynamicSourceEntity?

    @Query("DELETE FROM dynamic_sources WHERE id = :id")
    suspend fun deleteById(id: String): Int
}
