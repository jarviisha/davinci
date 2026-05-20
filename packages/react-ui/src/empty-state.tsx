import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "./utils.js";

export type EmptyStateProps = HTMLAttributes<HTMLDivElement> & {
  actions?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  title: ReactNode;
};

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { actions, className, description, icon, title, ...props },
  ref
) {
  return (
    <div className={cn("davinci-empty-state", className)} ref={ref} {...props}>
      {icon ? <div className="davinci-empty-state__icon">{icon}</div> : null}
      <div className="davinci-empty-state__body">
        <h3 className="davinci-empty-state__title">{title}</h3>
        {description ? <p className="davinci-empty-state__description">{description}</p> : null}
      </div>
      {actions ? <div className="davinci-empty-state__actions">{actions}</div> : null}
    </div>
  );
});
