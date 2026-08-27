import { NextResponse } from "next/server";
import { Resend } from "resend";
import { saveContactMessage } from "@/db/queries";
import { siteConfig } from "@/lib/site-config";

/**
 * Contact Form API Route
 *
 * Handles both submission types from /contact:
 *   type: "estimate"      → customer requesting an estimate
 *   type: "subcontractor" → trade partner asking to be considered for jobs
 *
 * Uses Resend to send emails. Set RESEND_API_KEY in your .env.local file.
 * Subcontractor submissions go to RESEND_SUBS_TO_EMAIL when set, so they can be
 * routed away from Josh's main inbox; otherwise they fall back to the main To.
 *
 * During development without a key, the route will
 * log the message and return success for testing.
 */

const BRAND = "#181F58";
const MUTED = "#63666A";

/** Escape user input before it goes into the email HTML. */
function esc(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Collapse whitespace so user input can't inject into a subject line. */
function oneLine(value: unknown) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function row(label: string, value: unknown) {
  return `
    <tr>
      <td style="padding: 8px 0; color: ${MUTED}; width: 180px;"><strong>${esc(label)}:</strong></td>
      <td style="padding: 8px 0; color: ${BRAND};">${esc(value) || "Not provided"}</td>
    </tr>`;
}

function emailShell(heading: string, rows: string, note?: { label: string; body: string }) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: ${BRAND};">${esc(heading)}</h2>
      <table style="width: 100%; border-collapse: collapse;">${rows}</table>
      ${
        note
          ? `<div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 8px;">
               <p style="color: #6b7280; margin: 0 0 8px 0;"><strong>${esc(note.label)}:</strong></p>
               <p style="color: #111827; margin: 0; white-space: pre-wrap;">${esc(note.body)}</p>
             </div>`
          : ""
      }
    </div>`;
}

export async function POST(req: Request) {
  const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      preferredContact,
      message,
      company,
      trade,
      licensedInsured,
    } = body;
    const isSubcontractor = body.type === "subcontractor";

    // Validation — subcontractors need a trade and a phone instead of a message.
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }
    if (isSubcontractor) {
      if (!phone || !trade) {
        return NextResponse.json(
          { error: "Phone number and trade are required." },
          { status: 400 }
        );
      }
    } else if (!message) {
      return NextResponse.json(
        { error: "Please tell us a little about your project." },
        { status: 400 }
      );
    }

    // Save to database (skips gracefully if DATABASE_URL not set).
    // Blank optional fields become undefined so they store as NULL, not "".
    const opt = (v: unknown) => oneLine(v) || undefined;
    await saveContactMessage({
      type: isSubcontractor ? "subcontractor" : "estimate",
      name: oneLine(name),
      company: opt(company),
      email: oneLine(email),
      phone: opt(phone),
      preferredContact: opt(preferredContact),
      trade: opt(trade),
      licensedInsured: opt(licensedInsured),
      message: String(message ?? "").trim() || undefined,
    });

    // If no API key in dev, log and return success
    if (!process.env.RESEND_API_KEY) {
      console.log(
        `📧 ${isSubcontractor ? "Subcontractor" : "Estimate"} submission (no RESEND_API_KEY set):`
      );
      console.log(body);
      return NextResponse.json({ success: true, dev: true });
    }

    const mainTo = process.env.RESEND_TO_EMAIL || siteConfig.email.to;
    const to = isSubcontractor
      ? process.env.RESEND_SUBS_TO_EMAIL || siteConfig.email.subcontractorsTo || mainTo
      : mainTo;

    const subject = isSubcontractor
      ? `[Vandy Subcontractor] ${oneLine(trade)} — ${oneLine(name)}`
      : `[Vandy Construction] New inquiry from ${oneLine(name)}`;

    const html = isSubcontractor
      ? emailShell(
          "New Subcontractor Interest",
          [
            row("Name", name),
            row("Company", company),
            row("Trade", trade),
            row("Phone", phone),
            row("Email", email),
            row("Licensed & insured", licensedInsured),
          ].join(""),
          message ? { label: "Notes", body: message } : undefined
        )
      : emailShell(
          "New Website Inquiry",
          [
            row("Name", name),
            row("Email", email),
            row("Phone", phone),
            row("Prefers contact by", preferredContact),
          ].join(""),
          { label: "Message", body: message }
        );

    // Send email via Resend
    const { error } = await resend!.emails.send({
      from: process.env.RESEND_FROM_EMAIL || siteConfig.email.from,
      to,
      replyTo: email,
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
