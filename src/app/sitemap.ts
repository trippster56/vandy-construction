import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { projects } from "@/data/projects";

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

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((path) => ({ url: `${siteConfig.url}${path}` })),
    ...projects.map((p) => ({ url: `${siteConfig.url}/projects/${p.slug}` })),
  ];
}
