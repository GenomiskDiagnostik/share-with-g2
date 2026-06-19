# ADR-013: Encrypted HTTPS Relay Proposal

## Status

Proposed. Deployment and retention choices require explicit approval before
implementation.

## Context

Physical testing has now disproven both packaged Even Hub loopback variants:

- Version 0.1.0 could not reach `http://127.0.0.1:8765`.
- Version 0.1.1 could not reach either `http://localhost:8765` or the numeric
  fallback.
- In both tests the Android self-test passed and the foreground service stayed
  active.
- Android diagnostics recorded no Even Hub `OPTIONS` or `GET` request.
- Version 0.1.1 allowed the pairing key to be stored in Even Hub, but this did
  not change transport reachability.

The failure is therefore before Android routing, CORS, and Bearer
authorization. The documented production-compatible route is an HTTPS API
whose origin is listed in the Even Hub manifest and which returns valid CORS
headers.

## Proposed Decision

- Introduce the relay as version `0.2.0`, not as a silent change to local-only
  version 0.1.x.
- Keep Room as the Android source of truth.
- Require an explicit Android opt-in with clear Danish disclosure before any
  shared content leaves the phone.
- Encrypt inbox payloads on Android before upload and decrypt them inside Even
  Hub. The relay stores opaque authenticated ciphertext only.
- Derive separate encryption and channel-identification material from the
  existing 192-bit pairing key using standard cryptographic derivation.
- Use a random, non-enumerable channel identifier. Do not put plaintext, titles,
  URLs, or the pairing key in paths, logs, analytics, or error responses.
- Authenticate ciphertext with AES-GCM and reject modified envelopes in Even
  Hub before rendering.
- Cap payload size, apply a short server-side expiry, and support explicit
  remote clear from Android.
- Keep the local API for Android diagnostics and future runtimes where loopback
  is supported; Even Hub should use HTTPS relay only when the user enables it.
- Do not bind the Android server to LAN interfaces and do not add direct BLE.

## Deployment Decision Required

Implementation requires one concrete HTTPS deployment target and answers to:

- Who owns and pays for the endpoint?
- Which domain/origin is added to `app.json`?
- Which storage primitive is used?
- What is the maximum retention period for inactive ciphertext?
- Is the relay for one private installation or intended for multiple users?

A small Cloudflare Worker with encrypted-value storage is a candidate, but it
must not be hard-coded or deployed under an account without explicit approval.

## Consequences

- Even Hub can use a browser-supported HTTPS origin instead of blocked local
  HTTP.
- The product is no longer strictly local-only while relay mode is enabled,
  even though the relay cannot read properly encrypted content.
- Availability depends on internet access and the selected hosting provider.
- Cryptographic envelope, migration, retention, failure, and deletion behavior
  require focused tests and a security review before release.
