import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "@/components/ui/PageHeader";
import CTABanner from "@/components/sections/CTABanner";
import { services } from "@/data/services";

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What we do"
        title="Our Services"
        subtitle="Everything you need to build, launch, and grow your online presence."
      />

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="hover-lift">
                  <CardContent>
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <Icon size={28} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Our Process</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            Simple, transparent, and built around your needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "We learn about your business, goals, and audience." },
              { step: "02", title: "Design", desc: "We create mockups and prototypes for your approval." },
              { step: "03", title: "Build", desc: "We develop your site with clean, modern code." },
              { step: "04", title: "Launch", desc: "We deploy, test, and hand over the keys." },
            ].map((item, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-primary/40 mb-2">{item.step}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
