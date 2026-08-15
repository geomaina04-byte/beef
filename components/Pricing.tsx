"use client";

import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa6";

const TIERS = [
  {
    name: "Farm",
    tagline: "For individual farms and small holdings",
    features: [
      "Digital animal registration",
      "Health & vaccination records",
      "Offline mobile capture",
      "QR traceability",
    ],
    highlight: false,
  },
  {
    name: "Cooperative",
    tagline: "For traders, transporters & processors",
    features: [
      "Everything in Farm",
      "Movement & GPS tracking",
      "Multi-user role access",
      "Export-ready reporting",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    tagline: "For county & national deployments",
    features: [
      "Everything in Cooperative",
      "Custom integrations & API access",
      "Dedicated onboarding & SLA",
    ],
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="section-pad relative">
      <div className="container-lux">
        <div className="mb-14 max-w-2xl">
          <p className="eyebrow mb-4 text-gold-soft">Pricing</p>
          <h2 className="font-display text-4xl font-800 leading-tight text-cream md:text-5xl">
            Scaled to how much of the{" "}
            <span className="text-gradient-gold">chain you run.</span>
          </h2>
          <p className="mt-4 text-sm text-cream/50">
            BeefTrace is in active pilot deployment. Reach out for current pricing and
            onboarding timelines.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative flex flex-col rounded-3xl p-8 ${
                t.highlight
                  ? "border border-gold/30 bg-gradient-to-b from-gold/10 to-transparent"
                  : "border border-cream/10 bg-white/[0.02]"
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-8 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-charcoal-fixed">
                  Most adopted
                </span>
              )}
              <h3 className="font-display text-2xl font-800 text-cream">{t.name}</h3>
              <p className="mt-2 text-xs text-cream/45">{t.tagline}</p>

              <ul className="mt-8 flex-1 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-cream/70">
                    <FaCheck size={12} className="mt-1 shrink-0 text-emerald-bright" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-8 rounded-full py-3 text-center text-sm font-semibold transition-transform hover:scale-[1.02] ${
                  t.highlight ? "bg-gold text-charcoal-fixed" : "border border-cream/20 text-cream"
                }`}
              >
                Talk to us
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
