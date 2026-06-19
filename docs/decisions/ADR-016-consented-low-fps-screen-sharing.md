# ADR-016: Consented Low-FPS Screen Sharing

## Status

Accepted for version 0.2.0. Supersedes ADR-010 for capture lifecycle only.

## Context

The single-frame snapshot flow can stop before a usable frame arrives, and it
requires a new MediaProjection consent flow for every update. The Even Hub SDK
offers image-container updates, not a documented video stream, so continuous
video mirroring is not an appropriate implementation target.

Android's system MediaProjection picker can let supported Android versions
choose one app or the full display. A projection may produce multiple frames
during one consented session while a media-projection foreground service is
running.

## Decision

- Replace one-frame capture with an explicitly started low-FPS sharing session.
- Offer 1,000 ms and 500 ms capture intervals; default to 1,000 ms.
- Use the Android system MediaProjection picker for app or display selection.
- Keep the projection in a foreground service with an ongoing notification and
  a Stop action for the full session.
- Stop immediately when the user taps Stop, Android revokes projection, or the
  service is destroyed.
- Keep only the latest encoded PNG in process memory. Do not persist frames,
  add them to Room, upload them, or log their content.
- Keep the authenticated `GET /screen-snapshot` schema unchanged. Each new
  frame receives a new ID and timestamp.
- Poll the latest frame from Even Hub every 500 ms, allow only one request at a
  time, and skip image updates when the frame ID is unchanged.
- Send decoded image bytes to `updateImageRawData`, matching the SDK's
  recommended representation.
- Expose screen sharing as a native G2 inbox-menu entry and a phone WebView
  action. Double-click in the G2 sharing view returns to the inbox.
- Continue fitting frames inside the documented `288 x 144` image bounds.

## Consequences

- The feature is low-FPS screen sharing, not video, audio capture, remote
  control, or a direct BLE implementation.
- The 500 ms option increases CPU, battery, local API, and G2 update load; the
  1,000 ms option is the default.
- App-only selection depends on the Android version and system picker shown on
  the device. Older versions may offer only the entire display.
- Rotation or a selected app changing size can require restarting the sharing
  session in the first implementation.
- Physical Android and G2 validation remains required for image orientation,
  grayscale conversion, update rate, heat, and battery behavior.
