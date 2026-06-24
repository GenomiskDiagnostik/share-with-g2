# Send to G2 v0.2.12 — R1 direct text navigation

This build replaces the glasses inbox menu navigation with a direct text-container navigation model inspired by working Even Hub examples that visualize tap/double-tap/scroll input in real time.

Changes:
- Snapshot/home screen: R1 single click now opens the inbox instead of refreshing the snapshot.
- Snapshot/home screen: R1 double click also opens the inbox; long/system exit remains handled by Even Hub.
- Inbox menu: no longer depends on the G2 list container for selection/opening.
- Inbox menu is rendered as a text container with `isEventCapture: 1`.
- R1 scroll updates a local menu cursor and re-renders the text menu immediately.
- R1 single click opens the selected menu entry.
- R1 double click invokes the secondary action for the selected entry where relevant.
- Reader view still uses scroll for pages and double click for back.

Why:
The previous list-container based implementation could scroll visually, but click/double-click events were not routed reliably. This version avoids the fragile list-selection event path and uses the same low-level event stream used by simpler working G2 demos.
