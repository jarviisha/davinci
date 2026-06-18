import { forwardRef, type HTMLAttributes, type ReactNode, type TdHTMLAttributes, type ThHTMLAttributes } from "react";
import { Checkbox } from "./checkbox.js";
import { cn } from "./utils.js";
import { useOverlayScrollbar } from "./use-overlay-scrollbar.js";

/**
 * Row padding density.
 *
 * - `comfortable` — the baseline; roomy padding for readable, mixed-content tables.
 * - `compact` — tighter vertical padding for dense data grids (more rows per viewport).
 */
export type TableDensity = "comfortable" | "compact";

export type TableProps = HTMLAttributes<HTMLTableElement> & {
  /** Row padding density. Defaults to `comfortable`. */
  density?: TableDensity;
  /**
   * Keep the header pinned while the body scrolls. Requires a height-constrained
   * `TableContainer` (it already provides the scroll context).
   */
  stickyHeader?: boolean;
};
/**
 * Header color tone.
 *
 * - `default` — subtle fill with muted labels. The baseline.
 * - `primary` — solid primary fill for a branded, emphasized header.
 * - `neutral` — no fill with full-contrast labels for a quiet, plain header.
 * - `transparent` — no fill; the surface behind the table shows through, with muted labels.
 *   Not suited for `stickyHeader`: with no fill, scrolling body rows bleed through the pinned header.
 */
export type TableHeaderTone = "default" | "primary" | "neutral" | "transparent";

export type TableContainerProps = HTMLAttributes<HTMLDivElement> & {
  /** Drop the outer frame (border + rounded corners) for a flush, lines-only table. */
  borderless?: boolean;
  /**
   * Replace the native scrollbar with a thumb that floats over the content and
   * reserves zero layout space. Pairs with `Table`'s `stickyHeader` on a
   * height-constrained container.
   */
  overlayScrollbar?: boolean;
};
export type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement> & {
  /** Header color tone. Defaults to `default`. */
  tone?: TableHeaderTone;
};
export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>;
export type TableFooterProps = HTMLAttributes<HTMLTableSectionElement>;
export type TableRowProps = HTMLAttributes<HTMLTableRowElement> & {
  /** Highlight the row as the current selection. Composes with `interactive`. */
  selected?: boolean;
  /** Signal the row is clickable with a pointer cursor and focus ring. Composes with `selected`. */
  interactive?: boolean;
};
export type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement> & {
  /** Allow the cell content to wrap onto multiple lines. Cells stay on one line by default. */
  wrap?: boolean;
};
export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement> & {
  /** Allow the cell content to wrap onto multiple lines. Cells stay on one line by default. */
  wrap?: boolean;
};
export type TableCaptionProps = HTMLAttributes<HTMLTableCaptionElement>;

export const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(function TableContainer(
  { className, borderless = false, overlayScrollbar = false, children, ...props },
  ref
) {
  const containerClassName = cn(
    "davinci-table-container",
    borderless && "davinci-table-container--borderless",
    overlayScrollbar && "davinci-table-container--overlay",
    className
  );

  if (!overlayScrollbar) {
    return (
      <div className={containerClassName} ref={ref} {...props}>
        {children}
      </div>
    );
  }

  return (
    <OverlayTableContainer className={containerClassName} ref={ref} {...props}>
      {children}
    </OverlayTableContainer>
  );
});

const OverlayTableContainer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function OverlayTableContainer({ children, ...props }, ref) {
    const { viewportRef, vertical, horizontal, onThumbPointerDown } = useOverlayScrollbar();
    return (
      <div ref={ref} {...props}>
        <div className="davinci-table-container__viewport" ref={viewportRef}>
          {children}
        </div>
        {vertical.visible ? (
          <div
            className="davinci-table-container__scrollbar davinci-table-container__scrollbar--vertical"
            aria-hidden="true"
          >
            <div
              className="davinci-table-container__thumb"
              style={{ blockSize: vertical.size, transform: `translateY(${vertical.offset}px)` }}
              onPointerDown={onThumbPointerDown("y")}
            />
          </div>
        ) : null}
        {horizontal.visible ? (
          <div
            className="davinci-table-container__scrollbar davinci-table-container__scrollbar--horizontal"
            aria-hidden="true"
          >
            <div
              className="davinci-table-container__thumb"
              style={{ inlineSize: horizontal.size, transform: `translateX(${horizontal.offset}px)` }}
              onPointerDown={onThumbPointerDown("x")}
            />
          </div>
        ) : null}
      </div>
    );
  }
);

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  { className, density = "comfortable", stickyHeader = false, ...props },
  ref
) {
  return (
    <table
      className={cn(
        "davinci-table",
        density === "compact" && "davinci-table--compact",
        stickyHeader && "davinci-table--sticky-header",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(function TableHeader(
  { className, tone = "default", ...props },
  ref
) {
  return (
    <thead
      className={cn("davinci-table__header", tone !== "default" && `davinci-table__header--${tone}`, className)}
      ref={ref}
      {...props}
    />
  );
});

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(function TableBody(
  { className, ...props },
  ref
) {
  return <tbody className={cn("davinci-table__body", className)} ref={ref} {...props} />;
});

export const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(function TableFooter(
  { className, ...props },
  ref
) {
  return <tfoot className={cn("davinci-table__footer", className)} ref={ref} {...props} />;
});

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { className, selected = false, interactive = false, ...props },
  ref
) {
  return (
    <tr
      className={cn(
        "davinci-table__row",
        selected && "davinci-table__row--selected",
        interactive && "davinci-table__row--interactive",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(function TableHead(
  { className, scope = "col", wrap = false, ...props },
  ref
) {
  return (
    <th
      className={cn("davinci-table__head", wrap && "davinci-table__head--wrap", className)}
      ref={ref}
      scope={scope}
      {...props}
    />
  );
});

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { className, wrap = false, ...props },
  ref
) {
  return (
    <td className={cn("davinci-table__cell", wrap && "davinci-table__cell--wrap", className)} ref={ref} {...props} />
  );
});

export const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(function TableCaption(
  { className, ...props },
  ref
) {
  return <caption className={cn("davinci-table__caption", className)} ref={ref} {...props} />;
});

/* -------------------------------------------------------------------------- */
/* DataTable — a presentational, data-driven layer over the primitives above. */
/* -------------------------------------------------------------------------- */

/** Stable identity for a row. Returned by `DataTable`'s `rowKey`. */
export type DataTableKey = string | number;

/** Horizontal alignment for a column's header and cells. */
export type ColumnAlign = "start" | "center" | "end";

/**
 * One column definition. `cell` renders the body cell for a row; when omitted,
 * the raw `row[key]` value is rendered. `align`/`wrap` apply to both the header
 * and every body cell, so a column never drifts out of alignment with itself.
 */
export type DataTableColumn<T> = {
  /** Unique column id; also the default value accessor (`row[key]`). */
  key: string;
  /** Header content. */
  header: ReactNode;
  /** Render the body cell for `row`. Defaults to `String(row[key] ?? "")`. */
  cell?: (row: T, index: number) => ReactNode;
  /** Alignment for header + cells. Defaults to `start`. */
  align?: ColumnAlign;
  /** Allow cell content to wrap. Cells stay on one line by default. */
  wrap?: boolean;
  /** Extra class applied to this column's `<th>` and every `<td>`. */
  className?: string;
};

export type DataTableProps<T> = {
  /** The rows to render, already sorted/filtered/paginated by the caller. */
  data: readonly T[];
  /** Column definitions, left to right. */
  columns: ReadonlyArray<DataTableColumn<T>>;
  /**
   * Stable key per row. Falls back to the array index when omitted, but a real
   * key is **required** for `selectable` to track selection across re-renders.
   */
  rowKey?: (row: T, index: number) => DataTableKey;
  /** Row padding density. Defaults to `comfortable`. */
  density?: TableDensity;
  /** Pin the header while the body scrolls. Needs a height-constrained table. */
  stickyHeader?: boolean;
  /** Header color tone. Defaults to `default`. */
  headerTone?: TableHeaderTone;
  /** Optional `<caption>` content. */
  caption?: ReactNode;
  /** Rendered in place of the body rows when `data` is empty. */
  empty?: ReactNode;
  /** Mark rows clickable (cursor + focus ring) and fire on activation. */
  onRowClick?: (row: T, index: number) => void;
  /** Add a leading checkbox column. Selection is controlled by the caller. */
  selectable?: boolean;
  /** Currently selected row keys (controlled). */
  selectedKeys?: Iterable<DataTableKey>;
  /** Fired with the next full selection when a checkbox toggles. */
  onSelectionChange?: (keys: Set<DataTableKey>) => void;
  /** Accessible label for a row's checkbox. Defaults to `"Select row"`. */
  selectionLabel?: (row: T, index: number) => string;
  /** Drop the outer frame (border + rounded corners). */
  borderless?: boolean;
  /** Float the scrollbar over the content instead of reserving layout space. */
  overlayScrollbar?: boolean;
  /** Class applied to the `<table>` element. */
  className?: string;
  /** Props forwarded to the wrapping `TableContainer`. */
  containerProps?: Omit<TableContainerProps, "borderless" | "overlayScrollbar">;
};

const alignClass: Record<ColumnAlign, string | false> = {
  start: false,
  center: "align-center",
  end: "align-end"
};

function cellClass<T>(prefix: string, column: DataTableColumn<T>): string {
  const align = column.align ?? "start";
  const alignMod = alignClass[align];
  return cn(
    alignMod && `${prefix}--${alignMod}`,
    column.wrap && `${prefix}--wrap`,
    column.className
  );
}

/**
 * Data-driven table built on the compound primitives. Presentational only — it
 * owns no sort/filter/paginate state; feed it already-prepared `data`. Selection
 * is controlled via `selectedKeys` + `onSelectionChange`.
 *
 * For layouts the column model can't express (grouped headers, spanning cells,
 * footers), drop down to `Table`/`TableRow`/`TableCell` directly.
 */
export function DataTable<T>({
  data,
  columns,
  rowKey,
  density,
  stickyHeader,
  headerTone,
  caption,
  empty,
  onRowClick,
  selectable = false,
  selectedKeys,
  onSelectionChange,
  selectionLabel,
  borderless,
  overlayScrollbar,
  className,
  containerProps
}: DataTableProps<T>) {
  const keyOf = (row: T, index: number): DataTableKey => (rowKey ? rowKey(row, index) : index);
  const selected = new Set<DataTableKey>(selectedKeys ?? []);
  const totalColumns = columns.length + (selectable ? 1 : 0);

  const selectedCount = data.reduce((count, row, index) => (selected.has(keyOf(row, index)) ? count + 1 : count), 0);
  const allSelected = data.length > 0 && selectedCount === data.length;
  const someSelected = selectedCount > 0 && !allSelected;

  const toggleAll = () => {
    if (!onSelectionChange) return;
    const next = new Set(selected);
    if (allSelected) {
      data.forEach((row, index) => next.delete(keyOf(row, index)));
    } else {
      data.forEach((row, index) => next.add(keyOf(row, index)));
    }
    onSelectionChange(next);
  };

  const toggleRow = (key: DataTableKey) => {
    if (!onSelectionChange) return;
    const next = new Set(selected);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    onSelectionChange(next);
  };

  return (
    <TableContainer borderless={borderless} overlayScrollbar={overlayScrollbar} {...containerProps}>
      <Table className={className} density={density} stickyHeader={stickyHeader}>
        {caption != null ? <TableCaption>{caption}</TableCaption> : null}
        <TableHeader tone={headerTone}>
          <TableRow>
            {selectable ? (
              <TableHead className="davinci-table__head--select">
                <Checkbox
                  aria-label="Select all rows"
                  checked={allSelected}
                  indeterminate={someSelected}
                  disabled={data.length === 0}
                  onChange={toggleAll}
                />
              </TableHead>
            ) : null}
            {columns.map((column) => (
              <TableHead key={column.key} className={cellClass("davinci-table__head", column)}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell className="davinci-table__empty" colSpan={totalColumns}>
                {empty}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => {
              const key = keyOf(row, index);
              const isSelected = selectable && selected.has(key);
              return (
                <TableRow
                  key={key}
                  selected={isSelected}
                  interactive={onRowClick != null}
                  onClick={onRowClick ? () => onRowClick(row, index) : undefined}
                >
                  {selectable ? (
                    <TableCell
                      className="davinci-table__cell--select"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <Checkbox
                        aria-label={selectionLabel ? selectionLabel(row, index) : "Select row"}
                        checked={selected.has(key)}
                        onChange={() => toggleRow(key)}
                      />
                    </TableCell>
                  ) : null}
                  {columns.map((column) => (
                    <TableCell key={column.key} className={cellClass("davinci-table__cell", column)}>
                      {column.cell
                        ? column.cell(row, index)
                        : String((row as Record<string, unknown>)[column.key] ?? "")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
