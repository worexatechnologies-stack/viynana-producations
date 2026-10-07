import { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";

export default function ProjectDetail() {
  const { slug } = useParams();
  
  const project = projects.find((p) => p.slug === slug || p.aliases?.includes(slug!));

  if (!project) {
    return <Navigate to="/not-found" />;
  }

  if (project.slug !== slug) {
    return <Navigate to={`/work/${project.slug}`} replace />;
  }

  const currentIdx = projects.findIndex((p) => p.slug === project.slug);
  const nextProjectIdx = (currentIdx + 1) % projects.length;
  const nextProject = projects[nextProjectIdx];

  const images = project.gallery && project.gallery.length > 0 ? project.gallery : [project.thumbnail];
  const isPortrait =
    project.category === "MODELS PORTFOLIO SHOOTS" ||
    project.category === "VERTICAL SERIES" ||
    project.slug === "models-portfolio-shoots" ||
    project.slug === "vertical-series";
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Reset active image index whenever the slug changes
  useEffect(() => {
    setActiveImageIdx(0);
  }, [slug]);

  // Automatic scrolling interval (cycles every 3 seconds unless hovered or playing video)
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;
    if (project.video && activeImageIdx === 0) return;

    const interval = setInterval(() => {
      setActiveImageIdx((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length, isAutoPlaying, isHovered, activeImageIdx, project.video]);

  const handleNext = () => {
    setActiveImageIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <main className="bg-[#080808] text-brand-light min-h-screen selection:bg-white selection:text-black overflow-x-hidden">
      <Navbar />

      <article className="relative">
        {/* 1. CATEGORY LANDING HEADER */}
        <section className="pt-28 sm:pt-36 md:pt-40 pb-4 sm:pb-6 px-4 sm:px-6 lg:px-12">
          <div className="container mx-auto max-w-7xl">
            {/* Monumental Title */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6.5vw] font-display font-extrabold tracking-tight uppercase leading-[0.95] sm:leading-[0.9] text-white mb-3 sm:mb-4 select-none">
              {project.title}
            </h1>

            {/* Deliverable Sub-Badge */}
            <p className="text-xs sm:text-sm md:text-base font-mono text-white/80 font-normal tracking-wider uppercase">
              {project.deliverableType}
            </p>
          </div>
        </section>

        {/* 2. CINEMATIC 3-FRAME INTERACTIVE AUTOMATIC SCROLLING SHOWCASE */}
        <section
          className="py-4 sm:py-8 px-4 sm:px-6 lg:px-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="container mx-auto max-w-7xl">
            {/* Gallery Control Bar — 2-row stacked on mobile, single row on desktop */}
            <div className="mb-3 sm:mb-4 px-1 space-y-2.5 sm:space-y-0">
              {/* Row 1: Status Label */}
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-2 h-2 rounded-full shrink-0 transition-all ${
                    isAutoPlaying && !isHovered
                      ? "bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                      : "bg-white/40"
                  }`}
                />
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] sm:tracking-[0.22em] text-white/70 truncate">
                  PRODUCTION VISUALS // FRAME {String(activeImageIdx + 1).padStart(2, "0")} OF {String(images.length).padStart(2, "0")}
                </span>
                <span className="hidden sm:inline-block text-[9px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50 shrink-0">
                  {isHovered ? "PAUSED ON HOVER" : "AUTO-SCROLLING"}
                </span>
              </div>

              {/* Row 2: Controls — full-width pill buttons on mobile */}
              <div className="flex items-center gap-2 sm:justify-end">
                {/* Pause / Play — icon-only on mobile, icon+label on desktop */}
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="flex-1 sm:flex-none px-3 py-2.5 sm:px-2.5 sm:py-1.5 rounded-xl sm:rounded-full border border-white/15 bg-white/5 hover:bg-white/15 active:bg-white/20 active:scale-95 transition-all text-[11px] font-mono text-white/70 hover:text-white flex items-center justify-center gap-1.5 cursor-pointer"
                  title={isAutoPlaying ? "Pause Auto-scroll" : "Resume Auto-scroll"}
                >
                  <span className="text-base sm:text-xs leading-none">{isAutoPlaying ? "⏸" : "▶"}</span>
                  <span className="sm:hidden text-[10px] uppercase tracking-wider">{isAutoPlaying ? "Pause" : "Play"}</span>
                  <span className="hidden md:inline text-[10px]">{isAutoPlaying ? "AUTO" : "PAUSED"}</span>
                </button>

                {/* Prev */}
                <button
                  onClick={handlePrev}
                  className="flex-1 sm:flex-none px-3 py-2.5 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black active:bg-white active:text-black active:scale-95 transition-all text-[11px] font-mono flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  aria-label="Previous image"
                >
                  <span className="text-sm sm:text-xs">←</span>
                  <span className="text-[10px] uppercase tracking-wider sm:hidden">Prev</span>
                  <span className="hidden sm:inline text-[10px]">PREV</span>
                </button>

                {/* Next */}
                <button
                  onClick={handleNext}
                  className="flex-1 sm:flex-none px-3 py-2.5 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black active:bg-white active:text-black active:scale-95 transition-all text-[11px] font-mono flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  aria-label="Next image"
                >
                  <span className="text-[10px] uppercase tracking-wider sm:hidden">Next</span>
                  <span className="hidden sm:inline text-[10px]">NEXT</span>
                  <span className="text-sm sm:text-xs">→</span>
                </button>
              </div>
            </div>

            {/* Main Stage Viewport */}
            <div
              className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-brand-dark shadow-[0_20px_70px_rgba(0,0,0,0.95)] group transition-all duration-500 ${
                isPortrait
                  ? "aspect-[4/5] sm:aspect-[4/5] md:aspect-[4/3.6] lg:aspect-[4/3.5] md:max-h-[560px] lg:max-h-[580px] max-w-2xl mx-auto"
                  : "aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9]"
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImageIdx}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full absolute inset-0"
                >
                  {project.video && activeImageIdx === 0 ? (
                    <video
                      src={project.video}
                      poster={images[0]}
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                      className="w-full h-full object-cover object-[center_top]"
                    />
                  ) : (
                    <img
                      src={images[activeImageIdx]}
                      alt={`${project.title} - Frame ${activeImageIdx + 1}`}
                      className="object-cover object-[center_top] w-full h-full filter contrast-[1.05] brightness-95"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Subtle cinematic gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />

              {/* Viewfinder Optical Corner Brackets */}
              <div className="absolute inset-3 sm:inset-5 pointer-events-none z-10">
                <span className="absolute top-0 left-0 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-l-2 border-white/60" />
                <span className="absolute top-0 right-0 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-r-2 border-white/60" />
                <span className="absolute bottom-0 left-0 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-l-2 border-white/60" />
                <span className="absolute bottom-0 right-0 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-r-2 border-white/60" />
              </div>


              {/* Bottom Meta & Pagination Overlay */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 flex justify-between items-center text-xs font-mono text-white/80 z-20 pointer-events-none gap-1.5 sm:gap-2">
                {/* Left: Shot Tracker */}
                <div className="flex items-center shrink-0">
                  <span className="bg-black/80 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/15 text-[10px] sm:text-[11px] font-semibold text-white shadow-lg">
                    <span className="hidden sm:inline">{project.title} // </span>
                    SHOT {String(activeImageIdx + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Interactive Pagination Dots */}
                <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 bg-black/75 backdrop-blur-md px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full border border-white/15 shadow-lg shrink-0">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`transition-all duration-300 rounded-full cursor-pointer ${
                        idx === activeImageIdx
                          ? "w-5 sm:w-6 h-1.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                          : "w-1.5 h-1.5 bg-white/40 hover:bg-white/80"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Right: Technical Spec Badge */}
                <span className="bg-black/80 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/20 text-[10px] sm:text-[11px] text-white/90 font-mono shrink-0 shadow-lg">
                  <span className="sm:hidden">{project.video && activeImageIdx === 0 ? "4K MOTION" : "4K RAW"}</span>
                  <span className="hidden sm:inline">{project.video && activeImageIdx === 0 ? "4K DCI • MOTION" : "4K DCI • RAW STILL"}</span>
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* 4. EDITORIAL STRATEGY & COMPREHENSIVE PRODUCTION CONTENT */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-12 border-t border-white/10 mt-6">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              
              {/* Left Column: Creative Narrative & Scope */}
              <div className="lg:col-span-7 space-y-10">
                <div>
                  <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/50 block mb-3">
                    CREATIVE VISION &amp; METHODOLOGY
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white leading-snug tracking-tight">
                    &ldquo;{project.description}&rdquo;
                  </h2>
                </div>

                <div className="space-y-4 text-brand-grey font-light text-sm sm:text-base leading-relaxed border-t border-white/10 pt-6">
                  {project.fullDescription && (
                    <p className="text-white/90">
                      {project.fullDescription}
                    </p>
                  )}
                  <p>
                    Engineered from core conceptual strategy to final master delivery, this {project.category.toLowerCase()} production encapsulates Viyana&apos;s full-pipeline discipline: marrying strategic narrative, bold visual aesthetics, and uncompromising execution.
                  </p>
                  <p>
                    Working directly alongside <strong className="text-white font-normal">{project.client}</strong>, our directors, writers, and visual designers crafted a singular aesthetic world designed to command visceral audience attention and build lasting brand resonance.
                  </p>
                </div>

                {/* Creative Approach Callout */}
                {project.creativeApproach && (
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/15 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/50 block">
                      CREATIVE APPROACH
                    </span>
                    <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed">
                      {project.creativeApproach}
                    </p>
                  </div>
                )}

                {/* Project Highlights Grid */}
                {project.highlights && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {project.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/15 space-y-1">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-white block">
                          {h.title}
                        </span>
                        <span className="text-xs text-brand-grey font-light block">
                          {h.subtitle}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Key Features Badges */}
                {project.keyFeatures && (
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-white/50 block">
                      KEY FEATURES
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {project.keyFeatures.map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          className="px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-white/90 flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Scope Badges */}
                {project.scope && (
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-white/50 block">
                      DELIVERABLES &amp; PRODUCTION SCOPE
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {project.scope.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-xs font-mono text-white/90 uppercase tracking-wider transition-colors cursor-default"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Campaign Results & Spec Dossier */}
              <div className="lg:col-span-5 space-y-6">
                {/* Results Card */}
                {project.impact && (
                  <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/20 shadow-2xl space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/80 block font-semibold">
                        PROJECT IMPACT &amp; REACH
                      </span>
                      <span className="text-xs font-mono text-white/40">VERIFIED</span>
                    </div>
                    <p className="text-xl sm:text-2xl font-serif text-white tracking-tight leading-snug">
                      {project.impact}
                    </p>
                    <div className="pt-3 border-t border-white/10 text-xs font-mono text-brand-grey flex items-center justify-between">
                      <span>AUDIENCE ENGAGEMENT</span>
                      <span className="text-white font-semibold">HIGH RETENTION</span>
                    </div>
                  </div>
                )}

                {/* Production Credits Card */}
                <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.02] border border-white/15 backdrop-blur-xl space-y-4">
                  <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/60 block font-semibold">
                    PRODUCTION CREDITS
                  </span>

                  <div className="divide-y divide-white/10 text-xs font-mono">
                    {project.credits ? (
                      Object.entries(project.credits).map(([key, val]) => (
                        <div key={key} className="py-2.5 flex justify-between gap-3">
                          <span className="text-brand-grey uppercase tracking-wider text-[11px] shrink-0">{key}</span>
                          <span className="text-white font-medium text-right">{val}</span>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="py-2.5 flex justify-between">
                          <span className="text-brand-grey">STUDIO</span>
                          <span className="text-white font-medium">Viyana Productions</span>
                        </div>
                        <div className="py-2.5 flex justify-between">
                          <span className="text-brand-grey">CLIENT</span>
                          <span className="text-white font-medium">{project.client}</span>
                        </div>
                        <div className="py-2.5 flex justify-between">
                          <span className="text-brand-grey">DIRECTOR</span>
                          <span className="text-white font-medium">{project.director || "Viyana Creative Lab"}</span>
                        </div>
                        <div className="py-2.5 flex justify-between">
                          <span className="text-brand-grey">CAPTURE FORMAT</span>
                          <span className="text-white font-medium">4K DCI Large Format</span>
                        </div>
                        <div className="py-2.5 flex justify-between">
                          <span className="text-brand-grey">RELEASE YEAR</span>
                          <span className="text-white font-medium">{project.year}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Tagline if provided */}
                  {project.tagline && (
                    <div className="pt-2 text-center border-t border-white/10">
                      <p className="text-[11px] font-mono uppercase tracking-widest text-white/70">
                        {project.tagline}
                      </p>
                    </div>
                  )}

                  {/* Commission Project CTA */}
                  <div className="pt-3">
                    <Link
                      to="/contact"
                      className="w-full py-3.5 px-4 rounded-xl bg-white text-black hover:bg-brand-light font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-white/20 active:scale-95"
                    >
                      <span>{project.ctaText || `COMMISSION ${project.category}`}</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 5. QUICK 13 SERVICES SELECTOR */}
        <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-12 border-t border-white/10 bg-black/60">
          <div className="container mx-auto max-w-7xl">

            {/* Section Header */}
            <div className="flex items-center justify-between gap-4 mb-5 sm:mb-6">
              <div>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-white/50 block mb-1">
                  EXPLORE ALL DISCIPLINES
                </span>
                <h3 className="text-lg sm:text-xl font-display font-bold uppercase text-white tracking-tight">
                  13 Core Services
                </h3>
              </div>
              <Link
                to="/work"
                className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white hover:text-black text-[10px] sm:text-xs font-mono uppercase tracking-wider text-white/70 hover:text-black transition-all"
              >
                <span className="hidden sm:inline">VIEW ALL SERVICES</span>
                <span className="sm:hidden">VIEW ALL</span>
                <span>→</span>
              </Link>
            </div>

            {/* Mobile: 2-col grid — Desktop: horizontal scroll row */}
            {/* Grid (mobile only) */}
            <div className="grid grid-cols-2 gap-2 sm:hidden">
              {projects.map((p, pIdx) => {
                const isCurrent = p.slug === slug;
                return (
                  <Link
                    key={p.slug}
                    to={`/work/${p.slug}`}
                    className={`flex flex-col justify-between p-3.5 rounded-2xl border transition-all duration-300 min-h-[80px] ${
                      isCurrent
                        ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                        : "bg-white/[0.03] text-white/70 border-white/10 active:bg-white/10 active:border-white/25"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-mono font-bold ${isCurrent ? "text-black/50" : "text-white/30"}`}>
                        {String(pIdx + 1).padStart(2, "0")}
                      </span>
                      <span className={`text-xs ${isCurrent ? "text-black/60" : "text-white/25"}`}>→</span>
                    </div>
                    <span className={`text-[11px] font-mono uppercase tracking-wide leading-snug font-semibold ${isCurrent ? "text-black" : "text-white/80"}`}>
                      {p.title}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Horizontal scroll (sm and up) */}
            <div className="hidden sm:flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 overscroll-x-contain touch-pan-x">
              {projects.map((p, pIdx) => {
                const isCurrent = p.slug === slug;
                return (
                  <Link
                    key={p.slug}
                    to={`/work/${p.slug}`}
                    className={`shrink-0 px-3.5 py-2.5 rounded-xl border text-xs font-mono flex items-center gap-2.5 transition-all duration-300 ${
                      isCurrent
                        ? "bg-white text-black border-white font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        : "bg-white/[0.03] text-white/70 border-white/10 hover:border-white/30 hover:text-white hover:bg-white/[0.08]"
                    }`}
                  >
                    <span className={`text-[10px] ${isCurrent ? "text-black/60 font-bold" : "text-white/40"}`}>
                      {String(pIdx + 1).padStart(2, "0")}
                    </span>
                    <span className="whitespace-nowrap uppercase tracking-wider">{p.title}</span>
                  </Link>
                );
              })}
            </div>

          </div>
        </section>


        {/* 6. NEXT DISCIPLINE SHOWCASE WITH REALISTIC PRODUCTION BACKDROP */}
        <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-t border-white/10 overflow-hidden bg-brand-dark group/next">
          {/* Realistic Film Production Atmospheric Backdrop */}
          <div className="absolute inset-0 z-0 opacity-25 group-hover/next:opacity-35 transition-opacity duration-700 pointer-events-none">
            <img
              src={nextProject.thumbnail}
              alt={nextProject.title}
              className="object-cover w-full h-full absolute inset-0 filter brightness-75 contrast-110 scale-100 group-hover/next:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#080808]/85 to-[#080808]" />
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
          </div>

          <div className="relative z-10 container mx-auto max-w-4xl text-center flex flex-col items-center">
            {/* Top Status Header */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 mb-4 shadow-xl">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-white/80">
                NEXT DISCIPLINE // {String(nextProjectIdx + 1).padStart(2, "0")} OF {String(projects.length).padStart(2, "0")}
              </span>
            </div>

            {/* Category Subtitle */}
            <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-white/90 mb-3 font-semibold">
              {nextProject.category} • {nextProject.client}
            </span>

            {/* Stylish, Calibrated Editorial Title */}
            <Link
              to={`/work/${nextProject.slug}`}
              className="group/title block mb-6 max-w-2xl"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tight text-white group-hover/title:text-brand-light transition-colors leading-tight">
                <span>{nextProject.title}</span>
              </h2>
            </Link>

            {/* Compact Deliverable Tag */}
            <p className="text-xs font-mono text-white/60 uppercase tracking-wider mb-8 max-w-lg">
              {nextProject.deliverableType}
            </p>

            {/* Stylish Action Button */}
            <Link
              to={`/work/${nextProject.slug}`}
              className="w-full sm:w-auto max-w-xs sm:max-w-none group/btn inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-brand-light hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.35)]"
            >
              <span>EXPLORE {nextProject.category}</span>
              <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}