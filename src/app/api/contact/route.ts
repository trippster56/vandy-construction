import { NextResponse } from "next/server";
import { Resend } from "resend";
import { saveContactMessage } from "@/db/queries";

/**
 * Contact Form API Route
 *
 * Uses Resend to send emails.
 * Set RESEND_API_KEY in your .env.local file.
 *
 * During development without a key, the route will
 * log the message and return success for testing.
 */

export async function POST(req: Request) {
  const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;
  try {
    const { name, email, phone, preferredContact, message } = await req.json();

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Save to database (skips gracefully if DATABASE_URL not set)
    await saveContactMessage({ name, email, phone, preferredContact, message });

    // If no API key in dev, log and return success
    if (!process.env.RESEND_API_KEY) {
      console.log("📧 Contact form submission (no RESEND_API_KEY set):");
      console.log({ name, email, phone, preferredContact, message });
      return NextResponse.json({ success: true, dev: true });
    }

    // Send email via Resend
    const { error } = await resend!.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.RESEND_TO_EMAIL || "info@vandyconstruction.com",
      replyTo: email,
      subject: `[Vandy Construction] New inquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #181F58;">New Website Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #63666A; width: 160px;"><strong>Name:</strong></td>
              <td style="padding: 8px 0; color: #181F58;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #63666A;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; color: #181F58;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #63666A;"><strong>Phone:</strong></td>
              <td style="padding: 8px 0; color: #181F58;">${phone || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #63666A;"><strong>Prefers contact by:</strong></td>
              <td style="padding: 8px 0; color: #181F58;">${preferredContact || "Not specified"}</td>
            </tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 8px;">
            <p style="color: #6b7280; margin: 0 0 8px 0;"><strong>Message:</strong></p>
            <p style="color: #111827; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
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
