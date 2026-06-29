import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "@/components/ui/PageHeader";
import CTABanner from "@/components/sections/CTABanner";

// TODO: Josh — replace with real team members (name, role, headshot, short bio).
const team = [
  { name: "Team member", role: "Owner / General Contractor", bio: "Short bio goes here — years of experience, specialty, what they bring to every project." },
  { name: "Team member", role: "Project Manager", bio: "Short bio goes here — how they keep builds on time and on budget." },
  { name: "Team member", role: "Site Superintendent", bio: "Short bio goes here — the person making sure the work is done right on site." },
];

export const metadata = {
  title: "Our Team | Vandy Construction Company",
  description: "Meet the experienced, trustworthy team behind Vandy Construction Company in Florence, SC.",
};

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Who we are"
        title="Our Team"
        subtitle="The experienced people you'll work with from first call to final walk-through."
      />

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="hover-lift">
                <CardContent>
                  <div className="bg-muted rounded-xl aspect-[4/5] mb-5 flex items-center justify-center border border-border">
                    <p className="text-muted-foreground text-xs">Headshot</p>
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
