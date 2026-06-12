# ADR-003: Execution Strategy

## Status

Accepted for MVP planning.

## Context

The product spans Android platform integrations, local persistence, local networking, and an Even Hub constrained-display app. The main technical risk is not basic implementation but cross-runtime reachability and interaction reliability.

## Decision

Execute in small, reviewable vertical slices:

1. Android parser/persistence/notification.
2. Local API health/items endpoint.
3. Even Hub API reachability probe.
4. Even Hub mocked reader.
5. Even Hub live reader.
6. Deletion/clear mutations.
7. Hardening and diagnostics.

Do not implement image/PDF/cloud features before the text/link MVP works end-to-end.

## Consequences

Positive:

- Validates the riskiest integration early.
- Avoids building a polished Android app around a broken transport assumption.
- Keeps review load manageable.

Negative:

- Some UI polish is delayed.
- Requires discipline to resist “just add PDF while we are here” syndrome. The compiler may allow it; the product plan should not.

## Validation gates

- Gate 1: text share can be received and stored.
- Gate 2: notification preview works with permission granted.
- Gate 3: local API returns stored items.
- Gate 4: Even Hub runtime can reach the API or a fallback ADR is created.
- Gate 5: Shared Inbox displays and paginates real items.
- Gate 6: delete and clear-all work safely.
