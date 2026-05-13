import Link from "next/link";

export default function CTABanner() {
  return (
    <section
      className="bold-root px-4 sm:px-6 md:px-8 py-16 sm:py-24 md:py-[120px]"
      style={{
        background: "var(--acc)",
        color: "var(--accInk)",
        borderTop: `2px solid var(--ink)`,
        borderBottom: `2px solid var(--ink)`,
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-8 md:gap-20 items-end px-2 sm:px-4 md:px-6">
        <h2
          className="mega"
          style={{
            fontSize: "clamp(64px, 16vw, 168px)",
            margin: 0,
            color: "var(--accInk)",
            lineHeight: 0.95,
            overflowWrap: "anywhere",
          }}
        >
          Let&apos;s build.
        </h2>
        <div>
          <p
            className="text-base sm:text-lg md:text-[19px]"
            style={{ lineHeight: 1.4, margin: "0 0 28px", opacity: 0.92 }}
          >
            Got a project in mind? Send us the plans, the sketch, or the rough idea — we&apos;ll come back with a written estimate.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Link
              href="/contact"
              className="btn-primary"
              style={{ background: "var(--ink)", borderColor: "var(--ink)", color: "var(--p)" }}
            >
              Contact us →
            </Link>
            <Link
              href="/projects"
              className="btn-ghost"
              style={{ color: "var(--accInk)", borderColor: "var(--accInk)" }}
            >
              Our services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
