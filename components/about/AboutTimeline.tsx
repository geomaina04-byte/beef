"use client";

import { motion } from "framer-motion";

const MILESTONES = [
  { year: "2023", title: "The idea", copy: "A supervisor comparison to an existing system exposed a missing stage in most livestock traceability tools — the retailer link. BeefTrace started as a fix for that gap." },
  { year: "2024", title: "First pilot", copy: "An offline-first field app went live with a small group of farmers, proving the core loop: register, track, verify." },
  { year: "2025", title: "Ledger verification", copy: "Blockchain-anchored checkpoints and QR-based consumer verification shipped, closing the loop from paddock to plate." },
  { year: "2026", title: "Scaling up", copy: "Multi-county rollout, AI-assisted health analytics, and a redesigned platform built for national infrastructure." },
];

export default function AboutTimeline() {
  return (
    <section className="section-pad relative">
      <div className="container-lux mb-16 max-w-xl">
        <p className="eyebrow mb-4 text-gold-soft">Our story</p>
        <h2 className="font-display text-4xl font-800 leading-tight text-cream md:text-5xl">
          Why BeefTrace <span className="text-gradient-gold">exists.</span>
        </h2>
        <p className="mt-5 text-sm leading-relaxed text-cream/50">
          Livestock changes hands more times than most buyers realize — farm,
          transporter, aggregator, processor, retailer. Every handoff is a
          place for the record to break. BeefTrace exists to make sure it
          never does.
        </p>
      </div>

      <div className="container-lux relative">
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-cream/10 md:left-1/2" />
        <div className="flex flex-col gap-12">
          {MILESTONES.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex md:items-center md:gap-10 ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="absolute left-0 top-1 h-[9px] w-[9px] rounded-full bg-gold md:left-1/2 md:-translate-x-1/2" />
              <div className="pl-10 md:w-1/2 md:pl-0">
                <span className="font-mono text-xs text-gold-soft">{m.year}</span>
                <h3 className="mt-2 font-display text-xl font-700 text-cream">{m.title}</h3>
                <p className="mt-2 max-w-sm text-sm text-cream/45">{m.copy}</p>
              </div>
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
