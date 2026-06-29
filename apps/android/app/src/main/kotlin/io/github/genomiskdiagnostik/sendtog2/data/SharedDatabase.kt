package io.github.genomiskdiagnostik.sendtog2.data

import androidx.room.Database
import androidx.room.RoomDatabase
import androidx.room.migration.Migration
import androidx.sqlite.db.SupportSQLiteDatabase

@Database(
    entities = [SharedItemEntity::class, DynamicSourceEntity::class],
    version = 2,
    exportSchema = true,
)
abstract class SharedDatabase : RoomDatabase() {
    abstract fun sharedItemDao(): SharedItemDao
    abstract fun dynamicSourceDao(): DynamicSourceDao

    companion object {
        const val NAME = "send-to-g2.db"

        val MIGRATION_1_2 = object : Migration(1, 2) {
            override fun migrate(db: SupportSQLiteDatabase) {
                db.execSQL("ALTER TABLE shared_items ADD COLUMN origin TEXT NOT NULL DEFAULT 'share'")
                db.execSQL("ALTER TABLE shared_items ADD COLUMN dynamicSourceId TEXT")
                db.execSQL("ALTER TABLE shared_items ADD COLUMN dynamicFingerprint TEXT")
                db.execSQL(
                    """
                    CREATE TABLE IF NOT EXISTS dynamic_sources (
                        id TEXT NOT NULL PRIMARY KEY,
                        name TEXT NOT NULL,
                        url TEXT NOT NULL,
                        cssSelector TEXT NOT NULL,
                        frequencyMinutes INTEGER NOT NULL,
                        enabled INTEGER NOT NULL,
                        lastFetchedAt INTEGER,
                        lastSuccessAt INTEGER,
                        lastError TEXT
                    )
                    """.trimIndent(),
                )
            }
        }
    }
}
