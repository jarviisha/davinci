import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  SearchInput,
  Stack
} from "@jarviisha/davinci-react-ui";

export function SearchInputPanel() {
  const [query, setQuery] = useState("invoice");

  return (
    <Card>
      <CardHeader>
        <CardTitle>SearchInput</CardTitle>
        <CardDescription>Search field with leading icon and optional clear action.</CardDescription>
      </CardHeader>
      <CardContent>
        <Stack gap="200">
          <SearchInput
            onChange={(event) => setQuery(event.target.value)}
            onClear={() => setQuery("")}
            placeholder="Search invoices"
            value={query}
          />
          <SearchInput placeholder="Small search" size="sm" />
          <SearchInput placeholder="Large search" size="lg" />
        </Stack>
      </CardContent>
    </Card>
  );
}
