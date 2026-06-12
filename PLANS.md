# PLANS.md

## Current objective

Deliver and validate the Android inbound-share vertical slice before starting
the local API and Even Hub transport work.

## Current phase

Phase 1: Android inbound share vertical slice.

## Active assumptions

- The Android app is the persistence owner.
- The Even Hub app can attempt to call a local phone endpoint at
  `http://127.0.0.1:8765`; feasibility must be validated early.
- The MVP handles text and links only.
- Android notifications provide immediate previews where notification
  permission and Even notification mirroring are enabled.
- Default user-facing language is Danish.

## Milestones

### M0 - Bootstrap

Status: complete

Deliverables:

- Starter documentation. Complete.
- Initial ADRs. Complete.
- First Codex prompt and implementation plan. Complete.
- Repository and private GitHub remote. Complete.
- Package ID, toolchain, input limits, and HTML policy. Complete.

Exit criteria:

- Documentation committed. Complete.
- First implementation plan accepted. Complete.

### M1 - Android inbound share vertical slice

Status: active

Deliverables:

- Android project scaffold. Complete.
- `ShareReceiverActivity` registered in the manifest. Complete.
- `text/plain`, `text/html`, and `text/*` receive flow. Complete.
- Pure parser with validation and URL classification. Complete.
- Room entity, DAO, database, and repository. Complete.
- Permission-aware notification preview. Complete.
- Minimal Danish inbox with delete and clear-all. Complete.
- Local unit/lint/APK build. Complete.
- GitHub Actions APK and report artifacts. Complete.

Exit criteria:

- Can share text from Chrome, Reddit, and mail into the app. Manual validation
  pending.
- Item persists locally. Automated repository validation complete.
- Notification is emitted when permission is granted. Device validation
  pending.
- Parser and repository tests pass. Complete locally and in GitHub Actions.

Automated status:

- Local unit tests, lint, debug APK, and test APK pass.
- GitHub Actions unit/lint/build and emulator jobs pass.
- Workflow run:
  `https://github.com/GenomiskDiagnostik/share-with-g2/actions/runs/27443739014`.
- Artifacts: debug APKs, build reports, and instrumentation reports.
- Manual source-app acceptance remains pending.

### M2 - Local API feasibility slice

Status: not started

Deliverables:

- Loopback local HTTP server.
- `GET /health`.
- `GET /items`.
- Minimal Even Hub reachability probe.
- Simulator and physical-device reachability result.
- CORS and cleartext behavior documented.

Exit criteria:

- API is reachable from the Android app process.
- G2 WebView/local app reachability is verified or disproven.
- A fallback ADR is created only if loopback is not viable.

### M3 - Even Hub Shared Inbox vertical slice

Status: not started

Deliverables:

- Even Hub app scaffold.
- Typed API client.
- Empty, loading, reader, and API failure states.
- Pagination and navigation.
- Delete current.
- Clear all with deliberate interaction feedback.

Exit criteria:

- Simulator renders mocked and live API items.
- Navigation works on long text.
- Delete and clear-all update the Android source of truth safely.

### M4 - End-to-end MVP hardening

Status: not started

Deliverables:

- Item detail and mutation API endpoints.
- Local server lifecycle handling.
- End-to-end manual test script.
- Diagnostics without shared-content logging.
- Privacy/security review.
- Release checklist.

Exit criteria:

- Share text/link -> store -> notify -> read on G2 -> delete/clear works.
- Known limitations are documented.
- No cloud service or proprietary protocol is required.

## Accepted implementation decisions

- Android application ID: `io.github.genomiskdiagnostik.sendtog2`.
- Android min SDK 26; compile and target SDK 36.
- JDK 17, Gradle 8.13, AGP 8.13.2, and Kotlin 2.3.21.
- HTML shares flatten to sanitized plain text.
- Maximum stored text is 65,536 characters.
- Generated titles are capped at 80 characters.
- Notification previews are capped at 160 characters.
- GitHub Actions publishes debug APK and report artifacts.

## Open decisions

- Even Hub package ID.
- Whether Even Hub WebView can reach Android loopback.
- Whether Android needs a foreground service for local server lifetime.
- Exact G2 confirmation or undo behavior for destructive actions.

## Immediate next task

Complete the first GitHub Actions run and manual Sharesheet validation for M1.
Then start M2 with `GET /health` and the smallest possible Even Hub
reachability probe.
