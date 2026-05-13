import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { SOCIAL_LABELS } from "@/data/home";

export default function Footer() {
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
              {siteConfig.name}
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
