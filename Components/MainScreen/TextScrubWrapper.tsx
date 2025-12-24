"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TextScrubSection from "./TextScrubSection";

export default function TextScrubWrapper() {
  const triggerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the trigger element
  const { scrollYProgress } = useScroll({
    target: triggerRef,
    offset: ["start end", "end start"]
  });

  // Slide up from bottom: starts at 100vh (below screen), ends at 0 (on screen)
  const translateY = useTransform(scrollYProgress, [0, 0.5], ["100vh", "0vh"]);

  // Opacity fade in as it slides up
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <>
      {/* Scroll trigger - this takes up space in document flow */}
      <div ref={triggerRef} className="h-[100vh] pointer-events-none" />

      {/* Fixed positioned text section that slides up */}
      <motion.div
        style={{
          translateY,
          opacity
        }}
        className="fixed bottom-0 left-0 right-0 z-[150] pointer-events-none"
      >
        <div className="pointer-events-auto">
          <TextScrubSection />
        </div>
      </motion.div>
    </>
  );
}
