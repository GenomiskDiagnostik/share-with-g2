# ADR-007: Local API Pairing

## Status

Accepted.

## Context

The packaged Even Hub WebView origin is not yet known, so strict origin
allowlisting cannot be completed before physical-device testing. Loopback
binding limits network exposure but does not prevent another local app or web
context from attempting to read the inbox.

Mutation endpoints must not rely on CORS or loopback binding as their only
security controls.

## Decision

- Keep `GET /health` unauthenticated and free of user content.
- Require `Authorization: Bearer <access-key>` for every `/items` route.
- Generate 24 random bytes per Android installation and encode them as
  unpadded base64url.
- Store the key in Android app-private DataStore preferences.
- Let the user reveal, copy, and rotate the key in the Android app.
- Store the paired key in Even Hub WebView local storage.
- Send the key only in the Authorization header for protected routes.
- Compare presented tokens in constant time.
- Never include the key in diagnostics, logs, URLs, query strings, analytics,
  or error messages.
- Mutation safety and interaction behavior are amended by ADR-008.

## Consequences

- Wildcard CORS can remain temporarily for origin discovery without making
  inbox data unauthenticated.
- A user must complete one explicit pairing step.
- Clearing Even Hub storage or rotating the Android key requires re-pairing.
- Local storage is not hardware-backed secret storage, but it is a pragmatic
  v0.1 fit for a same-phone local integration with no cloud account.
- If the packaged runtime cannot persist local storage or send Authorization,
  a follow-up ADR is required before mutations are implemented.
