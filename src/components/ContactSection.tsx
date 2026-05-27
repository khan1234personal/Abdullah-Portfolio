import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle2, Mail, Phone, MapPin, Loader2, Sparkles } from "lucide-react";
import { CONTACT_INFO } from "../data";

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      alert("Please provide required values.");
      return;
    }

    setIsLoading(true);

    // Dynamic timeout simulating delivery pipeline
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      // Clean form state
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 1800);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Contact Info Coordinates Col */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-slate-100/50 p-6 rounded-2xl border border-slate-200/40 space-y-5">
            <h3 className="text-lg font-bold text-slate-800 tracking-tight flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-sky-500 animate-pulse" />
              Direct Node Coordinates
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Recruiters and engineers have direct channels to trigger pipelines. Reach out for projects, contract developer positions, or full-time Full Stack work.
            </p>

            <div className="space-y-4 pt-2">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-3 bg-white hover:bg-slate-50 border border-slate-200/50 p-3.5 rounded-xl text-slate-600 hover:text-sky-600 hover:-translate-y-0.5 transition-all shadow-sm"
              >
                <div className="p-2 rounded-lg bg-sky-50 text-sky-500">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-bold leading-none">
                    E-Mail
                  </span>
                  <span className="text-xs font-semibold select-all font-mono truncate block mt-1">
                    {CONTACT_INFO.email}
                  </span>
                </div>
              </a>

              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center gap-3 bg-white hover:bg-slate-50 border border-slate-200/50 p-3.5 rounded-xl text-slate-600 hover:text-sky-600 hover:-translate-y-0.5 transition-all shadow-sm"
              >
                <div className="p-2 rounded-lg bg-teal-50 text-teal-500">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-bold leading-none">
                    Hotline Call
                  </span>
                  <span className="text-xs font-semibold font-mono truncate block mt-1">
                    {CONTACT_INFO.phone}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl text-slate-600 shadow-sm border border-slate-200/50">
                <div className="p-2 rounded-lg bg-slate-50 text-slate-400">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-bold leading-none">
                    Headquarters
                  </span>
                  <span className="text-xs font-semibold font-mono block mt-1">
                    {CONTACT_INFO.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Form Col with Success states */}
        <div className="md:col-span-7">
          <div className="bg-white/75 backdrop-blur-md rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Your Identity *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-700 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-sky-400 focus:border-sky-400 font-sans"
                        placeholder="Elon Musk"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Your E-Mail *
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-700 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-sky-400 focus:border-sky-400 font-mono"
                        placeholder="elon@spacex.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Subject Matter
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-700 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-sky-400 focus:border-sky-400 font-sans"
                      placeholder="Agile developer hiring proposal"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Transmission Packet *
                    </label>
                    <textarea
                      required
                      rows={4}
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-700 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-sky-400 focus:border-sky-400 font-sans"
                      placeholder="Type details of your requirement..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-sky-500 hover:bg-sky-600 active:scale-98 disabled:opacity-70 text-white font-mono text-xs py-3 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-sky-100 hover:shadow-sky-200 transition-all font-bold focus:outline-none"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4.5 w-4.5 animate-spin" />
                          COMPILING PACKAGE...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          LAUNCH TRANSMISSION
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-10 text-center flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100 mb-4 animate-bounce">
                    <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">
                    Transmission Secured!
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-1 mb-6">
                    K-ROUTE DELIVERED SUCCESSFULLY // SECURE SHIELD ACTIVE
                  </p>
                  
                  <div className="bg-slate-50 border border-slate-200/50 p-4.5 rounded-xl font-mono text-xs text-slate-600 max-w-sm text-left leading-relaxed space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400 border-b border-slate-200 pb-1.5 mb-1.5 uppercase font-bold">
                      <span>Receipt Log</span>
                      <span>MD5: {Math.floor(Math.random() * 90000) + 10000}</span>
                    </div>
                    <p><strong>Status:</strong> Delivered to Khan Abdullah</p>
                    <p><strong>Pipeline:</strong> Direct client-side bypass</p>
                    <p><strong>Latency:</strong> {(Math.random() * 200 + 100).toFixed(0)} ms</p>
                  </div>

                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-xs font-mono font-bold text-sky-500 hover:text-sky-600 hover:underline mt-6 cursor-pointer"
                  >
                    Send another transmission package &rarr;
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
