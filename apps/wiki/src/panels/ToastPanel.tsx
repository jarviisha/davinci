import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Inline,
  Stack,
  useToast
} from "@jarviisha/davinci-react-ui";

export function ToastPanel() {
  const toast = useToast();

  return (
    <Stack gap="300">
      <Card variant="filled">
        <CardHeader>
          <CardTitle>Toast variants</CardTitle>
          <CardDescription>
            Auto-dismisses after 5s by default. Hover over a toast to pause its timer. Click X to close manually.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Inline gap="150" wrap>
            <Button onClick={() => toast.info("Heads up", { description: "Just so you know." })} tone="neutral" variant="outline">
              Info
            </Button>
            <Button onClick={() => toast.success("Saved successfully", { description: "Your changes have been saved." })}>
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
        </CardContent>
      </Card>

      <Card variant="filled">
        <CardHeader>
          <CardTitle>With action button</CardTitle>
          <CardDescription>Use the action slot for a single follow-up (e.g. Undo, Retry).</CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      <Card variant="filled">
        <CardHeader>
          <CardTitle>Stack multiple</CardTitle>
          <CardDescription>Toasts queue vertically in the viewport.</CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </Stack>
  );
}
