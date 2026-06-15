# Privacy and Security Model

## Security posture

Send to G2 handles user-shared content that may include private messages, links, copied notes, email excerpts, or document snippets. Treat all stored content as sensitive.

## Data storage

- Store items locally in Room.
- Store screen snapshots in memory only; do not persist them in Room in the
  first snapshot slice.
- Do not sync to cloud in v0.1.
- Do not log full shared text in production logs.
- Do not expose Android `content://` streams through the local API in v0.1.
- Consider an auto-expiry option in v0.2.

## Data transport

- Local HTTP API binds to `127.0.0.1` by default.
- `/health` is public and contains no inbox data.
- All `/items` reads require a random per-installation Bearer key.
- Wildcard CORS is temporary for Even Hub WebView feasibility measurement.
- The key is stored in Android app-private DataStore and Even Hub local storage.
- Key rotation invalidates the previous Even Hub pairing.
- Delete/clear require the same Bearer key as reads and a separate phone-side
  confirmation. Packaged WebView validation remains a release gate.
- Read/unread updates require the same Bearer key as reads but are
  non-destructive and do not require confirmation.
- Screen snapshots require Android MediaProjection consent and the same Bearer
  key before Even Hub can fetch the latest snapshot.
- Local API diagnostics retain only bounded method, path, client marker,
  origin, user-agent, loopback address, timestamp, and request count in memory.
- Never include query strings, request bodies, response bodies, or shared item
  content in diagnostics.
- If LAN binding becomes necessary, create a new ADR and add explicit opt-in.
- Do not use a public cloud relay without encryption, authentication, and opt-in.

## Input handling

- Treat inbound MIME type as advisory, not trusted.
- Cap maximum stored text length.
- Convert HTML to sanitized plain text.
- Normalize control characters.
- Reject empty payloads.
- Store minimal source metadata.
- Fetch shared links without cookies, referrer, or the user's browser session.
- Reject link extraction for loopback, link-local, private-network,
  credential-bearing, and non-HTTP(S) destinations.
- Limit linked-page responses, redirects, and network timeouts.

## Linked-page retrieval

When a user explicitly shares a public link, Android may contact that website
directly to create a readable local copy. This reveals the phone's network
address and the `SendToG2/0.1` user agent to the destination, as any direct page
request would. No Send to G2 cloud service is involved.

The fetch does not reuse browser or ChatGPT cookies. Private conversations,
login-protected pages, anti-bot challenges, and pages whose content exists only
after JavaScript execution therefore remain URL-only.

## G2 rendering

- Render text only in v0.1.
- Render a single screen snapshot only in the explicit snapshot mode.
- Escape/sanitize any content before UI insertion.
- Do not render raw HTML.
- Avoid showing full secrets in notifications; previews should be capped.

## Notifications

- Notifications may be mirrored to glasses depending on Even app/user settings.
- Preview length must be short.
- Add settings later for disabling notification previews if needed.

## Threats and mitigations

| Threat | Mitigation |
|---|---|
| Other local process reads API | Bind to loopback; require a 192-bit per-installation access key for inbox routes |
| Browser page reads API through wildcard CORS | Require Bearer authorization; never put the key in URLs; continue measuring the WebView origin |
| Access key is copied or exposed | Keep it out of logs and diagnostics; let the user rotate it from Android |
| Malicious source app sends huge payload | Size caps and parser validation |
| Shared URL targets a local service | Public-address checks on every redirect |
| Linked page returns a huge response | 1 MiB response cap and 64 KiB stored-text cap |
| HTML injection | Plain-text extraction only |
| Sensitive content in logs | No full-content logging |
| Diagnostics expose shared content | Record bounded transport metadata only, in memory |
| Accidental cloud exposure | No cloud dependency in v0.1 |
| Destructive G2 input misfire | G2 gestures cannot mutate; phone WebView requires explicit confirmation |
| Read-state drift between surfaces | Even Hub periodically refreshes from Android, which remains the source of truth |
| Accidental ongoing screen capture | Capture one snapshot per system-consented session; foreground service stops after one frame or timeout |
| Screen snapshot persists sensitive content | Keep snapshots in memory only and provide a clear action in Android |
