import { useState } from "react";
import { SearchInput, Stack } from "@jarviisha/davinci-react-ui";
import { PanelSection } from "../components/PanelSection";
import type { PanelMeta } from "./types";

export const searchInputPanelMeta: PanelMeta = {
  id: "search-input",
  label: "SearchInput",
  group: "Components",
  description: "Search field with leading icon and optional clear action."
};

export function SearchInputPanel() {
  const [query, setQuery] = useState("invoice");

  return (
    <PanelSection title="SearchInput" description={searchInputPanelMeta.description}>
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
    </PanelSection>
  );
}
