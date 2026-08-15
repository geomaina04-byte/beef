"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { BlogPost } from "@/lib/blog-data";

export default function BlogHero({ featured }: { featured: BlogPost }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  return (
    <section ref={sectionRef} className="relative flex h-[92vh] min-h-[640px] items-end overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 -top-[10%] h-[120%]">
        <img
          src="/journey/transport.jpg"
          alt="Livestock transport at sunset, part of Kenya's beef supply chain"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* dark overlay for readability, matching the site's cinematic hero treatment */}
      <div className="hero-atmosphere absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/10 to-transparent" />

      <div className="container-lux relative z-10 pb-16 pt-40 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center gap-2"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60">
            Latest Story · {featured.category}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl font-display text-4xl font-800 leading-[1.05] text-cream sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Stories Behind <span className="text-gradient-gold">Every Trace.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl text-base text-cream/75 sm:text-lg"
        >
          Discover the people, technology, and innovation transforming Kenya&apos;s livestock journey
          from farm to plate.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <a
            href="#stories"
            className="group relative overflow-hidden rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-charcoal-fixed transition-transform hover:scale-[1.03]"
          >
            <span className="relative z-10">Explore Stories</span>
          </a>
          <a
            href={`/blog/${featured.slug}`}
            className="flex items-center gap-2 rounded-full border border-cream/25 px-6 py-3.5 text-sm font-medium text-cream/85 transition-colors hover:border-gold/40 hover:text-gold-soft"
          >
            Read featured story →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
