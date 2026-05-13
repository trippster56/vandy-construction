interface PageHeaderProps {
  title: string;
  eyebrow?: string;
  subtitle?: string;
}

// Compact, left-aligned page heading — sits right under the nav.
export default function PageHeader({ title, eyebrow, subtitle }: PageHeaderProps) {
  return (
    <section
      className="bold-root px-4 sm:px-6 md:px-8 pt-8 sm:pt-10 pb-8"
      style={{ borderTop: `2px solid var(--ink)`, background: "var(--p)" }}
    >
      <div className="px-2 sm:px-4 md:px-6">
        {eyebrow && (
          <span className="label inline-block mb-3">{eyebrow}</span>
        )}
        <h1
          className="mega"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 8vw, 64px)",
            lineHeight: 1.02,
            margin: 0,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            overflowWrap: "anywhere",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-base mt-3.5 m-0" style={{ color: "var(--mu)", maxWidth: 640 }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
