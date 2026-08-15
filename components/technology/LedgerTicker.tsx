"use client";

const EVENTS = [
  { hash: "0x4a1f…9e2c", label: "Birth registered", herd: "Nakuru" },
  { hash: "0x7c3d…1b8a", label: "Ownership transfer", herd: "Eldoret" },
  { hash: "0x2e9b…f401", label: "Vaccination logged", herd: "Nyeri" },
  { hash: "0x91ac…6d5e", label: "Movement checkpoint", herd: "Kajiado" },
  { hash: "0xd60f…3a77", label: "Slaughter inspection", herd: "Nakuru" },
  { hash: "0xb84e…c219", label: "Pack QR issued", herd: "Thika" },
  { hash: "0x5f2a…88bd", label: "Export cert generated", herd: "Nairobi" },
];

function Row({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-6 pr-6" aria-hidden={ariaHidden}>
      {EVENTS.map((e, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-full border border-cream/10 bg-charcoal-raised/60 px-5 py-2.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-bright" />
          <span className="font-mono text-[11px] text-gold-soft">{e.hash}</span>
          <span className="text-xs text-cream/50">{e.label}</span>
          <span className="text-[10px] uppercase tracking-wide text-cream/25">{e.herd}</span>
        </div>
      ))}
    </div>
  );
}

export default function LedgerTicker() {
  return (
    <section className="relative border-y border-cream/5 bg-charcoal-soft py-8">
      <div className="container-lux mb-6 flex items-center justify-between">
        <p className="eyebrow text-emerald-bright">Live on the ledger</p>
        <span className="font-mono text-[11px] text-cream/30">simulated feed — illustrative</span>
      </div>
      <div className="no-scrollbar flex w-max animate-marquee">
        <Row />
        <Row ariaHidden />
      </div>
    </section>
  );
}
