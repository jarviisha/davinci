import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";
import { cn } from "./utils.js";

export type SpacingToken =
  | "0"
  | "025"
  | "050"
  | "075"
  | "100"
  | "150"
  | "200"
  | "250"
  | "300"
  | "400"
  | "500"
  | "600"
  | "800"
  | "1000";

export type LayoutAlign = "start" | "center" | "end" | "stretch";
export type LayoutJustify = "start" | "center" | "end" | "between";

type LayoutStyle = CSSProperties & Record<"--davinci-layout-gap", string>;

export type StackProps = HTMLAttributes<HTMLDivElement> & {
  align?: LayoutAlign;
  gap?: SpacingToken;
  justify?: LayoutJustify;
};

export type InlineProps = HTMLAttributes<HTMLDivElement> & {
  align?: Exclude<LayoutAlign, "stretch">;
  gap?: SpacingToken;
  justify?: LayoutJustify;
  wrap?: boolean;
};

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: ContainerSize;
};

const alignClass: Record<LayoutAlign, string> = {
  start: "davinci-layout--align-start",
  center: "davinci-layout--align-center",
  end: "davinci-layout--align-end",
  stretch: "davinci-layout--align-stretch"
};

const justifyClass: Record<LayoutJustify, string> = {
  start: "davinci-layout--justify-start",
  center: "davinci-layout--justify-center",
  end: "davinci-layout--justify-end",
  between: "davinci-layout--justify-between"
};

const containerSizeClass: Record<ContainerSize, string> = {
  sm: "davinci-container--sm",
  md: "davinci-container--md",
  lg: "davinci-container--lg",
  xl: "davinci-container--xl",
  full: "davinci-container--full"
};

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  { align = "stretch", className, gap = "300", justify = "start", style, ...props },
  ref
) {
  return (
    <div
      className={cn("davinci-stack", alignClass[align], justifyClass[justify], className)}
      ref={ref}
      style={layoutStyle(gap, style)}
      {...props}
    />
  );
});

export const Inline = forwardRef<HTMLDivElement, InlineProps>(function Inline(
  { align = "center", className, gap = "200", justify = "start", style, wrap = false, ...props },
  ref
) {
  return (
    <div
      className={cn(
        "davinci-inline",
        alignClass[align],
        justifyClass[justify],
        wrap ? "davinci-inline--wrap" : false,
        className
      )}
      ref={ref}
      style={layoutStyle(gap, style)}
      {...props}
    />
  );
});

export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { className, size = "lg", ...props },
  ref
) {
  return <div className={cn("davinci-container", containerSizeClass[size], className)} ref={ref} {...props} />;
});

function layoutStyle(gap: SpacingToken, style: CSSProperties | undefined): LayoutStyle {
  return {
    "--davinci-layout-gap": `var(--davinci-spacing-${gap})`,
    ...style
  };
}
