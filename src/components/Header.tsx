import { useState, useEffect, useRef } from "react";
import { Terminal, Code, Cpu, FileText, Send, Calendar, Clock } from "lucide-react";
import { CONTACT_INFO } from "../data";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [visible, setVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Background glass opacity triggers
      if (currentScrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide/show navbar depending on scroll direction (when not at the very top)
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down - hide navbar
          setVisible(false);
        } else {
          // Scrolling up - show navbar
          setVisible(true);
        }
      } else {
        // At the very top, always show navbar
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;

      // Calc scroll progress length
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((currentScrollY / totalScroll) * 100);
      }
    };

    // Live clock update
    const updateTime = () => {
      const now = new Date();
      // Style as UTC or system time beautifully
      const formatted = now.toISOString().replace("T", " ").slice(0, 19);
      setCurrentTime(formatted);
    };

    window.addEventListener("scroll", handleScroll);
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  // Monitor layout modal state to hide header whenever open
  useEffect(() => {
    const checkModal = () => {
      const isOpen = 
        document.body.style.overflow === "hidden" || 
        document.body.classList.contains("modal-open") ||
        !!document.getElementById("fullscreen-project-modal");
      setIsModalOpen(isOpen);
    };

    // Initial check
    checkModal();

    // Observe body attributes for style/class changes
    const observer = new MutationObserver(() => {
      checkModal();
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    // Also poll slightly on event to capture dynamically mounted element
    const eventHandler = () => {
      setTimeout(checkModal, 50);
    };

    window.addEventListener("click", eventHandler);

    return () => {
      observer.disconnect();
      window.removeEventListener("click", eventHandler);
    };
  }, []);

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
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        (!visible || isModalOpen)
          ? "opacity-0 -translate-y-full pointer-events-none"
          : "opacity-100 translate-y-0"
      } ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-xs"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Scroll indicator bar */}
      <div 
        className="h-[2px] bg-sky-500 transition-all duration-100 origin-left"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Name / Logo coordinate */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-800 shadow-sm group-hover:bg-sky-500 group-hover:scale-105 transition-all">
            <span className="font-mono text-sm font-black text-white">K</span>
          </div>
          <div>
            <span className="font-sans font-extrabold text-sm tracking-tight text-slate-800 block leading-tight">
              {CONTACT_INFO.name}
            </span>
            <span className="font-mono text-[9px] font-bold text-slate-400 block tracking-widest leading-none uppercase mt-0.5">
              FULL STACK ENGINE
            </span>
          </div>
        </div>

        {/* Mid Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {[
            { label: "Universe", id: "section-3d" },
            { label: "Experience", id: "section-timeline" },
            { label: "Projects", id: "section-projects" },
            { label: "Credentials", id: "section-certificates" },
            { label: "CLI Sandbox", id: "section-terminal" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.id)}
              className="text-xs font-mono font-bold tracking-wide text-slate-500 hover:text-sky-600 transition-colors cursor-pointer select-none"
            >
              //{item.label}
            </button>
          ))}
        </nav>

        {/* Right Info widgets (Live Clock & Contact Linkout) */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-slate-100/60 border border-slate-200/30 rounded-xl py-1.5 px-3">
            <Clock className="h-3.5 w-3.5 text-sky-500" />
            <span className="font-mono text-[10px] font-semibold text-slate-500 tabular-nums">
              {currentTime || "2026-05-27 00:36:56"} UTC
            </span>
          </div>

          <button
            onClick={() => scrollToSection("section-contact")}
            className="bg-slate-900 hover:bg-sky-500 text-white font-mono text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm shadow-slate-100 hover:shadow-sky-100 hover:-translate-y-0.5 transition-all outline-none"
          >
            <Send className="h-3 w-3" />
            Ping
          </button>
        </div>
      </div>
    </header>
  );
}
