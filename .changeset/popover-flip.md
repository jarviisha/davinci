---
"@jarviisha/davinci-react-ui": patch
---

`Popover` now flips above the trigger when there isn't enough room below it in the viewport (and more space exists above), instead of always opening downward. Positioning runs in a layout effect before paint and the panel stays hidden until placed, so there's no flash; a `ResizeObserver` re-evaluates the placement when the panel's own height changes (e.g. `DatePicker` toggling its time row). This affects every component built on `Popover`.
