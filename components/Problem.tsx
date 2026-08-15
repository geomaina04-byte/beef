"use client";

import { motion } from "framer-motion";

const PROBLEMS = [
  { title: "Food fraud", copy: "Mislabeled cuts and false origin claims erode consumer trust." },
  { title: "Unknown origin", copy: "One outbreak and no one can say which farm, which batch, which day." },
  { title: "Disease spread", copy: "Without movement records, containment is guesswork under pressure." },
  { title: "Paper trails", copy: "Registers and receipts that vanish, fade, or simply get lost." },
  { title: "Slow audits", copy: "Export certification stalls waiting on records that don't exist yet." },
  { title: "Poor traceability", copy: "A supply chain with eight handoffs and zero shared truth." },
];

export default function Problem() {
  return (
    <section className="section-pad relative">
      <div className="container-lux">
        <div className="mb-16 max-w-2xl">
          <p className="eyebrow mb-4 text-maroon-bright">The problem</p>
          <h2 className="font-display text-4xl font-800 leading-tight text-cream md:text-5xl">
            The beef industry runs on{" "}
            <span className="text-gradient-gold">records nobody can verify.</span>
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-3xl bg-cream/5 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-charcoal p-8 transition-colors hover:bg-charcoal-raised"
            >
              <span className="font-mono text-xs text-maroon-bright">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-xl font-700 text-cream">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/50">{p.copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
