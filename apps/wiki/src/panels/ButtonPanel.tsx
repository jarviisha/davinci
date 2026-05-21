import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Inline } from "@jarviisha/davinci-react-ui";

export function ButtonPanel() {
  return (
    <Card variant="filled">
      <CardHeader>
        <CardTitle>Button</CardTitle>
        <CardDescription>Button treatment variants combine with semantic color tones.</CardDescription>
      </CardHeader>
      <CardContent>
        <Inline gap="150" wrap>
          <Button>Solid primary</Button>
          <Button tone="neutral">Solid neutral</Button>
          <Button tone="danger">Solid danger</Button>
          <Button tone="neutral" variant="outline">Outline neutral</Button>
          <Button tone="neutral" variant="soft">Soft neutral</Button>
          <Button tone="neutral" variant="ghost">Ghost neutral</Button>
          <Button disabled>Disabled</Button>
        </Inline>
        <Inline gap="150" wrap>
          <Button variant="outline">Outline primary</Button>
          <Button tone="danger" variant="outline">Outline danger</Button>
          <Button variant="soft">Soft primary</Button>
          <Button tone="danger" variant="soft">Soft danger</Button>
          <Button variant="ghost">Ghost primary</Button>
          <Button tone="danger" variant="ghost">Ghost danger</Button>
        </Inline>
        <Inline gap="150" wrap>
          <Button size="sm" tone="neutral" variant="outline">
            Small
          </Button>
          <Button size="md" tone="neutral" variant="outline">
            Medium
          </Button>
          <Button size="lg" tone="neutral" variant="outline">
            Large
          </Button>
        </Inline>
      </CardContent>
    </Card>
  );
}
