# ADR-009: Read State and Live Inbox Refresh

## Status

Accepted.

## Context

The MVP reader can load, navigate, delete, and clear inbox items. Once Even Hub
is open, however, new Android shares and Android-side state changes should not
require restarting the app. The shared item schema already includes `read`,
but earlier slices only transported the value as read-only metadata.

## Decision

- Implement `PATCH /items/{id}` for updating the boolean `read` field only.
- Require the same Bearer key as other protected `/items` routes.
- Return the updated item on success.
- Treat read/unread as non-destructive, so it does not require confirmation.
- Keep delete and clear as the only confirmed destructive actions.
- Add manual refresh and periodic polling in Even Hub.
- Preserve the selected item and page during refresh when the item still
  exists; otherwise fall back to a valid item and page.
- Keep Android as the source of truth for ordering and item state.

## Consequences

- The first v0.2-style capability is available without cloud, BLE, images, or
  file ingestion.
- Users can triage what they have already read on the phone and in Even Hub.
- Refresh gives better daily-use behavior while physical WebView reachability
  remains a release gate.
- Future favorites, pins, filters, and expiry can reuse the same narrow PATCH
  pattern, but should be added as separate reviewed slices.
