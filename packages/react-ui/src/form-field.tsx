import { forwardRef, useId, useMemo, type HTMLAttributes } from "react";
import { FormFieldContext, type FormFieldContextValue, useFormFieldContext } from "./form-field-context.js";
import { cn } from "./utils.js";

export type FormFieldProps = HTMLAttributes<HTMLDivElement> & {
  id?: string;
  invalid?: boolean;
  disabled?: boolean;
  required?: boolean;
};

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(function FormField(
  { children, className, disabled = false, id, invalid = false, required = false, ...props },
  ref
) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const helpId = `${controlId}-help`;
  const errorId = `${controlId}-error`;
  const describedBy = invalid ? errorId : helpId;

  const value = useMemo<FormFieldContextValue>(
    () => ({
      controlId,
      helpId,
      errorId,
      invalid,
      disabled,
      required,
      describedBy
    }),
    [controlId, helpId, errorId, invalid, disabled, required, describedBy]
  );

  return (
    <FormFieldContext.Provider value={value}>
      <div
        className={cn("davinci-form-field", invalid && "davinci-form-field--invalid", className)}
        data-disabled={disabled || undefined}
        data-invalid={invalid || undefined}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    </FormFieldContext.Provider>
  );
});

export type FormHelpTextProps = HTMLAttributes<HTMLParagraphElement>;

export const FormHelpText = forwardRef<HTMLParagraphElement, FormHelpTextProps>(function FormHelpText(
  { className, id, ...props },
  ref
) {
  const ctx = useFormFieldContext();
  if (ctx?.invalid) return null;
  return (
    <p className={cn("davinci-form-field__help", className)} id={id ?? ctx?.helpId} ref={ref} {...props} />
  );
});

FormHelpText.displayName = "FormHelpText";

export type FormErrorTextProps = HTMLAttributes<HTMLParagraphElement>;

export const FormErrorText = forwardRef<HTMLParagraphElement, FormErrorTextProps>(function FormErrorText(
  { className, id, role = "alert", ...props },
  ref
) {
  const ctx = useFormFieldContext();
  if (ctx && !ctx.invalid) return null;
  return (
    <p className={cn("davinci-form-field__error", className)} id={id ?? ctx?.errorId} ref={ref} role={role} {...props} />
  );
});

FormErrorText.displayName = "FormErrorText";
