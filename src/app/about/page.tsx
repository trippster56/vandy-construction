import { Users, Award, ShieldCheck, HandHeart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "@/components/ui/PageHeader";
import Photo from "@/components/ui/Photo";
import CTABanner from "@/components/sections/CTABanner";
import { siteConfig } from "@/lib/site-config";

const values = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    description: "Built on honesty and trust.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Quality without compromise.",
  },
  {
    icon: Users,
    title: "Service",
    description: "People first. Always.",
  },
  {
    icon: HandHeart,
    title: "Stewardship",
    description: "Honoring God through faithful work.",
  },
];

export const metadata = {
  title: "About Us | Vandy Construction Company",
  description:
    "Founded in 2024 by Josh and Madison VanderLugt, Vandy Construction Company is a licensed and insured general contractor serving Florence, SC and the Pee Dee.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title={`About ${siteConfig.short}`}
        subtitle="A licensed and insured general contractor serving Florence, SC and the surrounding counties — building homes and commercial spaces our neighbors trust."
      />

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <Photo
              src="/images/vandy-family.jpg"
              alt="Josh VanderLugt with his family"
              className="rounded-2xl border border-border aspect-[3/2]"
              sizes="(max-width: 768px) 100vw, 45vw"
              priority
            />

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Story</h2>
              <div className="h-1 w-16 bg-primary mb-6 rounded-full" />
              {/* Josh's own copy (sent via Madison, Oct 2026), trimmed for length. */}
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="text-lg font-medium text-foreground">
                  Vandy Construction Company was founded on a simple belief:
                  quality craftsmanship and integrity should never be compromised.
                </p>
                <p>
                  Josh and Madison met at Liberty University in Lynchburg,
                  Virginia, during the COVID-19 pandemic. Six months later they
                  were engaged, and six months after that, married. While Madison
                  earned her Master&apos;s in Clinical Mental Health Counseling,
                  Josh served as a Project Manager in Liberty&apos;s construction
                  department, overseeing large-scale campus projects. Through
                  their local church, they found a shared passion for serving
                  others.
                </p>
                <p>
                  After two years in Virginia, they felt called home to South
                  Carolina, where Madison grew up in Turbeville. In 2024, that
                  calling became Vandy Construction Company.
                </p>
                <p>
                  Whether we&apos;re remodeling a home, building a commercial
                  space, or tackling a custom project, every client deserves clear
                  communication, exceptional workmanship, and a contractor they
                  can trust. How we treat people matters just as much as the
                  finished product.
                </p>
                <p>
                  Our prayer is that we&apos;ll be known not just for the
                  buildings we create, but for the relationships we build and the
                  lasting impact we leave on every family, business, and community
                  we serve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Our Values</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            The principles that guide everything we do.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center hover-lift">
                  <CardContent>
                    <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon size={28} className="text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
