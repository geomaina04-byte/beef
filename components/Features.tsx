"use client";

import { motion } from "framer-motion";
import {
  FaQrcode,
  FaLocationDot,
  FaWifi,
  FaArrowsRotate,
  FaDatabase,
  FaClipboardList,
  FaShieldHeart,
  FaUserLock,
  FaChartLine,
  FaTruckFast,
} from "react-icons/fa6";

const FEATURES = [
  {
    icon: FaQrcode,
    title: "QR Traceability",
    copy: "One scan surfaces an animal's complete farm-to-plate history.",
    span: "lg:col-span-2 lg:row-span-2",
    accent: "emerald",
  },
  {
    icon: FaLocationDot,
    title: "GPS Transport Tracking",
    copy: "Live location on every leg of the journey.",
    span: "",
    accent: "gold",
  },
  {
    icon: FaWifi,
    title: "Offline Data Capture",
    copy: "Register animals with zero signal in the field.",
    span: "",
    accent: "maroon",
  },
  {
    icon: FaArrowsRotate,
    title: "Automatic Sync",
    copy: "Offline records reconcile the moment connectivity returns.",
    span: "",
    accent: "gold",
  },
  {
    icon: FaDatabase,
    title: "Secure Cloud Database",
    copy: "Encrypted, redundant, and built for national scale.",
    span: "lg:col-span-2",
    accent: "emerald",
  },
  {
    icon: FaClipboardList,
    title: "Digital Animal Records",
    copy: "Breeding, nutrition, and rearing history in one profile.",
    span: "",
    accent: "gold",
  },
  {
    icon: FaShieldHeart,
    title: "Veterinary Health Records",
    copy: "Vaccination and inspection history, always current.",
    span: "",
    accent: "maroon",
  },
  {
    icon: FaUserLock,
    title: "Role-Based Access",
    copy: "Farmers, vets, processors, and regulators each see what they need.",
    span: "lg:col-span-2",
    accent: "gold",
  },
  {
    icon: FaChartLine,
    title: "Analytics Dashboard",
    copy: "Herd health, movement, and compliance in real time.",
    span: "",
    accent: "emerald",
  },
  {
    icon: FaTruckFast,
    title: "Export Reports",
    copy: "Certification-ready documentation, generated on demand.",
    span: "",
    accent: "gold",
  },
];

const accentMap: Record<string, string> = {
  emerald: "text-emerald-bright border-emerald/25 hover:shadow-[0_0_40px_rgba(62,148,104,0.15)]",
  gold: "text-gold-soft border-gold/25 hover:shadow-[0_0_40px_rgba(212,166,87,0.15)]",
  maroon: "text-red-200 border-maroon-bright/30 hover:shadow-[0_0_40px_rgba(140,29,34,0.2)]",
};

export default function Features() {
  return (
    <section id="features" className="section-pad relative">
      <div className="container-lux">
        <div className="mb-16 max-w-2xl">
          <p className="eyebrow mb-4 text-gold-soft">Platform capabilities</p>
          <h2 className="font-display text-4xl font-800 leading-tight text-cream md:text-5xl">
            Everything the chain needs.{" "}
            <span className="text-gradient-gold">Nothing it doesn&apos;t.</span>
          </h2>
        </div>

        <div className="grid auto-rows-[180px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-2xl border bg-charcoal-raised/60 p-6 transition-all duration-300 hover:-translate-y-1 ${f.span} ${accentMap[f.accent]}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <f.icon size={f.span ? 30 : 22} className="relative z-10" />
              <h3 className="relative z-10 mt-4 font-display text-lg font-700 text-cream">
                {f.title}
              </h3>
              <p className="relative z-10 mt-2 text-sm leading-relaxed text-cream/45">
                {f.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
