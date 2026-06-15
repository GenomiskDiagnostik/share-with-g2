# ADR-010: Screen Snapshot Mode

## Status

Accepted as a feasibility slice.

## Context

The user wants to share the Android screen through Send to G2. Full live video
mirroring is a different product and technical surface from the Shared Inbox:
Android requires explicit MediaProjection consent, recent Android versions
require a foreground service type for media projection, and the Even Hub SDK
exposes image-container updates rather than a documented video stream.

## Decision

- Implement single-frame screen snapshot capture, not live video mirroring.
- Require Android's system MediaProjection consent for every capture session.
- Run capture in a short-lived foreground service with
  `mediaProjection` service type.
- Stop capture after one image or a timeout.
- Scale snapshots to at most `288 × 144`, matching the documented Even Hub
  image-container limit.
- Store the latest snapshot in Android process memory only.
- Expose the latest snapshot through authenticated `GET /screen-snapshot`.
- Add Even Hub snapshot mode behind `?mode=snapshot`, using an image container
  and `updateImageRawData`.
- Keep snapshot mode separate from inbox items; do not add image/file ingestion
  to the Sharesheet MVP.

## Consequences

- Users can intentionally send one screen image to G2 without cloud or BLE
  reverse engineering.
- Sensitive screen content is not persisted to Room.
- Physical G2 validation is required before treating image display as release
  ready because SDK image raw-data behavior is device/runtime-dependent.
- Live low-FPS streaming, OCR, and shared-file image storage remain separate
  future slices.
