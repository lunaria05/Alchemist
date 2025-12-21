"use client";

import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FiArrowUpRight } from "react-icons/fi";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import logo from "@/app/assets/logo.png";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { id: "I.", label: "ALCHEMIST" },
  { id: "II.", label: "SERVICES" },
  { id: "III.", label: "MISSION" },
  { id: "IV.", label: "VISION" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      {/* MOBILE MENU ICON */}
      <div className="md:hidden fixed top-4 left-4 z-[100]">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-white p-3 bg-[#ee502c] rounded-lg shadow-lg active:scale-95 transition-transform"
        >
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-black border-r border-white/10 z-[90] transition-all duration-500 ease-in-out flex flex-col",
          "w-[70px] md:w-[80px] lg:w-[90px]", 
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* 1. HEADER */}
        <div className="h-[10vh] flex items-center justify-center border-b border-white/5 shrink-0 p-2">
            <Image src={logo} alt="Logo" className="w-auto h-full aspect-square object-contain"/>
        </div>

        {/* 2. NAVIGATION */}
        <nav className="flex-1 flex flex-col w-full">
          {navItems.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={item.id}
                onClick={() => {
                    setActiveIndex(index);
                    setIsOpen(false);
                }}
                className={cn(
                  "relative flex flex-col items-center justify-center w-full transition-all duration-700 ease-in-out group border-b border-white/5 outline-none",
                  isActive ? "flex-3 bg-white/3" : "flex-1 hover:bg-white/2"
                )}
              >
                {/* ACTIVE INDICATOR LINE */}
                {isActive && (
                  <div className="absolute left-0 top-0 w-[4px] h-full bg-[#ee502c] shadow-[4px_0_20px_rgba(238,80,44,0.8)]" />
                )}

                {/* --- THE TOASTER (TO THE RIGHT) --- */}
                <div className="absolute left-[110%] pointer-events-none opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out z-[110] hidden md:block">
                    <div className="relative bg-[#111] border border-white/10 px-5 py-2.5 rounded-r-md shadow-[20px_0_50px_rgba(0,0,0,0.5)] flex items-center gap-3">
                        {/* Orange Toaster Accent */}
                        <div className="absolute left-0 top-0 w-[2px] h-full bg-[#ee502c]" />
                        <span className="text-white font-parkinsans text-xs font-bold tracking-widest whitespace-nowrap">
                            {item.label}
                        </span>
                        
                        {/* Decorative triangle pointing to sidebar */}
                        <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-r-[6px] border-r-[#ee502c] border-b-[5px] border-b-transparent"></div>
                    </div>
                </div>

                {/* SIDEBAR CONTENT */}
                <div className={cn(
                    "flex flex-col items-center justify-center transition-all duration-500",
                    isActive ? "gap-6" : "gap-0"
                )}>
                  <span className={cn(
                    "text-[11px] md:text-sm font-bold tracking-widest transition-colors duration-300",
                    isActive ? "text-[#ee502c]" : "text-zinc-500 group-hover:text-zinc-200"
                  )}>
                    {item.id}
                  </span>

                  {/* VERTICAL LABEL (Shown when active) */}
                  <div className={cn(
                      "overflow-hidden transition-all duration-700 flex items-center justify-center",
                      isActive ? "opacity-100 max-h-[300px]" : "opacity-0 max-h-0"
                  )}>
                    <span className="whitespace-nowrap font-parkinsans font-bold tracking-[0.3em] text-white text-[11px] md:text-xs lg:text-sm [writing-mode:vertical-lr] rotate-180 uppercase">
                        {item.label}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* 3. LET'S CONNECT BUTTON */}
        <button className="w-full bg-[#ee502c] hover:bg-[#ff6241] transition-all duration-300 py-8 flex flex-col items-center justify-center gap-4 shrink-0 group relative overflow-hidden">
          <span className="[writing-mode:vertical-lr] font-parkinsans rotate-180 text-black font-black tracking-tighter text-sm md:text-base">
            LET'S CONNECT
          </span>
          <FiArrowUpRight className="text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={24} />
          
          {/* Subtle Shine for button */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </button>
      </aside>

      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[80] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}