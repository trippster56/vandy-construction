import { Users, Target, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "@/components/ui/PageHeader";
import CTABanner from "@/components/sections/CTABanner";
import { siteConfig } from "@/lib/site-config";

const values = [
  {
    icon: Heart,
    title: "Welcoming",
    description: "We make every client feel heard from the first conversation to the final walk-through.",
  },
  {
    icon: Target,
    title: "Experienced",
    description: "Licensed, insured, and proven across residential and commercial work in the Pee Dee.",
  },
  {
    icon: Users,
    title: "Trustworthy",
    description: "Clear communication, honest estimates, and work we stand behind in writing.",
  },
];

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
            <div className="bg-muted rounded-2xl aspect-[4/3] flex items-center justify-center border border-border">
              <p className="text-muted-foreground text-sm">Project or team photo</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Story</h2>
              <div className="h-1 w-16 bg-primary mb-6 rounded-full" />
              {/* TODO: Josh to provide final copy (he's writing it himself, 4.2). */}
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Vandy Construction Company is a licensed and insured general
                  contractor serving Florence, SC and the surrounding counties.
                  We build for homeowners, property owners, businesses, and the
                  real estate professionals who refer us.
                </p>
                <p>
                  From custom homes and renovations to commercial buildouts and
                  site work, we manage every phase of a project — handling
                  permits, inspections, and the day-to-day so you don&apos;t have to.
                </p>
                <p>
                  Every project starts with listening. We walk the site, learn
                  your goals and budget, and put a clear, honest plan in writing
                  before any work begins.
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center hover-lift">
                  <CardContent>
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon size={28} className="text-primary" />
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
