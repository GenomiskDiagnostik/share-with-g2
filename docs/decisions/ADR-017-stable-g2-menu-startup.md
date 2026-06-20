# ADR-017: Stable G2 Menu Startup and Reader Return

## Status

Accepted for Even Hub version 0.2.1. Supersedes ADR-015 for initial container
creation and the reader return gesture.

## Context

Physical version 0.2.0 testing showed two navigation regressions:

- G2 remained on the startup loading text until selecting an item in the phone
  WebView triggered another render.
- Returning from a reader to the native inbox menu required a double-click,
  which the physical device did not detect reliably.

The app created a startup text container before loading the inbox and then
immediately rebuilt it as a list container. The physical runtime did not apply
that first text-to-list replacement consistently.

## Decision

- Load the local inbox before creating the first G2 page container.
- When the inbox is ready or empty, create the native inbox list directly with
  `createStartUpPageContainer`; do not create a loading text container first.
- Use a text startup container only for genuine API failure states.
- In reader mode, treat both single-click and double-click as return-to-menu.
- Keep scroll boundary events exclusively for reader page navigation.
- Keep double-click in the native list menu as the explicit app-close gesture.

## Consequences

- G2 shows a selectable inbox menu on startup without a phone-side selection.
- A single reader click provides a reliable way back to the menu.
- Initial API failure appears after the bounded connection attempt instead of
  showing an interim loading container.
- Physical validation remains required for the exact single-click event timing.
