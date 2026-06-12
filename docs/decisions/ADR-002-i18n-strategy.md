# ADR-002: i18n Strategy

## Status

Accepted for MVP planning.

## Context

The initial user-facing product is intended for a Danish-speaking user, while code, APIs, and developer-facing identifiers should remain English for maintainability.

## Decision

- Default MVP user-facing language: Danish.
- Code identifiers, package names, API routes, DTO fields, database fields, and config names: English.
- Android strings must be placed in string resources.
- Even Hub strings must be centralized in a small i18n/string module, even if only Danish exists initially.
- English can be added later without changing business logic.

## Initial Danish strings

- App/share label: `Send to G2`
- Notification title: `Delt til G2`
- Empty inbox: `Ingen delte elementer endnu.`
- Delete current: `Slet aktuelt element`
- Clear all: `Ryd alt`
- API unavailable: `Kan ikke forbinde til telefonens lokale inbox.`

## Consequences

Positive:

- Keeps MVP aligned with the target user.
- Avoids mixing Danish into code/API contracts.
- Enables later English localization.

Negative:

- Adds minor structure earlier than a hardcoded prototype would need.
