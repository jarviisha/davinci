import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Inline,
  Skeleton,
  Stack
} from "@jarviisha/davinci-react-ui";

export function SkeletonPanel() {
  return (
    <Card variant="filled">
      <CardHeader>
        <CardTitle>Skeleton</CardTitle>
        <CardDescription>Loading placeholders for dashboard cards, lists, and tables.</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
