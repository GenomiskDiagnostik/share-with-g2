# ADR-014: Loopback WebSocket Probe

## Status

Accepted for version 0.1.2 physical feasibility testing.

## Context

Physical testing of versions 0.1.0 and 0.1.1 showed that Even Hub's packaged
WebView did not deliver HTTP Fetch requests to either `localhost:8765` or
`127.0.0.1:8765`. Android self-tests passed and no Even Hub request reached the
socket, so routing, CORS, and the pairing key were not the blocker.

A browser WebSocket starts with an HTTP Upgrade handshake but does not use the
Fetch CORS preflight path. It is therefore a distinct standards-based local
transport probe that can reuse the existing loopback socket without cloud,
LAN exposure, proprietary protocols, or direct BLE access.

## Decision

- Add `ws://localhost:8765/even-hub-ws` as the primary Even Hub transport and
  `ws://127.0.0.1:8765/even-hub-ws` as its network-failure fallback.
- Keep the existing HTTP aliases as a secondary fallback.
- Keep Android bound exclusively to IPv4 loopback.
- Carry the access key inside the first WebSocket JSON request. Never place it
  in the URL, query string, diagnostics, or WebSocket subprotocol.
- Route WebSocket operations through the existing local API router so endpoint
  authorization, validation, and response schemas remain unchanged.
- Support one request per WebSocket connection, bounded frame sizes, masked
  client frames, and text frames only.
- Record only the bounded WebSocket handshake metadata in Android diagnostics.
- Do not add cloud or LAN fallback if this probe is blocked.

## Consequences

- Version 0.1.2 can distinguish Fetch-policy blocking from a broader packaged
  WebView networking restriction.
- The WebSocket implementation adds a second transport adapter, but not a new
  domain API or persistence path.
- Physical success remains unproven until Android diagnostics record
  `GET /even-hub-ws` from the packaged Even Hub app.
- If no handshake reaches Android, documented Even Hub APIs provide no further
  automatic same-phone channel for an independent Android app. A user-mediated
  import flow would then be the remaining local-only option.
