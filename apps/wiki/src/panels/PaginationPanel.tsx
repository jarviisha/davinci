import { useState } from "react";
import { Pagination, Stack } from "@jarviisha/davinci-react-ui";
import { PanelSection } from "../components/PanelSection";
import type { PanelMeta } from "./types";

export const paginationPanelMeta: PanelMeta = {
  id: "pagination",
  label: "Pagination",
  group: "Navigation",
  description: "Controlled pagination for tables and search result lists."
};

export function PaginationPanel() {
  const [page, setPage] = useState(6);

  return (
    <PanelSection title="Pagination" description={paginationPanelMeta.description}>
      <Stack gap="200">
        <Pagination onPageChange={setPage} page={page} pageCount={18} />
        <span style={{ color: "var(--davinci-semantic-color-foreground-subtle)", fontSize: "0.875rem" }}>
          Showing page {page} of 18
        </span>
      </Stack>
    </PanelSection>
  );
}
