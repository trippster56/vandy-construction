import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display-bold" });
const plexSans = IBM_Plex_Sans({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-body-bold" });
const plexMono = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-mono-bold" });

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const fontVars = [bricolage.variable, plexSans.variable, plexMono.variable].join(" ");

  return (
    <html lang="en" className={`${fontVars} h-full`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased variant-bold">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
