# Send to G2

Local-first Android companion app and Even Hub G2 webapp for sending shared text and links from Android to Even Realities G2 glasses.

## Product summary

Send to G2 appears as an Android Sharesheet and selected-text action. When a user shares or selects text, a URL, or simple HTML-derived text from Chrome, Reddit, email, PDF viewers, or other apps, the Android app stores the item locally, emits a normal Android notification, and exposes a local inbox API. The Even Hub app reads that local inbox and presents a glasses-friendly Shared Inbox with pagination, navigation, live refresh, read/unread state, single-item deletion, and clear-all. A separate low-FPS mode can refresh a user-approved Android app or display image on G2 every 1,000 or 500 ms.

The MVP deliberately avoids direct BLE reverse engineering. Notifications should flow through the existing Even notification mirroring pipeline where available. The G2 app is a reader/inbox, not a low-level hardware integration layer.

Current release state:

- Android APK: `0.2.1` (`versionCode` 5) with the G2 launcher logo.
- Even Hub package: `0.2.60`, built from the supplied read/unread home-cards prebuilt bundle.
- Local API: `0.2.2` with dynamic source management and dynamic item metadata.
- GitHub Releases provide the Android APK; GitHub Actions continues to publish Android and Even Hub workflow artifacts.

## Primary platforms

- Android companion app: Kotlin, Jetpack Compose, Room, DataStore, WorkManager.
- Even Hub app: TypeScript, Vite, `@evenrealities/even_hub_sdk`.
- Data bridge: local WebSocket through `localhost:8765`, with numeric loopback
  and HTTP fallbacks on the same loopback-only Android socket. Cloud remains
  deferred.

## MVP scope

Version 0.1 supports:

- Android share target labelled `Send to G2`.
- Android selected-text action labelled `Send to G2`.
- `text/plain`, `text/html`, and `text/*` inbound shares.
- URL detection from shared text.
- Local storage of shared items.
- Android notification with short preview.
- Even Hub Shared Inbox with a native G2 item menu and paginated reader.
- Explicit same-phone pairing with a per-installation local API access key.
- Newest-first list semantics.
- Open/read item.
- Manual and periodic inbox refresh.
- Delete current item.
- Clear all items.
- Pagination for long text.

Implemented v0.2 candidate:

- Mark current item read or unread through the authenticated local API.
- Start a user-approved low-FPS Android screen-sharing session and expose only
  its latest in-memory image to Even Hub.
- Add Android-managed dynamic link sources that periodically fetch public
  static HTML, extract a user-selected CSS selector, and expose the latest
  sanitized text as a dynamic inbox item marked with a dot in Even Hub.
- Pin/unpin items client-side in Even Hub and mark pinned items with a star.

Deferred to later v0.2+:

- Image storage and thumbnail display for shared files.
- PDF/file ingestion.
- OCR or PDF text extraction.
- Search.
- Auto-expiry.
- Cloud relay.
- Direct BLE integration.
- Video-rate screen mirroring, audio capture, and remote control.

## Repository layout

```text
send-to-g2/
  README.md
  AGENTS.md
  PLANS.md
  apps/
    android/
      README.md
      app/
        src/main/AndroidManifest.example.xml
        src/main/kotlin/com/example/sendtog2/ShareReceiverActivity.example.kt
    even-hub/
      README.md
      app.json.example
      package.json.example
      src/main.example.ts
    prebuilt/v0.2.60/
  docs/
    product/prd.md
    architecture/system-architecture.md
    api/local-api.md
    security/privacy-model.md
    plans/implementation-roadmap.md
    plans/first-25-tasks.md
    plans/first-codex-prompt.md
    decisions/ADR-001-tech-stack.md
    decisions/ADR-002-i18n-strategy.md
    decisions/ADR-003-execution-strategy.md
  shared/
    schemas/shared-item.schema.json
```

## Startup instructions

This starter pack is documentation-first. The first implementation step is to scaffold real app projects under `apps/android` and `apps/even-hub`, then update `PLANS.md` before writing feature code.

Recommended first commands after creating a repository:

```bash
git init
git add .
git commit -m "Initialize Send to G2 starter pack"
```

Then run the first Codex prompt from `docs/plans/first-codex-prompt.md` in planning mode.

## Design principles

1. Local-first by default.
2. No direct BLE or Even app reverse engineering in the MVP.
3. Text-first UX; G2 is treated as a constrained reader display.
4. Small vertical slices over wide rewrites.
5. Each feature must be testable without physical glasses where possible.
6. Privacy failures are product failures.

## External references

- Android receiving shared content: https://developer.android.com/training/sharing/receive
- Android sending/sharing data: https://developer.android.com/training/sharing/send
- Even Hub docs: https://hub.evenrealities.com/docs
- Even Hub templates: https://github.com/even-realities/evenhub-templates
- Even Hub SDK package: https://www.npmjs.com/package/@evenrealities/even_hub_sdk
