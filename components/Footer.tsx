import Image from "next/image";
import { FaLinkedin, FaInstagram, FaTiktok, FaEnvelope, FaPhone } from "react-icons/fa6";
import BrandLogo from "@/components/BrandLogo";

const COLS = [
  {
    title: "Product",
    links: [
      { label: "Solutions", href: "/#solution" },
      { label: "Technology", href: "/technology" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "The Poster", href: "/#poster" },
      { label: "Team", href: "/team" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Stories", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Book a Demo", href: "/demo" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

const SOCIALS = [
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { icon: FaInstagram, href: "https://instagram.com/beeftrace.ke", label: "Instagram" },
  { icon: FaTiktok, href: "https://tiktok.com/@beeftrace.ke", label: "TikTok" },
  { icon: FaEnvelope, href: "mailto:beeftracekenya@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-cream/5 pt-20">
      <div className="container-lux">
        <div className="grid gap-12 pb-16 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <div className="flex items-center">
              <BrandLogo imgClassName="h-8 w-auto" />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/45">
              Digital livestock traceability, from birth on the farm to the final cut
              on a plate.
            </p>

            <div className="mt-5 space-y-2 text-sm">
              <a href="mailto:beeftracekenya@gmail.com" className="flex items-center gap-2.5 text-cream/55 hover:text-cream">
                <FaEnvelope className="text-emerald-bright" size={12} /> beeftracekenya@gmail.com
              </a>
              <a href="tel:+254759866695" className="flex items-center gap-2.5 text-cream/55 hover:text-cream">
                <FaPhone className="text-emerald-bright" size={12} /> +254 759 866 695
              </a>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full bg-cream-fixed px-3 py-1.5">
                <Image src="/logos/jhub-africa.png" alt="JHUB Africa" width={20} height={15} />
                <span className="text-[11px] font-semibold text-charcoal-fixed">JHUB Africa</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-cream-fixed px-3 py-1.5">
                <Image src="/logos/jkuat.png" alt="JKUAT" width={16} height={16} className="rounded-full" />
                <span className="text-[11px] font-semibold text-charcoal-fixed">JKUAT</span>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={`BeefTrace on ${s.label}`}
                  className="social-icon flex h-9 w-9 items-center justify-center rounded-full border border-cream/10 text-cream/50 transition-colors hover:border-gold/40 hover:text-gold-soft"
                >
                  <s.icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLS.map((c) => (
              <div key={c.title}>
                <p className="eyebrow mb-4 text-cream/40">{c.title}</p>
                <ul className="space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-sm text-cream/60 hover:text-cream">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="hairline" />
        <div className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <p className="text-xs text-cream/35">
            &copy; {new Date().getFullYear()} BeefTrace. A digital livestock
            traceability project.
          </p>
          <p className="text-xs text-cream/35">Trace it. Track it. Trust it.</p>
        </div>
      </div>
    </footer>
  );
}
