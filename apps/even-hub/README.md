# Even Hub Shared Inbox App

This directory is reserved for the Even Hub G2 app.

## Responsibilities

- Connect to Even Hub bridge.
- Fetch local shared items from Android companion API.
- Render a Shared Inbox optimized for 576 × 288 display constraints.
- Paginate long text.
- Support navigation, delete current, and clear all.

## Suggested stack

- TypeScript
- Vite
- `@evenrealities/even_hub_sdk`
- Vitest for logic tests

## First scaffold recommendation

Start from the official/minimal Even Hub template, then add only the reader state machine and API client. Use text-heavy pagination behavior as the model for long content.

## First implementation target

1. Hardcoded mocked item renders on simulator.
2. Empty state renders.
3. Pagination works.
4. Fetch `GET /health` and document if it works from simulator/real runtime.
5. Fetch `GET /items` once transport is proven.
