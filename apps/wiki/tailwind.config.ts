import preset from "@jarviisha/davinci-tailwind-preset";
import type { Config } from "tailwindcss";

export default {
  presets: [preset],
  content: ["./index.html", "./src/**/*.{ts,tsx}", "../../packages/react-ui/src/**/*.{ts,tsx}"]
} satisfies Config;
