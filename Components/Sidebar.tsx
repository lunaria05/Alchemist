"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiArrowUpRight, FiArrowRight } from "react-icons/fi";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import logo from "@/app/assets/logo.png";
import { motion } from "framer-motion";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { id: "I.", label: "SERVICES", href: "/services" },
  { id: "II.", label: "PROJECTS", href: "/projects" },
  { id: "III.", label: "ABOUT US", href: "/about-us" },
  { id: "IV.", label: "CONTACT US", href: "/contact-us" },
  { id: "V.", label: "BLOGS", href: "/blogs" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Handle body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  return (
    <>
      {/* --- MOBILE CUSTOM SWITCH TOGGLE (Top-Left) --- */}
      <div className="md:hidden fixed top-8 left-6 z-[260]">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "relative w-19 h-9 rounded-full flex items-center px-1.5 cursor-pointer transition-all duration-500 overflow-hidden outline-none",
            "bg-[#0a0a0a] border border-white/10 hover:border-white/20 shadow-2xl group",
            isOpen ? "border-[#ee502c]/30" : "border-white/10"
          )}
        >
          <span className={cn(
            "relative z-20 font-azeretmono font-bold text-[9px] tracking-[0.15em] transition-all duration-500 pl-1.5",
            isOpen ? "text-white/40" : "text-white/90"
          )}>
            MENU
          </span>

          <div className={cn(
            "absolute right-1.5 w-6 h-6 rounded-full transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
            "flex items-center justify-center",
            isOpen 
              ? "translate-x-0 bg-[#ee502c] shadow-[0_0_15px_rgba(238,80,44,0.5)]" 
              : "translate-x-[-38px] bg-zinc-700"
          )}>
            <div className={cn(
              "w-1 h-1 rounded-full transition-colors",
              isOpen ? "bg-black/40" : "bg-white/20"
            )} />
          </div>
        </button>
      </div>

      {/* --- MOBILE FULL-SCREEN MENU --- */}
      <div className={cn(
    "fixed inset-0 z-[250] md:hidden transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]",
    isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
)}>
    {/* Background with subtle technical texture */}
    <div className="absolute inset-0 bg-[#050505] backdrop-blur-3xl" />
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
         style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

    <div className="relative h-full flex flex-col px-6 py-8 overflow-hidden">
        
        {/* --- 1. HEADER: SYSTEM STATUS (Fixed) --- */}
        <div className="pt-16 pb-6 border-b border-white/5 flex justify-between items-center shrink-0">
            <div className="flex flex-col gap-1">
                <span className="font-azeretmono text-[8px] tracking-[0.4em] text-[#ee502c] uppercase">System_Active</span>
                <span className="font-azeretmono text-[10px] text-white/40 uppercase tracking-widest">Alchemist_Terminal_v4.0</span>
            </div>
            <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                    <motion.div 
                        key={i}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                        className="w-1 h-1 bg-[#ee502c] rounded-full"
                    />
                ))}
            </div>
        </div>

        {/* --- 2. MAIN NAV: DATA MODULES (Scrollable if height is small) --- */}
        <nav className="flex-1 overflow-y-auto no-scrollbar py-6 space-y-2">
            
            {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isOpen ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.05 + 0.3 }}
                    >
                        <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                "group relative flex items-center justify-between p-3 border border-white/5 transition-all duration-500",
                                isActive ? "bg-white/3 border-[#ee502c]/30" : "bg-white/3 hover:bg-white/1"
                            )}
                        >
                            {/* Active Indicator Line */}
                            <div className={cn(
                                "absolute left-0 top-0 h-full w-[2px] transition-all duration-500",
                                isActive ? "bg-[#ee502c]" : "bg-transparent group-hover:bg-white/10"
                            )} />

                            <div className="flex flex-col">
                                {/* <span className="font-azeretmono text-[9px] text-[#ee502c] font-bold opacity-50 uppercase tracking-tighter">
                                    Idx_{item.id}
                                </span> */}
                                <span className={cn(
                                    "font-azeretmono text-base font-medium tracking-widest transition-colors duration-500",
                                    isActive ? "text-white" : "text-white/40 group-hover:text-white"
                                )}>
                                    {item.label}
                                </span>
                            </div>

                            <div className="flex flex-col items-end gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                                <span className="font-azeretmono text-[6px] text-white uppercase tracking-widest">
                                    {isActive ? "Connected" : "Standby"}
                                </span>
                                <FiArrowRight size={14} className={cn(
                                    "transition-transform",
                                    isActive ? "text-[#ee502c]" : "text-white group-hover:translate-x-1"
                                )} />
                            </div>
                        </Link>
                    </motion.div>
                );
            })}
        </nav>

        {/* --- 3. FOOTER: INTERFACE META (Fixed) --- */}
        <div className="pt-6 border-t border-white/5 shrink-0 flex flex-col gap-6">

            {/* Industrial Minimalist Connect Button */}
            <Link 
                href="/contact" 
                onClick={() => setIsOpen(false)} 
                className="group relative flex items-center justify-between border border-white/20 h-14 px-5 overflow-hidden transition-all hover:border-[#ee502c]/50 active:scale-95"
            >
                {/* Scanning background effect */}
                <motion.div 
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/3 to-transparent pointer-events-none"
                />
                
                <span className="relative z-10 font-azeretmono text-[10px] font-black text-white tracking-[0.4em] uppercase">
                    Connect Protocol
                </span>
                <FiArrowUpRight size={18} className="relative z-10 text-[#ee502c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
        </div>
    </div>
</div>

      {/* --- DESKTOP SIDEBAR --- */}
      <aside className={cn(
          "fixed left-0 top-0 h-screen bg-black border-r border-white/10 z-[250] transition-all duration-500 ease-in-out hidden md:flex flex-col",
          "w-[70px] md:w-[80px] xl:w-[90px]"
      )}>
        <Link href="/" className="h-[10vh] flex items-center justify-center border-b border-white/5 shrink-0 p-2">
            <Image src={logo} alt="Logo" className="w-auto h-full aspect-square object-contain"/>
        </Link>

        <nav className="flex-1 flex flex-col w-full">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center justify-center w-full transition-all duration-700 ease-in-out group border-b border-white/5",
                  isActive ? "flex-3 bg-white/3" : "flex-1 hover:bg-white/2"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 w-[4px] h-full bg-[#ee502c] shadow-[4px_0_20px_rgba(238,80,44,0.8)]" />
                )}
                
                {/* --- THE TOASTER (TO THE RIGHT) --- */}
                <div className="absolute left-[110%] pointer-events-none opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out z-50 hidden md:block">
                    <div className="relative bg-[#111] border border-white/10 px-5 py-2.5 rounded-r-md shadow-[20px_0_50px_rgba(0,0,0,0.5)] flex items-center gap-3">
                        {/* Orange Toaster Accent */}
                        <div className="absolute left-0 top-0 w-[2px] h-full bg-[#ee502c]" />
                        <span className="text-white font-azeretmono text-xs font-bold tracking-widest whitespace-nowrap">
                            {item.label}
                        </span>
                        
                        {/* Decorative triangle pointing to sidebar */}
                        <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-r-[6px] border-r-[#ee502c] border-b-[5px] border-b-transparent"></div>
                    </div>
                </div>

                <div className={cn("flex flex-col items-center justify-center transition-all duration-500", isActive ? "gap-6" : "gap-0")}>
                  <span className={cn("text-[11px] md:text-sm font-bold tracking-widest", isActive ? "text-[#ee502c]" : "text-zinc-500 group-hover:text-zinc-200")}>
                    {item.id}
                  </span>
                  <div className={cn("overflow-hidden transition-all duration-700 flex items-center justify-center", isActive ? "opacity-100 max-h-[300px]" : "opacity-0 max-h-0")}>
                    <span className="whitespace-nowrap font-azeretmono font-bold tracking-[0.3em] text-white text-[11px] md:text-xs lg:text-sm [writing-mode:vertical-lr] rotate-180 uppercase">
                        {item.label}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>

        <Link href="/contact" className="w-full bg-[#ee502c] hover:bg-[#ff6241] transition-all duration-300 py-8 flex flex-col items-center justify-center gap-4 shrink-0 group relative overflow-hidden">
          <span className="[writing-mode:vertical-lr] font-azeretmono rotate-180 text-black font-black tracking-tighter text-sm md:text-base">
            LET'S CONNECT
          </span>
          <FiArrowUpRight className="text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={24} />
        </Link>
      </aside>
    </>
  );
}