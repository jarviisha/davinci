import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode
} from "react";
import { createPortal } from "react-dom";
import { cn } from "./utils.js";

export type PopoverAlign = "start" | "end";

export type PopoverProps = Omit<HTMLAttributes<HTMLDivElement>, "content" | "onChange"> & {
  align?: PopoverAlign;
  children: ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  trigger: ReactElement<PopoverTriggerProps>;
};

type PopoverTriggerProps = {
  "aria-controls"?: string;
  "aria-expanded"?: boolean;
  "aria-haspopup"?: "dialog";
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onKeyDown?: (event: ReactKeyboardEvent<HTMLElement>) => void;
  ref?: React.Ref<HTMLElement>;
};

type PopoverPosition = CSSProperties & {
  minInlineSize: number;
};

export function Popover({
  align = "start",
  children,
  className,
  defaultOpen = false,
  onOpenChange,
  open: openProp,
  trigger,
  ...props
}: PopoverProps) {
  const triggerRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const panelId = useId();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState<PopoverPosition | null>(null);
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
      if (triggerRef.current?.contains(target) || panelRef.current?.contains(target)) return;
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
      insetBlockStart: rect.bottom + 8,
      insetInlineStart: align === "end" ? undefined : rect.left,
      insetInlineEnd: align === "end" ? window.innerWidth - rect.right : undefined,
      minInlineSize: rect.width
    });
  }

  const triggerNode = isValidElement<PopoverTriggerProps>(trigger)
    ? cloneElement(trigger, {
        "aria-controls": open ? panelId : undefined,
        "aria-expanded": open,
        "aria-haspopup": "dialog",
        onClick: (event: MouseEvent<HTMLElement>) => {
          trigger.props.onClick?.(event);
          if (!event.defaultPrevented) setOpen(!open);
        },
        onKeyDown: (event: ReactKeyboardEvent<HTMLElement>) => {
          trigger.props.onKeyDown?.(event);
          if (event.defaultPrevented) return;
          if (event.key === "Escape") setOpen(false);
        },
        ref: (node: HTMLElement | null) => {
          triggerRef.current = node;
          const childRef = trigger.props.ref;
          if (typeof childRef === "function") childRef(node);
          else if (childRef) (childRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }
      })
    : trigger;

  const panel =
    mounted && open && position
      ? createPortal(
          <div
            className={cn("davinci-popover", className)}
            id={panelId}
            ref={panelRef}
            role="dialog"
            style={position}
            {...props}
          >
            {children}
          </div>,
          document.body
        )
      : null;

  return (
    <>
      {triggerNode}
      {panel}
    </>
  );
}
