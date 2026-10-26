"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoModal from "@/components/VideoModal";
import { directors, Director } from "@/data/directors";
import {
  Play,
  ArrowUpRight,
  MessageSquare,
  X,
  ChevronLeft,
  ChevronRight,
  Pause,
} from "lucide-react";

// Monochromatic luxury palette for all directors
const monochromeTheme = {
  color: "#ffffff",
  glow: "rgba(255, 255, 255, 0.15)",
  badgeBg: "bg-white/10",
  badgeBorder: "border-white/20",
  badgeText: "text-white",
  borderHover: "hover:border-white/50",
  glowHover: "group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(255,255,255,0.1)]",
  bgTint: "from-white/10 via-transparent to-transparent",
  shimmer: "group-hover:via-white/70",
  pillColor: "bg-white",
};

const directorThemes: Record<string, typeof monochromeTheme> = {
  "preethish": monochromeTheme,
  "elena-rostova": monochromeTheme,
};

const defaultTheme = monochromeTheme;

export default function DirectorsPage() {
  const [viewMode] = useState<"marquee" | "grid" | "list">(
    directors.length > 3 ? "marquee" : "grid"
  );
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const [selectedDirectorForDrawer, setSelectedDirectorForDrawer] = useState<Director | null>(null);
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; director: Director | null }>({
    isOpen: false,
    director: null,
  });

  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const filteredDirectors = directors;

  // Duplicated list for infinite seamless horizontal loop
  const duplicatedDirectors = useMemo(() => {
    return [...filteredDirectors, ...filteredDirectors, ...filteredDirectors];
  }, [filteredDirectors]);

  const openVideo = (director: Director) => {
    setVideoModal({ isOpen: true, director });
  };


  const handleManualScroll = (direction: "left" | "right") => {
    if (scrollTrackRef.current) {
      const shift = direction === "left" ? -440 : 440;
      scrollTrackRef.current.scrollBy({ left: shift, behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-brand-black text-brand-light selection:bg-white selection:text-black relative overflow-x-hidden">
      <SEO
        title="Director Showreel | Viyana Productions Film & Commercial Reel"
        description="Explore the director showreel at Viyana Productions to discover creative vision, cinematic storytelling, visual direction, and filmmaking across diverse projects."
        keywords="director showreel, best advertising directors, ad film directors in bangalore, directors for brand films, film directors in bangalore, hire a commercial film director in india"
        ogTitle="Director Showreel | Viyana Productions Cinematic Vision by Viyana Productions"
        ogType="website"
        ogDescription="Discover the creative vision behind Viyana Productions through our Director Showreel. Explore cinematic storytelling, visual direction, and filmmaking across diverse projects."
        ogUrl="https://viyana.productions/directors"
        ogSiteName="Viyana Productions"
        ogImage="https://viyana.productions/logo-black.png"
        twitterSite="https://twitter.com/"
        twitterTitle="Director Showreel | Viyana Productions Showcase of Film and Commercials"
        twitterDescription="Watch the director showreel from Viyana Productions to experience our unique storytelling and visual style, featuring captivating films and innovative filmmaking techniques that inspire audiences."
        author="Akshay"
        canonical="https://viyana.productions/directors"
        robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        publisher="Viyana Productions"
        ogLocale="en_US"
      />

      <Navbar />

      {/* Video Modal */}
      <VideoModal
        isOpen={videoModal.isOpen}
        onClose={() => setVideoModal({ isOpen: false, director: null })}
        videoSrc={videoModal.director?.reelSrc || "/showreel-video-4k-h264.mp4"}
        title={videoModal.director ? `${videoModal.director.name} // Director Reel` : "Director Reel"}
        category={videoModal.director?.specialization || "DIRECTOR REEL"}
      />

      {/* 1. HERO SECTION WITH COLORFUL AURORA MESH */}
      <section className="pt-16 sm:pt-28 pb-10 sm:pb-16 px-4 sm:px-10 lg:px-16 border-b border-white/10 relative overflow-hidden">
        {/* Colorful Atmospheric Aurora Mesh Lighting (GPU-optimized radial gradients) */}
        <div className="absolute top-0 left-0 right-0 h-[650px] pointer-events-none overflow-hidden opacity-60">
          <div className="absolute -top-24 left-[10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.18)_0%,transparent_70%)]" />
          <div className="absolute top-0 right-[15%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.18)_0%,transparent_70%)]" />
          <div className="absolute top-44 left-[40%] w-[500px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.14)_0%,transparent_70%)]" />
          <div className="absolute top-80 right-[5%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(244,63,94,0.14)_0%,transparent_70%)]" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Status Pill */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] sm:tracking-[0.25em] text-white/70 mb-5 sm:mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
              <span className="font-semibold text-white/90">DIRECTING ROSTER // VIYANA PRODUCTIONS</span>
              <span className="text-white/20 hidden sm:inline">•</span>
              <span className="text-white/60 font-mono">BANGALORE &amp; GLOBAL</span>
            </div>

            {/* Monumental Headline */}
            <h1 className="text-[clamp(2.25rem,9vw,3.5rem)] sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight uppercase leading-[0.98] sm:leading-[0.92] text-white mb-6 sm:mb-8">
              STORIES SHAPED <br />
              <span className="text-white">
                BY <br className="sm:hidden" />DISTINCTIVE VISION.
              </span>
            </h1>

            {/* Subtitle & Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end pt-1 sm:pt-2">
              <div className="lg:col-span-8 space-y-4 sm:space-y-6">
                <p className="text-base sm:text-xl text-brand-grey font-light leading-relaxed max-w-2xl">
                  A curated roster of directors bringing unique creative perspectives, visual language, and storytelling techniques to every production.
                </p>
                <a
                  href="#director-roster"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white hover:text-brand-grey transition-colors font-medium"
                >
                  <span>BROWSE THE ROSTER</span>
                  <span>→</span>
                </a>
              </div>

              <div className="lg:col-span-4 flex items-center justify-between sm:justify-start lg:justify-end gap-3 sm:gap-6 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-white/50">
                <div>
                  <span className="text-2xl font-serif text-white block leading-none">{directors.length.toString().padStart(2, "0")}</span>
                  <span className="text-[10px] mt-1 block">Roster Director</span>
                </div>
                <div className="h-8 w-[1px] bg-white/15" />
                <div>
                  <span className="text-2xl font-serif text-white block leading-none">01</span>
                  <span className="text-[10px] mt-1 block">Lead Discipline</span>
                </div>
                <div className="h-8 w-[1px] bg-white/15" />
                <div>
                  <span className="text-2xl font-serif text-white block leading-none">2026</span>
                  <span className="text-[10px] mt-1 block">Inquiries Open</span>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* 2. DIRECTORS ROSTER SECTION */}
      <section id="director-roster" className="scroll-mt-16 py-14 sm:py-20 overflow-hidden relative">
        {viewMode === "marquee" && filteredDirectors.length > 3 ? (
          /* HORIZONTAL CONTINUOUS MOTION TRACK (Only when > 3 directors) */
          <div className="w-full relative space-y-4">
            <div className="container mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 flex items-center justify-between text-xs font-mono uppercase text-white/60">
              <span className="tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                <span className="font-semibold text-white/90">ROSTER SHOWCASE // AUTOMATIC CINEMA TRACK</span>
              </span>
              <span className="text-[10px] text-white/40">FEATURED DIRECTORIAL SHOWCASE</span>
            </div>

            <div
              ref={scrollTrackRef}
              className="w-full overflow-x-hidden py-4"
            >
              <div className={`directors-track-auto flex gap-8 sm:gap-10 md:gap-12 px-6 sm:px-10 ${isMarqueePaused ? "directors-track-paused" : ""}`}>
                {duplicatedDirectors.map((director, idx) => {
                  const theme = directorThemes[director.id] || defaultTheme;
                  return (
                    <Link
                      key={`${director.id}-${idx}`}
                      to={`/directors/${director.id}`}
                      className={`w-[220px] sm:w-[250px] md:w-[270px] shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-brand-dark ${theme.borderHover} ${theme.glowHover} transition-all duration-300 flex flex-col justify-between shadow-2xl group relative cursor-pointer`}
                    >
                      {/* Top Shimmer Line in Director's Color */}
                      <div className={`absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/20 to-transparent ${theme.shimmer} transition-all duration-500 z-20`} />

                      {/* Ambient Internal Color Glow */}
                      <div className={`absolute -top-14 -right-14 w-32 h-32 bg-gradient-to-br ${theme.bgTint} blur-xl rounded-full pointer-events-none transition-all duration-500 group-hover:scale-150`} />

                      {/* Visual Portrait Card (Rich Color) */}
                      <div className="relative aspect-[4/5] overflow-hidden bg-black">
                        <img
                          src={director.image}
                          alt={director.name}
                          loading="lazy"
                          decoding="async"
                          className="object-cover w-full h-full absolute inset-0 object-top filter saturate-[1.25] contrast-[1.08] brightness-[0.98] group-hover:scale-105 group-hover:saturate-[1.35] transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

                        {/* Film Format Badge & Colored Indicator */}
                        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[9px] font-mono uppercase tracking-wider z-10">
                          <span className="px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white/90 font-medium">
                            {director.filmFormat.split("//")[0].trim()}
                          </span>
                          <span className={`w-2 h-2 rounded-full ${theme.pillColor} animate-pulse shadow-[0_0_8px_currentColor]`} />
                        </div>

                        {/* View Profile Overlay on Hover */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 bg-black/35 backdrop-blur-[2px]">
                          <div className="px-4 py-2 rounded-full bg-white text-black font-mono text-[11px] uppercase tracking-wider font-bold shadow-2xl flex items-center gap-1.5 hover:scale-105 transition-transform">
                            <span>View Profile</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        {/* Director Title on Image */}
                        <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10">
                          <span className={`text-[10px] font-mono uppercase tracking-wider ${theme.badgeText} font-semibold block mb-0.5 drop-shadow`}>
                            {director.category}
                          </span>
                          <h3 className="text-lg sm:text-xl font-serif uppercase tracking-tight text-white leading-none group-hover:text-brand-light transition-colors drop-shadow-md">
                            {director.name}
                          </h3>
                        </div>
                      </div>

                      {/* Compact Card Body */}
                      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between relative z-10">
                        <p className="text-[11px] font-mono text-white/80 uppercase tracking-wide line-clamp-1">
                          {director.specialization}
                        </p>

                        <div className="pt-2.5 border-t border-white/10">
                          <div className="w-full py-1.5 px-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-mono text-[10px] uppercase tracking-wider font-semibold transition-all duration-300 inline-flex items-center justify-center gap-1 shadow-sm">
                            <span>Profile</span>
                            <ArrowUpRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>

                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        ) : viewMode === "grid" || viewMode === "marquee" ? (
          /* SINGLE LISTING CARD (when <= 3 directors) OR STATIC GRID (when > 3 directors) */
          <div className="container mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
            {filteredDirectors.length <= 3 ? (
              /* SINGLE LISTING SHOWCASE CARD */
              <div className="max-w-5xl mx-auto space-y-12">
                {filteredDirectors.map((director) => {
                  const theme = directorThemes[director.id] || defaultTheme;
                  return (
                    <motion.div
                      key={director.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="relative rounded-3xl overflow-hidden border border-white/15 bg-brand-dark p-6 sm:p-10 shadow-2xl space-y-8"
                    >
                      {/* Top Gradient Shimmer */}
                      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent ${theme.shimmer}`} />

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        {/* Portrait Image Column */}
                        <div className="lg:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden bg-black border border-white/10 group">
                          <img
                            src={director.image}
                            alt={director.name}
                            loading="lazy"
                            decoding="async"
                            className="object-cover w-full h-full absolute inset-0 object-top filter saturate-[1.25] contrast-[1.08] group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono uppercase tracking-wider z-10">
                            <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white font-medium">
                              {director.filmFormat.split("//")[0].trim()}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center gap-1.5 font-semibold">
                              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                              Available
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => openVideo(director)}
                            className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 cursor-pointer"
                          >
                            <div className="px-5 py-3 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-bold shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform">
                              <Play className="w-4 h-4 fill-black" />
                              <span>Watch Reel</span>
                            </div>
                          </button>
                        </div>

                        {/* Details Column */}
                        <div className="lg:col-span-7 space-y-6">
                          <div>
                            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-white/60 mb-2">
                              <span className="w-2 h-2 rounded-full bg-white" />
                              <span>{director.category} DIRECTORIAL ROSTER</span>
                            </div>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight text-white leading-tight">
                              {director.name}
                            </h2>
                            <p className="text-sm sm:text-base font-mono text-white/80 uppercase tracking-wide mt-2">
                              {director.specialization}
                            </p>
                          </div>

                          <blockquote className="text-base sm:text-lg font-serif italic text-white/90 border-l-2 border-white/40 pl-4 py-1 leading-relaxed">
                            &ldquo;{director.quote}&rdquo;
                          </blockquote>

                          <p className="text-sm text-brand-grey font-light leading-relaxed">
                            {director.bio}
                          </p>

                          <div className="space-y-3 pt-2 border-t border-white/10">
                            <span className="text-xs font-mono uppercase tracking-widest text-white/50 block">NOTABLE CLIENTS &amp; STYLES</span>
                            <div className="flex flex-wrap gap-2">
                              {director.clients.map((client) => (
                                <span key={client} className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/5 text-white/90 border border-white/10">
                                  {client}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 pt-4">
                            <Link
                              to={`/directors/${director.id}`}
                              className="px-6 py-3.5 rounded-full bg-white text-black hover:bg-brand-light font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-xl inline-flex items-center gap-2 hover:scale-105"
                            >
                              <span>View Full Profile</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => openVideo(director)}
                              className="px-6 py-3.5 rounded-full border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all inline-flex items-center gap-2 hover:bg-white/10 cursor-pointer"
                            >
                              <Play className="w-4 h-4" />
                              <span>Watch Reel</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              /* MULTI-DIRECTOR GRID VIEW */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
                {filteredDirectors.map((director, idx) => {
                  const theme = directorThemes[director.id] || defaultTheme;
                  return (
                    <motion.div
                      key={director.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      className="h-full"
                    >
                      <Link
                        to={`/directors/${director.id}`}
                        className={`group rounded-3xl overflow-hidden border border-white/10 bg-brand-dark ${theme.borderHover} ${theme.glowHover} transition-all duration-500 flex flex-col justify-between shadow-2xl cursor-pointer h-full relative`}
                      >
                        {/* Top Shimmer Line */}
                        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent ${theme.shimmer} transition-all duration-500 z-20`} />

                        {/* Ambient Internal Glow */}
                        <div className={`absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-br ${theme.bgTint} blur-2xl rounded-full pointer-events-none transition-all duration-500 group-hover:scale-150`} />

                        <div className="relative aspect-[4/5] overflow-hidden bg-black">
                          <img
                            src={director.image}
                            alt={director.name}
                            loading="lazy"
                            decoding="async"
                            className="object-cover w-full h-full absolute inset-0 object-top filter saturate-[1.25] contrast-[1.08] brightness-[0.98] group-hover:scale-105 group-hover:saturate-[1.35] transition-all duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

                          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider z-10">
                            <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white/90 font-medium">
                              {director.filmFormat.split("//")[0]}
                            </span>
                            <span className={`px-3 py-1 rounded-full ${theme.badgeBg} backdrop-blur-md border ${theme.badgeBorder} ${theme.badgeText} flex items-center gap-1.5 font-semibold`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${theme.pillColor} animate-pulse`} />
                              Available
                            </span>
                          </div>

                          {/* View Profile Overlay on Hover */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 bg-black/35 backdrop-blur-[2px]">
                            <div className="px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-bold shadow-2xl flex items-center gap-1.5 hover:scale-105 transition-transform">
                              <span>View Profile</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </div>
                          </div>

                          <div className="absolute bottom-5 left-5 right-5 z-10">
                            <span className={`text-[11px] font-mono uppercase tracking-[0.2em] ${theme.badgeText} font-semibold block mb-1 drop-shadow`}>
                              {director.category}
                            </span>
                            <h3 className="text-3xl font-display font-bold uppercase tracking-tight text-white leading-none group-hover:text-brand-light transition-colors drop-shadow-md">
                              {director.name}
                            </h3>
                          </div>
                        </div>

                        <div className="p-6 space-y-4 flex-1 flex flex-col justify-between relative z-10">
                          <div className="space-y-3">
                            <p className="text-xs font-mono text-white/80 uppercase tracking-wide">
                              {director.specialization}
                            </p>
                            <p className="text-xs text-brand-grey font-light leading-relaxed line-clamp-2">
                              {director.bio}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-white/10 space-y-3">
                            <div className="flex flex-wrap gap-1.5">
                              {director.clients.slice(0, 3).map((client) => (
                                <span
                                  key={client}
                                  className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-white/75 border border-white/10"
                                >
                                  {client}
                                </span>
                              ))}
                            </div>

                            <div className="pt-2">
                              <div className="w-full py-2.5 px-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-mono text-[11px] uppercase tracking-wider font-semibold transition-all duration-300 inline-flex items-center justify-center gap-1.5 shadow-sm">
                                <span>View Director Profile</span>
                                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                              </div>
                            </div>
                          </div>

                        </div>

                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* LIST / EDITORIAL INDEX VIEW */
          <div className="container mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
            <div className="border-t border-white/10 divide-y divide-white/10">
              {filteredDirectors.map((director, idx) => {
                const theme = directorThemes[director.id] || defaultTheme;
                return (
                  <Link
                    key={director.id}
                    to={`/directors/${director.id}`}
                    className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-center group hover:bg-white/[0.04] px-4 -mx-4 rounded-2xl transition-all cursor-pointer relative"
                  >
                    <div className="md:col-span-1 text-xs font-mono font-semibold flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${theme.pillColor} shadow-[0_0_8px_currentColor]`} />
                      <span className={theme.badgeText}>0{idx + 1}</span>
                    </div>

                    <div className="md:col-span-4 space-y-1">
                      <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white group-hover:text-brand-light transition-colors">
                        {director.name}
                      </h3>
                      <span className={`text-xs font-mono ${theme.badgeText} block`}>
                        {director.specialization}
                      </span>
                    </div>

                    <div className="md:col-span-3 text-xs font-mono text-brand-grey space-y-1">
                      <span className="uppercase tracking-widest text-[10px] text-white/40 block">CLIENTS</span>
                      <span>{director.clients.slice(0, 3).join(" • ")}</span>
                    </div>

                    <div className="md:col-span-2 text-xs font-mono text-brand-grey">
                      <span className="uppercase tracking-widest text-[10px] text-white/40 block">CAMERA</span>
                      <span className="line-clamp-1">{director.filmFormat}</span>
                    </div>

                    <div className="md:col-span-2 flex items-center justify-end">
                      <span className="px-4 py-2.5 rounded-full bg-white/10 group-hover:bg-white group-hover:text-black text-white font-mono text-xs uppercase tracking-wider transition-all inline-flex items-center gap-1.5 shadow-sm">
                        <span>View Profile</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* 4. DIRECTOR DETAIL SLIDE-OVER DRAWER */}
      <AnimatePresence>
        {selectedDirectorForDrawer && (
          <div className="fixed inset-0 z-[200] flex justify-end" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDirectorForDrawer(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-brand-dark border-l border-white/15 h-full overflow-y-auto p-6 sm:p-10 z-10 space-y-8 text-brand-light shadow-2xl"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/80">
                  DIRECTOR DOSSIER // {selectedDirectorForDrawer.category}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedDirectorForDrawer(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Portrait & Core Meta */}
              <div className="space-y-4">
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/15 bg-black">
                  <img
                    src={selectedDirectorForDrawer.image}
                    alt={selectedDirectorForDrawer.name}
                    loading="lazy"
                    decoding="async"
                    className="object-cover w-full h-full absolute inset-0 object-top filter saturate-[1.2] contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <button
                    type="button"
                    onClick={() => {
                      openVideo(selectedDirectorForDrawer);
                    }}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer group/play"
                  >
                    <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl group-hover/play:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-black translate-x-0.5" />
                    </div>
                  </button>
                </div>

                <div>
                  <h2 className="text-3xl sm:text-4xl font-syne font-bold uppercase tracking-tight text-white">
                    {selectedDirectorForDrawer.name}
                  </h2>
                  <p className="text-xs font-mono text-white/70 uppercase tracking-wide mt-1">
                    {selectedDirectorForDrawer.specialization}
                  </p>
                </div>

                <blockquote className="text-base font-serif italic text-white/90 border-l-2 border-white/40 pl-4 py-1">
                  &ldquo;{selectedDirectorForDrawer.quote}&rdquo;
                </blockquote>

                <p className="text-sm text-brand-grey font-light leading-relaxed">
                  {selectedDirectorForDrawer.bio}
                </p>
              </div>

              {/* Technical Specifications */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-white/50 block">
                  TECHNICAL SPECS &amp; PIPELINE
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-white/40 block text-[10px]">CAMERA PACKAGE</span>
                    <span className="text-white mt-0.5 block">{selectedDirectorForDrawer.cameraPackage}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px]">LENS OPTICS</span>
                    <span className="text-white mt-0.5 block">{selectedDirectorForDrawer.lensChoice}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px]">COLOR PIPELINE</span>
                    <span className="text-white mt-0.5 block">{selectedDirectorForDrawer.colorPipeline}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px]">LIGHTING PHILOSOPHY</span>
                    <span className="text-white mt-0.5 block">{selectedDirectorForDrawer.lightingPhilosophy}</span>
                  </div>
                </div>
              </div>

              {/* Awards & Clients */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block">
                    NOTABLE CLIENTS
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedDirectorForDrawer.clients.map((c) => (
                      <span
                        key={c}
                        className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-white/80"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block">
                    RECOGNITION &amp; AWARDS
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedDirectorForDrawer.awards.map((a) => (
                      <span
                        key={a}
                        className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-white/80"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Booking Actions */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/919187233615?text=${encodeURIComponent(
                      `Hello Viyana Productions! I would like to check availability and treatment details for director ${selectedDirectorForDrawer.name}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Inquire via WhatsApp Desk ↗</span>
                  </a>

                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-brand-light transition-colors"
                  >
                    <span>Submit Campaign Brief →</span>
                  </Link>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. BOTTOM CALLOUT */}
      <section className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 border-t border-white/10 bg-brand-dark/50 text-center relative overflow-hidden">
        {/* Subtle Ambient Backlight in black & white */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)] pointer-events-none rounded-full" />

        <div className="container mx-auto max-w-4xl space-y-6 relative z-10">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/60 block">
            TELL US ABOUT YOUR PROJECT.
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-syne font-bold text-white uppercase tracking-tight">
            Have a story in mind?
          </h2>
          <p className="text-sm sm:text-base text-brand-grey font-light max-w-lg mx-auto">
            Tell us a little about your project, and let&apos;s explore how we can bring it to life.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-4 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-brand-light transition-all shadow-xl hover:scale-105"
            >
              START A CONVERSATION →
            </Link>
            <a
              href="https://wa.me/919187233615?text=Hello%20Viyana%20Productions,%20I'd%20like%20to%20consult%20with%20an%20executive%20producer%20about%20your%20directing%20roster."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 font-mono text-xs uppercase tracking-widest transition-colors inline-flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Producer Desk ↗</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
