import { Header } from "@/components/layout/Header";
import ContactSection from "@/features/contact/ContactSection";
import { AboutSection } from "@/features/portfolio/sections/AboutSection";
import { HeroSection } from "@/features/portfolio/sections/HeroSection";
import { JourneySection } from "@/features/portfolio/sections/JourneySection";
import { ProjectsSection } from "@/features/portfolio/sections/ProjectsSection";
import { SkillsSection } from "@/features/portfolio/sections/SkillsSection";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[var(--background)] text-[var(--text)]">
      <Header />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <JourneySection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}
