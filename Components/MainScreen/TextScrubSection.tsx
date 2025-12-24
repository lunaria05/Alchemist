"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

// Individual Word Component with Modern Depth
const Word = ({ children, progress, range }: { children: string, progress: any, range: [number, number] }) => {
  // Brand Keywords to highlight in Orange
  const isPowerWord = ["Gold", "Magic", "Digital", "Transmute", "Creativity"].includes(children.replace(/[^a-zA-Z]/g, ""));
  const activeColor = isPowerWord ? "#ee502c" : "#ffffff";

  // Optical Transitions: Blur clears and Scale stabilizes as color turns White/Orange
  const opacity = useTransform(progress, range, [0.05, 1]);
  const color = useTransform(progress, range, ["#18181b", activeColor]); // Emerges from deep shadow
  const scale = useTransform(progress, range, [0.92, 1]);
  const blur = useTransform(progress, range, ["blur(12px)", "blur(0px)"]);

  return (
    <motion.span 
      style={{ opacity, color, scale, filter: blur }} 
      className="inline-block mx-[0.2em] transition-all duration-500 ease-out"
    >
      {children}
    </motion.span>
  );
};

export default function TextScrubSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // OFFSET TWEAK: "start start" means the animation begins 
  // ONLY when the top of this section reaches the top of the viewport.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth the scroll for a more "liquid" feel
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  const text1 = "Transmute Your Ideas Into Digital Gold".split(" ");
  const text2 = "Where Code Meets Creativity, Magic Happens".split(" ");

  // Visibility Crossfade (Timing adjusted for longer scroll)
  const text1Opacity = useTransform(smoothProgress, [0, 0.4, 0.48], [1, 1, 0]);
  const text2Opacity = useTransform(smoothProgress, [0.52, 0.6, 1], [0, 1, 1]);

  // Grid opacity animation: starts low, peaks in middle, ends low
  const gridOpacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.15, 0.5, 0.5, 0.15]);

  return (
    <section
      ref={containerRef}
      className="relative bg-black min-h-[400vh]"
    >

      {/* Sticky container stays in place while you scroll through the 400vh */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-6 md:px-12">

        {/* --- ANIMATED GRID BACKGROUND --- */}
        <motion.div
          style={{ opacity: gridOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          {/* Main Grid Pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
          />

          {/* Accent Grid - Larger cells */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(rgba(238, 80, 44, 0.08) 2px, transparent 2px), linear-gradient(90deg, rgba(238, 80, 44, 0.08) 2px, transparent 2px)',
              backgroundSize: '200px 200px'
            }}
          />

          {/* Radial Dot Grid Overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 0)',
              backgroundSize: '100px 100px'
            }}
          />
        </motion.div>
        
        {/* Corner HUD Calibration Marks */}
        <div className="absolute top-10 left-10 w-16 h-16 border-t border-l border-white/10" />
        <div className="absolute bottom-10 right-10 w-16 h-16 border-b border-r border-white/10" />

        {/* --- MAIN TEXT ENGINE --- */}
        <div className="relative w-full max-w-7xl flex items-center justify-center">
          
          {/* SLOGAN 1: Heavy Industrial Design */}
          <motion.h2 
            style={{ opacity: text1Opacity }}
            className="absolute inset-0 flex flex-wrap justify-center items-center text-center font-unbounded font-black uppercase tracking-tighter leading-[0.95]
                       text-[clamp(2rem,9vw,6.5rem)]" 
          >
            {text1.map((w, i) => {
              const start = (i / text1.length) * 0.38;
              const end = ((i + 1) / text1.length) * 0.38;
              return <WordText key={i} word={w} progress={smoothProgress} range={[start, end]} />;
            })}
          </motion.h2>

          {/* SLOGAN 2: Elegant Editorial Design */}
          <motion.h2 
            style={{ opacity: text2Opacity }}
            className="flex flex-wrap justify-center items-center text-center font-unbounded font-black uppercase tracking-tighter leading-[0.95]
                       text-[clamp(1.8rem,8vw,6rem)]"
          >
            {text2.map((w, i) => {
              const start = 0.6 + (i / text2.length) * 0.35;
              const end = 0.6 + ((i + 1) / text2.length) * 0.35;
              return <WordText key={i} word={w} progress={smoothProgress} range={[start, end]} />;
            })}
          </motion.h2>

        </div>

        {/* --- BOTTOM TELEMETRY --- */}
        <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end pointer-events-none opacity-40">
            <div className="flex flex-col gap-1 font-azeretmono text-[8px] tracking-[0.3em] uppercase">
                <span>Phase: Reveal_Sequence</span>
                <span>Buffer: Active_ALC</span>
            </div>
            
            {/* Center Scroll Progress Bar */}
            <div className="h-px bg-white/5 flex-1 mx-20 mb-1 relative overflow-hidden hidden md:block">
                <motion.div 
                    style={{ scaleX: smoothProgress }}
                    className="absolute inset-0 bg-[#ee502c] origin-left"
                />
            </div>

            <div className="font-azeretmono text-[8px] tracking-[0.4em] uppercase text-[#ee502c]">
                Status: {Math.floor(smoothProgress.get() * 100)}%
            </div>
        </div>
      </div>
    </section>
  );
}

// Wrapper to fix naming consistency with your provided code
function WordText({ word, progress, range }: { word: string, progress: any, range: [number, number] }) {
    const cleanWord = word.replace(/[^a-zA-Z]/g, "");
    const isPowerWord = ["Gold", "Magic", "Digital", "Transmute", "Creativity"].includes(cleanWord);
    const activeColor = isPowerWord ? "#ee502c" : "#ffffff";

    const opacity = useTransform(progress, range, [0.1, 1]);
    const color = useTransform(progress, range, ["#27272a", activeColor]);
    const scale = useTransform(progress, range, [0.95, 1]);
    const blur = useTransform(progress, range, ["blur(10px)", "blur(0px)"]);

    return (
      <motion.span style={{ opacity, color, scale, filter: blur }} className="inline-block mx-[0.15em]">
        {word}
      </motion.span>
    );
}