import {
  forwardRef,
  useId,
  useMemo,
  useRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode
} from "react";
import { cn } from "./utils.js";

export type ComboboxOption = {
  disabled?: boolean;
  label: string;
  value: string;
};

export type ComboboxSize = "sm" | "md" | "lg";

export type ComboboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "size" | "value"> & {
  emptyText?: ReactNode;
  onValueChange: (value: string) => void;
  options: ComboboxOption[];
  size?: ComboboxSize;
  value: string;
};

const sizeClass: Record<ComboboxSize, string> = {
  sm: "davinci-combobox--sm",
  md: "davinci-combobox--md",
  lg: "davinci-combobox--lg"
};

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(function Combobox(
  {
    className,
    disabled,
    emptyText = "No results found.",
    onBlur,
    onFocus,
    onKeyDown,
    onValueChange,
    options,
    placeholder = "Select option",
    size = "md",
    value,
    ...props
  },
  ref
) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const selected = options.find((option) => option.value === value);
  const inputValue = open ? query : selected?.label ?? "";
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return options;
    return options.filter((option) => option.label.toLowerCase().includes(normalized));
  }, [options, query]);

  function commit(option: ComboboxOption) {
    if (option.disabled) return;
    onValueChange(option.value);
    setQuery("");
    setOpen(false);
  }

  return (
    <div className={cn("davinci-combobox", sizeClass[size], className)} ref={rootRef}>
      <input
        aria-activedescendant={open && filtered[activeIndex] ? `${listboxId}-${filtered[activeIndex].value}` : undefined}
        aria-autocomplete="list"
        aria-controls={listboxId}
        aria-expanded={open}
        className="davinci-combobox__input"
        disabled={disabled}
        onBlur={(event) => {
          onBlur?.(event);
          window.setTimeout(() => {
            if (!rootRef.current?.contains(document.activeElement)) {
              setOpen(false);
              setQuery("");
            }
          }, 0);
        }}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
          setActiveIndex(0);
        }}
        onFocus={(event) => {
          onFocus?.(event);
          setOpen(true);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) return;
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
            setActiveIndex((index) => Math.min(index + 1, Math.max(filtered.length - 1, 0)));
          }
          if (event.key === "ArrowUp") {
            event.preventDefault();
            setActiveIndex((index) => Math.max(index - 1, 0));
          }
          if (event.key === "Enter" && open && filtered[activeIndex]) {
            event.preventDefault();
            commit(filtered[activeIndex]);
          }
          if (event.key === "Escape") {
            event.preventDefault();
            setOpen(false);
            setQuery("");
          }
        }}
        placeholder={placeholder}
        ref={ref}
        role="combobox"
        value={inputValue}
        {...props}
      />
      <span aria-hidden="true" className="davinci-combobox__chevron">
        <svg
          fill="none"
          height="16"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 16 16"
          width="16"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </span>
      {open ? (
        <div className="davinci-combobox__listbox" id={listboxId} role="listbox">
          {filtered.length > 0 ? (
            filtered.map((option, index) => (
              <button
                aria-disabled={option.disabled}
                aria-selected={option.value === value}
                className="davinci-combobox__option"
                disabled={option.disabled}
                id={`${listboxId}-${option.value}`}
                key={option.value}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => commit(option)}
                role="option"
                type="button"
                data-active={index === activeIndex ? "" : undefined}
              >
                {option.label}
              </button>
            ))
          ) : (
            <div className="davinci-combobox__empty">{emptyText}</div>
          )}
        </div>
      ) : null}
    </div>
  );
});
