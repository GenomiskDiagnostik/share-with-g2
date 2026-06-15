# M3 Reader Validation

## Automated

Run from `apps/even-hub`:

```bash
npm ci
npm test
npm run build
npm run pack
```

Expected:

- API responses reject unsupported item types and malformed fields.
- Pagination preserves content and prefers paragraph or word boundaries.
- Page navigation clamps at the first and last page.
- Item navigation wraps and resets to page one.
- Loading, empty, error, and ready states render in Danish and English.
- G2 text never exceeds the 1,000-character startup limit.
- Refresh preserves the current item and page when the item still exists.
- Read/unread changes update the selected item only.
- `send-to-g2.ehpk` is non-empty.

## Browser Or Simulator Demo

1. Start `npm run dev`.
2. Open `http://127.0.0.1:5173/?demo=1`.
3. Confirm the long first item has multiple pages.
4. Move forward and backward through pages.
5. Move to the link item and back to the long item.
6. Confirm item changes reset the page to page one.
7. Confirm controls disable when an item has only one page.
8. Mark the current item read and unread, and confirm the metadata/button text
   changes.
9. Use Refresh and confirm the current item remains selected.
10. Run once with a Danish locale and once with a non-Danish locale.
11. Open without demo mode while the Android API is stopped.
12. Confirm the localized error state offers a working retry action.

## Live Flow

1. Start the Android companion app.
2. Share at least two text/link items.
3. Open the Even Hub app without `?demo=1`.
4. Confirm newest-first ordering.
5. Confirm long content paginates.
6. Confirm click advances items and scroll changes pages on G2.
7. Confirm double-click shows the SDK exit interaction.
8. In the phone WebView, choose delete-current and cancel the confirmation.
9. Repeat, confirm deletion, and verify only the selected item disappears from
   Android and Even Hub.
10. Choose clear-all, cancel once, then confirm and verify both surfaces become
    empty.
11. Rotate the Android access key and confirm a mutation returns to pairing.
12. Mark an item read and unread from Even Hub and confirm Android shows the
    same state.
13. Share a new item while Even Hub is open and confirm the reader refreshes
    without restarting the app.
14. Confirm no G2 click, scroll, or double-click gesture opens a destructive
    confirmation or mutates the inbox.

Do not treat mutations as release-ready until the packaged WebView completes
the authenticated validation above.
