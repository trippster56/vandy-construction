"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site-config";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const nav = siteConfig.navLinks;
  return (
    <div className="bold-root">
      <header
        className="px-4 py-4 sm:px-6 md:px-8 md:py-5 grid items-center gap-3"
        style={{
          borderBottom: `2px solid var(--ink)`,
          gridTemplateColumns: "1fr auto",
          background: "var(--p)",
        }}
      >
        <Link href="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/android-chrome-512x512.png"
            alt={`${siteConfig.name} logo`}
            width={44}
            height={44}
            className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 object-contain"
          />
          <span
            className="font-bold truncate text-base sm:text-lg md:text-xl"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
          >
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2 justify-self-end">
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

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Open menu"
            className="md:hidden inline-flex items-center justify-center justify-self-end w-11 h-11"
            style={{ border: `2px solid var(--ink)`, background: "var(--p)", color: "var(--ink)" }}
          >
            <Menu size={20} />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[78vw] max-w-sm p-0 flex flex-col"
            style={{ background: "var(--p)", color: "var(--ink)", borderLeft: `2px solid var(--ink)` }}
          >
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: `2px solid var(--ink)` }}
            >
              <span
                className="mono font-semibold"
                style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}
              >
                Menu
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex items-center justify-center w-9 h-9"
                style={{ border: `2px solid var(--ink)`, background: "var(--p)" }}
              >
                <X size={16} />
              </button>
            </div>
            <nav className="flex flex-col p-2">
              {nav.map((n) => {
                const active = isActive(pathname, n.href);
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-4 text-xl font-bold"
                    style={{
                      fontFamily: "var(--font-display)",
                      letterSpacing: "-0.02em",
                      background: active ? "var(--primary)" : "transparent",
                      color: active ? "var(--primary-foreground)" : "var(--ink)",
                      borderBottom: `1px solid var(--line)`,
                    }}
                  >
                    {n.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto p-5" style={{ borderTop: `2px solid var(--ink)`, background: "var(--soft)" }}>
              <div className="mono mb-2" style={{ color: "var(--mu)" }}>Get in touch</div>
              <p className="text-sm m-0" style={{ lineHeight: 1.6 }}>
                {siteConfig.contact.phone}
                <br />
                {siteConfig.contact.hours}
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </header>
    </div>
  );
}
