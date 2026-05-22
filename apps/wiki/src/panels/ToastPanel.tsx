import { Button, Inline, Stack, useToast } from "@jarviisha/davinci-react-ui";
import { PanelSection } from "../components/PanelSection";
import type { PanelMeta } from "./types";

export const toastPanelMeta: PanelMeta = {
  id: "toast",
  label: "Toast",
  group: "Surfaces & Feedback",
  description: "Imperative toast notifications via the useToast hook."
};

export function ToastPanel() {
  const toast = useToast();

  return (
    <Stack gap="300">
      <PanelSection
        title="Toast variants"
        description="Auto-dismisses after 5s by default. Hover over a toast to pause its timer. Click X to close manually."
      >
        <Inline gap="150" wrap>
          <Button
            onClick={() => toast.info("Heads up", { description: "Just so you know." })}
            tone="neutral"
            variant="outline"
          >
            Info
          </Button>
          <Button
            onClick={() => toast.success("Saved successfully", { description: "Your changes have been saved." })}
          >
            Success
          </Button>
          <Button
            onClick={() => toast.warning("Quota nearly reached", { description: "You have used 92% of your storage." })}
            tone="neutral"
            variant="soft"
          >
            Warning
          </Button>
          <Button
            onClick={() => toast.error("Failed to save", { description: "Network error — please retry." })}
            tone="danger"
          >
            Error
          </Button>
        </Inline>
      </PanelSection>

      <PanelSection
        title="With action button"
        description="Use the action slot for a single follow-up (e.g. Undo, Retry)."
      >
        <Inline gap="150" wrap>
          <Button
            onClick={() =>
              toast.success("Comment deleted", {
                description: "You can restore it within 5 seconds.",
                action: {
                  label: "Undo",
                  onClick: () => toast.info("Restored")
                }
              })
            }
            tone="neutral"
            variant="outline"
          >
            Toast with Undo
          </Button>
          <Button
            onClick={() =>
              toast.error("Upload failed", {
                description: "Connection lost mid-upload.",
                duration: 10000,
                action: {
                  label: "Retry",
                  onClick: () => toast.success("Upload complete")
                }
              })
            }
            tone="danger"
          >
            Long-lived error (10s)
          </Button>
        </Inline>
      </PanelSection>

      <PanelSection title="Stack multiple" description="Toasts queue vertically in the viewport.">
        <Inline gap="150">
          <Button
            onClick={() => {
              toast.info("First");
              setTimeout(() => toast.success("Second"), 300);
              setTimeout(() => toast.warning("Third"), 600);
            }}
            tone="neutral"
            variant="outline"
          >
            Trigger 3 toasts
          </Button>
        </Inline>
      </PanelSection>
    </Stack>
  );
}
