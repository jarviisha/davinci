import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";
import { cn } from "./utils.js";

export type SkeletonVariant = "text" | "rect" | "circle";

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  height?: CSSProperties["height"];
  variant?: SkeletonVariant;
  width?: CSSProperties["width"];
};

const variantClass: Record<SkeletonVariant, string> = {
  text: "davinci-skeleton--text",
  rect: "davinci-skeleton--rect",
  circle: "davinci-skeleton--circle"
};

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { className, height, style, variant = "rect", width, ...props },
  ref
) {
  return (
    <div
      aria-hidden="true"
      className={cn("davinci-skeleton", variantClass[variant], className)}
      ref={ref}
      style={{ blockSize: height, inlineSize: width, ...style }}
      {...props}
    />
  );
});
