"use client";

import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { showreels } from "@/data/showreels";
import {
  Play,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Film,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function ShowreelPage() {
  const [activeReelIdx, setActiveReelIdx] = useState(0);
  const activeReel = showreels[activeReelIdx] || showreels[0];

  const videoRef = useRef<HTMLVideoElement>(null);
  const ambientVideoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-hide controls after 3s of no interaction when playing
  const resetHideTimer = useCallback(() => {
    setControlsVisible(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    if (isPlaying) {
      hideTimeoutRef.current = setTimeout(() => {
        setControlsVisible(false);
      }, 3000);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      setControlsVisible(true);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    } else {
      resetHideTimer();
    }
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [isPlaying, resetHideTimer]);

  // Initial autoplay on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.load();

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, []);

  // Sync fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // When changing active reel, reload video and play
  const handleSelectReel = (idx: number) => {
    if (idx === activeReelIdx) return;
    setActiveReelIdx(idx);
    setCurrentTime(0);
    setHasInteracted(true);

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.load();
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => setIsPlaying(true)).catch(() => {
            // Mute fallback if browser requires muted autoplay
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
            }
          });
        }
      }
      if (ambientVideoRef.current) {
        ambientVideoRef.current.currentTime = 0;
        ambientVideoRef.current.load();
        ambientVideoRef.current.play().catch(() => {});
      }
    }, 60);
  };

  const handleNextReel = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextIdx = (activeReelIdx + 1) % showreels.length;
    handleSelectReel(nextIdx);
  };

  const handlePrevReel = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const prevIdx = (activeReelIdx - 1 + showreels.length) % showreels.length;
    handleSelectReel(prevIdx);
  };

  // Container tap handler: toggles controls or play
  const handleContainerClick = () => {
    if (!controlsVisible) {
      setControlsVisible(true);
      resetHideTimer();
      return;
    }
    togglePlay();
  };

  // Play / Pause toggle with guaranteed fallback
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    setHasInteracted(true);
    if (video.paused) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            if (ambientVideoRef.current) {
              ambientVideoRef.current.play().catch(() => {});
            }
          })
          .catch(() => {
            video.muted = true;
            setIsMuted(true);
            video.play().then(() => setIsPlaying(true)).catch(() => {});
          });
      }
    } else {
      video.pause();
      setIsPlaying(false);
      if (ambientVideoRef.current) {
        ambientVideoRef.current.pause();
      }
    }
  };

  // Mute / Unmute toggle
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Restart video
  const restartVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.play().catch(() => {});
    if (ambientVideoRef.current) {
      ambientVideoRef.current.currentTime = 0;
      ambientVideoRef.current.play().catch(() => {});
    }
  };

  const scrollToTheatre = (idx: number) => {
    handleSelectReel(idx);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-brand-black text-brand-light select-none">
      <Navbar />

      {/* ======================================================== */}
      {/* 1. MASTER CINEMA THEATRE STAGE                           */}
      {/* ======================================================== */}
      <section
        ref={containerRef}
        onMouseMove={resetHideTimer}
        onClick={handleContainerClick}
        className="relative w-full h-[100svh] min-h-[100svh] flex items-center justify-center bg-black cursor-pointer overflow-hidden group select-none"
      >
        {/* Ambient Video Glow Layer */}
        <video
          ref={ambientVideoRef}
          key={`ambient-${activeReel.id}`}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-3xl opacity-35 pointer-events-none"
        >
          <source src={activeReel.src} type="video/mp4" />
          {activeReel.fallbackSrc && <source src={activeReel.fallbackSrc} type="video/mp4" />}
        </video>

        {/* Master Showreel Active Video */}
        <video
          ref={videoRef}
          key={`main-${activeReel.id}`}
          src={activeReel.src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={activeReel.poster}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={() => {
            if (videoRef.current) {
              setCurrentTime(videoRef.current.currentTime);
            }
          }}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              setDuration(videoRef.current.duration);
              setIsMuted(videoRef.current.muted);
            }
          }}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-10"
        >
          <source src={activeReel.src} type="video/mp4" />
          {activeReel.fallbackSrc && <source src={activeReel.fallbackSrc} type="video/mp4" />}
        </video>


        {/* CENTER STATE: Play / Paused Hero Overlay */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center pointer-events-none"
            >
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-black/60 backdrop-blur-xl border border-white/50 flex items-center justify-center text-white shadow-[0_0_50px_rgba(0,0,0,0.8)] mb-3 group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-300">
                <Play className="w-7 h-7 sm:w-10 sm:h-10 fill-current translate-x-0.5 sm:translate-x-1" />
              </div>

              <div className="inline-block px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/25 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2 shadow-lg">
                REEL {activeReel.number} OF {String(showreels.length).padStart(2, "0")} • {activeReel.category}
              </div>

              <h1 className="text-xl sm:text-4xl md:text-5xl font-serif tracking-tight uppercase mb-2 text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] max-w-4xl px-2">
                {hasInteracted ? "PAUSED" : activeReel.title}
              </h1>

              <p className="text-[10px] sm:text-xs tracking-[0.25em] uppercase font-mono text-white/90 max-w-md drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                {hasInteracted
                  ? "TAP ANYWHERE TO RESUME"
                  : "TAP ANYWHERE TO PLAY WITH AUDIO"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating In-Video Controls */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute bottom-5 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 z-30 flex items-center justify-between pointer-events-auto transition-all duration-500 ${
            controlsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          {/* Sound On / Mute toggle */}
          <button
            type="button"
            onClick={toggleMute}
            className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full border text-xs sm:text-sm font-mono uppercase tracking-wider transition-all cursor-pointer active:scale-95 flex items-center gap-2 shadow-2xl backdrop-blur-md ${
              isMuted
                ? "bg-black/60 text-red-300 border-red-500/50 hover:bg-black/80 hover:border-red-400"
                : "bg-black/60 text-white border-white/40 hover:bg-white hover:text-black hover:border-white"
            }`}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>MUTED</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span>SOUND ON</span>
              </>
            )}
          </button>

          {/* Next / Prev Reel & Video Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevReel}
              className="px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full bg-black/60 hover:bg-white hover:text-black border border-white/40 backdrop-blur-md text-xs sm:text-sm font-mono uppercase tracking-wider text-white transition-all cursor-pointer active:scale-95 flex items-center gap-1 shadow-2xl"
              title="Previous Reel"
              aria-label="Previous Reel"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">PREV</span>
            </button>

            <button
              type="button"
              onClick={handleNextReel}
              className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-black/60 hover:bg-white hover:text-black border border-white/40 backdrop-blur-md text-xs sm:text-sm font-mono uppercase tracking-wider text-white transition-all cursor-pointer active:scale-95 flex items-center gap-1 shadow-2xl font-semibold"
              title="Next Reel"
              aria-label="Next Reel"
            >
              <span>NEXT</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={restartVideo}
              className="p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-white hover:text-black border border-white/40 backdrop-blur-md text-white transition-all cursor-pointer active:scale-95 shadow-2xl"
              title="Restart Reel"
              aria-label="Restart Reel"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-white hover:text-black border border-white/40 backdrop-blur-md text-white transition-all cursor-pointer active:scale-95 shadow-2xl"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              aria-label="Toggle fullscreen"
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4" />
              ) : (
                <Maximize className="w-4 h-4" />
              )}
            </button>

            <Link
              to="/contact"
              className="hidden md:inline-flex px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-neutral-200 active:scale-95 transition-all shadow-xl items-center gap-1.5"
            >
              <span>BOOK SHOOT</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. THE 4-REEL MASTER ARCHIVE & EDITORIAL SHOWCASE        */}
      {/* ======================================================== */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-16 border-t border-white/10 bg-[#080808]">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/60 font-semibold block">
                  SHOWREEL ARCHIVE // {showreels.length} MASTER EDITIONS
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-white leading-tight">
                FOUR EDITIONS. <br />
                ONE UNCOMPROMISING STANDARD.
              </h2>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
                Explore all four production reels featuring signature commercial films, cultural cinema, devotional visuals, and contemporary style spots. Click any reel to load into the master cinema theatre.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold">
                ACTIVE: REEL {activeReel.number}
              </span>
            </div>
          </div>

          {/* 4-Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {showreels.map((reel, idx) => {
              const isActive = idx === activeReelIdx;

              return (
                <div
                  key={reel.id}
                  onClick={() => scrollToTheatre(idx)}
                  className={`group relative rounded-3xl border overflow-hidden transition-all duration-500 cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? "border-emerald-500/60 bg-white/[0.08] shadow-[0_20px_60px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/40"
                      : "border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.05]"
                  }`}
                >
                  {/* Top Video Preview Stage */}
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <video
                      src={reel.src}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onMouseEnter={(e) => {
                        const target = e.currentTarget;
                        target.play().catch(() => {});
                      }}
                      onMouseLeave={(e) => {
                        const target = e.currentTarget;
                        target.pause();
                        target.currentTime = 0;
                      }}
                      className="w-full h-full object-cover bg-black transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                    {/* Badge Overlay */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white font-bold uppercase tracking-wider">
                        REEL {reel.number}
                      </span>
                      {isActive && (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-black text-[9px] font-mono font-extrabold uppercase tracking-widest flex items-center gap-1 shadow-lg">
                          <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                          NOW PLAYING
                        </span>
                      )}
                    </div>

                    {/* Center Play Button on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black shadow-xl">
                        <Play className="w-5 h-5 fill-current translate-x-0.5" />
                      </div>
                    </div>

                    {/* Duration / Format Pill */}
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono text-white/80">
                        {reel.duration}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400 block font-semibold">
                        {reel.category}
                      </span>
                      <h3 className="text-xl font-display font-extrabold text-white uppercase tracking-tight group-hover:text-emerald-300 transition-colors">
                        {reel.title}
                      </h3>
                      <p className="text-xs text-white/65 leading-relaxed font-light line-clamp-3">
                        {reel.description}
                      </p>
                    </div>

                    {/* Tags & Action Button */}
                    <div className="space-y-4 pt-3 border-t border-white/10">
                      <div className="flex flex-wrap gap-1.5">
                        {reel.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-white/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToTheatre(idx);
                        }}
                        className={`w-full py-2.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isActive
                            ? "bg-white text-black shadow-lg"
                            : "bg-white/10 text-white hover:bg-white hover:text-black border border-white/20"
                        }`}
                      >
                        <span>{isActive ? "VIEWING IN THEATRE" : "PLAY IN 4K THEATRE"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Reel Feature Breakdown */}
          <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.05] to-transparent p-6 sm:p-10 backdrop-blur-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 font-semibold block mb-1">
                  CURRENTLY ACTIVE • {activeReel.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white uppercase tracking-tight">
                  {activeReel.title}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-white/80 uppercase">
                  {activeReel.specs}
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-white/75 leading-relaxed font-light max-w-4xl">
              {activeReel.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {activeReel.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Technical Production Pipeline Specs */}
          <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.04] to-transparent p-6 sm:p-10 backdrop-blur-xl space-y-6">
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-white/60" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/60 font-semibold">
                MASTER SPECIFICATIONS &amp; CAMERA INFRASTRUCTURE
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "CAPTURE PIPELINE", desc: "4K & 8K Cinema Sensors, Prime Cine Glass & High-Speed Slow-Mo" },
                { title: "COLOR MASTERY", desc: "DaVinci Resolve Studio ACES Color Pipeline with HDR Grading" },
                { title: "AUDIO DIRECTION", desc: "Immersive 5.1 Surround & Spatial Stereo Master Sound Design" },
                { title: "LOCATION READINESS", desc: "Rapid Multi-Crew Deployment across Bengaluru & Pan-India" },
              ].map((spec) => (
                <div key={spec.title} className="space-y-1.5 border-l-2 border-white/20 pl-4">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="text-xs font-mono font-bold tracking-wider">{spec.title}</span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed font-light">{spec.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA Banner */}
          <div className="text-center py-10 space-y-5">
            <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white uppercase tracking-tight">
              HAVE A COMMERCIAL OR FILM TO PRODUCE?
            </h3>
            <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto font-light">
              Let&apos;s collaborate to craft visual storytelling with the same production caliber and cinematic precision.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-neutral-200 active:scale-95 transition-all shadow-xl"
              >
                START A PROJECT →
              </Link>
              <Link
                to="/services"
                className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs uppercase tracking-wider font-medium active:scale-95 transition-all"
              >
                EXPLORE SERVICES
              </Link>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
