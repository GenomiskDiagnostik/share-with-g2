# PLANS.md

## Current objective

Close the disproven packaged-WebView loopback experiment and decide whether to
implement the proposed opt-in encrypted HTTPS relay for version 0.2.0.

## Current phase

Phase 3: Even Hub Shared Inbox reader slice.

## Active assumptions

- The Android app is the persistence owner.
- The tested Even Hub production WebView cannot reach Android through either
  `localhost` or numeric loopback.
- The MVP handles text and links only.
- Screen snapshot mode is a separate v0.2 feasibility slice; it captures one
  user-approved image and does not add image/file Sharesheet ingestion.
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
- Android selected-text `ACTION_PROCESS_TEXT` receive flow. Complete locally.
- Pure parser with validation and URL classification. Complete.
- Room entity, DAO, database, and repository. Complete.
- Permission-aware notification preview. Complete.
- Minimal Danish inbox with delete and clear-all. Complete.
- Background readable-content extraction for public links. Complete locally.
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

Status: complete; packaged loopback disproven

Deliverables:

- Loopback local HTTP server. Complete.
- `GET /health`. Complete.
- `GET /items`. Complete.
- Minimal Even Hub reachability probe. Complete.
- Simulator and physical-device reachability result. Complete: packaged
  physical loopback is blocked before requests reach Android.
- CORS contract documented; packaged WebView transport is blocked before any
  request reaches Android, while the exact Even policy/browser layer is opaque.
- Android router and real loopback HTTP tests. Complete.
- Even Hub API validation and reachability tests. Complete.
- GitHub Actions `.ehpk` artifact. Complete.
- Restartable in-process API lifecycle. Complete locally.
- Foreground local-API lifecycle with explicit notification stop action.
  Complete locally and in the GitHub emulator.
- Privacy-safe request diagnostics and Android self-test. Complete locally.
- Explicit Even Hub client marker for origin/user-agent capture. Complete locally.
- Per-installation access key and Android pairing controls. Complete locally.
- Bearer authorization for `/items` and `/items/{id}`. Complete locally.
- Authenticated delete-current and clear-all routes. Complete locally.
- Authenticated read/unread metadata route. Complete locally.
- Authenticated latest screen snapshot route. Complete locally.

Automated status:

- Even Hub tests, TypeScript build, and `.ehpk` packaging pass locally and in
  GitHub Actions.
- Android unit tests, lint, APK build, and emulator instrumentation pass
  locally or in GitHub Actions.
- 54 Android unit tests cover parser, persistence, link extraction, API
  routing, authenticated mutations, read-state updates, screen snapshot sizing
  and routing, restart, self-test, and bounded request diagnostics locally.
- Current Even Hub workflow run for `56c1f04`:
  `https://github.com/GenomiskDiagnostik/share-with-g2/actions/runs/27828122995`.
- Current Android workflow run for `56c1f04`:
  `https://github.com/GenomiskDiagnostik/share-with-g2/actions/runs/27828122992`.
- Artifacts: Even Hub package, debug APKs, Android build reports, and Android
  instrumentation reports.
- The current GitHub artifacts for `56c1f04` were downloaded and inspected on
  2026-06-19. Android reports contain 54 passing JVM tests, 9 passing
  instrumented tests,
  no failures, and lint warnings only. The packaged Even Hub JavaScript contains
  both loopback aliases, client marker, pairing storage, authorization, and
  screen snapshot routes expected at `56c1f04`.
- The Android diagnostics card can now run a loopback self-test, restart the
  server, count requests, and show the last identified Even Hub origin and
  user-agent without recording inbox content.
- The Android app can reveal, copy, and rotate a 192-bit local API key without
  including it in diagnostics.

Exit criteria:

- API is reachable from the Android app process.
- G2 WebView/local app reachability is disproven. Complete.
- Fallback proposal ADR-013 is documented; acceptance is pending.

Physical evidence for version 0.1.0:

- Android self-test passed and the foreground service remained active.
- Android diagnostics recorded no Even Hub `OPTIONS` or `GET` request.
- Numeric loopback was therefore blocked before Android routing, CORS, or auth.
- ADR-012 defines the final `localhost` plus numeric-loopback alias probe before
  an HTTPS relay is considered.

Physical evidence for version 0.1.1:

- The pairing key could be stored in the Even Hub app.
- Even Hub still reported no local connection after refresh and retry.
- Android self-test passed with API version 0.1.1.
- Android diagnostics still recorded no Even Hub request for either alias.
- Pairing/auth is not the blocker; the WebView transport is blocked before the
  Android socket.

### M3 - Even Hub Shared Inbox vertical slice

Status: active

Deliverables:

- Even Hub app scaffold. Complete.
- Typed API client. Complete.
- Local access-key pairing and WebView persistence. Complete locally.
- Empty, loading, reader, and API failure states. Complete.
- Pagination and navigation. Complete.
- Delete current. Complete locally.
- Clear all with deliberate phone-side confirmation. Complete locally.
- Manual and periodic inbox refresh. Complete locally.
- Mark current item read/unread. Complete locally as a v0.2 candidate.
- Separate screen snapshot mode using the Even Hub image container API.
  Complete locally; physical G2 image rendering pending.
- Explicit browser/simulator demo mode. Complete.
- Danish and English reader copy. Complete.
- Pagination, reader state, rendering, locale, and API tests. Complete locally.
- Dedicated unauthorized/pairing state. Complete locally.

Automated status:

- 34 Even Hub test cases cover API validation, key storage, mutations,
  read-state updates, refresh reconciliation, pagination, navigation,
  rendering, screen snapshot state, reachability, and locale selection. The current
  sandbox permits TypeScript typechecking; GitHub Actions remains the
  authoritative Vitest run.
- TypeScript and Vite production build pass locally.
- `.ehpk` packaging passes locally.
- Browser validation covers multi-page navigation, item wraparound, disabled
  controls, localized API failure, retry, mutation cancellation, delete-current,
  and clear-all. Browser validation for the newest refresh/read-state UI was
  not available in the current Codex browser session; HTTP preview responded
  locally and automated render/state tests cover the flow.

Exit criteria:

- Simulator renders mocked and live API items.
- Navigation works on long text.
- Delete and clear-all update the Android source of truth safely.

### M4 - End-to-end MVP hardening

Status: not started

Deliverables:

- Item detail and mutation API endpoints. Complete locally.
- Local server lifecycle handling.
- End-to-end manual test script. In progress.
- Diagnostics without shared-content logging. Complete for local API requests.
- Privacy/security review.
- Release checklist.

Exit criteria:

- Share text/link -> store -> notify -> read on G2 -> delete/clear works.
- Known limitations are documented.
- No cloud service or proprietary protocol is required.

## Accepted implementation decisions

- Android application ID: `io.github.genomiskdiagnostik.sendtog2`.
- Android version: `0.1.1` (`versionCode` 2).
- Android min SDK 26; compile and target SDK 36.
- JDK 17, Gradle 8.13, AGP 8.13.2, and Kotlin 2.3.21.
- HTML shares flatten to sanitized plain text.
- Maximum stored text is 65,536 characters.
- Generated titles are capped at 80 characters.
- Notification previews are capped at 160 characters.
- GitHub Actions publishes debug APK and report artifacts.
- Even Hub package ID:
  `io.github.genomiskdiagnostik.sendtog2.sharedinbox`.
- Even Hub package version: `0.1.1`.
- The local API is owned by a visible `dataSync` foreground service started
  from user-visible app and Sharesheet flows, as documented in ADR-011.
- The in-process server remains restartable, and the foreground notification
  provides an explicit stop action.
- M2 wildcard CORS is temporary until the packaged WebView origin is measured.
- `/health` is public; all `/items` routes require the per-installation Bearer
  key documented in ADR-007.
- Destructive actions are available only in the phone WebView and require
  confirmation as documented in ADR-008.
- Even Hub sends `X-Send-To-G2-Client: even-hub`; Android records bounded
  method/path/origin/user-agent metadata only.
- Android and Even Hub select Danish or English from the runtime locale.
- Reader body pages are capped at 700 characters, preserving paragraph or word
  boundaries where possible.
- G2 reader input: click selects the next item, scroll moves pages, and
  double-click opens the safe exit interaction.
- Public links are stored immediately, then enriched in WorkManager without
  cookies; failures retain the original URL.
- Link retrieval blocks local/private destinations, follows at most three
  validated redirects, and caps responses at 1 MiB.
- Delete and clear are implemented; packaged authenticated mutation validation
  remains a release gate.
- Read/unread is implemented through authenticated `PATCH /items/{id}` with a
  boolean-only body.
- Even Hub polls the local inbox periodically and offers manual refresh while
  preserving the current selection when possible.
- Screen snapshot mode uses Android MediaProjection for one explicit frame,
  stores only the latest in-memory PNG, and exposes it through authenticated
  `GET /screen-snapshot`.

## Open decisions

- Whether to accept ADR-013 and which HTTPS relay deployment should be used.
- Whether v0.2 should add undo after confirmed deletion.
- Whether read/unread should gain filters or automatic "mark read when opened"
  behavior.
- Whether physical G2 image-container behavior is good enough for screen
  snapshot release.
- Whether a later screen feature should be OCR-first or low-FPS image refresh.

## Immediate next task

Choose whether to accept ADR-013 and provide the HTTPS relay deployment target,
domain, ownership, and retention policy. If accepted, implement relay mode as
version 0.2.0 with explicit opt-in and end-to-end encrypted payloads. Continue
separate physical validation of selected text -> `Send to G2` from at least two
compatible Android apps.
