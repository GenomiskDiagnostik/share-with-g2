# ADR-021: Protobuf Zero-Value Click Events

## Status

Accepted for Even Hub version 0.2.5. Supersedes ADR-020 only for SDK version
and click-event decoding; ADR-020's gesture state machine remains accepted.

## Context

Physical version 0.2.4 testing still received native scroll selection but no
working R1 click or double-click navigation. The official Even Hub templates
document that `CLICK_EVENT` is enum value zero. Protobuf omits zero-valued
fields on the wire, so a valid tap arrives as an existing event envelope whose
`eventType` is `undefined`.

Versions 0.2.3 and 0.2.4 discarded `undefined` event types before classifying
input. Raw `jsonData` parsing could not recover a value that was intentionally
absent from the wire format.

## Decision

- Upgrade the official Even Hub SDK from 0.0.10 to 0.0.11 and require 0.0.11 in
  package metadata.
- If a list, text, or system event envelope exists but its `eventType` is
  absent, normalize it to `CLICK_EVENT` before gesture arbitration.
- Preserve explicit scroll, double-click, lifecycle, and exit enum values.
- Retain the raw `jsonData` fallback for host payload variants.
- Cover omitted zero values separately for list, text, and system envelopes.

## Consequences

- R1 single-click is no longer lost merely because protobuf omitted its zero
  enum value.
- Double-click remains explicit enum value three and continues through the
  accept/back/delete state machine from ADR-020.
- Physical validation remains required for installed G2 firmware behavior.
