# ADR-024: Native List Event Routing

## Status

Accepted for Even Hub version 0.2.8. Supersedes the generic menu-event routing
in ADR-020 through ADR-023. Reader text/system routing remains unchanged.

## Context

Physical version 0.2.7 still did not provide reliable native-list activation.
Research of working Even Hub projects found a consistent pattern:

- `opinsky/hackernews-hud` handles `listEvent` before text/system events and
  immediately opens `currentSelectItemIndex`. Its source explicitly states
  that firmware handles list navigation and a single press fires `listEvent`.
- `bigdra50/eveng2-demo` accepts a list event when its type is `CLICK_EVENT` or
  omitted, and ignores all other list event types.
- `Niwri/novel-reader-g2` maps `listEvent` first; its `even-toolkit` action map
  treats a missing event type as `SELECT_HIGHLIGHTED` and explicit scroll as
  highlight movement.

The application instead passed list events through a generic cross-source
classifier before menu activation. That added envelope, timer, and source
heuristics before the native list's own selection contract.

## Decision

- Route a normalized `listEvent` before all generic R1 handling while the
  native menu is active.
- Treat list `CLICK_EVENT` and an omitted event type as immediate acceptance of
  `currentSelectItemName` or `currentSelectItemIndex`.
- Treat an explicit list `DOUBLE_CLICK_EVENT` as the menu double action.
- Ignore explicit list scroll event types in JavaScript; firmware remains the
  owner of native selection movement.
- Serialize bridge actions with a simple in-flight guard, without timers.
- Keep text/system event handling for reader, confirmation, lifecycle, and
  fallback text surfaces.

## Consequences

- Native selection and activation now follow the same event priority used by
  multiple working projects.
- The working native scroll path is not modified or duplicated.
- Physical validation remains necessary because the host firmware owns event
  emission.

## Reference implementations

- https://github.com/opinsky/hackernews-hud/blob/d3d98c7aa85bf2fab3d10ced26f229135f3d3a18/src/main.ts
- https://github.com/bigdra50/eveng2-demo/blob/5d77b34da2e4eb4182742d34b012eb1ff4227ab6/src/pages/list.ts
- https://github.com/fabioglimb/even-toolkit/blob/3c5cc372094abaae5cf35a469e4c2fde05997281/glasses/action-map.ts
