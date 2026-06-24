# Send to G2 v0.2.10 R1 navigation fix

This folder is the unpacked Even Hub package from the uploaded `.ehpk`, with a patched production bundle.

## Changed

- Version bumped from `0.2.9` to `0.2.10`.
- R1/touch event routing is more explicit:
  - double-click is prioritized before click when multiple event markers are present.
  - menu scroll events update the app-side selected list index when the SDK event does not provide one.
  - click selection prefers selected index over selected name, avoiding stale selection names.
  - list-selection index aliases are accepted from SDK/raw payloads, including `listSelectItemId`, `list_select_item_id`, `selectedIndex`, and `itemIndex`.
  - reader double-click back now bypasses the async action gate so it does not wait behind a slow render/API action.
- List item width changed from auto `0` to explicit `566`, following common Even Hub list-container advice.

## Files

- `app.json` — package metadata.
- `dist/index.html` — app entrypoint.
- `dist/assets/index-DGiErpkq.js` — patched production bundle.
- `dist/assets/index.pretty.js` — beautified patched bundle for inspection only; not required by the app.

## Package command used

```bash
node /mnt/data/ehpkwork/package/main.js pack app.json dist -o send_to_g2_v0.2.10_r1_fix.ehpk
```
