# Even Hub Shared Inbox App

This directory contains the Even Hub G2 app.

## Responsibilities

- Connect to Even Hub bridge.
- Fetch local shared items from Android companion API.
- Render a Shared Inbox optimized for 576 × 288 display constraints.
- Paginate long text.
- Support navigation, delete current, and clear all.

## Suggested stack

- TypeScript
- Vite
- `@evenrealities/even_hub_sdk`
- Vitest for logic tests

## Implemented reader slice

- Official Vite and Even Hub SDK structure.
- Package ID: `io.github.genomiskdiagnostik.sendtog2.sharedinbox`.
- Network permission limited to `http://127.0.0.1:8765`.
- Runtime-validated `GET /health` and `GET /items` client.
- Loading, empty, failure, and ready reader states.
- Paragraph/word-aware pagination for long text.
- Click for next item, scroll for page movement, and double-click for safe exit.
- Danish and English reader states selected from the WebView locale.
- Danish remains the MVP UI language. Even Hub package metadata uses `en` as
  the required fallback because its current language enum has no `da` value.
- Explicit `?demo=1` mode with local sample data for browser and simulator QA.
- Vitest coverage for API validation, pagination, navigation, rendering,
  reachability, and locale selection.

## Commands

```bash
npm install
npm test
npm run build
npm run pack
```

Use `http://127.0.0.1:5173/?demo=1` during development to exercise the reader
without Android. Demo mode is explicit and never replaces a failed live API
request.

The minimal npm development dependencies are installed locally. GitHub Actions
repeats the test, build, and packaging steps and publishes the reviewable
`.ehpk` artifact.

## Remaining M2 validation

1. Install the Android debug APK and open it so the local server is running.
2. Sideload the generated `.ehpk` through Even Hub.
3. Record whether the production WebView can reach Android loopback.
4. Record the WebView origin and cleartext behavior before enabling mutations.

Delete-current and clear-all remain intentionally deferred until that security
gate is complete.
