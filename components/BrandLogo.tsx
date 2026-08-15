"use client";

import { useTheme } from "@/theme/ThemeProvider";

interface BrandLogoProps {
  className?: string;
  /** Height class applied to whichever variant renders, e.g. "h-8 md:h-9". */
  imgClassName?: string;
}

/**
 * The dark-mode logo asset (/brand/logo-transparent.png) is a flat warm-cream
 * mark — perfect on a charcoal navbar, but it nearly vanishes on a light
 * background. Rather than falling back to a generic icon+text lockup, Light
 * Mode uses the exact same artwork recolored to Tamarind
 * (/brand/logo-transparent-light.png) — same wordmark, same cow mark, just
 * dark-on-light instead of light-on-dark so it stays crisp and on-brand.
 */
export default function BrandLogo({ className = "", imgClassName = "h-8 w-auto md:h-9" }: BrandLogoProps) {
  const { theme } = useTheme();

  return (
    <img
      src={theme === "light" ? "/brand/logo-transparent-light.png" : "/brand/logo-transparent.png"}
      alt="BeefTrace"
      className={`${imgClassName} ${className}`}
    />
  );
}
