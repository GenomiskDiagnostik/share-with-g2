# Send to G2 v0.2.20 – G2 homescreen UI

Changes:

- Replaced the plain text inbox menu on the glasses with a G2-optimized HUD-style homescreen.
- Uses the supplied white-only G2 logo as an image container.
- Shows previous/current/next cards with the current selection highlighted.
- R1 single tap opens the selected item.
- R1 double tap is preserved for delete/back semantics; it is no longer used as generic select on the homescreen.
- Danish and English help text are supported.
- `supported_languages` now includes both `en` and `da`.

Notes:

The homescreen uses native Even Hub text/image containers rather than a full screenshot background, so it should be sharper and more responsive on the glasses display.
