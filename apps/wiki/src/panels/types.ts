export type PanelGroup =
  | "Foundations"
  | "Inputs"
  | "Data display"
  | "Navigation"
  | "Overlays"
  | "Reference";

export type PanelMeta = {
  id: string;
  label: string;
  group: PanelGroup;
  description: string;
};
