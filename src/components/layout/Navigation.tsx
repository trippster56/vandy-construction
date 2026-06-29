"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function Navigation() {
  const v = siteConfig.variant;
  if (v === "character") return <NavCharacter />;
  if (v === "bold") return <NavBold />;
  return <NavSafe />;
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function MobileToggle({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={onClick}
      className="nav-mobile-toggle"
      style={{
        display: "none",
        background: "transparent",
        border: "none",
        padding: 8,
        cursor: "pointer",
        color: "inherit",
      }}
    >
      {open ? <X size={22} /> : <Menu size={22} />}
    </button>
  );
}

function MobilePanel({
  open,
  onClose,
  variantClass,
}: {
  open: boolean;
  onClose: () => void;
  variantClass: string;
}) {
  const pathname = usePathname();
  if (!open) return null;
  return (
    <div
      className={`nav-mobile-panel ${variantClass}`}
      style={{
        display: "none",
        borderTop: "1px solid var(--line)",
        background: "var(--p)",
        padding: "12px 20px 20px",
      }}
    >
      <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {siteConfig.navLinks.map((n) => {
          const active = isActive(pathname, n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              onClick={onClose}
              className="nav-pill"
              data-active={active ? "true" : undefined}
              style={{ fontSize: 16, padding: "12px 14px" }}
            >
              {n.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function NavSafe() {
  const pathname = usePathname();
  const nav = siteConfig.navLinks;
  const [open, setOpen] = useState(false);
  return (
    <div className="safe-root">
      <header
        className="nav-header"
        style={{
          borderBottom: `1px solid var(--line)`,
          padding: "20px 56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--p)",
          gap: 16,
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-mark.svg" alt="" aria-hidden="true" style={{ height: 36, width: "auto" }} />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "var(--ink)",
            }}
          >
            {siteConfig.short}
          </span>
        </Link>
        <nav className="nav-links" style={{ display: "flex", gap: 4 }}>
          {nav.map((n) => {
            const active = isActive(pathname, n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className="nav-pill"
                data-active={active ? "true" : undefined}
                style={{ fontSize: 14 }}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <MobileToggle open={open} onClick={() => setOpen((o) => !o)} />
      </header>
      <MobilePanel open={open} onClose={() => setOpen(false)} variantClass="safe-root" />
    </div>
  );
}

function NavCharacter() {
  const pathname = usePathname();
  const nav = siteConfig.navLinks;
  const [open, setOpen] = useState(false);
  return (
    <div className="char-root">
      <header
        className="nav-header"
        style={{
          padding: "20px 56px",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: 24,
          background: "var(--p)",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 500 }}>{siteConfig.short}</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "var(--mu)" }}>&amp; Co.</span>
        </Link>
        <nav className="nav-links" style={{ display: "flex", gap: 4 }}>
          {nav.map((n) => {
            const active = isActive(pathname, n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className="nav-pill"
                data-active={active ? "true" : undefined}
                style={{ fontSize: 14 }}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div aria-hidden />
        <MobileToggle open={open} onClick={() => setOpen((o) => !o)} />
      </header>
      <div style={{ height: 1, background: "var(--line)", margin: "0 56px" }} />
      <MobilePanel open={open} onClose={() => setOpen(false)} variantClass="char-root" />
    </div>
  );
}

function NavBold() {
  const pathname = usePathname();
  const nav = siteConfig.navLinks;
  const [open, setOpen] = useState(false);
  return (
    <div className="bold-root">
      <header
        className="nav-header"
        style={{
          borderBottom: `2px solid var(--ink)`,
          padding: "20px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--p)",
          gap: 12,
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
          <div
            style={{
              width: 36, height: 36, background: "var(--ink)", color: "var(--p)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 800,
              flexShrink: 0,
            }}
          >
            {siteConfig.short.charAt(0)}
          </div>
          <span
            style={{
              fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700,
              letterSpacing: "-0.02em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}
          >
            {siteConfig.name}
          </span>
        </Link>
        <nav className="nav-links" style={{ display: "flex", gap: 4 }}>
          {nav.map((n) => {
            const active = isActive(pathname, n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className="nav-pill mono"
                data-active={active ? "true" : undefined}
                style={{ fontSize: 12, fontWeight: 500 }}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <MobileToggle open={open} onClick={() => setOpen((o) => !o)} />
      </header>
      <MobilePanel open={open} onClose={() => setOpen(false)} variantClass="bold-root" />
    </div>
  );
}
