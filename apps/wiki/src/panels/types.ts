export type PanelGroup = "Foundations" | "Surfaces & Feedback" | "Components" | "Reference";

export type PanelMeta = {
  id: string;
  label: string;
  group: PanelGroup;
  description: string;
};
