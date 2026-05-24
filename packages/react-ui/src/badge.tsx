import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "./utils.js";

/**
 * Badge variant — encodes meaning, not decoration.
 *
 * - `neutral` — generic label (category, type, count).
 * - `primary` — branded callout (current plan, featured tag).
 * - `success` — healthy / completed state.
 * - `warning` — caution / non-blocking issue.
 * - `danger` — error / blocking failure / destructive flag.
 * - `discovery` — new or experimental feature surface.
 *
 * Don't tint a badge for visual variety — use `neutral` if there's no semantic meaning.
 */
export type BadgeVariant = "neutral" | "primary" | "success" | "warning" | "danger" | "discovery";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variantClass: Record<BadgeVariant, string> = {
  neutral: "davinci-badge--neutral",
  primary: "davinci-badge--primary",
  success: "davinci-badge--success",
  warning: "davinci-badge--warning",
  danger: "davinci-badge--danger",
  discovery: "davinci-badge--discovery"
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, variant = "neutral", ...props },
  ref
) {
  return <span className={cn("davinci-badge", variantClass[variant], className)} ref={ref} {...props} />;
});
