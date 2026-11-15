import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

/**
 * Default link-preview image (Facebook, iMessage, Slack, LinkedIn, X) for every
 * page without its own; project pages use their hero photo instead. Built from
 * siteConfig at build time. Drop a real opengraph-image.png here to override.
 */
export const alt = `${siteConfig.seo.brand}: ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const { colors } = siteConfig;
  const host = new URL(siteConfig.url).host;
  const logo = await fs.readFile(path.join(process.cwd(), "public", siteConfig.logo));
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: colors.primary,
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <img src={logoSrc} alt="" width={99} height={80} />
          <div style={{ fontSize: 30, letterSpacing: 5, textTransform: "uppercase" }}>
            {siteConfig.seo.brand}
          </div>
        </div>
        <div style={{ fontSize: 76, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 1000 }}>
          {siteConfig.tagline}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 32,
            fontSize: 26,
            color: "rgba(255,255,255,0.78)",
            borderTop: "2px solid rgba(255,255,255,0.18)",
            paddingTop: 28,
          }}
        >
          <div>{`Licensed & insured general contractor · ${siteConfig.city}`}</div>
          <div>{host}</div>
        </div>
      </div>
    ),
    size
  );
}
