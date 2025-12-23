import ParticleBackground from "@/Components/MainScreen/ParticleBackground";
import HeroContent from "@/Components/MainScreen/HeroContent";
import TechCarousel from "@/Components/MainScreen/TechCarousel";
import GlobeVideo from "@/Components/MainScreen/GlobeVideo";

export default function Home() {
  return (
    // Parent container is 250vh to give 200vh of "stickiness" + 50vh spacer
    <div id="sticky-wrapper" className="relative h-[250vh] bg-transparent">
      
      {/* 3D Particles & Video - Always Fixed in Background */}
      <ParticleBackground />
      <GlobeVideo />

      {/* 
         STICKY UI LAYER: 
         Everything inside here stays on screen while scrolling 
         for the duration of the parent's height.
      */}
      <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none">
        
        {/* Left Side: Hero Text (Fades out via Framer Motion) */}
        <HeroContent />

        {/* Right Side: Tech Carousel (Stays visible & functional) */}
        <div className="pointer-events-auto">
           <TechCarousel />
        </div>

        {/* Center Hint (Optional) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 hidden md:block">
            <div className="w-px h-12 bg-gradient-to-b from-[#ee502c] to-transparent animate-bounce" />
        </div>
      </div>

      {/* This spacer creates the scroll distance of 150vh */}
      <div className="h-[150vh] pointer-events-none" />
    </div>
  );
}