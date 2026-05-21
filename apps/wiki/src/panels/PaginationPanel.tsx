import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Pagination,
  Stack
} from "@jarviisha/davinci-react-ui";

export function PaginationPanel() {
  const [page, setPage] = useState(6);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pagination</CardTitle>
        <CardDescription>Controlled pagination for tables and search result lists.</CardDescription>
      </CardHeader>
      <CardContent>
        <Stack gap="200">
          <Pagination onPageChange={setPage} page={page} pageCount={18} />
          <span style={{ color: "var(--davinci-semantic-color-text-subtle)", fontSize: "0.875rem" }}>
            Showing page {page} of 18
          </span>
        </Stack>
      </CardContent>
    </Card>
  );
}
