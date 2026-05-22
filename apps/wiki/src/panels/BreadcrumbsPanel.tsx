import {
  Breadcrumbs,
  BreadcrumbsCurrent,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsSeparator
} from "@jarviisha/davinci-react-ui";
import { PanelSection } from "../components/PanelSection";
import type { PanelMeta } from "./types";

export const breadcrumbsPanelMeta: PanelMeta = {
  id: "breadcrumbs",
  label: "Breadcrumbs",
  group: "Navigation",
  description: "Hierarchical navigation for nested dashboard pages."
};

export function BreadcrumbsPanel() {
  return (
    <PanelSection title="Breadcrumbs" description={breadcrumbsPanelMeta.description}>
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
    </PanelSection>
  );
}
