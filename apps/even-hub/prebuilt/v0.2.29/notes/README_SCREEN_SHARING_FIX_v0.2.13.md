# Send to G2 v0.2.13 — R1 screen sharing menu fix

This build keeps the v0.2.12 direct text-container navigation that fixed R1 inbox navigation.

## Change

The `Skærmdeling` / `Screen sharing` menu entry now uses the same DOM action path as the mobile WebView button:

- R1 single click on the menu entry dispatches the existing `data-open-snapshot` action.
- R1 double click on the same menu entry does the same, instead of being ignored.
- The snapshot route helper now builds the target URL from the current URL and performs a short delayed fallback navigation.

This avoids relying on a direct `window.location.href = "?mode=snapshot"` transition from inside the raw Even Hub event callback, which appears less reliable on glasses than a normal mobile button click.

## Expected glasses behavior

1. Open inbox menu.
2. Scroll to `Skærmdeling`.
3. Single click should open the built-in screen sharing/snapshot view.
4. Double click on `Skærmdeling` also opens it.
5. From the snapshot view, click returns to inbox as before.

## Version

`app.json` version: `0.2.13`
