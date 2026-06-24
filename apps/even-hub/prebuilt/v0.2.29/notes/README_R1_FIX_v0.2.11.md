# Send to G2 v0.2.11 R1 raw event fix

This build fixes a likely raw-event routing issue: some Even Hub / R1 events can arrive as top-level raw objects with `eventType` rather than as `{ textEvent | listEvent | sysEvent }`. The previous parser dropped top-level `eventType`, which would make scroll/exit appear to work while click/double-click did not reach app logic.

Changes:
- Preserves top-level raw event payloads as `jsonData`.
- Converts top-level `eventType` / `event` into `sysEvent` or `listEvent`.
- Treats raw ring/touch/tap payloads without eventType as CLICK_EVENT fallback, matching the known `CLICK_EVENT = 0` / undefined quirk.
- Keeps previous selected-index fallbacks.

Test:
1. Open main inbox/menu on glasses.
2. Scroll with R1.
3. Single tap should open selected inbox item immediately.
4. Double tap inside reader should return immediately.
5. Long press/system exit should remain unchanged.
