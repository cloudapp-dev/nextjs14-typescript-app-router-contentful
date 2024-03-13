import type { Config } from "tailwindcss";
import tokens from "@contentful/f36-tokens";
const { fontFamily } = require("tailwindcss/defaultTheme");

const colors = Object.entries(tokens).reduce(
  (acc: Record<string, any>, [key, value]) => {
    // Filter Hex colors from the f36-tokens
    if (/^#[0-9A-F]{6}$/i.test(value as any)) {
      acc[key] = value;
    }

    return acc;
  },
  {} as Record<string, string>
);

const config: Config = {
  darkMode: "class",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors,
    extend: {
      maxWidth: {
        "8xl": "90rem",
      },
      letterSpacing: {
        snug: "-0.011em",
      },
      boxShadow: {
        // light
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        "2xs": "0.625rem",
        "3xl": "1.75rem",
        "4xl": "2.5rem",
        "tremor-label": "0.75rem",
        "tremor-default": ["1.0rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
      lineHeight: {
        tighter: "1.1",
      },
      fontFamily: {
        sans: ["var(--font-urbanist)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
