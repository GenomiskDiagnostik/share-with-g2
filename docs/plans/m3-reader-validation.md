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
- `send-to-g2.ehpk` is non-empty.

## Browser Or Simulator Demo

1. Start `npm run dev`.
2. Open `http://127.0.0.1:5173/?demo=1`.
3. Confirm the long first item has multiple pages.
4. Move forward and backward through pages.
5. Move to the link item and back to the long item.
6. Confirm item changes reset the page to page one.
7. Confirm controls disable when an item has only one page.
8. Run once with a Danish locale and once with a non-Danish locale.
9. Open without demo mode while the Android API is stopped.
10. Confirm the localized error state offers a working retry action.

## Live Read-Only Flow

1. Start the Android companion app.
2. Share at least two text/link items.
3. Open the Even Hub app without `?demo=1`.
4. Confirm newest-first ordering.
5. Confirm long content paginates.
6. Confirm click advances items and scroll changes pages on G2.
7. Confirm double-click shows the SDK exit interaction.

Do not enable delete or clear-all during this validation. Those actions remain
blocked until loopback origin or local authorization behavior is documented.
