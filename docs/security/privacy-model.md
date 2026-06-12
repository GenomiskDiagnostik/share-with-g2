# Privacy and Security Model

## Security posture

Send to G2 handles user-shared content that may include private messages, links, copied notes, email excerpts, or document snippets. Treat all stored content as sensitive.

## Data storage

- Store items locally in Room.
- Do not sync to cloud in v0.1.
- Do not log full shared text in production logs.
- Do not expose Android `content://` streams through the local API in v0.1.
- Consider an auto-expiry option in v0.2.

## Data transport

- Local HTTP API binds to `127.0.0.1` by default.
- If LAN binding becomes necessary, create a new ADR and add explicit opt-in.
- Do not use a public cloud relay without encryption, authentication, and opt-in.

## Input handling

- Treat inbound MIME type as advisory, not trusted.
- Cap maximum stored text length.
- Convert HTML to sanitized plain text.
- Normalize control characters.
- Reject empty payloads.
- Store minimal source metadata.

## G2 rendering

- Render text only in v0.1.
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
| Other local process reads API | Bind to loopback; avoid LAN; consider random token if needed |
| Malicious source app sends huge payload | Size caps and parser validation |
| HTML injection | Plain-text extraction only |
| Sensitive content in logs | No full-content logging |
| Accidental cloud exposure | No cloud dependency in v0.1 |
| Destructive G2 input misfire | Clear UI labels; consider undo/confirmation |
