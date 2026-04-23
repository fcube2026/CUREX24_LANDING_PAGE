import { useEffect, useRef } from "react";

/**
 * AuroraBackground
 * Fixed, full-viewport ambient layer composed of:
 *  - An animated mesh gradient (CSS, conic + radial)
 *  - A lightweight particle / firefly canvas
 *  - A subtle film-grain noise overlay (SVG data URI)
 *
 * Pointer-events disabled. Sits behind all content.
 * Honors prefers-reduced-motion.
 */
const AuroraBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Particle = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      hue: number;
      a: number;
    };

    let particles: Particle[] = [];

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Particle density scaled to viewport, capped for perf.
      const target = Math.min(70, Math.floor((w * h) / 26000));
      particles = new Array(target).fill(0).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.8,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        hue: 150 + Math.random() * 40, // emerald → teal range
        a: 0.25 + Math.random() * 0.5,
      }));
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // Soft connecting lines between near particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 14000) {
            const alpha = (1 - d2 / 14000) * 0.18;
            ctx.strokeStyle = `hsla(${(p.hue + q.hue) / 2}, 70%, 55%, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        // Glow dot
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        grad.addColorStop(0, `hsla(${p.hue}, 80%, 60%, ${p.a})`);
        grad.addColorStop(1, `hsla(${p.hue}, 80%, 60%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);

    if (!reduced) {
      rafRef.current = requestAnimationFrame(draw);
    } else {
      // Single static frame
      draw();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="aurora-fixed" aria-hidden="true">
      {/* Animated mesh gradient layer */}
      <div className="aurora-mesh" />
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="aurora-canvas" />
      {/* Film grain */}
      <div className="aurora-grain" />
    </div>
  );
};

export default AuroraBackground;
