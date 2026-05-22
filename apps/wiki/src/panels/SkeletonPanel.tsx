import { Inline, Skeleton, Stack } from "@jarviisha/davinci-react-ui";
import { PanelSection } from "../components/PanelSection";
import type { PanelMeta } from "./types";

export const skeletonPanelMeta: PanelMeta = {
  id: "skeleton",
  label: "Skeleton",
  group: "Data display",
  description: "Loading placeholders for dashboard cards, lists, and tables."
};

export function SkeletonPanel() {
  return (
    <PanelSection title="Skeleton" description={skeletonPanelMeta.description}>
      <Stack gap="300">
        <Inline gap="150">
          <Skeleton variant="circle" />
          <Stack gap="100" style={{ width: "16rem" }}>
            <Skeleton variant="text" width="70%" />
            <Skeleton variant="text" width="100%" />
          </Stack>
        </Inline>
        <Skeleton height="8rem" variant="rect" />
        <Stack gap="100">
          <Skeleton variant="text" width="92%" />
          <Skeleton variant="text" width="76%" />
          <Skeleton variant="text" width="84%" />
        </Stack>
      </Stack>
    </PanelSection>
  );
}
