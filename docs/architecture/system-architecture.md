# System Architecture

## Architecture summary

Send to G2 uses a two-app local-first architecture:

```text
Android Sharesheet
      ↓
ShareReceiverActivity
      ↓
SharedItemRepository
      ↓
Room database
      ↓
Android notification preview
      ↓
Local loopback HTTP API
      ↓
Even Hub Shared Inbox webapp
      ↓
G2 text reader / pagination / delete / clear-all
```

## Major modules

### Android companion app

Responsibilities:

- Register as Android share target.
- Parse inbound share intents.
- Normalize shared content.
- Persist shared items.
- Emit notification previews.
- Serve local API for the Even Hub app.
- Provide minimal settings/diagnostics later.

Suggested Android modules/packages:

```text
com.example.sendtog2
  data/
    SharedItemEntity.kt
    SharedItemDao.kt
    SharedDatabase.kt
    SharedItemRepository.kt
  domain/
    SharedItem.kt
    SharedItemType.kt
    ShareParser.kt
    TitleGenerator.kt
  share/
    ShareReceiverActivity.kt
  notification/
    SharedNotificationService.kt
  server/
    LocalApiServer.kt
    Routes.kt
    DtoMappers.kt
  ui/
    MainActivity.kt
    DiagnosticsScreen.kt
```

### Even Hub app

Responsibilities:

- Connect to Even Hub bridge.
- Fetch items from local API.
- Render inbox/reader state.
- Paginate long text.
- Handle input events.
- Send delete/clear commands to Android API.
- Display errors safely.

Suggested TypeScript modules:

```text
src/
  main.ts
  api/localApiClient.ts
  inbox/pagination.ts
  inbox/readerState.ts
  inbox/renderReader.ts
  strings.ts
```

### Shared schema

The canonical JSON shape lives in `shared/schemas/shared-item.schema.json`. Android DTOs and Even Hub TypeScript types must stay compatible with it.

## Runtime model

1. User shares content from Android source app.
2. Android launches `ShareReceiverActivity`.
3. Activity parses and validates inbound content.
4. Repository stores a `SharedItem` in Room.
5. Notification service emits preview notification.
6. Local API serves stored items.
7. Even Hub app fetches items and renders current state.
8. User actions call local API mutations.
9. Even Hub app reloads or updates local state after mutations.

## Data flow

### Text/link ingest

```text
Intent.EXTRA_TEXT
  → ShareParser
  → detect text/url
  → normalize whitespace
  → truncate title
  → SharedItemEntity
  → Room
```

### Reader rendering

```text
GET /items
  → SharedItem[]
  → ReaderState
  → current item
  → pagination chunks
  → TextContainerUpgrade/content update
```

Reader input mapping:

- Native inbox list scroll: move the visible item selection.
- Native inbox list click: open the selected item.
- Reader scroll up/down: previous/next page with opposite-boundary bounce
  suppression and no update at the first/final page.
- Reader double-click: return to the native inbox list.
- The phone WebView exposes a visible item picker plus previous/next page
  actions for browser QA.

## Local API design

Primary Even Hub URL for version 0.1.2:
`ws://localhost:8765/even-hub-ws`. The client falls back first to the numeric
WebSocket loopback alias and then to the existing HTTP aliases only for network
errors or timeouts. All transports use the same Android socket bound to numeric
loopback and the same authenticated router.

See `docs/api/local-api.md` for endpoint details.

The API runs in a `dataSync` foreground service started by the user-visible app
or Sharesheet flow. Its low-importance notification keeps the bridge lifecycle
explicit and provides a stop action. See ADR-011.

## Deployment model

Android:

- Debug APK for local MVP testing.
- Later Play/internal distribution if productized.

Even Hub:

- Develop via Vite dev server.
- Test in Even Hub simulator and on physical G2.
- Package as `.ehpk` using Even Hub tooling when ready.

## Testing strategy

### Android tests

- Unit tests for parser, URL detection, title generation, DTO mapping.
- Room DAO tests using in-memory database.
- Route tests for local API.
- Instrumented test for share intents where feasible.

### Even Hub tests

- Unit tests for API client with mocked fetch.
- Unit tests for pagination and render string generation.
- Simulator test for navigation and empty/error states.

### End-to-end manual test

- Share text from Chrome.
- Share URL from browser.
- Share text from email.
- Verify notification.
- Verify API response.
- Verify Shared Inbox display.
- Delete current.
- Clear all.

## Validation strategy

The current critical validation is transport reachability:

- Can the Even Hub WebView open
  `ws://localhost:8765/even-hub-ws` without using Fetch preflight?
- Can the Even Hub WebView fetch `http://127.0.0.1:8765/health`?
- Are there cleartext/CORS restrictions?
- Does `127.0.0.1` resolve to the phone runtime, WebView sandbox, or another context?
- Is LAN IP more reliable than loopback?

Do not build large features before this is known. This is where gremlins like to rent studio apartments.

## Security model

- Shared content is private by default.
- Store locally only.
- Bind API to loopback by default.
- No cloud uploads in MVP.
- Sanitize HTML to plain text.
- Cap inbound payload size.
- Do not expose content URI streams through API in v0.1.

## Architectural risks

| Risk | Impact | Mitigation |
|---|---:|---|
| Even Hub cannot call phone loopback | High | Validate in M2; define fallback ADR if needed |
| Notification mirroring disabled | Medium | Document setup; Android notification still useful |
| Long text unreadable | Medium | Pagination from first G2 slice |
| Source apps send malformed content | Medium | Defensive parser and tests |
| Android limits long-running data-sync services | Medium | Visible foreground service, explicit stop, and physical lifetime testing |
