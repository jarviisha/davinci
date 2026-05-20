import { forwardRef, type TextareaHTMLAttributes } from "react";
import { useFormFieldContext } from "./form-field-context.js";
import { cn } from "./utils.js";

export type TextareaSize = "sm" | "md" | "lg";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  size?: TextareaSize;
};

const sizeClass: Record<TextareaSize, string> = {
  sm: "davinci-textarea--sm",
  md: "davinci-textarea--md",
  lg: "davinci-textarea--lg"
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    className,
    disabled,
    id,
    required,
    size = "md",
    ...props
  },
  ref
) {
  const ctx = useFormFieldContext();
  return (
    <textarea
      aria-describedby={ariaDescribedBy ?? ctx?.describedBy}
      aria-invalid={ariaInvalid ?? ctx?.invalid}
      className={cn("davinci-textarea", sizeClass[size], className)}
      disabled={disabled ?? ctx?.disabled}
      id={id ?? ctx?.controlId}
      ref={ref}
      required={required ?? ctx?.required}
      {...props}
    />
  );
});
