import { forwardRef, type AnchorHTMLAttributes, type HTMLAttributes } from "react";
import { cn } from "./utils.js";

export type BreadcrumbsProps = HTMLAttributes<HTMLElement>;
export type BreadcrumbsListProps = HTMLAttributes<HTMLOListElement>;
export type BreadcrumbsItemProps = HTMLAttributes<HTMLLIElement>;
export type BreadcrumbsLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;
export type BreadcrumbsCurrentProps = HTMLAttributes<HTMLSpanElement>;
export type BreadcrumbsSeparatorProps = HTMLAttributes<HTMLSpanElement>;

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(function Breadcrumbs(
  { className, ...props },
  ref
) {
  return <nav aria-label="Breadcrumb" className={cn("davinci-breadcrumbs", className)} ref={ref} {...props} />;
});

export const BreadcrumbsList = forwardRef<HTMLOListElement, BreadcrumbsListProps>(function BreadcrumbsList(
  { className, ...props },
  ref
) {
  return <ol className={cn("davinci-breadcrumbs__list", className)} ref={ref} {...props} />;
});

export const BreadcrumbsItem = forwardRef<HTMLLIElement, BreadcrumbsItemProps>(function BreadcrumbsItem(
  { className, ...props },
  ref
) {
  return <li className={cn("davinci-breadcrumbs__item", className)} ref={ref} {...props} />;
});

export const BreadcrumbsLink = forwardRef<HTMLAnchorElement, BreadcrumbsLinkProps>(function BreadcrumbsLink(
  { className, ...props },
  ref
) {
  return <a className={cn("davinci-breadcrumbs__link", className)} ref={ref} {...props} />;
});

export const BreadcrumbsCurrent = forwardRef<HTMLSpanElement, BreadcrumbsCurrentProps>(
  function BreadcrumbsCurrent({ className, ...props }, ref) {
    return <span aria-current="page" className={cn("davinci-breadcrumbs__current", className)} ref={ref} {...props} />;
  }
);

export const BreadcrumbsSeparator = forwardRef<HTMLSpanElement, BreadcrumbsSeparatorProps>(
  function BreadcrumbsSeparator({ children = "/", className, ...props }, ref) {
    return (
      <span aria-hidden="true" className={cn("davinci-breadcrumbs__separator", className)} ref={ref} {...props}>
        {children}
      </span>
    );
  }
);
