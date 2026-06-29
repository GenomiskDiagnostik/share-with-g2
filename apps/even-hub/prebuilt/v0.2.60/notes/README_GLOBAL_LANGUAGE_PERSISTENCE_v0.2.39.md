# v0.2.39 – global language persistence fix

Built from v0.2.36.

Changes:

- Manual language selection in mobile WebView is stored through localStorage, sessionStorage, cookie, and `lang=<code>` URL parameter.
- Closing Settings preserves `lang=<code>`, so the glasses UI uses the same selected language immediately.
- Glasses UI re-checks selected language before rendering, on storage events, and with a 1-second polling fallback.
- v0.2.37 blank TextContainer border changes are not included.
