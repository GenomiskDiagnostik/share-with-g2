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

## Implemented M2 probe

- Official Vite and Even Hub SDK structure.
- Package ID: `io.github.genomiskdiagnostik.sendtog2.sharedinbox`.
- Network permission limited to `http://127.0.0.1:8765`.
- Runtime-validated `GET /health` and `GET /items` client.
- Danish and English connected/failure states selected from the WebView locale.
- Danish remains the MVP UI language. Even Hub package metadata uses `en` as
  the required fallback because its current language enum has no `da` value.
- Double-tap exits the G2 probe.
- Vitest coverage for API validation and reachability state.

## Commands

```bash
npm install
npm test
npm run build
npm run pack
```

The local sandbox used for the initial M2 implementation cannot access the npm
registry. GitHub Actions therefore owns the first dependency install, build,
test, and `.ehpk` artifact.

## Remaining M2 validation

1. Install the Android debug APK and open it so the local server is running.
2. Sideload the generated `.ehpk` through Even Hub.
3. Record whether the production WebView can reach Android loopback.
4. Record the WebView origin and cleartext behavior before enabling mutations.
