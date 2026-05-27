import React, { useState, useRef, useEffect } from "react";
import { Terminal, Send, RotateCcw, Sparkles } from "lucide-react";
import { CONTACT_INFO, SKILL_GROUPS } from "../data";

interface TerminalLine {
  type: "input" | "output" | "error" | "success";
  text: string;
}

export default function TechTerminal() {
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: "output", text: "Welcome to K-SHELL v1.4.2 [Connection: secured]" },
    { type: "output", text: "Initializing index of khan-abdullah-core..." },
    { type: "success", text: "System online. Type 'help' to audit available endpoints." },
  ]);
  const [inputVal, setInputVal] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const COMMANDS = {
    help: "List available commands: whoami, skills, projects, contact, clear",
    whoami: "Full Stack Developer (April 2025 - Present) specializing in PHP, Laravel structures, responsive interfaces, and embedded Tauri systems.",
    skills: "Query languages, frameworks, databases, and core system expertise.",
    projects: "Show active featured projects (FreelanceForge, SofaCraft, CampusSync ERP).",
    contact: `Direct info - Email: ${CONTACT_INFO.email} | Phone: ${CONTACT_INFO.phone} | Locate: ${CONTACT_INFO.location}`,
    clear: "Reset screen terminals.",
  };

  const executeCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    if (!cleanCmd) return;

    const newHistory = [...history, { type: "input" as const, text: `$ ${cmd}` }];

    switch (cleanCmd) {
      case "help":
        newHistory.push({ type: "output", text: "Available Commands:" });
        Object.entries(COMMANDS).forEach(([name, desc]) => {
          newHistory.push({ type: "output", text: `  ${name.padEnd(10)} - ${desc}` });
        });
        break;
      case "whoami":
        newHistory.push({
          type: "success",
          text: `KHAN ABDULLAH | ${CONTACT_INFO.title}`,
        });
        newHistory.push({
          type: "output",
          text: "Senior B.Sc Computer Science developer focused on robust PHP backend pipelines and modern agile interfaces. Previously Web Developer Intern and Frontend Developer Intern.",
        });
        break;
      case "skills":
        newHistory.push({ type: "success", text: "Active Core Skills Index:" });
        SKILL_GROUPS.forEach((g) => {
          newHistory.push({ type: "output", text: `[${g.category}]` });
          g.items.forEach((item) => {
            newHistory.push({
              type: "output",
              text: `  ${item.name.padEnd(28)} : [${"█".repeat(Math.round(item.level / 10))}${"░".repeat(10 - Math.round(item.level / 10))}] ${item.level}%`,
            });
          });
        });
        break;
      case "projects":
        newHistory.push({ type: "success", text: "Featured Systems Launched:" });
        newHistory.push({
          type: "output",
          text: "1. FreelanceForge (Next.js 14, Node.js, Express, Prisma, Postgres, GSAP) - Unified Freelance Monorepo platform.",
        });
        newHistory.push({
          type: "output",
          text: "2. SofaCraft Mobile (Flutter, Riverpod, GoRouter, PDFKit) - Catalog quotation maker app.",
        });
        newHistory.push({
          type: "output",
          text: "3. CampusSync ERP (Laravel PHP Web, Tauri Rust Desktop client) - University ERP.",
        });
        newHistory.push({
          type: "output",
          text: "Type 'projects' on the site to see cards or scroll to the gallery below.",
        });
        break;
      case "contact":
        newHistory.push({
          type: "success",
          text: `Email: ${CONTACT_INFO.email} | Phone: ${CONTACT_INFO.phone}`,
        });
        newHistory.push({
          type: "output",
          text: "Located in Aurangabad, India. Available for remote or full-time roles.",
        });
        break;
      case "clear":
        setHistory([]);
        setInputVal("");
        return;
      default:
        newHistory.push({
          type: "error",
          text: `command not found: '${cleanCmd}'. Type 'help' for options.`,
        });
    }

    setHistory(newHistory);
    setInputVal("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    }
  };

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl border border-slate-100 bg-white/70 backdrop-blur-md overflow-hidden shadow-2xl">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100 select-none">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-rose-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
          <span className="text-xs font-mono font-bold text-slate-400 ml-2 flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5" />
            abdullah@kernel-node ~ bash
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setHistory([
                { type: "output", text: "Console session reset cleanly." },
                { type: "success", text: "Ready. Enter commands." },
              ]);
            }}
            className="text-slate-400 hover:text-slate-600 p-1 rounded transition-colors"
            title="Reset Console"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Output Console Log */}
      <div
        ref={scrollRef}
        className="p-5 h-[280px] overflow-y-auto font-mono text-xs space-y-2.5 bg-slate-900/5 text-slate-800 border-b border-light-100 scrollbar-thin"
      >
        {history.map((line, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap leading-relaxed ${
              line.type === "input"
                ? "text-sky-600 font-bold"
                : line.type === "error"
                ? "text-rose-500 font-semibold"
                : line.type === "success"
                ? "text-emerald-600 font-bold"
                : "text-slate-600"
            }`}
          >
            {line.text}
          </div>
        ))}
      </div>

      {/* Terminal Footer Navigation buttons & Input bar */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Helper quick suggestion buttons */}
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase mr-1">
            Quick Queries:
          </span>
          {["whoami", "skills", "projects", "contact"].map((cmd) => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              className="text-[10px] font-mono border border-slate-200 hover:border-sky-300 hover:bg-sky-50 bg-white text-slate-600 hover:text-sky-700 py-1 px-2.5 rounded-lg transition-all shadow-xs cursor-pointer"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Console Input field */}
        <div className="flex items-center gap-1.5 flex-1 max-w-[340px]">
          <span className="text-xs font-mono font-bold text-sky-500">$</span>
          <input
            type="text"
            className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-700 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
            placeholder="Type 'help'..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={() => executeCommand(inputVal)}
            className="bg-sky-500 hover:bg-sky-600 active:scale-95 text-white p-2 rounded-lg transition-all cursor-pointer shadow-sm"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
