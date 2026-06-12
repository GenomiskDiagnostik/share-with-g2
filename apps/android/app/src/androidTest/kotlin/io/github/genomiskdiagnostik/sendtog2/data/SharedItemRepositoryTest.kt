package io.github.genomiskdiagnostik.sendtog2.data

import android.content.Context
import androidx.room.Room
import androidx.test.core.app.ApplicationProvider
import androidx.test.ext.junit.runners.AndroidJUnit4
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItem
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItemType
import kotlinx.coroutines.runBlocking
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class SharedItemRepositoryTest {
    private lateinit var database: SharedDatabase
    private lateinit var repository: SharedItemRepository

    @Before
    fun setUp() {
        val context = ApplicationProvider.getApplicationContext<Context>()
        database = Room.inMemoryDatabaseBuilder(
            context,
            SharedDatabase::class.java,
        ).build()
        repository = SharedItemRepository(database.sharedItemDao())
    }

    @After
    fun tearDown() {
        database.close()
    }

    @Test
    fun insertsAndReturnsNewestFirst() = runBlocking {
        repository.insert(item(id = "old", createdAt = 100))
        repository.insert(item(id = "new", createdAt = 200))

        assertEquals(listOf("new", "old"), repository.getAll().map(SharedItem::id))
    }

    @Test
    fun getsDeletesAndClearsItems() = runBlocking {
        repository.insert(item(id = "first", createdAt = 100))
        repository.insert(item(id = "second", createdAt = 200))

        assertEquals("first", repository.getById("first")?.id)
        assertTrue(repository.deleteById("first"))
        assertFalse(repository.deleteById("missing"))
        assertNull(repository.getById("first"))

        repository.clearAll()
        assertTrue(repository.getAll().isEmpty())
    }

    private fun item(id: String, createdAt: Long) = SharedItem(
        id = id,
        type = SharedItemType.TEXT,
        title = id,
        text = "Content for $id",
        sourceApp = "test",
        createdAt = createdAt,
        read = false,
    )
}
