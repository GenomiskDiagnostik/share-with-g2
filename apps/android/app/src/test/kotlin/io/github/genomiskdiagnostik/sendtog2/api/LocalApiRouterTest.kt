package io.github.genomiskdiagnostik.sendtog2.api

import io.github.genomiskdiagnostik.sendtog2.domain.SharedItem
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItemType
import io.github.genomiskdiagnostik.sendtog2.screen.ScreenSnapshot
import io.github.genomiskdiagnostik.sendtog2.screen.ScreenSnapshotStore
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Test

class LocalApiRouterTest {
    @Test
    fun `health returns version and cors headers`() = runBlocking {
        val response = router().route(ApiRequest("GET", "/health"))

        assertEquals(200, response.status)
        assertEquals("*", response.headers["Access-Control-Allow-Origin"])
        assertEquals(
            "GET, PATCH, DELETE, OPTIONS",
            response.headers["Access-Control-Allow-Methods"],
        )
        assertEquals(
            "Authorization, Content-Type, X-Send-To-G2-Client",
            response.headers["Access-Control-Allow-Headers"],
        )
        assertEquals("0.1.0-test", json(response.body)["version"]?.jsonPrimitive?.content)
    }

    @Test
    fun `items returns newest-first repository values without null fields`() = runBlocking {
        val store = FakeSharedItemStore(
            listOf(
                item(id = "new", createdAt = 200, title = null),
                item(id = "old", createdAt = 100, title = "Older"),
            ),
        )

        val response = router(store).route(ApiRequest("GET", "/items"))
        val items = Json.parseToJsonElement(response.body).jsonArray

        assertEquals(200, response.status)
        assertEquals("new", items[0].jsonObject["id"]?.jsonPrimitive?.content)
        assertFalse(items[0].jsonObject.containsKey("title"))
    }

    @Test
    fun `screen snapshot returns latest authenticated snapshot`() = runBlocking {
        val snapshots = ScreenSnapshotStore().apply {
            replace(
                ScreenSnapshot(
                    id = "shot",
                    createdAt = 300,
                    width = 288,
                    height = 144,
                    mimeType = "image/png",
                    imageBase64 = "abc123",
                ),
            )
        }

        val response = router(screenSnapshotStore = snapshots)
            .route(ApiRequest("GET", "/screen-snapshot"))
        val body = json(response.body)

        assertEquals(200, response.status)
        assertEquals("shot", body["id"]?.jsonPrimitive?.content)
        assertEquals("image/png", body["mimeType"]?.jsonPrimitive?.content)
        assertEquals("abc123", body["imageBase64"]?.jsonPrimitive?.content)
    }

    @Test
    fun `missing screen snapshot returns not found`() = runBlocking {
        val response = router().route(ApiRequest("GET", "/screen-snapshot"))

        assertEquals(404, response.status)
        assertEquals("not_found", json(response.body)["error"]?.jsonPrimitive?.content)
    }

    @Test
    fun `screen snapshot supports get only`() = runBlocking {
        val response = router().route(ApiRequest("DELETE", "/screen-snapshot"))

        assertEquals(405, response.status)
        assertEquals("GET, OPTIONS", response.headers["Allow"])
    }

    @Test
    fun `unsupported methods are rejected`() = runBlocking {
        val response = router().route(ApiRequest("POST", "/items"))

        assertEquals(405, response.status)
        assertEquals("GET, PATCH, DELETE, OPTIONS", response.headers["Allow"])
    }

    @Test
    fun `items require authorization while health stays public`() = runBlocking {
        val router = LocalApiRouter(
            store = FakeSharedItemStore(),
            version = "0.1.0-test",
            authorizer = LocalApiAuthorizer { false },
        )

        assertEquals(200, router.route(ApiRequest("GET", "/health")).status)
        val response = router.route(ApiRequest("GET", "/items"))

        assertEquals(401, response.status)
        assertEquals(
            """Bearer realm="Send to G2"""",
            response.headers["WWW-Authenticate"],
        )
        assertEquals("unauthorized", json(response.body)["error"]?.jsonPrimitive?.content)
    }

    @Test
    fun `item detail returns an authenticated item`() = runBlocking {
        val store = FakeSharedItemStore(listOf(item("one", 100, "One")))

        val response = router(store).route(ApiRequest("GET", "/items/one"))

        assertEquals(200, response.status)
        assertEquals("one", json(response.body)["id"]?.jsonPrimitive?.content)
        assertEquals(404, router(store).route(ApiRequest("GET", "/items/missing")).status)
    }

    @Test
    fun `delete item removes only the selected item`() = runBlocking {
        val store = FakeSharedItemStore(
            listOf(item("one", 200, "One"), item("two", 100, "Two")),
        )

        val response = router(store).route(ApiRequest("DELETE", "/items/one"))

        assertEquals(204, response.status)
        assertEquals("", response.body)
        assertEquals(listOf("two"), store.getAll().map(SharedItem::id))
        assertEquals(404, router(store).route(ApiRequest("DELETE", "/items/one")).status)
    }

    @Test
    fun `clear items empties the repository`() = runBlocking {
        val store = FakeSharedItemStore(listOf(item("one", 100, "One")))

        val response = router(store).route(ApiRequest("DELETE", "/items"))

        assertEquals(204, response.status)
        assertEquals(emptyList<SharedItem>(), store.getAll())
    }

    @Test
    fun `patch item updates read state`() = runBlocking {
        val store = FakeSharedItemStore(listOf(item("one", 100, "One")))

        val response = router(store).route(
            ApiRequest(
                method = "PATCH",
                path = "/items/one",
                body = """{"read":true}""",
            ),
        )

        assertEquals(200, response.status)
        assertEquals("true", json(response.body)["read"]?.jsonPrimitive?.content)
        assertEquals(true, store.getById("one")?.read)
        assertEquals(
            404,
            router(store).route(
                ApiRequest("PATCH", "/items/missing", body = """{"read":true}"""),
            ).status,
        )
    }

    @Test
    fun `patch item rejects invalid bodies`() = runBlocking {
        val store = FakeSharedItemStore(listOf(item("one", 100, "One")))

        assertEquals(
            400,
            router(store).route(
                ApiRequest("PATCH", "/items/one", body = """{"read":"yes"}"""),
            ).status,
        )
        assertEquals(false, store.getById("one")?.read)
    }

    @Test
    fun `patch collection route is rejected without mutating`() = runBlocking {
        val store = FakeSharedItemStore(listOf(item("one", 100, "One")))

        val response = router(store).route(
            ApiRequest("PATCH", "/items", body = """{"read":true}"""),
        )

        assertEquals(405, response.status)
        assertEquals("GET, DELETE, OPTIONS", response.headers["Allow"])
        assertEquals(false, store.getById("one")?.read)
    }

    @Test
    fun `unauthorized mutations leave repository unchanged`() = runBlocking {
        val store = FakeSharedItemStore(listOf(item("one", 100, "One")))
        val router = LocalApiRouter(
            store = store,
            version = "0.1.0-test",
            authorizer = LocalApiAuthorizer { false },
        )

        val deleteResponse = router.route(ApiRequest("DELETE", "/items/one"))
        val patchResponse = router.route(
            ApiRequest("PATCH", "/items/one", body = """{"read":true}"""),
        )

        assertEquals(401, deleteResponse.status)
        assertEquals(401, patchResponse.status)
        assertEquals(listOf("one"), store.getAll().map(SharedItem::id))
        assertEquals(false, store.getById("one")?.read)
    }

    @Test
    fun `unknown routes return json 404`() = runBlocking {
        val response = router().route(ApiRequest("GET", "/missing"))

        assertEquals(404, response.status)
        assertEquals("not_found", json(response.body)["error"]?.jsonPrimitive?.content)
    }

    private fun router(
        store: FakeSharedItemStore = FakeSharedItemStore(),
        screenSnapshotStore: ScreenSnapshotStore = ScreenSnapshotStore(),
    ) = LocalApiRouter(
        store = store,
        version = "0.1.0-test",
        screenSnapshotStore = screenSnapshotStore,
    )

    private fun json(value: String) = Json.parseToJsonElement(value).jsonObject

    private fun item(
        id: String,
        createdAt: Long,
        title: String?,
    ) = SharedItem(
        id = id,
        type = SharedItemType.TEXT,
        title = title,
        text = "Text for $id",
        sourceApp = null,
        createdAt = createdAt,
        read = false,
    )
}
