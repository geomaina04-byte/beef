"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import NetworkCanvas from "@/components/NetworkCanvas";
import { PHOTOS, unsplashSrc } from "@/lib/photos";
import { FaQrcode, FaLink, FaSatellite, FaBrain } from "react-icons/fa6";

const BADGES = [
  { icon: FaQrcode, label: "QR Traceability", pos: "left-[6%] top-[18%]", delay: 0 },
  { icon: FaLink, label: "Blockchain Ledger", pos: "right-[8%] top-[28%]", delay: 1.2 },
  { icon: FaSatellite, label: "GPS Movement", pos: "left-[10%] bottom-[22%]", delay: 2.1 },
  { icon: FaBrain, label: "AI Analytics", pos: "right-[12%] bottom-[16%]", delay: 0.6 },
];

export default function TechHero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!headlineRef.current) return;

    const words = headlineRef.current.querySelectorAll<HTMLElement>("[data-word]");
    if (reduced) {
      words.forEach((w) => w.style.setProperty("opacity", "1"));
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 130, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.06,
          delay: 0.15,
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const line1 = "The infrastructure";
  const line2 = "behind every claim.";

  return (
    <section id="top" className="relative flex min-h-[92vh] items-center overflow-hidden pt-32">
      <img
        src={unsplashSrc(PHOTOS.serverRoom.url, { w: 2000, q: 55 })}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.16]"
      />
      <div className="absolute inset-0 bg-charcoal/75" />
      <div className="absolute inset-0 opacity-40">
        <NetworkCanvas />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(107,20,24,0.28), transparent), radial-gradient(40% 40% at 85% 75%, rgba(47,111,78,0.18), transparent)",
        }}
      />

      {BADGES.map((b) => (
        <div
          key={b.label}
          className={`glass absolute ${b.pos} hidden animate-float items-center gap-2 rounded-full px-4 py-2 md:flex`}
          style={{ animationDelay: `${b.delay}s` }}
        >
          <b.icon className="text-gold-soft" size={14} />
          <span className="font-mono text-[11px] tracking-wide text-cream/70">{b.label}</span>
        </div>
      ))}

      <div className="container-lux relative z-10">
        <p className="eyebrow mb-6 text-emerald-bright">The technology</p>
        <h1
          ref={headlineRef}
          className="max-w-4xl font-display text-5xl font-900 leading-[1.05] text-cream md:text-7xl"
        >
          <span className="block overflow-hidden">
            {line1.split(" ").map((w, i) => (
              <span key={i} data-word className="mr-[0.28em] inline-block opacity-0">
                {w}
              </span>
            ))}
          </span>
          <span className="block overflow-hidden">
            {line2.split(" ").map((w, i) => (
              <span key={i} data-word className="mr-[0.28em] inline-block opacity-0 text-gradient-gold">
                {w}
              </span>
            ))}
          </span>
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/55">
          Seven systems working as one: field capture, offline sync, a tamper-evident
          ledger, and analytics that turn raw movement data into a verifiable
          record — from the paddock to the till receipt.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#architecture"
            className="group relative overflow-hidden rounded-full bg-gold px-6 py-3 text-sm font-semibold text-charcoal-fixed transition-transform hover:scale-[1.03]"
          >
            Explore the architecture
          </a>
          <a
            href="#pillars"
            className="rounded-full border border-cream/15 px-6 py-3 text-sm font-medium text-cream/75 transition-colors hover:border-cream/30 hover:text-cream"
          >
            See each system ↓
          </a>
        </div>
      </div>
    </section>
  );
}
