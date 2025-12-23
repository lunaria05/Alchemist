"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const RevealWord = ({ word, progress, range }: { word: string, progress: any, range: [number, number] }) => {
  // Brand words to highlight in Alchemist Orange
  const isPowerWord = ["Gold", "Magic", "Digital", "Creativity", "Transmute"].includes(word.replace(/[^a-zA-Z]/g, ""));
  
  const opacity = useTransform(progress, range, [0.1, 1]);
  const color = useTransform(
    progress, 
    range, 
    ["#27272a", isPowerWord ? "#ee502c" : "#ffffff"]
  );
  const scale = useTransform(progress, range, [0.95, 1]);

  return (
    <motion.span 
      style={{ opacity, color, scale }} 
      className="inline-block mx-[0.15em] transition-all duration-300"
    >
      {word}
    </motion.span>
  );
};

export default function TextRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const text1 = "Transmute Your Ideas Into Digital Gold".split(" ");
  const text2 = "Where Code Meets Creativity, Magic Happens".split(" ");

  // Crossfade logic to ensure no vertical overflow/clashing
  const text1Opacity = useTransform(scrollYProgress, [0, 0.4, 0.48], [1, 1, 0]);
  const text1Scale = useTransform(scrollYProgress, [0, 0.45], [1, 0.9]);
  
  const text2Opacity = useTransform(scrollYProgress, [0.52, 0.6, 1], [0, 1, 1]);
  const text2Scale = useTransform(scrollYProgress, [0.5, 0.6], [1.1, 1]);

  return (
    <section 
      ref={containerRef} 
      className="relative z-[150] bg-[#050505] min-h-[400vh] shadow-[0_-100px_100px_rgba(0,0,0,1)]"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-6 md:px-12">
        
        {/* --- FUTURISTIC HUD DECORATION --- */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <div className="absolute inset-0" 
               style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '60px 60px' }} />
        </div>

        {/* HUD Brackets (Responsive sizing) */}
        <div className="absolute top-6 left-6 md:top-12 md:left-12 w-12 h-12 md:w-20 md:h-20 border-t border-l border-white/10" />
        <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 w-12 h-12 md:w-20 md:h-20 border-b border-r border-white/10" />

        {/* --- CONTENT ENGINE --- */}
        <div className="relative w-full max-w-7xl flex items-center justify-center">
          
          {/* TEXT 1: DETERMINISTIC CLAMPED FONT SIZE */}
          <motion.h2 
            style={{ opacity: text1Opacity, scale: text1Scale }}
            className="absolute inset-0 flex flex-wrap justify-center items-center text-center font-unbounded font-black uppercase tracking-tighter leading-[1]
                       text-[clamp(1.75rem,8vw,6.5rem)]" 
          >
            {text1.map((w, i) => (
              <RevealWord 
                key={i} 
                word={w} 
                progress={scrollYProgress} 
                range={[(i/text1.length)*0.35, ((i+1)/text1.length)*0.35]} 
              />
            ))}
          </motion.h2>

          {/* TEXT 2: DETERMINISTIC CLAMPED FONT SIZE */}
          <motion.h2 
            style={{ opacity: text2Opacity, scale: text2Scale }}
            className="flex flex-wrap justify-center items-center text-center font-neuton font-light italic uppercase tracking-tight leading-[1]
                       text-[clamp(1.5rem,7.5vw,6rem)]"
          >
            {text2.map((w, i) => (
              <RevealWord 
                key={i} 
                word={w} 
                progress={scrollYProgress} 
                range={[0.6 + (i/text2.length)*0.35, 0.6 + ((i+1)/text2.length)*0.35]} 
              />
            ))}
          </motion.h2>

        </div>

        {/* --- BOTTOM HUD BAR --- */}
        <div className="absolute bottom-8 left-0 w-full px-8 md:px-12 flex justify-between items-end pointer-events-none">
            <div className="flex flex-col gap-1 font-azeretmono text-[7px] md:text-[8px] text-white/20 tracking-widest uppercase">
                <span className="hidden sm:block">Process: Reveal_Engine</span>
                <span>Node: Active_ALC</span>
            </div>
            
            {/* Scroll Progress Line */}
            <div className="h-px bg-white/5 flex-1 mx-6 md:mx-20 mb-1 relative overflow-hidden">
                <motion.div 
                    style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                    className="absolute top-0 left-0 h-full bg-[#ee502c]/50 shadow-[0_0_10px_#ee502c]"
                />
            </div>

            <div className="flex gap-4 font-azeretmono text-[7px] md:text-[8px] text-[#ee502c]/40 uppercase tracking-[0.4em]">
                <span className="animate-pulse">Streaming</span>
                <span>v.03</span>
            </div>
        </div>
      </div>
    </section>
  );
}