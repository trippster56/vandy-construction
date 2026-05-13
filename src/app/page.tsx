import Hero from "@/components/sections/Hero";
import ServicesPreview from "@/components/sections/ServicesPreview";
import RecentWork from "@/components/sections/RecentWork";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <RecentWork />
      <Process />
      <Testimonials />
      <CTABanner />
    </>
  );
}
