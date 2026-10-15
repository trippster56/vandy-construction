import { siteConfig } from "@/lib/site-config";

/**
 * HTML for the contact-form notification emails (estimate + subcontractor).
 *
 * Email clients ignore <style> blocks and most modern CSS, so everything is
 * table layout with inline styles. Every user-supplied value goes through esc().
 */

const NAVY = "#181F58";
const MUTED = "#63666A";
const LINE = "#E3E5EA";
const GROUND = "#F3F4F6";
const PANEL = "#F6F7F9";
const FONT = "Raleway, 'Helvetica Neue', Helvetica, Arial, sans-serif";

/** Escape user input before it goes into the email HTML. */
export function esc(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Collapse whitespace so user input can't inject into a subject line. */
export function oneLine(value: unknown) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

type Detail = { label: string; value?: string; href?: string };

export type ContactEmailInput = {
  kind: "estimate" | "subcontractor";
  name: string;
  email: string;
  phone?: string;
  preferredContact?: string;
  company?: string;
  trade?: string;
  licensedInsured?: string;
  message?: string;
  receivedAt?: Date;
};

function button(label: string, href: string, primary: boolean) {
  const bg = primary ? NAVY : "#FFFFFF";
  const fg = primary ? "#FFFFFF" : NAVY;
  // Inline-block so a narrow screen wraps the second button to its own line
  // instead of breaking the label.
  return `<a href="${href}" style="display: inline-block; margin: 0 8px 8px 0; padding: 11px 20px; border-radius: 6px; border: 1.5px solid ${NAVY}; background: ${bg}; color: ${fg}; font-family: ${FONT}; font-size: 14px; font-weight: 700; text-decoration: none; white-space: nowrap;">${label}</a>`;
}

function detailRow({ label, value, href }: Detail) {
  const shown = href
    ? `<a href="${href}" style="color: ${NAVY}; text-decoration: none; font-weight: 600;">${esc(value)}</a>`
    : esc(value);
  return `
    <tr>
      <td style="padding: 12px 0; border-top: 1px solid ${LINE}; width: 150px; vertical-align: top; font-family: ${FONT}; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: ${MUTED};">${esc(label)}</td>
      <td style="padding: 12px 0; border-top: 1px solid ${LINE}; vertical-align: top; font-family: ${FONT}; font-size: 15px; color: ${NAVY};">${shown}</td>
    </tr>`;
}

export function renderContactEmail(input: ContactEmailInput) {
  const isSub = input.kind === "subcontractor";
  const name = oneLine(input.name);
  const firstName = name.split(" ")[0] || name;
  const email = oneLine(input.email);
  const phone = oneLine(input.phone);
  const telHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "";
  const replySubject = isSub
    ? "Re: Subcontracting with Vandy Construction"
    : "Re: Your estimate request with Vandy Construction";
  const mailHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(replySubject)}`;
  const message = String(input.message ?? "").trim();

  const received = (input.receivedAt ?? new Date()).toLocaleString("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const eyebrow = isSub ? "New subcontractor" : "New estimate request";
  const subline = isSub
    ? [oneLine(input.trade), oneLine(input.company)].filter(Boolean).join(" · ")
    : "";

  const details: Detail[] = (
    isSub
      ? [
          { label: "Trade", value: oneLine(input.trade) },
          { label: "Company", value: oneLine(input.company) },
          { label: "Phone", value: phone, href: telHref },
          { label: "Email", value: email, href: mailHref },
          { label: "Licensed & insured", value: oneLine(input.licensedInsured) },
        ]
      : [
          { label: "Email", value: email, href: mailHref },
          { label: "Phone", value: phone, href: telHref },
          { label: "Prefers", value: oneLine(input.preferredContact) },
        ]
  ).filter((d) => d.value);

  // Shown as the inbox preview line in most clients, then hidden.
  const preheader = esc((message || subline || `${eyebrow} from ${name}`).slice(0, 110));

  const messageBlock = message
    ? `
      <tr>
        <td style="padding: 0 32px 8px;">
          <div style="font-family: ${FONT}; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: ${MUTED}; padding-bottom: 8px;">${isSub ? "Notes" : "Their project"}</div>
          <div style="background: ${PANEL}; border-left: 3px solid ${NAVY}; border-radius: 4px; padding: 16px 18px; font-family: ${FONT}; font-size: 15px; line-height: 1.6; color: #1F2433; white-space: pre-wrap;">${esc(message)}</div>
        </td>
      </tr>`
    : "";

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${esc(eyebrow)}</title>
</head>
<body style="margin: 0; padding: 0; background: ${GROUND};">
  <div style="display: none; max-height: 0; overflow: hidden; opacity: 0;">${preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: ${GROUND};">
    <tr>
      <td align="center" style="padding: 32px 12px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background: #FFFFFF; border: 1px solid ${LINE}; border-radius: 10px; overflow: hidden;">
          <tr>
            <td style="background: ${NAVY}; padding: 18px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align: middle; padding-right: 12px;">
                    <img src="${siteConfig.url}/apple-touch-icon.png" width="40" height="40" alt="" style="display: block; border: 0; border-radius: 6px;">
                  </td>
                  <td style="vertical-align: middle; font-family: ${FONT}; font-size: 15px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #FFFFFF;">Vandy Construction</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 32px 4px;">
              <div style="font-family: ${FONT}; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: ${MUTED};">${esc(eyebrow)}</div>
              <div style="font-family: ${FONT}; font-size: 28px; line-height: 1.2; font-weight: 700; color: ${NAVY}; padding-top: 6px;">${esc(name)}</div>
              ${subline ? `<div style="font-family: ${FONT}; font-size: 15px; color: ${MUTED}; padding-top: 4px;">${esc(subline)}</div>` : ""}
              <div style="font-family: ${FONT}; font-size: 13px; color: ${MUTED}; padding-top: 6px;">Received ${esc(received)}</div>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 32px 8px;">
              ${button(`Reply to ${esc(firstName)}`, mailHref, true)}${phone ? button(`Call ${esc(phone)}`, telHref, false) : ""}
            </td>
          </tr>
          ${messageBlock}
          <tr>
            <td style="padding: 16px 32px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${details.map(detailRow).join("")}</table>
            </td>
          </tr>
          <tr>
            <td style="background: ${PANEL}; border-top: 1px solid ${LINE}; padding: 16px 32px; font-family: ${FONT}; font-size: 12px; line-height: 1.6; color: ${MUTED};">
              Hitting reply sends your answer straight to ${esc(email)}.<br>
              Sent from the contact form on vandyconstruction.com.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
