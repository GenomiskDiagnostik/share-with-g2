# ADR-008: Authenticated Inbox Mutations

## Status

Accepted. Amends the mutation hold in ADR-007.

## Context

ADR-007 added a 192-bit per-installation Bearer key for all inbox routes. The
remaining MVP gap is deleting the selected item and clearing the inbox from
Even Hub. G2 input events are compact and easy to trigger accidentally, while
the Even Hub phone WebView can present explicit labels and confirmation.

Physical packaged-WebView reachability is still unverified, but automated tests
can establish the authorization and state-transition contract before device
acceptance.

## Decision

- Implement `DELETE /items/{id}` and `DELETE /items`.
- Require the same Bearer key as protected read routes.
- Return `204` on success and `404` when a selected item no longer exists.
- Expose mutation controls only in the Even Hub phone WebView.
- Require a separate confirmation dialog for both delete-current and clear-all.
- Do not map click, scroll, double-click, or other current G2 gestures to
  destructive actions.
- Update reader state immediately after a successful mutation.
- Preserve the current reader on network/server failure.
- Return to pairing on `401`.
- Keep physical packaged-WebView mutation validation as a release gate.

## Consequences

- The complete MVP data lifecycle now exists without cloud or BLE integration.
- Accidental glasses input cannot delete data.
- A user with the paired phone WebView can permanently delete local content.
- There is no undo in v0.1; confirmation is the deliberate safety boundary.
- Concurrent deletion can return `404`; the user can reload to reconcile.
