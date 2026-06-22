# Even Hub Shared Inbox App

This directory contains the Even Hub G2 app.

## Responsibilities

- Connect to Even Hub bridge.
- Fetch local shared items from Android companion API.
- Render a Shared Inbox optimized for 576 × 288 display constraints.
- Render the latest Android screen snapshot in explicit snapshot mode.
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
- Network permission limited to WebSocket and HTTP on `localhost:8765` and
  `127.0.0.1:8765`.
- Local client probes the WebSocket hostname alias first, then numeric
  WebSocket, hostname HTTP, and numeric HTTP. It falls back only after a
  browser-level network error or timeout.
- Runtime-validated `GET /health` and `GET /items` client. Inbox startup goes
  directly to the authenticated items request so it does not pay for a second
  short-lived WebSocket connection first.
- Pairing form lives only under settings; a `401` links there without showing
  duplicate key fields on the inbox or snapshot front page.
- Access key persistence in WebView local storage and Bearer authorization for
  inbox reads.
- Phone-side delete-current and clear-all controls with explicit confirmation.
- Immediate reader updates after successful authenticated mutations.
- Explicit `X-Send-To-G2-Client: even-hub` marker so Android can distinguish a
  packaged Even Hub request from its own self-test.
- Loading, empty, failure, and ready reader states.
- Paragraph/word-aware pagination for long text.
- Native G2 list menu for visible item selection and opening. R1 selection is
  remembered from list scroll events, and a single click opens it whether the
  physical host reports the click as a list, text, or system event.
- Reader scroll changes pages with boundary-bounce suppression; reader
  single-click or double-click returns to the inbox menu. Double-click no
  longer closes the app from the native menu.
- Inbox refresh is single-flight. A failed first connection retries after one
  and three seconds and then continues normal ten-second polling, so startup
  can recover without repeated phone-side refreshes.
- Danish and English reader states selected from the WebView locale.
- Danish remains the MVP UI language. Even Hub package metadata uses `en` as
  the required fallback because its current language enum has no `da` value.
- Explicit `?demo=1` mode with local sample data for browser and simulator QA.
- Explicit `?mode=snapshot` mode for the latest authenticated screen snapshot.
- `?mode=snapshot&demo=1` mode for image-container/browser QA without Android.
- Vitest coverage for API validation, native-menu paging, scroll gating,
  pagination, navigation, rendering, screen snapshots, reachability, and locale.

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

Use `http://127.0.0.1:5173/?mode=snapshot&demo=1` to exercise snapshot mode.
Physical G2 validation is still required because SDK image-container behavior
depends on the packaged Even Hub runtime.

The minimal npm development dependencies are installed locally. GitHub Actions
repeats the test, build, and packaging steps and publishes the reviewable
`.ehpk` artifact.

## Remaining M2 validation

1. Install the Android debug APK and open it so the local server is running.
2. Sideload the generated `.ehpk` through Even Hub.
3. Record whether Android diagnostics receive `GET /even-hub-ws` from the
   production WebView.
4. Copy the Android pairing key into Even Hub and confirm an authenticated
   inbox read.
5. Open Android diagnostics and record the WebView origin, user-agent,
   cleartext behavior, and authenticated mutation result before release.

Delete-current and clear-all are implemented, but their packaged WebView flow
remains a release acceptance gate.
