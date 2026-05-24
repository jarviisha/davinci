import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "./utils.js";

/**
 * Alert variant — the message itself is status-bearing.
 *
 * - `info` — passive notification ("This workspace is in read-only mode").
 * - `success` — confirmation of a completed action ("Settings saved").
 * - `warning` — caution ("Approaching API quota").
 * - `danger` — error or blocking failure ("Deploy failed").
 *
 * If you want a non-status callout for marketing or onboarding, prefer `<Card variant="filled">` instead.
 */
export type AlertVariant = "info" | "success" | "warning" | "danger";

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  actions?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  title?: ReactNode;
  variant?: AlertVariant;
};

const variantClass: Record<AlertVariant, string> = {
  info: "davinci-alert--info",
  success: "davinci-alert--success",
  warning: "davinci-alert--warning",
  danger: "davinci-alert--danger"
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { actions, children, className, description, icon, title, variant = "info", ...props },
  ref
) {
  return (
    <div className={cn("davinci-alert", variantClass[variant], className)} ref={ref} role="status" {...props}>
      {icon ? <div className="davinci-alert__icon">{icon}</div> : null}
      <div className="davinci-alert__body">
        {title ? <div className="davinci-alert__title">{title}</div> : null}
        {description ? <div className="davinci-alert__description">{description}</div> : null}
        {children}
      </div>
      {actions ? <div className="davinci-alert__actions">{actions}</div> : null}
    </div>
  );
});
