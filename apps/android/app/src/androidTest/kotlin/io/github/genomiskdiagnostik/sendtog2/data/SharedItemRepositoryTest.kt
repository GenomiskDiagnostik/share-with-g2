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

    @Test
    fun updatesReadState() = runBlocking {
        repository.insert(item(id = "first", createdAt = 100))

        assertTrue(repository.updateRead("first", true))
        assertEquals(true, repository.getById("first")?.read)
        assertFalse(repository.updateRead("missing", true))
    }

    @Test
    fun updatesLinkContentOnlyWhileOriginalUrlIsStillStored() = runBlocking {
        val url = "https://example.com/article"
        repository.insert(
            item(
                id = "link",
                createdAt = 100,
                type = SharedItemType.URL,
                text = url,
            ),
        )

        assertTrue(
            repository.updateLinkContent(
                id = "link",
                expectedUrl = url,
                title = "Article",
                text = "Readable article\n\n$url",
            ),
        )
        assertEquals("Article", repository.getById("link")?.title)
        assertFalse(
            repository.updateLinkContent(
                id = "link",
                expectedUrl = url,
                title = "Stale update",
                text = "Should not replace",
            ),
        )
    }

    private fun item(
        id: String,
        createdAt: Long,
        type: SharedItemType = SharedItemType.TEXT,
        text: String = "Content for $id",
    ) = SharedItem(
        id = id,
        type = type,
        title = id,
        text = text,
        sourceApp = "test",
        createdAt = createdAt,
        read = false,
    )
}
