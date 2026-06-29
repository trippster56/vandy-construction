import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Contact | Vandy Construction Company",
  description:
    "Get in touch with Vandy Construction Company in Florence, SC — request an estimate or ask a question.",
};

export default function ContactPage() {
  const { formEmbedUrl, formLinkUrl } = siteConfig.jobtread;

  const contactInfo = [
    { icon: Mail, label: "Email", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
    { icon: Phone, label: "Phone", value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone}` },
    { icon: MapPin, label: "Address", value: siteConfig.contact.address },
    { icon: Clock, label: "Hours", value: siteConfig.contact.hours },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contact us"
        title="Get in Touch"
        subtitle="Request an estimate or send us a question — we'd love to hear about your project."
      />

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Lead capture — JobTread (submissions create a lead in JobTread) */}
            <div className="lg:col-span-3">
              {formEmbedUrl ? (
                <iframe
                  src={formEmbedUrl}
                  title="Request an estimate"
                  className="w-full rounded-2xl border border-border bg-card"
                  style={{ minHeight: 760 }}
                  loading="lazy"
                />
              ) : formLinkUrl ? (
                <div className="bg-card rounded-2xl border border-border p-8">
                  <h3 className="text-xl font-bold text-foreground mb-2">Request an estimate</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Tell us about your project and we&apos;ll get right back to you.
                  </p>
                  <a
                    href={formLinkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
                  >
                    Request an Estimate
                    <ArrowRight size={18} />
                  </a>
                </div>
              ) : (
                <div className="bg-card rounded-2xl border border-dashed border-border p-8 text-center">
                  <p className="text-muted-foreground text-sm">
                    Estimate request form (JobTread) will appear here once connected.
                  </p>
                </div>
              )}
            </div>

            <div className="lg:col-span-2">
              <div className="bg-muted rounded-2xl p-8 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-6">Contact Info</h3>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shrink-0">
                          <Icon size={20} className="text-primary-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.label}</p>
                          {item.href ? (
                            <a href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-sm text-muted-foreground">{item.value}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Location map (questionnaire 5.1: view location / map / hours) */}
          <div className="mt-12 rounded-2xl overflow-hidden border border-border">
            <iframe
              title={`Map to ${siteConfig.name}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.google.mapsEmbedQuery)}&output=embed`}
              className="w-full"
              style={{ height: 360, border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
