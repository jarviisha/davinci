import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@jarviisha/davinci-react-ui";

type PanelSectionProps = {
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
};

export function PanelSection({ title, description, children }: PanelSectionProps) {
  return (
    <Card variant="default">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
