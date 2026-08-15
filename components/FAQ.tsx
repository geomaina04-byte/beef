"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa6";

const FAQS = [
  {
    q: "Does BeefTrace work without internet access?",
    a: "Yes. Field registration and updates are captured offline on the mobile app and sync automatically the moment a connection is available.",
  },
  {
    q: "Who can see an animal's records?",
    a: "Access is role-based. Farmers see their own herd, vets see health data they're authorized for, and regulators or exporters see only what's relevant to compliance and certification.",
  },
  {
    q: "How does the QR traceability work?",
    a: "Every pack is assigned a code linked to the animal's full record. Scanning it surfaces the farm of origin, health history, and every checkpoint the product passed through.",
  },
  {
    q: "Can BeefTrace integrate with existing systems?",
    a: "Enterprise deployments include API access for integrating with existing herd management, ERP, or government registries.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-pad relative bg-charcoal-soft">
      <div className="container-lux max-w-3xl">
        <div className="mb-12">
          <p className="eyebrow mb-4 text-gold-soft">FAQ</p>
          <h2 className="font-display text-4xl font-800 leading-tight text-cream md:text-5xl">
            Common questions.
          </h2>
        </div>

        <div className="divide-y divide-cream/10 rounded-2xl border border-cream/10">
          {FAQS.map((f, i) => (
            <div key={f.q}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-display text-base font-700 text-cream">{f.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0 text-gold-soft"
                >
                  <FaChevronDown size={14} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-sm leading-relaxed text-cream/55">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
