"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowRight, FiGithub, FiTwitter, FiLinkedin, FiInstagram } from "react-icons/fi";

export default function HeroContent() {
  const { scrollYProgress } = useScroll();

  // Hide earlier when globe particle formation starts
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.12], [1, 0.6, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.12], [1, 0.92]);
  const blur = useTransform(scrollYProgress, [0, 0.08, 0.12], ["blur(0px)", "blur(4px)", "blur(12px)"]);
  const translateY = useTransform(scrollYProgress, [0, 0.12], [0, -30]);

  const socialLinks = [{ icon: <FiGithub />, href: "#" }, { icon: <FiTwitter />, href: "#" }, { icon: <FiLinkedin />, href: "#" }, { icon: <FiInstagram />, href: "#" }];

  return (
    <motion.div
      style={{ opacity, scale, filter: blur, y: translateY }}
      /* 
         FIXED PADDING: 
         - Mobile: pb-32 (Extra room for the 70px bottom carousel)
         - Desktop: pb-12 md:pb-16
      */
      className="relative h-screen w-full flex flex-col lg:flex-row items-end justify-end lg:justify-between px-6 md:px-16 lg:pr-[150px] 2xl:pr-[200px] pb-32 md:pb-16 lg:pb-20 z-10 pointer-events-none"
    >
      {/* ... Left Side Content (Keep same) ... */}
      <div className="w-full lg:w-[55%] 2xl:w-[60%] flex flex-col items-start mb-12 lg:mb-0">
          {/* Your motion.div and h1 code here... */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="flex flex-col"
          >
            <span className="font-azeretmono text-[9px] md:text-[10px] tracking-[0.6em] text-[#ee502c] mb-4 md:mb-6 uppercase opacity-80 ml-1 md:ml-2">
              Kanso labs
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-[40px] xl:text-[52px] 2xl:text-[68px] leading-[1.1] tracking-tight font-unbounded text-white ">
              Crafting <span className="text-zinc-600">Code.</span> <br />
              Engineering <span className="text-zinc-600">AI.</span> <br />
              <span className="text-[#ee502c]">Designing Magic.</span>
            </h1>
          </motion.div>
      </div>

      {/* --- RIGHT SIDE --- */}
      <div className="w-full lg:w-[38%] xl:w-[42%] flex flex-col items-start lg:items-end">
        {/* Your Mission Brief and Social Matrix code here... */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="group relative w-full lg:max-w-sm">
           {/* ... existing mission brief code ... */}
           <div className="relative px-6 xl:px-8 2xl:px-10 py-8 lg:py-12 overflow-visible">
              {/* Lines and Content Area */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-[80%] bg-gradient-to-b from-transparent via-[#ee502c]/50 to-transparent" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-[80%] bg-gradient-to-b from-transparent via-[#ee502c]/50 to-transparent" />
              <div className="relative z-10 lg:text-right">
                <h2 className="font-azeretmono text-[10px] xl:text-xs font-bold tracking-[0.3em] text-[#ee502c] mb-4 uppercase">[ Mission_Brief ]</h2>
                <p className="text-xs xl:text-sm max-w-sm lg:max-w-full leading-relaxed text-zinc-400 font-alexandria lg:ml-auto mb-8 opacity-90 group-hover:text-white transition-colors">
                  We will eliminate all the clutter in the backend and make your brand look simple & pure.
                </p>
                <div className="flex justify-start lg:justify-end">
                  <button className="pointer-events-auto group/btn relative flex items-center gap-6 bg-transparent border border-white/10 hover:border-[#ee502c] px-6 py-3 rounded-sm overflow-hidden transition-colors duration-500">
                    <div className="absolute inset-0 bg-[#ee502c] translate-x-[-101%] group-hover/btn:translate-x-0 transition-transform duration-500 ease-out" />
                    <span className="relative z-10 font-azeretmono text-[9px] font-bold text-white group-hover/btn:text-black uppercase">Initiate Protocol</span>
                    <FiArrowRight className="relative z-10 text-[#ee502c] group-hover/btn:text-black" />
                  </button>
                </div>
              </div>
           </div>
        </motion.div>

        {/* Social Matrix (Pointer events auto on link container) */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4 md:gap-6 mt-6 lg:mt-2 pr-2 pointer-events-auto">
           {/* ... social links loop ... */}
           <div className="flex gap-4 md:gap-5">
             {socialLinks.map((social, i) => (
               <a key={i} href={social.href} className="text-zinc-600 hover:text-[#ee502c] text-base md:text-lg transition-all">{social.icon}</a>
             ))}
           </div>
        </motion.div>
      </div>

      {/* FOOTER LINE: Adjusted for bottom bar */}
      <div className="absolute bottom-24 md:bottom-16 lg:bottom-6 left-6 md:left-16 w-[calc(100%-48px)] lg:w-[calc(100%-250px)] h-px bg-gradient-to-r from-[#ee502c]/50 via-white/5 to-transparent pointer-events-none opacity-30" />
    </motion.div>
  );
}