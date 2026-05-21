import {
  Breadcrumbs,
  BreadcrumbsCurrent,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsSeparator,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@jarviisha/davinci-react-ui";

export function BreadcrumbsPanel() {
  return (
    <Card variant="filled">
      <CardHeader>
        <CardTitle>Breadcrumbs</CardTitle>
        <CardDescription>Hierarchical navigation for nested dashboard pages.</CardDescription>
      </CardHeader>
      <CardContent>
        <Breadcrumbs>
          <BreadcrumbsList>
            <BreadcrumbsItem>
              <BreadcrumbsLink href="#workspace">Acme</BreadcrumbsLink>
              <BreadcrumbsSeparator />
            </BreadcrumbsItem>
            <BreadcrumbsItem>
              <BreadcrumbsLink href="#projects">Projects</BreadcrumbsLink>
              <BreadcrumbsSeparator />
            </BreadcrumbsItem>
            <BreadcrumbsItem>
              <BreadcrumbsCurrent>Analytics API</BreadcrumbsCurrent>
            </BreadcrumbsItem>
          </BreadcrumbsList>
        </Breadcrumbs>
      </CardContent>
    </Card>
  );
}
