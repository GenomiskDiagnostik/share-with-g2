# ADR-026: Dynamic Link Sources

## Status

Accepted for the Android dynamic link source slice and local API version 0.2.2.

## Context

The product needs user-defined dynamic entries that can pull a specific box or
section from a public web page and expose the latest extracted text in the Even
Hub inbox. This must preserve the local-first MVP model: Android owns
persistence, Even Hub reads sanitized text through the local API, and no cloud
relay is required.

Many modern sites render important content with JavaScript or behind login
state. Supporting that would require browser automation, cookies, site-specific
APIs, RSS adapters, or a remote fetch service. Those choices would expand the
privacy and security model beyond the current MVP.

## Decision

- Add a Room-backed `DynamicSource` model owned by Android.
- Fetch only public HTTP(S) static HTML in the first slice.
- Use a user-provided CSS selector to extract the first matching DOM node.
- Strip executable and embedded markup, normalize the selected node to plain
  text, and cap it with the existing text limits.
- Compute a stable SHA-256 fingerprint from the extracted text.
- Upsert one current generated `SharedItem` per source with
  `origin = "dynamic"`, `dynamicSourceId`, and `dynamicFingerprint`.
- Keep the source when the generated inbox item is deleted; the next successful
  refresh may recreate the item.
- Schedule periodic refreshes with WorkManager and coerce intervals to at least
  15 minutes.
- Provide a manual refresh action for immediate testing.
- Do not use login cookies, browser sessions, JavaScript rendering, headless
  browsers, private-network targets, or cloud fetchers in this slice.

## Consequences

- Static pages and server-rendered sections work with CSS selectors.
- JavaScript-rendered, login-protected, anti-bot, or session-specific content
  may fail until a later RSS/API/headless-browser design is accepted.
- Dynamic fetches reveal the phone's network address and `SendToG2/0.1` user
  agent to configured destination sites.
- Even Hub can render dynamic items with a dot marker while Android remains the
  source of truth for subscription management.
