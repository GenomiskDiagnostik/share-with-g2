# v0.2.43 – Even Hub exit review fix

Built on v0.2.42.

Changes:

- Added `G2RequestExitConfirmation(bridge)` using `bridge.shutDownPageContainer(1)`.
- Root/home double-tap now calls `shutDownPageContainer(1)` so Even Hub can show its native exit confirmation.
- `G2SafeShutdown(bridge)` still uses `bridge.shutDownPageContainer(0)` only for cleanup after explicit Even Hub exit events.
- No changes to persistence, language selection, sponsor link, screen sharing, or polling behavior.

Review note:

- Listing screenshots must still be recreated manually using the latest Even Hub simulator. This package only fixes the runtime exit behavior.
