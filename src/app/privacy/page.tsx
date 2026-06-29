import PageHeader from "@/components/ui/PageHeader";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Privacy Policy | Vandy Construction Company",
  description: "How Vandy Construction Company collects, uses, and protects your information.",
};

// NOTE: Placeholder draft per questionnaire 10.3 ("Need both drafted").
// Have legal counsel review before launch.
export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" subtitle="Last updated: [DATE — to be finalized at launch]" />

      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-muted-foreground leading-relaxed">
          <p>
            {siteConfig.name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy.
            This policy explains what information we collect through our website and how we use it.
          </p>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">Information we collect</h2>
            <p>
              When you submit our contact form, we collect your name, email address, phone number,
              your preferred method of contact, and the details of your inquiry. We use this
              information solely to respond to you and discuss your project.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">How we use your information</h2>
            <p>
              We use the information you provide to respond to inquiries, prepare estimates, and
              manage projects. We do not sell your personal information. We may use third-party
              services (such as email delivery and analytics) that process limited data on our behalf.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">Analytics</h2>
            <p>
              We may use analytics tools to understand site traffic. These tools may set cookies
              or collect aggregated usage data.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">Contact</h2>
            <p>
              Questions about this policy? Email us at{" "}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-primary hover:underline">
                {siteConfig.contact.email}
              </a>.
            </p>
          </div>

          <p className="text-sm italic">
            This is a draft for review. Final language should be confirmed with legal counsel
            before launch.
          </p>
        </div>
      </section>
    </>
  );
}
