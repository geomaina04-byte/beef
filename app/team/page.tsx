"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProfileCard from "@/components/team/ProfileCard";
import { TEAM } from "@/lib/team-data";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function TeamPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TEAM;
    return TEAM.filter((m) => m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q));
  }, [query]);

  return (
    <main className="relative">
      <Nav />

      <section className="relative pt-40 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(107,20,24,0.25),transparent_55%)]" />
        <div className="container-lux relative">
          <p className="eyebrow mb-4 text-emerald-bright">The people behind it</p>
          <h1 className="max-w-2xl font-display text-5xl font-800 leading-tight text-cream md:text-6xl">
            Built by a small team <span className="text-gradient-gold">obsessed with the field.</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm text-cream/45">
            Roles, bios, and photos are being finalized — names below are the
            real BeefTrace team.
          </p>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="container-lux">
          <div className="mb-10">
            <div className="relative w-full max-w-xs">
              <FaMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cream/30" size={13} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name…"
                className="w-full rounded-full border border-cream/10 bg-charcoal-raised/50 py-2.5 pl-10 pr-4 text-sm text-cream placeholder:text-cream/30 focus:border-gold/40 focus:outline-none"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center text-sm text-cream/35"
            >
              No one matches that search.
            </motion.p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((m) => (
                <ProfileCard key={m.slug} member={m} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
