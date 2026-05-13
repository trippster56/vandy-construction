import Link from "next/link";
import Placeholder from "@/components/ui/Placeholder";
import { siteConfig } from "@/lib/site-config";

export default function Hero() {
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
