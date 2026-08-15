"use client";

import VideoCard from "@/components/media/VideoCard";

const STEPS = [
  { n: "01", label: "Register", copy: "A farmer logs a new animal in seconds — breed, birth date, herd." },
  { n: "02", label: "Track", copy: "Every health check, movement, and transfer attaches to that record." },
  { n: "03", label: "Verify", copy: "Checkpoints anchor to the ledger. A QR code renders it all, instantly." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-pad relative overflow-hidden">
      <div className="container-lux grid items-center gap-14 md:grid-cols-2 md:gap-20">
        <div>
          <p className="eyebrow mb-4 text-emerald-bright">How it works</p>
          <h2 className="font-display text-4xl font-800 leading-tight text-cream md:text-5xl">
            From paddock to plate, <span className="text-gradient-gold">in three steps.</span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/50">
            BeefTrace was built to disappear into a farmer&apos;s existing routine —
            not add another system to manage. Watch how a single animal&apos;s
            record takes shape.
          </p>

          <div className="mt-10 space-y-6">
            {STEPS.map((s) => (
              <div key={s.n} className="flex gap-4">
                <span className="font-mono text-sm text-gold-soft">{s.n}</span>
                <div>
                  <p className="font-display text-base font-700 text-cream">{s.label}</p>
                  <p className="mt-1 text-sm text-cream/45">{s.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <VideoCard
          src="/videos/how-it-works.mp4"
          poster="/videos/how-it-works-poster.jpg"
          caption="Field to record, in real time"
        />
      </div>
    </section>
  );
}
