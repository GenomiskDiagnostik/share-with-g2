# ADR-012: Loopback Alias Probe

## Status

Accepted as the final local WebView transport probe.

## Context

Physical testing of version 0.1.0 showed that the Android server was running,
its self-test passed, and the foreground service remained active. Android
diagnostics recorded no request from Even Hub: neither `OPTIONS` nor `GET`
reached the socket at `127.0.0.1:8765`. The request was therefore blocked in
the Even permission/WebView layer before Android routing, CORS, or
authentication could apply.

Official Even Hub guidance states that production WebViews enforce both the
manifest network whitelist and browser CORS, and that blocked localhost APIs
need a CORS-capable backend or proxy. Before adding cloud transport, the local
probe should cover both standard loopback URL forms.

## Decision

- Use `http://localhost:8765` as the primary Even Hub API origin.
- Retain `http://127.0.0.1:8765` as a fallback only for network/timeout errors.
- Whitelist both exact origins in `app.json`.
- Do not retry HTTP or schema errors against another origin.
- Keep Android bound to IPv4 loopback and retain Bearer authentication and
  existing CORS headers.
- If physical diagnostics still record no Even Hub request, treat packaged
  WebView-to-loopback transport as disproven and design an explicit HTTPS relay
  in a superseding ADR. Do not broaden the Android server to the LAN silently.

## Consequences

- Version 0.1.1 tests the remaining documented local alias without weakening
  Android network exposure.
- A blocked primary origin can add up to one request timeout before fallback.
- A future HTTPS relay would change the privacy model and require explicit
  deployment, encryption, authentication, retention, and opt-in decisions.
