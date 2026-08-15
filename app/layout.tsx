import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/lib/smooth-scroll";
import { TransitionProvider } from "@/lib/transition-context";
import TransitionOverlay from "@/components/TransitionOverlay";
import RouteTransitionListener from "@/components/RouteTransitionListener";
import BootIntro from "@/components/BootIntro";
import { ThemeProvider } from "@/theme/ThemeProvider";

export const metadata: Metadata = {
  title: "BeefTrace — Digital Livestock Traceability, Farm to Plate",
  description:
    "BeefTrace tracks every animal from birth to plate — GPS movement, health records, blockchain-backed verification, and QR traceability the entire beef supply chain can trust.",
  metadataBase: new URL("https://beeftrace.co.ke"),
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    images: ["/opengraph-image.png"],
  },
};

// Keep this string literally in sync with THEME_STORAGE_KEY in theme/tokens.ts —
// it has to be inlined (can't import) since it must run synchronously before
// hydration, before React (or anything else) is on the page.
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('beeftrace-theme');
    var theme = stored === 'dark' || stored === 'light'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        {/* Runs before paint so the correct theme is applied immediately —
            no flash of the wrong theme, no hydration mismatch. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-charcoal text-cream antialiased">
        <ThemeProvider>
          <div className="grain-overlay" aria-hidden="true" />
          <TransitionProvider>
            <BootIntro />
            <TransitionOverlay />
            <RouteTransitionListener />
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
          </TransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
