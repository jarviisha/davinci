import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "./utils.js";

/**
 * Visual weight ladder. Pick the lightest that conveys priority.
 *
 * - `solid` — filled background. **One per view** for the primary action.
 * - `outline` — border + transparent bg. Secondary actions sitting next to a solid primary.
 * - `soft` — tinted background, no border. Tertiary / row-level actions.
 * - `ghost` — no chrome at rest. Toolbar buttons, inline text actions, icon-only utilities.
 */
export type ButtonVariant = "solid" | "outline" | "ghost" | "soft";

/**
 * Semantic role.
 *
 * - `primary` — the main affirmative action (Save, Submit, Create).
 * - `neutral` — non-affirmative actions (Cancel, Close, Back, Filter).
 * - `danger` — destructive actions (Delete, Discard, Remove). Pair with confirmation for irreversible operations.
 */
export type ButtonTone = "primary" | "neutral" | "danger";

/** Control size. `md` is the default. `sm` for dense toolbars/tables; `lg` for marketing-style CTAs. */
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
};

const variantClass: Record<ButtonVariant, string> = {
  solid: "davinci-button--solid",
  outline: "davinci-button--outline",
  ghost: "davinci-button--ghost",
  soft: "davinci-button--soft"
};

const toneClass: Record<ButtonTone, string> = {
  primary: "davinci-button--tone-primary",
  neutral: "davinci-button--tone-neutral",
  danger: "davinci-button--tone-danger"
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "davinci-button--sm",
  md: "davinci-button--md",
  lg: "davinci-button--lg"
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, disabled, size = "md", tone = "primary", type = "button", variant = "solid", ...props },
  ref
) {
  return (
    <button
      className={cn(
        "davinci-button",
        sizeClass[size],
        variantClass[variant],
        toneClass[tone],
        className
      )}
      disabled={disabled}
      ref={ref}
      type={type}
      {...props}
    />
  );
});
