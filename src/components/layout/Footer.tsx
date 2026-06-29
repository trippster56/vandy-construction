import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { SOCIAL_LABELS } from "@/data/home";

export default function Footer() {
  const v = siteConfig.variant;
  if (v === "character") return <CharacterFooter />;
  if (v === "bold") return <BoldFooter />;
  return <SafeFooter />;
}

function SafeFooter() {
  return (
    <footer
      className="safe-root"
      style={{
        padding: "48px 56px 32px",
        background: "var(--ink)",
        color: "var(--p)",
        borderTop: `1px solid rgba(255,255,255,0.08)`,
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-mark.svg" alt="" aria-hidden="true" style={{ height: 56, width: "auto", marginBottom: 16 }} />
          <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700 }}>{siteConfig.name}</div>
          <p style={{ fontSize: 13, opacity: 0.6, marginTop: 12, maxWidth: 280 }}>{siteConfig.description}</p>
        </div>
        <FooterCol title="Visit" tone="safe-dark">
          <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            {siteConfig.contact.address}<br />
            {siteConfig.contact.hours}<br />
            {siteConfig.contact.phone}
          </p>
        </FooterCol>
        <FooterCol title="Pages" tone="safe-dark">
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8, fontSize: 14 }}>
            {siteConfig.navLinks.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="line-link">{n.label}</Link>
              </li>
            ))}
          </ul>
        </FooterCol>
        <FooterCol title="Follow along" tone="safe-dark">
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8, fontSize: 14 }}>
            {SOCIAL_LABELS.map((s) => (
              <li key={s}>
                <a href="#" className="line-link">{s} ↗</a>
              </li>
            ))}
          </ul>
        </FooterCol>
      </div>
      <div
        className="mono"
        style={{
          display: "flex",
          justifyContent: "space-between",
          opacity: 0.45,
          paddingTop: 24,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          letterSpacing: "0.14em",
        }}
      >
        <span>© {new Date().getFullYear()} {siteConfig.name} · Est. {siteConfig.established}</span>
        <span>{siteConfig.city}</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; tone?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mono" style={{ opacity: 0.5, marginBottom: 16, letterSpacing: "0.14em" }}>{title}</div>
      {children}
    </div>
  );
}

function CharacterFooter() {
  return (
    <footer
      className="char-root"
      style={{ padding: "80px 56px 40px", background: "var(--p)", borderTop: `1px solid var(--line)` }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: 48, marginBottom: 60 }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 48, lineHeight: 1, fontWeight: 500 }}>
            {siteConfig.short} <span style={{ color: "var(--acc)" }}>&amp;</span> Co.
          </div>
          <p style={{ fontSize: 15, color: "var(--mu)", marginTop: 16, maxWidth: 320 }}>{siteConfig.description}</p>
        </div>
        <div>
          <div className="caption" style={{ color: "var(--acc)", marginBottom: 14 }}>Visit</div>
          <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            {siteConfig.contact.address}<br />
            {siteConfig.contact.hours}<br />
            {siteConfig.contact.phone}
          </p>
        </div>
        <div>
          <div className="caption" style={{ color: "var(--acc)", marginBottom: 14 }}>Pages</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8, fontSize: 14 }}>
            {siteConfig.navLinks.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="und">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="caption" style={{ color: "var(--acc)", marginBottom: 14 }}>Follow along</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8, fontSize: 14 }}>
            {SOCIAL_LABELS.map((s) => (
              <li key={s}>
                <a href="#" className="und">{s} ↗</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className="caption"
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 24,
          borderTop: `1px solid var(--line)`,
          color: "var(--mu)",
        }}
      >
        <span>© {new Date().getFullYear()} {siteConfig.name} · Est. {siteConfig.established}</span>
        <span>{siteConfig.city}</span>
      </div>
    </footer>
  );
}

function BoldFooter() {
  return (
    <footer className="bold-root" style={{ padding: "60px 32px 32px", background: "var(--ink)", color: "var(--p)" }}>
      <div style={{ padding: "0 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
            gap: 40,
            paddingBottom: 48,
            borderBottom: `2px solid var(--p)`,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 56,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 0.95,
              }}
            >
              {siteConfig.short}<br />&amp; Co.
            </div>
            <p style={{ fontSize: 14, opacity: 0.7, marginTop: 20, maxWidth: 320 }}>{siteConfig.description}</p>
          </div>
          <div>
            <div className="mono" style={{ color: "var(--acc)", marginBottom: 16, fontWeight: 600 }}>Visit</div>
            <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              {siteConfig.contact.address}<br />
              {siteConfig.contact.hours}<br />
              {siteConfig.contact.phone}
            </p>
          </div>
          <div>
            <div className="mono" style={{ color: "var(--acc)", marginBottom: 16, fontWeight: 600 }}>Pages</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8, fontSize: 14 }}>
              {siteConfig.navLinks.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="und">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mono" style={{ color: "var(--acc)", marginBottom: 16, fontWeight: 600 }}>Follow along</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8, fontSize: 14 }}>
              {SOCIAL_LABELS.map((s) => (
                <li key={s}>
                  <a href="#" className="und">{s} ↗</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mono" style={{ display: "flex", justifyContent: "space-between", marginTop: 24, opacity: 0.55 }}>
          <span>© {new Date().getFullYear()} {siteConfig.name} · Est. {siteConfig.established}</span>
          <span>{siteConfig.city}</span>
        </div>
      </div>
    </footer>
  );
}
