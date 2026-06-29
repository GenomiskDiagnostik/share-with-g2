# v0.2.25 — HUD header/footer fix based on v0.2.23

Built directly from `send_to_g2_v0.2.23_hud_card_layout_fix.ehpk` / matching source.

Changes:
- Header is no longer an event-capture container.
- Bottom instruction/help line is restored and is the only event-capture text container on the HUD homescreen.
- The previous/selected/next card layout from v0.2.23 is preserved.
- The G2 logo HUD graphic is preserved.
- Version bumped to 0.2.25 to avoid confusion with the earlier incorrect v0.2.24 build.

R1 semantics unchanged:
- Scroll = move selection
- Single tap = open
- Double tap = back/delete semantics
