import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import AboutTimeline from "@/components/about/AboutTimeline";
import ImpactCounters from "@/components/about/ImpactCounters";
import {
  FaLightbulb,
  FaEye,
  FaShieldHalved,
  FaHandshake,
  FaMicrochip,
  FaLeaf,
} from "react-icons/fa6";

export const metadata: Metadata = {
  title: "About — BeefTrace",
  description:
    "Why BeefTrace exists, where it's headed, and the values behind a livestock traceability platform built for national scale.",
};

const VALUES = [
  { icon: FaLightbulb, title: "Innovation", copy: "We build for the field first, the demo second." },
  { icon: FaEye, title: "Transparency", copy: "Every record is visible to the people it belongs to." },
  { icon: FaShieldHalved, title: "Food safety", copy: "Compliance isn't paperwork here — it's enforced in-app." },
  { icon: FaHandshake, title: "Trust", copy: "A record no single party can quietly rewrite." },
  { icon: FaMicrochip, title: "Technology", copy: "Offline-first, because signal isn't guaranteed on a farm." },
  { icon: FaLeaf, title: "Sustainability", copy: "Better data means better land, herd, and resource decisions." },
];

export default function AboutPage() {
  return (
    <main className="relative">
      <Nav />

      <section className="relative flex min-h-[70vh] items-center overflow-hidden pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(107,20,24,0.3),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(47,111,78,0.16),transparent_50%)]" />
        <div className="container-lux relative max-w-2xl">
          <p className="eyebrow mb-4 text-emerald-bright">About BeefTrace</p>
          <h1 className="font-display text-5xl font-900 leading-[1.05] text-cream md:text-7xl">
            A record every link <span className="text-gradient-gold">in the chain can trust.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/55">
            BeefTrace exists because livestock traceability usually breaks at
            the handoffs — the moments a paper trail gets lost between one
            party and the next. We build the infrastructure that keeps it
            intact, from a farmer&apos;s first entry to a shopper&apos;s scan.
          </p>
        </div>
      </section>

      <section className="section-pad relative">
        <div className="container-lux grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="rounded-3xl border border-cream/10 bg-charcoal-raised/40 p-8">
            <p className="eyebrow mb-4 text-gold-soft">Mission</p>
            <p className="font-display text-2xl font-700 leading-snug text-cream">
              Make every animal&apos;s journey verifiable, from birth to plate,
              for every stakeholder who needs to trust it.
            </p>
          </div>
          <div className="rounded-3xl border border-cream/10 bg-charcoal-raised/40 p-8">
            <p className="eyebrow mb-4 text-emerald-bright">Vision</p>
            <p className="font-display text-2xl font-700 leading-snug text-cream">
              A continent where traceability infrastructure is standard, not
              a competitive edge — because trust in food should never be
              optional.
            </p>
          </div>
        </div>
      </section>

      <AboutTimeline />

      <section className="section-pad relative border-t border-cream/5">
        <div className="container-lux mb-14 max-w-xl">
          <p className="eyebrow mb-4 text-gold-soft">What we hold to</p>
          <h2 className="font-display text-4xl font-800 leading-tight text-cream md:text-5xl">
            Core <span className="text-gradient-gold">values.</span>
          </h2>
        </div>
        <div className="container-lux grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-cream/10 bg-charcoal-raised/40 p-6 transition-colors hover:border-gold/30"
            >
              <v.icon className="text-emerald-bright" size={20} />
              <p className="mt-4 font-display text-base font-700 text-cream">{v.title}</p>
              <p className="mt-1.5 text-sm text-cream/45">{v.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <ImpactCounters />
      <FinalCTA />
      <Footer />
    </main>
  );
}
