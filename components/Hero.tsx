"use client";

import { motion } from "framer-motion";
import NetworkCanvas from "./NetworkCanvas";
import CowMark from "./icons/CowMark";
import { PHOTOS, unsplashSrc } from "@/lib/photos";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[92vh] items-center overflow-hidden pt-32">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={unsplashSrc(PHOTOS.cattleField.url, { w: 1600, q: 60 })}
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        >
          <source src="/videos/beef-hero.mp4" type="video/mp4" />
        </video>
        <img
          src={unsplashSrc(PHOTOS.cattleField.url, { w: 2000, q: 60 })}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:block"
        />
        {/* Light overall wash so brand colors still read on top of the footage —
            dark mode keeps the original flat scrim; light mode gets a richer
            warm gradient (see .hero-atmosphere in theme/variables.css) instead
            of a flat pale wash, so the hero still reads as premium, not washed out. */}
        <div className="hero-atmosphere absolute inset-0" />
        {/* Left-to-right gradient keeps the headline legible over moving footage */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/55 to-transparent" />
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <NetworkCanvas />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-charcoal" />
      </div>

      <div className="container-lux relative z-10 grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/5 px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-bright" />
            <span className="eyebrow text-gold-soft">Digital livestock traceability</span>
          </motion.div>

          <h1 className="font-display text-[13vw] font-900 leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.2rem]">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
              className="block text-cream"
            >
              Know Every
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.22 }}
              className="block text-gradient-gold"
            >
              Animal.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.34 }}
              className="block text-cream"
            >
              Trust Every Bite.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.5 }}
            className="mt-8 max-w-lg text-lg leading-relaxed text-cream/65"
          >
            BeefTrace is a digital livestock traceability platform that follows one
            animal&mdash;from birth on the farm to the final cut on a plate&mdash;so
            farmers, processors, regulators, and consumers all read from the same
            record.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.62 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-charcoal-fixed transition-transform hover:scale-[1.03]"
            >
              Book a Demo
            </a>
            <a
              href="#platform"
              className="rounded-full border border-cream/20 px-7 py-3.5 text-sm font-semibold text-cream/85 transition-colors hover:border-cream/40 hover:text-cream"
            >
              Watch the Platform &rarr;
            </a>
          </motion.div>
        </div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.4 }}
          className="relative"
        >
          <div className="glass relative rounded-3xl p-5 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CowMark className="h-5 w-5 text-emerald-bright" strokeWidth={2} />
                <span className="text-xs font-semibold text-cream/70">Animal #KE-04471</span>
              </div>
              <span className="rounded-full bg-emerald/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-bright">
                Verified
              </span>
            </div>

            <div className="mb-4 grid grid-cols-3 gap-3">
              {[
                { label: "Location", value: "Nakuru, KE" },
                { label: "Health", value: "Cleared" },
                { label: "Stage", value: "Processing" },
              ].map((m) => (
                <div key={m.label} className="rounded-xl bg-white/[0.03] p-3">
                  <p className="eyebrow text-cream/40">{m.label}</p>
                  <p className="mt-1 text-sm font-semibold text-cream">{m.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-white/[0.03] p-4">
              <div className="mb-3 flex items-center justify-between text-xs text-cream/50">
                <span>Farm</span>
                <span>Transport</span>
                <span>Plant</span>
                <span>Retail</span>
              </div>
              <div className="relative h-1.5 rounded-full bg-white/5">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "72%" }}
                  transition={{ duration: 1.4, ease, delay: 0.9 }}
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-bright to-gold"
                />
              </div>
            </div>

            <motion.div
              className="absolute -right-6 -top-6 rounded-2xl border border-gold/20 bg-charcoal-raised/90 px-4 py-3 shadow-xl backdrop-blur"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="eyebrow text-cream/40">Verification</p>
              <p className="font-display text-lg font-800 text-gold-soft">QR + Ledger</p>
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -left-6 rounded-2xl border border-emerald/20 bg-charcoal-raised/90 px-4 py-3 shadow-xl backdrop-blur"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <p className="eyebrow text-cream/40">Compliance</p>
              <p className="font-display text-lg font-800 text-emerald-bright">PHI tracked</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
