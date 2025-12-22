"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiArrowUpRight, FiArrowRight } from "react-icons/fi";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import logo from "@/app/assets/logo.png";

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
      <div className="md:hidden fixed top-8 left-6 z-120">
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
          "fixed inset-0 z-100 md:hidden transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]",
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      )}>
        <div className="absolute inset-0 bg-black/98 backdrop-blur-2xl" />
        
        <div className="relative h-full flex flex-col p-8 pt-32">
            <nav className="flex-1 flex flex-col justify-center space-y-8">
                {navItems.map((item, index) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-5 group text-left"
                            style={{ 
                                transition: 'all 0.6s cubic-bezier(0.19,1,0.22,1)',
                                transitionDelay: isOpen ? `${index * 80}ms` : '0ms',
                                transform: isOpen ? 'translateY(0)' : 'translateY(30px)',
                                opacity: isOpen ? 1 : 0
                            }}
                        >
                            <span className="text-[#ee502c] font-azeretmono font-bold text-xl mb-1">{item.id}</span>
                            <span className={cn(
                                "text-3xl sm:text-5xl font-azeretmono font-medium transition-all duration-300",
                                isActive ? "text-white" : "text-zinc-800 group-hover:text-zinc-400"
                            )}>
                                {item.label}
                            </span>
                            <FiArrowRight className={cn(
                                "transition-all duration-500",
                                isActive ? "text-[#ee502c] opacity-100 translate-x-0 scale-125" : "opacity-0 -translate-x-4"
                            )} size={28} />
                        </Link>
                    );
                })}
            </nav>

            <div className={cn(
                "mt-auto pt-10 border-t border-white/5 flex flex-col gap-6 transition-all duration-1000 delay-500",
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
                <div className="flex justify-between items-center">
                   <p className="text-zinc-600 text-xs tracking-[0.3em] font-azeretmono uppercase">Est. 2025</p>
                   <p className="text-zinc-600 text-xs tracking-[0.3em] font-azeretmono uppercase">Alchemist Inc.</p>
                </div>
                <Link href="/contact" onClick={() => setIsOpen(false)} className="flex items-center justify-between bg-[#ee502c] py-4 px-6 rounded-3xl group active:scale-95 transition-all shadow-[0_20px_40px_rgba(238,80,44,0.15)]">
                    <span className="text-black font-bold text-lg sm:text-xl">LET'S CONNECT</span>
                    <FiArrowUpRight size={32} className="text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
            </div>
        </div>
      </div>

      {/* --- DESKTOP SIDEBAR --- */}
      <aside className={cn(
          "fixed left-0 top-0 h-screen bg-black border-r border-white/10 z-90 transition-all duration-500 ease-in-out hidden md:flex flex-col",
          "w-[70px] md:w-[80px] lg:w-[90px]"
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
                <div className="absolute left-[110%] pointer-events-none opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out z-110 hidden md:block">
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