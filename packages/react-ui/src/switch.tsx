import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { useFormFieldContext } from "./form-field-context.js";
import { cn } from "./utils.js";

export type SwitchSize = "sm" | "md";

export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "children"> & {
  size?: SwitchSize;
  label?: ReactNode;
};

const sizeClass: Record<SwitchSize, string> = {
  sm: "davinci-switch--sm",
  md: "davinci-switch--md"
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    className,
    disabled,
    id,
    label,
    required,
    role = "switch",
    size = "md",
    ...props
  },
  ref
) {
  const ctx = useFormFieldContext();
  const resolvedDisabled = disabled ?? ctx?.disabled;
  return (
    <label className={cn("davinci-switch", sizeClass[size], className)} data-disabled={resolvedDisabled || undefined}>
      <input
        aria-describedby={ariaDescribedBy ?? ctx?.describedBy}
        aria-invalid={ariaInvalid ?? ctx?.invalid}
        className="davinci-switch__input"
        disabled={resolvedDisabled}
        id={id ?? ctx?.controlId}
        ref={ref}
        required={required ?? ctx?.required}
        role={role}
        type="checkbox"
        {...props}
      />
      <span aria-hidden="true" className="davinci-switch__track">
        <span className="davinci-switch__thumb" />
      </span>
      {label !== undefined && <span className="davinci-switch__label">{label}</span>}
    </label>
  );
});
