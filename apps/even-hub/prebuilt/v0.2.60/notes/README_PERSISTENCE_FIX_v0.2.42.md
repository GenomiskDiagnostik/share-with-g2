# v0.2.42 – persistence fix

Built from v0.2.41.

Changes:

- Restores robust persistence for the Android pairing/access key.
- Access key is mirrored to localStorage, sessionStorage and cookie.
- Access key is read from all available stores and mirrored back into the others.
- Settings now pre-fills the stored key when available.
- Clear key removes it from all stores.
- Keeps v0.2.40/v0.2.41 Even Hub review fixes.
- Does not include the v0.2.37 blank TextContainer border experiment.
