# Send to G2 v0.2.49 — final deterministic gesture routing

Base: latest non-demo line, with v0.2.45–v0.2.48 long-press/delete hijack removed.

Gesture design:
- Menu starts on Screen sharing.
- Menu + Screen sharing selected + double-click: Even Hub exit confirmation via `bridge.shutDownPageContainer(1)`.
- Menu + inbox item selected + click: open item.
- Menu + inbox item selected + double-click: ask before deleting that item.
- Reader/item view + click: next text page.
- Reader/item view + click on the last page: ask before deleting the item.
- Reader/item view + double-click: back to menu.
- Reader/item view + long-press: system default exit behavior; the app does not bind long-press to delete.
- Delete confirmation: click confirms deletion; double-click cancels.

Validation:
- `node --check dist/assets/index-DGiErpkq.js`
- Even Hub CLI pack
