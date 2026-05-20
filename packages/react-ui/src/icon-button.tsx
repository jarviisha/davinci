import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "./utils.js";

export type IconButtonVariant = "solid" | "outline" | "ghost" | "soft";
export type IconButtonTone = "primary" | "neutral" | "danger";
export type IconButtonSize = "sm" | "md" | "lg";

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  "aria-label": string;
  children: ReactNode;
  size?: IconButtonSize;
  tone?: IconButtonTone;
  variant?: IconButtonVariant;
};

const variantClass: Record<IconButtonVariant, string> = {
  solid: "davinci-button--solid",
  outline: "davinci-button--outline",
  ghost: "davinci-button--ghost",
  soft: "davinci-button--soft"
};

const toneClass: Record<IconButtonTone, string> = {
  primary: "davinci-button--tone-primary",
  neutral: "davinci-button--tone-neutral",
  danger: "davinci-button--tone-danger"
};

const sizeClass: Record<IconButtonSize, string> = {
  sm: "davinci-icon-button--sm",
  md: "davinci-icon-button--md",
  lg: "davinci-icon-button--lg"
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { className, disabled, size = "md", tone = "neutral", type = "button", variant = "ghost", ...props },
  ref
) {
  return (
    <button
      className={cn("davinci-button", "davinci-icon-button", sizeClass[size], variantClass[variant], toneClass[tone], className)}
      disabled={disabled}
      ref={ref}
      type={type}
      {...props}
    />
  );
});
