"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { THEME_ATTRIBUTE, THEME_STORAGE_KEY, type Theme } from "./tokens";

const MORPH_CLASS = "theme-morphing";
const MORPH_DURATION = 600;

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // The blocking script in app/layout.tsx already set data-theme on <html>
  // before hydration — read that back instead of re-deriving it, so the
  // server-rendered markup and the first client render always agree.
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof document === "undefined") return "dark";
    const attr = document.documentElement.getAttribute(THEME_ATTRIBUTE);
    return attr === "light" ? "light" : "dark";
  });

  const applyTheme = useCallback((next: Theme, morph = true) => {
    const root = document.documentElement;
    if (morph) {
      root.classList.add(MORPH_CLASS);
      window.setTimeout(() => root.classList.remove(MORPH_CLASS), MORPH_DURATION);
    }
    root.setAttribute(THEME_ATTRIBUTE, next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // localStorage can throw in private-browsing / restricted contexts —
      // theme still applies for this session, it just won't persist.
    }
    setThemeState(next);
  }, []);

  // Follow the OS theme live, but only while the visitor hasn't made an
  // explicit choice of their own — an explicit pick always wins.
  useEffect(() => {
    if (!window.matchMedia) return;
    const mql = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e: MediaQueryListEvent) => {
      let stored: string | null = null;
      try {
        stored = window.localStorage.getItem(THEME_STORAGE_KEY);
      } catch {
        // ignore
      }
      if (stored === "dark" || stored === "light") return;
      applyTheme(e.matches ? "light" : "dark");
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [applyTheme]);

  const toggleTheme = useCallback(() => {
    applyTheme(theme === "dark" ? "light" : "dark");
  }, [applyTheme, theme]);

  const setTheme = useCallback((next: Theme) => applyTheme(next), [applyTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, toggleTheme, setTheme }),
    [theme, toggleTheme, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
