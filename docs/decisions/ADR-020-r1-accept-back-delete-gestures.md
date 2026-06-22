# ADR-020: R1 Accept, Back, and Delete Gestures

## Status

Accepted for Even Hub version 0.2.4. Supersedes ADR-019 for input payload
normalization and click/double-click behavior.

## Context

Physical version 0.2.3 testing showed that native list scrolling still worked,
but click and double-click did not navigate in either the G2 surface or the
Even Hub phone view. The SDK can expose the event only through its raw
`jsonData` fallback, while version 0.2.3 inspected only normalized list, text,
and system fields. The phone picker also rerendered after its first click, so a
browser double-click could not reliably reach the original element.

## Decision

- Normalize event type, selected name, and selected index from both typed SDK
  fields and recursively bounded `jsonData` objects. Accept numeric and named
  SDK enum values and the documented key naming variants.
- In the native inbox menu, resolve R1 click versus double-click within a
  280 ms window, then accept/open the selected entry on a single-click.
- R1 double-click on a selected inbox item opens a delete confirmation. It does
  not delete immediately.
- In delete confirmation, single-click confirms deletion and double-click
  cancels back to the menu.
- In the reader, double-click returns to the menu. Scroll remains page
  navigation and single-click has no destructive meaning.
- Leave long-press app exit and its confirmation to the Even Hub host.
- On the phone item picker, use the same 280 ms decision window. A second tap
  on the same item opens the existing delete confirmation.
- Keep all destructive API calls authenticated and retain the Android Room
  database as source of truth.

## Consequences

- The G2 and phone surfaces share the same accept-versus-delete intent without
  depending on a browser `dblclick` after rerender.
- Accidental double-click cannot delete content without an additional explicit
  single-click confirmation.
- Physical testing remains required because the host controls R1 event
  delivery and long-press exit confirmation.
