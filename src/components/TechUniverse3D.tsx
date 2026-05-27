import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Code2, Server, Database, Smartphone, LayoutDashboard, Cpu, HelpCircle } from "lucide-react";

export default function TechUniverse3D() {
  const [activeFace, setActiveFace] = useState<string>("Front");
  const [isDragging, setIsDragging] = useState(false);
  
  // Custom rotation refs & springs
  const rotateXVal = useMotionValue(20);
  const rotateYVal = useMotionValue(-35);

  const springRotateX = useSpring(rotateXVal, { stiffness: 60, damping: 15 });
  const springRotateY = useSpring(rotateYVal, { stiffness: 60, damping: 15 });

  const dragStartRef = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });

  // Auto-rotate effect
  useEffect(() => {
    if (isDragging) return;

    const interval = setInterval(() => {
      // Slow auto rotation
      rotateYVal.set(rotateYVal.get() + 0.4);
    }, 30);

    return () => clearInterval(interval);
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: rotateXVal.get(),
      rotY: rotateYVal.get(),
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    // Translate client mouse shift to cube angles (inverted for natural drag)
    rotateYVal.set(dragStartRef.current.rotY + deltaX * 0.45);
    rotateXVal.set(dragStartRef.current.rotX - deltaY * 0.45);
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Static faces mapping
  const faces = [
    {
      name: "Front",
      title: "Backend Core",
      subtitle: "PHP & Laravel",
      icon: <Server className="h-6 w-6 text-sky-500" />,
      color: "border-sky-200/80 bg-white/95",
      transform: "translateZ(130px)",
      techs: ["PHP (OOP/MVC)", "Laravel 11", "Lumen Framework", "RESTful Routing"],
      accent: "shadow-sky-100",
    },
    {
      name: "Back",
      title: "Frontend Layer",
      subtitle: "Reactive & Styled",
      icon: <Code2 className="h-6 w-6 text-emerald-500" />,
      color: "border-emerald-200/80 bg-white/95",
      transform: "rotateY(180deg) translateZ(130px)",
      techs: ["VueJS / Quasar", "React / Vite", "Tailwind CSS", "Bootstrap UI"],
      accent: "shadow-emerald-100",
    },
    {
      name: "Right",
      title: "Systems & Tauri",
      subtitle: "Desktop Core",
      icon: <Cpu className="h-6 w-6 text-indigo-500" />,
      color: "border-indigo-200/80 bg-white/95",
      transform: "rotateY(90deg) translateZ(130px)",
      techs: ["Tauri Framework", "Rust Binding", "Core C / C++", "Java / Python"],
      accent: "shadow-indigo-100",
    },
    {
      name: "Left",
      title: "Data Store",
      subtitle: "Relational & Document",
      icon: <Database className="h-6 w-6 text-rose-500" />,
      color: "border-rose-200/80 bg-white/95",
      transform: "rotateY(-90deg) translateZ(130px)",
      techs: ["MySQL / SQLite", "PostgreSQL", "Prisma ORM", "MongoDB schema"],
      accent: "shadow-rose-100",
    },
    {
      name: "Top",
      title: "Mobile App",
      subtitle: "Flutter cross-platform",
      icon: <Smartphone className="h-6 w-6 text-amber-500" />,
      color: "border-amber-200/80 bg-white/95",
      transform: "rotateX(90deg) translateZ(130px)",
      techs: ["Flutter Cross", "Dart Language", "Riverpod States", "GoRouter Flow"],
      accent: "shadow-amber-100",
    },
    {
      name: "Bottom",
      title: "Specialties",
      subtitle: "Dashboards & Analytics",
      icon: <LayoutDashboard className="h-6 w-6 text-fuchsia-500" />,
      color: "border-fuchsia-200/80 bg-white/95",
      transform: "rotateX(-90deg) translateZ(130px)",
      techs: ["Admin Dashboards", "Power BI charts", "Tableau Analytics", "Postman APIs"],
      accent: "shadow-fuchsia-100",
    },
  ];

  const handleFaceClick = (faceName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveFace(faceName);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 py-8 px-4 max-w-6xl mx-auto">
      {/* 3D Scene viewport */}
      <div 
        className="relative w-[340px] h-[340px] flex items-center justify-center cursor-grab active:cursor-grabbing preserve-3d perspective-1000"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {/* Soft atmospheric gradient behind cube */}
        <div className="absolute w-[280px] h-[280px] rounded-full bg-radial from-sky-100/50 via-teal-50/20 to-transparent blur-3xl -z-10 animate-pulse duration-[8000ms]" />

        {/* Dynamic Rotating Cube */}
        <motion.div
          id="universe-3d-cube"
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-[200px] h-[200px] ease-out duration-100"
        >
          {faces.map((f) => (
            <div
              key={f.name}
              onClick={(e) => handleFaceClick(f.name, e)}
              style={{
                transform: f.transform,
                transformStyle: "preserve-3d",
              }}
              className={`absolute inset-0 w-full h-full p-4 rounded-2xl border-2 shadow-xl flex flex-col justify-between select-none ${f.color} ${f.accent} ${
                activeFace === f.name ? "ring-2 ring-sky-500/50 scale-[1.02]" : "opacity-85 hover:opacity-100"
              } transition-all duration-300 pointer-events-auto backface-hidden`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono leading-none px-2 py-1 rounded bg-slate-100 font-bold tracking-wider text-slate-500 uppercase">
                  {f.name}
                </span>
                {f.icon}
              </div>

              <div className="my-2">
                <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400">
                  {f.title}
                </h4>
                <p className="text-sm font-bold text-slate-800 tracking-tight leading-tight mt-0.5">
                  {f.subtitle}
                </p>
              </div>

              <div className="space-y-1">
                {f.techs.slice(0, 3).map((tech, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400" />
                    <span className="text-[10px] font-mono text-slate-500 truncate">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Orbit helper objects (floating technology markers) */}
        <div className="absolute w-full h-full pointer-events-none z-10">
          <div className="absolute top-2 left-6 animate-bounce duration-[4000ms] bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-full py-1 px-2.5 text-[9px] font-mono shadow-sm flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Laravel 11
          </div>
          <div className="absolute bottom-6 right-8 animate-bounce duration-[5000ms] bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-full py-1 px-2.5 text-[9px] font-mono shadow-sm flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            Tauri Rust
          </div>
          <div className="absolute top-1/2 right-1 animate-bounce duration-[3500ms] bg-sky-50 border border-sky-100 text-sky-600 rounded-full py-1 px-2.5 text-[9px] font-mono shadow-sm flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            React
          </div>
        </div>
      </div>

      {/* Info panel explaining active selected tech stacks */}
      <div className="flex-1 max-w-md w-full bg-white/70 backdrop-blur-md rounded-2xl border border-slate-100/90 p-6 shadow-xl shadow-slate-100/30">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center justify-center p-2 rounded-xl bg-sky-50">
            {faces.find((f) => f.name === activeFace)?.icon}
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-sky-500 uppercase tracking-widest block">
              Active Focus Area
            </span>
            <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">
              {faces.find((f) => f.name === activeFace)?.subtitle} ({activeFace} Stack)
            </h3>
          </div>
        </div>

        <p className="text-slate-600 font-sans text-sm leading-relaxed mb-4 border-l-2 border-slate-100 pl-3">
          Explore Abdullah&apos;s architecture universe. Drag the 3D cube to orbit other categories, or click on any face to inspecting the stack specialization details immediately.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {faces.find((f) => f.name === activeFace)?.techs.map((t, idx) => (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
              key={idx}
              className="flex items-center gap-2.5 bg-slate-50/70 py-2.5 px-3.5 rounded-xl border border-slate-100/80 hover:bg-white hover:border-sky-100 hover:shadow-sm transition-all duration-200"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span className="text-xs font-semibold font-mono text-slate-700">{t}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-1.5 justify-center text-slate-400 text-[10px] font-mono mt-6 pt-4 border-t border-slate-50">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Tip: Hover and drag with your cursor to spin/rotate the cube</span>
        </div>
      </div>
    </div>
  );
}
