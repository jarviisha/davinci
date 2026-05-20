import {
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type HTMLAttributes,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type KeyboardEvent as ReactKeyboardEvent
} from "react";
import { createPortal } from "react-dom";
import { cn } from "./utils.js";

export type DropdownMenuAlign = "start" | "end";

export type DropdownMenuProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  align?: DropdownMenuAlign;
  children?: ReactNode;
  defaultOpen?: boolean;
  menuLabel?: string;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  trigger: ReactElement<DropdownMenuTriggerProps>;
};

type DropdownMenuTriggerProps = {
  "aria-controls"?: string;
  "aria-expanded"?: boolean;
  "aria-haspopup"?: "menu";
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onKeyDown?: (event: ReactKeyboardEvent<HTMLElement>) => void;
  ref?: React.Ref<HTMLElement>;
};

type MenuPosition = CSSProperties & {
  minInlineSize: number;
};

export function DropdownMenu({
  align = "start",
  children,
  defaultOpen = false,
  menuLabel,
  onOpenChange,
  open: openProp,
  trigger
}: DropdownMenuProps) {
  const triggerRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuId = useId();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState<MenuPosition | null>(null);
  const controlled = openProp !== undefined;
  const open = controlled ? openProp : internalOpen;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, align]);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpen(false);
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function setOpen(nextOpen: boolean) {
    if (!controlled) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  }

  function updatePosition() {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition({
      insetBlockStart: rect.bottom + 6,
      insetInlineStart: align === "end" ? undefined : rect.left,
      insetInlineEnd: align === "end" ? window.innerWidth - rect.right : undefined,
      minInlineSize: rect.width
    });
  }

  const triggerNode = isValidElement<DropdownMenuTriggerProps>(trigger)
    ? cloneElement(trigger, {
        "aria-controls": open ? menuId : undefined,
        "aria-expanded": open,
        "aria-haspopup": "menu",
        onClick: (event: MouseEvent<HTMLElement>) => {
          trigger.props.onClick?.(event);
          if (!event.defaultPrevented) setOpen(!open);
        },
        onKeyDown: (event: ReactKeyboardEvent<HTMLElement>) => {
          trigger.props.onKeyDown?.(event);
          if (event.defaultPrevented) return;
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
            window.setTimeout(() => {
              menuRef.current?.querySelector<HTMLButtonElement>('[role="menuitem"]:not(:disabled)')?.focus();
            }, 0);
          }
        },
        ref: (node: HTMLElement | null) => {
          triggerRef.current = node;
          const childRef = trigger.props.ref;
          if (typeof childRef === "function") childRef(node);
          else if (childRef) (childRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }
      })
    : trigger;

  const menu =
    mounted && open && position
      ? createPortal(
          <div
            aria-label={menuLabel}
            className="davinci-dropdown-menu__content"
            id={menuId}
            onClick={(event) => {
              const target = event.target as HTMLElement;
              if (target.closest("[data-davinci-dropdown-close]")) {
                setOpen(false);
                triggerRef.current?.focus();
              }
            }}
            onKeyDown={(event) => {
              const items = Array.from(
                event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)')
              );
              const currentIndex = items.indexOf(document.activeElement as HTMLButtonElement);
              if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault();
                const nextIndex =
                  event.key === "ArrowDown"
                    ? (currentIndex + 1) % items.length
                    : (currentIndex - 1 + items.length) % items.length;
                items[nextIndex]?.focus();
              }
              if (event.key === "Home") {
                event.preventDefault();
                items[0]?.focus();
              }
              if (event.key === "End") {
                event.preventDefault();
                items[items.length - 1]?.focus();
              }
            }}
            ref={menuRef}
            role="menu"
            style={position}
          >
            {children}
          </div>,
          document.body
        )
      : null;

  return (
    <>
      {triggerNode}
      {menu}
    </>
  );
}

export type DropdownMenuItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  inset?: boolean;
};

export const DropdownMenuItem = forwardRef<HTMLButtonElement, DropdownMenuItemProps>(function DropdownMenuItem(
  { className, inset = false, type = "button", ...props },
  ref
) {
  return (
    <button
      className={cn("davinci-dropdown-menu__item", inset ? "davinci-dropdown-menu__item--inset" : null, className)}
      data-davinci-dropdown-close=""
      ref={ref}
      role="menuitem"
      type={type}
      {...props}
    />
  );
});

export type DropdownMenuLabelProps = HTMLAttributes<HTMLDivElement>;

export const DropdownMenuLabel = forwardRef<HTMLDivElement, DropdownMenuLabelProps>(function DropdownMenuLabel(
  { className, ...props },
  ref
) {
  return <div className={cn("davinci-dropdown-menu__label", className)} ref={ref} role="presentation" {...props} />;
});

export type DropdownMenuSeparatorProps = HTMLAttributes<HTMLDivElement>;

export const DropdownMenuSeparator = forwardRef<HTMLDivElement, DropdownMenuSeparatorProps>(
  function DropdownMenuSeparator({ className, ...props }, ref) {
    return <div className={cn("davinci-dropdown-menu__separator", className)} ref={ref} role="separator" {...props} />;
  }
);
