# Send to G2 v0.2.17 — G2 snapshot image render fix

This build targets the case where the glasses show the snapshot metadata text such as `120×80 billede`, but the image itself does not render.

Changes:
- Keeps the in-place glasses snapshot viewer from v0.2.16.
- Converts every incoming `/screen-snapshot` frame to a G2-friendly 288×144 PNG via browser canvas before calling `updateImageRawData()`.
- Sends `imageData` as a plain byte array (`Array<number>`) rather than relying on raw decoded/base64 data from the Android snapshot source.
- Adds a short 750 ms settle delay after building the image container before first image transfer, based on observed G2 behaviour where layout construction can return before the display pipeline is ready.
- Keeps last good frame state and does not clear the image container on snapshot fetch errors.

R1 behaviour:
- In menu: single tap on `Skærmdeling` opens glasses snapshot mode.
- In snapshot mode: single tap refreshes, double tap returns to inbox/menu.

Notes:
- The phone WebView may still be required to start/keep Android screen capture active, depending on how the original app implements the producer side.
- This patch fixes consumer-side rendering to the G2 image container.
