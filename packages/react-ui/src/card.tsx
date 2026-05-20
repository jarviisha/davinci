import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "./utils.js";

export type CardVariant = "elevated" | "outlined";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
};

const variantClass: Record<CardVariant, string> = {
  elevated: "davinci-card--elevated",
  outlined: "davinci-card--outlined"
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, variant = "elevated", ...props },
  ref
) {
  return <div className={cn("davinci-card", variantClass[variant], className)} ref={ref} {...props} />;
});

export const CardHeader = forwardRef<HTMLDivElement, CardProps>(function CardHeader(
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

export const CardContent = forwardRef<HTMLDivElement, CardProps>(function CardContent(
  { className, ...props },
  ref
) {
  return <div className={cn("davinci-card__content", className)} ref={ref} {...props} />;
});

export const CardFooter = forwardRef<HTMLDivElement, CardProps>(function CardFooter(
  { className, ...props },
  ref
) {
  return <div className={cn("davinci-card__footer", className)} ref={ref} {...props} />;
});
