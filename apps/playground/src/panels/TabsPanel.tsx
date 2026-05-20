import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Stack,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@jarviisha/davinci-react-ui";

export function TabsPanel() {
  const [value, setValue] = useState("overview");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tabs</CardTitle>
        <CardDescription>Controlled tabs for settings screens and dashboard detail views.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs onValueChange={setValue} value={value}>
          <TabsList aria-label="Project sections">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Stack gap="100">
              <strong>Overview</strong>
              <span>Health, ownership, and recent activity for the selected project.</span>
            </Stack>
          </TabsContent>
          <TabsContent value="usage">
            <Stack gap="100">
              <strong>Usage</strong>
              <span>Request volume, storage, and seat utilization across the current billing period.</span>
            </Stack>
          </TabsContent>
          <TabsContent value="settings">
            <Stack gap="100">
              <strong>Settings</strong>
              <span>Project defaults, access rules, and integration configuration.</span>
            </Stack>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
