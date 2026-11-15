import { siteConfig } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/seo";

/**
 * schema.org JSON-LD builders. Only describe what is actually on the page;
 * Google penalizes markup that claims content the visitor can't see.
 * Validate live pages at https://search.google.com/test/rich-results
 */

const orgId = absoluteUrl("/#organization");

/** "(843) 939-9393" -> "+1-843-939-9393" (schema.org prefers international format). */
function intlPhone(phone: string) {
  const d = phone.replace(/\D/g, "");
  return d.length === 10 ? `+1-${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}` : phone;
}

export function organizationJsonLd() {
  const { address, openingHours } = siteConfig.seo;
  const sameAs = Object.values(siteConfig.socials).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": siteConfig.seo.schemaType,
    "@id": orgId,
    name: siteConfig.name,
    alternateName: siteConfig.short,
    description: siteConfig.seo.description,
    slogan: siteConfig.tagline,
    url: absoluteUrl("/"),
    logo: absoluteUrl(siteConfig.logo),
    image: absoluteUrl("/opengraph-image"),
    email: siteConfig.contact.email,
    telephone: intlPhone(siteConfig.contact.phone),
    address: { "@type": "PostalAddress", ...address },
    areaServed: { "@type": "City", name: siteConfig.city },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: openingHours.days,
      opens: openingHours.opens,
      closes: openingHours.closes,
    },
    foundingDate: siteConfig.established,
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.seo.brand,
    url: absoluteUrl("/"),
    publisher: { "@id": orgId },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
