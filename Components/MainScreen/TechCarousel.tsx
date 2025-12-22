"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useState, useCallback } from "react";

// Importing your assets (kept same)
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
  { name: "Arbitrum L2", icon: arbitrum },
  { name: "AWS Cloud", icon: aws },
  { name: "Bitcoin Core", icon: bitcoin },
  { name: "Ethereum", icon: ethereum },
  { name: "GitHub", icon: github },
  { name: "n8n Automation", icon: n8n },
  { name: "Next.js 15", icon: nextjs },
  { name: "Optimism", icon: optimism },
  { name: "PHP / Laravel", icon: php },
  { name: "Python / AI", icon: python },
  { name: "React JS", icon: react },
  { name: "Rust / Solana", icon: rust },
  { name: "Solidity", icon: solidity },
  { name: "Three.js", icon: threejs },
];

export default function TechCarousel() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const { scrollY } = useScroll();
  
  // Sidebar visibility logic
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const pointerEvents = useTransform(scrollY, [0, 600], ["auto", "none"] as any);

  // --- MODERN MOUSE TRACKING ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for "Liquid" movement
  const springConfig = { damping: 25, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  const loopImages = [...techStack, ...techStack];

  return (
    <motion.aside 
      style={{ opacity, pointerEvents }}
      onMouseMove={handleMouseMove}
      className="fixed right-0 top-0 h-screen w-[100px] md:w-[130px] lg:w-[150px] bg-black border-l border-white/10 z-85 flex flex-col shadow-[-30px_0_60px_rgba(0,0,0,0.9)]"
    >
      {/* --- MODERN FLOATING HUD LABEL --- */}
      {/* --- MODERN FLOATING HUD LABEL --- */}
<motion.div
  style={{
    left: smoothX,
    top: smoothY,
    position: "fixed",
    pointerEvents: "none",
  }}
  className="z-200 hidden md:flex items-center justify-center"
>
  <motion.div
    initial={{ opacity: 0, scale: 0.8, x: -20 }}
    animate={{ 
      opacity: hoveredTech ? 1 : 0, 
      scale: hoveredTech ? 1 : 0.8,
      x: hoveredTech ? -160 : -140 // Offset to the left of the cursor
    }}
    className="relative flex items-center justify-center px-6 py-2"
  >
    {/* 1. TOP-LEFT BRACKET */}
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ee502c] shadow-[0_0_8px_#ee502c]" />
    
    {/* 2. BOTTOM-RIGHT BRACKET */}
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ee502c] shadow-[0_0_8px_#ee502c]" />

    {/* 3. THE TEXT CONTENT */}
    <div className="relative">
      {/* Background Glow */}
      <div className="absolute inset-0 blur-xl bg-[#ee502c]/10 rounded-full" />
      
      {/* Primary Text */}
      <span className="relative z-10 text-white font-azeretmono text-xs font-bold whitespace-nowrap uppercase">
        {hoveredTech}
      </span>
      
      {/* Secondary "Glitch" Layer (Slightly offset orange shadow) */}
      <span className="absolute top-0 left-0 z-0 text-[#ee502c]/30 font-azeretmono text-xs font-bold whitespace-nowrap uppercase italic translate-x-px translate-y-px blur-[0.5px]">
        {hoveredTech}
      </span>
    </div>

    {/* 4. SCAN LINE ANIMATION (Modern detail) */}
    <motion.div 
      animate={{ top: ["0%", "100%", "0%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      className="absolute left-0 w-full h-px bg-linear-to-r from-transparent via-[#ee502c]/40 to-transparent pointer-events-none"
    />
  </motion.div>
</motion.div>

      {/* 1. TOP OVERLAY HEADER */}
      <div className="absolute top-0 left-0 w-full z-20 bg-black pt-6 pb-4 px-6 border-b border-white/5">
        <div className="flex flex-col items-start justify-center">
            <span className="text-[10px] text-[#ee502c] font-bold tracking-[0.4em] uppercase mb-1">
            Our
            </span>
            <span className="text-xs md:text-sm font-black tracking-tighter text-white leading-none uppercase">
            Technologies
            </span>
        </div>
        <div className="absolute top-full left-0 w-full h-4 bg-linear-to-b from-black to-transparent pointer-events-none" />
      </div>

      {/* 2. SCROLLING AREA */}
      <div className="flex-1 w-full relative mt-20 overflow-hidden">
        <motion.div
          className="flex flex-col w-full"
          animate={{ y: ["0%", "-50%"] }}
          transition={{
            duration: 30, 
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {loopImages.map((tech, idx) => {
            const isActive = hoveredTech === tech.name;
            return (
              <div 
                key={idx} 
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
                className="w-full h-[100px] md:h-[130px] flex items-center justify-center border-b border-white/18 p-8 grayscale hover:grayscale-0 transition-all duration-500 group relative cursor-none"
              >
                {/* Interaction Glow Bar (Sidebar Edge) */}
                <div className={`absolute left-0 top-0 w-[3px] transition-all duration-700 shadow-[4px_0_15px_rgba(238,80,44,0.6)] ${
                    isActive ? "h-full bg-[#ee502c]" : "h-0 bg-transparent"
                }`} />
                
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  className={`w-full h-full object-contain transition-all duration-700 ease-out ${
                    isActive ? "opacity-100 scale-110" : "opacity-40 scale-100"
                  }`}
                />
              </div>
            );
          })}
        </motion.div>

        {/* BOTTOM OVERLAY MASK */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-linear-to-t from-black via-black/90 to-transparent pointer-events-none z-10" />
      </div>
    </motion.aside>
  );
}