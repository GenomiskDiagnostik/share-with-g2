# ADR-006: System Language Localization

## Status

Accepted. Supersedes the single-language rollout decision in ADR-002.

## Context

The initial planning baseline used Danish as the only MVP language while
keeping strings ready for later localization. The product should instead
follow the language selected by Android or the Even Hub WebView from the first
release.

Even Hub package metadata currently accepts only a fixed language enum that
does not include Danish. This metadata limitation does not prevent the web app
from selecting Danish at runtime.

## Decision

- Ship Danish and English user-facing strings in v0.1.
- Android uses standard localized resources and follows the system or per-app
  language selection.
- Android declares `en` and `da` in its locale configuration.
- English is the Android resource fallback for unsupported system languages.
- Even Hub resolves `navigator.languages` at startup.
- Even Hub selects Danish for `da` locales and English for all other locales.
- Even Hub package metadata declares `en` because the current manifest enum has
  no `da` value; this does not change the runtime Danish UI.
- Code, API, schema, storage, and package identifiers remain English.

## Consequences

- A Danish phone or WebView receives Danish UI automatically.
- Other currently unsupported languages receive English rather than Danish.
- Additional translations can be added without changing business logic.
- Device validation must confirm which locale the packaged Even Hub WebView
  exposes.
