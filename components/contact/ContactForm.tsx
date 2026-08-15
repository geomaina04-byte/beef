"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const FIELDS: Array<{
  name: string;
  label: string;
  type: string;
  required?: boolean;
  span?: "full" | "half";
}> = [
  { name: "name", label: "Full name", type: "text", required: true, span: "half" },
  { name: "company", label: "Company", type: "text", span: "half" },
  { name: "email", label: "Email", type: "email", required: true, span: "half" },
  { name: "phone", label: "Phone", type: "tel", span: "half" },
  { name: "organization", label: "Organization type", type: "text", span: "full" },
  { name: "subject", label: "Subject", type: "text", required: true, span: "full" },
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass flex min-h-[420px] flex-col items-center justify-center rounded-3xl p-10 text-center"
      >
        <h3 className="font-display text-2xl font-700 text-cream">Message received</h3>
        <p className="mt-3 max-w-sm text-sm text-cream/50">
          Someone from the team will follow up shortly. In the meantime, feel
          free to book time directly.
        </p>
        <a
          href="/demo"
          className="mt-6 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-charcoal-fixed transition-transform hover:scale-[1.03]"
        >
          Book a Demo
        </a>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="glass rounded-3xl p-6 md:p-8"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FIELDS.map((f) => (
          <div key={f.name} className={f.span === "full" ? "sm:col-span-2" : ""}>
            <label htmlFor={f.name} className="mb-1.5 block text-xs text-cream/45">
              {f.label}
              {f.required && <span className="text-gold-soft"> *</span>}
            </label>
            <input
              id={f.name}
              name={f.name}
              type={f.type}
              required={f.required}
              className="w-full rounded-xl border border-cream/10 bg-charcoal/60 px-4 py-3 text-sm text-cream placeholder:text-cream/25 focus:border-gold/40 focus:outline-none"
            />
          </div>
        ))}

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-xs text-cream/45">
            Message <span className="text-gold-soft">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full resize-none rounded-xl border border-cream/10 bg-charcoal/60 px-4 py-3 text-sm text-cream placeholder:text-cream/25 focus:border-gold/40 focus:outline-none"
            placeholder="Tell us a bit about what you're looking for…"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-gold px-7 py-3 text-sm font-semibold text-charcoal-fixed transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <a
          href="/demo"
          className="rounded-full border border-cream/20 px-7 py-3 text-sm font-medium text-cream/75 transition-colors hover:border-cream/40"
        >
          Book a Demo instead
        </a>
      </div>

      {status === "error" && error && (
        <p className="mt-4 text-sm text-red-400">{error}</p>
      )}
    </motion.form>
  );
}
