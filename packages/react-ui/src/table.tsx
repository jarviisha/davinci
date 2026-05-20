import { forwardRef, type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from "react";
import { cn } from "./utils.js";

export type TableProps = HTMLAttributes<HTMLTableElement>;
export type TableContainerProps = HTMLAttributes<HTMLDivElement>;
export type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>;
export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>;
export type TableFooterProps = HTMLAttributes<HTMLTableSectionElement>;
export type TableRowProps = HTMLAttributes<HTMLTableRowElement>;
export type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement>;
export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>;
export type TableCaptionProps = HTMLAttributes<HTMLTableCaptionElement>;

export const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(function TableContainer(
  { className, ...props },
  ref
) {
  return <div className={cn("davinci-table-container", className)} ref={ref} {...props} />;
});

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table({ className, ...props }, ref) {
  return <table className={cn("davinci-table", className)} ref={ref} {...props} />;
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
  { className, ...props },
  ref
) {
  return <tr className={cn("davinci-table__row", className)} ref={ref} {...props} />;
});

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(function TableHead(
  { className, scope = "col", ...props },
  ref
) {
  return <th className={cn("davinci-table__head", className)} ref={ref} scope={scope} {...props} />;
});

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { className, ...props },
  ref
) {
  return <td className={cn("davinci-table__cell", className)} ref={ref} {...props} />;
});

export const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(function TableCaption(
  { className, ...props },
  ref
) {
  return <caption className={cn("davinci-table__caption", className)} ref={ref} {...props} />;
});
