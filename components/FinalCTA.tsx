"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function FinalCTA() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative overflow-hidden py-40">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        poster="/videos/cta-sunset-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
      >
        <source src="/videos/cta-sunset.mp4" type="video/mp4" />
      </video>
      <img
        src="/videos/cta-sunset-poster.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:block"
      />
      <div className="absolute inset-0 bg-charcoal/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-charcoal/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(107,20,24,0.25),transparent_60%)]" />

      <div className="container-lux relative text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="eyebrow mb-6 justify-center text-gold-soft"
        >
          From Kenya, for the world
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-3xl font-display text-4xl font-900 leading-[1.05] text-cream md:text-6xl"
        >
          Ready to transform livestock{" "}
          <span className="text-gradient-gold">traceability?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-cream/65"
        >
          Whether you run one farm or an entire county programme, BeefTrace gives you
          one record every link in the chain can trust.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="/demo"
            className="inline-block rounded-full bg-gold px-9 py-4 text-sm font-semibold text-charcoal-fixed transition-transform hover:scale-[1.04]"
          >
            Book a Demo
          </a>
          <a
            href="/contact"
            className="inline-block rounded-full border border-cream/25 px-9 py-4 text-sm font-medium text-cream/85 transition-colors hover:border-cream/50"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
