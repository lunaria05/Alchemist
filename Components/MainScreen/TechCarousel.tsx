// Components/MainScreen/TechCarousel.tsx
"use client";
import { motion } from "framer-motion";

const techs = ["REACT", "NEXT.JS", "THREE.JS", "AI/ML", "BLOCKCHAIN", "SOLIDITY", "GSAP", "TAILWIND"];

export default function TechCarousel() {
  return (
    <div className="fixed right-10 top-0 h-screen w-12 flex items-center justify-center overflow-hidden z-20">
      <motion.div 
        className="flex flex-col gap-12"
        animate={{ y: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...techs, ...techs, ...techs].map((tech, i) => (
          <span 
            key={i} 
            className="[writing-mode:vertical-lr] text-zinc-600 font-bold tracking-[0.3em] text-[10px] hover:text-[#ee502c] transition-colors cursor-default"
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
}