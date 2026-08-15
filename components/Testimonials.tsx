"use client";

import { motion } from "framer-motion";
import { FaTractor, FaStethoscope, FaFileShield, FaCartShopping } from "react-icons/fa6";

const VOICES = [
  {
    icon: FaTractor,
    role: "Farmer",
    quote:
      "\u201cI register a calf once. Every record after that follows the animal, not a notebook I can lose.\u201d",
  },
  {
    icon: FaStethoscope,
    role: "Veterinary officer",
    quote:
      "\u201cWhen a disease flag comes in, I can see exactly which farms and which movements to check first.\u201d",
  },
  {
    icon: FaFileShield,
    role: "Export compliance officer",
    quote:
      "\u201cCertification used to take days of paperwork. Now the audit trail is already assembled.\u201d",
  },
  {
    icon: FaCartShopping,
    role: "Consumer",
    quote:
      "\u201cI scan the pack and see the farm it came from. That's the whole reason I trust the label.\u201d",
  },
];

export default function Testimonials() {
  return (
    <section className="section-pad relative bg-charcoal-soft">
      <div className="container-lux">
        <div className="mb-14 max-w-2xl">
          <p className="eyebrow mb-4 text-gold-soft">Voices from the chain</p>
          <h2 className="font-display text-4xl font-800 leading-tight text-cream md:text-5xl">
            Built around the people who{" "}
            <span className="text-gradient-gold">actually use it.</span>
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VOICES.map((v, i) => (
            <motion.div
              key={v.role}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass flex h-full flex-col justify-between rounded-2xl p-6"
            >
              <p className="text-sm leading-relaxed text-cream/75">{v.quote}</p>
              <div className="mt-6 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.05] text-gold-soft">
                  <v.icon size={15} />
                </div>
                <span className="text-xs font-semibold text-cream/60">{v.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
