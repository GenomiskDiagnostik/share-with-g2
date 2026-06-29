# v0.2.59 - no read on menu focus + rebuild home cards

Base: v0.2.58.

Changes:

- R1/list focus-selection events in the home/menu are treated as focus movement only.
- Merely moving the focused card in the main menu no longer opens the item and no longer marks it as read.
- Items are still marked read when they are actually opened with click/tap.
- Home/menu card focus changes now rebuild the home container instead of text-upgrading the card text in place, to avoid Even Hub internally scrolling/re-centering the title text.

Not changed:

- Pinning/protected item behavior.
- Reader pagination.
- Screen sharing.
- Android API.
- Connection/polling logic.
