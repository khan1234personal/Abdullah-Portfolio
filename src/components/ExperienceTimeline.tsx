import { motion } from "motion/react";
import { Briefcase, Calendar, MapPin, Sparkles } from "lucide-react";
import { EXPERIENCE_LIST } from "../data";
import TiltCard from "./TiltCard";

export default function ExperienceTimeline() {
  return (
    <div className="relative max-w-5xl mx-auto px-4 py-8">
      {/* Center timeline rule line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200/65 -translate-x-1/2 hidden md:block" />
      
      {/* Mobile left-aligned rule line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200/65 md:hidden" />

      <div className="space-y-12">
        {EXPERIENCE_LIST.map((exp, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={exp.id}
              className={`relative flex flex-col md:flex-row items-stretch md:justify-between w-full ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline dot marker */}
              <div className="absolute left-6 md:left-1/2 top-4 w-6 h-6 rounded-full border-4 border-slate-50 bg-sky-500 shadow-md transform -translate-x-1/2 z-10 hidden md:block">
                <div className="w-1.5 h-1.5 rounded-full bg-white m-auto mt-0.5 animate-ping" />
              </div>

              {/* Mobile Timeline dot marker */}
              <div className="absolute left-6 top-4 w-5 h-5 rounded-full border-4 border-slate-50 bg-sky-500 shadow-sm -translate-x-1/2 z-10 md:hidden" />

              {/* Left/Right Card Spacer to push cards into correct halves of screen */}
              <div className="w-full md:w-[46%] pl-12 md:pl-0">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <TiltCard
                    glowColor={index === 0 ? "blue" : index === 1 ? "teal" : "indigo"}
                    className="relative"
                  >
                    {/* Active highlight label */}
                    {exp.isCurrent && (
                      <span className="absolute top-4 right-4 bg-sky-100 text-sky-700 text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3 animate-spin duration-[4000ms]" />
                        Present Active
                      </span>
                    )}

                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <Briefcase className="h-4 w-4 text-slate-500" />
                      </div>
                      <div>
                        <h4 className="text-sm uppercase font-mono tracking-wider text-slate-400">
                          {exp.company}
                        </h4>
                        <h3 className="text-lg font-bold text-slate-800 leading-tight">
                          {exp.role}
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-400 font-mono mb-4 pb-3 border-b border-slate-50">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {exp.location}
                      </span>
                    </div>

                    <ul className="space-y-2 mb-5">
                      {exp.highlights.map((hlt, hidx) => (
                        <li key={hidx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                          <span>{hlt}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Skill tags list */}
                    <div className="flex flex-wrap gap-1.5 mt-2 pt-3 border-t border-slate-50">
                      {exp.skillsUsed.map((skill) => (
                        <span
                          key={skill}
                          className="bg-slate-50/80 border border-slate-100 text-xs font-mono font-medium text-slate-500 px-2.5 py-0.5 rounded-lg hover:border-slate-300 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </TiltCard>
                </motion.div>
              </div>

              {/* Empty spacer for clean alignment */}
              <div className="w-full md:w-[46%] hidden md:block" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
