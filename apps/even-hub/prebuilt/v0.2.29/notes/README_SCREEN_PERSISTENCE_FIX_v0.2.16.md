# Send to G2 v0.2.16 — persistent snapshot frame fix

This build keeps the latest successfully rendered screen-sharing snapshot visible on the G2 glasses until a newer snapshot is received.

## Changes

- The snapshot glasses view no longer uses a full-screen text event layer over the image.
- The visible status text container now captures R1/G2 input, leaving the image container unobstructed.
- The last good snapshot is cached on the glasses-side state.
- Empty/404/network errors no longer clear the currently displayed frame if a valid frame has already been shown.
- `updateImageRawData()` is only called when the snapshot ID changes, reducing image flicker from repeated redraws of the same frame.
- Polling interval remains 500 ms.

## Expected behavior

- Enter Skærmdeling from the glasses menu.
- The latest phone snapshot should remain visible on the glasses until the next successful snapshot replaces it.
- Single tap refreshes.
- Double tap returns to the inbox/menu.
