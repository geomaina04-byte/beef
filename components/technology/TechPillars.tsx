"use client";

import { motion } from "framer-motion";
import { PHOTOS, unsplashSrc } from "@/lib/photos";

const EASE = [0.22, 1, 0.36, 1] as const;

function QRVisual() {
  const cells = [1,0,1,1,0,1,0,0,1,1,1,0,0,1,0,1,1,0,1,1,0,1,1,0,1];
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="relative grid grid-cols-5 gap-1.5 rounded-2xl bg-charcoal p-6">
        {cells.map((c, i) => (
          <div key={i} className={`h-4 w-4 rounded-[3px] ${c ? "bg-gold-soft/80" : "bg-cream/[0.06]"}`} />
        ))}
        <motion.div
          className="absolute left-0 right-0 h-[2px] bg-emerald-bright shadow-[0_0_12px_2px_rgba(62,148,104,0.6)]"
          initial={{ top: "6%" }}
          animate={{ top: ["6%", "94%", "6%"] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

function BlockchainVisual() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-2 px-6">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex items-center">
          <motion.div
            initial={{ opacity: 0.3, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: EASE }}
            className="flex h-16 w-14 flex-col justify-between rounded-lg border border-gold/30 bg-charcoal p-2"
          >
            <div className="h-1.5 w-full rounded-full bg-gold/40" />
            <div className="h-1.5 w-2/3 rounded-full bg-cream/15" />
            <div className="h-1.5 w-full rounded-full bg-emerald/40" />
          </motion.div>
          {i < 3 && <div className="h-px w-4 bg-gradient-to-r from-gold/50 to-transparent" />}
        </div>
      ))}
    </div>
  );
}

function GPSVisual() {
  return (
    <div className="relative h-full w-full">
      <img
        src={unsplashSrc(PHOTOS.transportTruck.url, { w: 900 })}
        alt={PHOTOS.transportTruck.alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-charcoal/50" />
      <svg viewBox="0 0 220 120" className="absolute inset-0 h-full w-full">
        <path
          d="M10 100 C 60 100, 60 30, 110 30 S 180 90, 210 20"
          fill="none"
          stroke="rgba(245,239,230,0.2)"
          strokeWidth="2"
          strokeDasharray="4 6"
        />
        <path
          d="M10 100 C 60 100, 60 30, 110 30 S 180 90, 210 20"
          fill="none"
          stroke="#D4A657"
          strokeWidth="2"
          strokeDasharray="300"
          strokeDashoffset="300"
        >
          <animate attributeName="stroke-dashoffset" from="300" to="0" dur="2.8s" repeatCount="indefinite" />
        </path>
        <circle cx="10" cy="100" r="4" fill="#3E9468" />
        <circle cx="210" cy="20" r="4" fill="#E9C783" />
      </svg>
    </div>
  );
}

function AnimalIDVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <img
        src={unsplashSrc(PHOTOS.cattleCloseUp.url, { w: 900 })}
        alt={PHOTOS.cattleCloseUp.alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
        className="glass absolute bottom-5 left-5 right-5 rounded-xl p-3.5"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-gold-soft">ID · KE-04471</span>
          <div className="h-2 w-2 rounded-full bg-emerald-bright" />
        </div>
        <div className="mt-2 space-y-1.5">
          <div className="h-1.5 w-full rounded-full bg-cream/10" />
          <div className="h-1.5 w-2/3 rounded-full bg-cream/10" />
        </div>
      </motion.div>
    </div>
  );
}

function HealthVisual() {
  const items = ["Vaccination", "Deworming", "Inspection", "Nutrition"];
  return (
    <div className="flex h-full w-full flex-col justify-center gap-3 px-8">
      {items.map((label, i) => (
        <div key={label} className="flex items-center gap-3">
          <span className="w-24 shrink-0 text-[11px] text-cream/40">{label}</span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-cream/[0.06]">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${[92, 100, 78, 96][i]}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              className="h-full rounded-full bg-gradient-to-r from-emerald to-emerald-bright"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function AIVisual() {
  return (
    <div className="flex h-full w-full items-end justify-center gap-2 px-8 pb-8">
      {[35, 60, 45, 80, 55, 92, 68].map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
          className="w-5 rounded-t-md bg-gradient-to-t from-maroon-bright to-gold-soft"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

function CloudVisual() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-2">
      <img
        src={unsplashSrc(PHOTOS.serverRoom.url, { w: 900 })}
        alt={PHOTOS.serverRoom.alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-charcoal/65" />
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.12, ease: EASE }}
          className="glass relative z-10 flex w-52 items-center justify-between rounded-lg px-4 py-2.5"
        >
          <span className="font-mono text-[10px] text-cream/60">node-0{i + 1}.beeftrace</span>
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-bright" />
        </motion.div>
      ))}
    </div>
  );
}

const PILLARS = [
  {
    key: "qr",
    tag: "QR Traceability",
    title: "One scan, the whole story",
    copy: "Every pack carries a unique, tamper-resistant QR code generated at the point of processing. A single scan surfaces the animal's complete farm-to-plate history — no app install required.",
    points: ["Generated at cut & pack", "Works on any smartphone camera", "Links to the live, not cached, record"],
    Visual: QRVisual,
  },
  {
    key: "chain",
    tag: "Blockchain Ledger",
    title: "A record no one can quietly edit",
    copy: "Ownership transfers, slaughter events, and certification checkpoints are hashed and anchored to a distributed ledger. Nothing is deleted; disputes resolve against an immutable timeline.",
    points: ["Tamper-evident by design", "No single party holds the master copy", "Full audit trail for regulators"],
    Visual: BlockchainVisual,
  },
  {
    key: "gps",
    tag: "GPS Movement",
    title: "Every leg of the journey, mapped",
    copy: "Transport vehicles report live location as animals move from farm to market to plant. Route deviation and unexpected stops raise an alert automatically.",
    points: ["Live tracking on every transit leg", "Geofenced alerts for restricted zones", "Complete movement history per animal"],
    Visual: GPSVisual,
  },
  {
    key: "id",
    tag: "Animal Identification",
    title: "A durable digital identity",
    copy: "Each animal is issued a unique ID at registration, tied to breed, lineage, and ownership. It's the anchor every subsequent event — health, movement, sale — attaches to.",
    points: ["Issued at birth or intake", "Survives ownership transfer", "Cross-references national livestock registries"],
    Visual: AnimalIDVisual,
  },
  {
    key: "health",
    tag: "Health Records",
    title: "Compliance you can prove",
    copy: "Vaccination schedules, vet visits, and pre-harvest interval windows are logged and enforced in-app, with countdown reminders that keep farmers ahead of compliance deadlines.",
    points: ["Automated PHI countdowns", "Vet sign-off attached to each event", "Exportable for certification audits"],
    Visual: HealthVisual,
  },
  {
    key: "ai",
    tag: "AI Analytics",
    title: "Signal before it's a headline",
    copy: "Movement and health data feed anomaly-detection models that flag unusual disease clustering or compliance risk early — turning raw logs into an early-warning system.",
    points: ["Disease-spread pattern modelling", "Predictive compliance risk scoring", "Herd-level and national-level views"],
    Visual: AIVisual,
  },
  {
    key: "cloud",
    tag: "Cloud Platform",
    title: "Built for national scale",
    copy: "Encrypted, redundant infrastructure ingests events from thousands of concurrent field devices, with role-based access so every stakeholder sees exactly what they need — no more.",
    points: ["End-to-end encryption at rest & in transit", "Multi-region redundancy", "Role-based access for 7 stakeholder types"],
    Visual: CloudVisual,
  },
];

export default function TechPillars() {
  return (
    <section id="pillars" className="section-pad relative">
      <div className="container-lux mb-20 max-w-2xl">
        <p className="eyebrow mb-4 text-gold-soft">Under the hood</p>
        <h2 className="font-display text-4xl font-800 leading-tight text-cream md:text-5xl">
          Seven systems, <span className="text-gradient-gold">one verified truth.</span>
        </h2>
      </div>

      <div className="container-lux flex flex-col gap-24 md:gap-32">
        {PILLARS.map((p, i) => (
          <motion.div
            key={p.key}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
              i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div>
              <span className="font-mono text-xs text-gold-soft">
                {String(i + 1).padStart(2, "0")} / {p.tag}
              </span>
              <h3 className="mt-3 font-display text-3xl font-700 leading-tight text-cream md:text-4xl">
                {p.title}
              </h3>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/50">{p.copy}</p>
              <ul className="mt-6 space-y-2.5">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm text-cream/60">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl">
              <p.Visual />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
