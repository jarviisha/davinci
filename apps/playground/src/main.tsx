import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@jarviisha/davinci-react-theme-provider";
import { ToastProvider } from "@jarviisha/davinci-react-ui";
import { router } from "./router";
import "@jarviisha/davinci-tokens/css/variables.css";
import "@jarviisha/davinci-tokens/css/light.css";
import "@jarviisha/davinci-tokens/css/dark.css";
import "@jarviisha/davinci-react-ui/styles.css";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system">
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>
);
