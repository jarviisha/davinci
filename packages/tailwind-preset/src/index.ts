import type { Config } from "tailwindcss";

const preset = {
  theme: {
    extend: {
      colors: {
        background: "var(--davinci-semantic-color-background)",
        surface: "var(--davinci-semantic-color-surface)",
        "surface-raised": "var(--davinci-semantic-color-surface-raised)",
        "background-subtle": "var(--davinci-semantic-color-background-subtle)",
        "background-subtle-hovered": "var(--davinci-semantic-color-background-subtle-hovered)",
        "background-subtle-pressed": "var(--davinci-semantic-color-background-subtle-pressed)",
        "background-hovered": "var(--davinci-semantic-color-background-hovered)",
        "background-pressed": "var(--davinci-semantic-color-background-pressed)",
        "background-selected": "var(--davinci-semantic-color-background-selected)",
        "background-disabled": "var(--davinci-semantic-color-background-disabled)",
        foreground: "var(--davinci-semantic-color-foreground)",
        "foreground-subtle": "var(--davinci-semantic-color-foreground-subtle)",
        "foreground-subtlest": "var(--davinci-semantic-color-foreground-subtlest)",
        "foreground-inverse": "var(--davinci-semantic-color-foreground-inverse)",
        "foreground-disabled": "var(--davinci-semantic-color-foreground-disabled)",
        "foreground-selected": "var(--davinci-semantic-color-foreground-selected)",
        "border-subtle": "var(--davinci-semantic-color-border-subtle)",
        border: "var(--davinci-semantic-color-border)",
        "border-bold": "var(--davinci-semantic-color-border-bold)",
        "border-boldest": "var(--davinci-semantic-color-border-boldest)",
        "border-hovered": "var(--davinci-semantic-color-border-hovered)",
        "border-focused": "var(--davinci-semantic-color-border-focused)",
        "border-selected": "var(--davinci-semantic-color-border-selected)",
        "border-disabled": "var(--davinci-semantic-color-border-disabled)",
        link: "var(--davinci-semantic-color-link)",
        "link-hovered": "var(--davinci-semantic-color-link-hovered)",
        "link-pressed": "var(--davinci-semantic-color-link-pressed)",
        primary: "var(--davinci-semantic-color-primary)",
        "primary-hovered": "var(--davinci-semantic-color-primary-hovered)",
        "primary-pressed": "var(--davinci-semantic-color-primary-pressed)",
        "primary-foreground": "var(--davinci-semantic-color-primary-foreground)",
        danger: "var(--davinci-semantic-color-danger)",
        "danger-hovered": "var(--davinci-semantic-color-danger-hovered)",
        "danger-pressed": "var(--davinci-semantic-color-danger-pressed)",
        "danger-foreground": "var(--davinci-semantic-color-danger-foreground)",
        success: "var(--davinci-semantic-color-success)",
        "success-foreground": "var(--davinci-semantic-color-success-foreground)",
        warning: "var(--davinci-semantic-color-warning)",
        "warning-foreground": "var(--davinci-semantic-color-warning-foreground)",
        info: "var(--davinci-semantic-color-info)",
        "info-foreground": "var(--davinci-semantic-color-info-foreground)",
        discovery: "var(--davinci-semantic-color-discovery)",
        "discovery-foreground": "var(--davinci-semantic-color-discovery-foreground)",
        overlay: "var(--davinci-semantic-color-overlay)"
      },
      borderRadius: {
        none: "var(--davinci-radius-none)",
        sm: "var(--davinci-radius-sm)",
        md: "var(--davinci-radius-md)",
        lg: "var(--davinci-radius-lg)",
        xl: "var(--davinci-radius-xl)",
        full: "var(--davinci-radius-full)",
        control: "var(--davinci-semantic-radius-control)",
        card: "var(--davinci-semantic-radius-card)",
        panel: "var(--davinci-semantic-radius-panel)",
        pill: "var(--davinci-semantic-radius-pill)"
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
        focus: "var(--davinci-semantic-focus-ring-color)"
      },
      ringOffsetColor: {
        background: "var(--davinci-semantic-color-background)",
        surface: "var(--davinci-semantic-color-surface)",
        "surface-raised": "var(--davinci-semantic-color-surface-raised)"
      },
      ringOffsetWidth: {
        focus: "var(--davinci-semantic-focus-ring-offset)"
      },
      ringWidth: {
        focus: "var(--davinci-semantic-focus-ring-width)"
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
