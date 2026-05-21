import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  EmptyState
} from "@jarviisha/davinci-react-ui";

export function EmptyStatePanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>EmptyState</CardTitle>
        <CardDescription>Reusable empty, no results, and first-run states.</CardDescription>
      </CardHeader>
      <CardContent>
        <EmptyState
          actions={
            <>
              <Button>Create project</Button>
              <Button tone="neutral" variant="outline">Import data</Button>
            </>
          }
          description="Create a project or import existing data to start tracking metrics, members, and billing activity."
          icon={<span aria-hidden="true">+</span>}
          title="No projects yet"
        />
      </CardContent>
    </Card>
  );
}
