/**
 * BeefTrace design tokens — dual theme (Dark default / Light).
 *
 * This file is the single source of truth for what each theme *means*.
 * The actual CSS custom properties live in `theme/variables.css` (they
 * have to be plain CSS so Tailwind's `rgb(var(--x) / <alpha-value>)`
 * trick can add opacity modifiers like `bg-charcoal/60`) — the hex
 * values below must stay in sync with that file.
 *
 * Both themes use the "Engie Designs" brand palette (Camel Coat, Boho,
 * Rubine, Tamarind, Italian Roast): Dark Mode is Italian Roast / Tamarind
 * surfaces with Camel Coat text; Light Mode is a Camel Coat surface with
 * Tamarind text and a Rubine accent — a light background with dark words
 * in light mode, a dark background with light words in dark mode, never
 * a generic "inverted" theme.
 */

export type Theme = "dark" | "light";

export const THEMES: Theme[] = ["dark", "light"];
export const DEFAULT_THEME: Theme = "dark";
export const THEME_STORAGE_KEY = "beeftrace-theme";
export const THEME_ATTRIBUTE = "data-theme";

interface ThemePalette {
  /** Page / section background */
  surface: string;
  /** Secondary section background (bands, alternating sections) */
  surfaceSoft: string;
  /** Elevated card / panel background */
  surfaceRaised: string;
  /** Primary text, icons, borders */
  ink: string;
  /** Secondary / muted text */
  inkDim: string;
  /** Brand emerald */
  emerald: string;
  /** Brand emerald, brighter — hover/active/highlight states */
  emeraldBright: string;
}

export const PALETTE: Record<Theme, ThemePalette> = {
  dark: {
    surface: "#280B0F", // Italian Roast
    surfaceSoft: "#361319", // Tamarind
    surfaceRaised: "#533333", // Tamarind lifted toward Camel Coat
    ink: "#C6B39A", // Camel Coat — light writing on a dark background
    inkDim: "#7B694E", // Boho
    emerald: "#927F65", // Boho lifted toward Camel Coat
    emeraldBright: "#A8957C",
  },
  light: {
    surface: "#C6B39A", // Camel Coat background
    surfaceSoft: "#BBA88F", // alternating section band
    surfaceRaised: "#CFBEA9", // elevated card (never pure white)
    ink: "#361319", // Tamarind — dark words on a light background
    inkDim: "#7B694E", // Boho
    emerald: "#6D3A3C", // Rubine accent
    emeraldBright: "#8A6163",
  },
};

/**
 * Colors that are intentionally the SAME in both themes and never
 * travel through a CSS variable:
 *  - gold (#D4A657 family) — the one accent that doesn't change
 *  - maroon (#6B1418 family) — confined to the boot intro's subtle red accent
 *  - charcoal-fixed / cream-fixed — used only for "on-accent" text/chips
 *    (e.g. dark text on a solid gold button) that must stay legible
 *    regardless of theme, not for page surfaces.
 */
export const FIXED_PALETTE = {
  gold: "#D4A657",
  goldSoft: "#E9C783",
  goldDim: "#9C7B3F",
  maroon: "#6B1418",
  charcoalFixed: "#0B0A09",
  creamFixed: "#F5EFE6",
} as const;
