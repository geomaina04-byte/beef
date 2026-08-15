"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa6";
import { useTheme } from "@/theme/ThemeProvider";

interface ThemeToggleProps {
  className?: string;
}

/**
 * Small pill switch with a sliding sun/moon glyph. Mirrors the visual
 * language of the tab-pill in PlatformPreview (layoutId spring) so it
 * feels native to the rest of the product, not bolted on.
 */
export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      role="switch"
      aria-checked={!isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative flex h-8 w-14 shrink-0 items-center rounded-full border border-cream/15 bg-charcoal-soft/60 px-1 transition-colors duration-300 hover:border-gold/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 ${className}`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="flex h-6 w-6 items-center justify-center rounded-full bg-gold shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
        style={{ marginLeft: isDark ? 0 : "auto" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-center"
            >
              <FaMoon size={11} className="text-charcoal-fixed" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-center"
            >
              <FaSun size={11} className="text-charcoal-fixed" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </button>
  );
}
