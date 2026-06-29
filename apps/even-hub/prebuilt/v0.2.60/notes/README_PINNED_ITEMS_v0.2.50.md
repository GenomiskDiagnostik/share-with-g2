# Send to G2 v0.2.50 — pinned inbox items

Built on v0.2.49 deterministic gesture routing.

## Changes

- Added mobile-WebView pin/unpin controls for inbox items.
- Pin/unpin is only available in the mobile WebView item picker.
- Pinned items are marked with `PIN` in the G2 menu and reader metadata.
- G2 delete routes refuse pinned items.
- Mobile WebView delete and clear-all routes refuse pinned items.
- Pin state is stored locally in the Even Hub WebView using `localStorage` under `sendToG2.pinnedItemIds`.

## Gesture policy retained

- Menu starts on Screen sharing.
- Screen sharing selected + double-click: Even Hub exit confirmation.
- Inbox item selected + click: open item.
- Inbox item selected + double-click: delete confirmation unless pinned.
- Item view + click: next page; last page opens delete confirmation unless pinned.
- Item view + double-click: back to menu.
- Long-press is not handled by app logic.

## Notes

Pinned protection is client-side in the Even Hub WebView. If the Android APK itself deletes or clears items outside the Even Hub app, those operations are outside this WebView protection layer.
