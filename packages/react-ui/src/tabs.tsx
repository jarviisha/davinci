import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode
} from "react";
import { cn } from "./utils.js";

type TabsContextValue = {
  baseId: string;
  value: string;
  onValueChange: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

export type TabsProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
  onValueChange: (value: string) => void;
  children?: ReactNode;
};

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { children, className, onValueChange, value, ...props },
  ref
) {
  const baseId = useId();
  return (
    <TabsContext.Provider value={{ baseId, onValueChange, value }}>
      <div className={cn("davinci-tabs", className)} ref={ref} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
});

export type TabsListProps = HTMLAttributes<HTMLDivElement>;

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(function TabsList(
  { className, onKeyDown, ...props },
  ref
) {
  return (
    <div
      className={cn("davinci-tabs__list", className)}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;

        const triggers = Array.from(
          event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)')
        );
        const currentIndex = triggers.indexOf(document.activeElement as HTMLButtonElement);
        if (currentIndex === -1) return;

        event.preventDefault();
        const nextIndex =
          event.key === "Home"
            ? 0
            : event.key === "End"
              ? triggers.length - 1
              : event.key === "ArrowRight"
                ? (currentIndex + 1) % triggers.length
                : (currentIndex - 1 + triggers.length) % triggers.length;
        triggers[nextIndex]?.focus();
        triggers[nextIndex]?.click();
      }}
      ref={ref}
      role="tablist"
      {...props}
    />
  );
});

export type TabsTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
};

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(function TabsTrigger(
  { className, type = "button", value, ...props },
  ref
) {
  const ctx = useTabsContext("TabsTrigger");
  const selected = ctx.value === value;
  return (
    <button
      aria-controls={`${ctx.baseId}-panel-${value}`}
      aria-selected={selected}
      className={cn("davinci-tabs__trigger", className)}
      id={`${ctx.baseId}-trigger-${value}`}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented) ctx.onValueChange(value);
      }}
      ref={ref}
      role="tab"
      tabIndex={selected ? 0 : -1}
      type={type}
      {...props}
    />
  );
});

export type TabsContentProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
};

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(function TabsContent(
  { className, value, ...props },
  ref
) {
  const ctx = useTabsContext("TabsContent");
  const selected = ctx.value === value;
  return (
    <div
      aria-labelledby={`${ctx.baseId}-trigger-${value}`}
      className={cn("davinci-tabs__content", className)}
      hidden={!selected}
      id={`${ctx.baseId}-panel-${value}`}
      ref={ref}
      role="tabpanel"
      tabIndex={0}
      {...props}
    />
  );
});

function useTabsContext(component: string): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error(`${component} must be used inside Tabs.`);
  }
  return ctx;
}
