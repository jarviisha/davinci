import { Alert, Button, Stack } from "@jarviisha/davinci-react-ui";
import { PanelSection } from "../components/PanelSection";
import type { PanelMeta } from "./types";

export const alertPanelMeta: PanelMeta = {
  id: "alert",
  label: "Alert",
  group: "Components",
  description: "Persistent status messages for billing, sync, permissions, and system notices."
};

export function AlertPanel() {
  return (
    <PanelSection title="Alert" description={alertPanelMeta.description}>
      <Stack gap="200">
        <Alert description="Scheduled exports will run at 02:00 UTC." icon="i" title="Export schedule updated" />
        <Alert
          actions={
            <Button size="sm" tone="neutral" variant="outline">
              View usage
            </Button>
          }
          description="Your workspace has used 92% of the monthly event quota."
          icon="!"
          title="Quota nearly reached"
          variant="warning"
        />
        <Alert
          description="Payment failed for the latest invoice. Update billing to avoid interruption."
          icon="!"
          title="Billing issue"
          variant="danger"
        />
        <Alert description="All integrations synced successfully." icon="✓" title="Sync complete" variant="success" />
      </Stack>
    </PanelSection>
  );
}
