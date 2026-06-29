import { siteConfig } from "@/lib/site-config";

interface PageHeaderProps {
  title: string;
  eyebrow?: string;
  subtitle?: string;
}

// Compact, left-aligned page heading — sits right under the nav.
export default function PageHeader({ title, eyebrow, subtitle }: PageHeaderProps) {
  const v = siteConfig.variant;
  const rootClass = v === "character" ? "char-root" : v === "bold" ? "bold-root" : "safe-root";
  const eyebrowClass = v === "bold" ? "label" : v === "character" ? "caption" : "section-label";

  const padX = v === "bold" ? "32px" : "56px";
  const padInner = v === "bold" ? "0 24px" : "0";
  const borderTop =
    v === "bold" ? `2px solid var(--ink)` : `1px solid var(--line)`;

  const titleSize =
    v === "bold" ? 64 : v === "character" ? 56 : 48;
  const titleWeight =
    v === "bold" ? 800 : v === "character" ? 500 : 400;
  const titleClassName = v === "bold" ? "mega" : undefined;

  return (
    <section
      className={rootClass}
      style={{
        padding: `40px ${padX} 32px`,
        borderTop,
        background: "var(--p)",
      }}
    >
      <div style={{ padding: padInner }}>
        {eyebrow && (
          <span className={eyebrowClass} style={{ display: "inline-block", marginBottom: 12 }}>
            {eyebrow}
          </span>
        )}
        <h1
          className={titleClassName}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: titleSize,
            lineHeight: 1.02,
            margin: 0,
            fontWeight: titleWeight,
            letterSpacing: v === "bold" ? "-0.03em" : "-0.015em",
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
