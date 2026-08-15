"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTransition } from "@/lib/transition-context";

/**
 * BeefTrace branded loading screen shown on every internal navigation.
 * Two-phase timeline driven by TransitionProvider:
 *  - "covering": glass blur fades in, logo scales up from 92% and settles,
 *    a thin progress line sweeps in underneath.
 *  - "revealing": everything fades back out once the next route has mounted.
 * Total visible duration targets ~450-650ms, within the 400-700ms brief.
 * Falls back to a simple opacity fade when prefers-reduced-motion is set.
 */
export default function TransitionOverlay() {
  const { phase, onCoverComplete, onRevealComplete } = useTransition();
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (!overlayRef.current) return;

    if (phase === "covering") {
      const tl = gsap.timeline({ onComplete: onCoverComplete, defaults: { ease: "power3.out" } });

      if (reduced.current) {
        tl.set(overlayRef.current, { pointerEvents: "auto", display: "flex" });
        tl.to(overlayRef.current, { opacity: 1, duration: 0.15 });
        return;
      }

      tl.set(overlayRef.current, { pointerEvents: "auto", display: "flex" });
      tl.to(overlayRef.current, { opacity: 1, duration: 0.18 }, 0);
      tl.fromTo(logoRef.current, { opacity: 0, scale: 0.92, y: 6 }, { opacity: 1, scale: 1, y: 0, duration: 0.26 }, 0.04);
      tl.fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.32, ease: "power2.inOut" }, 0.1);
    }

    if (phase === "revealing") {
      const tl = gsap.timeline({ onComplete: onRevealComplete, defaults: { ease: "power3.inOut" } });

      if (reduced.current) {
        tl.to(overlayRef.current, { opacity: 0, duration: 0.15 });
        tl.set(overlayRef.current, { pointerEvents: "none", display: "none" });
        return;
      }

      tl.to(logoRef.current, { opacity: 0, scale: 1.04, duration: 0.18 }, 0);
      tl.to(overlayRef.current, { opacity: 0, duration: 0.22 }, 0.04);
      tl.set(overlayRef.current, { pointerEvents: "none", display: "none" });
      tl.set(barRef.current, { scaleX: 0 });
      tl.set(logoRef.current, { scale: 1 });
    }
  }, [phase, onCoverComplete, onRevealComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] hidden items-center justify-center opacity-0 backdrop-blur-2xl"
      style={{ background: "rgba(11,10,9,0.72)" }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(107,20,24,0.3),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(212,166,87,0.12),transparent_50%)]" />

      <div className="relative flex flex-col items-center gap-5">
        <img
          ref={logoRef}
          src="/brand/logo-transparent.png"
          alt="BeefTrace"
          className="h-10 w-auto opacity-0 md:h-14"
        />
        <div className="h-[2px] w-32 overflow-hidden rounded-full bg-cream/10 md:w-40">
          <div
            ref={barRef}
            className="h-full w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-emerald-bright to-gold"
          />
        </div>
      </div>
    </div>
  );
}
