"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaTabletScreenButton,
  FaWifi,
  FaCloud,
  FaLink,
  FaBrain,
  FaQrcode,
} from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

// Mobile browsers fire a `resize` event every time the address bar shows/hides
// while scrolling. Combined with a pinned ScrollTrigger this used to trigger a
// refresh/pin recalculation loop that pegged the main thread and crashed the
// tab on lower-end phones. This is GSAP's documented fix for that class of bug.
ScrollTrigger.config({ ignoreMobileResize: true });

const LAYERS = [
  {
    icon: FaTabletScreenButton,
    tag: "01 — Capture",
    title: "Field capture",
    copy: "Farmers, vets, and transporters log events on the app in real time — births, treatments, weigh-ins, movement — from a phone in the paddock.",
  },
  {
    icon: FaWifi,
    tag: "02 — Sync",
    title: "Offline-first sync",
    copy: "Zero signal is not a blocker. Records queue on-device and reconcile automatically the moment connectivity returns, with conflict resolution built in.",
  },
  {
    icon: FaCloud,
    tag: "03 — Platform",
    title: "Cloud platform",
    copy: "Encrypted, redundant infrastructure ingests every event, validates it against schema and role permissions, and indexes it for instant retrieval.",
  },
  {
    icon: FaLink,
    tag: "04 — Ledger",
    title: "Blockchain verification",
    copy: "Critical checkpoints — birth, ownership transfer, slaughter, packaging — are hashed and anchored to a tamper-evident ledger no single party controls.",
  },
  {
    icon: FaBrain,
    tag: "05 — Intelligence",
    title: "AI analytics",
    copy: "Movement and health data feed anomaly detection, disease-spread modelling, and compliance forecasting — flagging risk before it becomes an outbreak.",
  },
  {
    icon: FaQrcode,
    tag: "06 — Access",
    title: "Verified access",
    copy: "A single QR scan renders the full, role-appropriate story — a regulator sees audit trails, a shopper sees the farm-to-plate journey.",
  },
];

export default function ArchitectureDiagram() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    // The pinned, scrubbed scroll-jack below is heavy (a 540%-of-viewport
    // pinned section) and is what was crashing the page on mobile — phone
    // browsers recalculate pin heights constantly as their address bar
    // resizes, which fights with the scrub. Desktop/tablet keep the full
    // pinned effect; phones get a lightweight IntersectionObserver instead,
    // so the layers still highlight as you scroll, without the pin.
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        isMobile: "(max-width: 767px), (prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean; isMobile: boolean };

        if (isDesktop) {
          const st = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${LAYERS.length * 90}%`,
            scrub: 0.5,
            pin: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(
                LAYERS.length - 1,
                Math.floor(self.progress * LAYERS.length)
              );
              setActive((prev) => (prev === idx ? prev : idx));
              if (lineFillRef.current) {
                lineFillRef.current.style.height = `${self.progress * 100}%`;
              }
            },
          });
          return () => st.kill();
        }

        // Mobile / reduced-motion fallback: no pin, no scrub. Just watch
        // which node has scrolled into view.
        const nodes = nodeRefs.current.filter(Boolean) as HTMLDivElement[];
        if (nodes.length === 0) return;

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const idx = nodes.indexOf(entry.target as HTMLDivElement);
              if (idx !== -1) setActive(idx);
            });
          },
          { threshold: 0.6 }
        );
        nodes.forEach((n) => observer.observe(n));
        if (lineFillRef.current) lineFillRef.current.style.height = "100%";

        return () => observer.disconnect();
      }
    );

    return () => mm.revert();
  }, []);

  useEffect(() => {
    nodeRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i <= active) {
        el.classList.add("border-gold/60", "text-gold-soft", "bg-gold/[0.06]");
        el.classList.remove("border-cream/10", "text-cream/30");
      } else {
        el.classList.remove("border-gold/60", "text-gold-soft", "bg-gold/[0.06]");
        el.classList.add("border-cream/10", "text-cream/30");
      }
    });
  }, [active]);

  const Layer = LAYERS[active];

  return (
    <section
      id="architecture"
      ref={sectionRef}
      className="relative overflow-hidden bg-charcoal-soft"
    >
      <div className="container-lux grid min-h-screen items-center gap-12 py-24 md:grid-cols-2 md:gap-20">
        <div>
          <p className="eyebrow mb-4 text-emerald-bright">System architecture</p>
          <h2 className="font-display text-3xl font-800 leading-tight text-cream md:text-5xl">
            One pipeline, <span className="text-gradient-gold">six disciplines.</span>
          </h2>
          <p className="mt-6 max-w-md text-sm text-cream/40">
            Scroll to move data through the stack — from a farmer&apos;s phone to a
            verified record anyone can trust.
          </p>

          <div className="mt-10 min-h-[190px]">
            <span className="font-mono text-xs text-gold-soft">{Layer.tag}</span>
            <h3 className="mt-3 font-display text-2xl font-700 text-cream md:text-3xl">
              {Layer.title}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/50">
              {Layer.copy}
            </p>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="relative flex w-full max-w-sm flex-col gap-3">
            <div className="absolute left-[27px] top-2 bottom-2 w-px bg-cream/10">
              <div
                ref={lineFillRef}
                className="w-full bg-gradient-to-b from-emerald-bright to-gold"
                style={{ height: "0%" }}
              />
            </div>
            {LAYERS.map((l, i) => (
              <div
                key={l.title}
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                className={`relative z-10 flex items-center gap-4 rounded-2xl border p-4 transition-colors duration-300 ${
                  i <= active
                    ? "border-gold/60 bg-gold/[0.06] text-gold-soft"
                    : "border-cream/10 text-cream/30"
                }`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-current/40">
                  <l.icon size={15} />
                </div>
                <span className="font-display text-sm font-700">{l.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
