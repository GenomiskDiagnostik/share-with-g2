# Screen Snapshot Validation

## Automated

Run from `apps/android`:

```powershell
.\gradlew.bat testDebugUnitTest lintDebug assembleDebug assembleDebugAndroidTest
```

Expected:

- Snapshot sizing fits portrait and landscape screens into `288 × 144`.
- `GET /screen-snapshot` requires the local API Bearer key.
- `GET /screen-snapshot` returns `404` before a snapshot exists.
- Snapshot JSON validates `image/png`, dimensions, timestamp, and base64 data.
- The Android build declares `FOREGROUND_SERVICE_MEDIA_PROJECTION` and a
  non-exported `mediaProjection` service.

Run from `apps/even-hub`:

```bash
npm test
npm run build
npm run pack
```

Expected:

- The Even Hub client validates snapshot payload bounds before rendering.
- Snapshot mode renders loading, empty, unauthorized, and ready states.
- `?mode=snapshot&demo=1` shows a demo snapshot without Android data.

## Physical Phone And G2

1. Install the latest Android debug APK.
2. Install or sideload the latest Even Hub `.ehpk`.
3. Open `Send to G2` on Android.
4. Tap `Tag skærmbillede` / `Capture screen`.
5. Confirm Android shows the system screen-capture consent prompt.
6. Approve capture and verify the foreground notification appears briefly.
7. Confirm Android shows a latest snapshot with dimensions and timestamp.
8. Open Even Hub snapshot mode.
9. Pair with the Android access key if prompted.
10. Confirm the latest snapshot appears in the phone WebView.
11. Confirm the image is shown on G2, not only the fallback text.
12. Tap refresh after taking a second snapshot and confirm the G2 image updates.
13. Tap clear snapshot in Android and confirm snapshot mode returns to empty.
14. Lock the phone during capture and confirm capture stops cleanly.

Do not record or attach screenshots containing private data. Use a harmless
test screen with obvious text and shapes.

## Not Release-Ready Until

- Packaged Even Hub image-container rendering is validated on physical G2.
- The exact image orientation, scaling, and grayscale conversion behavior is
  documented.
- Android MediaProjection behavior is checked on at least one Android 14+
  device.
