# ADR-022: Raw Bridge Events and Input Diagnostics

## Status

Accepted for Even Hub version 0.2.6. Supersedes ADR-021 for bridge callback
normalization; ADR-020 and ADR-021 gesture and protobuf-zero rules remain.

## Context

Physical version 0.2.5 still did not react to R1 click or double-click. The SDK
exports `evenHubEventFromJson()` because host callbacks can use raw envelopes
such as `{ type: "sysEvent", jsonData: {} }`. The bridge callback can expose
that raw detail directly, while the application handled only already-typed
`sysEvent`, `listEvent`, and `textEvent` properties.

Without bounded diagnostics, a physical failure could not distinguish an
absent host event from an event rejected by application routing.

## Decision

- Preserve callbacks that already contain typed list, text, or system event
  properties.
- Parse every other callback through the official SDK
  `evenHubEventFromJson()` function before R1 classification.
- Apply protobuf-zero click decoding after envelope normalization.
- Display a content-free diagnostic in the phone view after the first event:
  event count, normalized event kind, and `typed` or `raw` source.
- Never include selected item names, shared text, access keys, or raw payloads
  in this diagnostic.

## Consequences

- Raw host envelopes participate in the same accept/back/delete state machine
  as typed callbacks.
- Physical testing can now prove whether JavaScript receives any R1 input.
- If the counter remains absent while scrolling still works natively, the
  blocker is host event delivery rather than application event decoding.
