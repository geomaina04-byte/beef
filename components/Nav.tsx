"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { FaBars, FaXmark, FaLinkedin, FaInstagram, FaTiktok, FaEnvelope } from "react-icons/fa6";
import ThemeToggle from "@/components/ThemeToggle";
import BrandLogo from "@/components/BrandLogo";

const LINKS = [
  { label: "About", href: "/about" },
  { label: "Technology", href: "/technology" },
  { label: "Solutions", href: "/#solution" },
  { label: "Stories", href: "/blog" },
  { label: "Team", href: "/team" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS = [
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { icon: FaInstagram, href: "https://instagram.com/beeftrace.ke", label: "Instagram" },
  { icon: FaTiktok, href: "https://tiktok.com/@beeftrace.ke", label: "TikTok" },
  { icon: FaEnvelope, href: "mailto:beeftracekenya@gmail.com", label: "Email" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-emerald via-gold to-emerald"
        style={{ scaleX: progress }}
      />
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled ? "pt-3" : "pt-6"
        }`}
      >
        <div className="container-lux">
          <div
            className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 md:px-6 ${
              scrolled ? "nav-glass" : "bg-transparent"
            }`}
          >
            <a href="/" className="flex items-center">
              <BrandLogo imgClassName="h-8 w-auto md:h-9" />
            </a>

            <nav className="hidden items-center gap-7 lg:flex">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm text-cream/70 transition-colors hover:text-cream"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <ThemeToggle className="hidden sm:flex" />
              <a
                href="/#contact"
                className="group relative overflow-hidden rounded-full bg-gold px-4 py-2 text-sm font-semibold text-charcoal-fixed transition-transform hover:scale-[1.03] md:px-5"
              >
                <span className="relative z-10">Book a Demo</span>
              </a>
              <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream lg:hidden"
              >
                <FaBars size={14} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-charcoal/98 backdrop-blur-xl lg:hidden"
          >
            <div className="container-lux flex items-center justify-between py-6">
              <a href="/" className="flex items-center" onClick={() => setOpen(false)}>
                <BrandLogo imgClassName="h-8 w-auto" />
              </a>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream"
              >
                <FaXmark size={16} />
              </button>
            </div>

            <nav className="container-lux flex flex-1 flex-col justify-center gap-2">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  className="border-b border-cream/5 py-4 font-display text-3xl font-700 text-cream/80 transition-colors hover:text-gold-soft"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>

            <div className="container-lux flex items-center justify-between gap-4 py-8">
              <div className="flex items-center gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={`BeefTrace on ${s.label}`}
                    className="social-icon flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/60"
                  >
                    <s.icon size={15} />
                  </a>
                ))}
                <ThemeToggle />
              </div>
              <a
                href="/demo"
                onClick={() => setOpen(false)}
                className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-charcoal-fixed"
              >
                Book a Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
