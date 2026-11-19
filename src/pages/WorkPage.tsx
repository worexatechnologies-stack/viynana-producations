"use client";

import { useRef } from "react";
import { projects } from "@/data/projects";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Tv,
  Video,
  Camera,
  Clapperboard,
  Palette,
  ArrowRight,
  ArrowUpRight,
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
  const { pathname } = useLocation();
  const isServices = pathname.startsWith("/services");

  const metaTitle = isServices
    ? "Creative Production Services in Bangalore | Viyana Productions"
    : "Selected Works & Film Production Portfolio | Viyana Productions";
  const metaDescription = isServices
    ? "Explore creative video production services by Viyana Productions: commercial advertising, cinematic content shoots, brand films, and studio production."
    : "Explore our portfolio of commercial ads, cinematic shoots, brand films, and visual identity projects crafted by Viyana Productions in Bangalore.";
  const metaKeywords = isServices
    ? "production services, video production services bangalore, commercial production, brand film services, creative studio"
    : "work portfolio, video production portfolio, commercial ads, brand films, viyana productions work";
  const canonicalUrl = isServices
    ? "https://viyana.productions/services"
    : "https://viyana.productions/work";

  return (
    <main className="min-h-screen bg-[#fbfaf8] text-[#20201e] selection:bg-[#111827] selection:text-white font-portfolio-sans relative overflow-x-hidden">
      <SEO
        title={metaTitle}
        description={metaDescription}
        keywords={metaKeywords}
        ogTitle={metaTitle}
        ogType="website"
        ogDescription={metaDescription}
        ogUrl={canonicalUrl}
        ogSiteName="Viyana Productions"
        ogImage="https://viyana.productions/logo-black.png"
        twitterSite="https://twitter.com/"
        twitterTitle={metaTitle}
        twitterDescription={metaDescription}
        author="Akshay"
        canonical={canonicalUrl}
        robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        publisher="Viyana Productions"
        ogLocale="en_US"
      />

      <Navbar />

      {/* 1. HERO HEADER (PORTFOLIO LIGHT THEME) */}
      <section
        ref={headerRef}
        className="relative pt-24 sm:pt-32 md:pt-36 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-12 border-b border-[#e7e6e2] bg-[#fbfaf8] overflow-hidden"
      >
        {/* Subtle Ambient Light Blue Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.06)_0%,transparent_75%)] pointer-events-none blur-2xl" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col">
            
            {/* Top Brand & Discipline Status Strip */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#0ea5e9]/20 bg-[#0ea5e9]/10 text-[#0284c7] w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] animate-pulse" />
                <span className="text-[10px] sm:text-xs font-portfolio-sans uppercase tracking-[0.2em] font-bold text-[#0284c7]">
                  VIYANA PRODUCTIONS
                </span>
                <span className="text-[#0284c7]/40 hidden sm:inline">•</span>
                <span className="text-[10px] sm:text-xs font-portfolio-sans uppercase tracking-widest hidden sm:inline text-[#0284c7]/80 font-medium">
                  STUDIO ARCHIVE
                </span>
              </div>

              <div className="hidden sm:block text-[10px] sm:text-xs font-portfolio-sans tracking-widest uppercase overflow-hidden text-ellipsis whitespace-nowrap text-[#8e8d88]">
                CREATIVE ADVERTISING × VIDEO PRODUCTION × GRAPHIC DESIGN × BRANDING × PHOTO &amp; VIDEO SHOOT
              </div>
            </div>

            {/* Monumental Headline: SELECTED WORK. */}
            <div className="mb-4 sm:mb-6">
              <span className="text-[11px] font-portfolio-sans tracking-[0.2em] uppercase block mb-2 text-[#0284c7] font-bold">
                [ 01 // PORTFOLIO ARCHIVE ]
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-portfolio-serif font-normal tracking-tight text-[#20201e] leading-[1.05]">
                SELECTED{" "}
                <em className="italic text-[#0284c7] font-normal">
                  WORK.
                </em>
              </h1>
            </div>

            {/* Headline Subtitle & Core Capabilities Deck */}
            <div className="space-y-4 pt-1 pb-6 border-b border-[#e7e6e2]">
              <div className="border-l-2 border-[#0284c7] pl-4 sm:pl-6 py-0.5">
                <p className="text-base sm:text-lg md:text-xl font-portfolio-sans font-normal max-w-3xl leading-relaxed text-[#686762]">
                  We create cinematic campaigns, commercial films, and distinctive visual experiences that help ambitious brands get noticed and remembered.
                </p>
              </div>

              {/* Core Capabilities Pills */}
              <div className="flex flex-wrap gap-2 sm:gap-2.5 pt-1">
                {coreCapabilities.map((cap) => {
                  const Icon = cap.icon;
                  return (
                    <span
                      key={cap.name}
                      className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full border border-[#e7e6e2] hover:border-[#0ea5e9] bg-white text-[#20201e] text-[11px] sm:text-xs font-portfolio-sans uppercase tracking-wider font-medium transition-all duration-300 hover:scale-[1.02]"
                    >
                      <Icon className="w-3.5 h-3.5 text-[#0284c7]" />
                      <span>{cap.name}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Creative Philosophy & About Viyana Architectural Card */}
            <div className="mt-6 sm:mt-10 p-6 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl border border-[#e7e6e2] bg-white relative overflow-hidden">
              {/* Philosophy Header Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#0ea5e9]/20 bg-[#0ea5e9]/10 text-[#0284c7] text-[10px] sm:text-xs font-portfolio-sans uppercase tracking-[0.2em] font-bold mb-6 sm:mb-8 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] animate-pulse" />
                <span>OUR CREATIVE PHILOSOPHY</span>
              </div>

              {/* 3 Pillars in Elevated Clean Panels */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pb-6 sm:pb-8 mb-6 sm:mb-8 border-b border-[#e7e6e2]">
                <div className="p-6 rounded-2xl border border-[#e7e6e2] hover:border-[#0ea5e9] bg-[#fbfaf8] hover:bg-white transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0ea5e9]/40 to-transparent group-hover:via-[#0ea5e9] transition-all duration-500" />
                  <span className="text-xs mb-2 font-portfolio-sans uppercase tracking-widest block text-[#0284c7] font-bold">[ 01 ]</span>
                  <h3 className="text-xl sm:text-2xl font-portfolio-serif font-normal text-[#20201e] group-hover:text-[#0284c7] transition-colors">
                    IDEAS FIRST.
                  </h3>
                </div>

                <div className="p-6 rounded-2xl border border-[#e7e6e2] hover:border-[#0ea5e9] bg-[#fbfaf8] hover:bg-white transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0ea5e9]/40 to-transparent group-hover:via-[#0ea5e9] transition-all duration-500" />
                  <span className="text-xs mb-2 font-portfolio-sans uppercase tracking-widest block text-[#0284c7] font-bold">[ 02 ]</span>
                  <h3 className="text-xl sm:text-2xl font-portfolio-serif font-normal text-[#20201e] group-hover:text-[#0284c7] transition-colors">
                    VISUALS WITH PURPOSE.
                  </h3>
                </div>

                <div className="p-6 rounded-2xl border border-[#e7e6e2] hover:border-[#0ea5e9] bg-[#fbfaf8] hover:bg-white transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0ea5e9]/40 to-transparent group-hover:via-[#0ea5e9] transition-all duration-500" />
                  <span className="text-xs mb-2 font-portfolio-sans uppercase tracking-widest block text-[#0284c7] font-bold">[ 03 ]</span>
                  <h3 className="text-xl sm:text-2xl font-portfolio-serif font-normal text-[#20201e] group-hover:text-[#0284c7] transition-colors">
                    STORIES THAT STAY.
                  </h3>
                </div>
              </div>

              {/* About Viyana Sub-Block */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
                <div className="lg:col-span-5 space-y-3">
                  <span className="text-xs font-portfolio-sans uppercase tracking-[0.2em] font-bold block text-[#0284c7]">
                    ABOUT VIYANA
                  </span>
                  <h4 className="text-2xl sm:text-3xl md:text-4xl font-portfolio-serif font-normal tracking-tight text-[#20201e] leading-tight">
                    We Turn Ideas Into <br />
                    <em className="italic text-[#0284c7] font-normal">Visual Experiences.</em>
                  </h4>
                </div>

                <div className="lg:col-span-7 space-y-4 text-sm sm:text-base font-portfolio-sans text-[#686762] leading-relaxed border-t lg:border-t-0 lg:border-l border-[#e7e6e2] pt-6 lg:pt-0 lg:pl-10">
                  <p>
                    Viyana Productions is a creative production and advertising agency focused on helping ambitious brands communicate through powerful visuals.
                  </p>
                  <p>
                    We combine creative thinking, advertising strategy, storytelling, video production, and graphic design to create content that doesn&apos;t just look good — it has a purpose.
                  </p>
                  <p className="text-[#20201e] font-medium">
                    Whether you&apos;re launching a new product, promoting a service, building a brand, or running an advertising campaign, we help transform your vision into content that people notice.
                  </p>
                </div>
              </div>
            </div>

            {/* Total 13 Services Stats Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6 sm:pt-8 text-xs uppercase font-portfolio-sans tracking-widest text-[#686762]">
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-[#0284c7]" />
                <span className="font-bold text-[#20201e]">13 SPECIALIZED SERVICES &amp; DISCIPLINES</span>
              </div>
              <div className="flex items-center gap-3 sm:gap-6">
                <span>
                  TOTAL // <strong className="font-bold text-[#0284c7]">{String(projects.length).padStart(2, "0")} SERVICES</strong>
                </span>
                <span className="text-[#dedbd4]">•</span>
                <span className="font-semibold text-[#20201e]">CLICK ANY CARD TO VIEW FULL EXPLANATION</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE 13 SERVICES GRID & SHOWCASE */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12 relative bg-[#fbfaf8] border-b border-[#e7e6e2]">
        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#0ea5e9]/20 bg-[#0ea5e9]/10 text-[#0284c7] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] animate-pulse" />
                <span className="text-[11px] font-portfolio-sans uppercase tracking-[0.2em] font-bold text-[#0284c7]">
                  OUR 13 SERVICES
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-portfolio-serif font-normal tracking-tight text-[#20201e]">
                THE 13 <em className="italic text-[#0284c7] font-normal">SERVICES.</em>
              </h2>
              <p className="text-sm sm:text-base font-portfolio-sans text-[#686762] mt-3 max-w-2xl leading-relaxed">
                Click any of our 13 services to inspect the full explanation, deliverables, specifications, and complete case study.
              </p>
            </div>

            <div className="flex items-center gap-3 font-portfolio-sans text-xs shrink-0">
              <span className="px-4 py-2 rounded-full border border-[#dedbd4] bg-white text-[#20201e] font-bold tracking-wider uppercase">
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
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ delay: (index % 4) * 0.05, duration: 0.4, ease: "easeOut" }}
                  className="h-full"
                >
                  <Link
                    to={`/work/${service.slug}`}
                    className="group relative h-full rounded-2xl sm:rounded-3xl border border-[#e7e6e2] hover:border-[#0ea5e9] bg-white transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden flex flex-col justify-between block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                    aria-label={`View full explanation and case study for ${service.title}`}
                  >
                    {/* Top Thumbnail Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f0eee9]">
                      <img
                        src={heroImg}
                        alt={service.title}
                        loading={index < 4 ? "eager" : "lazy"}
                        decoding="async"
                        width="600"
                        height="375"
                        className="w-full h-full transition-all duration-700 ease-out object-cover group-hover:scale-105"
                      />
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                      {/* Badge & Number */}
                      <div className="absolute top-3 left-3 right-3 flex justify-between items-center text-xs font-portfolio-sans pointer-events-none">
                        <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#dedbd4] text-[#20201e] font-bold text-[10px] tracking-wider">
                          [ {String(index + 1).padStart(2, "0")} ]
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-[#dedbd4] text-[#686762] text-[10px] tracking-widest uppercase font-semibold">
                          {service.year}
                        </span>
                      </div>

                      {/* Hover Prompt */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                        <span className="px-4 py-2 rounded-full bg-[#111827] text-white font-portfolio-sans text-[11px] uppercase tracking-widest font-bold flex items-center gap-1.5 transform group-hover:scale-105 transition-transform">
                          <span>FULL EXPLANATION</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#0ea5e9]" />
                        </span>
                      </div>

                      {/* Bottom Deliverable Tag */}
                      <div className="absolute bottom-2.5 left-3 right-3 pointer-events-none text-[11px] font-portfolio-sans text-white font-medium drop-shadow-sm truncate">
                        {service.deliverableType}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4 bg-white">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[10px] font-portfolio-sans uppercase tracking-[0.2em] text-[#0284c7] font-bold">
                            {service.category}
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-[#8e8d88] group-hover:text-[#0284c7] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-portfolio-serif font-bold text-[#20201e] group-hover:text-[#0284c7] transition-colors tracking-tight line-clamp-1">
                          {service.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#686762] font-portfolio-sans line-clamp-2 mt-2 leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      {/* Scope Pills */}
                      {service.scope && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {service.scope.slice(0, 3).map((item, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-portfolio-sans px-2.5 py-1 rounded-full bg-[#fbfaf8] text-[#686762] border border-[#e7e6e2] truncate max-w-full font-medium"
                            >
                              {item}
                            </span>
                          ))}
                          {service.scope.length > 3 && (
                            <span className="text-[10px] font-portfolio-sans px-2 py-1 text-[#8e8d88] font-medium">
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

      {/* 3. ABOUT VIYANA - IDEAS INTO VISUAL STORIES */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 border-t border-[#e7e6e2] bg-[#fbfaf8] relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Floating Luxury Paper Card */}
          <div className="p-8 sm:p-14 rounded-3xl bg-white text-[#20201e] border border-[#e7e6e2] grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center relative overflow-hidden">
            <div className="lg:col-span-5 space-y-4 relative z-10">
              <span className="text-xs font-portfolio-sans uppercase tracking-[0.2em] text-[#0284c7] block font-bold">
                ABOUT VIYANA
              </span>
              <h2 className="text-3xl sm:text-5xl font-portfolio-serif font-normal tracking-tight text-[#20201e] leading-tight">
                IDEAS INTO <br />
                <em className="italic text-[#0284c7] font-normal">VISUAL STORIES.</em>
              </h2>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#111827] text-white hover:bg-[#0284c7] font-portfolio-sans text-xs uppercase tracking-wider font-bold transition-all active:scale-95"
                >
                  <span>MORE ABOUT VIYANA</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-[#686762] font-portfolio-sans font-normal leading-relaxed border-t lg:border-t-0 lg:border-l border-[#e7e6e2] pt-6 lg:pt-0 lg:pl-10 relative z-10">
              <p>
                From commercial advertising and cinema shoots to mobile-first vertical series and full-scale film productions, Viyana Productions operates at the intersection of creative strategy, technical craft, and modern cultural relevance.
              </p>
              <p className="text-[#20201e] font-medium">
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
