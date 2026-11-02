import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Vibrant Festive Diwali Colors for Rocket Bursts
const ROCKET_COLORS = [
  "#FFD700", // Royal Gold Willow
  "#FF5E00", // Saffron / Marigold Orange
  "#FF1E56", // Festive Crimson Red
  "#00F5D4", // Emerald Glow
  "#FFF4D2", // Champagne Spark
  "#FF007F", // Bright Diwali Magenta
  "#00E5FF", // Electric Cyan
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  decay: number;
  sparkle: boolean;
  gravity: number;
  friction: number;
  trail: { x: number; y: number; alpha: number }[];
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  particlesCount: number;
  trail: { x: number; y: number }[];
  exhaustSparks: { x: number; y: number; vx: number; vy: number; alpha: number }[];
}

export default function DiwaliCelebration() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const rocketsRef = useRef<Rocket[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);

  // Burst explosion when rocket reaches target height
  const explodeRocket = useCallback(
    (x: number, y: number, mainColor: string, count: number = 70) => {
      const particles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5.8 + 1.2;
        const color =
          Math.random() > 0.3
            ? mainColor
            : ROCKET_COLORS[Math.floor(Math.random() * ROCKET_COLORS.length)];

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          size: Math.random() * 2.8 + 1.4,
          decay: Math.random() * 0.018 + 0.012,
          sparkle: Math.random() > 0.35,
          gravity: 0.085,
          friction: 0.962,
          trail: [],
        });
      }

      // Golden willow trailing sparks
      for (let j = 0; j < 30; j++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4.5 + 0.8;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: "#FFE89E",
          size: Math.random() * 1.8 + 0.8,
          decay: Math.random() * 0.014 + 0.009, // longer lingering golden willow
          sparkle: true,
          gravity: 0.095,
          friction: 0.97,
          trail: [],
        });
      }

      particlesRef.current.push(...particles);
    },
    []
  );

  // Launch an authentic Diwali sky rocket with spark exhaust trail
  const launchRocket = useCallback(
    (targetXPercent: number, targetYPercent: number = 0.28) => {
      const width = typeof window !== "undefined" ? window.innerWidth : 1000;
      const height = typeof window !== "undefined" ? window.innerHeight : 800;

      const startX = width * targetXPercent + (Math.random() - 0.5) * 60;
      const destY = height * targetYPercent + (Math.random() - 0.5) * 80;

      // Calculate vertical speed to reach altitude
      const dy = height - destY;
      const vy = -Math.sqrt(2 * 0.09 * dy) * 1.22;
      const vx = ((width * targetXPercent - startX) / Math.abs(vy)) * 1.5 + (Math.random() - 0.5) * 1.6;

      const color = ROCKET_COLORS[Math.floor(Math.random() * ROCKET_COLORS.length)];

      rocketsRef.current.push({
        x: startX,
        y: height + 15,
        targetY: destY,
        vx,
        vy,
        color,
        particlesCount: Math.floor(Math.random() * 25) + 65,
        trail: [],
        exhaustSparks: [],
      });

      // Ensure animation loop is running
      if (!isRunningRef.current) {
        isRunningRef.current = true;
        startAnimation();
      }
    },
    [explodeRocket]
  );

  // Launch a synchronized Diwali rocket show
  const launchRocketShow = useCallback(() => {
    setShowBanner(true);

    // Salvo 1: Two rockets from left and right climbing toward sky
    launchRocket(0.25, 0.28);
    launchRocket(0.75, 0.26);

    // Salvo 2: Two rockets intersecting toward upper center
    setTimeout(() => {
      launchRocket(0.4, 0.22);
      launchRocket(0.6, 0.24);
    }, 1200);

    // Salvo 3: Grand finale center rocket bursting high
    setTimeout(() => {
      launchRocket(0.5, 0.18);
    }, 2400);

    // Auto-hide the Diwali banner after 6 seconds
    setTimeout(() => {
      setShowBanner(false);
    }, 6500);
  }, [launchRocket]);

  // Launch initial rocket show when user opens the website
  useEffect(() => {
    const timer = setTimeout(() => {
      launchRocketShow();
    }, 700);

    return () => clearTimeout(timer);
  }, [launchRocketShow]);

  // Main Canvas render loop (only active while rockets or sparks exist)
  const startAnimation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const rockets = rocketsRef.current;
      const particles = particlesRef.current;

      // ── 1. UPDATE & DRAW ROCKETS ──
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.088; // gravity deceleration as it reaches apex

        // Add exhaust golden sparks
        for (let s = 0; s < 3; s++) {
          r.exhaustSparks.push({
            x: r.x + (Math.random() - 0.5) * 3,
            y: r.y + Math.random() * 4,
            vx: -r.vx * 0.2 + (Math.random() - 0.5) * 1.5,
            vy: Math.random() * 2.5 + 1.2,
            alpha: 1,
          });
        }

        // Draw exhaust sparks
        for (let s = r.exhaustSparks.length - 1; s >= 0; s--) {
          const spk = r.exhaustSparks[s];
          spk.x += spk.vx;
          spk.y += spk.vy;
          spk.alpha -= 0.06;

          if (spk.alpha <= 0) {
            r.exhaustSparks.splice(s, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(spk.x, spk.y, Math.random() * 1.8 + 0.8, 0, Math.PI * 2);
          ctx.fillStyle = Math.random() > 0.4 ? "#FFD700" : "#FFA500";
          ctx.globalAlpha = spk.alpha;
          ctx.shadowColor = "#FF8C00";
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.restore();
        }

        // Store rocket path trail
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 12) r.trail.shift();

        // Draw luminous rocket body trail
        ctx.save();
        ctx.beginPath();
        for (let t = 0; t < r.trail.length; t++) {
          const pt = r.trail[t];
          const trAlpha = (t / r.trail.length) * 0.9;
          ctx.strokeStyle = r.color;
          ctx.globalAlpha = trAlpha;
          ctx.lineWidth = (t / r.trail.length) * 3 + 0.8;
          if (t === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();

        // Burning fiery rocket head
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.globalAlpha = 1;
        ctx.shadowColor = "#FFF";
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.restore();

        // Explode upon reaching target altitude or velocity peak
        if (r.y <= r.targetY || r.vy >= -1.2) {
          explodeRocket(r.x, r.y, r.color, r.particlesCount);
          rockets.splice(i, 1);
        }
      }

      // ── 2. UPDATE & DRAW EXPLODED PARTICLES ──
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= p.friction;
        p.vy = p.vy * p.friction + p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        const flicker = p.sparkle ? 0.75 + Math.random() * 0.25 : 1;
        ctx.globalAlpha = Math.max(0, p.alpha * flicker);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.sparkle ? 9 : 3;
        ctx.fill();
        ctx.restore();
      }

      // Keep loop running while rockets or particles are active
      if (rockets.length > 0 || particles.length > 0) {
        animFrameRef.current = requestAnimationFrame(render);
      } else {
        isRunningRef.current = false;
        ctx.clearRect(0, 0, width, height);
      }
    };

    animFrameRef.current = requestAnimationFrame(render);
  };

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <>
      {/* ── FULLSCREEN ROCKET LAUNCH CANVAS (PURELY VISUAL, NON-BLOCKING) ── */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[9990] w-full h-full"
      />

      {/* ── SIMPLE, ELEGANT DIWALI GREETING BANNER (WHEN ROCKETS LAUNCH) ── */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="fixed top-18 sm:top-24 left-1/2 -translate-x-1/2 z-[9995] pointer-events-auto select-none max-w-[calc(100vw-1.5rem)] sm:max-w-max"
          >
            <div className="flex items-center gap-2.5 sm:gap-3.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#0a0a0a]/92 backdrop-blur-2xl border border-amber-500/35 shadow-[0_12px_36px_rgba(0,0,0,0.85),0_0_24px_rgba(255,180,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.08)]">
              {/* Crisp Custom Vector Diya */}
              <DiyaPillIcon />

              {/* Title & Subtitle in Clean Modern Brand Typography (No Sparkles) */}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2 text-left leading-tight">
                <span className="font-sans font-extrabold text-[13px] sm:text-[15px] tracking-tight text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                  Happy Diwali
                </span>
                <span className="hidden sm:inline text-amber-500/50 text-xs font-semibold">&bull;</span>
                <span className="font-sans font-semibold text-[9.5px] sm:text-[11px] tracking-[0.14em] uppercase text-amber-300/90 font-mono sm:font-sans">
                  Festival of Lights
                </span>
              </div>

              {/* Minimalist Close Button */}
              <button
                type="button"
                onClick={() => setShowBanner(false)}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 flex items-center justify-center text-amber-200/90 hover:text-white transition-all cursor-pointer ml-0.5 sm:ml-1"
                aria-label="Dismiss Diwali Banner"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Crisp Vector Diya Lamp Icon (Razor-sharp on all screens and mobile devices)
function DiyaPillIcon() {
  return (
    <svg
      viewBox="0 0 36 36"
      className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 overflow-visible"
      aria-hidden="true"
    >
      {/* Ambient flame aura */}
      <circle cx="18" cy="11" r="9" fill="#FF9900" opacity="0.35" className="animate-pulse" />

      {/* Dancing golden flame */}
      <path
        d="M 18 3 C 14.5 8, 12.5 11, 12.5 14.5 C 12.5 17.5, 15 19, 18 19 C 21 19, 23.5 17.5, 23.5 14.5 C 23.5 11, 21.5 8, 18 3 Z"
        fill="#FFB300"
      />
      <circle cx="18" cy="14" r="2.2" fill="#FFFFFF" />

      {/* Terracotta Diya body */}
      <path
        d="M 6 18 C 7 26, 12.5 29, 18 29 C 23.5 29, 29 26, 30 18 C 26 21, 22 22, 18 22 C 14 22, 10 21, 6 18 Z"
        fill="#E67E22"
      />

      {/* Brass golden rim */}
      <ellipse
        cx="18"
        cy="18.5"
        rx="12"
        ry="2.8"
        fill="#F39C12"
        stroke="#D35400"
        strokeWidth="0.5"
      />
    </svg>
  );
}
