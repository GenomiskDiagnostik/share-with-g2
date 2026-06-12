# AGENTS.md

## Mission

Build Send to G2 as a local-first Android companion app plus Even Hub G2 Shared Inbox. The product must let a user share text or links from Android into a local phone inbox and read that inbox on Even Realities G2 glasses without cloud dependency in the MVP.

## Non-negotiable product rules

- MVP is text/link-first.
- Android Sharesheet support is required.
- Local persistence is required.
- Android notification preview is required.
- Even Hub reader/inbox is required.
- Single-item delete and clear-all are required.
- No direct BLE hacking or proprietary protocol reverse engineering.
- No mandatory cloud backend in v0.1.
- No broad `*/*` share target unless the app actually supports safe handling of all inbound data.
- No silent upload of shared content.

## Working style

- Read `README.md`, `PLANS.md`, PRD, architecture docs, roadmap, and ADRs before acting.
- Plan before implementing.
- Update `PLANS.md` when scope, milestones, risks, or task state changes.
- Prefer small vertical slices.
- Avoid giant rewrites.
- Keep code/config/API identifiers in English.
- Keep user-facing strings aligned with the product language policy.
- Make assumptions explicit in docs and pull requests.

## Clean-room rule

Use public Android APIs, documented Even Hub APIs/templates, and original implementation. Do not clone proprietary Even app behavior, intercept private BLE traffic, or depend on undocumented internals for the MVP.

## UX rules

- The Android share flow must complete quickly and predictably.
- Shared content must be confirmable/editable before final save if implementation complexity permits; otherwise save immediately and provide an undo/delete path.
- The G2 UI must prioritize readability over density.
- Long content must be paginated.
- Destructive actions must be intentional; double-tap delete is acceptable only with clear on-screen feedback and undo if feasible.
- Empty states must be explicit.
- Offline/local status should be visible in settings or diagnostics.

## Architecture rules

- Android app owns persistence.
- Room is the source of truth for shared items.
- DataStore is for preferences only.
- Local API must bind to `127.0.0.1` by default.
- Local API must not expose arbitrary files.
- G2 app must treat the local API as untrusted input and render sanitized text only.
- Shared schema changes require an ADR update or a documented migration note.
- Do not add cloud fallback until localhost/WebView feasibility has been tested and documented.

## Localization rules

- Default end-user language for MVP: Danish.
- Code, package names, API names, and storage field names remain English.
- Initial user-facing strings include:
  - App/share label: `Send to G2`
  - Notification title: `Delt til G2`
  - Empty inbox: `Ingen delte elementer endnu.`
  - Delete current: `Slet aktuelt element`
  - Clear all: `Ryd alt`
- Prepare string resources so English can be added later without rewriting UI code.

## Testing rules

Android:

- Unit-test URL detection, title generation, MIME parsing, and repository operations.
- Instrument share receiver flows for `text/plain`, `text/html`, and invalid/empty shares.
- Test notification creation behind Android notification permission gates.
- Test local API endpoints with repository fakes.

Even Hub:

- Unit-test pagination, rendering state, navigation state, and API client behavior.
- Simulator-test empty inbox, list navigation, item reading, delete, clear-all, and API failure states.
- Avoid physical-device-only acceptance criteria for early slices.

Security/privacy:

- Test that local API binds only to loopback unless explicitly configured otherwise.
- Test max text length and truncation behavior.
- Test HTML sanitization/plain-text extraction.

## Change-control rules

- Any of the following require updating docs before or with code:
  - transport change
  - schema change
  - cloud relay introduction
  - non-text content support
  - destructive action behavior
  - notification behavior
  - privacy/security model
- ADRs are append-only after acceptance. Supersede rather than rewriting history.

## Expected output format for Codex

For planning tasks, respond with:

1. Summary of repository understanding.
2. Proposed phased plan.
3. Dependency map.
4. Risks and mitigations.
5. Files expected to change.
6. First small implementation slice.
7. Validation checklist.
8. Required updates to `PLANS.md`.

For implementation tasks, respond with:

1. What changed.
2. Why it changed.
3. Tests run or not run.
4. Remaining risks.
5. Next recommended task.
