import React from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  Award,
  BookOpen,
  Send,
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Terminal as TerminalIcon,
  Layers,
  Star,
  User,
  ExternalLink,
  ChevronRight,
  Briefcase
} from "lucide-react";

import Header from "./components/Header";
import ThreeDBackground from "./components/ThreeDBackground";
import TechUniverse3D from "./components/TechUniverse3D";
import ExperienceTimeline from "./components/ExperienceTimeline";
import ProjectsShowcase from "./components/ProjectsShowcase";
import TechTerminal from "./components/TechTerminal";
import ContactSection from "./components/ContactSection";
import TiltCard from "./components/TiltCard";

import {
  CERTIFICATES_LIST,
  CONTACT_INFO,
  EDUCATION_LIST,
  SKILL_GROUPS
} from "./data";

export default function App() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#f8fafc] text-slate-800 flex flex-col font-sans select-none overflow-x-hidden antialiased">
      {/* Dynamic Background Grid Constellations */}
      <ThreeDBackground />

      {/* Modern Sticky Navigation Header */}
      <Header />

      {/* SPACER FOR FIXED HEADER */}
      <div className="h-18" />

      {/* HERO SECTION */}
      <section 
        id="section-hero" 
        className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 flex flex-col items-center justify-center text-center leading-normal"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative inline-flex items-center gap-2 bg-sky-50 border border-sky-100 rounded-full py-1.5 px-4 mb-6 shadow-sm shadow-sky-100/50"
        >
          <Sparkles className="h-4 w-4 text-sky-500 animate-pulse" />
          <span className="font-mono text-[11px] font-extrabold uppercase text-sky-700 tracking-wider">
            Available for Frontend & Full Stack Projects
          </span>
        </motion.div>

        {/* Display Heading Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-black tracking-tight text-slate-900 max-w-4xl"
        >
          Aesthetic Web Apps <br className="hidden sm:inline" />
          Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">Robust Backends</span>
        </motion.h1>

        {/* Dynamic Abstract Bio Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-slate-500 font-medium max-w-2xl mt-6 leading-relaxed font-sans"
        >
          Hello! I'm <strong>{CONTACT_INFO.name}</strong>, a developer based in Aurangabad, India. 
          I engineer clean, responsive, and performance-optimized digital products combining secure 
          PHP backend frameworks with modern modular frontends.
        </motion.p>

        {/* Call to action anchor controllers */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 w-full"
        >
          <button
            onClick={() => scrollToSection("section-projects")}
            className="w-full sm:w-auto bg-slate-900 hover:bg-sky-500 active:scale-98 text-white font-mono text-xs py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-slate-200 transition-all font-bold"
          >
            Check Out My Projects
            <ChevronRight className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => scrollToSection("section-contact")}
            className="w-full sm:w-auto bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-mono text-xs py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all font-bold"
          >
            <Send className="h-3.5 w-3.5" />
            Ping Me / Get In Touch
          </button>
        </motion.div>

        {/* Quick Social / Location Badge list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-5 mt-12 text-slate-400 font-mono text-[11px] font-bold uppercase tracking-wider"
        >
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-sky-500" />
            <span>{CONTACT_INFO.location}</span>
          </div>
          <span className="text-slate-200 hidden sm:inline">|</span>
          <a 
            href="https://github.com/khan123personal" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 hover:text-sky-500 transition-colors cursor-pointer"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>
          <span className="text-slate-200 hidden sm:inline">|</span>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 hover:text-sky-500 transition-colors cursor-pointer"
          >
            <Linkedin className="h-4 w-4" />
            <span>LinkedIn</span>
          </a>
        </motion.div>

        {/* Interactive Down indicator button */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={() => scrollToSection("section-3d")}
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 bg-white/50 text-slate-400 hover:text-sky-500 hover:border-sky-200 cursor-pointer shadow-sm transition-colors mt-14"
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </section>

      {/* SECTION 1: rotating 3d skills matrix universe */}
      <section 
        id="section-3d" 
        className="relative z-10 w-full py-16 bg-slate-50/40 border-y border-slate-100 scroll-mt-20 overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-6 mb-10 text-center select-none">
          <span className="font-mono text-[10px] font-extrabold uppercase text-sky-500 tracking-widest block mb-2">
            Skillsets Cosmos // Interaction Area
          </span>
          <h2 className="text-2xl sm:text-3.5xl font-sans font-black tracking-tight text-slate-900">
            Interactive Technology Orbit
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-xl mx-auto mt-2 leading-relaxed">
            Drag the 3D hologram cube around to explore various development specialities, programming languages, and framework proficiencies.
          </p>
        </div>

        <TechUniverse3D />
      </section>

      {/* SECTION 2: Work Experience timeline */}
      <section 
        id="section-timeline" 
        className="relative z-10 w-full py-20 scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto px-6 mb-12 text-center select-none">
          <span className="font-mono text-[10px] font-extrabold uppercase text-indigo-500 tracking-widest block mb-1.5">
            Verified Professional Milestones
          </span>
          <h2 className="text-2xl sm:text-3.5xl font-sans font-black tracking-tight text-slate-900">
            Professional Experience Journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-xl mx-auto mt-2">
            Details of official industry checkouts, ongoing corporate contracts, and prior developer internships.
          </p>
        </div>

        <ExperienceTimeline />
      </section>

      {/* SECTION 3: Projects portfolio layout */}
      <section 
        id="section-projects" 
        className="relative z-10 w-full py-18 bg-slate-50/40 border-y border-slate-100 scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto px-6 mb-10 text-center select-none">
          <span className="font-mono text-[10px] font-extrabold uppercase text-sky-500 tracking-widest block mb-1.5">
            Systems & Live Application Suite
          </span>
          <h2 className="text-2xl sm:text-3.5xl font-sans font-black tracking-tight text-slate-900">
            Featured Projects Spotlight
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-xl mx-auto mt-2 leading-relaxed">
            Click on any capsule to view its project narrative, core architecture specs, metrics, and to evaluate a simulated live compilation pipeline on Port 3000!
          </p>
        </div>

        <ProjectsShowcase />
      </section>

      {/* SECTION 4: Dual achievements credentials & academic roots */}
      <section 
        id="section-certificates" 
        className="relative z-10 w-full py-20 scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto px-6 mb-12 text-center select-none">
          <span className="font-mono text-[10px] font-extrabold uppercase text-sky-500 tracking-widest block mb-2">
            Credentials Profile // Solid Qualifications
          </span>
          <h2 className="text-2xl sm:text-3.5xl font-sans font-black tracking-tight text-slate-900">
            Education & Endorsements
          </h2>
        </div>

        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tech certifications column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-sky-50 border border-sky-100 rounded-xl text-sky-600">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-800 tracking-tight">Active Certifications</h3>
            </div>

            <div className="space-y-4">
              {CERTIFICATES_LIST.map((cert) => (
                <div key={cert.id} className="w-full">
                  <TiltCard glowColor="blue" className="bg-white/95">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-sky-500 uppercase block mb-1">
                          {cert.date}
                        </span>
                        <h4 className="text-sm font-extrabold text-slate-800 tracking-tight leading-snug">
                          {cert.title}
                        </h4>
                        <p className="text-[11px] font-mono text-slate-400 mt-1 uppercase tracking-wide">
                          {cert.issuer}
                        </p>
                        <p className="text-xs text-slate-500 leading-relaxed mt-3.5 font-sans">
                          {cert.details}
                        </p>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              ))}
            </div>
          </div>

          {/* Academic foundation column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-800 tracking-tight">Academic Base</h3>
            </div>

            <div className="space-y-4">
              {EDUCATION_LIST.map((edu, idx) => (
                <div key={idx} className="w-full">
                  <TiltCard glowColor="indigo" className="bg-white/95">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-indigo-500 uppercase block mb-1">
                          {edu.period}
                        </span>
                        <h4 className="text-sm font-extrabold text-slate-800 tracking-tight leading-snug">
                          {edu.degree}
                        </h4>
                        <p className="text-[11px] font-mono text-slate-400 mt-1 uppercase tracking-wide">
                          {edu.institution}
                        </p>
                        <p className="text-xs text-slate-500 leading-relaxed mt-3.5 font-sans">
                          {edu.details}
                        </p>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: interactive cli console guest sandbox playground */}
      <section 
        id="section-terminal" 
        className="relative z-10 w-full py-18 bg-slate-50/40 border-y border-slate-100 scroll-mt-20 overflow-hidden"
      >
        <div className="max-w-4xl mx-auto px-6 mb-10 text-center select-none">
          <span className="font-mono text-[10px] font-extrabold uppercase text-sky-500 tracking-widest block mb-1.5">
            Interactivity Option // Developer Console Sandbox
          </span>
          <h2 className="text-2xl sm:text-3.5xl font-sans font-black tracking-tight text-slate-900">
            Interactive Guest Console
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-xl mx-auto mt-2 leading-relaxed">
            Type classic command inputs like <code>whoami</code>, <code>skills</code>, <code>projects</code>, or <code>contact</code> to interact with Khan Abdullah's node directly. Helpful click tags are available below as well!
          </p>
        </div>

        <TechTerminal />
      </section>

      {/* SECTION 6: secure contact relay bypass */}
      <section 
        id="section-contact" 
        className="relative z-10 w-full py-20 scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto px-6 mb-12 text-center select-none">
          <span className="font-mono text-[10px] font-extrabold uppercase text-sky-500 tracking-widest block mb-2">
            Launch Message Transmission // Secure Channel
          </span>
          <h2 className="text-2xl sm:text-3.5xl font-sans font-black tracking-tight text-slate-900">
            Connect & Reach Out
          </h2>
        </div>

        <ContactSection />
      </section>

      {/* Elegant minimalist Human web footer */}
      <footer className="relative z-30 bg-white border-t border-slate-200 mt-10 py-8 px-6 text-center select-none text-slate-500 font-sans text-xs shrink-0 leading-relaxed">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="w-6 h-6 rounded bg-slate-900 flex items-center justify-center border border-slate-800 text-white font-mono font-black text-xs">
              K
            </div>
            <span className="font-sans font-extrabold text-slate-800 tracking-tight">{CONTACT_INFO.name}</span>
          </div>

          <div className="text-slate-400 font-mono text-[10px] uppercase font-bold tracking-wider">
            Framework: React & Vite TS // Styled securely via Tailwind CSS
          </div>

          <div>
            &copy; 2026 {CONTACT_INFO.name}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
