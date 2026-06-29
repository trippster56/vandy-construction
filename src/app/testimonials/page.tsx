import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "@/components/ui/PageHeader";
import CTABanner from "@/components/sections/CTABanner";
import { HOME_TESTIMONIALS } from "@/data/home";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Testimonials | Vandy Construction Company",
  description: "What clients say about working with Vandy Construction Company in Florence, SC.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reviews"
        title="What our clients say"
        subtitle="We're proud of the relationships we build alongside the homes and spaces we deliver."
      />

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {HOME_TESTIMONIALS.map((t, index) => (
              <Card key={index} className="hover-lift">
                <CardContent>
                  <div className="flex gap-1 mb-4 text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                  <p className="text-sm font-bold text-foreground">{t.who}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* "Leave a review" (questionnaire 5.1) — links to Google Business Profile */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">Worked with us? We&apos;d love your feedback.</h2>
            {siteConfig.google.reviewUrl ? (
              <a
                href={siteConfig.google.reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
              >
                Leave a review on Google
              </a>
            ) : (
              <p className="text-xs text-muted-foreground mt-2">
                (Add the Google review link in site-config to enable the &ldquo;Leave a review&rdquo; button.)
              </p>
            )}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
