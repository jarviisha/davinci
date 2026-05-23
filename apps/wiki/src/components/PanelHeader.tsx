import { Badge } from "@jarviisha/davinci-react-ui";
import type { ResolvedTheme } from "../lib/tokens";

type PanelHeaderProps = {
  label: string;
  description: string;
  resolvedTheme: ResolvedTheme;
};

export function PanelHeader({ label, description, resolvedTheme }: PanelHeaderProps) {
  return (
    <header className="border-b border-border pb-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Design Token System</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal">{label}</h1>
        </div>
        <Badge variant={resolvedTheme === "dark" ? "discovery" : "primary"}>{resolvedTheme}</Badge>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-subtle">{description}</p>
    </header>
  );
}
