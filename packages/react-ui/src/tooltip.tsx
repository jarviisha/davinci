import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type HTMLAttributes,
  type MouseEvent,
  type ReactElement,
  type ReactNode
} from "react";
import { createPortal } from "react-dom";
import { cn } from "./utils.js";

export type TooltipPlacement = "top" | "bottom";

export type TooltipProps = Omit<HTMLAttributes<HTMLSpanElement>, "content"> & {
  children: ReactElement<TooltipChildProps>;
  content: ReactNode;
  placement?: TooltipPlacement;
};

type TooltipChildProps = {
  "aria-describedby"?: string;
  onBlur?: (event: FocusEvent<HTMLElement>) => void;
  onFocus?: (event: FocusEvent<HTMLElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLElement>) => void;
  ref?: React.Ref<HTMLElement>;
};

type TooltipPosition = CSSProperties & {
  "--davinci-tooltip-arrow-offset": string;
};

export function Tooltip({ children, className, content, placement = "top", ...props }: TooltipProps) {
  const id = useId();
  const triggerRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<TooltipPosition | null>(null);

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
  }, [open, placement]);

  function updatePosition() {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition({
      "--davinci-tooltip-arrow-offset": `${rect.width / 2}px`,
      insetBlockStart: placement === "top" ? rect.top - 8 : rect.bottom + 8,
      insetInlineStart: rect.left + rect.width / 2,
      transform: placement === "top" ? "translate(-50%, -100%)" : "translate(-50%, 0)"
    });
  }

  const trigger = isValidElement<TooltipChildProps>(children)
    ? cloneElement(children, {
        "aria-describedby": open ? id : undefined,
        onBlur: (event: FocusEvent<HTMLElement>) => {
          children.props.onBlur?.(event);
          setOpen(false);
        },
        onFocus: (event: FocusEvent<HTMLElement>) => {
          children.props.onFocus?.(event);
          setOpen(true);
        },
        onMouseEnter: (event: MouseEvent<HTMLElement>) => {
          children.props.onMouseEnter?.(event);
          setOpen(true);
        },
        onMouseLeave: (event: MouseEvent<HTMLElement>) => {
          children.props.onMouseLeave?.(event);
          setOpen(false);
        },
        ref: (node: HTMLElement | null) => {
          triggerRef.current = node;
          const childRef = children.props.ref;
          if (typeof childRef === "function") childRef(node);
          else if (childRef) (childRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }
      })
    : children;

  return (
    <>
      <span className={cn("davinci-tooltip__anchor", className)} {...props}>
        {trigger}
      </span>
      {mounted && open && position
        ? createPortal(
            <div className="davinci-tooltip" data-placement={placement} id={id} role="tooltip" style={position}>
              {content}
            </div>,
            document.body
          )
        : null}
    </>
  );
}
