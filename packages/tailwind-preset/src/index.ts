import type { Config } from "tailwindcss";

const preset = {
  theme: {
    extend: {
      colors: {
        background: "var(--davinci-semantic-color-background)",
        surface: "var(--davinci-semantic-color-surface)",
        "surface-raised": "var(--davinci-semantic-color-surface-raised)",
        "background-hovered": "var(--davinci-semantic-color-background-hovered)",
        "background-pressed": "var(--davinci-semantic-color-background-pressed)",
        "background-selected": "var(--davinci-semantic-color-background-selected)",
        "background-disabled": "var(--davinci-semantic-color-background-disabled)",
        foreground: "var(--davinci-semantic-color-foreground)",
        "text-subtle": "var(--davinci-semantic-color-text-subtle)",
        "text-muted": "var(--davinci-semantic-color-text-muted)",
        "text-inverse": "var(--davinci-semantic-color-text-inverse)",
        "text-disabled": "var(--davinci-semantic-color-text-disabled)",
        link: "var(--davinci-semantic-color-link)",
        primary: "var(--davinci-semantic-color-primary)",
        "primary-hovered": "var(--davinci-semantic-color-primary-hovered)",
        "primary-pressed": "var(--davinci-semantic-color-primary-pressed)",
        "primary-foreground": "var(--davinci-semantic-color-primary-foreground)",
        border: "var(--davinci-semantic-color-border)",
        "border-bold": "var(--davinci-semantic-color-border-bold)",
        "border-disabled": "var(--davinci-semantic-color-border-disabled)",
        "border-focused": "var(--davinci-semantic-color-border-focused)",
        muted: "var(--davinci-semantic-color-muted)",
        destructive: "var(--davinci-semantic-color-destructive)",
        "destructive-hovered": "var(--davinci-semantic-color-destructive-hovered)",
        "destructive-pressed": "var(--davinci-semantic-color-destructive-pressed)",
        "destructive-foreground": "var(--davinci-semantic-color-destructive-foreground)",
        success: "var(--davinci-semantic-color-success)",
        "success-foreground": "var(--davinci-semantic-color-success-foreground)",
        warning: "var(--davinci-semantic-color-warning)",
        "warning-foreground": "var(--davinci-semantic-color-warning-foreground)",
        information: "var(--davinci-semantic-color-information)",
        "information-foreground": "var(--davinci-semantic-color-information-foreground)",
        discovery: "var(--davinci-semantic-color-discovery)",
        "discovery-foreground": "var(--davinci-semantic-color-discovery-foreground)"
      },
      borderRadius: {
        none: "var(--davinci-radius-none)",
        sm: "var(--davinci-radius-sm)",
        md: "var(--davinci-radius-md)",
        lg: "var(--davinci-radius-lg)",
        xl: "var(--davinci-radius-xl)",
        full: "var(--davinci-radius-full)",
        control: "var(--davinci-radius-control)",
        card: "var(--davinci-radius-card)",
        panel: "var(--davinci-radius-panel)",
        pill: "var(--davinci-radius-pill)"
      },
      fontFamily: {
        sans: "var(--davinci-font-family-sans)",
        mono: "var(--davinci-font-family-mono)"
      },
      fontSize: {
        body: ["var(--davinci-typography-body-font-size)", { lineHeight: "var(--davinci-typography-body-line-height)" }],
        "body-sm": [
          "var(--davinci-typography-body-small-font-size)",
          { lineHeight: "var(--davinci-typography-body-small-line-height)" }
        ],
        label: ["var(--davinci-typography-label-font-size)", { lineHeight: "var(--davinci-typography-label-line-height)" }],
        "heading-sm": [
          "var(--davinci-typography-heading-sm-font-size)",
          { lineHeight: "var(--davinci-typography-heading-sm-line-height)" }
        ],
        "heading-md": [
          "var(--davinci-typography-heading-md-font-size)",
          { lineHeight: "var(--davinci-typography-heading-md-line-height)" }
        ],
        "heading-lg": [
          "var(--davinci-typography-heading-lg-font-size)",
          { lineHeight: "var(--davinci-typography-heading-lg-line-height)" }
        ],
        code: ["var(--davinci-typography-code-font-size)", { lineHeight: "var(--davinci-typography-code-line-height)" }]
      },
      fontWeight: {
        regular: "var(--davinci-font-weight-regular)",
        medium: "var(--davinci-font-weight-medium)",
        semibold: "var(--davinci-font-weight-semibold)",
        bold: "var(--davinci-font-weight-bold)"
      },
      letterSpacing: {
        normal: "var(--davinci-font-letter-spacing-normal)",
        wide: "var(--davinci-font-letter-spacing-wide)"
      },
      lineHeight: {
        "100": "var(--davinci-font-line-height-100)",
        "200": "var(--davinci-font-line-height-200)",
        "300": "var(--davinci-font-line-height-300)",
        "400": "var(--davinci-font-line-height-400)",
        "500": "var(--davinci-font-line-height-500)",
        "600": "var(--davinci-font-line-height-600)",
        "700": "var(--davinci-font-line-height-700)"
      },
      spacing: {
        "025": "var(--davinci-spacing-025)",
        "050": "var(--davinci-spacing-050)",
        "075": "var(--davinci-spacing-075)",
        "100": "var(--davinci-spacing-100)",
        "150": "var(--davinci-spacing-150)",
        "200": "var(--davinci-spacing-200)",
        "250": "var(--davinci-spacing-250)",
        "300": "var(--davinci-spacing-300)",
        "400": "var(--davinci-spacing-400)",
        "500": "var(--davinci-spacing-500)",
        "600": "var(--davinci-spacing-600)",
        "800": "var(--davinci-spacing-800)",
        "1000": "var(--davinci-spacing-1000)"
      },
      ringColor: {
        focus: "var(--davinci-focus-ring-color)"
      },
      ringOffsetColor: {
        background: "var(--davinci-semantic-color-background)",
        surface: "var(--davinci-semantic-color-surface)",
        "surface-raised": "var(--davinci-semantic-color-surface-raised)"
      },
      ringOffsetWidth: {
        focus: "var(--davinci-focus-ring-offset)"
      },
      ringWidth: {
        focus: "var(--davinci-focus-ring-width)"
      },
      boxShadow: {
        none: "var(--davinci-semantic-shadow-none)",
        card: "var(--davinci-semantic-shadow-card)",
        raised: "var(--davinci-semantic-shadow-raised)",
        overlay: "var(--davinci-semantic-shadow-overlay)"
      }
    }
  }
} satisfies Config;

export default preset;
