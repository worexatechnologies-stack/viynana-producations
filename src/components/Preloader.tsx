"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Disable preloader completely on mobile / touch devices or if already shown in session
    const isMobile = typeof window !== "undefined" && (window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);
    const hasSeenPreloader = typeof window !== "undefined" && sessionStorage.getItem("viyana_preloaded");

    if (isMobile || hasSeenPreloader) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 0);
      return () => clearTimeout(timer);
    }

    try {
      sessionStorage.setItem("viyana_preloaded", "true");
    } catch {
      // Storage unavailable
    }

    const startTime = performance.now();
    const duration = 900; // Fast & smooth 0.9s intro on desktop

    let animationFrameId: number;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const calculatedProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(calculatedProgress);

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setIsFading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 400);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    // Hard fallback safety timer
    const safetyTimer = setTimeout(() => {
      setProgress(100);
      setIsFading(true);
      setTimeout(() => setIsLoading(false), 200);
    }, 1200);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(safetyTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      onClick={() => {
        setIsFading(true);
        setTimeout(() => setIsLoading(false), 100);
      }}
      className={`hidden md:flex fixed inset-0 z-[9999] flex-col justify-between p-6 sm:p-12 bg-brand-black text-brand-light transition-all duration-500 ease-out select-none cursor-pointer ${
        isFading ? "opacity-0 pointer-events-none scale-[1.02] filter blur-sm" : "opacity-100"
      }`}
    >
      {/* Top Bar Status */}
      <div className="flex justify-between items-center text-[10px] sm:text-xs uppercase font-mono tracking-[0.25em] text-white/60">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span>INITIALIZING STUDIO</span>
        </div>
        <span>VIYANA // 2026</span>
      </div>

      {/* Center Cinematic Brand Logo & Name */}
      <div className="flex flex-col items-center justify-center text-center space-y-4 my-auto">
        <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-white/30 bg-brand-dark mb-2 shadow-[0_0_40px_rgba(255,255,255,0.15)] animate-pulse">
          <Image
            src="/logo.jpg"
            alt="Viyana Logo"
            fill
            sizes="64px"
            className="object-cover"
            priority
          />
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tighter uppercase text-white">
          VIYANA
        </h1>
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/70 font-mono">
          Creative Ad Agency × Production Studio
        </p>

        {/* Minimalist Progress Line */}
        <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden mt-6">
          <div
            className="h-full bg-white transition-all duration-75 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bottom Counter & Milestone */}
      <div className="flex justify-between items-end">
        <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-brand-grey space-y-1">
          <p className="text-white/80">AD AGENCY • 4K COMMERCIALS • DESIGN</p>
          <p className="text-white/40">HYDERABAD / MUMBAI / GLOBAL</p>
        </div>

        {/* Percentage Counter */}
        <div className="text-5xl sm:text-7xl md:text-8xl font-serif font-light text-white tracking-tight font-mono">
          {progress < 10 ? `0${progress}` : progress}
          <span className="text-xl sm:text-3xl text-white/40 font-serif ml-1">%</span>
        </div>
      </div>
    </div>
  );
}
