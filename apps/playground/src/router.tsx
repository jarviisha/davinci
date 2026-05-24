import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "./layout/dashboard-layout";
import AccountsRoute from "./routes/accounts";
import FoundationsRoute from "./routes/foundations";
import NotFoundRoute from "./routes/not-found";
import OverviewRoute from "./routes/overview";
import SettingsRoute from "./routes/settings";

export const router = createBrowserRouter([
  {
    Component: DashboardLayout,
    children: [
      { index: true, Component: OverviewRoute },
      { path: "accounts", Component: AccountsRoute },
      { path: "foundations", Component: FoundationsRoute },
      { path: "settings", Component: SettingsRoute },
      { path: "*", Component: NotFoundRoute }
    ]
  }
]);
