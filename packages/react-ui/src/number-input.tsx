import { forwardRef, useCallback, useRef, type InputHTMLAttributes } from "react";
import { useFormFieldContext } from "./form-field-context.js";
import { ChevronDownIcon, ChevronUpIcon } from "./icons/index.js";
import { cn } from "./utils.js";

export type NumberInputSize = "sm" | "md" | "lg";

export type NumberInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> & {
  decrementLabel?: string;
  incrementLabel?: string;
  size?: NumberInputSize;
};

const sizeClass: Record<NumberInputSize, string> = {
  sm: "davinci-number-input--sm",
  md: "davinci-number-input--md",
  lg: "davinci-number-input--lg"
};

/**
 * Programmatically set an input's value so React's onChange fires for both
 * controlled and uncontrolled inputs. stepUp/stepDown mutate the value but do
 * not dispatch the input event React listens for, so we re-set through the
 * native value setter and dispatch it ourselves.
 */
function dispatchValue(input: HTMLInputElement) {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
  setter?.call(input, input.value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
  {
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    className,
    decrementLabel = "Decrement",
    disabled,
    id,
    incrementLabel = "Increment",
    required,
    size = "md",
    ...props
  },
  ref
) {
  const ctx = useFormFieldContext();
  const innerRef = useRef<HTMLInputElement>(null);
  const isDisabled = disabled ?? ctx?.disabled;

  const setRef = useCallback(
    (node: HTMLInputElement | null) => {
      innerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );

  const step = useCallback((direction: "up" | "down") => {
    const input = innerRef.current;
    if (!input || input.disabled) return;
    if (direction === "up") input.stepUp();
    else input.stepDown();
    dispatchValue(input);
  }, []);

  return (
    <span className={cn("davinci-number-input", sizeClass[size], className)}>
      <input
        aria-describedby={ariaDescribedBy ?? ctx?.describedBy}
        aria-invalid={ariaInvalid ?? ctx?.invalid}
        className="davinci-number-input__control"
        disabled={isDisabled}
        id={id ?? ctx?.controlId}
        ref={setRef}
        required={required ?? ctx?.required}
        type="number"
        {...props}
      />
      <span className="davinci-number-input__steppers">
        <button
          aria-label={incrementLabel}
          className="davinci-number-input__stepper"
          disabled={isDisabled}
          onClick={() => step("up")}
          tabIndex={-1}
          type="button"
        >
          <ChevronUpIcon />
        </button>
        <button
          aria-label={decrementLabel}
          className="davinci-number-input__stepper"
          disabled={isDisabled}
          onClick={() => step("down")}
          tabIndex={-1}
          type="button"
        >
          <ChevronDownIcon />
        </button>
      </span>
    </span>
  );
});
