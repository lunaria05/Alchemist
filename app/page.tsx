// app/page.tsx
import ParticleBackground from "@/Components/MainScreen/ParticleBackground";
import HeroContent from "@/Components/MainScreen/HeroContent";
import TechCarousel from "@/Components/MainScreen/TechCarousel";

export default function Home() {
  return (
    <div className="relative">
      <ParticleBackground />
      <TechCarousel />
      <section className="min-h-screen">
        <HeroContent />
      </section>
      
      {/* Empty sections to allow scrolling for future animations */}
      <section className="h-screen flex items-center justify-center">
        <h2 className="text-5xl opacity-20">Scroll for more magic...</h2>
      </section>
    </div>
  );
}