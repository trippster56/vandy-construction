import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { SOCIAL_LABELS } from "@/data/home";

export default function Footer() {
  return (
    <footer
      className="bold-root px-4 sm:px-6 md:px-8 pt-12 sm:pt-16 pb-8"
      style={{ background: "var(--ink)", color: "var(--p)" }}
    >
      <div className="px-2 sm:px-4 md:px-6">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-8 md:gap-10 pb-10 md:pb-12"
          style={{ borderBottom: `2px solid var(--p)` }}
        >
          <div className="sm:col-span-2 md:col-span-1">
            <div
              className="text-[40px] sm:text-[48px] md:text-[56px]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 0.95,
                overflowWrap: "anywhere",
              }}
            >
              {siteConfig.name}
            </div>
            <p className="text-sm opacity-70 mt-5" style={{ maxWidth: 320 }}>
              {siteConfig.description}
            </p>
          </div>
          <div>
            <div className="mono mb-4 font-semibold" style={{ color: "var(--acc)" }}>Visit</div>
            <p className="text-sm m-0" style={{ lineHeight: 1.7 }}>
              {siteConfig.contact.address}<br />
              {siteConfig.contact.hours}<br />
              {siteConfig.contact.phone}
            </p>
          </div>
          <div>
            <div className="mono mb-4 font-semibold" style={{ color: "var(--acc)" }}>Pages</div>
            <ul className="list-none p-0 m-0 grid gap-2 text-sm">
              {siteConfig.navLinks.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="und">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mono mb-4 font-semibold" style={{ color: "var(--acc)" }}>Follow along</div>
            <ul className="list-none p-0 m-0 grid gap-2 text-sm">
              {SOCIAL_LABELS.map((s) => (
                <li key={s}>
                  <a href="#" className="und">{s} ↗</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className="mono flex flex-col sm:flex-row gap-2 sm:justify-between mt-6"
          style={{ opacity: 0.55 }}
        >
          <span>© {new Date().getFullYear()} {siteConfig.name} · Est. {siteConfig.established}</span>
          <span>{siteConfig.city}</span>
        </div>
      </div>
    </footer>
  );
}
