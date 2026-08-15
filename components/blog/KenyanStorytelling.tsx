"use client";

import { motion } from "framer-motion";

const MOMENTS = [
  {
    image: "/journey/born.jpg",
    title: "Farmers in rural Kenya",
    copy: "The first link in every trace — a calf registered the day it's born.",
  },
  {
    image: "/journey/transport.jpg",
    title: "Livestock markets",
    copy: "Where a farmer's herd meets the next link in the chain.",
  },
  {
    image: "/journey/health.jpg",
    title: "Veterinary professionals",
    copy: "Field vets logging health records that follow the animal for life.",
  },
  {
    image: "/journey/retail.jpg",
    title: "Retail partners",
    copy: "Verifying stock and freshness the instant a delivery arrives.",
  },
  {
    image: "/poster/beeftrace-poster-web.jpg",
    title: "Consumers scanning QR codes",
    copy: "The moment a shopper's question — where did this come from? — gets answered.",
  },
];

export default function KenyanStorytelling() {
  return (
    <section className="section-pad bg-charcoal">
      <div className="container-lux">
        <div className="mb-12 max-w-2xl">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-10 bg-gold/50" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-cream/40">
              Local Impact
            </span>
          </div>
          <h2 className="font-display text-3xl font-800 leading-tight text-cream sm:text-4xl">
            Built for Kenya. <span className="text-gradient-gold">Designed for the future.</span>
          </h2>
          <p className="mt-4 text-base text-cream/60">
            Every story on this page traces back to real people in the chain — not stand-ins, not
            stock photography from somewhere else. Farmers, vets, transporters, retailers, and the
            shoppers who trust them all.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {MOMENTS.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-2xl ${
                i === 0 ? "col-span-2 aspect-[16/10] md:col-span-2 md:aspect-[4/5]" : "aspect-[4/5]"
              }`}
            >
              <img
                src={m.image}
                alt={m.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-fixed/85 via-charcoal-fixed/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-display text-sm font-700 text-cream-fixed">{m.title}</p>
                <p className="mt-1 text-[11px] leading-snug text-cream-fixed/65">{m.copy}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
