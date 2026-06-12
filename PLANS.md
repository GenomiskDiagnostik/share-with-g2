# PLANS.md

## Current objective

Initialize Send to G2 as a plan-first repository for an Android companion app and Even Hub G2 Shared Inbox.

## Current phase

Phase 0: repository bootstrap and architecture validation.

## Active assumptions

- The Android app is the persistence owner.
- The Even Hub app can attempt to call a local phone endpoint at `http://127.0.0.1:8765`; feasibility must be validated early.
- The MVP handles text and links only.
- Android notifications are used for immediate G2-visible previews via normal notification mirroring where the Even app/user settings allow it.
- Default user-facing language is Danish.

## Milestones

### M0 — Bootstrap

Status: active

Deliverables:

- Starter documentation. Complete.
- Initial ADRs. Complete.
- First Codex prompt. Complete.
- Proposed repo structure. Complete.
- Codex implementation plan. Complete; awaiting review.

Exit criteria:

- Docs committed.
- First implementation plan accepted.

### M1 — Android inbound share vertical slice

Status: not started

Deliverables:

- Android project scaffold.
- `ShareReceiverActivity` registered in manifest.
- `text/plain` and `text/html` receive flow.
- Local Room entity/DAO/repository.
- Basic notification preview.

Exit criteria:

- Can share text from Chrome/Reddit/mail into app.
- Item persists locally.
- Notification is emitted.
- Tests cover parser and repository.

### M2 — Local API feasibility slice

Status: not started

Deliverables:

- Loopback local HTTP server.
- `GET /health`.
- `GET /items`.
- `GET /items/{id}`.
- `DELETE /items/{id}`.
- `DELETE /items`.

Exit criteria:

- API is reachable from Android app process.
- G2 WebView/local app reachability is verified or disproven.
- CORS/cleartext behavior documented.

### M3 — Even Hub Shared Inbox vertical slice

Status: not started

Deliverables:

- Even Hub app scaffold.
- API client.
- Empty state.
- List/reader display.
- Pagination.
- Tap/swipe navigation.
- Delete current.
- Clear all, if safe interaction exists.

Exit criteria:

- Simulator can render mocked and live API items.
- Navigation works on text-heavy content.
- API failure state is readable.

### M4 — End-to-end MVP hardening

Status: not started

Deliverables:

- End-to-end manual test script.
- Permission handling.
- Diagnostics screen or logs.
- Privacy/security review.
- Release checklist.

Exit criteria:

- Share text/link → store → notify → read on G2 → delete/clear works.
- Known limitations documented.

## Open decisions

- Whether Even Hub WebView can reach Android loopback in the target runtime.
- Whether Android app needs a foreground service for local server lifetime.
- Whether destructive actions on G2 need confirmation/undo in v0.1.
- Whether HTML shares should preserve links or flatten to plain text only.

## Immediate next task

Review `docs/plans/codex-implementation-plan.md`, confirm the Android
application ID and Even Hub package ID, then begin the parser-first Android
vertical slice.
