import { Card, CardContent, CardDescription, CardHeader, CardTitle, IconButton, Inline } from "@jarviisha/davinci-react-ui";

export function IconButtonPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>IconButton</CardTitle>
        <CardDescription>Icon-only action button with enforced accessible label.</CardDescription>
      </CardHeader>
      <CardContent>
        <Inline gap="150" wrap>
          <IconButton aria-label="Refresh" variant="outline">↻</IconButton>
          <IconButton aria-label="Edit" variant="soft">✎</IconButton>
          <IconButton aria-label="Favorite" variant="ghost">☆</IconButton>
          <IconButton aria-label="Delete" tone="danger" variant="outline">×</IconButton>
          <IconButton aria-label="Create" tone="primary" variant="solid">+</IconButton>
        </Inline>
        <Inline gap="150" wrap>
          <IconButton aria-label="Small settings" size="sm" variant="outline">⚙</IconButton>
          <IconButton aria-label="Medium settings" size="md" variant="outline">⚙</IconButton>
          <IconButton aria-label="Large settings" size="lg" variant="outline">⚙</IconButton>
        </Inline>
      </CardContent>
    </Card>
  );
}
