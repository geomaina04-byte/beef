"use client";

import { motion } from "framer-motion";

// Honest, pre-launch status — not vanity metrics. Update these as the
// platform actually goes live with real farms and verified records.
const STATUS = [
  { value: "Pre-launch", label: "Platform status" },
  { value: "Active", label: "Development stage" },
  { value: "0", label: "Verified records so far" },
  { value: "6", label: "People building it" },
];

export default function Stats() {
  return (
    <section className="section-pad relative border-y border-cream/5">
      <div className="container-lux mb-8 text-center">
        <p className="text-[11px] uppercase tracking-widest text-cream/25">
          Building in public — no inflated numbers, just where things stand
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
            <p className="font-display text-3xl font-900 text-gradient-gold md:text-4xl">
              {s.value}
            </p>
            <p className="mt-2 text-xs uppercase tracking-wide text-cream/40">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
