import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@jarviisha/davinci-react-ui";

export function SurfacePanel() {
  return (
    <section className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Surface</h2>
        <p className="mt-2 text-sm leading-6 text-text-subtle">
          Background, surface, raised surface, muted, border, and status roles in context.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <h3 className="text-base font-semibold">Semantic tiers</h3>
          <p className="mt-1 text-sm text-text-subtle">
            Three background levels carry hierarchy via luminance steps.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <article className="rounded-lg border border-border bg-background p-5">
            <h4 className="text-sm font-semibold">Background</h4>
            <p className="mt-2 text-sm text-text-subtle">Base application canvas.</p>
          </article>
          <article className="rounded-lg border border-border bg-surface p-5">
            <h4 className="text-sm font-semibold">Surface</h4>
            <p className="mt-2 text-sm text-text-subtle">Grouped content area.</p>
          </article>
          <article className="rounded-lg border border-border bg-surface-raised p-5 shadow-sm">
            <h4 className="text-sm font-semibold">Surface raised</h4>
            <p className="mt-2 text-sm text-text-subtle">Elevated content area.</p>
          </article>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <h3 className="text-base font-semibold">Card variants</h3>
          <p className="mt-1 text-sm text-text-subtle">
            <code className="font-mono text-foreground">elevated</code> uses raised background + shadow.{" "}
            <code className="font-mono text-foreground">outlined</code> sits on the base background and uses a bold border.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Elevated card</CardTitle>
              <CardDescription>Default — raised surface + shadow lift the card above the page.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-subtle">Pair with light backgrounds where luminance steps read well.</p>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardHeader>
              <CardTitle>Outlined card</CardTitle>
              <CardDescription>Bold border + flat background — flat aesthetic, useful in dense layouts.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-subtle">
                Shares the parent background so cards visually integrate with the page.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-md bg-(--davinci-semantic-color-background-hovered) px-3 py-2 text-sm font-medium text-foreground">Hovered</div>
        <div className="rounded-md bg-(--davinci-semantic-color-background-pressed) px-3 py-2 text-sm font-medium text-foreground">Pressed</div>
        <div className="rounded-md bg-(--davinci-semantic-color-background-selected) px-3 py-2 text-sm font-medium text-foreground">Selected</div>
        <div className="rounded-md bg-(--davinci-semantic-color-background-disabled) px-3 py-2 text-sm font-medium text-(--davinci-semantic-color-text-disabled)">
          Disabled
        </div>
        <div className="rounded-md bg-success px-3 py-2 text-sm font-medium text-success-foreground">Success</div>
        <div className="rounded-md bg-warning px-3 py-2 text-sm font-medium text-warning-foreground">Warning</div>
        <div className="rounded-md bg-information px-3 py-2 text-sm font-medium text-information-foreground">
          Information
        </div>
        <div className="rounded-md bg-discovery px-3 py-2 text-sm font-medium text-discovery-foreground">
          Discovery
        </div>
      </div>
    </section>
  );
}
