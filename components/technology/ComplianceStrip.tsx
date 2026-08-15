import { FaLock, FaServer, FaCircleCheck, FaUserShield } from "react-icons/fa6";

const ITEMS = [
  { icon: FaLock, label: "AES-256 encryption", copy: "At rest and in transit" },
  { icon: FaServer, label: "Multi-region redundancy", copy: "No single point of failure" },
  { icon: FaCircleCheck, label: "99.95% uptime target", copy: "Built for national infrastructure" },
  { icon: FaUserShield, label: "Role-based access", copy: "7 stakeholder permission tiers" },
];

export default function ComplianceStrip() {
  return (
    <section className="section-pad relative border-t border-cream/5">
      <div className="container-lux">
        <div className="mb-14 max-w-xl">
          <p className="eyebrow mb-4 text-gold-soft">Trust &amp; compliance</p>
          <h2 className="font-display text-3xl font-800 leading-tight text-cream md:text-4xl">
            Built to survive an audit, <span className="text-gradient-gold">not just a demo.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((it) => (
            <div
              key={it.label}
              className="rounded-2xl border border-cream/10 bg-charcoal-raised/50 p-6 transition-colors hover:border-gold/30"
            >
              <it.icon className="text-emerald-bright" size={22} />
              <p className="mt-4 font-display text-sm font-700 text-cream">{it.label}</p>
              <p className="mt-1 text-xs text-cream/40">{it.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
