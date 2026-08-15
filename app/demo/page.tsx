"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FaCircleCheck } from "react-icons/fa6";

const HIGHLIGHTS = [
  "A walkthrough of the farmer, processor, and consumer views",
  "How QR verification and blockchain checkpoints work together",
  "What a rollout looks like for your county, cooperative, or company",
];

export default function DemoPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // NOTE: no backend wired yet — this simulates a submission.
    // Replace with a real API route / email service before going live.
    setSent(true);
  }

  return (
    <main className="relative">
      <Nav />

      <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(107,20,24,0.28),transparent_55%),radial-gradient(circle_at_85%_75%,rgba(47,111,78,0.16),transparent_50%)]" />

        <div className="container-lux relative grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-4 text-emerald-bright">Book a demo</p>
            <h1 className="font-display text-4xl font-900 leading-[1.05] text-cream md:text-6xl">
              See BeefTrace <span className="text-gradient-gold">on real data.</span>
            </h1>
            <p className="mt-6 max-w-md text-cream/55">
              A 30-minute walkthrough with someone from the team — no sales
              script, just the platform and your questions.
            </p>

            <ul className="mt-10 space-y-4">
              {HIGHLIGHTS.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-cream/65">
                  <FaCircleCheck className="mt-0.5 shrink-0 text-gold-soft" size={15} />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass flex min-h-[420px] flex-col items-center justify-center rounded-3xl p-10 text-center"
            >
              <h3 className="font-display text-2xl font-700 text-cream">Request received</h3>
              <p className="mt-3 max-w-sm text-sm text-cream/50">
                Someone from the team will reach out to schedule a time that
                works for you.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="glass rounded-3xl p-6 md:p-8"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs text-cream/45">
                    Full name <span className="text-gold-soft">*</span>
                  </label>
                  <input
                    id="name"
                    required
                    className="w-full rounded-xl border border-cream/10 bg-charcoal/60 px-4 py-3 text-sm text-cream focus:border-gold/40 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="org" className="mb-1.5 block text-xs text-cream/45">
                    Organization
                  </label>
                  <input
                    id="org"
                    className="w-full rounded-xl border border-cream/10 bg-charcoal/60 px-4 py-3 text-sm text-cream focus:border-gold/40 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs text-cream/45">
                    Email <span className="text-gold-soft">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full rounded-xl border border-cream/10 bg-charcoal/60 px-4 py-3 text-sm text-cream focus:border-gold/40 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-xs text-cream/45">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full rounded-xl border border-cream/10 bg-charcoal/60 px-4 py-3 text-sm text-cream focus:border-gold/40 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="notes" className="mb-1.5 block text-xs text-cream/45">
                    What would you like to see?
                  </label>
                  <textarea
                    id="notes"
                    rows={4}
                    className="w-full resize-none rounded-xl border border-cream/10 bg-charcoal/60 px-4 py-3 text-sm text-cream focus:border-gold/40 focus:outline-none"
                    placeholder="Farm scale, region, specific workflows you're curious about…"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-charcoal-fixed transition-transform hover:scale-[1.02]"
              >
                Request a demo
              </button>
            </motion.form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
