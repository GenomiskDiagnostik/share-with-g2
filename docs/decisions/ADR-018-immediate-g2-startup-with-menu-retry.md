# ADR-018: Immediate G2 Startup With Menu Retry

## Status

Accepted for Even Hub version 0.2.2. Supersedes ADR-017 for startup timing;
ADR-017's reader return gesture remains accepted.

## Context

Physical version 0.2.1 testing showed a blank G2 surface. That version delayed
the mandatory first `createStartUpPageContainer` call until after the local
health and inbox requests completed. Although the SDK documents list containers
for startup, the physical host requires the first startup call promptly during
launch.

Version 0.2.0 created a text startup immediately, but its immediate
text-to-list rebuild could remain on the loading text until a later phone action
triggered another render.

## Decision

- Create the known working loading text container immediately after the bridge
  becomes available and check the returned startup status.
- Bind G2 events before loading the local inbox.
- Wait for a short startup settle period before replacing the text surface with
  the native inbox menu.
- Check every `rebuildPageContainer` result and retry failed menu rebuilds with
  bounded delays.
- If all automatic rebuild attempts fail, keep the text surface visible with a
  message that a single click retries the menu.
- In menu mode, accept a click from that text fallback as an explicit rebuild
  retry.

## Consequences

- G2 no longer depends on local API latency to receive its required startup
  container.
- Normal startup still changes automatically from loading text to the native
  inbox menu.
- A failed list rebuild remains visible and recoverable instead of blank or
  permanently loading.
- Physical validation remains required because simulator tests cannot reproduce
  host startup timing.
