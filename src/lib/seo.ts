import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

/** Absolute URL on the production domain (siteConfig.url). */
export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

/** Site-wide generated link-preview image (src/app/opengraph-image.tsx). */
const defaultImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.seo.brand}: ${siteConfig.tagline}`,
};

interface PageSeo {
  /** Short page title, e.g. "About". Rendered as "About | Vandy Construction Company". Omit on the home page. */
  title?: string;
  description?: string;
  /** Route path, e.g. "/about". Becomes the canonical URL. */
  path: string;
  /** Page-specific preview image (a /public path or absolute URL). */
  image?: { url: string; alt: string };
  type?: "website" | "article";
}

/**
 * Per-page metadata with canonical, Open Graph and Twitter tags.
 *
 * Next merges metadata shallowly: a page that sets `openGraph` replaces the
 * layout's `openGraph` entirely. So every page builds the full object here
 * instead of relying on inheritance.
 */
export function pageMetadata({
  title,
  description = siteConfig.seo.description,
  path,
  image,
  type = "website",
}: PageSeo): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.seo.brand}` : siteConfig.seo.title;
  // Setting openGraph on a nested route drops the root opengraph-image file,
  // so point at the generated one explicitly when there's no page image.
  const images = [image ?? defaultImage];
  return {
    title: title ? title : { absolute: siteConfig.seo.title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: siteConfig.seo.brand,
      locale: siteConfig.seo.locale,
      type,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images.map((i) => i.url),
    },
  };
}

/** Metadata for routes that must never appear in search results. */
export const noIndex: Metadata = {
  robots: { index: false, follow: false },
};
