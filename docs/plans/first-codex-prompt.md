# First Codex Prompt

Use this prompt in Codex planning mode.

```text
You are working in the Send to G2 repository.

Before proposing any implementation, read these files:

- README.md
- AGENTS.md
- PLANS.md
- docs/product/prd.md
- docs/architecture/system-architecture.md
- docs/api/local-api.md
- docs/security/privacy-model.md
- docs/plans/implementation-roadmap.md
- docs/plans/first-25-tasks.md
- docs/decisions/ADR-001-tech-stack.md
- docs/decisions/ADR-002-i18n-strategy.md
- docs/decisions/ADR-003-execution-strategy.md

Context:

Send to G2 is a local-first Android companion app plus Even Hub G2 webapp. The Android app must appear in the Android Sharesheet as `Send to G2`, receive shared text/links, store them locally, show an Android notification preview, and expose a local API. The Even Hub app must show a glasses-friendly Shared Inbox with pagination, navigation, delete-current, and clear-all. MVP is text/link-only. No direct BLE hacking. No mandatory cloud backend.

Your task is planning-first, not implementation-first.

Produce:

1. A concise understanding of the product and architecture.
2. A phased implementation plan from repository bootstrap to end-to-end MVP.
3. A dependency map across Android, shared schema, local API, and Even Hub app.
4. The first 10 concrete implementation tasks in dependency order.
5. Files/directories you expect to create or modify.
6. Key risks, especially local API reachability from the Even Hub runtime.
7. Validation steps for each phase.
8. Test strategy for Android parser/persistence/API and Even Hub rendering/pagination.
9. Proposed updates to PLANS.md.

Constraints:

- Do not implement code yet unless explicitly asked after the plan is reviewed.
- Do not introduce cloud relay in v0.1.
- Do not add image/PDF ingestion in the first slice.
- Do not use broad `*/*` MIME support.
- Do not reverse-engineer Even BLE or private protocols.
- Keep changes small and reviewable.
- Prefer vertical slices over broad scaffolding that cannot be tested.
- Keep code/config/API names in English.
- Keep MVP user-facing strings in Danish where relevant.

Expected output format:

- Product understanding
- Phased plan
- Dependency map
- First 10 tasks
- Files to change
- Risks and mitigations
- Validation checklist
- PLANS.md update proposal
```
