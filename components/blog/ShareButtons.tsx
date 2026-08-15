"use client";

import { useEffect, useState } from "react";
import { FaLinkedin, FaXTwitter, FaFacebook, FaWhatsapp, FaLink, FaCheck } from "react-icons/fa6";

export default function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const LINKS = [
    { icon: FaLinkedin, label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { icon: FaXTwitter, label: "Share on X", href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { icon: FaFacebook, label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { icon: FaWhatsapp, label: "Share on WhatsApp", href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard API unavailable — link is still visible via the browser's address bar
    }
  }

  return (
    <div className="flex items-center gap-2">
      {LINKS.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          aria-label={l.label}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/55 transition-colors hover:border-gold/40 hover:text-gold-soft"
        >
          <l.icon size={14} />
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/55 transition-colors hover:border-gold/40 hover:text-gold-soft"
      >
        {copied ? <FaCheck size={13} className="text-emerald-bright" /> : <FaLink size={13} />}
      </button>
    </div>
  );
}
