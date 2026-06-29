import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "@/components/ui/PageHeader";
import CTABanner from "@/components/sections/CTABanner";
import { services } from "@/data/services";

const process = [
  { n: "01", title: "Consultation", body: "We walk the site, listen to your plans, and put together a written estimate." },
  { n: "02", title: "Design & permit", body: "We work with your architect or ours, and handle permits, inspections, and paperwork." },
  { n: "03", title: "Build", body: "Licensed, insured crews. Daily progress and a single point of contact." },
  { n: "04", title: "Handoff", body: "Final walk-through, punch list closed, warranty in writing." },
];

export const metadata = {
  title: "Services | Vandy Construction Company",
  description:
    "Residential and commercial construction services in Florence, SC — custom homes, renovations, commercial buildouts, site work, and design–build.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What we do"
        title="Services"
        subtitle="From custom homes to commercial buildouts, we manage every phase of your project — licensed, insured, and built to last."
      />

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="hover-lift">
                  <CardContent>
                    <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-4">
                      <Icon size={28} className="text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">How we work</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            A clear, predictable process from first call to final walk-through.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step) => (
              <div key={step.n}>
                <span className="text-4xl font-bold text-primary/20">{step.n}</span>
                <h3 className="text-lg font-bold text-foreground mt-2 mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
