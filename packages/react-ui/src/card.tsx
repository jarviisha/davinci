import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "./utils.js";

/**
 * Card emphasis ladder. Start at `default` and escalate only if intent demands it.
 *
 * - `default` — canvas + border. The baseline. Use for most grouped content (sections, lists, settings groups).
 * - `outlined` — same shape as default, but lets you tune border weight via `outlineWeight`.
 * - `filled` — `backgroundSubtle` fill. Mild emphasis for sub-panels nested inside another container or neutral callouts.
 * - `flat` — no border, no fill. Use when the surrounding context already provides the frame.
 * - `floating` — `surface-raised` background + raised shadow. Reserved for true overlays (popover, menu, command palette). Don't use to "make a card stand out" — that's what `filled` is for.
 */
export type CardVariant = "default" | "outlined" | "filled" | "flat" | "floating";

/** Border emphasis for `variant="outlined"`. Default is `default`. Bumping to `bold` is for prominent groupings; `subtle` for nested rows. */
export type CardOutlineWeight = "subtle" | "default" | "bold";

/**
 * Semantic tone — only for cards where **status IS the message** (build failed, deploy succeeded, approaching quota).
 *
 * Do not use as decoration. If the reader doesn't need to know the card is "informational",
 * leave `tone` unset (= `neutral`) and rely on layout/typography instead.
 *
 * - `neutral` — default; no tint.
 * - `info` — passive notification.
 * - `success` — operation completed; healthy state.
 * - `warning` — caution; partial degradation; non-blocking issue.
 * - `danger` — error; destructive action; blocking failure.
 */
export type CardTone = "neutral" | "info" | "success" | "warning" | "danger";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
  outlineWeight?: CardOutlineWeight;
  selected?: boolean;
  tone?: CardTone;
  variant?: CardVariant;
};

const variantClass: Record<CardVariant, string> = {
  default: "davinci-card--default",
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
    variant = "default",
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
