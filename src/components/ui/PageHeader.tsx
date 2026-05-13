interface PageHeaderProps {
  title: string;
  eyebrow?: string;
  subtitle?: string;
}

// Compact, left-aligned page heading — sits right under the nav.
export default function PageHeader({ title, eyebrow, subtitle }: PageHeaderProps) {
  return (
    <section
      className="bold-root"
      style={{
        padding: "40px 32px 32px",
        borderTop: `2px solid var(--ink)`,
        background: "var(--p)",
      }}
    >
      <div style={{ padding: "0 24px" }}>
        {eyebrow && (
          <span className="label" style={{ display: "inline-block", marginBottom: 12 }}>
            {eyebrow}
          </span>
        )}
        <h1
          className="mega"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 64,
            lineHeight: 1.02,
            margin: 0,
            fontWeight: 800,
            letterSpacing: "-0.03em",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: 16, color: "var(--mu)", margin: "14px 0 0", maxWidth: 640 }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
