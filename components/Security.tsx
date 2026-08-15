"use client";

import { motion } from "framer-motion";
import { FaLock, FaCloudArrowUp, FaClipboardCheck, FaKey } from "react-icons/fa6";

const BADGES = [
  { icon: FaLock, label: "Encrypted at rest & in transit" },
  { icon: FaKey, label: "Role-based access control" },
  { icon: FaClipboardCheck, label: "Immutable audit logs" },
  { icon: FaCloudArrowUp, label: "Redundant cloud backups" },
];

export default function Security() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="container-lux grid gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow mb-4 text-maroon-bright">Enterprise-grade security</p>
          <h2 className="font-display text-4xl font-800 leading-tight text-cream md:text-5xl">
            Every record is{" "}
            <span className="text-gradient-gold">tamper-evident.</span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/55">
            Data is encrypted end to end, access is scoped by role, and every change to
            an animal&apos;s record is written to an append-only audit trail &mdash;
            visible to the people authorized to see it, invisible to everyone else.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {BADGES.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-center gap-3 rounded-xl border border-cream/10 bg-white/[0.02] p-4"
              >
                <b.icon size={16} className="shrink-0 text-emerald-bright" />
                <span className="text-xs text-cream/70">{b.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto flex h-72 w-72 items-center justify-center"
        >
          <div className="absolute inset-0 animate-breathe rounded-full bg-emerald/10 blur-2xl" />
          <div className="absolute inset-6 rounded-full border border-gold/20" />
          <div className="absolute inset-14 rounded-full border border-emerald/25" />
          <div className="glass relative flex h-28 w-28 items-center justify-center rounded-full seal-glow">
            <FaLock size={36} className="text-gold-soft" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
