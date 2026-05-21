import {
  forwardRef,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode
} from "react";
import { ChevronRightIcon } from "./icons/index.js";
import { cn } from "./utils.js";

export type NavOrientation = "vertical" | "horizontal";

export type NavProps = HTMLAttributes<HTMLElement> & {
  orientation?: NavOrientation;
};

export const Nav = forwardRef<HTMLElement, NavProps>(function Nav(
  { className, orientation = "vertical", ...props },
  ref
) {
  return (
    <nav
      className={cn(
        "davinci-nav",
        orientation === "horizontal" ? "davinci-nav--horizontal" : null,
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

export type NavItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
};

export const NavItem = forwardRef<HTMLButtonElement, NavItemProps>(function NavItem(
  {
    active,
    "aria-current": ariaCurrent,
    children,
    className,
    endAdornment,
    startAdornment,
    type = "button",
    ...props
  },
  ref
) {
  return (
    <button
      aria-current={active ? ariaCurrent ?? "page" : ariaCurrent}
      className={cn("davinci-nav-item", className)}
      ref={ref}
      type={type}
      {...props}
    >
      {startAdornment ? <span className="davinci-nav-item__start">{startAdornment}</span> : null}
      <span className="davinci-nav-item__label">{children}</span>
      {endAdornment ? <span className="davinci-nav-item__end">{endAdornment}</span> : null}
    </button>
  );
});

export type NavGroupProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  label: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const NavGroup = forwardRef<HTMLDivElement, NavGroupProps>(function NavGroup(
  {
    children,
    className,
    defaultOpen = true,
    label,
    onOpenChange,
    open: openProp,
    ...props
  },
  ref
) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : internalOpen;
  const itemsId = useId();

  const handleToggle = () => {
    const next = !open;
    if (!isControlled) {
      setInternalOpen(next);
    }
    onOpenChange?.(next);
  };

  return (
    <div
      className={cn("davinci-nav-group", className)}
      data-state={open ? "open" : "closed"}
      ref={ref}
      {...props}
    >
      <button
        aria-controls={itemsId}
        aria-expanded={open}
        className="davinci-nav-group__header"
        onClick={handleToggle}
        type="button"
      >
        <span className="davinci-nav-group__label">{label}</span>
        <ChevronRightIcon className="davinci-nav-group__chevron" />
      </button>
      <div className="davinci-nav-group__items" hidden={!open} id={itemsId}>
        {children}
      </div>
    </div>
  );
});
