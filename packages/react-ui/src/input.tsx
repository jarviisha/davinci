import { forwardRef, type InputHTMLAttributes } from "react";
import { useFormFieldContext } from "./form-field-context.js";
import { cn } from "./utils.js";

export type InputSize = "sm" | "md" | "lg";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  size?: InputSize;
};

const sizeClass: Record<InputSize, string> = {
  sm: "davinci-input--sm",
  md: "davinci-input--md",
  lg: "davinci-input--lg"
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { "aria-describedby": ariaDescribedBy, "aria-invalid": ariaInvalid, className, disabled, id, required, size = "md", ...props },
  ref
) {
  const ctx = useFormFieldContext();
  return (
    <input
      aria-describedby={ariaDescribedBy ?? ctx?.describedBy}
      aria-invalid={ariaInvalid ?? ctx?.invalid}
      className={cn("davinci-input", sizeClass[size], className)}
      disabled={disabled ?? ctx?.disabled}
      id={id ?? ctx?.controlId}
      ref={ref}
      required={required ?? ctx?.required}
      {...props}
    />
  );
});
