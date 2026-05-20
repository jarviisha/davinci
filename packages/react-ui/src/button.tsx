import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "./utils.js";

export type ButtonVariant = "solid" | "outline" | "ghost" | "soft";
export type ButtonTone = "primary" | "neutral" | "danger";
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
