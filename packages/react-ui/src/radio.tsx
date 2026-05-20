import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useMemo,
  type ChangeEvent,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode
} from "react";
import { useFormFieldContext } from "./form-field-context.js";
import { cn } from "./utils.js";

export type RadioSize = "sm" | "md";

type RadioGroupContextValue = {
  name: string;
  value: string | undefined;
  onChange: ((value: string) => void) | undefined;
  disabled: boolean;
  invalid: boolean;
  required: boolean;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export type RadioGroupProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  orientation?: "horizontal" | "vertical";
};

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  {
    children,
    className,
    disabled = false,
    invalid = false,
    name,
    onValueChange,
    orientation = "vertical",
    required = false,
    value,
    ...props
  },
  ref
) {
  const ctx = useFormFieldContext();
  const generatedName = useId();
  const groupName = name ?? generatedName;

  const groupValue = useMemo<RadioGroupContextValue>(
    () => ({
      name: groupName,
      value,
      onChange: onValueChange,
      disabled: disabled || (ctx?.disabled ?? false),
      invalid: invalid || (ctx?.invalid ?? false),
      required: required || (ctx?.required ?? false)
    }),
    [groupName, value, onValueChange, disabled, invalid, required, ctx?.disabled, ctx?.invalid, ctx?.required]
  );

  return (
    <RadioGroupContext.Provider value={groupValue}>
      <div
        aria-describedby={ctx?.describedBy}
        aria-invalid={groupValue.invalid || undefined}
        className={cn(
          "davinci-radio-group",
          orientation === "horizontal" && "davinci-radio-group--horizontal",
          className
        )}
        ref={ref}
        role="radiogroup"
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
});

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "children"> & {
  size?: RadioSize;
  label?: ReactNode;
  value: string;
};

const sizeClass: Record<RadioSize, string> = {
  sm: "davinci-radio--sm",
  md: "davinci-radio--md"
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  {
    "aria-invalid": ariaInvalid,
    checked,
    className,
    disabled,
    label,
    name,
    onChange,
    required,
    size = "md",
    value,
    ...props
  },
  ref
) {
  const group = useContext(RadioGroupContext);
  const resolvedDisabled = disabled ?? group?.disabled ?? false;
  const resolvedInvalid = ariaInvalid ?? group?.invalid;
  const resolvedRequired = required ?? group?.required;
  const resolvedName = name ?? group?.name;
  const resolvedChecked = checked ?? (group ? group.value === value : undefined);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event);
    if (group && event.target.checked) {
      group.onChange?.(value);
    }
  }

  return (
    <label className={cn("davinci-radio", sizeClass[size], className)} data-disabled={resolvedDisabled || undefined}>
      <input
        aria-invalid={resolvedInvalid}
        checked={resolvedChecked}
        className="davinci-radio__input"
        disabled={resolvedDisabled}
        name={resolvedName}
        onChange={handleChange}
        ref={ref}
        required={resolvedRequired}
        type="radio"
        value={value}
        {...props}
      />
      <span aria-hidden="true" className="davinci-radio__visual">
        <span className="davinci-radio__dot" />
      </span>
      {label !== undefined && <span className="davinci-radio__label">{label}</span>}
    </label>
  );
});
