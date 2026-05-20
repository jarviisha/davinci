import { forwardRef, type LabelHTMLAttributes } from "react";
import { useFormFieldContext } from "./form-field-context.js";
import { cn } from "./utils.js";

export type LabelSize = "sm" | "md" | "lg";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  size?: LabelSize;
  required?: boolean;
};

const sizeClass: Record<LabelSize, string> = {
  sm: "davinci-label--sm",
  md: "davinci-label--md",
  lg: "davinci-label--lg"
};

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { className, htmlFor, required, size = "md", ...props },
  ref
) {
  const ctx = useFormFieldContext();
  const resolvedFor = htmlFor ?? ctx?.controlId;
  const isRequired = required ?? ctx?.required ?? false;
  return (
    <label
      className={cn("davinci-label", sizeClass[size], isRequired && "davinci-label--required", className)}
      htmlFor={resolvedFor}
      ref={ref}
      {...props}
    />
  );
});
