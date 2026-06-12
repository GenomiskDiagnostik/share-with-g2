# Codex Implementation Plan

## Product understanding

Send to G2 is a local-first bridge between Android Sharesheet and an Even Hub
reader for Even Realities G2. Android owns ingestion, persistence,
notifications, and the local API. The Even Hub app is a constrained text
reader that fetches sanitized items and supports navigation, pagination,
delete-current, and clear-all.

The v0.1 boundary is intentionally narrow: text and links only, no cloud
dependency, no direct BLE integration, and no undocumented proprietary
protocols.

## Phased plan

### Phase 0: repository bootstrap

- Import and commit the starter documentation. Complete.
- Confirm Android application ID. Complete.
- Confirm Even Hub package ID. Pending before the Even Hub scaffold.
- Select supported Android SDK and toolchain versions. Complete.
- Record the initial test matrix. Complete.

### Phase 1: Android inbound-share vertical slice

- Scaffold a minimal Kotlin/Compose Android app. Complete.
- Register text-only Sharesheet intent filters. Complete.
- Implement parser, URL classification, title generation, and input limits.
  Complete.
- Persist accepted items through Room. Complete.
- Emit a short notification preview behind the notification permission gate.
  Complete.
- Show a minimal newest-first debug list. Complete.
- Complete GitHub emulator and manual source-app validation. Pending.

### Phase 2: local API feasibility slice

- Add an embedded server behind a development setting.
- Implement and test `GET /health` and `GET /items`.
- Verify loopback binding and narrow CORS behavior.
- Build the smallest Even Hub reachability probe.
- Test simulator and physical-device behavior before expanding the API.

### Phase 3: Even Hub Shared Inbox

- Scaffold the TypeScript/Vite app from an official minimal template.
- Add typed API and rendering boundaries.
- Implement empty, loading, item, and error states.
- Add deterministic text pagination and navigation.
- Implement delete-current and clear-all only after input behavior is proven.

### Phase 4: end-to-end hardening

- Complete item-detail and mutation endpoints.
- Define the Android server lifecycle.
- Add diagnostics without logging shared content.
- Run the manual end-to-end matrix and document limitations.
- Prepare debug release artifacts for both apps.

## Dependency map

```text
Shared JSON schema
  -> Android domain model and API DTOs
  -> Room persistence
  -> Local API routes
  -> Even Hub API client and model
  -> Reader state, pagination, and mutations

Android share parser
  -> Repository insert
  -> Notification preview
  -> Debug list
  -> Local API item responses

Local API reachability
  -> Live Even Hub inbox
  -> Delete and clear-all
  -> Final server lifecycle decision
```

## First 10 tasks

1. Confirm `applicationId`, Kotlin package, and Even Hub `package_id`.
2. Verify current supported Android and Even Hub toolchain versions.
3. Scaffold the Android Gradle project and baseline tests.
4. Define the v0.1 text-size cap and normalization rules.
5. Implement the pure `ShareParser` domain slice.
6. Add parser tests for plain text, HTML-derived text, URLs, empty input, and
   oversized input.
7. Add Room entity, DAO, database, and repository.
8. Add Room/repository tests with newest-first ordering.
9. Wire `ShareReceiverActivity` to persistence.
10. Add notification channel, preview generation, and permission-aware tests.

## Files expected to change

- `PLANS.md`
- `apps/android/settings.gradle.kts`
- `apps/android/build.gradle.kts`
- `apps/android/gradle/libs.versions.toml`
- `apps/android/app/build.gradle.kts`
- `apps/android/app/src/main/AndroidManifest.xml`
- `apps/android/app/src/main/kotlin/<package>/domain/*`
- `apps/android/app/src/main/kotlin/<package>/data/*`
- `apps/android/app/src/main/kotlin/<package>/share/*`
- `apps/android/app/src/main/kotlin/<package>/notification/*`
- `apps/android/app/src/main/res/values/strings.xml`
- `apps/android/app/src/test/*`
- `apps/android/app/src/androidTest/*`
- Later phases: `apps/even-hub/package.json`, `apps/even-hub/src/*`, and API
  implementation files under the Android server package.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| Even Hub cannot reach phone loopback | Run a dedicated health probe before building the live inbox; document any fallback in a new ADR. |
| Android stops the embedded server | Test app-active and foreground-service models; choose the least persistent reliable lifecycle. |
| Source apps send inconsistent payloads | Keep parsing pure and defensive; cover real intent variants with unit and instrumented tests. |
| Shared content leaks through logs or notifications | Never log full content; cap previews and inbound text length. |
| G2 input differs between simulator and device | Keep input mapping isolated and validate destructive actions on hardware before acceptance. |
| Schema drifts between Kotlin and TypeScript | Treat the JSON schema as canonical and add contract fixtures/tests on both sides. |

## Validation checklist

### Phase 0

- Starter files are present and JSON examples parse.
- Git tracks only intended project files.
- IDs and version decisions are documented before scaffolding.

### Phase 1

- `text/plain`, `text/html`, and supported `text/*` intents are accepted.
- Empty, unsupported, and oversized payloads are rejected safely.
- Items persist newest-first.
- Notification behavior is verified with permission granted and denied.

### Phase 2

- Server binds to `127.0.0.1` by default.
- Route tests cover success, missing items, and unsupported methods.
- Simulator and physical-device reachability results are recorded.

### Phase 3

- Empty, loading, item, and API-error states render in the simulator.
- Pagination is deterministic for long Danish and English text.
- Navigation cannot produce invalid indices.
- Delete and clear-all provide deliberate feedback.

### Phase 4

- Share, store, notify, fetch, read, delete, and clear work end to end.
- No cloud service or proprietary protocol is required.
- Known transport, lifecycle, and notification-mirroring limitations are
  documented.

## Required PLANS.md updates

- Record that the starter archive and this plan are imported.
- Keep M0 active until IDs, toolchain versions, and the initial test matrix are
  confirmed.
- Set the immediate next task to resolving IDs and beginning the parser-first
  Android slice after plan approval.
- Keep local API reachability as the primary architecture risk.
