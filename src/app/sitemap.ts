import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/seo";

// Submitted to Google Search Console as /sitemap.xml.
// /admin and the /subcontractors redirect are deliberately left out.
const staticRoutes = [
  "",
  "/about",
  "/projects",
  "/services",
  "/team",
  "/testimonials",
  "/contact",
  "/privacy",
  "/terms",
];

// No lastModified: there's no real per-page date, and a fake "now" teaches
// Google to ignore the field.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((path) => ({ url: `${siteConfig.url}${path}` })),
    // Project photos are listed as image-sitemap entries so the before/after
    // shots can surface in Google Images and link back to the project page.
    ...projects.map((p) => {
      const photos = [p.image, ...p.gallery.map((g) => g.src)].filter(
        (src): src is string => Boolean(src)
      );
      return {
        url: `${siteConfig.url}/projects/${p.slug}`,
        ...(photos.length ? { images: [...new Set(photos)].map((src) => absoluteUrl(src)) } : {}),
      };
    }),
  ];
}
