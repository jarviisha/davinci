import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode
} from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "./use-focus-trap.js";
import { cn } from "./utils.js";

export type DrawerSide = "right" | "left";
export type DrawerSize = "sm" | "md" | "lg";

type DrawerContextValue = {
  titleId: string;
  descriptionId: string;
  setHasTitle: (value: boolean) => void;
  setHasDescription: (value: boolean) => void;
};

const DrawerContext = createContext<DrawerContextValue | null>(null);

export type DrawerProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  children?: ReactNode;
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  side?: DrawerSide;
  size?: DrawerSize;
};

const sideClass: Record<DrawerSide, string> = {
  right: "davinci-drawer--right",
  left: "davinci-drawer--left"
};

const sizeClass: Record<DrawerSize, string> = {
  sm: "davinci-drawer--sm",
  md: "davinci-drawer--md",
  lg: "davinci-drawer--lg"
};

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(function Drawer(
  {
    children,
    className,
    closeOnEscape = true,
    closeOnOverlayClick = true,
    onOpenChange,
    open,
    side = "right",
    size = "md",
    ...props
  },
  ref
) {
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const descriptionId = `${baseId}-description`;
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [hasTitle, setHasTitle] = useState(false);
  const [hasDescription, setHasDescription] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open || !closeOnEscape) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        onOpenChange(false);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, closeOnEscape, onOpenChange]);

  useFocusTrap(panelRef, open);

  function handleBackdropClick(event: MouseEvent<HTMLDivElement>) {
    if (!closeOnOverlayClick) return;
    if (event.target === event.currentTarget) onOpenChange(false);
  }

  if (!mounted || !open) return null;

  const node = (
    <DrawerContext.Provider value={{ titleId, descriptionId, setHasTitle, setHasDescription }}>
      <div className="davinci-drawer-backdrop" data-state="open" onMouseDown={handleBackdropClick}>
        <div
          aria-describedby={hasDescription ? descriptionId : undefined}
          aria-labelledby={hasTitle ? titleId : undefined}
          aria-modal="true"
          className={cn("davinci-drawer", sideClass[side], sizeClass[size], className)}
          data-state="open"
          ref={(node) => {
            panelRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }}
          role="dialog"
          {...props}
        >
          {children}
        </div>
      </div>
    </DrawerContext.Provider>
  );

  return createPortal(node, document.body);
});

export type DrawerHeaderProps = HTMLAttributes<HTMLDivElement>;
export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(function DrawerHeader(
  { className, ...props },
  ref
) {
  return <div className={cn("davinci-drawer__header", className)} ref={ref} {...props} />;
});

export type DrawerTitleProps = HTMLAttributes<HTMLHeadingElement>;
export const DrawerTitle = forwardRef<HTMLHeadingElement, DrawerTitleProps>(function DrawerTitle(
  { className, id, ...props },
  ref
) {
  const ctx = useContext(DrawerContext);
  useEffect(() => {
    if (!ctx) return;
    ctx.setHasTitle(true);
    return () => ctx.setHasTitle(false);
  }, [ctx]);
  return <h2 className={cn("davinci-drawer__title", className)} id={id ?? ctx?.titleId} ref={ref} {...props} />;
});

export type DrawerDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
export const DrawerDescription = forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(
  function DrawerDescription({ className, id, ...props }, ref) {
    const ctx = useContext(DrawerContext);
    useEffect(() => {
      if (!ctx) return;
      ctx.setHasDescription(true);
      return () => ctx.setHasDescription(false);
    }, [ctx]);
    return <p className={cn("davinci-drawer__description", className)} id={id ?? ctx?.descriptionId} ref={ref} {...props} />;
  }
);

export type DrawerContentProps = HTMLAttributes<HTMLDivElement>;
export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(function DrawerContent(
  { className, ...props },
  ref
) {
  return <div className={cn("davinci-drawer__content", className)} ref={ref} {...props} />;
});

export type DrawerFooterProps = HTMLAttributes<HTMLDivElement>;
export const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(function DrawerFooter(
  { className, ...props },
  ref
) {
  return <div className={cn("davinci-drawer__footer", className)} ref={ref} {...props} />;
});
