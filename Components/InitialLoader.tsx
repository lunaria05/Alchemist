"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function InitialLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Mimic real system "heavy lifting" pauses
        const jump = Math.random() > 0.85 ? 15 : 4;
        return Math.min(prev + jump, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => setIsLoading(false), 800);
      setTimeout(() => setShowLoader(false), 2000);
    }
  }, [progress]);

  if (!showLoader) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden pointer-events-auto"
        >
          {/* --- 1. BACKGROUND CALIBRATION LAYER --- */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
            <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, white 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, white 40px)', backgroundSize: '40px 40px' }} />
          </div>

          {/* Vertical Progress Ruler (Left Side) */}
          <div className="absolute left-10 top-1/2 -translate-y-1/2 h-64 w-12 flex flex-col justify-between opacity-20 hidden md:flex">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`h-px transition-all duration-500 ${progress > i * 10 ? 'w-6 bg-[#ee502c]' : 'w-2 bg-white'}`} />
                <span className="font-azeretmono text-[6px] text-white tracking-widest">CALIB_0{i}</span>
              </div>
            ))}
          </div>

          {/* --- 2. THE SINGULARITY (Central Core) --- */}
          <div className="relative flex flex-col items-center">
            
            {/* Morphing Geometric Core */}
            <div className="relative w-40 h-40 flex items-center justify-center">
              
              {/* Outer Pulsing Aura */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-[#ee502c] rounded-full blur-[60px]"
              />

              {/* Rotating Compass Ring */}
              <motion.svg 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-full h-full opacity-40" 
                viewBox="0 0 100 100"
              >
                <circle cx="50" cy="50" r="48" stroke="white" strokeWidth="0.2" fill="none" strokeDasharray="4 8" />
                <path d="M50 2 L50 10 M98 50 L90 50 M50 98 L50 90 M2 50 L10 50" stroke="#ee502c" strokeWidth="1" />
              </motion.svg>

              {/* The "Decryption" Percentage */}
              <div className="relative z-10 flex flex-col items-center">
                <motion.span 
                  key={Math.floor(progress)}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-jetbrainsmono text-4xl font-extrabold text-white tabular-nums tracking-tighter"
                >
                  {Math.floor(progress)}<span className="text-[#ee502c] text-xl opacity-80">%</span>
                </motion.span>
                <span className="font-azeretmono text-[7px] text-[#ee502c] tracking-[0.5em] uppercase opacity-60">
                   {progress < 100 ? "Transmuting_Logic" : "System_Ready"}
                </span>
              </div>

              {/* Dynamic Corner Brackets (HUD) */}
              <div className="absolute -inset-4 pointer-events-none">
                <motion.div 
                  animate={{ 
                    width: ["20%"],
                    height: [ "20%"] 
                  }}
                  className="absolute top-0 left-0 border-t-2 border-l-2 border-[#ee502c]" 
                />
                <motion.div 
                  animate={{ 
                    width: ["20%"],
                    height: ["20%"] 
                  }}
                  className="absolute bottom-0 right-0 border-b-2 border-r-2 border-[#ee502c]" 
                />
              </div>
            </div>

            {/* --- 3. BRAND REVEAL --- */}
            <div className="mt-20 flex flex-col items-center">
               <motion.h2 
                 initial={{ letterSpacing: "1em", opacity: 0 }}
                 animate={{ letterSpacing: "0.4em", opacity: 1 }}
                 className="font-unbounded font-black text-2xl md:text-3xl text-white uppercase"
               >
                 Kumi<span className="text-[#ee502c]">_</span>Labs
               </motion.h2>
               
               {/* Binary Data Stream Detail */}
               <div className="mt-4 flex gap-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        backgroundColor: progress > (i + 1) * 20 ? "#ee502c" : "rgba(255,255,255,0.1)",
                        boxShadow: progress > (i + 1) * 20 ? "0 0 10px #ee502c" : "none"
                      }}
                      className="w-10 h-1 rounded-full transition-all duration-500"
                    />
                  ))}
               </div>
            </div>
          </div>

          {/* --- 4. TELEMETRY STATUS (Corners) --- */}
          <div className="absolute bottom-10 left-10 font-azeretmono text-[7px] text-white/20 flex flex-col gap-1 uppercase tracking-widest">
            <span>Buffer_Stream: 0x882F</span>
            <span>Link_State: PENDING_AUTH</span>
          </div>
          
          <div className="absolute bottom-10 right-10 flex flex-col items-end gap-1 opacity-20">
             <div className="w-24 h-px bg-white/20" />
             <span className="font-azeretmono text-[7px] text-white uppercase tracking-[0.3em]">Protocol_v.2.0.5</span>
          </div>
          
        </motion.div>
      )}
    </AnimatePresence>
  );
}