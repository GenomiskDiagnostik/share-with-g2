# Send to G2 v0.2.19 — locked snapshot + 2-tile image

Changes:

- Stops the normal inbox auto-refresh while the glasses are in snapshot/screen-sharing mode.
- Suppresses normal glass text/menu rendering while snapshot mode is active, so an in-flight inbox refresh cannot briefly redraw the Send to G2 menu over the snapshot.
- Restarts inbox refresh only after leaving snapshot mode.
- Renders the snapshot as two stacked 288x144 image containers, giving a 288x288 display area. This makes portrait phone screenshots approximately twice as tall on G2 compared with the previous single 288x144 image.
- Uses a tiny text event-capture layer at the bottom instead of a large text/status layer that can visually mask the image.
- Sends image tiles serially with a small inter-tile delay.

Controls:

- In G2 menu: single tap on Skærmdeling opens locked snapshot mode.
- In snapshot mode: single tap refreshes; double tap returns to inbox/menu; long press exits at system level.

Known limitation:

- Starting Android MediaProjection/screen-capture from glasses is not implemented here, because the current bundle only exposes GET /screen-snapshot. If the Android service requires user consent or a mobile-side producer to be active, that still has to be handled by the Android app/service layer or a new local API endpoint.
