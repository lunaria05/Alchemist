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
    <section ref={containerRef} className="relative bg-black min-h-[400vh] isolate">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center px-4 sm:px-10 md:px-20 overflow-hidden">
        
        {/* --- SECTION HEADER --- */}
        <div className="mb-8 md:mb-12 flex items-end justify-between border-b border-white/5 pb-6 md:pb-8">
           <div className="flex flex-col">
              <span className="font-azeretmono text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.5em] text-[#ee502c] uppercase mb-2 md:mb-3 text-shadow-glow">Verification</span>
              <h2 className="font-neuton text-3xl sm:text-5xl md:text-7xl text-white tracking-tighter uppercase italic leading-none">Client logs</h2>
           </div>
           <div className="flex items-center gap-2 md:gap-3 opacity-50 sm:opacity-100">
                <span className="font-azeretmono text-[8px] md:text-[10px] text-white/30 uppercase tracking-[0.2em] md:tracking-[0.4em]">
                    Scroll_to_Sync
                </span>
                <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full border border-white/30 flex items-center justify-center">
                    <motion.div 
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-0.5 h-0.5 rounded-full bg-[#ee502c]" 
                    />
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
  
  const isActive = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
  
  // Responsive Heights
  const height = useTransform(isActive, [0, 1], ["70px", "550px"]); 
  
  const opacityDetails = useTransform(isActive, [0.3, 0.6], [0, 1]); 
  const opacityClosed = useTransform(isActive, [0, 0.3], [1, 0]);
  const borderColor = useTransform(isActive, [0, 1], ["rgba(255,255,255,0.05)", "#ee502c"]);
  const portalScale = useTransform(isActive, [0, 1], [0.4, 1]);
  const sectorProgress = useTransform(progress, [start, start + 0.1], [0, 1]);

  return (
    <motion.div 
      style={{ height, borderColor }}
      className="relative w-full border-b overflow-hidden group transition-colors duration-500"
    >
      <div className="h-full w-full flex items-center relative">
        
        {/* --- 1. SECTOR INDICATOR --- */}
        <div className="absolute left-0 top-0 h-full w-[2px] md:w-1 flex flex-col justify-center pointer-events-none">
            <motion.div 
                style={{ scaleY: sectorProgress, originY: 0 }}
                className="w-full h-1/2 bg-[#ee502c] shadow-[0_0_15px_rgba(238,80,44,0.5)]"
            />
        </div>

        {/* --- 2. CLOSED STATE UI --- */}
        <motion.div 
          style={{ opacity: opacityClosed }}
          className="absolute inset-0 flex items-center justify-between px-4 md:px-12 pointer-events-none"
        >
          <div className="flex items-center gap-4 md:gap-8">
            <span className="font-azeretmono text-[10px] md:text-xs text-[#ee502c] opacity-50">{data.id}</span>
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden border border-white/20 grayscale opacity-40">
              <img src={data.image} alt="" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-unbounded text-[10px] md:text-sm text-white/40 tracking-widest uppercase truncate max-w-[150px] md:max-w-none">
              {data.name}
            </h3>
          </div>

          <div className="flex items-center gap-4 md:gap-10">
             <div className="flex gap-0.5 md:gap-1">
                {[...Array(5)].map((_, i) => (
                    <FiStar key={i} fill={i < data.rating ? "rgba(113, 113, 122, 0.2)" : "none"} color="rgba(113, 113, 122, 0.4)" size={10} />
                ))}
             </div>
          </div>
        </motion.div>

        {/* --- 3. OPEN STATE UI --- */}
        <motion.div 
            style={{ opacity: opacityDetails }} 
            className="w-full flex flex-col md:flex-row items-center justify-center md:justify-start py-8 md:py-10"
        >
            {/* IMAGE PORTAL */}
            <div className="flex w-full md:w-1/3 justify-center items-center mb-6 md:mb-0 md:pl-10">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56">
                 <motion.div 
                   animate={{ rotate: -360 }}
                   transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                   className="absolute -inset-3 md:-inset-6 border border-dashed border-[#ee502c]/30 rounded-full" 
                 />
                 <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#ee502c] shadow-[0_0_50px_rgba(238,80,44,0.1)]">
                    <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
                 </div>
              </div>
            </div>

            {/* EXPANDED CONTENT */}
            <div className="flex-1 flex flex-col items-center md:items-start justify-center px-6 md:px-16 text-center md:text-left">
              <div className="relative mb-4 md:mb-8">
                 <h3 className="text-2xl sm:text-3xl lg:text-5xl font-unbounded font-black text-white uppercase tracking-tighter leading-none">
                   {data.name}
                 </h3>
                 <div className="flex items-center justify-center md:justify-start gap-2 md:gap-4 mt-2 md:mt-3">
                    <div className="h-px w-4 md:w-8 bg-[#ee502c]" />
                    <span className="font-azeretmono text-[7px] md:text-[10px] text-[#ee502c] uppercase tracking-[0.2em] md:tracking-[0.4em]">
                        {data.role}
                    </span>
                 </div>
              </div>

              <div className="flex flex-col items-center md:items-start max-w-2xl">
                <div className="flex gap-1 mb-4 md:mb-8 items-center">
                   <span className="font-azeretmono text-[7px] md:text-[8px] text-white/30 mr-2 uppercase tracking-widest">Score:</span>
                   {[...Array(5)].map((_, i) => (
                    <FiStar key={i} fill={i < data.rating ? "#ee502c" : "none"} color={i < data.rating ? "#ee502c" : "rgba(255,255,255,0.1)"} size={12} />
                   ))}
                </div>

                <p className="text-zinc-400 font-neuton text-base sm:text-lg lg:text-xl leading-relaxed italic border-l-2 border-[#ee502c]/30 pl-4 md:pl-6">
                  "{data.content}"
                </p>
              </div>
            </div>

            {/* ID INDICATOR (Hidden on small mobile) */}
            <div className="w-32 hidden xl:flex flex-col items-center justify-center pr-10">
               <span className="font-azeretmono text-5xl font-black text-white/5">{data.id}</span>
               <div className="w-px h-24 bg-gradient-to-b from-[#ee502c]/20 to-transparent mt-4" />
            </div>
        </motion.div>

      </div>
    </motion.div>
  );
}