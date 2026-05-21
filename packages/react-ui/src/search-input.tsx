import { forwardRef, type InputHTMLAttributes } from "react";
import { useFormFieldContext } from "./form-field-context.js";
import { SearchIcon, XIcon } from "./icons/index.js";
import { cn } from "./utils.js";

export type SearchInputSize = "sm" | "md" | "lg";

export type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> & {
  clearLabel?: string;
  onClear?: () => void;
  size?: SearchInputSize;
};

const sizeClass: Record<SearchInputSize, string> = {
  sm: "davinci-search-input--sm",
  md: "davinci-search-input--md",
  lg: "davinci-search-input--lg"
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  {
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    className,
    clearLabel = "Clear search",
    disabled,
    id,
    onChange,
    onClear,
    placeholder = "Search",
    required,
    size = "md",
    value,
    ...props
  },
  ref
) {
  const ctx = useFormFieldContext();
  const canClear = value !== undefined && String(value).length > 0 && !disabled;

  return (
    <span className={cn("davinci-search-input", sizeClass[size], className)}>
      <SearchIcon className="davinci-search-input__icon" />
      <input
        aria-describedby={ariaDescribedBy ?? ctx?.describedBy}
        aria-invalid={ariaInvalid ?? ctx?.invalid}
        className="davinci-search-input__control"
        disabled={disabled ?? ctx?.disabled}
        id={id ?? ctx?.controlId}
        onChange={onChange}
        placeholder={placeholder}
        ref={ref}
        required={required ?? ctx?.required}
        type="search"
        value={value}
        {...props}
      />
      {canClear ? (
        <button
          aria-label={clearLabel}
          className="davinci-search-input__clear"
          onClick={onClear}
          tabIndex={-1}
          type="button"
        >
          <XIcon />
        </button>
      ) : null}
    </span>
  );
});
