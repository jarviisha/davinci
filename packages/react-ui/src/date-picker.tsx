import {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent
} from "react";
import { useFormFieldContext } from "./form-field-context.js";
import { CalendarIcon, ChevronLeftIcon, XIcon } from "./icons/index.js";
import { Popover } from "./popover.js";
import { cn } from "./utils.js";

export type DatePickerSize = "sm" | "md" | "lg";

export type DatePickerProps = {
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  /** Accessible label for the trigger when no FormField label is present. */
  "aria-label"?: string;
  cancelLabel?: string;
  className?: string;
  /** Render a clear button inside the field when a value is set. */
  clearable?: boolean;
  clearLabel?: string;
  confirmLabel?: string;
  /** Uncontrolled initial value. */
  defaultValue?: Date | null;
  disabled?: boolean;
  /** Custom display formatter for the selected date. */
  format?: (date: Date) => string;
  id?: string;
  /** BCP-47 locale for month/weekday names and the default formatter. */
  locale?: string;
  /** Latest selectable date (inclusive). */
  max?: Date;
  /** Earliest selectable date (inclusive). */
  min?: Date;
  hourSelectLabel?: string;
  meridiemSelectLabel?: string;
  /** Granularity of the minute dropdown when `showTime` is on. Defaults to 1. */
  minuteSelectLabel?: string;
  minuteStep?: number;
  monthSelectLabel?: string;
  name?: string;
  nextMonthLabel?: string;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  previousMonthLabel?: string;
  required?: boolean;
  /** Opt-in time picker (hour / minute / AM–PM) below the calendar. Off by default. */
  showTime?: boolean;
  size?: DatePickerSize;
  /** 0 = Sunday, 1 = Monday. */
  weekStartsOn?: 0 | 1;
  /** Controlled value. */
  value?: Date | null;
  yearSelectLabel?: string;
};

const sizeClass: Record<DatePickerSize, string> = {
  sm: "davinci-date-picker--sm",
  md: "davinci-date-picker--md",
  lg: "davinci-date-picker--lg"
};

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}

function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

function isBefore(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}

function isAfter(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() > startOfDay(b).getTime();
}

function clampToRange(date: Date, min?: Date, max?: Date): Date {
  if (min && isBefore(date, min)) return startOfDay(min);
  if (max && isAfter(date, max)) return startOfDay(max);
  return date;
}

function isoDate(date: Date): string {
  const y = String(date.getFullYear()).padStart(4, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Build a 6-week grid (42 cells) covering the given month. */
function buildCalendarGrid(viewMonth: Date, weekStartsOn: 0 | 1): Date[] {
  const firstOfMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
  const offset = (firstOfMonth.getDay() - weekStartsOn + 7) % 7;
  const gridStart = addDays(firstOfMonth, -offset);
  return Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));
}

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(function DatePicker(
  {
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    "aria-label": ariaLabel,
    className,
    cancelLabel = "Cancel",
    clearable = false,
    clearLabel = "Clear date",
    confirmLabel = "OK",
    defaultValue = null,
    disabled,
    format,
    id,
    locale,
    hourSelectLabel = "Hour",
    max,
    meridiemSelectLabel = "AM/PM",
    min,
    minuteSelectLabel = "Minute",
    minuteStep = 1,
    monthSelectLabel = "Month",
    name,
    nextMonthLabel = "Next month",
    onChange,
    placeholder = "Select date",
    previousMonthLabel = "Previous month",
    required,
    showTime = false,
    size = "md",
    weekStartsOn = 0,
    value: valueProp,
    yearSelectLabel = "Year"
  },
  ref
) {
  const ctx = useFormFieldContext();
  const controlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = useState<Date | null>(defaultValue);
  const value = controlled ? valueProp ?? null : internalValue;

  const isDisabled = disabled ?? ctx?.disabled ?? false;
  const isInvalid = ariaInvalid ?? ctx?.invalid;
  const controlId = id ?? ctx?.controlId;
  const describedBy = ariaDescribedBy ?? ctx?.describedBy;
  const isRequired = required ?? ctx?.required;

  const [open, setOpen] = useState(false);
  const [draftValue, setDraftValue] = useState<Date | null>(value);
  const [viewMonth, setViewMonth] = useState<Date>(() => startOfDay(value ?? new Date()));
  const [focusedDate, setFocusedDate] = useState<Date>(() => startOfDay(value ?? new Date()));
  const gridRef = useRef<HTMLDivElement | null>(null);

  const dateFormatter = useMemo(
    () =>
      format ??
      ((date: Date) =>
        new Intl.DateTimeFormat(
          locale,
          showTime ? { dateStyle: "medium", timeStyle: "short" } : { dateStyle: "medium" }
        ).format(date)),
    [format, locale, showTime]
  );
  const dayLabelFormatter = useMemo(() => new Intl.DateTimeFormat(locale, { dateStyle: "full" }), [locale]);

  const weekdayNames = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(locale, { weekday: "narrow" });
    // 2021-08-01 is a Sunday — anchor weekday labels to it.
    return Array.from({ length: 7 }, (_, index) =>
      formatter.format(new Date(2021, 7, 1 + ((index + weekStartsOn) % 7)))
    );
  }, [locale, weekStartsOn]);

  const grid = useMemo(() => buildCalendarGrid(viewMonth, weekStartsOn), [viewMonth, weekStartsOn]);

  // Year range for the select: bounded by min/max when set, otherwise a generous
  // window around the current year, always widened to include the viewed year.
  const viewYear = viewMonth.getFullYear();
  const yearOptions = useMemo(() => {
    const current = new Date().getFullYear();
    const start = Math.min(min ? min.getFullYear() : current - 100, viewYear);
    const end = Math.max(max ? max.getFullYear() : current + 10, viewYear);
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }, [min, max, viewYear]);

  const monthNames = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(locale, { month: "short" });
    return Array.from({ length: 12 }, (_, index) => formatter.format(new Date(2021, index, 1)));
  }, [locale]);

  function isOutOfRange(date: Date): boolean {
    return (min !== undefined && isBefore(date, min)) || (max !== undefined && isAfter(date, max));
  }

  function openCalendar() {
    const anchor = clampToRange(startOfDay(value ?? new Date()), min, max);
    setDraftValue(value);
    setFocusedDate(anchor);
    setViewMonth(new Date(anchor.getFullYear(), anchor.getMonth(), 1));
    setOpen(true);
  }

  function commit(next: Date | null) {
    if (!controlled) setInternalValue(next);
    onChange?.(next);
  }

  // Selecting a day only updates the draft — the value is committed on confirm (OK).
  // In time mode the existing time-of-day is carried over to the new date.
  function selectDate(date: Date) {
    if (isOutOfRange(date)) return;
    const base = showTime ? draftValue : null;
    setDraftValue(
      new Date(date.getFullYear(), date.getMonth(), date.getDate(), base?.getHours() ?? 0, base?.getMinutes() ?? 0)
    );
    setFocusedDate(startOfDay(date));
  }

  function confirmSelection() {
    commit(draftValue ? (showTime ? draftValue : startOfDay(draftValue)) : null);
    setOpen(false);
  }

  // Apply a new hour/minute to the draft, anchoring to the focused day when no date is chosen yet.
  function applyTime(hours24: number, minutes: number) {
    const base = draftValue ?? startOfDay(focusedDate);
    setDraftValue(new Date(base.getFullYear(), base.getMonth(), base.getDate(), hours24, minutes));
  }

  function setMonth(month: number) {
    setViewMonth(new Date(viewMonth.getFullYear(), month, 1));
  }

  function setYear(year: number) {
    setViewMonth(new Date(year, viewMonth.getMonth(), 1));
  }

  function moveFocus(next: Date) {
    setFocusedDate(next);
    if (!isSameMonth(next, viewMonth)) {
      setViewMonth(new Date(next.getFullYear(), next.getMonth(), 1));
    }
  }

  // Move DOM focus to the active day whenever it changes while the calendar is open.
  // The popover panel mounts a frame after `open` flips (it waits for position), so
  // defer the focus to the next frame to ensure the grid exists.
  useEffect(() => {
    if (!open) return;
    const iso = isoDate(focusedDate);
    const frame = requestAnimationFrame(() => {
      gridRef.current?.querySelector<HTMLButtonElement>(`[data-date="${iso}"]`)?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [open, focusedDate]);

  function handleGridKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        moveFocus(addDays(focusedDate, -1));
        break;
      case "ArrowRight":
        event.preventDefault();
        moveFocus(addDays(focusedDate, 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        moveFocus(addDays(focusedDate, -7));
        break;
      case "ArrowDown":
        event.preventDefault();
        moveFocus(addDays(focusedDate, 7));
        break;
      case "Home":
        event.preventDefault();
        moveFocus(addDays(focusedDate, -((focusedDate.getDay() - weekStartsOn + 7) % 7)));
        break;
      case "End":
        event.preventDefault();
        moveFocus(addDays(focusedDate, 6 - ((focusedDate.getDay() - weekStartsOn + 7) % 7)));
        break;
      case "PageUp":
        event.preventDefault();
        moveFocus(addMonthsKeepingDay(focusedDate, event.shiftKey ? -12 : -1));
        break;
      case "PageDown":
        event.preventDefault();
        moveFocus(addMonthsKeepingDay(focusedDate, event.shiftKey ? 12 : 1));
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        selectDate(focusedDate);
        break;
      default:
        break;
    }
  }

  const today = startOfDay(new Date());
  const displayValue = value ? dateFormatter(value) : "";

  const showClear = clearable && value !== null && !isDisabled;

  // Month/year/time dropdowns stay compact (sm) to match the scaled-down calendar popover.
  const innerSelectClass = "davinci-select davinci-select--sm davinci-date-picker__select";

  // Time-of-day parts derived from the draft (defaults to 12:00 AM when no date is set yet).
  const draftHours24 = draftValue ? draftValue.getHours() : 0;
  const draftMinutes = draftValue ? draftValue.getMinutes() : 0;
  const draftMeridiem = draftHours24 >= 12 ? "PM" : "AM";
  const draftHour12 = ((draftHours24 + 11) % 12) + 1;
  const minuteOptions: number[] = [];
  for (let minute = 0; minute < 60; minute += Math.max(1, minuteStep)) minuteOptions.push(minute);
  if (!minuteOptions.includes(draftMinutes)) {
    minuteOptions.push(draftMinutes);
    minuteOptions.sort((a, b) => a - b);
  }
  const pad2 = (n: number) => String(n).padStart(2, "0");

  return (
    <span className={cn("davinci-date-picker", className)}>
      {name ? <input name={name} required={isRequired} type="hidden" value={value ? isoDate(value) : ""} /> : null}
      <Popover
        align="start"
        className="davinci-date-picker__panel"
        onOpenChange={(next) => (next ? openCalendar() : setOpen(false))}
        open={open}
        trigger={
          <button
            aria-describedby={describedBy}
            aria-invalid={isInvalid}
            aria-label={ariaLabel}
            className={cn(
              "davinci-date-picker__trigger",
              sizeClass[size],
              !value && "davinci-date-picker__trigger--placeholder",
              showClear && "davinci-date-picker__trigger--clearable"
            )}
            disabled={isDisabled}
            id={controlId}
            ref={ref}
            type="button"
          >
            <CalendarIcon className="davinci-date-picker__field-icon" />
            <span className="davinci-date-picker__value">{displayValue || placeholder}</span>
          </button>
        }
      >
      <div className="davinci-date-picker__calendar" role="group">
        <div className="davinci-date-picker__header">
          <div className="davinci-date-picker__selects">
            <select
              aria-label={monthSelectLabel}
              className={innerSelectClass}
              onChange={(event) => setMonth(Number(event.target.value))}
              value={viewMonth.getMonth()}
            >
              {monthNames.map((monthName, index) => (
                <option key={monthName} value={index}>
                  {monthName}
                </option>
              ))}
            </select>
            <select
              aria-label={yearSelectLabel}
              className={innerSelectClass}
              onChange={(event) => setYear(Number(event.target.value))}
              value={viewMonth.getFullYear()}
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="davinci-date-picker__nav-group">
            <button
              aria-label={previousMonthLabel}
              className="davinci-date-picker__nav"
              onClick={() => setViewMonth(addMonths(viewMonth, -1))}
              type="button"
            >
              <ChevronLeftIcon className="davinci-date-picker__nav-icon" />
            </button>
            <button
              aria-label={nextMonthLabel}
              className="davinci-date-picker__nav"
              onClick={() => setViewMonth(addMonths(viewMonth, 1))}
              type="button"
            >
              <ChevronLeftIcon className="davinci-date-picker__nav-icon davinci-date-picker__nav-icon--next" />
            </button>
          </div>
        </div>

        <div aria-hidden className="davinci-date-picker__weekdays">
          {weekdayNames.map((weekday, index) => (
            <span className="davinci-date-picker__weekday" key={index}>
              {weekday}
            </span>
          ))}
        </div>

        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <div className="davinci-date-picker__grid" onKeyDown={handleGridKeyDown} ref={gridRef} role="grid">
          {grid.map((date) => {
            const outside = !isSameMonth(date, viewMonth);
            const selected = draftValue !== null && isSameDay(date, draftValue);
            const isToday = isSameDay(date, today);
            const outOfRange = isOutOfRange(date);
            const isFocusTarget = isSameDay(date, focusedDate);
            return (
              <button
                aria-current={isToday ? "date" : undefined}
                aria-label={dayLabelFormatter.format(date)}
                aria-selected={selected}
                className={cn(
                  "davinci-date-picker__day",
                  outside && "davinci-date-picker__day--outside",
                  selected && "davinci-date-picker__day--selected",
                  isToday && !selected && "davinci-date-picker__day--today"
                )}
                data-date={isoDate(date)}
                disabled={outOfRange}
                key={isoDate(date)}
                onClick={() => selectDate(date)}
                role="gridcell"
                tabIndex={isFocusTarget ? 0 : -1}
                type="button"
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>

        {showTime ? (
          <div className="davinci-date-picker__time">
            <select
              aria-label={hourSelectLabel}
              className={innerSelectClass}
              onChange={(event) => applyTime((Number(event.target.value) % 12) + (draftMeridiem === "PM" ? 12 : 0), draftMinutes)}
              value={draftHour12}
            >
              {Array.from({ length: 12 }, (_, index) => index + 1).map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <span className="davinci-date-picker__time-colon">:</span>
            <select
              aria-label={minuteSelectLabel}
              className={innerSelectClass}
              onChange={(event) => applyTime(draftHours24, Number(event.target.value))}
              value={draftMinutes}
            >
              {minuteOptions.map((minute) => (
                <option key={minute} value={minute}>
                  {pad2(minute)}
                </option>
              ))}
            </select>
            <select
              aria-label={meridiemSelectLabel}
              className={innerSelectClass}
              onChange={(event) => applyTime((draftHour12 % 12) + (event.target.value === "PM" ? 12 : 0), draftMinutes)}
              value={draftMeridiem}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        ) : null}

        <div className="davinci-date-picker__footer">
          <button className="davinci-date-picker__action" onClick={() => setOpen(false)} type="button">
            {cancelLabel}
          </button>
          <button
            className="davinci-date-picker__action davinci-date-picker__action--confirm"
            disabled={draftValue === null}
            onClick={confirmSelection}
            type="button"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
      </Popover>
      {showClear ? (
        <button
          aria-label={clearLabel}
          className="davinci-date-picker__clear"
          onClick={() => commit(null)}
          tabIndex={-1}
          type="button"
        >
          <XIcon aria-hidden className="davinci-date-picker__clear-icon" />
        </button>
      ) : null}
    </span>
  );
});

/** Add months while clamping the day to the target month's length (e.g. Jan 31 → Feb 28). */
function addMonthsKeepingDay(date: Date, amount: number): Date {
  const target = new Date(date.getFullYear(), date.getMonth() + amount, 1);
  const daysInTarget = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  return new Date(target.getFullYear(), target.getMonth(), Math.min(date.getDate(), daysInTarget));
}
