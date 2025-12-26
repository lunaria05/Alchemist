"use client";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { FiX, FiPlay } from "react-icons/fi";

export default function GlobeVideo() {
  const [isNear, setIsNear] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isGlobeActive, setIsGlobeActive] = useState(false);
  const [shouldShow, setShouldShow] = useState(true);
  const { scrollYProgress } = useScroll();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);

  // --- 1. INTERACTION SYNC ---
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Activates interactions when globe starts forming
    setIsGlobeActive(latest >= 0.05 && latest < 0.55);

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

  // --- 3. ENHANCED REVEAL TIMING WITH PARTICLE FORMATION ---
  // Extended scroll range for better formation effect
  const particleProgress = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.5, 0.55], [0, 1, 1, 0]);

  // Progressive scaling from very small to large as user scrolls
  const globeScale = useTransform(
    scrollYProgress,
    [0, 0.05, 0.15, 0.35, 0.5],
    [0.3, 0.6, 1, 1.3, 1.5]
  );

  // --- 4. PARTICLE GLOBE FORMATION CANVAS ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = 550;
      canvas.height = 550;
    };
    setCanvasSize();

    // Particle system
    interface Particle {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      size: number;
      opacity: number;
    }

    const particles: Particle[] = [];
    const particleCount = 150;
    const radius = 200;

    // Initialize particles in random positions
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const spread = Math.random() * 0.5 + 0.5; // Random spread

      particles.push({
        x: 275 + (Math.random() - 0.5) * 500, // Random scattered start
        y: 275 + (Math.random() - 0.5) * 500,
        targetX: 275 + Math.cos(angle) * radius * spread,
        targetY: 275 + Math.sin(angle) * radius * spread,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.5
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const progress = particleProgress.get();

      particles.forEach((particle, index) => {
        // Interpolate position based on scroll progress
        particle.x += (particle.targetX - particle.x) * progress * 0.1;
        particle.y += (particle.targetY - particle.y) * progress * 0.1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(238, 80, 44, ${particle.opacity * progress})`;
        ctx.fill();

        // Draw connections between nearby particles
        particles.forEach((otherParticle, otherIndex) => {
          if (otherIndex <= index) return;

          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(238, 80, 44, ${(1 - distance / 80) * 0.2 * progress})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      // Draw central glow
      const gradient = ctx.createRadialGradient(275, 275, 0, 275, 275, radius);
      gradient.addColorStop(0, `rgba(238, 80, 44, ${0.1 * progress})`);
      gradient.addColorStop(0.5, `rgba(238, 80, 44, ${0.03 * progress})`);
      gradient.addColorStop(1, 'rgba(238, 80, 44, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [particleProgress]);

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
          className="w-[550px] h-[550px] flex items-center justify-center cursor-none group relative"
        >
          {/* PARTICLE CANVAS BACKGROUND */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{ mixBlendMode: 'screen' }}
          />

          {/* THE SMALL RECTANGLE VIDEO */}
          <div className="w-[300px] h-[200px] sm:w-[340px] sm:h-[220px] md:w-[320px] md:h-[200px] lg:w-[360px] lg:h-[220px] relative transition-transform duration-700 group-hover:scale-105 z-10">
             <div className="absolute -inset-4 border border-white/5 rounded-lg group-hover:border-[#ee502c]/40 transition-colors">
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/40" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/40" />
             </div>

             <div className="w-full h-full overflow-hidden bg-black border border-white/10 rounded-sm shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                  <source src="/video.mp4" type="video/mp4" />
                </video>
             </div>

             {/* Status Bar */}
             <div className="absolute -bottom-6 left-0 w-full flex justify-between px-1 font-azeretmono text-[7px] text-white/30 uppercase tracking-[0.2em]">
                <span>Status: Encrypted</span>
                <span className="animate-pulse text-white/60 text-[6px]">● Live</span>
             </div>

             {/* Click to Expand Indicator */}
             <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5, duration: 0.6 }}
               className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
             >
               {/* Animated Icon */}
               <motion.div
                 animate={{ scale: [1, 1.1, 1] }}
                 transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                 className="relative w-10 h-10 flex items-center justify-center"
               >
                 {/* Pulsing ring */}
                 <motion.div
                   animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                   transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                   className="absolute inset-0 border-2 border-[#ee502c] rounded-full"
                 />

                 {/* Static ring */}
                 <div className="absolute inset-0 border border-[#ee502c]/40 rounded-full" />

                 {/* Play icon */}
                 <FiPlay className="text-[#ee502c] fill-[#ee502c]" size={14} />
               </motion.div>

               {/* Text Label */}
               <div className="flex flex-col items-center gap-0.5">
                 <span className="font-azeretmono text-[8px] font-bold text-white/80 tracking-[0.2em] uppercase">
                   Click to Expand
                 </span>
                 <div className="flex items-center gap-1">
                   <motion.div
                     animate={{ width: ["0%", "100%", "0%"] }}
                     transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                     className="h-[1px] bg-gradient-to-r from-transparent via-[#ee502c] to-transparent"
                     style={{ width: "40px" }}
                   />
                 </div>
                 <span className="font-azeretmono text-[6px] text-white/40 tracking-wider uppercase mt-0.5">
                   Full Screen Mode
                 </span>
               </div>
             </motion.div>
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