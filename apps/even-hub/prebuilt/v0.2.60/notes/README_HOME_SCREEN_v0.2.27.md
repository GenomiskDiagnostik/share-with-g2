# v0.2.27 HUD spacing and startup cursor fix

Built on v0.2.26.

Changes:
- Starts the G2 HUD on the first inbox item when inbox items exist, with Screen sharing shown to the left.
- Keeps Screen sharing reachable by scrolling left.
- Hides empty side cards by removing their border when there is no previous/next entry.
- Adds more vertical spacing between `Delt indbakke x/y` / `Shared inbox x/y` and the cards.
- Moves the card row and card text down while keeping the footer guidance visible.
- Avoids repainting the logo on ordinary cursor movement; a rebuild only occurs when side-card visibility changes.
