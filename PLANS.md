# PLANS.md

## Current objective

Deliver and validate the authenticated Even Hub Shared Inbox reader while
physical loopback reachability remains an explicit gate.

## Current phase

Phase 3: Even Hub Shared Inbox reader slice.

## Active assumptions

- The Android app is the persistence owner.
- The Even Hub app can attempt to call a local phone endpoint at
  `http://127.0.0.1:8765`; feasibility must be validated early.
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
- GitHub Actions `.ehpk` artifact. Complete.
- Restartable in-process API lifecycle. Complete locally.
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
- 53 Android unit tests cover parser, persistence, link extraction, API
  routing, authenticated mutations, read-state updates, screen snapshot sizing
  and routing, restart, self-test, and bounded request diagnostics locally.
- Even Hub workflow run:
  `https://github.com/GenomiskDiagnostik/share-with-g2/actions/runs/27467638537`.
- Android workflow run:
  `https://github.com/GenomiskDiagnostik/share-with-g2/actions/runs/27467638539`.
- Artifacts: Even Hub package, debug APKs, Android build reports, and Android
  instrumentation reports.
- The Android diagnostics card can now run a loopback self-test, restart the
  server, count requests, and show the last identified Even Hub origin and
  user-agent without recording inbox content.
- The Android app can reveal, copy, and rotate a 192-bit local API key without
  including it in diagnostics.

Exit criteria:

- API is reachable from the Android app process.
- G2 WebView/local app reachability is verified or disproven.
- A fallback ADR is created only if loopback is not viable.

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
- Android min SDK 26; compile and target SDK 36.
- JDK 17, Gradle 8.13, AGP 8.13.2, and Kotlin 2.3.21.
- HTML shares flatten to sanitized plain text.
- Maximum stored text is 65,536 characters.
- Generated titles are capped at 80 characters.
- Notification previews are capped at 160 characters.
- GitHub Actions publishes debug APK and report artifacts.
- Even Hub package ID:
  `io.github.genomiskdiagnostik.sendtog2.sharedinbox`.
- The local API runs for the Android application process lifetime.
- The in-process server is restartable but is not promoted to a foreground
  service until physical background-lifetime evidence requires it.
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

- Whether Even Hub WebView can reach Android loopback.
- Whether Android needs a foreground service for local server lifetime.
- Whether v0.2 should add undo after confirmed deletion.
- Whether read/unread should gain filters or automatic "mark read when opened"
  behavior.
- Whether physical G2 image-container behavior is good enough for screen
  snapshot release.
- Whether a later screen feature should be OCR-first or low-FPS image refresh.

## Immediate next task

Build and install the new artifacts, pair Even Hub with the Android key, and
execute the physical-phone reachability, reader mutation, read-state refresh,
screen snapshot, and link-content scripts. Use Android diagnostics to record
the packaged WebView origin and background lifetime before release acceptance.
