import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Theme-aware tokens — resolve against CSS variables set per
        // [data-theme] in theme/variables.css, so bg-charcoal, text-cream,
        // border-cream/10 etc. automatically adapt to dark/light without
        // any component changes. Dark values match the original palette
        // exactly; light values are the new warm-ivory / deep-charcoal set.
        charcoal: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          soft: "rgb(var(--surface-soft) / <alpha-value>)",
          raised: "rgb(var(--surface-raised) / <alpha-value>)",
        },
        cream: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          dim: "rgb(var(--ink-dim) / <alpha-value>)",
        },
        stone: "rgb(var(--stone) / <alpha-value>)",
        emerald: {
          DEFAULT: "rgb(var(--emerald) / <alpha-value>)",
          bright: "rgb(var(--emerald-bright) / <alpha-value>)",
        },

        // Fixed brand tokens — identical in both themes.
        maroon: {
          DEFAULT: "#6B1418",
          deep: "#3D0C0F",
          bright: "#8C1D22",
        },
        gold: {
          DEFAULT: "#D4A657",
          soft: "#E9C783",
          dim: "#9C7B3F",
        },

        // Fixed "on-accent" tokens — for text/chips that sit on a solid
        // gold/cream surface (e.g. a CTA button's label) and must stay
        // legible no matter which theme the rest of the page is in.
        "charcoal-fixed": {
          DEFAULT: "#0B0A09",
          raised: "#1B1815",
        },
        "cream-fixed": {
          DEFAULT: "#F5EFE6",
          dim: "#C9C1B4",
        },
      },
      fontFamily: {
        display: ["Archivo", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      backgroundImage: {
        "grain": "url('/noise.png')",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        breathe: {
          "0%,100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        breathe: "breathe 4.5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
