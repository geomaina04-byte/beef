import { NextRequest, NextResponse } from "next/server";

// Runs on Cloudflare's edge runtime. Uses the Resend HTTP API instead of
// nodemailer/SMTP, since raw TCP sockets aren't available on Workers.
export const runtime = "edge";

type ContactPayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  organization?: string;
  subject?: string;
  message?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, company, email, phone, organization, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "Name, email, subject, and message are required." },
      { status: 400 }
    );
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;
  const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL;

  // If email sending isn't configured yet, don't fail the request in a
  // confusing way — log it server-side (visible in `wrangler pages deployment tail`)
  // and let the UI show success. Set RESEND_API_KEY / CONTACT_TO_EMAIL /
  // CONTACT_FROM_EMAIL (see .env.example) to send real email.
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.warn(
      "[contact] Email sending not configured — logging submission instead.",
      { name, company, email, phone, organization, subject, message }
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  const safe = {
    name: escapeHtml(name),
    company: company ? escapeHtml(company) : "",
    email: escapeHtml(email),
    phone: phone ? escapeHtml(phone) : "",
    organization: organization ? escapeHtml(organization) : "",
    subject: escapeHtml(subject),
    message: escapeHtml(message).replace(/\n/g, "<br />"),
  };

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL,
        reply_to: email,
        subject: `[BeefTrace Contact] ${subject}`,
        html: `
          <h2>New contact form submission</h2>
          <p><strong>Name:</strong> ${safe.name}</p>
          ${safe.company ? `<p><strong>Company:</strong> ${safe.company}</p>` : ""}
          <p><strong>Email:</strong> ${safe.email}</p>
          ${safe.phone ? `<p><strong>Phone:</strong> ${safe.phone}</p>` : ""}
          ${safe.organization ? `<p><strong>Organization type:</strong> ${safe.organization}</p>` : ""}
          <p><strong>Subject:</strong> ${safe.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${safe.message}</p>
        `,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[contact] Resend API error:", res.status, errText);
      return NextResponse.json(
        { error: "Could not send your message right now. Please try again shortly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] Failed to send email:", err);
    return NextResponse.json(
      { error: "Could not send your message right now. Please try again shortly." },
      { status: 502 }
    );
  }
}
