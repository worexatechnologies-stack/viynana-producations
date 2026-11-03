import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Vibrant Festive Diwali Colors for Rocket Bursts
const ROCKET_COLORS = [
  "#FFD700", // Royal Gold Willow
  "#FF6B00", // Saffron / Marigold Orange
  "#FF1E56", // Festive Ruby Crimson
  "#00F5A0", // Peacock Emerald
  "#FFF8D6", // Champagne Willow Spark
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

interface Flash {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
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
  const flashesRef = useRef<Flash[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);

  // Burst explosion when rocket reaches target height
  const explodeRocket = useCallback(
    (x: number, y: number, mainColor: string, count: number = 85) => {
      // 1. Initial luminous flash bloom
      flashesRef.current.push({
        x,
        y,
        radius: 12,
        maxRadius: 180,
        alpha: 0.45,
        color: mainColor,
      });

      const particles: Particle[] = [];

      // 2. Main spherical firework stars with spark streaks
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6.5 + 1.6;
        const color =
          Math.random() > 0.35
            ? mainColor
            : ROCKET_COLORS[Math.floor(Math.random() * ROCKET_COLORS.length)];

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          size: Math.random() * 2.6 + 1.4,
          decay: Math.random() * 0.016 + 0.011,
          sparkle: Math.random() > 0.35,
          gravity: 0.082,
          friction: 0.965,
          trail: [],
        });
      }

      // 3. Golden Nishiki Kamuro / Weeping Willow trailing cascade
      for (let j = 0; j < 40; j++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4.2 + 0.6;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: "#FFE699",
          size: Math.random() * 1.8 + 0.9,
          decay: Math.random() * 0.012 + 0.007, // lingering golden willow embers
          sparkle: true,
          gravity: 0.075,
          friction: 0.975,
          trail: [],
        });
      }

      particlesRef.current.push(...particles);
    },
    []
  );

  // Launch an authentic Diwali sky rocket with spark exhaust trail
  const launchRocket = useCallback(
    (targetXPercent: number, targetYPercent: number = 0.26) => {
      const width = typeof window !== "undefined" ? window.innerWidth : 1000;
      const height = typeof window !== "undefined" ? window.innerHeight : 800;

      const startX = width * targetXPercent + (Math.random() - 0.5) * 60;
      const destY = height * targetYPercent + (Math.random() - 0.5) * 80;

      const dy = height - destY;
      const vy = -Math.sqrt(2 * 0.09 * dy) * 1.25;
      const vx = ((width * targetXPercent - startX) / Math.abs(vy)) * 1.5 + (Math.random() - 0.5) * 1.8;

      const color = ROCKET_COLORS[Math.floor(Math.random() * ROCKET_COLORS.length)];

      rocketsRef.current.push({
        x: startX,
        y: height + 15,
        targetY: destY,
        vx,
        vy,
        color,
        particlesCount: Math.floor(Math.random() * 25) + 75,
        trail: [],
        exhaustSparks: [],
      });

      if (!isRunningRef.current) {
        isRunningRef.current = true;
        startAnimation();
      }
    },
    [explodeRocket]
  );

  // Synchronized Diwali celebratory sky rocket show
  const launchRocketShow = useCallback(() => {
    setShowBanner(true);

    // Wave 1: Dual rockets from left & right
    launchRocket(0.28, 0.28);
    launchRocket(0.72, 0.27);

    // Wave 2: Intersecting rockets
    setTimeout(() => {
      launchRocket(0.42, 0.22);
      launchRocket(0.58, 0.23);
    }, 1100);

    // Wave 3: Grand finale center rocket blooming high
    setTimeout(() => {
      launchRocket(0.5, 0.17);
    }, 2200);

    // Auto-dismiss banner after 6.5s
    setTimeout(() => {
      setShowBanner(false);
    }, 6500);
  }, [launchRocket]);

  useEffect(() => {
    const timer = setTimeout(() => {
      launchRocketShow();
    }, 650);

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
      const flashes = flashesRef.current;

      // ── 0. DRAW RADIAL FLASHES ──
      for (let f = flashes.length - 1; f >= 0; f--) {
        const fl = flashes[f];
        fl.radius += (fl.maxRadius - fl.radius) * 0.28;
        fl.alpha -= 0.055;

        if (fl.alpha <= 0) {
          flashes.splice(f, 1);
          continue;
        }

        ctx.save();
        const grad = ctx.createRadialGradient(fl.x, fl.y, 0, fl.x, fl.y, fl.radius);
        grad.addColorStop(0, "rgba(255, 255, 255, " + fl.alpha + ")");
        grad.addColorStop(0.4, fl.color);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(fl.x, fl.y, fl.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // ── 1. UPDATE & DRAW ROCKETS ──
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.088;

        // Exhaust golden sparks
        for (let s = 0; s < 4; s++) {
          r.exhaustSparks.push({
            x: r.x + (Math.random() - 0.5) * 3,
            y: r.y + Math.random() * 5,
            vx: -r.vx * 0.2 + (Math.random() - 0.5) * 1.8,
            vy: Math.random() * 3 + 1.2,
            alpha: 1,
          });
        }

        // Draw exhaust sparks
        for (let s = r.exhaustSparks.length - 1; s >= 0; s--) {
          const spk = r.exhaustSparks[s];
          spk.x += spk.vx;
          spk.y += spk.vy;
          spk.alpha -= 0.055;

          if (spk.alpha <= 0) {
            r.exhaustSparks.splice(s, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(spk.x, spk.y, Math.random() * 1.8 + 0.8, 0, Math.PI * 2);
          ctx.fillStyle = Math.random() > 0.35 ? "#FFD700" : "#FFA500";
          ctx.globalAlpha = spk.alpha;
          ctx.shadowColor = "#FF8C00";
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.restore();
        }

        // Store rocket path trail
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 14) r.trail.shift();

        // Draw luminous rocket body trail
        ctx.save();
        ctx.beginPath();
        for (let t = 0; t < r.trail.length; t++) {
          const pt = r.trail[t];
          const trAlpha = (t / r.trail.length) * 0.95;
          ctx.strokeStyle = r.color;
          ctx.globalAlpha = trAlpha;
          ctx.lineWidth = (t / r.trail.length) * 3.2 + 0.8;
          if (t === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();

        // Burning fiery rocket head
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.globalAlpha = 1;
        ctx.shadowColor = "#FFF";
        ctx.shadowBlur = 16;
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

        // Particle trail
        p.trail.push({ x: p.x, y: p.y, alpha: p.alpha });
        if (p.trail.length > 4) p.trail.shift();

        ctx.save();
        // Draw spark streak
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let t = 1; t < p.trail.length; t++) {
            ctx.lineTo(p.trail[t].x, p.trail[t].y);
          }
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = p.alpha * 0.45;
          ctx.lineWidth = p.size * 0.8;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        const flicker = p.sparkle ? 0.7 + Math.random() * 0.3 : 1;
        ctx.globalAlpha = Math.max(0, p.alpha * flicker);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.sparkle ? 10 : 4;
        ctx.fill();
        ctx.restore();
      }

      // Keep loop running while rockets or particles are active
      if (rockets.length > 0 || particles.length > 0 || flashes.length > 0) {
        animFrameRef.current = requestAnimationFrame(render);
      } else {
        isRunningRef.current = false;
        ctx.clearRect(0, 0, width, height);
      }
    };

    animFrameRef.current = requestAnimationFrame(render);
  };

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
