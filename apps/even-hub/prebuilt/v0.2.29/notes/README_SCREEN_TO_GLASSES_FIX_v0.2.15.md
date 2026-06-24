# Send to G2 v0.2.15 – in-place screen sharing on glasses

This build changes the R1/G2 `Skærmdeling` menu action from URL/mobile-WebView navigation to an in-place glasses container rebuild.

## Why

Changing `window.location.href` to `?mode=snapshot` can update the phone WebView without reliably replacing the active Even Hub page container already shown on the glasses.

## Fix

- Selecting `Skærmdeling` now calls an in-place `rebuildPageContainer()` on the existing bridge.
- The snapshot page uses a full-screen text event-capture layer plus an image container.
- The image is fed via the existing `/screen-snapshot` API and `updateImageRawData()`.
- R1 single tap on snapshot refreshes the snapshot.
- R1 double tap returns to the inbox/menu and stops the snapshot interval.

This is intentionally not wired to the mobile `data-open-snapshot` button.
