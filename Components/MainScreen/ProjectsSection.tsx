"use client";

import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FiTarget, FiChevronRight, FiChevronUp } from "react-icons/fi";

const projects = [
  { id: "01", title: "NEURAL_LINK", category: "AI_INTERFACE", image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop" },
  { id: "02", title: "AETHER_VOID", category: "WEB3_ARCHITECTURE", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" },
  { id: "03", title: "KANSO_PURE", category: "UI_TRANSFORMATION", image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop" },
  { id: "04", title: "CORE_FEED", category: "DATA_VISUALIZATION", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop" },
  { id: "05", title: "PROTOCOL_Z", category: "SECURITY_ENCRYPTION", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop" },
];

export default function ProjectsSection() {
  // 1. Initialize to null so everything is closed on mobile
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 250 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 250 });

  useEffect(() => {
    const handleResize = () => {
      const large = window.innerWidth >= 1024;
      setIsLargeScreen(large);
      
      // 2. If we switch to Desktop, force open the first item if none are active
      if (large && activeIndex === null) {
        setActiveIndex(0);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-black py-16 lg:py-24 flex flex-col justify-center overflow-hidden lg:cursor-none"
    >
      <div className="w-full px-6 md:px-20 mb-16 relative z-10 flex justify-between items-start">
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-px bg-[#ee502c] shadow-[0_0_10px_#ee502c]" />
                <span className="font-azeretmono text-[10px] tracking-[0.6em] text-[#ee502c] uppercase">Selected_Artifacts</span>
            </div>
            <h2 className="font-unbounded font-black text-4xl md:text-7xl lg:text-8xl text-white uppercase tracking-tighter leading-[0.8]">
                Featured <br/>
                <span className="text-zinc-800 italic uppercase">Portfolio.</span>
            </h2>
        </div>
      </div>

      <div 
        className="flex flex-col lg:flex-row w-full h-auto lg:h-[80vh] items-stretch lg:items-center px-0 gap-1 lg:gap-2"
        onMouseEnter={() => setIsCursorVisible(true)}
        onMouseLeave={() => {
            setIsCursorVisible(false);
            // Optional: reset to 0 on desktop leave
            if (isLargeScreen) setActiveIndex(0);
        }}
      >
        {projects.map((project, index) => {
          const isActive = activeIndex === index;
          // 3. Neighbor check logic must handle activeIndex being null
          const isNeighbor = activeIndex !== null && Math.abs(activeIndex - index) === 1;

          const mobileHeight = isActive ? "450px" : "80px";
          const desktopHeight = isActive ? "75vh" : (isNeighbor ? "55vh" : "40vh");
          const grayscaleVal = isActive ? 0 : (isNeighbor && isLargeScreen ? 0.5 : 1);

          return (
            <motion.div
              key={project.id}
              onMouseEnter={() => isLargeScreen && setActiveIndex(index)}
              layout
              animate={{
                height: isLargeScreen ? desktopHeight : mobileHeight,
                flex: isLargeScreen ? (isActive ? 10 : (isNeighbor ? 4 : 3)) : "none"
              }}
              transition={{ type: "spring", stiffness: 180, damping: 30, mass: 0.8 }}
              className="relative overflow-hidden group border-y lg:border-y-0 lg:border-x border-white/5 bg-zinc-900"
            >
              {isLargeScreen ? (
                <Link href="/projects" className="block w-full h-full relative cursor-none">
                  <ProjectImage image={project.image} grayscale={grayscaleVal} isActive={isActive} />
                  <ProjectInfo data={project} isActive={isActive} />
                </Link>
              ) : (
                <div className="w-full h-full relative flex flex-col">
                  {/* Title Area - Click to Redirect */}
                  <Link href="/projects" className="absolute top-0 left-0 w-[75%] h-[80px] z-30 flex items-center pl-6">
                    <span className={`font-unbounded font-bold text-sm tracking-widest uppercase transition-colors ${isActive ? 'text-white' : 'text-white/40'}`}>
                      {project.title}
                    </span>
                  </Link>

                  {/* Arrow Toggle Area - Click to Expand */}
                  <button 
                    onClick={() => setActiveIndex(isActive ? null : index)}
                    className="absolute top-0 right-0 w-[25%] h-[80px] z-30 flex items-center justify-center border-l border-white/5"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${isActive ? 'bg-[#ee502c] border-[#ee502c] text-black' : 'bg-white/5 border-white/10 text-white/30'}`}>
                       {isActive ? <FiChevronUp size={20}/> : <FiChevronRight size={20}/>}
                    </div>
                  </button>

                  <ProjectImage image={project.image} grayscale={grayscaleVal} isActive={isActive} />
                  <ProjectInfo data={project} isActive={isActive} mobile />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {isCursorVisible && isLargeScreen && activeIndex !== null && (
          <motion.div
            style={{ left: smoothX, top: smoothY }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed z-[200] pointer-events-none -translate-x-1/2 -translate-y-1/2"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-2.5 rounded-full flex flex-col items-center shadow-2xl min-w-[120px]">
                <FiTarget className="text-white mb-1.5 animate-pulse" size={14} />
                <span className="font-azeretmono text-[9px] font-black text-white tracking-[0.3em] uppercase">Open_Log</span>
                <span className="font-azeretmono text-[6px] text-[#ee502c] uppercase mt-1 tracking-widest">Node_71</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectImage({ image, grayscale, isActive }: any) {
    return (
        <>
            <motion.img 
                layout
                src={image} 
                alt="" 
                style={{ filter: `grayscale(${grayscale})` }}
                className={`w-full h-full object-cover transition-all duration-1000 ${isActive ? 'scale-100 opacity-100' : 'scale-125 opacity-20'}`}
            />
            <div className={`absolute inset-0 bg-black transition-opacity duration-700 ${isActive ? 'opacity-0' : 'opacity-60'}`} />
        </>
    );
}

function ProjectInfo({ data, isActive, mobile }: any) {
    return (
        <AnimatePresence>
            {isActive && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 p-6 lg:p-10 flex flex-col justify-end pointer-events-none z-20 bg-gradient-to-t from-black via-black/20 to-transparent"
                >
                    <div className="flex flex-col items-start gap-3 lg:gap-4">
                        <span className="font-azeretmono text-[9px] lg:text-[10px] text-[#ee502c] tracking-[0.5em] uppercase">
                            Ref: {data.id} // {data.category}
                        </span>
                        <h3 className="font-unbounded font-black text-2xl md:text-4xl lg:text-6xl text-white uppercase tracking-tighter leading-none">
                            {data.title}
                        </h3>
                        <div className="flex items-center gap-4">
                            <div className="w-10 lg:w-12 h-0.5 bg-[#ee502c]" />
                            {!mobile && <span className="font-azeretmono text-[8px] text-white/40 uppercase tracking-[0.2em]">Deployment_Ready</span>}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}