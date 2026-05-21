import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Inline } from "@jarviisha/davinci-react-ui";

export function BadgePanel() {
  return (
    <Card variant="filled">
      <CardHeader>
        <CardTitle>Badge</CardTitle>
        <CardDescription>Status and metadata labels rendered from component badge tokens.</CardDescription>
      </CardHeader>
      <CardContent>
        <Inline gap="100" wrap>
          <Badge>Neutral</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="discovery">Discovery</Badge>
        </Inline>
      </CardContent>
    </Card>
  );
}
