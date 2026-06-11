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
import { DetailLayoutPanel, detailLayoutPanelMeta } from "./DetailLayoutPanel";
import { DialogPanel, dialogPanelMeta } from "./DialogPanel";
import { DrawerPanel, drawerPanelMeta } from "./DrawerPanel";
import { DropdownMenuPanel, dropdownMenuPanelMeta } from "./DropdownMenuPanel";
import { ElevationPanel, elevationPanelMeta } from "./ElevationPanel";
import { EmptyStatePanel, emptyStatePanelMeta } from "./EmptyStatePanel";
import { FormFieldPanel, formFieldPanelMeta } from "./FormFieldPanel";
import { IconButtonPanel, iconButtonPanelMeta } from "./IconButtonPanel";
import { NumberInputPanel, numberInputPanelMeta } from "./NumberInputPanel";
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
  { ...surfacePanelMeta, render: () => <SurfacePanel /> },

  // Inputs
  { ...buttonPanelMeta, render: () => <ButtonPanel /> },
  { ...iconButtonPanelMeta, render: () => <IconButtonPanel /> },
  { ...formFieldPanelMeta, render: () => <FormFieldPanel /> },
  { ...checkboxPanelMeta, render: () => <CheckboxPanel /> },
  { ...radioPanelMeta, render: () => <RadioPanel /> },
  { ...switchPanelMeta, render: () => <SwitchPanel /> },
  { ...searchInputPanelMeta, render: () => <SearchInputPanel /> },
  { ...numberInputPanelMeta, render: () => <NumberInputPanel /> },
  { ...comboboxPanelMeta, render: () => <ComboboxPanel /> },

  // Data display
  { ...cardPanelMeta, render: () => <CardPanel /> },
  { ...badgePanelMeta, render: () => <BadgePanel /> },
  { ...avatarPanelMeta, render: () => <AvatarPanel /> },
  { ...tablePanelMeta, render: () => <TablePanel /> },
  { ...skeletonPanelMeta, render: () => <SkeletonPanel /> },
  { ...emptyStatePanelMeta, render: () => <EmptyStatePanel /> },

  // Navigation
  { ...appShellPanelMeta, render: () => <AppShellPanel /> },
  { ...detailLayoutPanelMeta, render: () => <DetailLayoutPanel /> },
  { ...tabsPanelMeta, render: () => <TabsPanel /> },
  { ...breadcrumbsPanelMeta, render: () => <BreadcrumbsPanel /> },
  { ...paginationPanelMeta, render: () => <PaginationPanel /> },
  { ...dropdownMenuPanelMeta, render: () => <DropdownMenuPanel /> },

  // Overlays
  { ...alertPanelMeta, render: () => <AlertPanel /> },
  { ...dialogPanelMeta, render: () => <DialogPanel /> },
  { ...drawerPanelMeta, render: () => <DrawerPanel /> },
  { ...popoverPanelMeta, render: () => <PopoverPanel /> },
  { ...toastPanelMeta, render: () => <ToastPanel /> },
  { ...tooltipPanelMeta, render: () => <TooltipPanel /> },

  // Reference
  { ...allTokensPanelMeta, render: (ctx) => <AllTokensPanel resolvedTheme={ctx.resolvedTheme} /> }
];

export const panelIds = panels.map((panel) => panel.id) as readonly string[];

const GROUP_ORDER: readonly PanelGroup[] = [
  "Foundations",
  "Inputs",
  "Data display",
  "Navigation",
  "Overlays",
  "Reference"
];

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
