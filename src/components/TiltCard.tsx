import React, { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";

interface TiltCardProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  glowColor?: "blue" | "teal" | "indigo";
}

export default function TiltCard({
  id,
  children,
  className = "",
  glowColor = "blue",
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Motion values for smooth 3D spring dynamics
  const x = useSpring(0, { stiffness: 150, damping: 20 });
  const y = useSpring(0, { stiffness: 150, damping: 20 });

  // Map mouse positions to 3D rotations (max 10 degrees)
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  // Handle cursor positioning inside the card container bounding rect
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const el = cardRef.current;
    const rect = el.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Normalize coordinates to [-0.5, 0.5]
    const relativeX = (mouseX / rect.width) - 0.5;
    const relativeY = (mouseY / rect.height) - 0.5;

    x.set(relativeX);
    y.set(relativeY);
    setHovered(true);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  // Glow accents colors
  const glowStyles = {
    blue: "hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] hover:border-sky-200/50",
    teal: "hover:shadow-[0_0_30px_rgba(20,184,166,0.15)] hover:border-emerald-200/50",
    indigo: "hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] hover:border-indigo-200/50",
  };

  return (
    <div className="perspective-1000 w-full h-full" id={id}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative h-full w-full rounded-2xl border border-slate-100/80 bg-white/70 backdrop-blur-md p-6 shadow-xl transition-all duration-300 ${glowStyles[glowColor]} ${className}`}
      >
        {/* Shimmer overlay effect that follows the user mouse */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(circle 180px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.52), transparent 90%)`,
          }}
          ref={(el) => {
            if (el && cardRef.current) {
              const rect = cardRef.current.getBoundingClientRect();
              el.style.setProperty("--mouse-x", `${(x.get() + 0.5) * rect.width}px`);
              el.style.setProperty("--mouse-y", `${(y.get() + 0.5) * rect.height}px`);
            }
          }}
        />

        {/* 3D Depth contents container */}
        <div style={{ transform: "translateZ(25px)" }} className="relative h-full w-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
