"use client";

import { useRef } from "react";
import { projects } from "@/data/projects";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Tv,
  Video,
  Camera,
  Clapperboard,
  Palette,
  ArrowRight,
  ArrowUpRight
} from "lucide-react";

const coreCapabilities = [
  { name: "Advertisement & management", icon: Tv },
  { name: "Production and shoot", icon: Video },
  { name: "Photo & video shoot", icon: Camera },
  { name: "Production house", icon: Clapperboard },
  { name: "Branding", icon: Palette },
];

export default function WorkPage() {
  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen bg-brand-black text-brand-light relative overflow-x-hidden selection:bg-white selection:text-black">
      <Navbar />

      {/* 1. HERO HEADER (REDESIGNED CINEMATIC ARCHITECTURE) */}
      <section
        ref={headerRef}
        className="relative pt-28 sm:pt-36 md:pt-44 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12 border-b border-white/10 overflow-hidden bg-[#060606]"
      >
        {/* Ambient background glows & tactical dot matrix */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-white/[0.025] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 right-10 w-[500px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-60" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col">
            
            {/* Top Brand & Discipline Status Strip */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-white font-semibold">
                  VIYANA PRODUCTIONS
                </span>
                <span className="text-white/20 hidden sm:inline">•</span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/60 hidden sm:inline">
                  STUDIO ARCHIVE
                </span>
              </div>

              <div className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-white/50 overflow-hidden text-ellipsis whitespace-nowrap">
                CREATIVE ADVERTISING × VIDEO PRODUCTION × GRAPHIC DESIGN × BRANDING × PHOTO &amp; VIDEO SHOOT
              </div>
            </div>

            {/* Monumental Headline: SELECTED WORK. */}
            <div className="mb-6 sm:mb-10">
              <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-white/40 block mb-2 sm:mb-3">
                [ 01 // PORTFOLIO ARCHIVE ]
              </span>
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tight uppercase leading-[0.9] text-white">
                SELECTED <br />
                <span className="text-white/40 hover:text-white transition-colors duration-500">
                  WORK.
                </span>
              </h1>
            </div>

            {/* Headline Subtitle & Core Capabilities Deck */}
            <div className="space-y-6 pt-2 pb-8 border-b border-white/10">
              <div className="border-l-2 border-white/60 pl-4 sm:pl-6 py-1">
                <p className="text-base sm:text-xl md:text-2xl font-light text-white/90 max-w-3xl leading-relaxed">
                  We create cinematic campaigns, commercial films, and distinctive visual experiences that help ambitious brands get noticed and remembered.
                </p>
              </div>

              {/* Core Capabilities Pills */}
              <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-2">
                {coreCapabilities.map((cap) => {
                  const Icon = cap.icon;
                  return (
                    <span
                      key={cap.name}
                      className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/[0.035] hover:bg-white/[0.08] border border-white/10 hover:border-white/30 text-white text-xs font-mono uppercase tracking-wider transition-all duration-300 shadow-sm hover:scale-[1.02]"
                    >
                      <Icon className="w-3.5 h-3.5 text-white/80" />
                      <span>{cap.name}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Creative Philosophy & About Viyana Architectural Card */}
            <div className="mt-8 sm:mt-12 p-6 sm:p-10 md:p-12 rounded-3xl bg-gradient-to-br from-white/[0.045] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-xl relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              {/* Corner Viewfinder Brackets */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/30 pointer-events-none" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/30 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-white/30 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-white/30 pointer-events-none" />

              <div className="absolute top-0 right-0 w-80 h-80 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

              {/* Philosophy Header Badge */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-[0.25em] text-white/80 mb-6 sm:mb-8 w-fit">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>OUR CREATIVE PHILOSOPHY</span>
              </div>

              {/* 3 Pillars in Elevated Glass Panels */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pb-8 mb-8 border-b border-white/10">
                <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.025] hover:bg-white/[0.05] border border-white/10 hover:border-white/25 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/50 transition-all duration-500" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-white/40 block mb-2">[ 01 ]</span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-syne font-bold uppercase tracking-tight text-white group-hover:text-brand-light transition-colors">
                    IDEAS FIRST.
                  </h3>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.025] hover:bg-white/[0.05] border border-white/10 hover:border-white/25 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/50 transition-all duration-500" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-white/40 block mb-2">[ 02 ]</span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-syne font-bold uppercase tracking-tight text-white group-hover:text-brand-light transition-colors">
                    VISUALS WITH PURPOSE.
                  </h3>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.025] hover:bg-white/[0.05] border border-white/10 hover:border-white/25 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/50 transition-all duration-500" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-white/40 block mb-2">[ 03 ]</span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-syne font-bold uppercase tracking-tight text-white group-hover:text-brand-light transition-colors">
                    STORIES THAT STAY.
                  </h3>
                </div>
              </div>

              {/* About Viyana Sub-Block */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
                <div className="lg:col-span-5 space-y-3">
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/50 block">
                    ABOUT VIYANA
                  </span>
                  <h4 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight uppercase leading-tight">
                    We Turn Ideas Into <br />
                    <span className="font-bold text-white/90">Visual Experiences.</span>
                  </h4>
                </div>

                <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm md:text-base text-brand-grey font-light leading-relaxed border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-10">
                  <p>
                    Viyana Productions is a creative production and advertising agency focused on helping ambitious brands communicate through powerful visuals.
                  </p>
                  <p>
                    We combine creative thinking, advertising strategy, storytelling, video production, and graphic design to create content that doesn&apos;t just look good it has a purpose.
                  </p>
                  <p className="text-white/80">
                    Whether you&apos;re launching a new product, promoting a service, building a brand, or running an advertising campaign, we help transform your vision into content that people notice.
                  </p>
                </div>
              </div>
            </div>

            {/* Total 13 Services Stats Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 sm:pt-10 text-xs uppercase font-mono tracking-widest text-brand-grey">
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-white/30" />
                <span className="text-white font-medium">13 SPECIALIZED SERVICES &amp; DISCIPLINES</span>
              </div>
              <div className="flex items-center gap-3 sm:gap-6">
                <span>
                  TOTAL // <strong className="text-white font-normal">{String(projects.length).padStart(2, "0")} SERVICES</strong>
                </span>
                <span className="text-white/20">•</span>
                <span className="text-white font-semibold">CLICK ANY CARD TO VIEW FULL EXPLANATION</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE 13 SERVICES GRID & SHOWCASE */}
      <section className="py-14 sm:py-24 px-4 sm:px-6 lg:px-12 relative bg-brand-black">
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-white/60 font-semibold">
                  OUR 13 SERVICES
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold uppercase tracking-tight text-white leading-none">
                THE 13 SERVICES.
              </h2>
              <p className="text-xs sm:text-sm font-mono text-brand-grey mt-3 max-w-2xl leading-relaxed">
                Click any of our 13 services to inspect the full explanation, deliverables, specifications, and complete case study.
              </p>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs text-white/60 shrink-0">
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white font-semibold">
                13 DISCIPLINES
              </span>
            </div>
          </div>

          {/* 13 Services Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {projects.map((service, index) => {
              const heroImg = service.thumbnail || service.gallery[0];

              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03, duration: 0.4 }}
                  className="h-full"
                >
                  <Link
                    to={`/work/${service.slug}`}
                    className="group relative h-full rounded-2xl sm:rounded-3xl border border-white/10 hover:border-white/40 shadow-lg hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(255,255,255,0.08)] hover:-translate-y-1.5 flex flex-col justify-between transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.05] cursor-pointer overflow-hidden block"
                    aria-label={`View full explanation and case study for ${service.title}`}
                  >
                    {/* Top Thumbnail Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <img
                        src={heroImg}
                        alt={service.title}
                        className="object-cover w-full h-full filter brightness-90 contrast-105 group-hover:scale-105 group-hover:brightness-105 transition-all duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 pointer-events-none" />

                      {/* Badge & Number */}
                      <div className="absolute top-3 left-3 right-3 flex justify-between items-center text-xs font-mono pointer-events-none">
                        <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white font-bold text-[10px] tracking-wider">
                          [ {String(index + 1).padStart(2, "0")} ]
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/80 text-[10px] tracking-widest uppercase">
                          {service.year}
                        </span>
                      </div>

                      {/* Hover Prompt */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                        <span className="px-4 py-2 rounded-full bg-white text-black font-mono text-[11px] uppercase tracking-widest font-bold shadow-xl flex items-center gap-1.5 transform group-hover:scale-105 transition-transform">
                          <span>FULL EXPLANATION</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>

                      {/* Bottom Deliverable Tag */}
                      <div className="absolute bottom-2.5 left-3 right-3 pointer-events-none text-[10px] font-mono text-white/80 truncate">
                        {service.deliverableType}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-4">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">
                            {service.category}
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-display font-bold uppercase text-white group-hover:text-brand-light transition-colors tracking-tight line-clamp-1">
                          {service.title}
                        </h3>
                        <p className="text-xs text-brand-grey font-light line-clamp-2 mt-1.5 leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      {/* Scope Pills */}
                      {service.scope && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {service.scope.slice(0, 3).map((item, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/80 border border-white/10 truncate max-w-full"
                            >
                              {item}
                            </span>
                          ))}
                          {service.scope.length > 3 && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 text-white/40">
                              +{service.scope.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. ABOUT VIYANA - IDEAS INTO VISUAL STORIES (WHITE CARD CANVAS) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 border-t border-white/10 bg-brand-dark/40 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none rounded-full" />
        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Floating White Card */}
          <div className="p-8 sm:p-14 rounded-3xl bg-white text-black border border-black/10 shadow-[0_25px_60px_rgba(0,0,0,0.25)] grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center relative overflow-hidden selection:bg-black selection:text-white">
            {/* Subtle tactile dot pattern inside white card */}
            <div className="absolute inset-0 bg-[radial-gradient(#0000000d_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

            <div className="lg:col-span-5 space-y-4 relative z-10">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-600 block font-semibold">
                ABOUT VIYANA
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-black leading-tight">
                IDEAS INTO <br />
                <span className="font-extrabold text-black">VISUAL STORIES.</span>
              </h2>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-black text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 active:scale-95 transition-all shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)] hover:scale-[1.02]"
                >
                  <span>MORE ABOUT VIYANA</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm md:text-base text-neutral-600 font-normal leading-relaxed border-t lg:border-t-0 lg:border-l border-black/10 pt-6 lg:pt-0 lg:pl-10 relative z-10">
              <p>
                From commercial advertising and cinema shoots to mobile-first vertical series and full-scale film productions, Viyana Productions operates at the intersection of creative strategy, technical craft, and modern cultural relevance.
              </p>
              <p className="text-neutral-900 font-medium">
                Every project is directed and finished to international master standards — combining large format sensors, precision cinema lighting, and industry-grade DaVinci Resolve ACES color pipelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
