"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function VideoStorySection() {
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
    <section
      ref={sectionRef}
      className="relative flex min-h-[85vh] items-center overflow-hidden"
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        poster="/videos/technology-story-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
      >
        <source src="/videos/technology-story.mp4" type="video/mp4" />
      </video>
      <img
        src="/videos/technology-story-poster.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:block"
      />
      <div className="absolute inset-0 bg-charcoal/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-charcoal/40" />

      <div className="container-lux relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass max-w-xl rounded-3xl p-8 md:p-12"
        >
          <p className="eyebrow mb-4 text-gold-soft">Connected, end to end</p>
          <h2 className="font-display text-3xl font-800 leading-tight text-cream md:text-5xl">
            Technology that connects <span className="text-gradient-gold">every step.</span>
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-cream/60 md:text-base">
            From a farmer&apos;s first entry to a shopper&apos;s scan, every system in
            the BeefTrace stack talks to the next — no gaps, no manual
            re-entry, no lost paperwork.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/technology"
              className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-charcoal-fixed transition-transform hover:scale-[1.03]"
            >
              Explore the technology
            </a>
            <a
              href="/#contact"
              className="rounded-full border border-cream/20 px-6 py-3 text-sm font-medium text-cream/80 transition-colors hover:border-cream/40"
            >
              Talk to us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
