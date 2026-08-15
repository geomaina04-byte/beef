"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTransition } from "@/lib/transition-context";

export default function RouteTransitionListener() {
  const { navigate, phase } = useTransition();
  const pathname = usePathname();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (phase !== "idle") return;
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Only intercept internal, in-app navigations.
      if (!href.startsWith("/")) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      // Same-page hash anchors (e.g. "#pricing" while already on that page)
      // are left to Lenis smooth-scroll — no route change is happening.
      const [path] = href.split("#");
      if (path === "" && pathname !== "/") return;
      if (path === pathname && href.includes("#")) return;

      e.preventDefault();
      navigate(href);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [navigate, phase, pathname]);

  return null;
}
