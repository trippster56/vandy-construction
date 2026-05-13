import Link from "next/link";
import Placeholder from "@/components/ui/Placeholder";
import { siteConfig } from "@/lib/site-config";

export default function Hero() {
  return (
    <section
      className="bold-root relative overflow-hidden min-h-[520px] sm:min-h-[640px] md:min-h-[740px]"
      style={{
        borderBottom: `2px solid var(--ink)`,
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
      <div className="relative z-[1] flex flex-col justify-between min-h-[520px] sm:min-h-[640px] md:min-h-[740px] p-6 sm:p-10 md:p-12">
        <div className="flex flex-wrap gap-2 justify-between">
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
              fontSize: "clamp(48px, 13vw, 168px)",
              margin: 0,
              color: "var(--accInk)",
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              overflowWrap: "anywhere",
            }}
          >
            {siteConfig.name}
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 2.4vw, 32px)",
              margin: "20px 0 0",
              color: "var(--accInk)",
              opacity: 0.92,
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.01em",
            }}
          >
            {siteConfig.tagline}
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-7 sm:mt-9">
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
