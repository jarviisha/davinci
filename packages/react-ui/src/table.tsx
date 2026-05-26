import { forwardRef, type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from "react";
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
export type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>;
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
  { className, ...props },
  ref
) {
  return <thead className={cn("davinci-table__header", className)} ref={ref} {...props} />;
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
