# Product Requirements Document: Send to G2

## Problem

Users often find text or links on Android that they want to glance-read on Even Realities G2 glasses without copying, switching apps, or sending content through a cloud service. Existing notification mirroring can show a short preview, but it does not provide a local history/reader workflow for shared content.

## Product goal

Create a local-first bridge from Android Sharesheet to an Even Hub G2 Shared Inbox.

## Primary users

- G2 users who want to send text snippets, links, notes, or copied web content to the glasses.
- Users who prefer local/private workflows for short-form reading.
- Developers experimenting with practical G2 utilities.

## MVP user stories

1. As a user, I can tap Android Share and choose `Send to G2`.
2. As a user, I can share text or a link into the app.
3. As a user, I get a normal Android notification showing a preview.
4. As a user, I can open the Even Hub `Shared Inbox` app and see shared items.
5. As a user, I can read a selected shared item on the G2 display.
6. As a user, I can navigate between shared items.
7. As a user, I can delete the current item.
8. As a user, I can clear all items.
9. As a user, I can use the MVP without a cloud account or external backend.

## Functional requirements

### Android share receiver

- Register an exported `Activity` for Android Sharesheet.
- Register the same activity for `ACTION_PROCESS_TEXT` so selected plain text
  can be sent from compatible Android apps.
- Accept:
  - `ACTION_SEND` with `text/plain`
  - `ACTION_SEND` with `text/html`
  - `ACTION_SEND` with `text/*`
- Defer images and files, even if manifest examples exist for later.
- Extract `Intent.EXTRA_TEXT` for text shares.
- Extract title/subject when available.
- Detect whether a text payload is likely a URL.
- For complete public HTTP/HTTPS URLs, save immediately and attempt to replace
  the URL-only body with readable linked-page text in background.
- Preserve the original URL with extracted content.
- Keep the URL-only item when content requires login, client-side rendering,
  exceeds limits, or cannot be fetched safely.
- Normalize and store content.
- Finish quickly after save and notification.

### Local database

Store each shared item with this logical model:

```json
{
  "id": "string",
  "type": "text | url | image | file",
  "title": "string?",
  "text": "string?",
  "uri": "string?",
  "sourceApp": "string?",
  "createdAt": 1710000000000,
  "read": false
}
```

For v0.1 only `text` and `url` are persisted as active item types.

### Screen Snapshot Mode

Post-MVP feasibility:

- Android can capture one user-approved screen snapshot through MediaProjection.
- The latest snapshot is kept in memory only, not persisted as an inbox item.
- Even Hub can fetch the latest snapshot through the authenticated local API
  and attempt to render it through the SDK image-container API.
- This is not live video mirroring and does not add image/file Sharesheet
  ingestion.

### Notification

- Create notification channel `shared_to_g2`.
- Emit a localized notification title (`Delt til G2` in Danish and
  `Shared to G2` in English).
- Use a short preview based on title/text.
- Respect Android notification permission requirements.
- Do not assume notification mirroring is enabled; document the dependency on user/device settings.

### Local API

- Provide local HTTP endpoints:
  - `GET /health`
  - `GET /items`
  - `GET /items/{id}`
  - `DELETE /items/{id}`
  - `DELETE /items`
- Bind to loopback by default.
- Return JSON.
- Reject unsupported methods.
- Avoid exposing local files.

### Even Hub Shared Inbox

- Use TypeScript/Vite and Even Hub SDK.
- Show empty state if no items exist.
- Show newest item first.
- Render header with item count and type.
- Render title and body.
- Paginate long text.
- Handle tap/scroll/double-tap events where supported by SDK/runtime.
- Provide API failure message.

## Non-functional requirements

- Local-first operation.
- No cloud dependency in MVP.
- Minimal battery impact.
- No background server running indefinitely without explicit need.
- Sanitized text rendering.
- Small, readable G2 display layout.
- Testable core logic.

## Out of scope for v0.1

- Image rendering.
- PDF parsing.
- OCR.
- Cloud sync.
- Account system.
- Direct BLE integration.
- Social sharing out of the inbox.
- Complex rich-text formatting.
- Live video screen mirroring.

## Definition of success

A v0.1 demo succeeds when:

1. A user shares a URL from Chrome to `Send to G2`.
2. The Android app stores it locally and shows a notification.
3. The Even Hub app displays it in Shared Inbox.
4. The user can move to another item.
5. The user can delete the current item.
6. The user can clear all items.
7. The flow works without any cloud service.

## Key risks

- Even Hub WebView may not be able to reach `127.0.0.1` on the phone.
- Android may restrict local server lifetime if the app is not active.
- Notification mirroring depends on Even app/user settings.
- G2 input events may differ between simulator and physical device.
- HTML share payloads may be inconsistent across source apps.
