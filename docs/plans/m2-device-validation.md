# M2 Device Validation

Use this checklist after the Android and Even Hub GitHub Actions workflows are
green.

## Artifacts

1. Download `send-to-g2-debug-apks`.
2. Download `send-to-g2-even-hub`.
3. Install the Android debug APK.
4. Upload or sideload the `.ehpk` through the Even Hub developer flow.

## Android API Baseline

1. Open `Send to G2`.
2. Confirm the diagnostics card says the API is running at
   `http://127.0.0.1:8765`.
3. Share a short text into the app.
4. Confirm the Android inbox shows one item.
5. While the process is alive, verify with `adb` if available:

   ```bash
   adb shell 'toybox wget -qO- http://127.0.0.1:8765/health'
   adb shell 'toybox wget -qO- http://127.0.0.1:8765/items'
   ```

## Even Hub Probe

1. Launch the packaged `Send to G2` plugin.
2. Record the companion WebView result.
3. Record the G2 display result.
4. Repeat after backgrounding the Android app for 30 seconds.
5. Repeat after Android removes the companion process.

## Evidence To Record

- Phone model and Android version.
- Even app version and Even Hub SDK version.
- Whether `http://127.0.0.1:8765` passed the network whitelist.
- Whether cleartext HTTP was allowed.
- Whether CORS succeeded.
- The packaged WebView origin, if visible in developer diagnostics.
- How long the Android process remained reachable in the background.

Do not include shared item text in screenshots, logs, or issue reports.

## Decision

- If packaged loopback works reliably, continue M3 with a stricter origin or
  authorization design before mutation endpoints.
- If packaged loopback is blocked, create a transport ADR before adding any
  relay, LAN binding, or platform-specific alternative.
