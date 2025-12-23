// app/page.tsx
import ParticleBackground from "@/Components/MainScreen/ParticleBackground";
import HeroContent from "@/Components/MainScreen/HeroContent";
import TechCarousel from "@/Components/MainScreen/TechCarousel";
import GlobeVideo from "@/Components/MainScreen/GlobeVideo";
import TextRevealSection from "@/Components/MainScreen/TextRevealSection";

export default function Home() {
  return (
    <div className="relative bg-black">
      {/* 
          1. STICKY AREA (400vh total scroll)
          0-250vh: Particles Morph + Hero Fades
          250-300vh: Static Globe & Video Playing
          300-400vh: Shutter (TextRevealSection) slides up
      */}
      <div id="sticky-wrapper" className="relative h-[400vh] bg-transparent">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <ParticleBackground />
          <GlobeVideo />

          <div className="relative z-10 w-full h-full pointer-events-none">
            <HeroContent />
            <div className="pointer-events-auto">
              <TechCarousel />
            </div>
            
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 hidden md:block">
              <div className="w-px h-12 bg-gradient-to-b from-[#ee502c] to-transparent animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* 
          2. THE SHUTTER (TextRevealSection)
          Because it follows a 400vh div, it won't appear 
          until the user has scrolled significantly.
      */}
      <TextRevealSection />

      {/* Footer Spacer */}
      <div className="h-[20vh] bg-[#050505]" />
    </div>
  );
}