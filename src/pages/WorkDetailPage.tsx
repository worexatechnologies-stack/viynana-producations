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
            {/* Gallery Control Bar */}
            <div className="flex items-center justify-between gap-4 mb-3 sm:mb-4 px-1">
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-2 h-2 rounded-full transition-all ${
                    isAutoPlaying && !isHovered
                      ? "bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                      : "bg-white/40"
                  }`}
                />
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] text-white/70">
                  PRODUCTION VISUALS // FRAME {String(activeImageIdx + 1).padStart(2, "0")} OF {String(images.length).padStart(2, "0")}
                </span>
                <span className="hidden sm:inline-block text-[9px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50">
                  {isHovered ? "PAUSED ON HOVER" : "AUTO-SCROLLING"}
                </span>
              </div>
              
              {/* Controls: Auto-Play Toggle & Pagination */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="px-2.5 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 active:scale-95 transition-all text-[10px] font-mono text-white/70 hover:text-white flex items-center gap-1 cursor-pointer"
                  title={isAutoPlaying ? "Pause Auto-scroll" : "Resume Auto-scroll"}
                >
                  <span>{isAutoPlaying ? "❚❚" : "▶"}</span>
                  <span className="hidden md:inline">{isAutoPlaying ? "AUTO" : "PAUSED"}</span>
                </button>
                <button
                  onClick={handlePrev}
                  className="px-3 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black active:scale-95 transition-all text-xs font-mono flex items-center gap-1.5 cursor-pointer shadow-md"
                  aria-label="Previous image"
                >
                  <span>←</span>
                  <span className="hidden sm:inline">PREV</span>
                </button>
                <button
                  onClick={handleNext}
                  className="px-3 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black active:scale-95 transition-all text-xs font-mono flex items-center gap-1.5 cursor-pointer shadow-md"
                  aria-label="Next image"
                >
                  <span className="hidden sm:inline">NEXT</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* Main Stage Viewport */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-brand-dark shadow-[0_20px_70px_rgba(0,0,0,0.95)] group">
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
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={images[activeImageIdx]}
                      alt={`${project.title} - Frame ${activeImageIdx + 1}`}
                      className="object-cover w-full h-full filter contrast-[1.05] brightness-95"
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

              {/* Floating Large Nav Arrows on Master Frame */}
              <button
                onClick={handlePrev}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-white hover:text-black border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 shadow-2xl cursor-pointer active:scale-90"
                aria-label="Previous slide"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-white hover:text-black border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 shadow-2xl cursor-pointer active:scale-90"
                aria-label="Next slide"
              >
                →
              </button>

              {/* Bottom Meta & Pagination Overlay */}
              <div className="absolute bottom-4 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 flex justify-between items-center text-xs font-mono text-white/80 z-20 pointer-events-none">
                <div className="flex items-center gap-2 max-w-[50%]">
                  <span className="bg-black/80 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/15 text-[10px] sm:text-[11px] font-semibold text-white truncate shadow-lg">
                    {project.title} // SHOT {String(activeImageIdx + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Interactive Pagination Dots */}
                <div className="pointer-events-auto flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 shadow-lg">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`transition-all duration-300 rounded-full cursor-pointer ${
                        idx === activeImageIdx
                          ? "w-6 h-1.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                          : "w-1.5 h-1.5 bg-white/40 hover:bg-white/80"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <span className="bg-black/80 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/20 text-[10px] sm:text-[11px] text-white/90 font-mono shrink-0 shadow-lg">
                  {project.video && activeImageIdx === 0 ? "4K DCI • MOTION" : "4K DCI • RAW STILL"}
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

        {/* 5. QUICK 13 SERVICES SELECTOR STRIP */}
        <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-12 border-t border-white/10 bg-black/60">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
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
                className="text-xs font-mono uppercase tracking-widest text-white/70 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span>VIEW COMPLETE SERVICES OVERVIEW</span>
                <span>→</span>
              </Link>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
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