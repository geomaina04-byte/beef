"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaQrcode,
  FaClockRotateLeft,
  FaWifi,
  FaArrowsRotate,
  FaDatabase,
  FaUserLock,
  FaChartLine,
  FaLocationDot,
} from "react-icons/fa6";
import { SiNodedotjs, SiReact, SiPostgresql, SiGit } from "react-icons/si";
import { TEAM } from "@/lib/team-data";

const KEY_FEATURES = [
  { icon: FaQrcode, label: "QR Code Traceability" },
  { icon: FaClockRotateLeft, label: "Real-time Tracking" },
  { icon: FaWifi, label: "Offline Data Capture" },
  { icon: FaArrowsRotate, label: "Automatic Sync" },
  { icon: FaDatabase, label: "Secure Cloud Database" },
  { icon: FaUserLock, label: "Role-Based User Access" },
  { icon: FaLocationDot, label: "GPS Transport Tracking" },
  { icon: FaChartLine, label: "Analytics Dashboard" },
];

const TECH = [
  { icon: SiNodedotjs, label: "Node.js" },
  { icon: SiReact, label: "React" },
  { icon: SiPostgresql, label: "PostgreSQL" },
  { icon: SiGit, label: "Git" },
];

export default function PosterShowcase() {
  return (
    <section id="poster" className="section-pad relative bg-charcoal-soft">
      <div className="container-lux">
        <div className="mb-14 max-w-2xl">
          <p className="eyebrow mb-4 text-gold-soft">The project behind the platform</p>
          <h2 className="font-display text-4xl font-800 leading-tight text-cream md:text-5xl">
            From capstone research to a{" "}
            <span className="text-gradient-gold">production traceability system.</span>
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-cream/55">
            BeefTrace began as a digital livestock traceability project built by a JKUAT
            team under JHUB Africa&apos;s innovation programme, and has grown into the
            platform on this page &mdash; a progressive web app tracking animals from
            registration on the farm to the moment a consumer scans the pack.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          {/* Poster */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="glass overflow-hidden rounded-3xl border border-gold/15 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
              <a
                href="/poster/beeftrace-poster.png"
                target="_blank"
                rel="noreferrer"
                className="group relative block overflow-hidden rounded-2xl"
              >
                <Image
                  src="/poster/beeftrace-poster-web.jpg"
                  alt="BeefTrace digital livestock traceability project poster, JHUB Africa and JKUAT"
                  width={1600}
                  height={1067}
                  className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
                  priority={false}
                />
                <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-charcoal/70 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="rounded-full bg-cream-fixed px-4 py-2 text-xs font-semibold text-charcoal-fixed">
                    View full poster &rarr;
                  </span>
                </div>
              </a>
            </div>

            {/* Credential badges pulled from the poster */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-full bg-cream-fixed px-3 py-1.5">
                <Image src="/logos/jhub-africa.png" alt="JHUB Africa logo" width={22} height={17} />
                <span className="text-xs font-semibold text-charcoal-fixed">JHUB Africa</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-cream-fixed px-3 py-1.5">
                <Image src="/logos/jkuat.png" alt="JKUAT logo" width={18} height={18} className="rounded-full" />
                <span className="text-xs font-semibold text-charcoal-fixed">JKUAT</span>
              </div>
              <span className="text-xs text-cream/40">Digital Livestock Traceability System</span>
            </div>
          </motion.div>

          {/* Details */}
          <div className="space-y-10">
            <div>
              <p className="eyebrow mb-4 text-emerald-bright">Deliverables</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-cream/10 bg-white/[0.02] p-5">
                  <p className="font-display text-sm font-700 text-cream">Web Dashboard</p>
                  <p className="mt-1 text-xs leading-relaxed text-cream/45">
                    Animal &amp; user management, traceability monitoring, inventory,
                    transport routes, admin tools.
                  </p>
                </div>
                <div className="rounded-2xl border border-cream/10 bg-white/[0.02] p-5">
                  <p className="font-display text-sm font-700 text-cream">Mobile Experience</p>
                  <p className="mt-1 text-xs leading-relaxed text-cream/45">
                    Registration, QR scanning, offline capture, GPS support, real-time
                    updates in the field.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="eyebrow mb-4 text-gold-soft">Key features</p>
              <div className="flex flex-wrap gap-2">
                {KEY_FEATURES.map((f) => (
                  <span
                    key={f.label}
                    className="inline-flex items-center gap-2 rounded-full border border-cream/10 bg-white/[0.02] px-3 py-1.5 text-xs text-cream/70"
                  >
                    <f.icon className="text-gold-soft" size={12} />
                    {f.label}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow mb-4 text-maroon-bright">Built with</p>
              <div className="flex flex-wrap gap-4">
                {TECH.map((t) => (
                  <div
                    key={t.label}
                    className="flex items-center gap-2 rounded-xl border border-cream/10 bg-white/[0.02] px-3 py-2"
                  >
                    <t.icon size={16} className="text-cream/70" />
                    <span className="text-xs text-cream/60">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div id="team" className="mt-24">
          <p className="eyebrow mb-6 text-gold-soft">The team</p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl border border-cream/10 bg-white/[0.02] p-4 text-center"
              >
                <div className="mx-auto mb-3 h-24 w-24 overflow-hidden rounded-full border border-cream/10">
                  {/* plain <img>, matching ProfileCard.tsx — avoids Next/Image
                      optimization pitfalls with the local .svg placeholders */}
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-xs font-medium text-cream/80">{member.name}</p>
                <p className="mt-0.5 text-[11px] font-semibold leading-snug text-emerald">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
