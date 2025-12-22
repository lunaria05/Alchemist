// Components/MainScreen/HeroContent.tsx
"use client";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function HeroContent() {
  return (
    <div className="relative h-screen w-full flex flex-col justify-between p-12 md:p-24 z-10 pointer-events-none">
      <div /> {/* Spacer */}

      <div className="flex flex-col md:flex-row justify-between items-end w-full">
        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl max-w-4xl leading-[1.1] font-bungeeinline"
        >
          Crafting Code. <br />
          <span className="text-zinc-500">Engineering AI.</span> <br />
          Building Chains. <br />
          <span className="text-[#ee502c]">Designing Magic.</span>
        </motion.h1>

        {/* Modern Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="pointer-events-auto group relative mt-10 md:mt-0 flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-bold overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#ee502c] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <span className="relative z-10 group-hover:text-white transition-colors">EXPLORE MISSION</span>
          <FiArrowRight className="relative z-10 group-hover:text-white group-hover:translate-x-2 transition-all" />
        </motion.button>
      </div>
    </div>
  );
}