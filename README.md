# Send to G2

Local-first Android companion app and Even Hub G2 webapp for sending shared text and links from Android to Even Realities G2 glasses.

## Product summary

Send to G2 appears as an Android Sharesheet target. When a user shares text, a URL, or simple HTML-derived text from Chrome, Reddit, email, PDF viewers, or other apps, the Android app stores the item locally, emits a normal Android notification, and exposes a local inbox API. The Even Hub app reads that local inbox and presents a glasses-friendly Shared Inbox with pagination, navigation, single-item deletion, and clear-all.

The MVP deliberately avoids direct BLE reverse engineering. Notifications should flow through the existing Even notification mirroring pipeline where available. The G2 app is a reader/inbox, not a low-level hardware integration layer.

## Primary platforms

- Android companion app: Kotlin, Jetpack Compose, Room, DataStore, WorkManager only if needed.
- Even Hub app: TypeScript, Vite, `@evenrealities/even_hub_sdk`.
- Data bridge: local HTTP API on `127.0.0.1:8765` first; fallback transport is explicitly deferred until verified.

## MVP scope

Version 0.1 supports:

- Android share target labelled `Send to G2`.
- `text/plain`, `text/html`, and `text/*` inbound shares.
- URL detection from shared text.
- Local storage of shared items.
- Android notification with short preview.
- Even Hub Shared Inbox reader.
- Explicit same-phone pairing with a per-installation local API access key.
- Newest-first list semantics.
- Open/read item.
- Delete current item.
- Clear all items.
- Pagination for long text.

Deferred to v0.2+:

- Image storage and thumbnail display.
- PDF/file ingestion.
- OCR or PDF text extraction.
- Search.
- Favorites/pin.
- Auto-expiry.
- Cloud relay.
- Direct BLE integration.

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
