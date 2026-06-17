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
- M2 introduced wildcard CORS for origin feasibility testing because
  the packaged Even Hub WebView origin is not known yet.
- `/health` remains unauthenticated so transport failures can be distinguished
  from pairing failures.
- Every `/items` route requires `Authorization: Bearer <access-key>`.
- The Android app creates a random per-installation key and lets the user copy
  or rotate it. Even Hub stores the paired key in its local WebView storage.
- Wildcard CORS does not grant inbox access without the key.

## Data type

```ts
type SharedItem = {
  id: string
  type: 'text' | 'url'
  title?: string
  text: string
  sourceApp?: string
  createdAt: number
  read: boolean
}
```

Screen snapshots are separate from inbox items:

```ts
type ScreenSnapshot = {
  id: string
  createdAt: number
  width: number
  height: number
  mimeType: 'image/png'
  imageBase64: string
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

Returns newest-first items. Requires the Bearer access key.

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

Returns one item. Requires the Bearer access key.

Responses:

- `200` with item JSON.
- `404` if not found.

### PATCH /items/{id}

Updates mutable item metadata. Requires the Bearer access key.

Request:

```json
{
  "read": true
}
```

Responses:

- `200` with the updated item JSON.
- `400` if the request body is malformed or does not include a boolean `read`.
- `404` if not found.

### DELETE /items/{id}

Deletes one item. Requires the Bearer access key.

Responses:

- `204` on success.
- `404` if not found.

### DELETE /items

Deletes every item. Requires the Bearer access key.

Responses:

- `204` on success.

### GET /screen-snapshot

Returns the latest in-memory, user-approved Android screen snapshot. Requires
the Bearer access key.

Responses:

- `200` with snapshot JSON.
- `404` if no snapshot is currently available.

The image is a base64-encoded PNG scaled to the Even Hub image-container limit
of at most `288 × 144`. Snapshots are not stored in Room and disappear when the
Android process is killed or the user clears the snapshot.

## Implemented surface

The current Android server implements:

- `GET /health`
- `GET /items`
- `GET /items/{id}`
- `PATCH /items/{id}`
- `DELETE /items/{id}`
- `DELETE /items`
- `GET /screen-snapshot`
- `OPTIONS`
- JSON `400`, `401`, `404`, and `405` responses

It binds only to `127.0.0.1`. The server runs for the lifetime of the Android
application process. This is a feasibility lifecycle, not the final background
execution design.

## Pairing contract

1. Android creates a 32-character base64url key from 24 random bytes.
2. The key is stored in app-private DataStore preferences.
3. The user copies the raw key from the Android app into Even Hub.
4. Even Hub stores it in local WebView storage and sends it only to protected
   local API routes.
5. Android compares tokens in constant time.
6. Rotating the key immediately invalidates the previous pairing.

The key must never appear in API diagnostics, logs, URLs, or query strings.

## Mutation interaction contract

- Even Hub exposes delete-current and clear-all on its phone WebView only.
- Each mutation requires a separate confirmation step.
- G2 click, scroll, and double-click gestures never trigger deletion.
- A successful mutation updates the local reader state immediately.
- A `401` returns the reader to pairing; other failures preserve the current
  reader item and show a retryable error.
- Read/unread changes are non-destructive and do not require confirmation.
- Even Hub refreshes manually and polls periodically while preserving the
  current item and page when the item still exists.

## Future endpoints

Deferred until needed:

- `POST /items` for manual entry.
- `GET /items?query=` for search.
- `DELETE /items?olderThan=` for expiry.

## Cross-origin and private-network access (M2 feasibility)

- The local API returns `Access-Control-Allow-Origin: *`, `Access-Control-Allow-Methods`, and `Access-Control-Allow-Headers` (including `Authorization`, `Content-Type`, and `X-Send-To-G2-Client`) on every response, including `OPTIONS` preflight.
- It also returns `Access-Control-Allow-Private-Network: true`. The Even Hub plugin runs in a secure WebView and fetches `http://127.0.0.1:8765`, which Chrome Private Network Access treats as a private-network target; without this header the preflight is blocked and the plugin reports a network error.
- Debug builds set `trustLoopback = BuildConfig.DEBUG`, which skips the Bearer-key check for protected routes. This is a temporary feasibility measure because the Even app surfaces the glasses text container, not the app HTML form, so the pairing form is unreachable on the glasses. Release builds keep the Bearer requirement. Supersede this with a glasses-friendly pairing flow (e.g. a short code entered via glasses input) before release; see ADR-007/ADR-008.