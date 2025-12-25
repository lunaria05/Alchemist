"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiStar } from "react-icons/fi";

const testimonials = [
  {
    id: "01",
    name: "ALEXANDER R.",
    role: "CEO, KANSO LABS",
    content: "Transmuting our legacy systems into a modern AI-driven architecture was seamless. The Alchemist team doesn't just code; they engineer digital magic.",
    image: "https://i.pravatar.cc/300?img=11",
    rating: 5,
  },
  {
    id: "02",
    name: "SOPHIA CHEN",
    role: "PRODUCT DESIGNER",
    content: "The attention to detail in the UI/UX phase was extraordinary. They eliminated the clutter and left only the pure essence of our brand.",
    image: "https://i.pravatar.cc/300?img=32",
    rating: 5,
  },
  {
    id: "03",
    name: "MARCUS V.",
    role: "CTO, NEURAL FLOW",
    content: "Technical precision meets creative brilliance. Our blockchain throughput increased by 40% after the protocol optimization.",
    image: "https://i.pravatar.cc/300?img=12",
    rating: 4,
  },
  {
    id: "04",
    name: "ELARA VANCE",
    role: "FOUNDER, AETHER",
    content: "Working with Alchemist was the best decision for our startup. They truly understand the alchemy of digital transformation.",
    image: "https://i.pravatar.cc/300?img=44",
    rating: 5,
  },
];

export default function TestimonialAccordion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="relative bg-black min-h-[400vh]">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center px-6 md:px-20 overflow-hidden">
        
        {/* --- SECTION HEADER --- */}
        <div className="mb-12 flex items-end justify-between ">
           <div className="flex flex-col">
              <span className="font-azeretmono text-[10px] tracking-[0.5em] text-[#ee502c] uppercase mb-3 text-shadow-glow">Verification</span>
              <h2 className="font-neuton text-5xl md:text-7xl text-white tracking-tighter uppercase italic">Client logs</h2>
           </div>
           {/* Scroll Hint */}
           <div className="flex items-center gap-3">
                <span className="font-azeretmono text-[10px] text-white/30 uppercase tracking-[0.4em] group-hover:text-white/30 transition-colors">
                    Scroll_to_Sync
                </span>
                <div className="w-1.5 h-1.5 rounded-full border border-white/30 flex items-center justify-center">
                    <div className="w-0.5 h-0.5 rounded-full bg-white/40" />
                </div>
             </div>
        </div>

        {/* --- ACCORDION LIST --- */}
        <div className="flex flex-col w-full border-t border-white/10">
          {testimonials.map((item, index) => (
            <TestimonialItem 
              key={item.id} 
              data={item} 
              index={index} 
              total={testimonials.length}
              progress={scrollYProgress} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialItem({ data, index, total, progress }: any) {
  const start = index / total;
  const end = (index + 1) / total;
  
  // Scoped progress: 0 is closed, 1 is fully open
  const isActive = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
  
  // Linear progress for the "Scroll to View" indicator (0 to 1 as we move through the sector)
  const sectorProgress = useTransform(progress, [start, start + 0.1], [0, 1]);

  // Style Transitions
  const height = useTransform(isActive, [0, 1], ["80px", "500px"]); 
  const opacityDetails = useTransform(isActive, [0.4, 0.7], [0, 1]); 
  const closedInfoOpacity = useTransform(isActive, [0, 0.3], [1, 0]);
  const borderColor = useTransform(isActive, [0, 1], ["rgba(255,255,255,0.05)", "#ee502c"]);
  const portalScale = useTransform(isActive, [0, 1], [0.5, 1]);

  return (
    <motion.div 
      style={{ height, borderColor }}
      className="relative w-full border-b overflow-hidden group transition-colors duration-500 hover:bg-white/[0.01]"
    >
      <div className="h-full w-full flex items-center relative">
        
        {/* --- 1. UNIQUE SECTOR INDICATOR (Far Left) --- */}
        <div className="absolute left-0 top-0 h-full w-1 flex flex-col justify-center pointer-events-none">
            <motion.div 
                style={{ scaleY: sectorProgress, originY: 0 }}
                className="w-full h-1/2 bg-[#ee502c] shadow-[0_0_10px_#ee502c]"
            />
        </div>

        {/* --- 2. CLOSED STATE UI --- */}
        <motion.div 
          style={{ opacity: closedInfoOpacity }}
          className="absolute inset-0 flex items-center justify-between px-6 md:px-12 pointer-events-none"
        >
          <div className="flex items-center gap-8">
            <span className="font-azeretmono text-xs text-[#ee502c] opacity-50">{data.id}</span>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700">
              <img src={data.image} alt="" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-unbounded text-sm md:text-base text-white/40 group-hover:text-white transition-colors tracking-widest uppercase">
              {data.name}
            </h3>
          </div>

          <div className="flex items-center gap-10">
             {/* Gray Stars in Closed State */}
             <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <FiStar key={i} fill={i < data.rating ? "rgba(113, 113, 122, 0.3)" : "none"} color="rgba(113, 113, 122, 0.5)" size={12} />
                ))}
             </div>
             
          </div>
        </motion.div>

        {/* --- 3. OPEN STATE UI --- */}
        <div className="w-full flex items-center py-10">
            
            {/* LARGE BIO PORTAL */}
            <motion.div 
              style={{ opacity: opacityDetails, scale: portalScale }}
              className="hidden md:flex w-1/3 justify-center items-center pl-10"
            >
              <div className="relative w-56 h-56">
                 <motion.div 
                   animate={{ rotate: -360 }}
                   transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                   className="absolute -inset-6 border border-dashed border-[#ee502c]/20 rounded-full" 
                 />
                 <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#ee502c] shadow-[0_0_50px_rgba(238,80,44,0.15)]">
                    <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
                 </div>
              </div>
            </motion.div>

            {/* EXPANDED CONTENT */}
            <div className="flex-1 flex flex-col items-center md:items-start justify-center px-8 md:px-16">
              <motion.div style={{ opacity: opacityDetails }} className="relative mb-8 text-center md:text-left">
                 <h3 className="text-4xl md:text-6xl font-unbounded font-black text-white uppercase tracking-tighter">
                   {data.name}
                 </h3>
                 <div className="flex items-center gap-4 mt-2">
                    <div className="h-px w-8 bg-[#ee502c]" />
                    <span className="font-azeretmono text-[10px] text-[#ee502c] uppercase tracking-[0.4em]">
                        {data.role}
                    </span>
                 </div>
              </motion.div>
              
              <motion.div 
                style={{ opacity: opacityDetails }}
                className="flex flex-col items-center md:items-start max-w-2xl"
              >
                {/* Orange Stars in Open State */}
                <div className="flex gap-2 mb-8 items-center">
                   <span className="font-azeretmono text-[8px] text-white/30 mr-2 uppercase tracking-widest">Integrity_Score:</span>
                   {[...Array(5)].map((_, i) => (
                    <FiStar key={i} fill={i < data.rating ? "#ee502c" : "none"} color={i < data.rating ? "#ee502c" : "rgba(255,255,255,0.1)"} size={14} />
                   ))}
                </div>

                <p className="text-zinc-400 font-neuton text-xl md:text-2xl leading-relaxed italic border-l-2 border-[#ee502c]/30 pl-6">
                  "{data.content}"
                </p>
              </motion.div>
            </div>

            {/* ID INDICATOR */}
            <motion.div 
              style={{ opacity: opacityDetails }}
              className="w-32 hidden lg:flex flex-col items-center justify-center opacity-20"
            >
               <span className="font-azeretmono text-5xl font-black text-white/10">{data.id}</span>
               <div className="w-px h-24 bg-gradient-to-b from-[#ee502c] to-transparent mt-4" />
            </motion.div>
        </div>

      </div>
    </motion.div>
  );
}