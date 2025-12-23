"use client";
import { motion, useScroll, useTransform } from "framer-motion";

export default function GlobeVideo() {
  const { scrollYProgress } = useScroll();
  
  // Reveal between 25% and 50% scroll (matching the morph)
  const opacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.25, 0.45], [0.8, 1]);

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[5]">
      <motion.div 
        style={{ opacity, scale }}
        className="w-[200px] h-[140px] md:w-[230px] md:h-[140px] relative"
      >
        {/* Futuristic HUD Rectangle Border */}
        <div className="absolute -inset-2 border border-[#ee502c]/30 rounded-lg">
             {/* Corner Accents */}
             <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#ee502c]" />
             <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#ee502c]" />
        </div>
        
        <div className="w-full h-full overflow-hidden bg-black/40 backdrop-blur-sm rounded-md border border-white/10">
          <video 
            autoPlay muted loop playsInline
            className="w-full h-full object-cover brightness-90 grayscale contrast-125"
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Technical readout text below video */}
        <div className="absolute -bottom-8 left-0 w-full flex justify-between px-1 font-azeretmono text-[8px] text-[#ee502c] uppercase tracking-widest">
            <span>Core_Feed.exe</span>
            <span>Alpha_71%</span>
        </div>
      </motion.div>
    </div>
  );
}