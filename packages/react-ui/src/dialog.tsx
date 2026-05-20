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

export type DialogSize = "sm" | "md" | "lg";

type DialogContextValue = {
  titleId: string;
  descriptionId: string;
  setHasTitle: (value: boolean) => void;
  setHasDescription: (value: boolean) => void;
};

const DialogContext = createContext<DialogContextValue | null>(null);

export type DialogProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  size?: DialogSize;
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  children?: ReactNode;
};

const sizeClass: Record<DialogSize, string> = {
  sm: "davinci-dialog--sm",
  md: "davinci-dialog--md",
  lg: "davinci-dialog--lg"
};

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  {
    children,
    className,
    closeOnEscape = true,
    closeOnOverlayClick = true,
    onOpenChange,
    open,
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

  useEffect(() => {
    setMounted(true);
  }, []);

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
    if (event.target === event.currentTarget) {
      onOpenChange(false);
    }
  }

  if (!mounted || !open) return null;

  const contextValue: DialogContextValue = {
    titleId,
    descriptionId,
    setHasTitle,
    setHasDescription
  };

  const node = (
    <DialogContext.Provider value={contextValue}>
      <div className="davinci-dialog-backdrop" data-state="open" onMouseDown={handleBackdropClick}>
        <div
          aria-describedby={hasDescription ? descriptionId : undefined}
          aria-labelledby={hasTitle ? titleId : undefined}
          aria-modal="true"
          className={cn("davinci-dialog", sizeClass[size], className)}
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
    </DialogContext.Provider>
  );

  return createPortal(node, document.body);
});

export type DialogHeaderProps = HTMLAttributes<HTMLDivElement>;

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(function DialogHeader(
  { className, ...props },
  ref
) {
  return <div className={cn("davinci-dialog__header", className)} ref={ref} {...props} />;
});

export type DialogTitleProps = HTMLAttributes<HTMLHeadingElement>;

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(function DialogTitle(
  { className, id, ...props },
  ref
) {
  const ctx = useContext(DialogContext);
  useEffect(() => {
    if (!ctx) return;
    ctx.setHasTitle(true);
    return () => ctx.setHasTitle(false);
  }, [ctx]);
  return <h2 className={cn("davinci-dialog__title", className)} id={id ?? ctx?.titleId} ref={ref} {...props} />;
});

export type DialogDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(function DialogDescription(
  { className, id, ...props },
  ref
) {
  const ctx = useContext(DialogContext);
  useEffect(() => {
    if (!ctx) return;
    ctx.setHasDescription(true);
    return () => ctx.setHasDescription(false);
  }, [ctx]);
  return (
    <p className={cn("davinci-dialog__description", className)} id={id ?? ctx?.descriptionId} ref={ref} {...props} />
  );
});

export type DialogContentProps = HTMLAttributes<HTMLDivElement>;

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(function DialogContent(
  { className, ...props },
  ref
) {
  return <div className={cn("davinci-dialog__content", className)} ref={ref} {...props} />;
});

export type DialogFooterProps = HTMLAttributes<HTMLDivElement>;

export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(function DialogFooter(
  { className, ...props },
  ref
) {
  return <div className={cn("davinci-dialog__footer", className)} ref={ref} {...props} />;
});
