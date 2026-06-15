# Implementation Roadmap

## Phase 0 — Bootstrap and validation planning

Goal: commit starter docs and convert product brief into implementable slices.

Tasks:

- Commit starter pack.
- Run planning-first Codex prompt.
- Confirm package names and app IDs.
- Decide Android min SDK and target SDK.
- Prepare test matrix.

## Phase 1 — Android share receiver MVP

Goal: receive and persist text/link shares.

Vertical slice:

1. Create Android project scaffold.
2. Add share target manifest filters for text.
3. Implement `ShareParser`.
4. Implement Room entity/DAO/database.
5. Insert parsed item from `ShareReceiverActivity`.
6. Show notification preview.
7. Add parser/repository tests.

Acceptance:

- Share text from at least two source apps.
- Persisted item visible in debug UI or tests.
- Notification appears when permission is granted.

## Phase 2 — Local API feasibility

Goal: prove or disprove direct local API access from Even Hub runtime.

Vertical slice:

1. Add local HTTP server behind feature flag/dev setting.
2. Implement `GET /health` and `GET /items`.
3. Add route tests.
4. Create minimal Even Hub fetch probe.
5. Add per-installation access-key pairing before exposing inbox data.
6. Test simulator and real device.
7. Document results in `PLANS.md`.

Acceptance:

- Reachability behavior is known.
- If blocked, fallback options are listed and ADR draft is created.

## Phase 3 — Even Hub Shared Inbox MVP

Goal: render and navigate stored items on G2.

Vertical slice:

1. Scaffold Vite/TypeScript Even Hub app.
2. Add typed API client.
3. Add render-state model.
4. Implement empty state and first item display.
5. Implement pagination.
6. Map tap/scroll events to navigation/page movement.
7. Implement delete current.
8. Implement clear all if reliable input exists.
9. Add simulator tests/manual script.

Acceptance:

- Inbox renders mocked items in simulator.
- Live API items render when transport is available.
- Delete current updates Android store.

## Phase 4 — End-to-end hardening

Goal: make MVP reliable enough for daily personal use.

Tasks:

- Add Android diagnostics screen.
- Add explicit notification permission handling.
- Add local API lifecycle handling.
- Add error states for API unavailable/no permission/no items.
- Add live Even Hub refresh and read/unread reconciliation.
- Add manual E2E checklist.
- Add release notes.

Acceptance:

- Complete flow works from Android share to G2 reader.
- New shared items appear without restarting Even Hub.
- Known limitations are documented.
- No cloud service required.

## Phase 5 — v0.2 expansion candidates

Candidates:

- Image metadata and optional thumbnail rendering.
- PDF metadata and first-page text extraction.
- Favorites/pin.
- Read/unread filtering.
- Single-frame screen snapshot mode.
- OCR from a captured screen snapshot.
- Search/history filters.
- Auto-expire after 7/30 days.
- Manual compose/send-to-G2 screen.
- Low-FPS screen glance mode if physical G2 image updates prove reliable.
- Optional private relay if local transport is impossible.

## First vertical slices

1. Parser-only slice: `Intent` payload → domain object.
2. Persistence slice: domain object → Room → query.
3. Notification slice: stored item → notification preview.
4. API slice: Room → `GET /items` JSON.
5. G2 mock slice: hardcoded item → display.
6. G2 live slice: local API → display.
7. Mutation slice: delete current.
