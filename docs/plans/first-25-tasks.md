# First 25 Engineering Tasks

1. Create repository with this starter pack.
2. Confirm package IDs: Android app ID and Even Hub package ID.
3. Add Android project scaffold under `apps/android`.
4. Set Android min/target SDK and Kotlin/Gradle versions.
5. Add Android app icon/name placeholders.
6. Add `ShareReceiverActivity` with text-only intent filters.
7. Implement `SharedItem` domain model.
8. Implement `ShareParser` for `ACTION_SEND` + `EXTRA_TEXT`.
9. Implement URL detection and title generation.
10. Add unit tests for parser edge cases.
11. Add Room entity, DAO, and database.
12. Add repository abstraction over DAO.
13. Add repository tests with in-memory database.
14. Wire `ShareReceiverActivity` to repository insert.
15. Add notification channel and notification preview service.
16. Add Android notification permission handling path.
17. Add minimal Android debug/main screen listing latest items.
18. Add local API server dependency and wrapper.
19. Implement `GET /health`.
20. Implement `GET /items`.
21. Add local API tests.
22. Scaffold Even Hub Vite/TypeScript app under `apps/even-hub`.
23. Add typed `SharedItem` model and API client.
24. Implement Even Hub mock-rendered empty state and one-item state.
25. Test whether Even Hub runtime can fetch Android local API and update `PLANS.md` with the result.
