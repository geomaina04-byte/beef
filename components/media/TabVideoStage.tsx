"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface TabVideoStageProps {
  /** Unique key per tab — changing this triggers the fade/scale/blur swap. */
  tabKey: string;
  src: string;
  poster: string;
  caption?: string;
  className?: string;
  aspect?: string;
}

/**
 * Premium interactive video module for the dashboard tab section.
 * One video per tab — on tab change, the old clip fades out (opacity + scale +
 * blur) while the new clip loads, autoplays muted/looped, and resolves into
 * a crisp, in-place reveal. Falls back to an animated brand-gradient
 * placeholder if a clip fails to load, so we never show a black frame.
 */
export default function TabVideoStage({
  tabKey,
  src,
  poster,
  caption,
  className = "",
  aspect = "aspect-[4/3]",
}: TabVideoStageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [failedKeys, setFailedKeys] = useState<Set<string>>(new Set());
  const failed = failedKeys.has(tabKey);

  // Only autoplay while the module is actually on screen.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function markFailed(key: string) {
    setFailedKeys((prev) => new Set(prev).add(key));
  }

  return (
    <div
      ref={wrapperRef}
      className={`relative overflow-hidden rounded-[24px] border border-cream/10 bg-charcoal shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] ${aspect} ${className}`}
    >
      <AnimatePresence mode="wait">
        {!failed ? (
          <motion.video
            key={tabKey}
            src={src}
            poster={poster}
            autoPlay={inView}
            muted
            loop
            playsInline
            preload="metadata"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onError={() => markFailed(tabKey)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <motion.div
            key={`${tabKey}-fallback`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald/25 via-charcoal to-gold/15"
          >
            <div className="flex flex-col items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-soft opacity-60" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-gold-soft" />
              </span>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/50">
                Preview loading…
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* subtle top glass reflection, sits above the video/fallback */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1/3 bg-gradient-to-b from-white/[0.06] to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />

      {/* live badge */}
      <div className="pointer-events-none absolute left-4 top-4 z-20 flex items-center gap-1.5 rounded-full border border-cream/15 bg-charcoal/60 px-2.5 py-1 backdrop-blur-md">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-bright opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-bright" />
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-cream/70">Live</span>
      </div>

      {caption && (
        <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
          <AnimatePresence mode="wait">
            <motion.p
              key={caption}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-[11px] uppercase tracking-widest text-cream/60"
            >
              {caption}
            </motion.p>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
