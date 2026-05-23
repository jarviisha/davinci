import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type AnimationEvent,
  type ReactNode
} from "react";
import { createPortal } from "react-dom";
import { XIcon } from "./icons/index.js";
import { cn } from "./utils.js";

export type ToastVariant = "info" | "success" | "warning" | "danger";

export type ToastPosition = "bottom-right" | "bottom-left" | "top-right" | "top-left";

export type ToastAction = {
  label: ReactNode;
  onClick: () => void;
};

export type ToastOptions = {
  description?: ReactNode;
  duration?: number;
  action?: ToastAction;
};

type Toast = {
  id: string;
  variant: ToastVariant;
  title: ReactNode;
  description?: ReactNode;
  duration: number;
  action?: ToastAction;
};

type ToastContextValue = {
  toasts: Toast[];
  push: (toast: Omit<Toast, "id">) => string;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION = 5000;

export type ToastProviderProps = {
  children: ReactNode;
  position?: ToastPosition;
};

let toastCounter = 0;
function nextId(): string {
  toastCounter += 1;
  return `toast-${toastCounter}`;
}

export function ToastProvider({ children, position = "bottom-right" }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const push = useCallback((toast: Omit<Toast, "id">) => {
    const id = nextId();
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  }, []);

  const value = useMemo<ToastContextValue>(() => ({ toasts, push, dismiss }), [toasts, push, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {mounted &&
        createPortal(
          <ToastViewport position={position} toasts={toasts} onDismiss={dismiss} />,
          document.body
        )}
    </ToastContext.Provider>
  );
}

type ToastViewportProps = {
  position: ToastPosition;
  toasts: Toast[];
  onDismiss: (id: string) => void;
};

function ToastViewport({ position, toasts, onDismiss }: ToastViewportProps) {
  return (
    <ol
      aria-label="Notifications"
      className={cn("davinci-toast-viewport", `davinci-toast-viewport--${position}`)}
      role="region"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </ol>
  );
}

type ToastItemProps = {
  toast: Toast;
  onDismiss: (id: string) => void;
};

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const [closing, setClosing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const remainingRef = useRef(toast.duration);
  const startedAtRef = useRef<number>(Date.now());

  const startTimer = useCallback(() => {
    if (toast.duration === Infinity || toast.duration <= 0) return;
    startedAtRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      setClosing(true);
    }, remainingRef.current);
  }, [toast.duration]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [startTimer]);

  function handlePause() {
    if (!timerRef.current) return;
    clearTimeout(timerRef.current);
    timerRef.current = null;
    remainingRef.current = Math.max(0, remainingRef.current - (Date.now() - startedAtRef.current));
  }

  function handleResume() {
    if (timerRef.current) return;
    startTimer();
  }

  function handleAnimationEnd(event: AnimationEvent<HTMLLIElement>) {
    if (closing && event.animationName.includes("davinci-toast-out")) {
      onDismiss(toast.id);
    }
  }

  const isAlert = toast.variant === "danger" || toast.variant === "warning";

  return (
    <li
      aria-live={isAlert ? "assertive" : "polite"}
      className={cn("davinci-toast", `davinci-toast--${toast.variant}`)}
      data-state={closing ? "closing" : "open"}
      onAnimationEnd={handleAnimationEnd}
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      role={isAlert ? "alert" : "status"}
    >
      <div className="davinci-toast__body">
        <p className="davinci-toast__title">{toast.title}</p>
        {toast.description && <p className="davinci-toast__description">{toast.description}</p>}
      </div>
      {toast.action && (
        <button
          className="davinci-toast__action"
          onClick={() => {
            toast.action?.onClick();
            setClosing(true);
          }}
          type="button"
        >
          {toast.action.label}
        </button>
      )}
      <button
        aria-label="Dismiss notification"
        className="davinci-toast__close"
        onClick={() => setClosing(true)}
        type="button"
      >
        <XIcon />
      </button>
    </li>
  );
}

export type UseToastApi = {
  info: (title: ReactNode, options?: ToastOptions) => string;
  success: (title: ReactNode, options?: ToastOptions) => string;
  warning: (title: ReactNode, options?: ToastOptions) => string;
  danger: (title: ReactNode, options?: ToastOptions) => string;
  dismiss: (id: string) => void;
};

export function useToast(): UseToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used inside <ToastProvider>");
  }
  const { push, dismiss } = ctx;
  return useMemo<UseToastApi>(
    () => ({
      info: (title, options) =>
        push({ variant: "info", title, duration: options?.duration ?? DEFAULT_DURATION, ...options }),
      success: (title, options) =>
        push({ variant: "success", title, duration: options?.duration ?? DEFAULT_DURATION, ...options }),
      warning: (title, options) =>
        push({ variant: "warning", title, duration: options?.duration ?? DEFAULT_DURATION, ...options }),
      danger: (title, options) =>
        push({ variant: "danger", title, duration: options?.duration ?? DEFAULT_DURATION, ...options }),
      dismiss
    }),
    [push, dismiss]
  );
}
