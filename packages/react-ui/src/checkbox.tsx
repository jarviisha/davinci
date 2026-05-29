import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ChangeEvent,
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
    checked,
    className,
    defaultChecked,
    disabled,
    id,
    indeterminate = false,
    label,
    onChange,
    required,
    size = "md",
    ...props
  },
  ref
) {
  const ctx = useFormFieldContext();
  const inputRef = useRef<HTMLInputElement | null>(null);
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, []);

  // Track checked state so we can render only the matching icon. The input
  // stays controlled/uncontrolled exactly as the caller specified; this state
  // just mirrors it for the visual glyph.
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked ?? false);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : uncontrolledChecked;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUncontrolledChecked(event.target.checked);
    }
    onChange?.(event);
  };

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
        checked={checked}
        className="davinci-checkbox__input"
        defaultChecked={defaultChecked}
        disabled={resolvedDisabled}
        id={resolvedId}
        onChange={handleChange}
        ref={inputRef}
        required={resolvedRequired}
        type="checkbox"
        {...props}
      />
      <span aria-hidden="true" className="davinci-checkbox__visual">
        {indeterminate ? (
          <MinusIcon className="davinci-checkbox__mixed" />
        ) : isChecked ? (
          <CheckIcon className="davinci-checkbox__check" />
        ) : null}
      </span>
      {label !== undefined && <span className="davinci-checkbox__label">{label}</span>}
    </label>
  );
});
