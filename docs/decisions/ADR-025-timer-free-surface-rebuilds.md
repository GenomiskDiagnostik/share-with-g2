# ADR-025: Timer-Free Surface Rebuilds

## Status

Accepted for Even Hub version 0.2.9. Extends ADR-023's timer-free input rule to
the surface transition triggered by an input action.

## Context

Physical testing reported that double-click could sometimes react around 30
seconds after an item had been opened from the phone. Input dispatch itself was
timer-free in version 0.2.8, but returning from a text reader to the native menu
called `rebuildWithRetry()` with 400 and 800 ms `setTimeout` delays after a
failed rebuild. Startup also waited 600 ms through the same proxied global
timer mechanism before its first text-to-list transition.

The Even Hub runtime proxies global browser timers. A nominal sub-second delay
can therefore become a much longer host lifecycle delay.

## Decision

- Remove the 600 ms startup menu settle timer.
- Retry a failed menu rebuild up to three times immediately after each bridge
  result, with no scheduled delay.
- Keep the existing visible text fallback if every immediate attempt fails.
- Do not change native list geometry, event capture, selection, or scroll
  handling.
- Keep periodic network and screen-sharing scheduling separate from direct
  input-to-surface transitions.

## Consequences

- A received click/double-click can no longer enter a 30-second timer wait
  while changing between list and text surfaces.
- Failed rebuilds fail visibly and quickly instead of appearing as delayed
  input.
- Native scrolling remains unchanged and firmware-controlled.
