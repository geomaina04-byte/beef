"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TabVideoStage from "@/components/media/TabVideoStage";

// NOTE: each tab is temporarily mapped to one of the site's existing clips
// (all ~10s) so the switching UX can be reviewed end to end. Swap `src` /
// `poster` per tab for dedicated footage (farmer registering cattle, RFID
// scan, vet inspection, GPS transport, report generation, etc.) later —
// nothing else needs to change.
const TABS = [
  {
    key: "dashboard",
    label: "Dashboard",
    stat: "12,480",
    statLabel: "Animals under active tracking",
    rows: [
      ["Herds registered", "1,204"],
      ["Active alerts", "3"],
      ["Sync status", "Live"],
    ],
    video: {
      src: "/videos/platform-demo.mp4",
      poster: "/videos/platform-demo-poster.jpg",
      caption: "Platform overview",
    },
  },
  {
    key: "livestock",
    label: "Livestock",
    stat: "KE-04471",
    statLabel: "Most recently updated record",
    rows: [
      ["Breed", "Boran cross"],
      ["Current stage", "Processing"],
      ["Last checkpoint", "Nakuru plant"],
    ],
    video: {
      src: "/videos/how-it-works.mp4",
      poster: "/videos/how-it-works-poster.jpg",
      caption: "Registration & RFID tagging",
    },
  },
  {
    key: "health",
    label: "Health",
    stat: "98.6%",
    statLabel: "Vaccination compliance",
    rows: [
      ["Open cases", "2"],
      ["Vet visits (30d)", "146"],
      ["Disease flags", "0 critical"],
    ],
    video: {
      src: "/videos/technology-story.mp4",
      poster: "/videos/technology-story-poster.jpg",
      caption: "Health records in the field",
    },
  },
  {
    key: "movement",
    label: "Movement",
    stat: "412 km",
    statLabel: "Tracked this week",
    rows: [
      ["In transit", "18 vehicles"],
      ["Avg. leg time", "3.2 hrs"],
      ["GPS coverage", "100%"],
    ],
    video: {
      src: "/videos/cta-sunset.mp4",
      poster: "/videos/cta-sunset-poster.jpg",
      caption: "Farm-to-market movement",
    },
  },
  {
    key: "reports",
    label: "Reports",
    stat: "36",
    statLabel: "Export certificates generated",
    rows: [
      ["Pending review", "1"],
      ["Auto-generated", "35"],
      ["Avg. turnaround", "4 min"],
    ],
    video: {
      src: "/videos/beef-hero.mp4",
      poster: "/videos/beef-hero-poster.jpg",
      caption: "Compliance & traceability reports",
    },
  },
];

export default function PlatformPreview() {
  const [active, setActive] = useState(TABS[0].key);
  const tab = TABS.find((t) => t.key === active)!;

  return (
    <section id="platform" className="section-pad relative bg-charcoal-soft">
      <div className="container-lux">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-4 text-gold-soft">Inside the platform</p>
          <h2 className="font-display text-4xl font-800 leading-tight text-cream md:text-5xl">
            One dashboard. <span className="text-gradient-gold">Every stage.</span>
          </h2>
        </div>

        <div className="relative">
          <div className="glass overflow-hidden rounded-3xl">
          <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-cream/10 p-2">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`relative whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                  active === t.key ? "text-charcoal-fixed" : "text-cream/60 hover:text-cream"
                }`}
              >
                {active === t.key && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-xl bg-gold"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{t.label}</span>
              </button>
            ))}
          </div>

          <div className="grid gap-8 p-8 md:grid-cols-[1fr_1.2fr] md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="eyebrow text-cream/40">{tab.statLabel}</p>
                <p className="mt-2 font-display text-5xl font-900 text-gradient-gold">
                  {tab.stat}
                </p>
                <div className="mt-8 space-y-3">
                  {tab.rows.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between border-b border-cream/5 pb-3 text-sm"
                    >
                      <span className="text-cream/45">{label}</span>
                      <span className="font-semibold text-cream">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <motion.div
              key={tab.key + "-viz"}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-2xl border border-cream/10 bg-charcoal p-6"
            >
              {/* faint grid + drifting glow so the panel reads as "live", not empty */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(245,239,230,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(245,239,230,0.6) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 left-1/3 h-48 w-48 rounded-full bg-emerald/20 blur-[60px]"
                animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.15, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-bright opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-bright" />
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-cream/40">
                    Live · {tab.label}
                  </span>
                </div>
              </div>

              <div className="relative mt-4 flex h-full min-h-[190px] flex-col justify-between">
                <div className="flex items-end gap-2">
                  {[40, 65, 50, 80, 60, 95, 72].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full rounded-t-md bg-gradient-to-t from-emerald to-gold-soft"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="mt-4 flex justify-between text-[10px] text-cream/30">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
            </motion.div>
          </div>
          </div>

          <div className="pointer-events-none absolute -bottom-10 -right-6 hidden w-64 lg:block">
            <div className="pointer-events-auto">
              <TabVideoStage
                tabKey={tab.key}
                src={tab.video.src}
                poster={tab.video.poster}
                caption={tab.video.caption}
                aspect="aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
