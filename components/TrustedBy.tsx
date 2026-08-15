import Image from "next/image";

const CATEGORIES = [
  "Livestock Traders",
  "Processing Plants",
  "Veterinary Authorities",
  "Exporters",
  "County Governments",
  "Retail Chains",
  "Cold-chain Distributors",
  "Consumer Markets",
];

export default function TrustedBy() {
  const loop = [...CATEGORIES, ...CATEGORIES];
  return (
    <section className="border-y border-cream/5 bg-charcoal-soft py-10">
      <div className="container-lux mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="eyebrow text-cream/40">Built for the full beef supply chain</p>
        <div className="flex items-center gap-4 rounded-full border border-cream/10 bg-white/[0.03] px-4 py-2">
          <div className="flex items-center gap-2">
            <Image src="/logos/jhub-africa.png" alt="JHUB Africa" width={26} height={20} className="rounded" />
            <span className="text-xs text-cream/50">JHUB Africa</span>
          </div>
          <span className="h-3 w-px bg-cream/15" />
          <div className="flex items-center gap-2">
            <Image src="/logos/jkuat.png" alt="JKUAT" width={22} height={22} className="rounded-full" />
            <span className="text-xs text-cream/50">JKUAT</span>
          </div>
        </div>
      </div>

      <div className="no-scrollbar overflow-hidden">
        <div className="flex w-max animate-marquee gap-10">
          {loop.map((c, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-display text-xl font-700 text-cream/20"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
