"use client";

import { useEffect, useState } from "react";
import { siteConfig, type PageGround } from "@/lib/site-config";

const STORAGE_KEY = "vandy-ground";
const OPTIONS: PageGround[] = ["white", "gray"];

/**
 * Floating preview toggle to compare the white vs. gray (#9A9CA1) page ground.
 * Flips the `ground-*` class on <body> at runtime and remembers the choice.
 * This is a review aid — remove it (and the import in layout.tsx) before launch
 * once Josh picks a version, or just set siteConfig.pageGround to the winner.
 */
export default function GroundToggle() {
  const [ground, setGround] = useState<PageGround>(siteConfig.pageGround);

  // Sync with any saved preference on mount.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as PageGround | null;
    if (saved === "white" || saved === "gray") setGround(saved);
  }, []);

  // Apply to <body> and persist whenever it changes.
  useEffect(() => {
    document.body.classList.remove("ground-white", "ground-gray");
    document.body.classList.add(`ground-${ground}`);
    localStorage.setItem(STORAGE_KEY, ground);
  }, [ground]);

  return (
    <div
      role="group"
      aria-label="Preview page background"
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: 6,
        borderRadius: 999,
        background: "#181F58",
        boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
        fontFamily: "var(--font-body, sans-serif)",
      }}
    >
      <span style={{ color: "#fff", fontSize: 11, opacity: 0.7, padding: "0 6px", letterSpacing: "0.04em" }}>
        BG
      </span>
      {OPTIONS.map((opt) => {
        const active = ground === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => setGround(opt)}
            aria-pressed={active}
            style={{
              border: "none",
              cursor: "pointer",
              textTransform: "capitalize",
              fontSize: 12,
              fontWeight: 600,
              padding: "6px 14px",
              borderRadius: 999,
              transition: "all 0.2s ease",
              background: active ? "#fff" : "transparent",
              color: active ? "#181F58" : "rgba(255,255,255,0.8)",
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
