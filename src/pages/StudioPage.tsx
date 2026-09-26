"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { services } from "@/data/services";

const studioService = services.find((s) => s.slug === "studio-rental")!;

export default function StudioPage() {
  const [isHovered, setIsHovered] = useState(false);
  const s = studioService;

  return (
    <main className="min-h-screen bg-brand-black text-brand-light relative overflow-x-hidden selection:bg-white selection:text-black">
      <Navbar />

      {/* ── HERO HEADER ──────────────────────────────── */}
      <section className="relative pt-24 sm:pt-28 md:pt-36 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-12 border-b border-white/10 overflow-hidden bg-gradient-to-b from-brand-dark/80 via-brand-black to-brand-black">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-40" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 text-[10px] sm:text-xs font-mono tracking-widest uppercase text-white/70"
          >
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white font-semibold">
              VIYANA PRODUCTIONS
            </span>
            <span className="text-white/30 hidden sm:inline">•</span>
            <span className="text-white/60">STUDIO RENTAL</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[7.5vw] font-display font-extrabold tracking-tight uppercase leading-[0.88] text-white select-none mb-6"
          >
            <span className="block">PROFESSIONAL</span>
            <span className="block">STUDIO SPACES.</span>
          </motion.h1>

          <div className="space-y-4 pt-2 pb-6 border-b border-white/10">
            <p className="text-base sm:text-lg md:text-xl font-light text-white/90 max-w-3xl leading-relaxed">
              {s.description}
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 pt-1">
              {s.services.map((item) => (
                <span key={item} className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white/[0.04] border border-white/15 hover:border-white/40 text-white/90 text-xs font-mono uppercase tracking-wider transition-colors">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-6 text-xs uppercase font-mono tracking-widest text-brand-grey">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-white/30" />
              <span className="text-white font-medium">STUDIO RENTAL — VIYANA PRODUCTIONS</span>
            </div>
            <div className="flex gap-4 sm:gap-6">
              {s.metrics.map((m) => (
                <span key={m.label}>{m.label} // <strong className="text-white font-normal">{m.value}</strong></span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN EDITORIAL CARD ──────────────────────── */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-12">
        <div className="container mx-auto max-w-7xl">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group relative grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-center border-b border-white/10 pb-12 sm:pb-20"
          >
            {/* Background watermark */}
            <div className="absolute -top-8 sm:-top-12 left-0 right-0 pointer-events-none select-none text-[10vw] font-display font-extrabold uppercase tracking-tighter text-white/[0.018] whitespace-nowrap overflow-hidden z-0">
              STUDIO RENTAL • VIYANA PRODUCTIONS
            </div>

            {/* LEFT: Image */}
            <div className="lg:col-span-7 flex flex-col relative z-10 lg:order-1">
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative block w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden bg-brand-dark border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)] group-hover:border-white/50 group-hover:shadow-[0_25px_80px_rgba(255,255,255,0.12)] transition-all duration-500"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="object-cover w-full h-full absolute inset-0 filter contrast-[1.05] brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10 opacity-80 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

                {/* Top badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10 pointer-events-none">
                  <span className="text-[10px] uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/20 font-mono shadow-lg">
                    {s.pillar}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/25 font-mono font-semibold shadow-md">
                    {s.number}
                  </span>
                </div>

                {/* Corner brackets */}
                <div className="absolute inset-4 pointer-events-none z-20">
                  <span className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 transition-all duration-300 ${isHovered ? "border-white w-6 h-6" : "border-white/20"}`} />
                  <span className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 transition-all duration-300 ${isHovered ? "border-white w-6 h-6" : "border-white/20"}`} />
                  <span className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 transition-all duration-300 ${isHovered ? "border-white w-6 h-6" : "border-white/20"}`} />
                  <span className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 transition-all duration-300 ${isHovered ? "border-white w-6 h-6" : "border-white/20"}`} />
                </div>

                {/* Hover overlay CTA */}
                <Link
                  to="/contact"
                  className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 bg-black/30 backdrop-blur-[2px]"
                >
                  <span className="px-5 py-2 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-bold shadow-2xl flex items-center gap-2 transform group-hover:scale-105 transition-transform">
                    <span>BOOK THE STUDIO</span>
                    <span className="text-sm">→</span>
                  </span>
                </Link>

                {/* Bottom bar */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-xs font-mono text-white/80 z-10 pointer-events-none">
                  <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/15 text-[11px] truncate max-w-[70%]">
                    Full Production Space
                  </span>
                  <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15 text-[10px] text-white/80 uppercase tracking-wider">
                    4K READY
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT: Info column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 relative z-10 lg:order-2">
              {/* Meta header */}
              <div className="flex items-center justify-between text-xs font-mono tracking-widest text-brand-grey border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-white font-bold bg-white/10 px-2.5 py-0.5 rounded-md border border-white/15">
                    [ {s.number} ]
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="text-white/90 font-medium">VIYANA STUDIO</span>
                </div>
                <span className="text-white font-semibold">BANGALORE</span>
              </div>

              {/* Title & tagline */}
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight uppercase text-white group-hover:text-brand-light transition-colors mb-2 leading-none">
                  {s.pillar}
                </h2>
                <p className="text-xs font-mono text-white/70 uppercase tracking-wider font-semibold">{s.tagline}</p>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-brand-grey leading-relaxed font-light">{s.description}</p>

              {/* Deliverables as scope tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {s.deliverables.map((item, i) => (
                  <span key={i} className="text-xs sm:text-[13px] uppercase font-mono px-3.5 py-1.5 rounded-md bg-white/5 text-white/90 border border-white/10 hover:border-white/30 transition-colors cursor-default tracking-wider font-medium">
                    {item}
                  </span>
                ))}
              </div>

              {/* Impact badge */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.04] border border-white/20 text-white text-xs sm:text-sm font-mono flex items-center gap-3">
                <span className="font-medium tracking-wide">Half-Day & Full-Day bookings available — crew, lighting, and sets included</span>
              </div>

              {/* Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/10 pt-4 sm:pt-5 mt-1 text-xs font-mono">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-white/80 text-xs uppercase tracking-widest font-mono font-medium">STUDIO RENTAL</span>
                </div>
                <Link
                  to="/contact"
                  id="studio-book-cta"
                  className="group/link inline-flex items-center justify-center gap-2.5 px-6 py-3 sm:py-2.5 rounded-full bg-white text-black hover:bg-brand-light font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto"
                >
                  <span>{s.ctaText}</span>
                  <span className="group-hover/link:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>
          </motion.article>

          {/* ── PACKAGES ───────────────────────────────── */}
          <div className="pt-16 sm:pt-20">
            <div className="flex items-center gap-3 mb-10">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/50">STUDIO PACKAGES</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {s.packages.map((pkg, i) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.025] hover:bg-white/[0.06] hover:border-white/30 transition-all duration-300"
                >
                  <span className="text-[10px] font-mono text-white/30 block mb-3 tracking-widest">[0{i + 1}]</span>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white uppercase tracking-tight mb-1 group-hover:text-brand-light transition-colors">{pkg.name}</h3>
                  <p className="text-xs font-mono text-white/50 mb-4 uppercase tracking-wider">{pkg.duration} • {pkg.idealFor}</p>
                  <ul className="space-y-2">
                    {pkg.includes.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-brand-grey font-light">
                        <span className="w-1 h-1 rounded-full bg-white/40 mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="mt-6 block w-full py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-center text-xs font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    ENQUIRE →
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── WORKFLOW ───────────────────────────────── */}
          <div className="pt-16 sm:pt-20 border-t border-white/10 mt-16 sm:mt-20">
            <div className="flex items-center gap-3 mb-10">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/50">HOW IT WORKS</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {s.workflow.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col gap-4 p-6 rounded-2xl border border-white/8 bg-white/[0.02]"
                >
                  <span className="text-4xl sm:text-5xl font-display font-extrabold text-white/10 tracking-tighter leading-none">{step.number}</span>
                  <div>
                    <h4 className="text-sm font-display font-bold text-white uppercase tracking-tight mb-1">{step.title}</h4>
                    <p className="text-xs text-brand-grey font-light leading-relaxed mb-2">{step.description}</p>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Output: {step.output}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-brand-dark text-center border-t border-white/10 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)] pointer-events-none rounded-full" />
        <div className="container mx-auto max-w-4xl relative z-10 space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/50 block">READY TO SHOOT?</span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-syne font-bold uppercase tracking-tight text-white">
            YOUR VISION.<br />OUR SPACE.
          </h2>
          <p className="text-sm sm:text-base text-brand-grey max-w-xl mx-auto font-light leading-relaxed">
            Book your session at Viyana Studio and get access to a fully equipped, professional production environment built for every creative brief.
          </p>
          <div className="pt-3 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" id="studio-cta-bottom" className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-brand-light hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl">
              <span>BOOK THE STUDIO →</span>
            </Link>
            <Link to="/podcast" className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 rounded-full border border-white/20 text-white font-mono text-xs uppercase tracking-widest hover:border-white hover:bg-white/10 active:scale-95 transition-all duration-300">
              <span>EXPLORE PODCASTS →</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
