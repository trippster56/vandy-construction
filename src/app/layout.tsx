import type { Metadata } from "next";
import Script from "next/script";
import { Raleway, Geist_Mono } from "next/font/google";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import FooterGate from "@/components/layout/FooterGate";
import { siteConfig } from "@/lib/site-config";
import JsonLd from "@/components/seo/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// Raleway drives both headings (Bold) and body (SemiBold) per questionnaire 3.3.
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-safe",
});
const ralewayBody = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body-safe",
});
// Mono kept for the small editorial eyebrow labels in the safe variant.
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono-safe" });

export const metadata: Metadata = {
  // Resolves relative canonical / Open Graph URLs against the real domain.
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.title,
    template: `%s | ${siteConfig.seo.brand}`,
  },
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  applicationName: siteConfig.seo.brand,
  // Defaults for any route that doesn't call pageMetadata(). No canonical here
  // on purpose: it would be inherited by every page and point them all at "/".
  openGraph: {
    siteName: siteConfig.seo.brand,
    locale: siteConfig.seo.locale,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const fontVars = [raleway.variable, ralewayBody.variable, geistMono.variable].join(" ");

  return (
    <html lang="en" className={`${fontVars} h-full`}>
      <body
        className={`min-h-screen flex flex-col bg-background text-foreground antialiased variant-${siteConfig.variant} ground-${siteConfig.pageGround}`}
      >
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Navigation />
        <main className="flex-1">{children}</main>
        <FooterGate>
          <Footer />
        </FooterGate>
      </body>

      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}
    </html>
  );
}
