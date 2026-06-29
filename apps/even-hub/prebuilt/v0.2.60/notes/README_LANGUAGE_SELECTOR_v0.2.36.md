# v0.2.36 – Manual language selector

Adds manual language selection under mobile WebView settings.

Options:
- Automatic via `navigator.languages`
- English
- Dansk
- Deutsch
- Español
- Français
- Русский
- 中文
- 日本語

The selected value is stored in `localStorage` under `sendToG2.language`. `auto` clears the override and falls back to locale detection.

Core UI strings are localized for the new languages. Less common long-tail strings fall back to the existing English text through the cloned English dictionary.
