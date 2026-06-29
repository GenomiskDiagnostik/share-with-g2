# Send to G2 v0.2.53 – Persistent pinned items

Builds on v0.2.52.

Changes:

- Pinned item IDs are now persisted redundantly in `localStorage`, `sessionStorage`, and a long-lived cookie.
- On startup/reload, pinned IDs are merged from all available storage layers and mirrored back to all layers.
- Pin status is re-applied to every inbox refresh from the Android local API.
- G2 pinned marker remains `★`.
- Pin/unpin remains mobile-WebView-only.
- Gesture routing is unchanged from v0.2.52.
