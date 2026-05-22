import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "./utils.js";

export type CardVariant = "elevated" | "surface" | "outlined" | "filled" | "flat" | "floating";
export type CardOutlineWeight = "subtle" | "default" | "bold";
export type CardTone = "neutral" | "info" | "success" | "warning" | "danger";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
  outlineWeight?: CardOutlineWeight;
  selected?: boolean;
  tone?: CardTone;
  variant?: CardVariant;
};

const variantClass: Record<CardVariant, string> = {
  elevated: "davinci-card--elevated",
  surface: "davinci-card--surface",
  outlined: "davinci-card--outlined",
  filled: "davinci-card--filled",
  flat: "davinci-card--flat",
  floating: "davinci-card--floating"
};

const outlineWeightClass: Record<CardOutlineWeight, string> = {
  subtle: "davinci-card--outline-subtle",
  default: "davinci-card--outline-default",
  bold: "davinci-card--outline-bold"
};

const toneClass: Record<CardTone, string | undefined> = {
  neutral: undefined,
  info: "davinci-card--tone-info",
  success: "davinci-card--tone-success",
  warning: "davinci-card--tone-warning",
  danger: "davinci-card--tone-danger"
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    className,
    interactive = false,
    outlineWeight = "default",
    selected = false,
    tone = "neutral",
    variant = "elevated",
    ...props
  },
  ref
) {
  return (
    <div
      className={cn(
        "davinci-card",
        variantClass[variant],
        variant === "outlined" && outlineWeightClass[outlineWeight],
        toneClass[tone],
        interactive && "davinci-card--interactive",
        selected && "davinci-card--selected",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardHeader(
  { className, ...props },
  ref
) {
  return <div className={cn("davinci-card__header", className)} ref={ref} {...props} />;
});

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(function CardTitle(
  { className, ...props },
  ref
) {
  return <h3 className={cn("davinci-card__title", className)} ref={ref} {...props} />;
});

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  function CardDescription({ className, ...props }, ref) {
    return <p className={cn("davinci-card__description", className)} ref={ref} {...props} />;
  }
);

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardContent(
  { className, ...props },
  ref
) {
  return <div className={cn("davinci-card__content", className)} ref={ref} {...props} />;
});

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardFooter(
  { className, ...props },
  ref
) {
  return <div className={cn("davinci-card__footer", className)} ref={ref} {...props} />;
});
