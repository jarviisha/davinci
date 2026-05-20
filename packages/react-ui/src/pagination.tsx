import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes } from "react";
import { cn } from "./utils.js";

export type PaginationProps = Omit<HTMLAttributes<HTMLElement>, "onChange"> & {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
};

export function Pagination({ className, onPageChange, page, pageCount, siblingCount = 1, ...props }: PaginationProps) {
  const pages = paginationRange(page, pageCount, siblingCount);

  return (
    <nav aria-label="Pagination" className={cn("davinci-pagination", className)} {...props}>
      <PaginationButton disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        Previous
      </PaginationButton>
      <ol className="davinci-pagination__list">
        {pages.map((item, index) => (
          <li key={`${item}-${index}`}>
            {item === "ellipsis" ? (
              <span aria-hidden="true" className="davinci-pagination__ellipsis">
                ...
              </span>
            ) : (
              <PaginationButton aria-current={item === page ? "page" : undefined} onClick={() => onPageChange(item)}>
                {item}
              </PaginationButton>
            )}
          </li>
        ))}
      </ol>
      <PaginationButton disabled={page >= pageCount} onClick={() => onPageChange(page + 1)}>
        Next
      </PaginationButton>
    </nav>
  );
}

export type PaginationButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const PaginationButton = forwardRef<HTMLButtonElement, PaginationButtonProps>(function PaginationButton(
  { className, type = "button", ...props },
  ref
) {
  return <button className={cn("davinci-pagination__button", className)} ref={ref} type={type} {...props} />;
});

type PaginationItem = number | "ellipsis";

function paginationRange(page: number, pageCount: number, siblingCount: number): PaginationItem[] {
  const totalVisible = siblingCount * 2 + 5;
  if (pageCount <= totalVisible) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  const left = Math.max(page - siblingCount, 2);
  const right = Math.min(page + siblingCount, pageCount - 1);
  const items: PaginationItem[] = [1];

  if (left > 2) items.push("ellipsis");
  for (let item = left; item <= right; item += 1) items.push(item);
  if (right < pageCount - 1) items.push("ellipsis");
  items.push(pageCount);

  return items;
}
