"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FiCpu, FiLayers, FiZap, FiCode, FiBox } from "react-icons/fi";

const services = [
  {
    id: "PROT_01",
    title: "NEURAL_ARCH",
    details: "Custom AI infrastructures & LLM transmutation logic.",
    icon: <FiCpu />,
  },
  {
    id: "PROT_02",
    title: "LEDGER_CORE",
    details: "Decentralized protocols & trustless smart-contract engineering.",
    icon: <FiLayers />,
  },
  {
    id: "PROT_03",
    title: "VISUAL_PURE",
    details: "High-end design systems & emotional immersive interfaces.",
    icon: <FiZap />,
  },
  {
    id: "PROT_04",
    title: "SYSTEM_FLOW",
    details: "Performance optimization & heavy backend logic cleanup.",
    icon: <FiCode />,
  },
  {
    id: "PROT_05",
    title: "CLOUD_LOCK",
    details: "Secure decentralized hosting & global data-node distribution.",
    icon: <FiBox />,
  },
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  // Title Animations
  const titleX = useTransform(smoothProgress, [0, 0.2], ["0%", isMobile ? "0%" : "-38%"]);
  // UPDATED: titleY moves much higher on mobile (-48%)
  const titleY = useTransform(smoothProgress, [0, 0.2], ["0%", isMobile ? "-140%" : "-44%"]);
  const titleScale = useTransform(smoothProgress, [0, 0.2], [1, isMobile ? 0.35 : 0.45]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative h-[600vh] bg-black/60">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-10">
        
        {/* --- STACKED TITLE --- */}
        <motion.div
          style={{ x: titleX, y: titleY, scale: titleScale, opacity: titleOpacity }}
          className="absolute z-0 flex flex-col items-center lg:items-start leading-[0.75] pointer-events-none w-full lg:w-auto"
        >
          <span className="font-unbounded font-black text-[24vw] lg:text-[12vw] text-white/20 uppercase tracking-tighter">Our</span>
          <span className="font-unbounded font-black text-[18vw] lg:text-[12vw] text-[#ee502c] uppercase tracking-tighter drop-shadow-[0_0_30px_rgba(238,80,44,0.3)]">
            Services
          </span>
          <div className="flex items-center gap-4 mt-4 lg:mt-6 ml-2">
            <div className="w-12 lg:w-16 h-px bg-white/20" />
            <span className="font-azeretmono text-[8px] lg:text-[10px] text-white/30 tracking-[0.4em] lg:tracking-[0.8em] uppercase whitespace-nowrap">Laboratory_v.04</span>
          </div>
        </motion.div>

        {/* --- PERSISTENT DATA-STRIP STACK --- */}
        <div className="relative z-10 w-full h-full flex items-center justify-center lg:justify-end lg:pr-12 xl:pr-20 pt-[26vh] lg:pt-0">
          {/* pt-[32vh] ensures cards stay below the mobile title */}
          <div className="w-full max-w-[440px] flex flex-col gap-2.5 md:gap-3">
            {services.map((service, index) => (
              <ServiceStrip 
                key={service.id} 
                service={service} 
                index={index} 
                progress={smoothProgress} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceStrip({ service, index, progress }: any) {
  const start = 0.15 + (index * 0.12);
  const end = start + 0.15;

  const y = useTransform(progress, [start, end], [100, 0]);
  const opacity = useTransform(progress, [start, start + 0.08], [0, 1]);
  const clip = useTransform(progress, [start, end], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);

  return (
    <motion.div
      style={{ y, opacity, clipPath: clip }}
      className="w-full pointer-events-auto"
    >
      <div className="group relative bg-zinc-950/40 backdrop-blur-xl border border-white/10 p-3.5 md:p-5 hover:border-[#ee502c]/50 transition-all duration-500">
        
        <div className="absolute inset-0 bg-linear-to-r from-[#ee502c]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 flex items-center justify-between gap-3 md:gap-4">
          
          <div className="flex items-center gap-3 md:gap-4 flex-1 overflow-hidden">
             <div className="shrink-0 w-8 h-8 md:w-10 md:h-10 rounded bg-zinc-900 border border-white/5 flex items-center justify-center text-[#ee502c] group-hover:bg-[#ee502c] group-hover:text-black transition-all">
                {service.icon}
             </div>
             <div className="flex flex-col overflow-hidden">
                <div className="flex items-center gap-2">
                    <span className="font-azeretmono text-[7px] md:text-[8px] text-[#ee502c] font-bold tracking-widest shrink-0">{service.id}</span>
                    <h3 className="font-unbounded font-bold text-xs md:text-base text-white tracking-tight truncate uppercase">{service.title}</h3>
                </div>
                <p className="font-parkinsans text-zinc-500 text-[9px] md:text-[11px] leading-tight mt-1 max-w-[220px] line-clamp-1 md:line-clamp-none">
                    {service.details}
                </p>
             </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-0 h-px bg-[#ee502c] group-hover:w-full transition-all duration-700" />
      </div>
    </motion.div>
  );
}