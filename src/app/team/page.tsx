import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "@/components/ui/PageHeader";
import Photo from "@/components/ui/Photo";
import CTABanner from "@/components/sections/CTABanner";

// Names, titles, and bios from Taylor's "Website Wording" doc.
const team: { name: string; role: string; bio: string; photo?: string }[] = [
  {
    name: "Josh VanderLugt",
    photo: "/images/team/josh.jpg",
    role: "Owner / General Contractor",
    bio: "Josh founded Vandy Construction after years of experience in residential and commercial construction. He attended Liberty University and leads every project with integrity, clear communication, and a commitment to quality.",
  },
  {
    name: "Taylor Causey",
    photo: "/images/team/taylor.jpg",
    role: "Operations Coordinator",
    bio: "Taylor oversees the day-to-day operations of Vandy Construction, helping manage project coordination, client communication, estimating, and business operations. She holds bachelor's degrees in Finance and Supply Chain Management, bringing strong organizational and financial expertise to every project.",
  },
  {
    name: "Hayden Craft",
    photo: "/images/team/hayden.jpg",
    role: "Project Coordinator",
    bio: "Hayden works closely with our crews to keep projects moving forward with quality workmanship, attention to detail, and a strong commitment to getting the job done right.",
  },
  {
    name: "Bernaldo Reyes",
    role: "Field Crew",
    bio: "Bernaldo is a valued member of our field team, bringing reliability, attention to detail, and a strong work ethic to every project.",
  },
  {
    name: "Ramon Jordan",
    photo: "/images/team/ramon.jpg",
    role: "Field Crew",
    bio: "Ramon plays an important role on our construction team, helping complete residential and commercial projects with care and attention to detail.",
  },
  {
    name: "Mitchell Barrineau",
    photo: "/images/team/mitchell.jpg",
    role: "Field Crew",
    bio: "A retired veteran, Mitchell brings dedication, reliability, and years of experience to every job site.",
  },
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
        title="The People Behind the Projects"
        subtitle="The people committed to guiding your project from the first conversation to the final walkthrough."
      />

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <Card key={member.name} className="hover-lift">
                <CardContent>
                  {member.photo ? (
                    <Photo
                      src={member.photo}
                      alt={member.name}
                      className="rounded-xl aspect-[4/5] mb-5 border border-border"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="bg-muted rounded-xl aspect-[4/5] mb-5 flex items-center justify-center border border-border">
                      <p className="text-muted-foreground text-xs">Headshot</p>
                    </div>
                  )}
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
