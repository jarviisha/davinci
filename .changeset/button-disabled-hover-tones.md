---
"@jarviisha/davinci-react-ui": patch
---

Fix `Button` disabled and hover/active colors across every variant and tone.

- **Disabled** styling previously had the same specificity as the variant+tone rules but sat earlier in the stylesheet, so the variant colors won and disabled solid buttons kept their full primary/danger fill while ghost/outline showed an inconsistent mix. Disabled rules are now scoped per variant and declared after the variant/tone rules, so each variant disables consistently (solid/soft stay filled, outline keeps its border, ghost stays bare) using the shared `--davinci-component-button-disabled-*` tokens.
- **Hover/active** for `outline`, `ghost`, and `soft` used a single neutral-gray surface regardless of tone, so primary/danger buttons lost their tone on interaction. These states are now tone-aware: outline/ghost wash in a faint tint of the tone, soft deepens its own rest tint, and neutral keeps the neutral surface. Solid `neutral` no longer relies on an `opacity` change (which faded the label) and instead uses a proper darker fill with a distinct pressed state.
