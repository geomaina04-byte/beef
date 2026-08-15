"use client";

import { motion } from "framer-motion";
import {
  FaTractor,
  FaHandshake,
  FaTruck,
  FaIndustry,
  FaBoxesPacking,
  FaTruckMoving,
  FaStore,
  FaCartShopping,
} from "react-icons/fa6";

const STEPS = [
  { icon: FaTractor, label: "Farmer", copy: "Birth, health, and breeding recorded at the source." },
  { icon: FaHandshake, label: "Livestock Trader", copy: "Ownership transfer and pricing logged instantly." },
  { icon: FaTruck, label: "Transporter", copy: "GPS-tracked movement from farm to market." },
  { icon: FaIndustry, label: "Slaughterhouse", copy: "Animal-to-carcass link maintained, post-mortem noted." },
  { icon: FaBoxesPacking, label: "Processing", copy: "Cutting, batching, and QR code generation." },
  { icon: FaTruckMoving, label: "Distributor", copy: "Inventory and delivery tracked door to door." },
  { icon: FaStore, label: "Retailer", copy: "Stock verified the moment it hits the shelf." },
  { icon: FaCartShopping, label: "Consumer", copy: "One scan reveals the full farm-to-plate journey." },
];

export default function Solution() {
  return (
    <section id="solution" className="section-pad relative bg-charcoal-soft">
      <div className="container-lux">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4 text-emerald-bright">The solution</p>
            <h2 className="font-display text-4xl font-800 leading-tight text-cream md:text-5xl">
              One record, followed through{" "}
              <span className="text-gradient-gold">eight handoffs.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-cream/50">
            BeefTrace attaches a verifiable digital identity to every animal at birth, and
            carries it&mdash;unbroken&mdash;through every stage of the supply chain.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/20 bg-white/[0.03] text-gold-soft">
                <s.icon size={22} />
              </div>
              <p className="mt-3 text-xs font-semibold text-cream/80">{s.label}</p>
              <p className="mt-1 hidden text-[11px] leading-snug text-cream/40 lg:block">
                {s.copy}
              </p>
              {i < STEPS.length - 1 && (
                <span className="absolute right-[-10px] top-8 hidden h-px w-5 bg-gradient-to-r from-gold/40 to-transparent lg:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
