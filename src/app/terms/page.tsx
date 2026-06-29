import PageHeader from "@/components/ui/PageHeader";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Terms of Service | Vandy Construction Company",
  description: "The terms governing use of the Vandy Construction Company website.",
};

// NOTE: Placeholder draft per questionnaire 10.3 ("Need both drafted").
// Have legal counsel review before launch.
export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Service" subtitle="Last updated: [DATE — to be finalized at launch]" />

      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-muted-foreground leading-relaxed">
          <p>
            These terms govern your use of the {siteConfig.name} website. By using this site, you
            agree to these terms.
          </p>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">Use of this website</h2>
            <p>
              The content on this site is provided for general information about our services.
              It does not constitute a binding offer, estimate, or contract. Project scope,
              pricing, and timelines are confirmed in a separate written agreement.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">No warranty</h2>
            <p>
              This website is provided &ldquo;as is.&rdquo; While we work to keep information
              accurate and current, we make no warranties about its completeness or accuracy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">Intellectual property</h2>
            <p>
              All content, logos, and images on this site are the property of {siteConfig.name}
              unless otherwise noted, and may not be reused without permission.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">Contact</h2>
            <p>
              Questions about these terms? Email us at{" "}
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
