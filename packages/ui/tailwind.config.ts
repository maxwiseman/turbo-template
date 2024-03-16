/*
 * This file is not used for any compilation purpose, it is only used
 * for Tailwind Intellisense & Autocompletion in the source files
 */
import type { Config } from "tailwindcss";

import baseConfig from "@acme/tailwind-config/web";

export default {
  content: ["./src/**/*.tsx"],
  presets: [baseConfig],
  theme: {
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
      "caret-blink": {
        "0%,70%,100%": { opacity: "1" },
        "20%,50%": { opacity: "0" },
      },
    },
    animation: {
      "caret-blink": "caret-blink 1.25s ease-out infinite",
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
  },
} satisfies Config;
