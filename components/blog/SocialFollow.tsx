"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaTiktok, FaLinkedin, FaGlobe } from "react-icons/fa6";

const SOCIALS = [
  {
    icon: FaInstagram,
    label: "Instagram",
    handle: "@beeftrace.ke",
    href: "https://instagram.com/beeftrace.ke",
    copy: "Behind-the-scenes from farms, markets, and the field team.",
  },
  {
    icon: FaTiktok,
    label: "TikTok",
    handle: "@beeftrace.ke",
    href: "https://tiktok.com/@beeftrace.ke",
    copy: "Quick looks at how a scan turns into a full story.",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    handle: "BeefTrace",
    href: "#",
    copy: "Product updates, partnerships, and the team building this.",
  },
  {
    icon: FaGlobe,
    label: "Website",
    handle: "www.beeftrace.ke",
    href: "/",
    copy: "Everything BeefTrace, from the source.",
  },
];

export default function SocialFollow() {
  return (
    <section className="section-pad bg-charcoal-soft">
      <div className="container-lux">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-10 bg-gold/50" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-cream/40">
                Stay Connected
              </span>
            </div>
            <h2 className="font-display text-3xl font-800 text-cream sm:text-4xl">
              Follow the <span className="text-gradient-gold">Journey.</span>
            </h2>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SOCIALS.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass group flex flex-col justify-between rounded-2xl border-cream/10 p-6 transition-colors hover:border-gold/35"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-charcoal-raised text-gold-soft transition-colors group-hover:bg-gold group-hover:text-charcoal-fixed">
                  <s.icon size={18} />
                </span>
                <span className="text-cream/30 transition-transform group-hover:translate-x-1 group-hover:text-gold-soft">↗</span>
              </div>
              <div className="mt-6">
                <p className="text-sm font-semibold text-cream">{s.label}</p>
                <p className="mt-0.5 text-xs text-cream/50">{s.handle}</p>
                <p className="mt-3 text-xs leading-relaxed text-cream/45">{s.copy}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
