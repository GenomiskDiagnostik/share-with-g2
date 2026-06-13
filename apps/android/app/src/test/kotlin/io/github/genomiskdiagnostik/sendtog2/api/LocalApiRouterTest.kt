package io.github.genomiskdiagnostik.sendtog2.api

import io.github.genomiskdiagnostik.sendtog2.domain.SharedItem
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItemType
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
    fun `mutating methods are rejected`() = runBlocking {
        val response = router().route(ApiRequest("DELETE", "/items"))

        assertEquals(405, response.status)
        assertEquals("GET, OPTIONS", response.headers["Allow"])
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
    fun `unknown routes return json 404`() = runBlocking {
        val response = router().route(ApiRequest("GET", "/missing"))

        assertEquals(404, response.status)
        assertEquals("not_found", json(response.body)["error"]?.jsonPrimitive?.content)
    }

    private fun router(store: FakeSharedItemStore = FakeSharedItemStore()) =
        LocalApiRouter(store, "0.1.0-test")

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
