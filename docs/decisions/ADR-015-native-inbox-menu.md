# ADR-015: Native Inbox Menu and Reader Navigation

## Status

Accepted for Even Hub version 0.1.3.

## Context

Physical testing confirmed that version 0.1.2 reaches the Android inbox over
loopback WebSocket. The remaining usability problem is navigation on G2:

- Mapping a text-container click directly to the next item gives no visible
  selection and is unreliable in physical use.
- Updating the text container at a page boundary can reset its native scroll
  position and immediately produce the opposite boundary event, returning the
  reader to the previous page.
- Re-rendering an unchanged final page sends the user back to its top.

The documented Even Hub SDK provides a native `ListContainerProperty` with a
visible selected item and `List_ItemEvent` callbacks. This is a better fit for
choosing inbox items than cyclic click navigation in a text container.

## Decision

- Open the G2 inbox as a native list menu rather than directly in the newest
  item.
- Use list scrolling for visible item selection and list click to open the
  selected item.
- Page menus in bounded groups so each SDK list contains at most 20 entries.
- In reader mode, use scroll boundary events only for previous/next page.
- Ignore the immediate opposite boundary event after a page replacement.
- Do not update the text container when the requested page is already the
  first or final page.
- Use double-click in reader mode to return to the inbox menu.
- Keep destructive actions in the phone WebView only.
- Keep access-key entry only on the dedicated settings page.

## Consequences

- Item choice is visible before opening content.
- Slow reading at the bottom of a page no longer resets the same page or
  immediately jumps back.
- The glasses menu depends only on documented Even Hub list containers and
  events.
- Physical testing must still confirm the native list's exact click and scroll
  feel on the installed G2 firmware.
