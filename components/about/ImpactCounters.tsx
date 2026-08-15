"use client";

import { motion } from "framer-motion";

// Honest, pre-launch status — replace with real animated counters once
// BeefTrace has actual farms, records, and processing partners live.
const STATUS = [
  { value: "Pre-launch", label: "Current stage" },
  { value: "0", label: "Farms onboarded" },
  { value: "0", label: "Verified records" },
  { value: "6", label: "Team members" },
];

export default function ImpactCounters() {
  return (
    <section className="section-pad relative border-y border-cream/5">
      <div className="container-lux mb-14 max-w-xl">
        <p className="eyebrow mb-4 text-emerald-bright">Where we are</p>
        <h2 className="font-display text-3xl font-800 leading-tight text-cream md:text-4xl">
          Early, honest, <span className="text-gradient-gold">and building.</span>
        </h2>
        <p className="mt-2 text-[11px] text-cream/25">
          Real figures, not projections — this section grows as the platform
          actually launches.
        </p>
      </div>
      <div className="container-lux grid grid-cols-2 gap-8 md:grid-cols-4">
        {STATUS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="text-center"
          >
            <p className="font-display text-3xl font-800 text-cream md:text-4xl">{s.value}</p>
            <p className="mt-2 text-xs text-cream/40">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
