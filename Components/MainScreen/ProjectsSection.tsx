"use client";

import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { FiArrowUpRight, FiSearch } from "react-icons/fi";
import Link from "next/link"; // Import Link for navigation

const projects = [
  {
    id: "01",
    title: "NEURAL_LINK",
    category: "AI_INTERFACE",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "AETHER_VOID",
    category: "WEB3_ARCHITECTURE",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "KANSO_PURE",
    category: "UI_TRANSFORMATION",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "CORE_FEED",
    category: "DATA_VISUALIZATION",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "05",
    title: "PROTOCOL_Z",
    category: "SECURITY_ENCRYPTION",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function ProjectsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 300 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 300 });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setHoveredIndex(0);
        setIsCursorVisible(false);
      }}
      className="relative min-h-screen bg-black py-20 flex flex-col justify-center cursor-none"
    >
      {/* --- HUD HEADER --- */}
      <div className="w-full px-10 md:px-16 mb-10 flex justify-between items-end relative z-10">
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 opacity-50 font-azeretmono text-[9px] tracking-[0.4em] text-white uppercase">
                <span className="w-1.5 h-1.5 bg-[#ee502c] rounded-full animate-pulse" />
                Archive_System
            </div>
            <h2 className="font-unbounded font-black text-4xl md:text-5xl text-[#ee502c] uppercase tracking-tighter">
                Featured <span className="text-white">Work</span>
            </h2>
        </div>
        <div className="hidden md:block font-azeretmono text-[8px] text-white/20 tracking-[0.5em] uppercase">
            [ Index_List_v1.0 ]
        </div>
      </div>

      {/* --- DYNAMIC HEIGHT PROJECT ROW --- */}
      <div 
        className="flex w-full h-[85vh] items-center px-0 gap-1 lg:gap-2"
        onMouseEnter={() => setIsCursorVisible(true)}
        onMouseLeave={() => setIsCursorVisible(false)}
      >
        {projects.map((project, index) => {
          const isHovered = hoveredIndex === index;
          const isNeighbor = Math.abs(hoveredIndex - index) === 1;

          // Grayscale Logic as per your request:
          // Hovered: 0 | Neighbor (Affected): 0.5 | Others: 1.0
          const grayscaleValue = isHovered ? 0 : isNeighbor ? 0.5 : 1;

          return (
            <motion.div
              key={project.id}
              onMouseEnter={() => setHoveredIndex(index)}
              layout
              animate={{
                height: isHovered ? "75vh" : isNeighbor ? "55vh" : "40vh",
                flex: isHovered ? 8 : isNeighbor ? 3 : 2,
              }}
              transition={{ 
                type: "spring",
                stiffness: 150,
                damping: 25,
                mass: 0.8
              }}
              className="relative overflow-hidden group border-x border-white/5 bg-zinc-900"
            >
              {/* Wrapping content in Link for redirection */}
              <Link href="/projects" className="block w-full h-full relative cursor-none">
                <motion.img 
                  layout
                  src={project.image} 
                  alt={project.title} 
                  style={{ filter: `grayscale(${grayscaleValue})` }} // Dynamic Filter
                  className={`w-full h-full object-cover transition-all duration-1000 ${isHovered ? 'scale-100 brightness-100' : 'scale-125 brightness-50'}`}
                />

                <div className={`absolute inset-0 bg-black transition-opacity duration-700 ${isHovered ? 'opacity-0' : 'opacity-40'}`} />
                <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-90' : 'opacity-0'}`} />

                <AnimatePresence>
                  {isHovered && (
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 p-8 flex flex-col justify-end pointer-events-none"
                    >
                      <div className="flex flex-col items-start gap-4">
                          <span className="font-azeretmono text-[10px] text-[#ee502c] tracking-[0.5em] uppercase">
                              Project_Ref: {project.id}
                          </span>
                          <h3 className="font-unbounded font-black text-3xl md:text-5xl lg:text-6xl text-white uppercase leading-none tracking-tighter">
                              {project.title}
                          </h3>
                          <div className="flex items-center gap-6 mt-2">
                             <div className="w-16 h-px bg-white/20" />
                             <span className="font-azeretmono text-[9px] text-white/40 tracking-[0.2em]">{project.category}</span>
                          </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isHovered && (
                   <div className="absolute top-6 left-1/2 -translate-x-1/2 font-azeretmono text-[10px] text-white/20 group-hover:text-[#ee502c] transition-colors">
                      {project.id}
                   </div>
                )}
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* --- HUD CURSOR --- */}
      <AnimatePresence>
        {isCursorVisible && (
          <motion.div
            style={{ left: smoothX, top: smoothY }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed z-[200] pointer-events-none -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative flex flex-col items-center gap-4">
                <div className="w-20 h-20 border-[0.5px] border-white/30 rounded-full flex items-center justify-center relative">
                    <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]" />
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-px h-2 bg-white" />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-px h-2 bg-white" />
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                      className="absolute inset-0 border border-dashed border-white/10 rounded-full"
                    />
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full shadow-2xl">
                    <span className="font-azeretmono text-[9px] font-black text-white tracking-[0.3em] uppercase">
                      VIEW_PROJ_71
                    </span>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}