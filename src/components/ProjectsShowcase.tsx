import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FolderGit2, ArrowRight, ExternalLink, X, CheckCircle, Database, Layers, Milestone, Loader2 } from "lucide-react";
import { PROJECTS_LIST } from "../data";
import { Project } from "../types";
import TiltCard from "./TiltCard";

export default function ProjectsShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [buildStep, setBuildStep] = useState<"idle" | "simulating" | "success">("idle");
  const [buildProgress, setBuildProgress] = useState(0);

  const categories = ["All", "Full Stack", "Frontend", "Mobile UI", "ERP & Systems"];

  const filteredProjects = activeCategory === "All"
    ? PROJECTS_LIST
    : PROJECTS_LIST.filter((p) => p.category === activeCategory);

  const handleSimulateBuild = () => {
    if (buildStep !== "idle") return;
    setBuildStep("simulating");
    setBuildProgress(0);
  };

  useEffect(() => {
    let interval: any;
    if (buildStep === "simulating") {
      interval = setInterval(() => {
        setBuildProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setBuildStep("success");
            return 100;
          }
          return prev + 10;
        });
      }, 120);
    }
    return () => clearInterval(interval);
  }, [buildStep]);

  // Reset build states when selectedProject changes
  useEffect(() => {
    setBuildStep("idle");
    setBuildProgress(0);
  }, [selectedProject]);

  // Prevent background body page scrolling when the details overlay is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    };
  }, [selectedProject]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Search/Pill Category Filter links */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs font-mono font-medium tracking-wide py-2 px-4.5 rounded-full transition-all cursor-pointer ${
              activeCategory === cat
                ? "bg-slate-800 text-white shadow-md shadow-slate-200/50 scale-[1.02]"
                : "bg-white hover:bg-slate-50 border border-slate-200/60 text-slate-500 hover:text-slate-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of cards with perspective enter */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4 }}
              key={proj.id}
              className="h-full cursor-pointer group"
              onClick={() => setSelectedProject(proj)}
            >
              <TiltCard
                glowColor={idx % 3 === 0 ? "blue" : idx % 3 === 1 ? "teal" : "indigo"}
                className="h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono leading-none px-2 py-1 rounded-md bg-slate-100 font-bold text-slate-500 tracking-wider">
                      {proj.category}
                    </span>
                    <FolderGit2 className="h-5 w-5 text-slate-400 group-hover:text-sky-500 transition-colors" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-sky-600 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-1 mb-3">
                    {proj.subtitle}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {proj.description[0]}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {proj.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono font-medium text-slate-400 bg-slate-50 py-0.5 px-2 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {proj.technologies.length > 3 && (
                      <span className="text-[9px] font-mono font-bold text-slate-400 bg-slate-100/50 px-1 rounded">
                        +{proj.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-mono font-bold text-sky-500 flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
                    Inspect
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Expandable Project Details Immersive Drawer / Modal overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] overflow-y-auto bg-slate-900/65 backdrop-blur-xs flex items-start sm:items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl border border-slate-100 shadow-2xl p-6 sm:p-8 my-8 cursor-default"
              onClick={(e) => e.stopPropagation()}
              id="fullscreen-project-modal"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 text-slate-400 hover:text-slate-700 transition-all cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              <div className="mb-4">
                <span className="text-[10px] font-mono leading-none px-2.5 py-1 rounded-md bg-sky-50 font-extrabold text-sky-600 tracking-wider">
                  {selectedProject.category}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight mt-1.5 leading-none">
                  {selectedProject.title}
                </h2>
                <p className="text-sm font-mono text-slate-400 mt-1">
                  {selectedProject.subtitle}
                </p>
              </div>

              {/* Grid with stat metrics */}
              <div className="grid grid-cols-3 gap-3 mb-6 bg-slate-50/80 p-3.5 rounded-xl border border-slate-100">
                {selectedProject.stats?.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <span className="text-[9px] font-mono text-slate-400 uppercase font-black">
                      {stat.label}
                    </span>
                    <span className="block text-xs font-extrabold text-slate-700 truncate mt-0.5">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bulleted storytelling details */}
              <div className="space-y-3 mb-6">
                <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
                  Project Narrative & Objectives
                </h4>
                {selectedProject.description.map((desc, di) => (
                  <div key={di} className="flex items-start gap-3 bg-white/30 p-2.5 rounded-lg border border-slate-50">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Technology badges listing */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono bg-slate-100/70 border border-slate-200/50 text-slate-600 py-1 px-3 rounded-lg"
                  >
                    #{tech}
                  </span>
                ))}
              </div>

              {/* Live Sandbox Build Simulation Terminal Panel / Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100/60 flex flex-col gap-3">
                {buildStep === "simulating" && (
                  <div className="w-full bg-slate-900 text-slate-300 p-4 rounded-xl space-y-2 border border-slate-800 shadow-inner font-mono text-xs">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold">
                      <span className="flex items-center gap-1.5 uppercase tracking-widest text-sky-400">
                        <Loader2 className="h-3 w-3 animate-spin text-sky-400" />
                        Compiling Sandbox Coordinates...
                      </span>
                      <span>{buildProgress}%</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-sky-400 to-teal-400 transition-all duration-100 rounded-full"
                        style={{ width: `${buildProgress}%` }}
                      />
                    </div>
                    {/* Simulated terminal logs */}
                    <div className="text-[10px] text-slate-400 select-none">
                      {buildProgress < 35 && (
                        <p className="animate-pulse">&gt; Initializing secure compiler sandbox node...</p>
                      )}
                      {buildProgress >= 35 && buildProgress < 75 && (
                        <p className="animate-pulse">&gt; Linking components, asset pipelines, and metadata.json...</p>
                      )}
                      {buildProgress >= 75 && (
                        <p className="animate-pulse">&gt; Starting local live test server on PORT: 3000...</p>
                      )}
                    </div>
                  </div>
                )}

                {buildStep === "success" && (
                  <div className="w-full bg-emerald-50/90 text-emerald-800 p-4 rounded-xl border border-emerald-100 flex items-center justify-between gap-3 font-mono text-xs">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-extrabold text-slate-800 text-xs">Sandbox Deployed Successfully!</h5>
                        <p className="text-[10px] text-emerald-600 mt-0.5 leading-relaxed">
                          Port 3000 mapped successfully. Virtual sandbox coordinates are fully operational.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setBuildStep("idle")}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[10px] font-bold py-1.5 px-3.5 rounded-lg cursor-pointer transition-colors"
                    >
                      Reset Sandbox
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 w-full">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-xs font-mono text-slate-500 hover:text-slate-800 px-4 py-2 hover:bg-slate-50 border border-slate-100 hover:border-slate-200 rounded-xl cursor-pointer transition-colors"
                  >
                    Close Spec
                  </button>
                  
                  {buildStep === "idle" && (
                    <button
                      onClick={handleSimulateBuild}
                      className="bg-sky-500 hover:bg-sky-600 text-white font-mono text-xs py-2 px-4.5 rounded-xl inline-flex items-center gap-1.5 cursor-pointer shadow-md shadow-sky-100 hover:shadow-sky-200 hover:-translate-y-0.5 transition-all text-center leading-none animate-pulse hover:animate-none"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Simulate Live Build
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
