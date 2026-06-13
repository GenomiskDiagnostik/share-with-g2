# ADR-005: Local API Feasibility Slice

## Status

Accepted for M2 feasibility testing.

## Context

The Even Hub plugin runs as a web app inside the Even Realities phone app. The
official networking documentation requires both an `app.json` origin whitelist
and normal browser CORS handling. Whether that WebView can address another app's
loopback server on the same Android phone must still be measured on device.

The inbox contains potentially sensitive text. Mutation endpoints and broader
network exposure would increase the risk before the transport is proven.

## Decision

- Bind the Android server explicitly to `127.0.0.1:8765`.
- Implement only `GET /health`, `GET /items`, and `OPTIONS` in M2.
- Start the server with the Android application process and stop it with that
  process. Do not add a foreground service yet.
- Use a small bounded HTTP/1.1 server built on `ServerSocket`; do not include a
  file server, body parser, uploads, or arbitrary routes.
- Return `Access-Control-Allow-Origin: *` for this read-only feasibility slice,
  as recommended by the Even Hub networking guide when the WebView origin is
  not yet known.
- Treat wildcard CORS as temporary. Record the packaged WebView origin and
  revisit authentication/origin restrictions before enabling deletes.
- Use package ID
  `io.github.genomiskdiagnostik.sendtog2.sharedinbox` for the Even Hub app.
- Mark Even Hub requests with `X-Send-To-G2-Client: even-hub` and allow that
  header in CORS preflight.
- Keep bounded in-memory diagnostics for request count, method, path, origin,
  user-agent, client marker, timestamp, and loopback address.
- Add Android loopback self-test and manual server restart controls.

## Consequences

- The Android process must be alive for the probe to work and may be killed by
  the operating system.
- A local web page can read the API while the process is alive because M2 uses
  wildcard CORS. The slice is therefore read-only and not release-ready.
- Physical-device testing decides whether M3 can continue with loopback or
  needs a new transport ADR.
- No cloud relay, LAN binding, file ingestion, or private Even protocol is
  introduced.
- Restart support improves recovery within the same application process but
  does not solve Android process eviction.

## Validation

- JVM tests cover route output, rejected methods, loopback-only binding, and an
  actual HTTP health request.
- Even Hub tests cover response validation and stable reachability states.
- GitHub Actions builds Android APKs and an Even Hub `.ehpk` artifact.
- Manual device validation records loopback reachability, cleartext behavior,
  WebView origin, and Android process lifetime.
- Unit tests cover restart, self-test, CORS client header, and metadata capture
  through a real loopback socket.
