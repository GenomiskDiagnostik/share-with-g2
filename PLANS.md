# PLANS.md

## Current objective

Use Even Hub `0.2.60` as the canonical baseline and add Android dynamic link
sources.

## Current phase

Phase 3: Even Hub Shared Inbox reader slice.

## Active assumptions

- The Android app is the persistence owner.
- Dynamic link fetching uses public static HTML plus user-provided CSS
  selectors. It does not use login cookies, a headless browser, JavaScript
  rendering, cloud fetchers, or private site sessions in the first slice.
- The tested Even Hub production WebView reaches Android through loopback
  WebSocket; HTTP Fetch remains blocked on both loopback aliases.
- The MVP handles text and links only.
- Low-FPS screen sharing is a separate v0.2 feasibility slice. It refreshes the
  latest in-memory image every 1,000 or 500 ms during one user-approved Android
  MediaProjection session and does not add image/file Sharesheet ingestion.
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

Status: complete; loopback WebSocket physically confirmed

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
- Loopback WebSocket adapter with HTTP fallback. Automated implementation
  and physical validation complete for version 0.1.2.

Automated status:

- Even Hub tests, TypeScript build, and `.ehpk` packaging pass locally and in
  GitHub Actions.
- Android unit tests, lint, APK build, and emulator instrumentation pass
  locally or in GitHub Actions.
- 58 Android unit tests cover parser, persistence, link extraction, API
  routing, authenticated mutations, read-state updates, screen snapshot sizing
  and routing, restart, self-test, and bounded request diagnostics locally.
- Previous version 0.1.1 Even Hub workflow run for `56c1f04`:
  `https://github.com/GenomiskDiagnostik/share-with-g2/actions/runs/27828122995`.
- Previous version 0.1.1 Android workflow run for `56c1f04`:
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
- G2 WebView HTTP Fetch reachability is disproven. Complete.
- G2 WebView loopback WebSocket reachability. Complete on physical hardware.
- Cloud fallback proposal ADR-013 remains proposed and is not accepted.

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

Physical evidence for version 0.1.2:

- Even Hub successfully reached and read the Android inbox over loopback
  WebSocket.
- Pairing and authenticated inbox reads work on the physical phone/G2 setup.
- Cyclic single-click item navigation is unreliable in physical use.
- Slow scrolling can bounce from a page boundary back to the same page top or
  previous page, motivating ADR-015.

Physical evidence for version 0.2.0:

- The startup text-to-list rebuild is not applied until a later phone-side item
  selection triggers another render.
- Reader double-click is not a reliable physical return path to the inbox menu.
- ADR-017 replaces both behaviors in version 0.2.1.

Physical evidence for version 0.2.1:

- Delaying the mandatory startup container until after local API loading leaves
  the G2 surface blank.
- ADR-018 restores immediate startup and adds bounded menu rebuild retries in
  version 0.2.2.

Physical evidence for version 0.2.2:

- R1 scroll changes the native list selection, but single-click does not open
  the selected entry because the click and selection may arrive in separate
  event payloads.
- Long press exits through the host as expected; menu double-click is not a
  useful separate exit gesture.
- A failed first inbox connection does not recover automatically because
  version 0.2.2 enables polling only after successful startup.
- Startup performs sequential `/health` and `/items` requests over separate
  short-lived WebSocket connections, adding avoidable latency.

Physical evidence for version 0.2.3:

- Native R1 list scrolling still works, but click and double-click do not
  navigate. The host may expose those inputs only through SDK `jsonData`.
- Phone item selection rerenders after the first tap, preventing a normal
  browser `dblclick` from reaching the original button.
- Long press continues to invoke the host-managed app-exit confirmation.

Physical evidence for version 0.2.4:

- Native R1 scrolling still works, while click and double-click navigation do
  not. Raw payload traversal is insufficient because protobuf omits the
  zero-valued `CLICK_EVENT` field entirely.
- Official Even Hub templates explicitly require an existing event envelope
  with missing `eventType` to be interpreted as click.

Physical evidence for version 0.2.5:

- R1 click and double-click still do not navigate after protobuf-zero
  decoding, so the callback may be arriving as a raw `{ type, jsonData }`
  envelope rather than typed event properties.
- The installed app has no visible counter proving whether JavaScript receives
  the event, requiring bounded diagnostics in version 0.2.6.

Physical evidence for version 0.2.6:

- Click can eventually execute after approximately 30 seconds and remains
  unreliable, while native scroll responds in real time.
- The 280 ms menu-click deferral uses `window.setTimeout`, which the Even Hub
  SDK proxies through the host lifecycle and therefore cannot provide reliable
  physical input latency.

Physical evidence for version 0.2.7:

- Removing timers did not make native-list click/double-click reliable.
- Working projects route `listEvent` directly before generic text/system
  gestures and leave explicit native-list scroll to firmware.

Physical evidence for version 0.2.8:

- Navigation still fails, while double-click may react with roughly 30 seconds
  of lag after the phone opens an item.
- Input dispatch is immediate, but failed list/text surface rebuilds still wait
  on SDK-proxied 400/800 ms timers, and startup retains a proxied 600 ms timer.

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
- Separate low-FPS screen sharing mode using the Even Hub image container API.
  Complete locally; physical G2 update-rate validation pending.
- Explicit browser/simulator demo mode. Complete.
- Danish and English reader copy. Complete.
- Pagination, reader state, rendering, locale, and API tests. Complete locally.
- Dedicated unauthorized/pairing state. Complete locally.
- Native G2 item menu using the documented list container. Complete locally
  for version 0.1.3; physical validation pending.
- Stable page-boundary scroll gating and no-op final-page handling. Complete
  locally for version 0.1.3; physical validation pending.
- Pairing input limited to the settings page. Complete and browser-validated
  for version 0.1.3.
- Direct native-list startup and reader single-click return. Complete locally
  for version 0.2.1; physical validation pending.
- Cross-source R1 click normalization with remembered scroll selection.
  Complete locally for version 0.2.3; physical validation pending.
- Single-flight inbox refresh with 1/3-second startup retries and unconditional
  10-second recovery polling. Complete locally for version 0.2.3.
- Raw `jsonData` R1 normalization and explicit accept/back/delete confirmation
  state. Complete locally for version 0.2.4; physical validation pending.
- Phone item tap arbitration: single tap selects, double tap opens the existing
  delete confirmation. Complete locally for version 0.2.4.
- Official Even Hub SDK 0.0.11 and protobuf-zero click decoding for list, text,
  and system envelopes. Complete locally for version 0.2.5; physical validation
  pending.
- Raw bridge-envelope parsing through the official SDK plus content-free phone
  input diagnostics. Complete locally for version 0.2.6; physical validation
  pending.
- Timer-free R1 actions and timestamp-only phone double-tap detection. Complete
  locally for version 0.2.7; physical validation pending.
- Native-list-first accept/double routing with explicit scroll pass-through and
  serialized actions. Complete locally for version 0.2.8; physical validation
  pending.
- Timer-free startup and interactive surface rebuild retries. Complete locally
  for version 0.2.9; physical validation pending.
- Supplied read/unread home-cards prebuilt EHPK material integrated for version
  0.2.60. Complete locally; GitHub artifact validation pending.
- Android launcher icon replaced with the supplied G2 logo and Android version
  bumped to 0.2.1. Complete locally; GitHub Release pending.

Automated status:

- 79 Even Hub test cases cover API validation, WebSocket fallback, native-menu
  rebuild recovery and paging, reader return gestures, scroll gating, key storage, mutations,
  read-state updates, refresh reconciliation, pagination, navigation,
  R1 event normalization, refresh concurrency/recovery, rendering, screen
  snapshot state, reachability, and locale selection. The current
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
- Android version: `0.2.1` (`versionCode` 5).
- Android min SDK 26; compile and target SDK 36.
- JDK 17, Gradle 8.13, AGP 8.13.2, and Kotlin 2.3.21.
- HTML shares flatten to sanitized plain text.
- Maximum stored text is 65,536 characters.
- Generated titles are capped at 80 characters.
- Notification previews are capped at 160 characters.
- GitHub Actions publishes debug APK and report artifacts.
- Even Hub package ID:
  `io.github.genomiskdiagnostik.sendtog2.sharedinbox`.
- Even Hub package version: `0.2.60`.
- Even Hub SDK and minimum package SDK version: `0.0.11`.
- Even Hub tries authenticated loopback WebSocket first, then the existing HTTP
  aliases only after network failure, as documented in ADR-014.
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
- G2 creates an immediate loading surface and rebuilds it as a native inbox
  list after loading. List scrolling remembers the selection, a single R1
  click accepts it, menu double-click requests confirmed deletion, reader
  scrolling changes pages, and reader double-click returns to the menu, as
  documented in ADR-020.
- Public links are stored immediately, then enriched in WorkManager without
  cookies; failures retain the original URL.
- Link retrieval blocks local/private destinations, follows at most three
  validated redirects, and caps responses at 1 MiB.
- Delete and clear are implemented; packaged authenticated mutation validation
  remains a release gate.
- Read/unread is implemented through authenticated `PATCH /items/{id}` with a
  boolean-only body.
- Even Hub loads `/items` directly, retries transient startup failures after
  one and three seconds, then polls every ten seconds. Startup, polling, and
  manual refresh share one active request and preserve the current selection
  when possible.
- Screen sharing uses one explicit Android MediaProjection consent session,
  stores only the latest in-memory PNG, and exposes it through authenticated
  `GET /screen-snapshot`. Android offers 1,000 and 500 ms intervals and Even Hub
  skips duplicate frame IDs while polling without overlapping requests.

## Open decisions

- Whether a user-mediated local import is needed if ADR-014 is physically
  blocked. ADR-013 remains deferred.
- Whether v0.2 should add undo after confirmed deletion.
- Whether read/unread should gain filters or automatic "mark read when opened"
  behavior.
- Whether physical G2 image-container behavior and 500 ms update load are good
  enough for low-FPS screen-sharing release.
- Whether a later screen feature should add OCR alongside low-FPS images.
- Whether dynamic sources should later support RSS/Atom, JSON APIs, or
  headless-browser extraction for JavaScript-rendered pages.

## Immediate next task

Publish Android 0.2.1 and Even Hub 0.2.60 artifacts, create a GitHub Release
with the Android APK, then physically validate the supplied read/unread
home-cards EHPK, unchanged real-time scrolling, R1 single/double input
behavior, Android launcher icon, screen-sharing, selected-text system flow, and
dynamic link source refresh.

## Supplied package evidence

- Even Hub v0.2.60 source zip SHA-256:
  `7BD61A80908C97F0E9059A3CD71BFA9AFF02F629E1E455E3B0A1D52EEF0E7A75`.
- Even Hub v0.2.60 EHPK SHA-256:
  `6B840EE8EAFC2270FF71429FFD86A425A2869F14AD160B6755329B764FB3BE38`.
