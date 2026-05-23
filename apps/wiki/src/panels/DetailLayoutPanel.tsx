import type { ReactNode } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DetailLayout,
  DetailLayoutAside,
  DetailLayoutMain,
  Divider,
  Inline,
  Stack
} from "@jarviisha/davinci-react-ui";
import { PanelSection } from "../components/PanelSection";
import type { PanelMeta } from "./types";

export const detailLayoutPanelMeta: PanelMeta = {
  id: "detail-layout",
  label: "DetailLayout",
  group: "Navigation",
  description: "Two-column page layout — main content + metadata rail. Collapses to a single column on narrow viewports."
};

const frameStyle = {
  border: "1px solid var(--davinci-semantic-color-border)",
  borderRadius: "var(--davinci-radius-lg)",
  padding: "var(--davinci-spacing-300)"
} as const;

export function DetailLayoutPanel() {
  return (
    <Stack gap="300">
      <PanelSection
        title="Issue detail (aside on the right)"
        description="The default arrangement. Use inside AppShellMain to build a Jira-style issue page."
      >
        <div style={frameStyle}>
          <DetailLayout>
            <DetailLayoutMain>
              <Stack gap="200">
                <div>
                  <p
                    style={{
                      color: "var(--davinci-semantic-color-foreground-subtle)",
                      fontSize: "0.875rem",
                      margin: 0
                    }}
                  >
                    DAV-1284
                  </p>
                  <h2 style={{ margin: "0.25rem 0 0" }}>Refactor app shell to support right rail</h2>
                </div>
                <Card variant="outlined">
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                    <CardDescription>Two-column layout enables a sticky details rail.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Extend the AppShell grid with an optional aside region and a new DetailLayout primitive for
                      detail pages that need their own metadata rail.
                    </p>
                  </CardContent>
                </Card>
                <Card variant="outlined">
                  <CardHeader>
                    <CardTitle>Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Stack gap="150">
                      <Inline align="start" gap="150">
                        <Avatar name="Ada Lovelace" size="sm" />
                        <Stack gap="050">
                          <span style={{ fontWeight: 500 }}>Ada Lovelace</span>
                          <span
                            style={{
                              color: "var(--davinci-semantic-color-foreground-subtle)",
                              fontSize: "0.875rem"
                            }}
                          >
                            changed Priority to High
                          </span>
                        </Stack>
                      </Inline>
                      <Inline align="start" gap="150">
                        <Avatar name="Mina Park" size="sm" />
                        <Stack gap="050">
                          <span style={{ fontWeight: 500 }}>Mina Park</span>
                          <span
                            style={{
                              color: "var(--davinci-semantic-color-foreground-subtle)",
                              fontSize: "0.875rem"
                            }}
                          >
                            commented: Pushed initial spike to feat/app-shell-layout.
                          </span>
                        </Stack>
                      </Inline>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </DetailLayoutMain>
            <DetailLayoutAside>
              <Stack gap="200">
                <strong>Details</strong>
                <Divider />
                <Stack gap="100">
                  <MetaRow label="Status" value={<Badge variant="primary">In progress</Badge>} />
                  <MetaRow label="Assignee" value="Mina Park" />
                  <MetaRow label="Reporter" value="Ada Lovelace" />
                  <MetaRow label="Priority" value="High" />
                  <MetaRow label="Sprint" value="Sprint 24" />
                  <MetaRow label="Due" value="May 28, 2026" />
                </Stack>
              </Stack>
            </DetailLayoutAside>
          </DetailLayout>
        </div>
      </PanelSection>

      <PanelSection
        title="Sticky aside"
        description="Pass asideSticky so the rail stays in view while the main column scrolls. Disabled below 1024px."
      >
        <div style={{ ...frameStyle, maxBlockSize: "24rem", overflow: "auto" }}>
          <DetailLayout asideSticky>
            <DetailLayoutMain>
              <Stack gap="200">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <Card key={idx} variant="outlined">
                    <CardContent>
                      <p>Scrollable content block {idx + 1}. The rail on the right should stay pinned.</p>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </DetailLayoutMain>
            <DetailLayoutAside>
              <Stack gap="200">
                <strong>Pinned details</strong>
                <Divider />
                <MetaRow label="Status" value={<Badge variant="success">Open</Badge>} />
                <MetaRow label="Owner" value="Lin Chen" />
                <Button size="sm" tone="neutral" variant="outline">
                  Watch
                </Button>
              </Stack>
            </DetailLayoutAside>
          </DetailLayout>
        </div>
      </PanelSection>

      <PanelSection
        title="Aside on the left"
        description="Pass asidePlacement=&ldquo;start&rdquo; for the meta rail to sit on the leading side instead."
      >
        <div style={frameStyle}>
          <DetailLayout asidePlacement="start">
            <DetailLayoutAside>
              <Stack gap="200">
                <strong>Filters</strong>
                <Divider />
                <Stack gap="100">
                  <span style={{ fontSize: "0.875rem" }}>● Open (12)</span>
                  <span style={{ fontSize: "0.875rem" }}>● In progress (4)</span>
                  <span style={{ fontSize: "0.875rem" }}>● Done (38)</span>
                </Stack>
              </Stack>
            </DetailLayoutAside>
            <DetailLayoutMain>
              <Card variant="outlined">
                <CardHeader>
                  <CardTitle>Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Useful when the rail acts as a filter panel and the main column carries the result list.</p>
                </CardContent>
              </Card>
            </DetailLayoutMain>
          </DetailLayout>
        </div>
      </PanelSection>
    </Stack>
  );
}

function MetaRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <Inline align="center" gap="200" justify="between">
      <span style={{ color: "var(--davinci-semantic-color-foreground-subtle)", fontSize: "0.875rem" }}>{label}</span>
      <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>{value}</span>
    </Inline>
  );
}
