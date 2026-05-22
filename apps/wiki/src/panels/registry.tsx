import type { ReactNode } from "react";
import type { ResolvedTheme, TokenEntry } from "../lib/tokens";
import { AlertPanel, alertPanelMeta } from "./AlertPanel";
import { AllTokensPanel, allTokensPanelMeta } from "./AllTokensPanel";
import { AppShellPanel, appShellPanelMeta } from "./AppShellPanel";
import { AvatarPanel, avatarPanelMeta } from "./AvatarPanel";
import { BadgePanel, badgePanelMeta } from "./BadgePanel";
import { BreadcrumbsPanel, breadcrumbsPanelMeta } from "./BreadcrumbsPanel";
import { ButtonPanel, buttonPanelMeta } from "./ButtonPanel";
import { CardPanel, cardPanelMeta } from "./CardPanel";
import { CheckboxPanel, checkboxPanelMeta } from "./CheckboxPanel";
import { ColorPanel, colorPanelMeta } from "./ColorPanel";
import { ComboboxPanel, comboboxPanelMeta } from "./ComboboxPanel";
import { DialogPanel, dialogPanelMeta } from "./DialogPanel";
import { DrawerPanel, drawerPanelMeta } from "./DrawerPanel";
import { DropdownMenuPanel, dropdownMenuPanelMeta } from "./DropdownMenuPanel";
import { ElevationPanel, elevationPanelMeta } from "./ElevationPanel";
import { EmptyStatePanel, emptyStatePanelMeta } from "./EmptyStatePanel";
import { FormFieldPanel, formFieldPanelMeta } from "./FormFieldPanel";
import { IconButtonPanel, iconButtonPanelMeta } from "./IconButtonPanel";
import { PaginationPanel, paginationPanelMeta } from "./PaginationPanel";
import { PopoverPanel, popoverPanelMeta } from "./PopoverPanel";
import { RadioPanel, radioPanelMeta } from "./RadioPanel";
import { RadiusFocusPanel, radiusFocusPanelMeta } from "./RadiusFocusPanel";
import { SearchInputPanel, searchInputPanelMeta } from "./SearchInputPanel";
import { SkeletonPanel, skeletonPanelMeta } from "./SkeletonPanel";
import { SpacingPanel, spacingPanelMeta } from "./SpacingPanel";
import { SurfacePanel, surfacePanelMeta } from "./SurfacePanel";
import { SwitchPanel, switchPanelMeta } from "./SwitchPanel";
import { TablePanel, tablePanelMeta } from "./TablePanel";
import { TabsPanel, tabsPanelMeta } from "./TabsPanel";
import { ToastPanel, toastPanelMeta } from "./ToastPanel";
import { TooltipPanel, tooltipPanelMeta } from "./TooltipPanel";
import { TypographyPanel, typographyPanelMeta } from "./TypographyPanel";
import type { PanelGroup, PanelMeta } from "./types";

export type PanelRenderContext = {
  resolvedTheme: ResolvedTheme;
  semanticEntries: TokenEntry[];
  semanticPrefix: string;
};

export type PanelEntry = PanelMeta & {
  render: (ctx: PanelRenderContext) => ReactNode;
};

export const panels: readonly PanelEntry[] = [
  // Foundations
  { ...colorPanelMeta, render: (ctx) => <ColorPanel {...ctx} /> },
  { ...typographyPanelMeta, render: () => <TypographyPanel /> },
  { ...spacingPanelMeta, render: () => <SpacingPanel /> },
  { ...radiusFocusPanelMeta, render: () => <RadiusFocusPanel /> },
  { ...elevationPanelMeta, render: () => <ElevationPanel /> },

  // Surfaces & Feedback
  { ...surfacePanelMeta, render: () => <SurfacePanel /> },
  { ...dialogPanelMeta, render: () => <DialogPanel /> },
  { ...toastPanelMeta, render: () => <ToastPanel /> },

  // Components
  { ...buttonPanelMeta, render: () => <ButtonPanel /> },
  { ...cardPanelMeta, render: () => <CardPanel /> },
  { ...badgePanelMeta, render: () => <BadgePanel /> },
  { ...tablePanelMeta, render: () => <TablePanel /> },
  { ...dropdownMenuPanelMeta, render: () => <DropdownMenuPanel /> },
  { ...tabsPanelMeta, render: () => <TabsPanel /> },
  { ...tooltipPanelMeta, render: () => <TooltipPanel /> },
  { ...skeletonPanelMeta, render: () => <SkeletonPanel /> },
  { ...emptyStatePanelMeta, render: () => <EmptyStatePanel /> },
  { ...appShellPanelMeta, render: () => <AppShellPanel /> },
  { ...avatarPanelMeta, render: () => <AvatarPanel /> },
  { ...paginationPanelMeta, render: () => <PaginationPanel /> },
  { ...breadcrumbsPanelMeta, render: () => <BreadcrumbsPanel /> },
  { ...alertPanelMeta, render: () => <AlertPanel /> },
  { ...popoverPanelMeta, render: () => <PopoverPanel /> },
  { ...comboboxPanelMeta, render: () => <ComboboxPanel /> },
  { ...drawerPanelMeta, render: () => <DrawerPanel /> },
  { ...iconButtonPanelMeta, render: () => <IconButtonPanel /> },
  { ...searchInputPanelMeta, render: () => <SearchInputPanel /> },
  { ...formFieldPanelMeta, render: () => <FormFieldPanel /> },
  { ...checkboxPanelMeta, render: () => <CheckboxPanel /> },
  { ...radioPanelMeta, render: () => <RadioPanel /> },
  { ...switchPanelMeta, render: () => <SwitchPanel /> },

  // Reference
  { ...allTokensPanelMeta, render: (ctx) => <AllTokensPanel resolvedTheme={ctx.resolvedTheme} /> }
];

export const panelIds = panels.map((panel) => panel.id) as readonly string[];

const GROUP_ORDER: readonly PanelGroup[] = ["Foundations", "Surfaces & Feedback", "Components", "Reference"];

export const panelGroups: ReadonlyArray<{ label: PanelGroup; panels: ReadonlyArray<PanelEntry> }> = GROUP_ORDER.map(
  (label) => ({
    label,
    panels: panels.filter((panel) => panel.group === label)
  })
);

export const DEFAULT_PANEL_ID = panels[0]?.id ?? "color";

export function findPanel(id: string): PanelEntry | undefined {
  return panels.find((panel) => panel.id === id);
}
