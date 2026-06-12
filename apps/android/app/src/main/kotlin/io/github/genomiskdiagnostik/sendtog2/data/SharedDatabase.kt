package io.github.genomiskdiagnostik.sendtog2.data

import androidx.room.Database
import androidx.room.RoomDatabase

@Database(
    entities = [SharedItemEntity::class],
    version = 1,
    exportSchema = true,
)
abstract class SharedDatabase : RoomDatabase() {
    abstract fun sharedItemDao(): SharedItemDao

    companion object {
        const val NAME = "send-to-g2.db"
    }
}
