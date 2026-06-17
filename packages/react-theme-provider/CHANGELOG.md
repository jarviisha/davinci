# @jarviisha/davinci-react-theme-provider

## 0.2.0

### Minor Changes

- d999e43: Add runtime radius customization. `useRadiusPreset` applies a named preset (`minimum`, `subtle`, `default`, `bold`) or a raw `{ sm, md, lg, xl }` pixel scale to the `--davinci-radius-*` custom properties and persists the choice. Ships `radiusPresets`, `resolveScale`, `matchPreset`, `RADIUS_PRESET_LABELS`, and `getRadiusScript` / `RadiusScript` for flash-free hydration, mirroring the existing theme APIs.
