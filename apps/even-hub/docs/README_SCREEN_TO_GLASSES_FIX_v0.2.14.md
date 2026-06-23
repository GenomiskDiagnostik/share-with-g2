# Send to G2 v0.2.14 — Screen sharing opens on glasses

This build fixes the R1 menu action for **Skærmdeling / Screen sharing**.

## Problem

v0.2.13 routed the R1 menu action through the mobile DOM button `button[data-open-snapshot]`. That starts or toggles the phone/mobile WebView screen-sharing UI, but it does not navigate the G2 display into the glasses snapshot page. It also only worked once after app startup because it depended on the mobile view state.

## Fix

- R1 single-click on `Skærmdeling` now directly navigates to `?mode=snapshot`.
- R1 double-click on `Skærmdeling` uses the same direct glasses snapshot route.
- The snapshot page uses an image container plus a separate full-screen text event-capture layer, matching the Even Hub image template pattern where image containers do not capture input.
- On the snapshot page:
  - single tap refreshes the snapshot,
  - double tap returns to the inbox.

## Version

`0.2.14`
