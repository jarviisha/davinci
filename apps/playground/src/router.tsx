import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "./layout/dashboard-layout";
import AccountsRoute from "./routes/accounts";
import NotFoundRoute from "./routes/not-found";
import OverviewRoute from "./routes/overview";
import SettingsRoute from "./routes/settings";

export const router = createBrowserRouter([
  {
    Component: DashboardLayout,
    children: [
      { index: true, Component: OverviewRoute },
      { path: "accounts", Component: AccountsRoute },
      { path: "settings", Component: SettingsRoute },
      { path: "*", Component: NotFoundRoute }
    ]
  }
]);
