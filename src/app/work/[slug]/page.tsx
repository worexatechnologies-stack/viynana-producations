"use client";

import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { use } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const currentIdx = projects.findIndex((p) => p.slug === slug);
  const nextProjectIdx = (currentIdx + 1) % projects.length;
  const prevProjectIdx = (currentIdx - 1 + projects.length) % projects.length;
  const nextProject = projects[nextProjectIdx];
  const prevProject = projects[prevProjectIdx];

  const heroImage = project.thumbnail || project.gallery[0];

  return (
    <main className="bg-[#080808] text-brand-light min-h-screen selection:bg-white selection:text-black overflow-x-hidden">
      <Navbar />

      <article className="relative">
        {/* 1. TOP BREADCRUMB & CONTROLS (Docks smoothly below fixed Navbar) */}
        <section className="pt-20 sm:pt-28 pb-3 sm:pb-4 px-3.5 sm:px-6 lg:px-12 border-b border-white/10 bg-brand-black/95 backdrop-blur-2xl sticky top-[56px] sm:top-[72px] z-30 transition-all">
          <div className="container mx-auto flex flex-row justify-between items-center gap-2 sm:gap-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-[0.18em] sm:tracking-[0.2em] text-white/80 hover:text-white transition-colors group shrink-0"
            >
              <span className="transition-transform group-hover:-translate-x-1 font-bold">←</span>
              <span>ALL WORK</span>
            </Link>

            <div className="flex items-center gap-2 sm:gap-4 text-xs font-mono shrink-0">
              <span className="hidden md:inline-block px-3 py-1 rounded-full bg-white/[0.06] border border-white/15 text-white/90 uppercase tracking-widest text-[11px]">
                {project.category}
              </span>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Link
                  href={`/work/${prevProject.slug}`}
                  className="px-2.5 py-1.5 rounded-lg border border-white/20 text-white/70 hover:text-white hover:border-white/40 active:bg-white/15 transition-colors text-[10px] sm:text-xs font-semibold"
                  title={`Previous: ${prevProject.title}`}
                >
                  PREV
                </Link>
                <span className="text-white/40 tracking-wider text-[10px] sm:text-xs px-1">
                  0{currentIdx + 1}/0{projects.length}
                </span>
                <Link
                  href={`/work/${nextProject.slug}`}
                  className="px-2.5 py-1.5 rounded-lg border border-white/20 text-white/70 hover:text-white hover:border-white/40 active:bg-white/15 transition-colors text-[10px] sm:text-xs font-semibold"
                  title={`Next: ${nextProject.title}`}
                >
                  NEXT
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 2. CATEGORY LANDING HEADER */}
        <section className="pt-8 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-12">
          <div className="container mx-auto max-w-7xl">
            {/* Category Tag & Year */}
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white/90 font-semibold">
                {project.category}
              </span>
              <span className="text-white/30">•</span>
              <span className="text-[11px] sm:text-xs font-mono tracking-widest text-white/60">
                {project.year} ARCHIVE
              </span>
            </div>

            {/* Monumental Title */}
            <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-[6.5vw] font-serif tracking-tight uppercase leading-[0.95] sm:leading-[0.9] text-white mb-3 sm:mb-4 select-none">
              {project.title}
            </h1>

            {/* Deliverable Sub-Badge */}
            <p className="text-xs sm:text-sm md:text-base font-mono text-white/80 font-normal tracking-wider uppercase mb-6 sm:mb-8">
              {project.deliverableType}
            </p>

            {/* Luxury Glassmorphic Meta Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-white/[0.04] backdrop-blur-2xl border border-white/15 shadow-2xl">
              <div>
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-white/40 block mb-1">
                  CLIENT
                </span>
                <p className="text-xs sm:text-sm font-sans font-semibold text-white truncate">
                  {project.client}
                </p>
              </div>
              <div>
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-white/40 block mb-1">
                  DIRECTOR / STUDIO
                </span>
                <p className="text-xs sm:text-sm font-sans font-semibold text-white truncate">
                  {project.director || "Viyana Creative Lab"}
                </p>
              </div>
              <div>
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-white/40 block mb-1">
                  COLOR &amp; PIPELINE
                </span>
                <p className="text-xs sm:text-sm font-sans font-semibold text-white truncate">
                  ACEScc • 16-Bit
                </p>
              </div>
              <div>
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-white/40 block mb-1">
                  FORMAT &amp; SENSOR
                </span>
                <p className="text-xs sm:text-sm font-sans font-semibold text-white truncate">
                  4K DCI • Large Format
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ONLY ONE DEDICATED MASTER PRODUCTION IMAGE */}
        <section className="py-4 sm:py-10 px-4 sm:px-6 lg:px-12">
          <div className="container mx-auto max-w-7xl">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-brand-dark shadow-[0_20px_70px_rgba(0,0,0,0.95)]">
              <Image
                src={heroImage}
                alt={`${project.title} - ${project.category} Master Visual`}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1400px"
                className="object-cover filter contrast-[1.05] brightness-95"
              />
              {/* Subtle cinematic gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Optical Corner Brackets */}
              <div className="absolute inset-3 sm:inset-5 pointer-events-none z-10">
                <span className="absolute top-0 left-0 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-l-2 border-white/60" />
                <span className="absolute top-0 right-0 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-r-2 border-white/60" />
                <span className="absolute bottom-0 left-0 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-l-2 border-white/60" />
                <span className="absolute bottom-0 right-0 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-r-2 border-white/60" />
              </div>

              {/* Bottom Meta Overlay */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-6 sm:right-6 flex justify-between items-end text-xs font-mono text-white/80 z-10 pointer-events-none">
                <div className="flex items-center gap-2 max-w-[70%]">
                  <span className="bg-black/80 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md border border-white/15 text-[10px] sm:text-[11px] font-semibold text-white truncate">
                    {project.title} // STILL
                  </span>
                </div>
                <span className="bg-black/80 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md border border-white/20 text-[10px] sm:text-[11px] text-white/90 font-mono shrink-0">
                  4K DCI • HDR
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
                  <p>
                    Engineered from core conceptual strategy to final master delivery, this {project.category.toLowerCase()} production encapsulates Viyana&apos;s full-pipeline discipline: marrying strategic narrative, bold visual aesthetics, and uncompromising execution.
                  </p>
                  <p>
                    Working directly alongside <strong className="text-white font-normal">{project.client}</strong>, our directors, writers, and visual designers crafted a singular aesthetic world designed to command visceral audience attention and build lasting brand resonance.
                  </p>
                </div>

                {/* Scope Badges */}
                {project.scope && (
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-white/50 block">
                      DELIVERABLE SCOPE &amp; PIPELINE
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
                        CAMPAIGN PERFORMANCE
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
                      <span className="text-brand-grey">COLOR PIPELINE</span>
                      <span className="text-white font-medium">ACEScc • 16-Bit Float</span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-brand-grey">RELEASE YEAR</span>
                      <span className="text-white font-medium">{project.year}</span>
                    </div>
                  </div>

                  {/* Commission Project CTA */}
                  <div className="pt-3">
                    <Link
                      href="/contact"
                      className="w-full py-3.5 px-4 rounded-xl bg-white text-black hover:bg-brand-light font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-white/20"
                    >
                      <span>COMMISSION {project.category}</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 5. NEXT DISCIPLINE SHOWCASE WITH REALISTIC PRODUCTION BACKDROP */}
        <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-t border-white/10 overflow-hidden bg-brand-dark group/next">
          {/* Realistic Film Production Atmospheric Backdrop */}
          <div className="absolute inset-0 z-0 opacity-25 group-hover/next:opacity-35 transition-opacity duration-700 pointer-events-none">
            <Image
              src={nextProject.thumbnail}
              alt={nextProject.title}
              fill
              className="object-cover filter brightness-75 contrast-110 scale-100 group-hover/next:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#080808]/85 to-[#080808]" />
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
          </div>

          <div className="relative z-10 container mx-auto max-w-4xl text-center flex flex-col items-center">
            {/* Top Status Header */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 mb-4 shadow-xl">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-white/80">
                NEXT DISCIPLINE // 0{nextProjectIdx + 1} OF 0{projects.length}
              </span>
            </div>

            {/* Category Subtitle */}
            <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-white/90 mb-3 font-semibold">
              {nextProject.category} • {nextProject.client}
            </span>

            {/* Stylish, Calibrated Editorial Title */}
            <Link
              href={`/work/${nextProject.slug}`}
              className="group/title block mb-6 max-w-2xl"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-normal uppercase tracking-tight text-white group-hover/title:text-brand-light transition-colors leading-tight">
                <span className="italic font-serif">{nextProject.title}</span>
              </h2>
            </Link>

            {/* Compact Deliverable Tag */}
            <p className="text-xs font-mono text-white/60 uppercase tracking-wider mb-8 max-w-lg">
              {nextProject.deliverableType}
            </p>

            {/* Stylish Action Button */}
            <Link
              href={`/work/${nextProject.slug}`}
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