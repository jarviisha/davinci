import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type InputHTMLAttributes,
  type ReactNode
} from "react";
import { useFormFieldContext } from "./form-field-context.js";
import { CheckIcon, MinusIcon } from "./icons/index.js";
import { cn } from "./utils.js";

export type CheckboxSize = "sm" | "md";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "children"> & {
  size?: CheckboxSize;
  label?: ReactNode;
  indeterminate?: boolean;
};

const sizeClass: Record<CheckboxSize, string> = {
  sm: "davinci-checkbox--sm",
  md: "davinci-checkbox--md"
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    className,
    disabled,
    id,
    indeterminate = false,
    label,
    required,
    size = "md",
    ...props
  },
  ref
) {
  const ctx = useFormFieldContext();
  const inputRef = useRef<HTMLInputElement | null>(null);
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const resolvedInvalid = ariaInvalid ?? ctx?.invalid;
  const resolvedDisabled = disabled ?? ctx?.disabled;
  const resolvedId = id ?? ctx?.controlId;
  const resolvedRequired = required ?? ctx?.required;

  return (
    <label className={cn("davinci-checkbox", sizeClass[size], className)} data-disabled={resolvedDisabled || undefined}>
      <input
        aria-describedby={ariaDescribedBy ?? ctx?.describedBy}
        aria-invalid={resolvedInvalid}
        className="davinci-checkbox__input"
        disabled={resolvedDisabled}
        id={resolvedId}
        ref={inputRef}
        required={resolvedRequired}
        type="checkbox"
        {...props}
      />
      <span aria-hidden="true" className="davinci-checkbox__visual">
        <CheckIcon className="davinci-checkbox__check" />
        <MinusIcon className="davinci-checkbox__mixed" />
      </span>
      {label !== undefined && <span className="davinci-checkbox__label">{label}</span>}
    </label>
  );
});
