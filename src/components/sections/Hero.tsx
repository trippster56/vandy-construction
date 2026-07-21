import Link from "next/link";
import Placeholder from "@/components/ui/Placeholder";
import Photo from "@/components/ui/Photo";
import { siteConfig } from "@/lib/site-config";

export default function Hero() {
  const v = siteConfig.variant;
  if (v === "character") return <HeroCharacter hero={siteConfig.hero} />;
  if (v === "bold") return <HeroBold hero={siteConfig.hero} />;
  return <HeroSafe hero={siteConfig.hero} />;
}

// ──────────────────────────────────────────────────────────────
// SAFE
// ──────────────────────────────────────────────────────────────
export function HeroSafe({ hero }: { hero: string }) {
  if (hero === "type-only") {
    return (
      <section className="safe-root" style={{ padding: "120px 56px 140px", borderTop: `1px solid var(--line)` }}>
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 56 }}>
          <div>
            <span className="section-label">Est. {siteConfig.established}</span>
            <p className="mono" style={{ color: "var(--acc)", marginTop: 12 }}>Available now</p>
          </div>
          <div>
            <h1 style={{ fontSize: 148, lineHeight: 0.94, margin: 0, fontWeight: 400, letterSpacing: "-0.02em" }}>
              {siteConfig.tagline}
            </h1>
            <div style={{ display: "flex", gap: 56, marginTop: 56, alignItems: "end", justifyContent: "space-between" }}>
              <p style={{ fontSize: 19, lineHeight: 1.5, maxWidth: 540, color: "var(--mu)", margin: 0 }}>
                {siteConfig.description}
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <Link href="/contact" className="btn-primary">Get in touch →</Link>
                <Link href="/contact" className="btn-ghost">Contact us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (hero === "fullbleed") {
    return (
      <section className="safe-root" style={{ position: "relative", borderTop: `1px solid var(--line)`, overflow: "hidden" }}>
        {siteConfig.heroImage ? (
          <Photo
            src={siteConfig.heroImage}
            alt={siteConfig.heroImageAlt}
            h="100%"
            priority
            sizes="100vw"
            style={{ position: "absolute", inset: 0 }}
          />
        ) : (
          <Placeholder label="hero image" h="100%" tone="#3a3128" style={{ width: "100%", color: "#e5dccb" }} />
        )}
        {/* Navy scrim so the headline and buttons stay legible over the photo. */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(16,21,61,0.45) 0%, rgba(16,21,61,0.20) 42%, rgba(16,21,61,0.80) 100%)",
          }}
        />
        {/* Content is in-flow (relative). minHeight is set in CSS against the
            viewport so the whole hero — headline + buttons — fits without
            scrolling, and grows if a long headline ever needs more room. */}
        <div className="hero-fullbleed-inner" style={{ position: "relative", padding: 56, display: "flex", flexDirection: "column", justifyContent: "space-between", color: "#fff8ef" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span className="mono" style={{ opacity: 0.7, letterSpacing: "0.14em" }}>Est. {siteConfig.established}</span>
            <span className="mono" style={{ opacity: 0.7, letterSpacing: "0.14em" }}>Available now</span>
          </div>
          <div>
            <h1 style={{ fontSize: 100, lineHeight: 0.98, margin: "40px 0 0", fontWeight: 400, maxWidth: 1000 }}>
              {siteConfig.tagline}
            </h1>
            <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
              <Link href="/contact" className="btn-primary" style={{ background: "var(--acc)", color: "var(--accInk)" }}>Get in touch →</Link>
              <Link href="/contact" className="btn-ghost" style={{ color: "#fff8ef", borderColor: "rgba(255,255,255,0.3)" }}>Contact us</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // split (default)
  return (
    <section className="safe-root" style={{ padding: "80px 56px 100px", borderTop: `1px solid var(--line)` }}>
      <div className="hero-split" style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 56, alignItems: "end" }}>
        <div>
          <div style={{ display: "flex", gap: 16, alignItems: "baseline", marginBottom: 36 }}>
            <span className="section-label">Est. {siteConfig.established}</span>
            <span style={{ width: 32, height: 1, background: "var(--line)" }} />
            <span className="mono" style={{ color: "var(--acc)", letterSpacing: "0.14em" }}>Available now</span>
          </div>
          <h1 style={{ fontSize: 116, lineHeight: 0.95, margin: 0, fontWeight: 400, letterSpacing: "-0.02em" }}>
            {siteConfig.tagline}
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.5, maxWidth: 520, color: "var(--mu)", margin: "40px 0 36px" }}>
            {siteConfig.description}
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <Link href="/contact" className="btn-primary">Get in touch →</Link>
            <Link href="/contact" className="btn-ghost">Contact us</Link>
          </div>
        </div>
        <figure className="img-hover" style={{ margin: 0 }}>
          {siteConfig.heroImage ? (
            <Photo
              src={siteConfig.heroImage}
              alt={siteConfig.heroImageAlt}
              h={620}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <Placeholder label="hero image" h={620} tone="#bfb39a" style={{ width: "100%" }} />
          )}
        </figure>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────
// CHARACTER
// ──────────────────────────────────────────────────────────────
export function HeroCharacter({ hero }: { hero: string }) {
  if (hero === "type-only") {
    return (
      <section className="char-root" style={{ padding: "100px 56px 120px", textAlign: "center" }}>
        <span className="caption" style={{ color: "var(--acc)", display: "block", marginBottom: 24 }}>
          Est. {siteConfig.established}
        </span>
        <h1 style={{ fontSize: 188, lineHeight: 0.9, margin: 0, fontFamily: "var(--font-display)", fontWeight: 500, letterSpacing: "-0.02em" }}>
          {siteConfig.tagline}
        </h1>
        <p style={{ fontSize: 19, color: "var(--mu)", maxWidth: 580, margin: "48px auto 32px" }}>
          {siteConfig.description}
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link href="/contact" className="btn-primary">Get in touch →</Link>
          <Link href="/contact" className="btn-ghost">Contact us</Link>
        </div>
      </section>
    );
  }

  if (hero === "fullbleed") {
    return (
      <section className="char-root" style={{ position: "relative", height: 700, overflow: "hidden" }}>
        <Placeholder label="hero image" h="100%" tone="#3d3325" style={{ width: "100%", color: "#ecdfc4" }} />
        <div style={{ position: "absolute", inset: 0, padding: 56, display: "flex", flexDirection: "column", justifyContent: "space-between", color: "#fff3da" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="caption" style={{ color: "#fff3da", opacity: 0.7 }}>Est. {siteConfig.established}</span>
            <span className="stamp" style={{ color: "#ffd9a8", borderColor: "#ffd9a8" }}>
              <span className="dot" style={{ background: "#ffd9a8" }} />
              Available now
            </span>
          </div>
          <div>
            <h1 style={{ fontSize: 132, lineHeight: 0.9, margin: 0, fontFamily: "var(--font-display)", fontWeight: 500, maxWidth: 1000 }}>
              {siteConfig.tagline}
            </h1>
            <p style={{ fontSize: 18, opacity: 0.85, maxWidth: 540, marginTop: 28 }}>{siteConfig.description}</p>
          </div>
        </div>
      </section>
    );
  }

  // split
  return (
    <section className="char-root" style={{ padding: "80px 56px 100px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 0.95fr", gap: 64, alignItems: "start" }}>
        <div style={{ paddingTop: 24 }}>
          <span className="caption" style={{ color: "var(--acc)" }}>
            Est. {siteConfig.established} · {siteConfig.city}
          </span>
          <h1 style={{ fontSize: 108, lineHeight: 0.95, margin: "20px 0 0", fontWeight: 500, letterSpacing: "-0.015em" }}>
            {siteConfig.tagline}
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.5, maxWidth: 480, color: "var(--mu)", margin: "36px 0 32px" }}>
            {siteConfig.description}
          </p>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Link href="/contact" className="btn-primary">Get in touch →</Link>
            <Link href="/contact" className="btn-ghost">Contact us</Link>
          </div>
          <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: 32, alignItems: "baseline" }}>
            {[
              { k: "Established", v: String(siteConfig.established) },
              { k: "Open", v: "Mon–Sat" },
              { k: "Stat label", v: "Value" },
            ].map((s) => (
              <div key={s.k}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 500 }}>{s.v}</div>
                <span className="caption" style={{ marginTop: 4, display: "block" }}>{s.k}</span>
              </div>
            ))}
          </div>
        </div>
        <figure className="img-zoom" style={{ margin: 0 }}>
          <Placeholder label="hero image" h={640} tone="#c7b794" style={{ width: "100%" }} />
        </figure>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────
// BOLD
// ──────────────────────────────────────────────────────────────
export function HeroBold({ hero }: { hero: string }) {
  if (hero === "type-only") {
    return (
      <section className="bold-root" style={{ padding: "100px 32px 120px", borderBottom: `2px solid var(--ink)` }}>
        <div style={{ padding: "0 24px" }}>
          <span className="label acc">Est. {siteConfig.established} · {siteConfig.city}</span>
          <h1 className="mega" style={{ fontSize: 236, margin: "32px 0 0", letterSpacing: "-0.04em" }}>
            {siteConfig.tagline}
          </h1>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginTop: 64 }}>
            <p style={{ fontSize: 19, maxWidth: 480, color: "var(--mu)", margin: 0, lineHeight: 1.45 }}>
              {siteConfig.description}
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              <Link href="/contact" className="btn-primary">Get in touch →</Link>
              <Link href="/contact" className="btn-ghost">Contact us</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (hero === "fullbleed") {
    return (
      <section className="bold-root" style={{ position: "relative", height: 740, borderBottom: `2px solid var(--ink)`, overflow: "hidden" }}>
        <Placeholder label="hero image" h="100%" tone="#2b2419" style={{ width: "100%", color: "#ecdfc4" }} />
        <div style={{ position: "absolute", inset: 0, padding: 48, display: "flex", flexDirection: "column", justifyContent: "space-between", color: "var(--accInk)" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="label acc" style={{ fontSize: 11 }}>Est. {siteConfig.established} · {siteConfig.city}</span>
            <span className="label" style={{ background: "var(--accInk)", color: "var(--ink)" }}>● Available now</span>
          </div>
          <div>
            <h1 className="mega" style={{ fontSize: 168, margin: 0, color: "var(--accInk)", letterSpacing: "-0.04em" }}>
              {siteConfig.tagline}
            </h1>
            <div style={{ display: "flex", gap: 16, marginTop: 36 }}>
              <Link href="/contact" className="btn-primary" style={{ background: "var(--acc)", borderColor: "var(--acc)" }}>Get in touch →</Link>
              <Link href="/contact" className="btn-ghost" style={{ color: "var(--accInk)", borderColor: "var(--accInk)" }}>Contact us</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // split
  return (
    <section className="bold-root" style={{ padding: "80px 32px", borderBottom: `2px solid var(--ink)` }}>
      <div style={{ padding: "0 24px", display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 56, alignItems: "stretch" }}>
        <div>
          <span className="label acc">Est. {siteConfig.established} · {siteConfig.city}</span>
          <h1 className="mega" style={{ fontSize: 160, margin: "28px 0 0", letterSpacing: "-0.04em" }}>
            {siteConfig.tagline}
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.45, maxWidth: 540, color: "var(--mu)", margin: "32px 0" }}>
            {siteConfig.description}
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <Link href="/contact" className="btn-primary">Get in touch →</Link>
            <Link href="/contact" className="btn-ghost">Contact us</Link>
          </div>
          <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, paddingTop: 32, borderTop: `2px solid var(--ink)` }}>
            {[
              { k: "Established", v: String(siteConfig.established) },
              { k: "Open", v: "Mon–Sat" },
              { k: "Stat label", v: "Value" },
            ].map((s) => (
              <div key={s.k}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>
                  {s.v}
                </div>
                <span className="mono" style={{ color: "var(--mu)", marginTop: 4, display: "block" }}>{s.k}</span>
              </div>
            ))}
          </div>
        </div>
        <figure className="img-grow" style={{ margin: 0, border: `2px solid var(--ink)`, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", borderBottom: `2px solid var(--ink)`, background: "var(--p)" }}>
            <span className="mono" style={{ fontWeight: 600 }}>Hero image</span>
            <span className="mono">Caption</span>
          </div>
          <Placeholder label="hero image" h="100%" tone="#a89071" style={{ width: "100%", flex: 1 }} />
          <div style={{ padding: 16, borderTop: `2px solid var(--ink)`, background: "var(--acc)", color: "var(--accInk)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="mono" style={{ fontWeight: 600 }}>Available now</span>
            <Link href="/contact" className="mono und" style={{ fontWeight: 600 }}>Get in touch →</Link>
          </div>
        </figure>
      </div>
    </section>
  );
}
