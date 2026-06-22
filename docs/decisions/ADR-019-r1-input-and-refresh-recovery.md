# ADR-019: R1 Input Normalization and Refresh Recovery

## Status

Accepted for Even Hub version 0.2.3. Supersedes ADR-017 for native-list event
interpretation and app-close behavior. Supersedes ADR-018 for inbox loading and
recovery after the immediate startup container has been created.

## Context

Physical version 0.2.2 testing showed that the R1 ring could scroll the native
list, but a single click did not open the selected entry. The host may deliver
the click separately from the list event containing the current selection.
Version 0.2.2 required the click itself to contain a `listEvent`, so system or
text clicks were ignored.

The same test also showed prolonged loading and repeated phone-side refreshes.
Startup opened separate WebSocket connections for `/health` and `/items`, and
periodic polling was enabled only if both initial requests succeeded.

## Decision

- Remember the most recent valid list name and zero-based index from every R1
  list event.
- Normalize clicks reported through list, text, or system events. In menu mode,
  a single click opens the remembered entry; in reader mode, a single click or
  double-click returns to the menu.
- Do not use menu double-click to close the app. The host-managed long press
  remains the exit path.
- Keep the immediate text startup container and checked menu rebuild from
  ADR-018.
- Load `/items` directly instead of preceding it with `/health`.
- Share one active inbox request between startup, automatic, and manual
  refreshes.
- Retry transient startup failures after 1 and 3 seconds, then continue the
  normal 10-second polling interval. Stop automatic retry on `401` until the
  pairing setting is corrected and the app is reloaded.
- Keep the existing one-request-per-connection loopback WebSocket transport and
  Android API unchanged.

## Consequences

- R1 selection and activation no longer depend on both facts arriving in the
  same callback shape.
- A late-starting Android service can recover without repeated phone actions.
- Normal startup uses one WebSocket request instead of two.
- Physical validation remains required for the host's exact R1 payload and
  timing.
