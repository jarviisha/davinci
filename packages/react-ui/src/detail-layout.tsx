import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "./utils.js";

export type DetailLayoutProps = HTMLAttributes<HTMLDivElement> & {
  asidePlacement?: "end" | "start";
  asideSticky?: boolean;
};

export type DetailLayoutMainProps = HTMLAttributes<HTMLDivElement>;
export type DetailLayoutAsideProps = HTMLAttributes<HTMLElement>;

export const DetailLayout = forwardRef<HTMLDivElement, DetailLayoutProps>(function DetailLayout(
  { asidePlacement = "end", asideSticky = false, className, ...props },
  ref
) {
  return (
    <div
      className={cn(
        "davinci-detail-layout",
        asidePlacement === "start" ? "davinci-detail-layout--aside-start" : false,
        asideSticky ? "davinci-detail-layout--aside-sticky" : false,
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

export const DetailLayoutMain = forwardRef<HTMLDivElement, DetailLayoutMainProps>(function DetailLayoutMain(
  { className, ...props },
  ref
) {
  return <div className={cn("davinci-detail-layout__main", className)} ref={ref} {...props} />;
});

export const DetailLayoutAside = forwardRef<HTMLElement, DetailLayoutAsideProps>(function DetailLayoutAside(
  { className, ...props },
  ref
) {
  return <aside className={cn("davinci-detail-layout__aside", className)} ref={ref} {...props} />;
});
