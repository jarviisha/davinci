import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "./utils.js";

export type BadgeVariant = "neutral" | "primary" | "success" | "warning" | "destructive" | "discovery";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variantClass: Record<BadgeVariant, string> = {
  neutral: "davinci-badge--neutral",
  primary: "davinci-badge--primary",
  success: "davinci-badge--success",
  warning: "davinci-badge--warning",
  destructive: "davinci-badge--destructive",
  discovery: "davinci-badge--discovery"
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, variant = "neutral", ...props },
  ref
) {
  return <span className={cn("davinci-badge", variantClass[variant], className)} ref={ref} {...props} />;
});
