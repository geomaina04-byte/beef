"use client";

import { motion } from "framer-motion";
import { PHOTOS, unsplashSrc } from "@/lib/photos";

const EASE = [0.22, 1, 0.36, 1] as const;

const ITEMS = [
  {
    photo: PHOTOS.cattleField,
    tag: "The herd",
    title: "Where every record begins",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    photo: PHOTOS.cattleCloseUp,
    tag: "The animal",
    title: "One ID, one lifetime",
    span: "",
  },
  {
    photo: PHOTOS.transportTruck,
    tag: "The journey",
    title: "Tracked on every leg",
    span: "",
  },
  {
    photo: PHOTOS.serverRoom,
    tag: "The platform",
    title: "Verified at national scale",
    span: "lg:col-span-2",
  },
];

export default function FieldGallery() {
  return (
    <section className="section-pad relative">
      <div className="container-lux mb-12 max-w-2xl">
        <p className="eyebrow mb-4 text-emerald-bright">From the field</p>
        <h2 className="font-display text-4xl font-800 leading-tight text-cream md:text-5xl">
          Real herds. <span className="text-gradient-gold">Real infrastructure.</span>
        </h2>
      </div>

      <div className="container-lux grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
            className={`group relative overflow-hidden rounded-2xl border border-cream/10 ${item.span}`}
          >
            <img
              src={unsplashSrc(item.photo.url, { w: 1200 })}
              alt={item.photo.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
            <div className="absolute inset-0 bg-charcoal/10 transition-colors group-hover:bg-charcoal/0" />
            <div className="relative z-10 flex h-full flex-col justify-end p-5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-gold-soft">
                {item.tag}
              </span>
              <h3 className="mt-1 font-display text-lg font-700 text-cream">{item.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="container-lux mt-4 text-right text-[11px] text-cream/25">
        Photography via Unsplash
      </p>
    </section>
  );
}
