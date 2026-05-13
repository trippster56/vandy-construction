import Link from "next/link";
import Placeholder from "@/components/ui/Placeholder";
import { siteConfig } from "@/lib/site-config";

export default function Hero() {
  return (
    <section
      className="bold-root"
      style={{
        position: "relative",
        minHeight: 740,
        borderBottom: `2px solid var(--ink)`,
        overflow: "hidden",
        background: "var(--acc)",
        color: "var(--accInk)",
      }}
    >
      <Placeholder
        label="↑ Hero image goes here — replace with project photo ↑"
        h="100%"
        tone="var(--acc)"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          color: "var(--accInk)",
          opacity: 0.55,
          border: "2px dashed var(--accInk)",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: 48,
          minHeight: 740,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span
            className="label"
            style={{ background: "var(--accInk)", color: "var(--acc)", fontSize: 11 }}
          >
            Est. {siteConfig.established} · {siteConfig.city}
          </span>
          <span className="label" style={{ background: "var(--accInk)", color: "var(--acc)" }}>
            ● Available now
          </span>
        </div>
        <div>
          <h1
            className="mega"
            style={{
              fontSize: "clamp(64px, 12vw, 168px)",
              margin: 0,
              color: "var(--accInk)",
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
            }}
          >
            {siteConfig.name}
          </h1>
          <p
            style={{
              fontSize: "clamp(20px, 2.4vw, 32px)",
              margin: "20px 0 0",
              color: "var(--accInk)",
              opacity: 0.92,
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.01em",
            }}
          >
            {siteConfig.tagline}
          </p>
          <div style={{ display: "flex", gap: 16, marginTop: 36, flexWrap: "wrap" }}>
            <Link
              href="/contact"
              className="btn-primary"
              style={{
                background: "var(--accInk)",
                borderColor: "var(--accInk)",
                color: "var(--acc)",
              }}
            >
              Get in touch →
            </Link>
            <Link
              href="/contact"
              className="btn-ghost"
              style={{ color: "var(--accInk)", borderColor: "var(--accInk)" }}
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
