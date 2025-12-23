"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";

// Importing your assets
import arbitrum from "@/app/assets/techstack/arbitrum.png";
import aws from "@/app/assets/techstack/aws.png";
import bitcoin from "@/app/assets/techstack/bitcoin.png";
import ethereum from "@/app/assets/techstack/etherum.png";
import github from "@/app/assets/techstack/github.png";
import n8n from "@/app/assets/techstack/n8n.png";
import nextjs from "@/app/assets/techstack/nextjs.png";
import optimism from "@/app/assets/techstack/optimism.png";
import php from "@/app/assets/techstack/php.png";
import python from "@/app/assets/techstack/python.png";
import react from "@/app/assets/techstack/react.png";
import rust from "@/app/assets/techstack/rust.png";
import solidity from "@/app/assets/techstack/solidity.png";
import threejs from "@/app/assets/techstack/threejs.png";

const techStack = [
  { name: "Arbitrum", icon: arbitrum },
  { name: "AWS", icon: aws },
  { name: "Bitcoin", icon: bitcoin },
  { name: "Ethereum", icon: ethereum },
  { name: "GitHub", icon: github },
  { name: "n8n", icon: n8n },
  { name: "Next.js", icon: nextjs },
  { name: "Optimism", icon: optimism },
  { name: "PHP", icon: php },
  { name: "Python", icon: python },
  { name: "React", icon: react },
  { name: "Rust", icon: rust },
  { name: "Solidity", icon: solidity },
  { name: "Three.js", icon: threejs },
];

export default function TechCarousel() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [windowHeight, setWindowHeight] = useState(1000);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const opacity = useTransform(scrollY, [0, windowHeight * 1.8, windowHeight * 2], [1, 1, 0]);
  const pointerEvents = useTransform(scrollY, [0, windowHeight * 1.9, windowHeight * 2], ["auto", "auto", "none"] as any);

  // Mouse Tracking for HUD
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 250 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 250 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    // We update mouse values relative to viewport for the "fixed" HUD
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  const loopImages = [...techStack, ...techStack];

  return (
    <>
      {/* --- HUD LABEL (Moved outside aside to prevent clipping) --- */}
      <AnimatePresence>
        {!isMobile && hoveredTech && (
          <motion.div
            style={{ 
              left: smoothX, 
              top: smoothY, 
              position: "fixed", 
              pointerEvents: "none",
              zIndex: 9999 
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center justify-center translate-x-[-110%] translate-y-[-50%]"
          >
            <div className="relative flex items-center justify-center px-6 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-sm">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ee502c]" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ee502c]" />
              <span className="relative z-10 text-white font-azeretmono text-[10px] font-bold whitespace-nowrap uppercase tracking-widest ">
                {hoveredTech}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.aside 
        style={{ opacity, pointerEvents }}
        onMouseMove={handleMouseMove}
        className={`fixed z-[85] bg-black border-[#ffffff1a] flex shadow-[-30px_0_60px_rgba(0,0,0,0.9)] 
          ${isMobile 
            ? "bottom-0 left-0 w-full h-[65px] flex-row border-t" 
            : "right-0 top-0 h-screen w-[100px] md:w-[130px] lg:w-[120px] 2xl:w-[150px] flex-col border-l"
          }`}
      >
        {/* --- HEADER --- */}
        <div className={`shrink-0 flex flex-col justify-center bg-black border-white/5 
          ${isMobile ? "px-4 border-r" : "pt-6 pb-4 px-6 border-b"}`}>
          <span className="text-[8px] text-[#ee502c] font-bold tracking-[0.4em] uppercase leading-none mb-0.5">Our</span>
          <span className="text-[10px] font-black tracking-tighter text-white uppercase leading-none">Technology</span>
        </div>

        {/* --- CAROUSEL AREA --- */}
        <div className="flex-1 overflow-hidden relative">
          <motion.div
            className={`flex ${isMobile ? "flex-row w-max h-full items-center" : "flex-col w-full"}`}
            animate={isMobile ? { x: ["0%", "-50%"] } : { y: ["0%", "-50%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          >
            {loopImages.map((tech, idx) => (
              <div 
                key={idx} 
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
                className={`flex items-center justify-center border-white/10 md:grayscale hover:grayscale-0 transition-all duration-500 group relative
                  ${isMobile ? "w-[75px] h-full border-r p-4" : "w-full h-[100px] md:h-[130px] border-b p-8"}`}
              >
                {/* Interaction Bar */}
                <div className={`absolute bg-[#ee502c] transition-all duration-700 shadow-[0_0_15px_rgba(238,80,44,0.6)]
                  ${isMobile ? "top-0 left-0 h-[2.5px] w-0 group-hover:w-full" : "left-0 top-0 w-[3px] h-0 group-hover:h-full"}`} />
                
                <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                   <Image 
                      src={tech.icon} 
                      alt={tech.name} 
                      className="w-full h-full object-contain md:opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" 
                    />
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* Gradient Masks */}
          <div className={`absolute pointer-events-none z-10 ${isMobile ? "top-0 left-0 h-full w-12 bg-linear-to-r from-black to-transparent" : "top-0 left-0 w-full h-12 bg-linear-to-b from-black to-transparent"}`} />
          <div className={`absolute pointer-events-none z-10 ${isMobile ? "top-0 right-0 h-full w-12 bg-linear-to-l from-black to-transparent" : "bottom-0 left-0 w-full h-12 bg-linear-to-t from-black via-black/90 to-transparent"}`} />
        </div>
      </motion.aside>
    </>
  );
}