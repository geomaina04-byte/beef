import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/contact/ContactForm";
import {
  FaClock,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaInstagram,
  FaTiktok,
  FaCommentDots,
} from "react-icons/fa6";

export const metadata: Metadata = {
  title: "Contact — BeefTrace",
  description: "Talk to the BeefTrace team — sales, support, or a live platform demo.",
};

export default function ContactPage() {
  return (
    <main className="relative">
      <Nav />

      <section className="relative flex min-h-[55vh] items-center overflow-hidden pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(212,166,87,0.14),transparent_50%),radial-gradient(circle_at_15%_70%,rgba(107,20,24,0.28),transparent_55%)]" />
        <div className="container-lux relative max-w-2xl">
          <p className="eyebrow mb-4 text-emerald-bright">Get in touch</p>
          <h1 className="font-display text-5xl font-900 leading-[1.05] text-cream md:text-6xl">
            Let&apos;s talk <span className="text-gradient-gold">traceability.</span>
          </h1>
          <p className="mt-6 max-w-lg text-cream/55">
            Sales, support, or a live walkthrough of the platform — tell us
            what you need and the right person will follow up.
          </p>
        </div>
      </section>

      <section className="section-pad relative">
        <div className="container-lux grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <ContactForm />

          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-cream/10 bg-charcoal-raised/40 p-6">
              <p className="eyebrow mb-4 text-gold-soft">Reach us directly</p>
              <div className="space-y-4 text-sm">
                <a href="mailto:beeftracekenya@gmail.com" className="flex items-center gap-3 text-cream/70 hover:text-cream">
                  <FaEnvelope className="text-emerald-bright" size={14} /> beeftracekenya@gmail.com
                </a>
                <a href="tel:+254759866695" className="flex items-center gap-3 text-cream/70 hover:text-cream">
                  <FaPhone className="text-emerald-bright" size={14} /> +254 759 866 695
                </a>
                <div className="flex items-start gap-3 text-cream/70">
                  <FaClock className="mt-0.5 shrink-0 text-emerald-bright" size={14} />
                  <span>Mon – Fri, 8:00 – 18:00 EAT<br />Sat, 9:00 – 13:00 EAT</span>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3 border-t border-cream/10 pt-5">
                <a href="#" aria-label="BeefTrace on LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/10 text-cream/50 transition-colors hover:border-gold/40 hover:text-gold-soft">
                  <FaLinkedin size={14} />
                </a>
                <a href="https://instagram.com/beeftrace.ke" aria-label="BeefTrace on Instagram" className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/10 text-cream/50 transition-colors hover:border-gold/40 hover:text-gold-soft">
                  <FaInstagram size={14} />
                </a>
                <a href="https://tiktok.com/@beeftrace.ke" aria-label="BeefTrace on TikTok" className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/10 text-cream/50 transition-colors hover:border-gold/40 hover:text-gold-soft">
                  <FaTiktok size={13} />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-3xl border border-emerald/20 bg-emerald/[0.06] p-5">
              <FaCommentDots className="shrink-0 text-emerald-bright" size={18} />
              <div>
                <p className="text-sm font-medium text-cream">Live chat</p>
                <p className="text-xs text-cream/40">Coming soon — for now, use the form or email.</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-cream/10">
              <iframe
                title="BeefTrace office location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=36.75%2C-1.35%2C36.92%2C-1.22&layer=mapnik&marker=-1.286389%2C36.817223"
                className="h-64 w-full grayscale"
                loading="lazy"
              />
              <p className="bg-charcoal-raised/60 px-4 py-2 text-[11px] text-cream/30">
                Nairobi, Kenya — illustrative location, pending real office address.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FAQ />
      <Footer />
    </main>
  );
}
