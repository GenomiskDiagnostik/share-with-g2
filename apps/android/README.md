# Android Companion App

The Android app is the persistence owner for Send to G2. It receives text and
link shares, stores them in Room, emits a short notification preview, and
shows a minimal local inbox for diagnostics and deletion.

## Baseline

- Application ID: `io.github.genomiskdiagnostik.sendtog2`
- Minimum SDK: 26
- Compile and target SDK: 36
- JDK: 17
- Gradle: 8.13
- Android Gradle Plugin: 8.13.2
- Kotlin: 2.3.21
- Compose BOM: 2026.05.01
- Room: 2.8.4 with KSP

The versions are intentionally pinned to the latest compatible Android 16
toolchain. Newer AndroidX Core and AGP releases require API 37 and are not part
of this baseline.

## Build

Set `JAVA_HOME` to a JDK 17 installation and `ANDROID_HOME` to an Android SDK
containing platform 36 and build-tools 36.0.0.

```powershell
.\gradlew.bat testDebugUnitTest lintDebug assembleDebug assembleDebugAndroidTest
```

The debug APK is written to:

```text
app/build/outputs/apk/debug/app-debug.apk
```

GitHub Actions also uploads debug APKs and build reports as workflow artifacts.

## Implemented slice

- Sharesheet receiver for `text/plain`, `text/html`, and `text/*`.
- HTML converted to plain text.
- 64 KiB maximum stored text length.
- URL classification for complete HTTP/HTTPS URLs.
- Background extraction of readable text from public HTTP/HTTPS links.
- ChatGPT-style shares prefer the latest rendered assistant response.
- Original URLs remain appended to extracted content.
- Link extraction uses no cookies or login session and falls back to the URL.
- Room persistence with newest-first ordering.
- Notification channel and permission-aware preview.
- Danish local inbox with single-item delete and clear-all.
- Parser, Android intent, and Room repository tests.
- Read-only local API on `127.0.0.1:8765`.
- `GET /health`, `GET /items`, and CORS preflight handling.
- Danish local API diagnostics in the companion app.
- Local API self-test, restart control, request count, and bounded last-client
  metadata.
- Last identified Even Hub origin and user-agent, without shared-content logs.
- Danish and English UI selected from the system or per-app language.
- Router-fake and loopback HTTP tests.

Link extraction is intentionally bounded to a 1 MiB response with short
timeouts and at most three redirects. Loopback, link-local, private-network,
credential-bearing, and non-HTTP(S) destinations are rejected.

## Deferred

- Foreground service/server lifecycle; the current process-local server can be
  restarted manually.
- Physical Even Hub loopback and cleartext validation.
- Local API mutation endpoints.
- Authenticated or JavaScript-only page extraction.
