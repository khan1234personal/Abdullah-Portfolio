import { useEffect, useRef } from "react";

export default function ThreeDBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      baseX: number;
      baseY: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2 + 1;
        // Light theme soft blues & teals
        const colors = [
          "rgba(14, 165, 233, 0.15)", // sky-500
          "rgba(20, 184, 166, 0.15)", // teal-500
          "rgba(99, 102, 241, 0.12)", // indigo-500
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(mouseX: number, mouseY: number, isHovering: boolean) {
        // Move slightly
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on boundaries
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse behavior (attract / push)
        if (isHovering) {
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 180) {
            const force = (180 - distance) / 180;
            // Pull slightly towards mouse
            this.x += (dx / distance) * force * 1.5;
            this.y += (dy / distance) * force * 1.5;
          }
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
      }
    }

    const particles: Particle[] = [];
    const particleCount = Math.min(65, Math.floor((width * height) / 18000));

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(Math.random() * width, Math.random() * height));
    }

    // Mouse coordinates
    const mouse = {
      x: 0,
      y: 0,
      isHovering: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovering = false;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      // Re-fill particles if too few
      const newCount = Math.min(65, Math.floor((width * height) / 18000));
      if (particles.length < newCount) {
        for (let i = particles.length; i < newCount; i++) {
          particles.push(new Particle(Math.random() * width, Math.random() * height));
        }
      } else if (particles.length > newCount) {
        particles.splice(newCount);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    // Render loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw thin constellation grids
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update(mouse.x, mouse.y, mouse.isHovering);
        p1.draw(ctx);

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            // Draw link line
            const alpha = (130 - dist) / 130 * 0.15;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(14, 165, 233, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      id="bg-neural-canvas"
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60 transition-opacity duration-700"
    />
  );
}
