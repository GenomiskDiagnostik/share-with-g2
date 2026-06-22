# ADR-023: Timer-Free Input Navigation

## Status

Accepted for Even Hub version 0.2.7. Supersedes ADR-020's 280 ms deferred
gesture decision. Event normalization from ADR-021 and ADR-022 remains.

## Context

Physical version 0.2.6 testing showed that R1 actions could take approximately
30 seconds to execute and did not execute reliably, while native list scrolling
remained real time. The application deferred menu click handling with
`window.setTimeout(..., 280)` to distinguish click from double-click.

The Even Hub SDK proxies global browser timers through its runtime lifecycle.
On the physical host, the nominal 280 ms callback was therefore not a reliable
real-time input mechanism.

## Decision

- Execute host-classified R1 `CLICK_EVENT` and `DOUBLE_CLICK_EVENT` actions
  immediately in their bridge callback.
- Do not delay an R1 click to speculate that a later double-click may arrive.
- In the phone item picker, execute the first tap immediately. Recognize a
  second tap on the same item from monotonic wall-clock timestamps within
  350 ms; do not schedule a callback.
- Keep refresh and startup timers separate from direct input processing.
- Retain the content-free bridge event counter from ADR-022.

## Consequences

- R1 action latency no longer depends on SDK-proxied browser timers.
- Single-click has immediate accept/enter behavior, matching native scroll
  responsiveness as closely as bridge delivery permits.
- Double-click behavior depends on the host emitting its classified
  `DOUBLE_CLICK_EVENT`, which is the documented SDK contract.
