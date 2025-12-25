"use client";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { FiX, FiPlay } from "react-icons/fi";

export default function GlobeVideo() {
  const [isNear, setIsNear] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isGlobeActive, setIsGlobeActive] = useState(false);
  const [shouldShow, setShouldShow] = useState(true);
  const { scrollYProgress } = useScroll();

  // --- 1. INTERACTION SYNC ---
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Activates interactions when globe starts forming
    setIsGlobeActive(latest >= 0.1 && latest < 0.55);

    // Hide video completely when next component comes
    setShouldShow(latest < 0.55);
  });

  // --- 2. SPRING PHYSICS CURSOR ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 200 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  // --- 3. REVEAL TIMING ---
  // Appears when globe starts forming with high opacity immediately, removes when next component comes
  const opacity = useTransform(scrollYProgress, [0.1, 0.15, 0.5, 0.55], [0, 1, 1, 0]);
  const globeScale = useTransform(scrollYProgress, [0.1, 0.25], [0.7, 1]);

  useEffect(() => {
    document.body.style.overflow = isExpanded ? 'hidden' : 'unset';
  }, [isExpanded]);

  // Don't render video at all after scrolling past hero section
  if (!shouldShow && !isExpanded) return null;

  return (
    <>
      {/* --- PROXIMITY DETECTION ZONE --- */}
      <div
        className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none"
        onMouseMove={handleMouseMove}
      >
        <motion.div 
          style={{ opacity, scale: globeScale, pointerEvents: isGlobeActive ? "auto" : "none" }}
          onMouseEnter={() => setIsNear(true)}
          onMouseLeave={() => setIsNear(false)}
          onClick={() => setIsExpanded(true)}
          className="w-[550px] h-[550px] flex items-center justify-center cursor-none group"
        >
          {/* THE SMALL RECTANGLE VIDEO */}
          <div className="w-[200px] h-[140px] md:w-[260px] md:h-[160px] relative transition-transform duration-700 group-hover:scale-105">
             <div className="absolute -inset-4 border border-white/5 rounded-lg group-hover:border-[#ee502c]/40 transition-colors">
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/40" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/40" />
             </div>

             <div className="w-full h-full overflow-hidden bg-black border border-white/10 rounded-sm shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                  <source src="/video.mp4" type="video/mp4" />
                </video>
             </div>
             
             <div className="absolute -bottom-6 left-0 w-full flex justify-between px-1 font-azeretmono text-[7px] text-white/30 uppercase tracking-[0.2em]">
                <span>Status: Encrypted</span>
                <span className="animate-pulse text-white/60 text-[6px]">● Live</span>
             </div>
          </div>
        </motion.div>
      </div>

      {/* --- THE CIRCULAR GLASS HUD CURSOR --- */}
      <AnimatePresence>
        {isNear && !isExpanded && isGlobeActive && ( 
          <motion.div
            style={{ left: smoothX, top: smoothY }}
            initial={{ opacity: 0, scale: 0.8, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, scale: 1, backdropFilter: "blur(1px)" }}
            exit={{ opacity: 0, scale: 0.8, backdropFilter: "blur(0px)" }}
            className="fixed pointer-events-none z-[110] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          >
            <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center rounded-full border border-white/20 bg-white/[0.02] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-tr from-white/[0.05] via-transparent to-white/[0.05] pointer-events-none" />
              
              {/* Dynamic Internal Scanning Bar */}
              <motion.div 
                animate={{ top: ["-20%", "120%"] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="absolute left-0 w-full h-10 bg-linear-to-b from-transparent via-[#ee502c]/15 to-transparent pointer-events-none"
              />

              {/* Internal Targeting Brackets */}
              <div className="absolute inset-6 pointer-events-none">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ee502c]" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ee502c]" />
              </div>

              {/* Center Play Label */}
              <div className="relative z-10 flex flex-col items-center gap-1.5">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#ee502c]/40 blur-md rounded-full animate-pulse" />
                  <FiPlay className="relative text-white fill-white" size={16} />
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-azeretmono text-[9px] font-black text-white tracking-[0.2em] uppercase leading-none">Click</span>
                  <span className="font-azeretmono text-[5px] text-[#ee502c] font-bold tracking-widest opacity-80 mt-1">REEL.PROT</span>
                </div>
              </div>

              {/* Calibration Ticks */}
              <div className="absolute inset-2 rounded-full border border-white/5 border-dashed animate-[spin_20s_linear_infinite]" />
              
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                 <span className="font-azeretmono text-[5px] text-white/30 uppercase tracking-tighter italic whitespace-nowrap">ALC_SYNC_71%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- ANAMORPHIC HORIZON EXPANSION --- */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden"
          >
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            
            <motion.div 
              initial={{ clipPath: 'inset(49% 0% 49% 0%)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              exit={{ clipPath: 'inset(49% 0% 49% 0%)' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full flex flex-col items-center justify-center bg-[#050505]"
            >
              {/* Header Close Button */}
              <div className="absolute top-0 left-0 w-full p-10 flex justify-end items-center z-10">
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="group cursor-pointer flex items-center gap-4 text-white/40 hover:text-white transition-all"
                >
                  <div className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-full group-hover:border-[#ee502c]/40 group-hover:rotate-90 transition-all duration-500">
                    <FiX size={20} />
                  </div>
                </button>
              </div>

              {/* Main Video Frame */}
              <div className="w-full max-w-6xl max-h-[75vh] relative px-4">
                <video autoPlay loop playsInline controls className="w-full h-full object-contain shadow-[0_0_120px_rgba(238,80,44,0.15)] rounded-sm">
                  <source src="/video.mp4" type="video/mp4" />
                </video>
                
                {/* Visual HUD Frame Accents */}
                <div className="absolute -inset-2 pointer-events-none">
                  <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-[#ee502c]/20" />
                  <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-[#ee502c]/20" />
                </div>
              </div>

              {/* Telemetry Readout */}
              <div className="absolute bottom-10 left-0 w-full px-12 flex justify-between items-end opacity-40">
                <div className="font-azeretmono text-[7px] text-white/20 tracking-widest flex flex-col gap-1 uppercase">
                   <span>Input_Source: Sentinel_Prime</span>
                   <span>Encryption: AES-256-ALC</span>
                </div>
                <div className="h-px bg-white/5 flex-1 mx-20 mb-1" />
                <div className="flex gap-2 font-azeretmono text-[7px] text-white/40 uppercase tracking-widest">
                    <span>X: {Math.floor(smoothX.get())}</span>
                    <span>Y: {Math.floor(smoothY.get())}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}