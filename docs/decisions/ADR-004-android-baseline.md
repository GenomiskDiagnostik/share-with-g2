# ADR-004: Android Implementation Baseline

## Status

Accepted for the v0.1 Android inbound-share slice.

## Context

The repository needed concrete package identifiers, supported Android versions,
input limits, HTML behavior, and a reproducible build baseline before feature
implementation.

## Decision

- Android application ID and Kotlin package:
  `io.github.genomiskdiagnostik.sendtog2`.
- Minimum SDK: 26.
- Compile and target SDK: 36.
- JDK 17, Gradle 8.13, Android Gradle Plugin 8.13.2, and Kotlin 2.3.21.
- Compose BOM 2026.05.01 and Room 2.8.4 with KSP 2.3.9.
- Maximum stored text: 65,536 characters.
- Maximum generated title: 80 characters.
- Maximum notification preview: 160 characters.
- HTML shares are flattened to plain text before parsing and persistence.
- A share is saved immediately. The local inbox provides explicit delete and
  clear-all controls.
- GitHub Actions is the authoritative artifact build. A matching minimal local
  JDK/Android SDK setup is also supported.

## Consequences

- Android 8.0 and newer are supported.
- Text payloads have a deterministic memory/storage bound.
- Raw HTML cannot reach Room, notifications, or the future local API.
- The app does not offer a confirmation editor in the first slice.
- Versions newer than this baseline are adopted only when their compile SDK
  and Android Gradle Plugin requirements are compatible.
