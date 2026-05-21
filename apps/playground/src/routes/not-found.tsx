import { useNavigate } from "react-router-dom";
import { Button, EmptyState } from "@jarviisha/davinci-react-ui";

export default function NotFoundRoute() {
  const navigate = useNavigate();
  return (
    <EmptyState
      actions={
        <Button onClick={() => navigate("/")} size="sm" tone="primary" variant="solid">
          Back to overview
        </Button>
      }
      description="The page you are looking for does not exist or has moved."
      title="Page not found"
    />
  );
}
