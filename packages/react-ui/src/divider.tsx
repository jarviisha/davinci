import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "./utils.js";

export type DividerOrientation = "horizontal" | "vertical";

export type DividerProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: DividerOrientation;
};

export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  { className, orientation = "horizontal", role, ...props },
  ref
) {
  return (
    <div
      aria-orientation={orientation}
      className={cn(
        "davinci-divider",
        orientation === "vertical" ? "davinci-divider--vertical" : "davinci-divider--horizontal",
        className
      )}
      ref={ref}
      role={role ?? "separator"}
      {...props}
    />
  );
});
