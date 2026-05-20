import { forwardRef, type SelectHTMLAttributes } from "react";
import { useFormFieldContext } from "./form-field-context.js";
import { cn } from "./utils.js";

export type SelectSize = "sm" | "md" | "lg";

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> & {
  size?: SelectSize;
};

const sizeClass: Record<SelectSize, string> = {
  sm: "davinci-select--sm",
  md: "davinci-select--md",
  lg: "davinci-select--lg"
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { "aria-describedby": ariaDescribedBy, "aria-invalid": ariaInvalid, className, disabled, id, required, size = "md", ...props },
  ref
) {
  const ctx = useFormFieldContext();
  return (
    <select
      aria-describedby={ariaDescribedBy ?? ctx?.describedBy}
      aria-invalid={ariaInvalid ?? ctx?.invalid}
      className={cn("davinci-select", sizeClass[size], className)}
      disabled={disabled ?? ctx?.disabled}
      id={id ?? ctx?.controlId}
      ref={ref}
      required={required ?? ctx?.required}
      {...props}
    />
  );
});
