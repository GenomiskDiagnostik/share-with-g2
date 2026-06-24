# v0.2.28 – HUD clock alignment cleanup

Built on v0.2.27.

Changes:
- Removes the padded header/time composition that could render stray dot-like artifacts at the right edge.
- Splits the HUD header into separate title and clock containers.
- Keeps the clock visually right-aligned in its own top-right container.
- Preserves the existing logo, card layout, footer guidance, and R1 semantics.

R1 semantics remain:
- Scroll = move selection
- Single tap = open
- Double tap = back/delete
