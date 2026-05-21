import { useEffect, useState } from "react";
import { useTheme, type Theme } from "@jarviisha/davinci-react-theme-provider";
import {
  Badge,
  Button,
  Divider,
  Inline,
  Nav,
  NavGroup,
  NavItem,
  Stack
} from "@jarviisha/davinci-react-ui";
import { themeTokenEntries } from "./lib/tokens";
import { AllTokensPanel } from "./panels/AllTokensPanel";
import { AppShellPanel } from "./panels/AppShellPanel";
import { AlertPanel } from "./panels/AlertPanel";
import { AvatarPanel } from "./panels/AvatarPanel";
import { BadgePanel } from "./panels/BadgePanel";
import { BreadcrumbsPanel } from "./panels/BreadcrumbsPanel";
import { ButtonPanel } from "./panels/ButtonPanel";
import { CheckboxPanel } from "./panels/CheckboxPanel";
import { ComboboxPanel } from "./panels/ComboboxPanel";
import { ColorPanel } from "./panels/ColorPanel";
import { DialogPanel } from "./panels/DialogPanel";
import { DrawerPanel } from "./panels/DrawerPanel";
import { DropdownMenuPanel } from "./panels/DropdownMenuPanel";
import { ElevationPanel } from "./panels/ElevationPanel";
import { EmptyStatePanel } from "./panels/EmptyStatePanel";
import { FormFieldPanel } from "./panels/FormFieldPanel";
import { IconButtonPanel } from "./panels/IconButtonPanel";
import { PaginationPanel } from "./panels/PaginationPanel";
import { PopoverPanel } from "./panels/PopoverPanel";
import { RadioPanel } from "./panels/RadioPanel";
import { RadiusFocusPanel } from "./panels/RadiusFocusPanel";
import { SearchInputPanel } from "./panels/SearchInputPanel";
import { SpacingPanel } from "./panels/SpacingPanel";
import { SurfacePanel } from "./panels/SurfacePanel";
import { SwitchPanel } from "./panels/SwitchPanel";
import { SkeletonPanel } from "./panels/SkeletonPanel";
import { TablePanel } from "./panels/TablePanel";
import { TabsPanel } from "./panels/TabsPanel";
import { ToastPanel } from "./panels/ToastPanel";
import { TooltipPanel } from "./panels/TooltipPanel";
import { TypographyPanel } from "./panels/TypographyPanel";

type TabId =
  | "color"
  | "typography"
  | "spacing"
  | "radius-focus"
  | "elevation"
  | "button"
  | "badge"
  | "table"
  | "dropdown-menu"
  | "tabs"
  | "tooltip"
  | "skeleton"
  | "empty-state"
  | "app-shell"
  | "avatar"
  | "pagination"
  | "breadcrumbs"
  | "alert"
  | "popover"
  | "combobox"
  | "drawer"
  | "icon-button"
  | "search-input"
  | "form-field"
  | "checkbox"
  | "radio"
  | "switch"
  | "dialog"
  | "toast"
  | "surface"
  | "all-tokens";

const themes: Theme[] = ["light", "dark", "system"];

type Tab = { id: TabId; label: string };
type TabGroup = { label: string; tabs: Tab[] };

const tabGroups: TabGroup[] = [
  {
    label: "Foundations",
    tabs: [
      { id: "color", label: "Color" },
      { id: "typography", label: "Typography" },
      { id: "spacing", label: "Spacing" },
      { id: "radius-focus", label: "Radius & Focus" },
      { id: "elevation", label: "Elevation" }
    ]
  },
  {
    label: "Surfaces & Feedback",
    tabs: [
      { id: "surface", label: "Surface" },
      { id: "dialog", label: "Dialog" },
      { id: "toast", label: "Toast" }
    ]
  },
  {
    label: "Components",
    tabs: [
      { id: "button", label: "Button" },
      { id: "badge", label: "Badge" },
      { id: "table", label: "Table" },
      { id: "dropdown-menu", label: "DropdownMenu" },
      { id: "tabs", label: "Tabs" },
      { id: "tooltip", label: "Tooltip" },
      { id: "skeleton", label: "Skeleton" },
      { id: "empty-state", label: "EmptyState" },
      { id: "app-shell", label: "AppShell" },
      { id: "avatar", label: "Avatar" },
      { id: "pagination", label: "Pagination" },
      { id: "breadcrumbs", label: "Breadcrumbs" },
      { id: "alert", label: "Alert" },
      { id: "popover", label: "Popover" },
      { id: "combobox", label: "Combobox" },
      { id: "drawer", label: "Drawer" },
      { id: "icon-button", label: "IconButton" },
      { id: "search-input", label: "SearchInput" },
      { id: "form-field", label: "FormField" },
      { id: "checkbox", label: "Checkbox" },
      { id: "radio", label: "Radio" },
      { id: "switch", label: "Switch" }
    ]
  },
  {
    label: "Reference",
    tabs: [{ id: "all-tokens", label: "All tokens" }]
  }
];

const tabs: Tab[] = tabGroups.flatMap((group) => group.tabs);
const DEFAULT_APP_RADIUS = 6;
const RADIUS_STORAGE_KEY = "davinci-playground-radius";

const appRadiusVars = [
  ["--davinci-radius-sm", 2 / 3],
  ["--davinci-radius-md", 1],
  ["--davinci-radius-lg", 4 / 3],
  ["--davinci-radius-xl", 2]
] as const;

const tabDescription: Record<TabId, string> = {
  color: "Primitive palette, semantic roles, and active theme mapping.",
  typography: "Text roles, font scale, line height, weight, and letter spacing.",
  spacing: "Spacing scale for layout rhythm, padding, and gaps.",
  "radius-focus": "Shape tokens and keyboard focus ring behavior.",
  elevation: "Theme-aware shadows and layered surface depth.",
  button: "Button variants, sizes, and disabled states backed by component tokens.",
  badge: "Badge variants for status and metadata labels.",
  table: "Composable table primitives for dense SaaS dashboard data.",
  "dropdown-menu": "Action menus for account controls, filters, and row actions.",
  tabs: "Controlled tab primitives for settings and detail pages.",
  tooltip: "Contextual help for compact controls and dense dashboard UI.",
  skeleton: "Loading placeholders for dashboard cards, lists, and tables.",
  "empty-state": "Empty, no-results, and first-run states with optional actions.",
  "app-shell": "Dashboard layout primitive with sidebar, header, and main content regions.",
  avatar: "User identity primitive with image fallback and generated initials.",
  pagination: "Controlled pagination for tables and search result lists.",
  breadcrumbs: "Hierarchical navigation for nested dashboard pages.",
  alert: "Persistent status messages for billing, sync, permissions, and system notices.",
  popover: "Generic anchored panel for filters, quick settings, and compact forms.",
  combobox: "Filterable single-select input for users, projects, and tags.",
  drawer: "Side panel for detail views and compact edit forms.",
  "icon-button": "Icon-only action button with enforced accessible label.",
  "search-input": "Search field with leading icon and optional clear action.",
  "form-field": "Label + FormField composite with Input, Select, Textarea and auto-wired aria attributes.",
  checkbox: "Checkbox with checked, indeterminate, disabled, and invalid states.",
  radio: "RadioGroup + Radio with horizontal and vertical orientations.",
  switch: "Toggle switch backed by a native checkbox with role=switch.",
  dialog: "Modal dialog with portal, focus trap, ESC and click-outside dismiss.",
  toast: "Imperative toast notifications via the useToast hook.",
  surface: "Semantic surface, border, muted, and status roles in context.",
  "all-tokens": "Complete token reference grouped by primitives, semantic, typography, and components."
};

function nextTheme(theme: Theme): Theme {
  const index = themes.indexOf(theme);
  return themes[(index + 1) % themes.length] ?? "system";
}

export default function App() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<TabId>("color");
  const [appRadius, setAppRadius] = useState(readInitialRadius);
  const semanticPrefix = "semantic.color.";
  const semanticEntries = themeTokenEntries(resolvedTheme).filter(
    (token) => token.name.startsWith(semanticPrefix) && !token.name.endsWith("Foreground")
  );

  useEffect(() => {
    const root = document.documentElement;

    for (const [name, multiplier] of appRadiusVars) {
      root.style.setProperty(name, formatRadiusValue(appRadius * multiplier));
    }

    root.style.setProperty("--davinci-radius-control", "var(--davinci-radius-md)");
    root.style.setProperty("--davinci-radius-card", "var(--davinci-radius-lg)");
    root.style.setProperty("--davinci-radius-panel", "var(--davinci-radius-xl)");
    window.localStorage.setItem(RADIUS_STORAGE_KEY, String(appRadius));
  }, [appRadius]);

  return (
    <main className="min-h-screen bg-background font-sans text-foreground">
      <aside className="davinci-scrollbar border-b border-border px-6 py-6 lg:fixed lg:inset-y-0 lg:left-0 lg:z-10 lg:w-80 lg:overflow-y-auto lg:border-b-0 lg:border-r lg:bg-background lg:px-6 lg:py-8">
            <Stack gap="300">
              <div>
                <h2 className="text-xl font-semibold tracking-normal">Davinci</h2>
                <p className="mt-1 text-sm leading-6 text-text-subtle">Token playground</p>
              </div>

              <Nav aria-label="Playground sections">
                {tabGroups.map((group) => (
                  <NavGroup
                    defaultOpen={group.tabs.some((tab) => tab.id === activeTab)}
                    key={group.label}
                    label={group.label}
                  >
                    {group.tabs.map((tab) => (
                      <NavItem
                        active={tab.id === activeTab}
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        {tab.label}
                      </NavItem>
                    ))}
                  </NavGroup>
                ))}
              </Nav>

              <Stack gap="200">
                <Divider />
                <Inline align="center" justify="between">
                  <span className="text-sm font-medium">Theme</span>
                  <Badge variant="neutral">{theme}</Badge>
                </Inline>
                <Button onClick={() => setTheme(nextTheme(theme))} tone="neutral" variant="outline">
                  Switch to {nextTheme(theme)}
                </Button>
              </Stack>

              <Stack gap="200">
                <Divider />
                <Inline align="center" justify="between">
                  <span className="text-sm font-medium">Radius</span>
                  <Badge variant="neutral">{formatRadiusValue(appRadius)}</Badge>
                </Inline>
                <label className="sr-only" htmlFor="app-radius">
                  App radius
                </label>
                <input
                  className="w-full"
                  id="app-radius"
                  max="20"
                  min="0"
                  onChange={(event) => setAppRadius(Number(event.currentTarget.value))}
                  step="1"
                  style={{ accentColor: "var(--davinci-semantic-color-primary)" }}
                  type="range"
                  value={appRadius}
                />
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-9 border border-border bg-surface-raised" style={{ borderRadius: "var(--davinci-radius-control)" }} />
                  <div className="h-9 border border-border bg-surface-raised" style={{ borderRadius: "var(--davinci-radius-card)" }} />
                  <div className="h-9 border border-border bg-surface-raised" style={{ borderRadius: "var(--davinci-radius-panel)" }} />
                </div>
                <Button
                  disabled={appRadius === DEFAULT_APP_RADIUS}
                  onClick={() => setAppRadius(DEFAULT_APP_RADIUS)}
                  size="sm"
                  tone="neutral"
                  variant="outline"
                >
                  Reset radius
                </Button>
              </Stack>
            </Stack>
      </aside>

      <section className="min-w-0 px-6 py-6 lg:ml-80 lg:px-8 lg:py-8">
        <div className="mx-auto w-full max-w-5xl">
            <Stack gap="300">
              <header className="border-b border-border pb-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-primary">Design Token System</p>
                    <h1 className="mt-2 text-3xl font-semibold tracking-normal">{activeLabel(activeTab)}</h1>
                  </div>
                  <Badge variant={resolvedTheme === "dark" ? "discovery" : "primary"}>{resolvedTheme}</Badge>
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-text-subtle">{tabDescription[activeTab]}</p>
              </header>

              {activeTab === "color" ? (
                <ColorPanel
                  resolvedTheme={resolvedTheme}
                  semanticEntries={semanticEntries}
                  semanticPrefix={semanticPrefix}
                />
              ) : null}
              {activeTab === "typography" ? <TypographyPanel /> : null}
              {activeTab === "spacing" ? <SpacingPanel /> : null}
              {activeTab === "radius-focus" ? <RadiusFocusPanel /> : null}
              {activeTab === "elevation" ? <ElevationPanel /> : null}
              {activeTab === "button" ? <ButtonPanel /> : null}
              {activeTab === "badge" ? <BadgePanel /> : null}
              {activeTab === "table" ? <TablePanel /> : null}
              {activeTab === "dropdown-menu" ? <DropdownMenuPanel /> : null}
              {activeTab === "tabs" ? <TabsPanel /> : null}
              {activeTab === "tooltip" ? <TooltipPanel /> : null}
              {activeTab === "skeleton" ? <SkeletonPanel /> : null}
              {activeTab === "empty-state" ? <EmptyStatePanel /> : null}
              {activeTab === "app-shell" ? <AppShellPanel /> : null}
              {activeTab === "avatar" ? <AvatarPanel /> : null}
              {activeTab === "pagination" ? <PaginationPanel /> : null}
              {activeTab === "breadcrumbs" ? <BreadcrumbsPanel /> : null}
              {activeTab === "alert" ? <AlertPanel /> : null}
              {activeTab === "popover" ? <PopoverPanel /> : null}
              {activeTab === "combobox" ? <ComboboxPanel /> : null}
              {activeTab === "drawer" ? <DrawerPanel /> : null}
              {activeTab === "icon-button" ? <IconButtonPanel /> : null}
              {activeTab === "search-input" ? <SearchInputPanel /> : null}
              {activeTab === "form-field" ? <FormFieldPanel /> : null}
              {activeTab === "checkbox" ? <CheckboxPanel /> : null}
              {activeTab === "radio" ? <RadioPanel /> : null}
              {activeTab === "switch" ? <SwitchPanel /> : null}
              {activeTab === "dialog" ? <DialogPanel /> : null}
              {activeTab === "toast" ? <ToastPanel /> : null}
              {activeTab === "surface" ? <SurfacePanel /> : null}
              {activeTab === "all-tokens" ? <AllTokensPanel resolvedTheme={resolvedTheme} /> : null}
            </Stack>
        </div>
      </section>
    </main>
  );
}

function activeLabel(activeTab: TabId): string {
  return tabs.find((tab) => tab.id === activeTab)?.label ?? "Playground";
}

function readInitialRadius(): number {
  const stored = window.localStorage.getItem(RADIUS_STORAGE_KEY);
  const parsed = Number(stored);

  if (!Number.isFinite(parsed) || parsed < 0 || parsed > 20) {
    return DEFAULT_APP_RADIUS;
  }

  return parsed;
}

function formatRadiusValue(value: number): string {
  return `${Number(value.toFixed(2))}px`;
}
