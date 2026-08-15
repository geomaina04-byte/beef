"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PANELS = [
  {
    image: "/journey/born.jpg",
    alt: "Newborn calf with an RFID ear tag being registered on the farm",
    tag: "Day 0",
    title: "Born & registered",
    copy: "A unique digital ID is issued the moment the calf is registered on the farm.",
  },
  {
    image: "/journey/health.jpg",
    alt: "Veterinarian vaccinating an animal with a tablet logging the health record",
    tag: "Month 1–18",
    title: "Health & vaccination",
    copy: "Every vet visit, vaccination, and inspection attaches to the animal's record.",
  },
  {
    image: "/journey/transport.jpg",
    alt: "Livestock transport truck loaded with cattle at sunset",
    tag: "Transit",
    title: "Sale & transport",
    copy: "GPS logs the route from farm to market to slaughterhouse, in real time.",
  },
  {
    image: "/journey/slaughter.jpg",
    alt: "Meat inspector reviewing carcasses in a processing facility",
    tag: "Processing",
    title: "Slaughter & inspection",
    copy: "Post-mortem inspection and the carcass ID are linked back to the source animal.",
  },
  {
    image: "/journey/distribution.jpg",
    alt: "Warehouse worker scanning a packaged, QR-coded shipment",
    tag: "Packaging",
    title: "Cut, packed, QR-coded",
    copy: "Each pack is batch-coded and stamped with a scannable QR at the point of cutting.",
  },
  {
    image: "/journey/retail.jpg",
    alt: "Packaged beef on a retail shelf with QR-coded origin labels",
    tag: "Retail",
    title: "On the shelf",
    copy: "The retailer verifies stock and freshness the instant the delivery arrives.",
  },
  {
    image: "https://images.unsplash.com/photo-1595079835357-a94a13cab10c?auto=format&fit=crop&w=900&q=75",
    alt: "Shopper scanning a QR code on their phone",
    tag: "Consumer",
    title: "One scan, full story",
    copy: "A shopper scans the pack and sees the complete farm-to-plate journey.",
  },
];

// The first two cards are visible immediately (no scrolling required to
// understand the section); the rest reveal progressively as the user scrolls.
const ALWAYS_VISIBLE = 2;
const REVEAL_WINDOW = 0.28; // fraction of total scroll each card takes to fully reveal

gsap.registerPlugin(ScrollTrigger);

export default function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!sectionRef.current || !trackRef.current) return;

    if (reduced) {
      imageRefs.current.forEach((el) => el && gsap.set(el, { opacity: 1, scale: 1, y: 0, rotate: 0 }));
      contentRefs.current.forEach((el) => el && gsap.set(el, { opacity: 1, y: 0 }));
    }

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const scrollLength = track.scrollWidth - window.innerWidth;
      const revealCount = PANELS.length - ALWAYS_VISIBLE;

      // Set every card's starting state up front — the first two fully
      // shown, the rest hidden until scroll progress reaches their turn.
      imageRefs.current.forEach((el, i) => {
        if (!el) return;
        if (reduced || i < ALWAYS_VISIBLE) {
          gsap.set(el, { opacity: 1, scale: 1, y: 0, rotate: 0 });
        } else {
          gsap.set(el, { opacity: 0, scale: 0.85, y: 40, rotate: -8 });
        }
      });
      contentRefs.current.forEach((el, i) => {
        if (!el) return;
        if (reduced || i < ALWAYS_VISIBLE) {
          gsap.set(el, { opacity: 1, y: 0 });
        } else {
          gsap.set(el, { opacity: 0, y: 16 });
        }
      });

      if (reduced) return;

      // Each card's visibility is a direct, continuously-recomputed function
      // of scroll progress (0–1) — not a one-time "did this fire yet?" event.
      // That means there's no state to get stuck: even if a frame is skipped
      // or the user jumps scroll position abruptly, the very next update
      // recalculates the correct state from scratch, so a card can never end
      // up permanently blank the way the previous event-based approach could.
      function applyReveal(progress: number) {
        for (let i = ALWAYS_VISIBLE; i < PANELS.length; i++) {
          const idx = i - ALWAYS_VISIBLE;
          const start = revealCount > 1 ? idx / revealCount : 0;
          const local = gsap.utils.clamp(0, 1, (progress - start) / REVEAL_WINDOW);

          const image = imageRefs.current[i];
          const content = contentRefs.current[i];
          if (image) {
            gsap.set(image, {
              opacity: local,
              scale: 0.85 + 0.15 * local,
              y: 40 * (1 - local),
              rotate: -8 * (1 - local),
            });
          }
          if (content) {
            gsap.set(content, { opacity: local, y: 16 * (1 - local) });
          }
        }
      }

      const trigger = gsap.to(track, {
        x: -scrollLength,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollLength}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => applyReveal(self.progress),
        },
      });

      return () => {
        trigger.scrollTrigger?.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-charcoal">
      <div className="container-lux absolute left-0 right-0 top-16 z-10">
        <p className="eyebrow mb-3 text-emerald-bright">One animal, one record</p>
        <h2 className="font-display text-3xl font-800 leading-tight text-cream md:text-5xl">
          Follow the journey, <span className="text-gradient-gold">birth to supermarket.</span>
        </h2>
      </div>

      <div
        ref={trackRef}
        className="flex h-screen w-max items-center gap-6 pl-[6vw] pr-[20vw] pt-24 md:gap-10 md:pt-32"
      >
        {PANELS.map((p, i) => (
          <div
            key={p.title}
            className="glass flex h-[360px] w-[78vw] max-w-[420px] shrink-0 flex-col rounded-3xl p-8 shadow-[0_20px_50px_-15px_rgba(212,166,87,0.12)] md:h-[400px]"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-gold-soft">{p.tag}</span>
              <span className="font-mono text-xs text-cream/30">
                {String(i + 1).padStart(2, "0")}/{String(PANELS.length).padStart(2, "0")}
              </span>
            </div>

            <div
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
              className="relative mt-5 h-[130px] w-full shrink-0 overflow-hidden rounded-2xl border border-cream/10 shadow-[0_15px_40px_rgba(0,0,0,0.4)] md:h-[170px]"
            >
              <img
                src={p.image}
                alt={p.alt}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent" />
            </div>

            <div
              ref={(el) => {
                contentRefs.current[i] = el;
              }}
              className="mt-5 flex-1"
            >
              <h3 className="font-display text-2xl font-700 text-cream">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/50">{p.copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
