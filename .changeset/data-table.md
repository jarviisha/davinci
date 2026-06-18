---
"@jarviisha/davinci-react-ui": minor
---

Add `DataTable`, a presentational data-driven layer over the table primitives. Pass `columns` + `data` instead of hand-wiring `TableHead`/`TableCell` pairs, which keeps headers and cells aligned by construction. Supports per-column `align`/`wrap`/custom `cell` renderers, `rowKey`, `onRowClick`, an empty state, and a controlled checkbox selection column (`selectable` + `selectedKeys`/`onSelectionChange`) with select-all. It owns no sort/filter/paginate state — feed it already-prepared data. The compound primitives remain for layouts the column model can't express.
