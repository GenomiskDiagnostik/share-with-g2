# v0.2.40 — Even Hub review compliance fix

Built on v0.2.39.

Changes:

- Calls `bridge.shutDownPageContainer(0)` on Even Hub exit events and before page unload.
- Replaced the demo `https://hub.evenrealities.com/docs` URL in bundled demo data with the project GitHub URL and added the docs URL to the whitelist defensively.
- Added the GitHub Sponsors URL explicitly to `network.whitelist`.
- Prevents automatic localhost `/items` polling when no local API access key has been paired. The app now shows the pairing/settings state instead.
- Prevents screen-snapshot `/health` requests when no local API access key has been paired.
- Keeps v0.2.39 language persistence and does not include the v0.2.37 blank-border experiment.
