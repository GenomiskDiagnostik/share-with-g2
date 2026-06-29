# v0.2.57 - Card no-scroll and reader double-click fix

Base: v0.2.56.

Changes only in G2 interaction/rendering:

- Home/menu card text is now a short single-line label, so the small boxes do not scroll internally when focus moves with the R1 ring.
- Reader double-click is protected from the preceding click event: delete-on-last-page is delayed briefly and cancelled if the double-click arrives.
- Pinned-delete-blocked message now force-restores the previous glasses mode after the short message instead of being able to stay frozen.

No change to Android API, polling, pin persistence, screen sharing, or item storage.
