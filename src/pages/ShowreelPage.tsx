"use client";

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { showreels, Showreel } from "@/data/showreels";
import {
  Volume2,
  VolumeX,
  Maximize2,
  Film,
  ArrowRight,
  CheckCircle2,
  Sliders,
  Play,
  Pause,
  ChevronDown,
} from "lucide-react";

interface ReelItemProps {
  reel: Showreel;
  index: number;
  total: number;
  unmutedReelId: string | null;
  onToggleSound: (id: string) => void;
}

function ReelItem({
  reel,
  index,
  total,
  unmutedReelId,
  onToggleSound,
}: ReelItemProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isMuted = unmutedReelId !== reel.id;

  // Auto-play when reel is in viewport, pause when offscreen
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    video.muted = isMuted;

    // Trigger initial play
    video.play().catch(() => {});

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Keep muted attribute synced & ensure video continues playing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
    if (!isMuted && video.paused) {
      video.play().catch(() => {});
    }
  }, [isMuted]);

  // Fullscreen listener ensuring vertical 9:16 reels display completely without zoom/crop
  useEffect(() => {
    const handleFullscreenChange = () => {
      const video = videoRef.current;
      if (!video) return;
      const isFs =
        document.fullscreenElement === video ||
        (document as any).webkitFullscreenElement === video ||
        (document as any).mozFullScreenElement === video ||
        (document as any).msFullscreenElement === video;

      if (isFs) {
        video.style.objectFit = "contain";
        video.style.backgroundColor = "#000000";
      } else {
        video.style.objectFit = "cover";
        video.style.backgroundColor = "";
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  const handleFullScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    // Immediately enforce object-fit contain so the initial fullscreen frame is never cropped
    video.style.objectFit = "contain";
    video.style.backgroundColor = "#000000";

    if (video.requestFullscreen) {
      video.requestFullscreen().catch(() => {});
    } else if ((video as any).webkitRequestFullscreen) {
      (video as any).webkitRequestFullscreen();
    } else if ((video as any).webkitEnterFullscreen) {
      (video as any).webkitEnterFullscreen();
    } else if ((video as any).msRequestFullscreen) {
      (video as any).msRequestFullscreen();
    }
  };

  const isWidescreen = reel.aspectRatio === "16:9";
  const isReversed = index % 2 === 1;

  return (
    <article
      id={reel.id}
      ref={containerRef}
      className="scroll-mt-28 relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#0e0e0e] to-[#070707] p-5 sm:p-8 lg:p-12 overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.85)]"
    >
      {/* Subtle Background Glow matching cinema mood */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* Reel Header Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-white/10 mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-white/10 text-white font-mono text-xs font-bold uppercase tracking-wider">
            REEL {reel.number} / {String(total).padStart(2, "0")}
          </span>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 font-semibold">
            {reel.category}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-white/60">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>PLAYING NOW</span>
          <span className="text-white/30">•</span>
          <span className="text-white/80 uppercase">{reel.duration || "4K MASTER"}</span>
        </div>
      </div>

      {/* Main Content Layout */}
      {isWidescreen ? (
        /* Widescreen 16:9 Layout */
        <div className="space-y-6 sm:space-y-8">
          {/* 16:9 Cinema Player with clean video and sound mute icon only */}
          <div
            onClick={() => onToggleSound(reel.id)}
            className="group relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-black border border-white/15 shadow-[0_20px_70px_rgba(0,0,0,0.9)] cursor-pointer"
          >
            <video
              ref={videoRef}
              src={reel.src}
              poster={reel.poster}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload={index === 0 ? "auto" : "metadata"}
              className="w-full h-full object-cover fullscreen:object-contain fullscreen:bg-black transition-transform duration-700 group-hover:scale-[1.01]"
            >
              <source src={reel.src} type="video/mp4" />
              {reel.fallbackSrc && <source src={reel.fallbackSrc} type="video/mp4" />}
            </video>

            {/* Full View / Fullscreen Icon Button (Top-Right) */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 pointer-events-auto">
              <button
                type="button"
                onClick={handleFullScreen}
                aria-label="View reel in full screen"
                title="View reel in full screen"
                className="group/fs w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/85 text-white/90 hover:text-white border border-white/20 hover:border-white/40 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.7)] backdrop-blur-md active:scale-95 hover:scale-110"
              >
                <Maximize2 className="w-5 h-5 transition-transform group-hover/fs:scale-110 text-white/90" />
              </button>
            </div>

            {/* Sound Mute/Unmute Icon Button */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 pointer-events-auto">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSound(reel.id);
                }}
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                title={isMuted ? "Click to unmute sound" : "Click to mute sound"}
                className={`group/sound relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.7)] backdrop-blur-md active:scale-95 ${
                  !isMuted
                    ? "bg-emerald-500 text-black border border-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:bg-emerald-400 hover:scale-110"
                    : "bg-black/60 hover:bg-black/85 text-white/90 hover:text-white border border-white/20 hover:border-white/40 hover:scale-110"
                }`}
              >
                {!isMuted ? (
                  <>
                    <span className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping pointer-events-none" />
                    <Volume2 className="w-5 h-5 relative z-10 transition-transform group-hover/sound:scale-110" />
                  </>
                ) : (
                  <VolumeX className="w-5 h-5 transition-transform group-hover/sound:scale-110 text-white/80" />
                )}
              </button>
            </div>
          </div>

          {/* Reel Editorial Details Strip */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
            <div className="lg:col-span-8 space-y-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold uppercase tracking-tight text-white">
                {reel.title}
              </h2>
              <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-3xl">
                {reel.description}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end lg:items-end">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono space-y-1 w-full lg:max-w-xs">
                <span className="text-white/40 block">TECHNICAL SPECS</span>
                <span className="text-emerald-400 font-semibold block leading-tight">{reel.specs}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 w-full justify-end">
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-neutral-200 active:scale-95 transition-all text-center flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>BOOK THIS PRODUCTION</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={handleFullScreen}
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 hover:border-white/40 text-white font-mono text-xs uppercase tracking-wider font-medium transition-all inline-flex items-center gap-2 cursor-pointer backdrop-blur-md shadow-lg group/fsbtn"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-emerald-400 transition-transform group-hover/fsbtn:scale-110" />
                  <span>FULL VIEW</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Vertical 9:16 Cinema Reel Layout */
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
            isReversed ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* Vertical Video Stage Column with sound mute icon only */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              onClick={() => onToggleSound(reel.id)}
              className="group relative aspect-[9/16] w-full max-w-[340px] sm:max-w-[380px] rounded-3xl overflow-hidden bg-black border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.95)] cursor-pointer"
            >
              <video
                ref={videoRef}
                src={reel.src}
                poster={reel.poster}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload={index === 0 ? "auto" : "metadata"}
                className="w-full h-full object-cover fullscreen:object-contain fullscreen:bg-black transition-transform duration-700 group-hover:scale-[1.02]"
              >
                <source src={reel.src} type="video/mp4" />
                {reel.fallbackSrc && <source src={reel.fallbackSrc} type="video/mp4" />}
              </video>

              {/* Full View / Fullscreen Icon Button (Top-Right) */}
              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 pointer-events-auto">
                <button
                  type="button"
                  onClick={handleFullScreen}
                  aria-label="View reel in full screen"
                  title="View reel in full screen"
                  className="group/fs w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/85 text-white/90 hover:text-white border border-white/20 hover:border-white/40 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.7)] backdrop-blur-md active:scale-95 hover:scale-110"
                >
                  <Maximize2 className="w-5 h-5 transition-transform group-hover/fs:scale-110 text-white/90" />
                </button>
              </div>

              {/* Sound Mute/Unmute Icon Button */}
              <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 z-20 pointer-events-auto">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSound(reel.id);
                  }}
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  title={isMuted ? "Click to unmute sound" : "Click to mute sound"}
                  className={`group/sound relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.7)] backdrop-blur-md active:scale-95 ${
                    !isMuted
                      ? "bg-emerald-500 text-black border border-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:bg-emerald-400 hover:scale-110"
                      : "bg-black/60 hover:bg-black/85 text-white/90 hover:text-white border border-white/20 hover:border-white/40 hover:scale-110"
                  }`}
                >
                  {!isMuted ? (
                    <>
                      <span className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping pointer-events-none" />
                      <Volume2 className="w-5 h-5 relative z-10 transition-transform group-hover/sound:scale-110" />
                    </>
                  ) : (
                    <VolumeX className="w-5 h-5 transition-transform group-hover/sound:scale-110 text-white/80" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Editorial Story Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-400 font-semibold block">
                {reel.subtitle}
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-white leading-tight">
                {reel.title}
              </h2>
              <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed">
                {reel.description}
              </p>
            </div>

            {/* Production Specifications Block */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-white/50 text-xs font-mono uppercase tracking-wider">
                <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                <span>TECHNICAL MASTER SPECIFICATIONS</span>
              </div>
              <p className="text-xs sm:text-sm font-mono text-emerald-300 font-semibold">
                {reel.specs}
              </p>
            </div>

            {/* CTA & Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="px-7 py-3 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-neutral-200 active:scale-95 transition-all shadow-xl inline-flex items-center gap-2"
              >
                <span>COMMISSION A REEL LIKE THIS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={handleFullScreen}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 hover:border-white/40 text-white font-mono text-xs uppercase tracking-wider font-medium transition-all inline-flex items-center gap-2.5 cursor-pointer backdrop-blur-md shadow-lg group/fsbtn"
              >
                <Maximize2 className="w-4 h-4 text-emerald-400 transition-transform group-hover/fsbtn:scale-110" />
                <span>FULL VIEW</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default function ShowreelPage() {
  const [unmutedReelId, setUnmutedReelId] = useState<string | null>(null);
  const [heroPlaying, setHeroPlaying] = useState(true);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const heroReel = showreels[0];
  const isHeroMuted = unmutedReelId !== heroReel.id;

  const handleToggleSound = (id: string) => {
    setUnmutedReelId((prev) => (prev === id ? null : id));
  };

  const handleHeroSoundToggle = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    handleToggleSound(heroReel.id);
  };

  const handleHeroPlayToggle = () => {
    const video = heroVideoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setHeroPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setHeroPlaying(false);
    }
  };

  const handleHeroFullScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = heroVideoRef.current;
    if (!video) return;

    video.style.objectFit = "contain";
    video.style.backgroundColor = "#000000";

    if (video.requestFullscreen) {
      video.requestFullscreen().catch(() => {});
    } else if ((video as any).webkitRequestFullscreen) {
      (video as any).webkitRequestFullscreen();
    } else if ((video as any).webkitEnterFullscreen) {
      (video as any).webkitEnterFullscreen();
    } else if ((video as any).msRequestFullscreen) {
      (video as any).msRequestFullscreen();
    }
  };

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    video.muted = isHeroMuted;
    if (!isHeroMuted && video.paused) {
      video.play().catch(() => {});
    }
  }, [isHeroMuted]);

  return (
    <main className="min-h-screen bg-[#050505] text-[#f3f3ef] select-none">
      <SEO
        title="Video Production Company in Bangalore | Viyana Productions"
        description="Looking for a video production company in Bangalore? Viyana Productions creates high-quality films, commercial ads, and engaging visual content for brands."
        keywords="video production company in bangalore, film production company in bangalore, creative production company bangalore, commercial video production company, cinematic video production, advertising production houses in bangalore, brand film production company"
        ogTitle="Video Production Company in Bangalore | Viyana Productions"
        ogType="website"
        ogDescription="Discover Viyana Productions, a video production company in Bangalore specializing in film production, commercial advertising, corporate videos, and visual storytelling."
        ogUrl="https://viyana.productions/showreel"
        ogSiteName="Viyana Productions"
        ogImage="https://viyana.productions/logo-black.png"
        twitterSite="https://twitter.com/"
        twitterTitle="Video Production Company in Bangalore | Bring Your Vision to Life"
        twitterDescription="Looking for a trusted video production company in Bangalore? Viyana Productions brings your ideas to life with creative films, commercial videos, photoshoots, and compelling visual storytelling."
        author="Akshay"
        canonical="https://viyana.productions/showreel"
        robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        publisher="Viyana Productions"
        ogLocale="en_US"
      />

      <Navbar />

      {/* ======================================================== */}
      {/* 1. CINEMATIC FULL-SCREEN HERO VIDEO SECTION              */}
      {/* ======================================================== */}
      <section
        id={heroReel.id}
        className="relative w-full h-[100dvh] min-h-[640px] max-h-[1080px] bg-black overflow-hidden flex flex-col justify-between"
      >
        {/* Full-Screen Hero Background Video */}
        <div
          onClick={handleHeroPlayToggle}
          className="absolute inset-0 z-0 cursor-pointer group/hero"
        >
          <video
            ref={heroVideoRef}
            src={heroReel.src}
            poster={heroReel.poster}
            autoPlay
            loop
            muted={isHeroMuted}
            playsInline
            preload="auto"
            className="w-full h-full object-cover filter brightness-[0.98] contrast-[1.02] transition-transform duration-1000 scale-[1.01] group-hover/hero:scale-[1.02]"
          >
            <source src={heroReel.src} type="video/mp4" />
            {heroReel.fallbackSrc && <source src={heroReel.fallbackSrc} type="video/mp4" />}
          </video>

          {/* Cinematic lighting gradients */}
          {/* Top gradient for Navbar legibility */}
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/85 via-black/35 to-transparent pointer-events-none" />
          {/* Bottom gradient for CTA legibility */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
          {/* Radial center vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.45)_100%)] pointer-events-none" />
        </div>

        {/* Top spacer & badges (under Navbar) */}
        <div className="relative z-10 pt-24 sm:pt-28 px-4 sm:px-8 lg:px-16 container mx-auto max-w-7xl flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md shadow-xl text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>REEL {heroReel.number} // {heroReel.category}</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-white/70 bg-black/50 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
            <span>4K UHD 60FPS</span>
            <span className="text-white/30">•</span>
            <span className="text-emerald-400">ACES GRADED</span>
          </div>
        </div>

        {/* Hero Bottom Editorial Strip & Interactive Controls */}
        <div className="relative z-20 pb-8 sm:pb-12 px-4 sm:px-8 lg:px-16 container mx-auto max-w-7xl">
          <div className="space-y-4 sm:space-y-6">
            
            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              
              {/* Left Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <Link
                  to="/contact"
                  className="px-6 sm:px-8 py-3.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-neutral-200 active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.2)] inline-flex items-center gap-2"
                >
                  <span>START A PROJECT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  type="button"
                  onClick={handleHeroFullScreen}
                  className="px-5 sm:px-6 py-3.5 rounded-full bg-black/50 hover:bg-black/75 active:scale-95 border border-white/25 hover:border-white/50 text-white font-mono text-xs uppercase tracking-wider font-medium transition-all inline-flex items-center gap-2 backdrop-blur-md cursor-pointer shadow-lg"
                >
                  <Maximize2 className="w-4 h-4 text-emerald-400" />
                  <span>FULL SCREEN</span>
                </button>

                <button
                  type="button"
                  onClick={handleHeroPlayToggle}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/75 active:scale-95 border border-white/25 hover:border-white/50 text-white flex items-center justify-center transition-all backdrop-blur-md cursor-pointer shadow-lg"
                  aria-label={heroPlaying ? "Pause video" : "Play video"}
                  title={heroPlaying ? "Pause video" : "Play video"}
                >
                  {heroPlaying ? (
                    <Pause className="w-4 h-4 text-white/90" />
                  ) : (
                    <Play className="w-4 h-4 text-white/90 fill-white/90 translate-x-0.5" />
                  )}
                </button>
              </div>

              {/* Right: Sound Toggle Button & Scroll hint */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleHeroSoundToggle}
                  aria-label={isHeroMuted ? "Unmute master soundtrack" : "Mute audio"}
                  title={isHeroMuted ? "Unmute master soundtrack" : "Mute audio"}
                  className={`relative flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full transition-all duration-300 cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.7)] backdrop-blur-md active:scale-95 font-mono text-xs uppercase tracking-wider ${
                    !isHeroMuted
                      ? "bg-emerald-500 text-black border border-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.5)] font-bold hover:bg-emerald-400"
                      : "bg-black/60 hover:bg-black/85 text-white border border-white/25 hover:border-white/50"
                  }`}
                >
                  {!isHeroMuted ? (
                    <>
                      <Volume2 className="w-4 h-4 animate-pulse" />
                      <span>SOUND ON</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-4 h-4 text-white/70" />
                      <span>UNMUTE AUDIO</span>
                    </>
                  )}
                </button>

                <a
                  href="#showreel-archive"
                  aria-label="Scroll to explore showreels archive"
                  className="hidden md:flex w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/75 border border-white/20 hover:border-white/40 text-white items-center justify-center transition-all backdrop-blur-md active:scale-95"
                >
                  <ChevronDown className="w-4 h-4 animate-bounce text-white/80" />
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. SHOWREEL ARCHIVE COLLECTION                           */}
      {/* ======================================================== */}
      <section
        id="showreel-archive"
        className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto space-y-12 sm:space-y-16"
      >
        {/* Archive Section Header & Navigation */}
        <div className="space-y-6 pb-6 border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>COMPLETE DIRECTORIAL ARCHIVE</span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-white">
                FLAGSHIP &amp; CULTURAL REELS
              </h2>
              <p className="text-sm sm:text-base text-white/70 font-light max-w-2xl leading-relaxed">
                Explore our full spectrum of directional cuts, vertical mobile series, and cinematic cultural productions. Each master reel plays automatically as you scroll.
              </p>
            </div>

            {/* Quick jump pills */}
            <div className="flex flex-wrap items-center gap-2">
              {showreels.map((reel) => (
                <a
                  key={reel.id}
                  href={`#${reel.id}`}
                  className="px-3 sm:px-3.5 py-2 rounded-full bg-white/[0.04] hover:bg-white hover:text-black border border-white/10 hover:border-white text-[10px] sm:text-xs font-mono uppercase tracking-wider text-white/80 transition-all active:scale-95 flex items-center gap-2 group shadow-md"
                >
                  <span className="text-emerald-400 group-hover:text-black font-bold">
                    REEL {reel.number}
                  </span>
                  <span className="text-white/30 group-hover:text-black/50">•</span>
                  <span className="font-medium">{reel.title.replace("Viyana ", "")}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Showreels List (Reel 02 onwards, with full editorial detail) */}
        <div className="space-y-14 sm:space-y-20 lg:space-y-24">
          {showreels.slice(1).map((reel, index) => (
            <ReelItem
              key={reel.id}
              reel={reel}
              index={index + 1}
              total={showreels.length}
              unmutedReelId={unmutedReelId}
              onToggleSound={handleToggleSound}
            />
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. TECHNICAL CAMERA INFRASTRUCTURE & POST PIPELINE       */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/10 bg-[#070707]">
        <div className="max-w-7xl mx-auto space-y-12">
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
          <div className="text-center py-8 space-y-5">
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
