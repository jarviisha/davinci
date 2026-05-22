import { Button, EmptyState } from "@jarviisha/davinci-react-ui";
import { PanelSection } from "../components/PanelSection";
import type { PanelMeta } from "./types";

export const emptyStatePanelMeta: PanelMeta = {
  id: "empty-state",
  label: "EmptyState",
  group: "Components",
  description: "Empty, no-results, and first-run states with optional actions."
};

export function EmptyStatePanel() {
  return (
    <PanelSection title="EmptyState" description="Reusable empty, no results, and first-run states.">
      <EmptyState
        actions={
          <>
            <Button>Create project</Button>
            <Button tone="neutral" variant="outline">
              Import data
            </Button>
          </>
        }
        description="Create a project or import existing data to start tracking metrics, members, and billing activity."
        icon={<span aria-hidden="true">+</span>}
        title="No projects yet"
      />
    </PanelSection>
  );
}
