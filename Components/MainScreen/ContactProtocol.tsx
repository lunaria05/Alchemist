"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiMail, FiCalendar, FiArrowRight, FiTerminal, FiCheckCircle, FiArrowUpRight } from "react-icons/fi";

export default function ContactProtocol() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Custom scrollbar for textarea - Firefox support */
          .custom-scrollbar-textarea {
            scrollbar-width: thin;
            scrollbar-color: rgba(238, 80, 44, 0.3) transparent;
          }

          .custom-scrollbar-textarea:hover {
            scrollbar-color: rgba(238, 80, 44, 0.5) transparent;
          }
        `
      }} />

      <section className="relative min-h-screen w-full flex items-center justify-center py-24 px-6 md:px-20 overflow-hidden bg-black/40">
      {/* HUD Frame Decorations */}
      <div className="absolute hidden lg:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[80vh] border border-white/5 pointer-events-none">
        <div className="absolute top-0 left-0 w-12 h-px bg-[#ee502c]" />
        <div className="absolute top-0 left-0 w-px h-12 bg-[#ee502c]" />
        <div className="absolute bottom-0 right-0 w-12 h-px bg-[#ee502c]" />
        <div className="absolute bottom-0 right-0 w-px h-12 bg-[#ee502c]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* --- LEFT: TERMINAL COMMUNICATION (Non-traditional Form) --- */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="font-azeretmono text-[10px] tracking-[0.5em] text-[#ee502c] uppercase">Link_Protocol</span>
            <h2 className="font-unbounded font-black text-4xl md:text-6xl text-white uppercase tracking-tighter">
              Direct <br /><span className="text-[#ee502c] italic">Sync.</span>
            </h2>
          </div>

          <div className="relative bg-zinc-950/50 backdrop-blur-2xl border border-white/10 p-8 rounded-sm overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ee502c]/50 to-transparent" />
            
            {!isSubmitted ? (
              <div className="flex flex-col gap-10">
                <div className="flex items-center gap-4 text-zinc-500 font-azeretmono text-xs">
                  <FiTerminal className="text-[#ee502c]" />
                  <span>ALC_COMM_V2.0_READY</span>
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="name" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-4">
                      <label className="font-azeretmono text-[10px] uppercase text-zinc-500 tracking-widest">Identify_Subject</label>
                      <input
                        type="text"
                        placeholder="ENTER_YOUR_NAME..."
                        className="bg-transparent border-b border-white/20 py-4 font-unbounded text-xl md:text-2xl outline-none focus:border-[#ee502c] transition-colors uppercase text-white"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                      <div className="flex justify-between items-center mt-4">
                        <span className="font-azeretmono text-[9px] text-zinc-600 tracking-widest">STEP 1/3</span>
                        <button
                          onClick={handleNext}
                          className="flex cursor-pointer items-center gap-3 text-[#ee502c] font-azeretmono text-xs tracking-widest hover:translate-x-2 transition-transform disabled:opacity-30 disabled:pointer-events-none"
                          disabled={!formData.name.trim()}
                        >
                          NEXT_STEP <FiArrowRight />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="email" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-4">
                      <label className="font-azeretmono text-[10px] uppercase text-zinc-500 tracking-widest">Routing_Address</label>
                      <input
                        type="email"
                        placeholder="ENTER_EMAIL_ADDR..."
                        className="bg-transparent border-b border-white/20 py-4 font-unbounded text-xl md:text-2xl outline-none focus:border-[#ee502c] transition-colors uppercase text-white"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setStep(1)}
                            className="flex cursor-pointer items-center gap-2 text-zinc-500 font-azeretmono text-xs tracking-widest hover:-translate-x-2 transition-transform hover:text-white"
                          >
                            <FiArrowRight className="rotate-180" /> BACK
                          </button>
                          <span className="font-azeretmono text-[9px] text-zinc-600 tracking-widest">STEP 2/3</span>
                        </div>
                        <button
                          onClick={handleNext}
                          className="flex cursor-pointer items-center gap-3 text-[#ee502c] font-azeretmono text-xs tracking-widest hover:translate-x-2 transition-transform disabled:opacity-30 disabled:pointer-events-none"
                          disabled={!formData.email.trim()}
                        >
                          NEXT_STEP <FiArrowRight />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="msg" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-4">
                      <label className="font-azeretmono text-[10px] uppercase text-zinc-500 tracking-widest">Encryption_Data</label>
                      <textarea
                        placeholder="DESCRIBE_YOUR_VISION..."
                        className="custom-scrollbar-textarea bg-transparent border-b border-white/20 py-4 font-unbounded text-lg outline-none focus:border-[#ee502c] transition-colors uppercase text-white resize-none
                        h-32 max-h-32 overflow-y-auto
                        [&::-webkit-scrollbar]:w-1.5
                        [&::-webkit-scrollbar-track]:bg-transparent
                        [&::-webkit-scrollbar-thumb]:bg-[#ee502c]/30
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb:hover]:bg-[#ee502c]/50"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                      <div className="flex flex-col gap-4 mt-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => setStep(2)}
                              className="flex cursor-pointer items-center gap-2 text-zinc-500 font-azeretmono text-xs tracking-widest hover:-translate-x-2 transition-transform hover:text-white"
                            >
                              <FiArrowRight className="rotate-180" /> BACK
                            </button>
                            <span className="font-azeretmono text-[9px] text-zinc-600 tracking-widest">STEP 3/3</span>
                          </div>
                        </div>
                        <button
                          onClick={handleSubmit}
                          className="bg-[#ee502c] cursor-pointer text-black font-unbounded font-bold py-4 px-8 rounded-sm hover:bg-white transition-all active:scale-95 flex items-center justify-center gap-4 disabled:opacity-50 disabled:pointer-events-none"
                          disabled={!formData.message.trim()}
                        >
                          SEND_PROTOCOL <FiArrowRight />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center gap-4">
                <FiCheckCircle size={48} className="text-[#ee502c] mb-4" />
                <h3 className="font-unbounded font-bold text-2xl text-white">DATA_TRANSMUTED</h3>
                <p className="font-azeretmono text-[10px] text-zinc-500 tracking-widest">We will decrypt your message shortly.</p>
                <button onClick={() => {setIsSubmitted(false); setStep(1)}} className="mt-8 text-xs font-azeretmono border-b border-[#ee502c] text-[#ee502c]">NEW_SYNC</button>
              </motion.div>
            )}
          </div>
        </div>

        {/* --- RIGHT: TEMPORAL LINK (Calendly) --- */}
        <div className="flex flex-col gap-8 h-full justify-end">
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-10 flex flex-col gap-8 relative overflow-hidden group">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#ee502c]/10 blur-[60px] rounded-full group-hover:bg-[#ee502c]/20 transition-all duration-1000" />
                
                <div className="flex flex-col gap-4">
                    <FiCalendar className="text-4xl text-[#ee502c]" />
                    <h3 className="font-unbounded font-bold text-2xl text-white tracking-tight uppercase">Temporal <br/> Link_</h3>
                    <p className="font-parkinsans text-zinc-500 text-sm leading-relaxed max-w-xs">
                        Skip the text and bridge the gap immediately. Open a temporal window into our lab for a deep-dive synchronization.
                    </p>
                </div>

                <a 
                  href="https://calendly.com/yourlink" 
                  target="_blank" 
                  className="mt-4 pointer-events-auto bg-transparent border border-[#ee502c] text-[#ee502c] py-5 px-8 rounded-sm font-azeretmono text-xs font-bold tracking-[0.3em] hover:bg-[#ee502c] hover:text-black transition-all flex items-center justify-between group/btn"
                >
                    INITIATE_MEETING
                    <FiArrowUpRight className="group-hover/btn:rotate-45 transition-transform" />
                </a>

                {/* Decorative binary data */}
                <div className="flex justify-between font-azeretmono text-[6px] text-white/10 uppercase tracking-widest mt-4">
                    <span>Availability: High</span>
                    <span>Zone: UTC-5</span>
                </div>
            </div>
        </div>

      </div>
    </section>
    </>
  );
}