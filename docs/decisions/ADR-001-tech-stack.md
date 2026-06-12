# ADR-001: Tech Stack

## Status

Accepted for MVP planning.

## Context

Send to G2 needs an Android share target, local storage, notification support, a local API, and an Even Hub app for G2. The MVP must be practical, local-first, testable, and avoid undocumented low-level hardware integration.

## Decision

Use:

- Android Kotlin for the companion app.
- Jetpack Compose for any Android UI.
- Room for local persistence.
- DataStore for preferences.
- Kotlin coroutines for async work.
- A small embedded local HTTP server for the Android-to-Even-Hub bridge, implementation to be selected during Phase 2.
- TypeScript + Vite for the Even Hub app.
- `@evenrealities/even_hub_sdk` for Even Hub bridge integration.
- Vitest or equivalent for Even Hub unit tests.
- JUnit/Kotlin test tooling for Android unit tests.

## Consequences

Positive:

- Uses standard Android platform features for sharing and notifications.
- Keeps the privacy model simple.
- Aligns with Even Hub’s web-app model.
- Keeps the codebase accessible to both Android and web developers.

Negative:

- Two runtimes must be tested.
- Local HTTP reachability from Even Hub WebView is uncertain.
- Android server lifecycle may require foreground-service decisions.

## Rejected options

### Direct BLE integration

Rejected for MVP. It increases risk, depends on undocumented behavior, and violates the clean-room direction.

### Cloud-first relay

Rejected for MVP. It weakens privacy and adds infrastructure before local feasibility is tested.

### Single Android-only app

Rejected because the user explicitly wants an Even Hub Shared Inbox on G2, not only notification mirroring.
