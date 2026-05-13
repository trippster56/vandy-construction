import { Users, Target, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "@/components/ui/PageHeader";
import CTABanner from "@/components/sections/CTABanner";
import { siteConfig } from "@/lib/site-config";

const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "We love what we do, and it shows in every project we deliver.",
  },
  {
    icon: Target,
    title: "Quality",
    description: "We hold ourselves to the highest standards in design and development.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We work closely with every client to ensure their vision becomes reality.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title={`About ${siteConfig.name}`}
        subtitle="We're a passionate team dedicated to creating exceptional digital experiences. We help businesses of all sizes establish and grow their online presence."
      />

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-muted rounded-2xl aspect-[4/3] flex items-center justify-center border border-border">
              <p className="text-muted-foreground text-sm">Team photo or brand image</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Story</h2>
              <div className="h-1 w-16 bg-primary mb-6 rounded-full" />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded with a simple mission: to make beautiful, functional
                  websites accessible to every business. We believe that great
                  design shouldn&apos;t be reserved for big budgets.
                </p>
                <p>
                  Over the years, we&apos;ve had the privilege of working with
                  clients across a wide range of industries — from local
                  businesses and nonprofits to creative studios and e-commerce
                  brands.
                </p>
                <p>
                  Every project starts with listening. We take the time to
                  understand your goals, your audience, and your brand before
                  writing a single line of code.
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
