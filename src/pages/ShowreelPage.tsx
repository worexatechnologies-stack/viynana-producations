"use client";

import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
} from "lucide-react";

const showreelData = {
  title: "Viyana Productions Master Showreel",
  subtitle: "High-Impact Commercial Films, TVCs & Cinematic Visuals",
  src: "/website-video-2.mp4",
  poster: "/images/website-video-2-poster.jpg",
  specs: "4K DCI 60FPS • DOLBY VISION • ACES COLOR",
};

export default function ShowreelPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [fitMode, setFitMode] = useState<"contain" | "cover">("contain");

  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-hide controls after 2.5s of no interaction when video is playing
  const resetHideTimer = useCallback(() => {
    setControlsVisible(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    if (isPlaying) {
      hideTimeoutRef.current = setTimeout(() => {
        setControlsVisible(false);
      }, 2500);
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

  // Container tap handler: toggles controls or play
  const handleContainerClick = () => {
    if (!controlsVisible) {
      setControlsVisible(true);
      resetHideTimer();
      return;
    }
    togglePlay();
  };

  // Play / Pause toggle
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    setHasInteracted(true);
    if (video.paused) {
      if (!hasInteracted) {
        video.muted = false;
        setIsMuted(false);
      }
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  // Mute / Unmute toggle
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
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
  };

  // Seek bar click / drag
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <main className="min-h-screen bg-brand-black text-brand-light overflow-hidden flex flex-col justify-between select-none">
      <Navbar />

      <section
        ref={containerRef}
        onMouseMove={resetHideTimer}
        onClick={handleContainerClick}
        className="relative w-full h-[100svh] flex items-center justify-center bg-black cursor-pointer overflow-hidden group"
      >
        {/* Ambient Video Glow Layer (fills mobile vertical letterbox with cinema atmosphere) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-3xl opacity-35 pointer-events-none sm:hidden"
        >
          <source src={showreelData.src} type="video/mp4" />
        </video>

        {/* Master Showreel Video (Responsive fit/fill on mobile, cover on desktop) */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={showreelData.poster}
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
          className={`relative z-10 w-full h-full pointer-events-none transition-all duration-300 ${
            fitMode === "contain"
              ? "object-contain sm:object-cover"
              : "object-cover"
          }`}
        >
          <source src={showreelData.src} type="video/mp4" />
        </video>

        {/* Ambient Top & Bottom Gradient Vignettes */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/60 z-10" />

        {/* Center State: Only shown when video is paused or before user starts unmuted watching */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center bg-black/40 backdrop-blur-sm pointer-events-none"
            >
              <div className="w-16 h-16 sm:w-28 sm:h-28 rounded-full bg-white/20 backdrop-blur-2xl border border-white/40 flex items-center justify-center text-white shadow-[0_0_60px_rgba(255,255,255,0.25)] mb-3 sm:mb-6 group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-300">
                <Play className="w-6 h-6 sm:w-12 sm:h-12 fill-current translate-x-0.5 sm:translate-x-1" />
              </div>
              <h1 className="text-2xl sm:text-6xl md:text-7xl font-serif tracking-tighter uppercase mb-1.5 sm:mb-3 text-white drop-shadow-lg">
                {hasInteracted ? "PAUSED" : "PLAY SHOWREEL"}
              </h1>
              <p className="text-[10px] sm:text-xs tracking-[0.25em] uppercase font-mono text-white/90 max-w-md drop-shadow">
                {hasInteracted
                  ? "TAP ANYWHERE TO RESUME"
                  : `${showreelData.title} • TAP TO PLAY`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cinema HUD Controls Bar (Fades out when playing and mouse/touch is idle) */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute bottom-0 left-0 right-0 z-30 p-2.5 sm:p-6 pb-[max(0.85rem,env(safe-area-inset-bottom))] transition-all duration-500 cursor-default ${
            controlsVisible
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <div className="max-w-5xl mx-auto bg-brand-black/95 sm:bg-brand-black/85 backdrop-blur-2xl border border-white/20 rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-2xl space-y-2 sm:space-y-4">
            
            {/* Progress Scrubber */}
            <div className="space-y-1">
              <div className="relative w-full h-2 group/slider cursor-pointer flex items-center">
                {/* Track background */}
                <div className="absolute inset-0 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-75"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                {/* HTML Range Input Overlay */}
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  value={currentTime}
                  onChange={handleSeek}
                  aria-label="Video scrubber"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
              </div>
            </div>

            {/* Bottom Row Controls */}
            <div className="flex items-center justify-between gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
              
              {/* Left Group: Play/Pause, Audio, Timestamps */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Play/Pause */}
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 transition-all cursor-pointer active:scale-90 shrink-0"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-current" />
                  ) : (
                    <Play className="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-current translate-x-0.5" />
                  )}
                </button>

                {/* Restart */}
                <button
                  type="button"
                  onClick={restartVideo}
                  className="p-2 sm:p-3 rounded-full bg-white/5 hover:bg-white/20 text-white/80 hover:text-white border border-white/10 transition-all cursor-pointer active:scale-90 shrink-0"
                  title="Restart from beginning"
                  aria-label="Restart video"
                >
                  <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>

                {/* Mute/Unmute */}
                <button
                  type="button"
                  onClick={toggleMute}
                  className={`px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full border text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all cursor-pointer active:scale-95 flex items-center gap-1.5 shrink-0 ${
                    isMuted
                      ? "bg-red-500/20 text-red-200 border-red-500/40 hover:bg-red-500/30"
                      : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                  }`}
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>MUTED</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>SOUND ON</span>
                    </>
                  )}
                </button>

                {/* Time Display */}
                <span className="text-[10px] sm:text-xs font-mono text-white/70 tracking-wider shrink-0">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Right Group: Fit/Fill Toggle, Cinema Specs, Fullscreen & Contact CTA */}
              <div className="flex items-center gap-1.5 sm:gap-3 ml-auto shrink-0">
                {/* Mobile Fit/Fill Aspect Ratio Switcher */}
                <button
                  type="button"
                  onClick={() => setFitMode(fitMode === "contain" ? "cover" : "contain")}
                  className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-white transition-all cursor-pointer active:scale-95 flex items-center gap-1"
                  title="Toggle Mobile Aspect Ratio: Fit (Whole Frame) vs Fill (Full Screen)"
                >
                  <span className="text-white/50 hidden sm:inline">VIEW:</span>
                  <span className="font-semibold">{fitMode === "contain" ? "FIT" : "FILL"}</span>
                </button>

                {/* Tech Specs (desktop) */}
                <div className="hidden lg:flex items-center text-[11px] font-mono text-white/50 tracking-wider">
                  <span>{showreelData.specs}</span>
                </div>

                {/* Fullscreen Toggle */}
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="p-2 sm:p-3 rounded-full bg-white/5 hover:bg-white/20 text-white/80 hover:text-white border border-white/10 transition-all cursor-pointer active:scale-90"
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  aria-label="Toggle fullscreen"
                >
                  {isFullscreen ? (
                    <Minimize className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  ) : (
                    <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  )}
                </button>

                {/* CTA Link */}
                <Link
                  to="/contact"
                  className="px-3.5 py-1.5 sm:px-6 sm:py-2.5 rounded-full bg-white text-black text-[10px] sm:text-xs font-mono uppercase tracking-widest font-bold hover:bg-brand-light active:scale-95 transition-all shadow-md shrink-0"
                >
                  <span className="hidden sm:inline">START A PROJECT →</span>
                  <span className="sm:hidden">CONTACT →</span>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
