# PLANS.md

## Current objective

Prove or disprove Android loopback reachability from the packaged Even Hub
runtime using a read-only local API and a shippable diagnostic probe.

## Current phase

Phase 2: Local API feasibility slice.

## Active assumptions

- The Android app is the persistence owner.
- The Even Hub app can attempt to call a local phone endpoint at
  `http://127.0.0.1:8765`; feasibility must be validated early.
- The MVP handles text and links only.
- Android notifications provide immediate previews where notification
  permission and Even notification mirroring are enabled.
- User-facing language follows the Android or Even Hub runtime locale.
- Danish and English are included; unsupported locales fall back to English.

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

Status: automated implementation complete; manual validation pending

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

Status: active

Deliverables:

- Loopback local HTTP server. Complete.
- `GET /health`. Complete.
- `GET /items`. Complete.
- Minimal Even Hub reachability probe. Complete.
- Simulator and physical-device reachability result.
- CORS contract documented; packaged cleartext behavior pending.
- Android router and real loopback HTTP tests. Complete.
- Even Hub API validation and reachability tests. Complete.
- GitHub Actions `.ehpk` artifact. Pending first workflow run.

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
- Even Hub package ID:
  `io.github.genomiskdiagnostik.sendtog2.sharedinbox`.
- M2 local API is read-only and runs for the Android application process
  lifetime.
- M2 wildcard CORS is temporary until the packaged WebView origin is measured.
- Android and Even Hub select Danish or English from the runtime locale.

## Open decisions

- Whether Even Hub WebView can reach Android loopback.
- Whether Android needs a foreground service for local server lifetime.
- How to restrict local API reads before enabling mutation endpoints.
- Exact G2 confirmation or undo behavior for destructive actions.

## Immediate next task

Run the Android and Even Hub workflows, download the APK and `.ehpk` artifacts,
then execute the physical-phone reachability script and record the result.
