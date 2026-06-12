# Local API

## Base URL

Default MVP base URL:

```text
http://127.0.0.1:8765
```

This must be treated as an assumption until tested in the target Even Hub runtime.

## Transport rules

- Bind to loopback by default.
- Return JSON.
- Use UTF-8.
- Do not expose arbitrary file paths or content URI streams.
- Add CORS headers only as narrowly as needed.
- Do not add authentication in v0.1 unless the endpoint is exposed beyond loopback.

## Data type

```ts
type SharedItem = {
  id: string
  type: 'text' | 'url' | 'image' | 'file'
  title?: string
  text?: string
  uri?: string
  sourceApp?: string
  createdAt: number
  read: boolean
}
```

## Endpoints

### GET /health

Returns API health and version.

Response:

```json
{
  "ok": true,
  "version": "0.1.0"
}
```

### GET /items

Returns newest-first items.

Response:

```json
[
  {
    "id": "f7f1a...",
    "type": "url",
    "title": "https://example.com/article",
    "text": "https://example.com/article",
    "createdAt": 1710000000000,
    "read": false
  }
]
```

### GET /items/{id}

Returns one item.

Responses:

- `200` with item JSON.
- `404` if not found.

### DELETE /items/{id}

Deletes one item.

Responses:

- `204` on success.
- `404` if not found.

### DELETE /items

Clears all items.

Responses:

- `204` on success.

## Future endpoints

Deferred until needed:

- `PATCH /items/{id}` for read/favorite state.
- `POST /items` for manual entry.
- `GET /items?query=` for search.
- `DELETE /items?olderThan=` for expiry.
