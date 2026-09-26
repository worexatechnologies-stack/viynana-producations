"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { projects, Project } from "@/data/projects";

import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tv, Video, Camera, Clapperboard, Palette } from "lucide-react";

const coreCapabilities = [
  { name: "Advertisement & management", icon: Tv },
  { name: "Production and shoot", icon: Video },
  { name: "Photo & video shoot", icon: Camera },
  { name: "Production house", icon: Clapperboard },
  { name: "Branding", icon: Palette },
];

interface DisciplineGroup {
  id: string;
  number: string;
  name: string;
  heading: string;
  subtitle: string;
}

const disciplineGroups: DisciplineGroup[] = [
  {
    id: "commercial-ads",
    number: "01",
    name: "COMMERCIAL ADS",
    heading: "COMMERCIAL ADS",
    subtitle: "High-Impact Commercial Films • National TVCs • Brand Launch Spots",
  },
  {
    id: "cinematic-content-shoot",
    number: "02",
    name: "CINEMATIC CONTENT SHOOT",
    heading: "CINEMATIC CONTENT SHOOT",
    subtitle: "Atmospheric Cinema Shoots • Luxury Brand Films • Poetic Visuals",
  },
  {
    id: "advertisement",
    number: "03",
    name: "ADVERTISEMENT",
    heading: "ADVERTISEMENT",
    subtitle: "High-Conversion Multi-Platform Campaigns • Digital & Social Commercials",
  },
  {
    id: "models-portfolio-shoots",
    number: "04",
    name: "MODELS PORTFOLIO SHOOTS",
    heading: "MODELS PORTFOLIO SHOOTS",
    subtitle: "High-Fashion Editorial Lookbooks • Agency Model Portfolios • Studio Sessions",
  },
  {
    id: "vertical-series",
    number: "05",
    name: "VERTICAL SERIES",
    heading: "VERTICAL SERIES",
    subtitle: "Mobile-First Narrative • 9:16 Episodic Content • Cyber Dramas",
  },
  {
    id: "web-series",
    number: "06",
    name: "WEB SERIES",
    heading: "WEB SERIES",
    subtitle: "Episodic Digital Originals • OTT Streaming Series • Narrative Worlds",
  },
  {
    id: "short-films",
    number: "07",
    name: "SHORT FILMS",
    heading: "SHORT FILMS",
    subtitle: "Festival Selection • Cinematic Drama • Auteur Storytelling",
  },
  {
    id: "film-production",
    number: "08",
    name: "FILM PRODUCTION",
    heading: "FILM PRODUCTION",
    subtitle: "Full-Scale Cinema Feature Productions • Theatrical Releases",
  },
  {
    id: "graphic-design",
    number: "09",
    name: "GRAPHIC DESIGN",
    heading: "GRAPHIC DESIGN",
    subtitle: "Visual Brand Identities • 3D Key Visuals • Motion Typography",
  },
  {
    id: "product-shoot",
    number: "10",
    name: "PRODUCT SHOOT",
    heading: "PRODUCT SHOOT",
    subtitle: "Online store photos • Lifestyle photos • Product videos",
  },
  {
    id: "influencer-shoot",
    number: "11",
    name: "INFLUENCER SHOOT",
    heading: "INFLUENCER SHOOT",
    subtitle: "Instagram Reels • Model Photos • Brand Collab Shoots",
  }
];

const filterOptions = [
  "ALL",
  "COMMERCIAL ADS",
  "CINEMATIC CONTENT SHOOT",
  "ADVERTISEMENT",
  "MODELS PORTFOLIO SHOOTS",
  "VERTICAL SERIES",
  "WEB SERIES",
  "SHORT FILMS",
  "FILM PRODUCTION",
  "GRAPHIC DESIGN",
  "PRODUCT SHOOT",
  "INFLUENCER SHOOT",
] as const;

interface ProjectCardProps {
  project: Project;
  idx: number;
  group: DisciplineGroup;
  isEven: boolean;
}

function ProjectCard({
  project,
  idx,
  group,
  isEven,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const heroImage = project.thumbnail || project.gallery[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-center border-b border-white/10 pb-12 sm:pb-20 last:border-b-0"
    >
      {/* Background Watermark Index */}
      <div className="absolute -top-8 sm:-top-12 left-0 right-0 pointer-events-none select-none text-[10vw] font-display font-extrabold uppercase tracking-tighter text-white/[0.018] whitespace-nowrap overflow-hidden z-0">
        {project.title} • {group.name}
      </div>

      {/* 1. Curated Visual Image Column (Zero Video Overhead, Ultra Fast) */}
      <div
        className={`lg:col-span-7 flex flex-col relative z-10 ${isEven ? "lg:order-1" : "lg:order-2"
          }`}
      >
        <Link
          to={`/work/${project.slug}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative block w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden bg-brand-dark border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)] group-hover:border-white/50 group-hover:shadow-[0_25px_80px_rgba(255,255,255,0.12)] transition-all duration-500 cursor-pointer"
        >
          {/* Main Related Category Image */}
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={heroImage}
              alt={`${project.title} - ${project.category}`}
              className="object-cover w-full h-full absolute inset-0 filter contrast-[1.05] brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>

          {/* Luxury Ambient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10 opacity-80 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

          {/* Top Badges: Category & Year */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10 pointer-events-none">
            <span className="text-[10px] uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/20 font-mono shadow-lg transition-transform group-hover:scale-105">
              {project.category}
            </span>
            <span className="text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/25 font-mono font-semibold shadow-md">
              {project.year}
            </span>
          </div>

          {/* Corner Framing Brackets */}
          <div className="absolute inset-4 pointer-events-none z-20 transition-opacity duration-300">
            <span className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 transition-all duration-300 ${isHovered ? "border-white w-6 h-6" : "border-white/20"}`} />
            <span className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 transition-all duration-300 ${isHovered ? "border-white w-6 h-6" : "border-white/20"}`} />
            <span className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 transition-all duration-300 ${isHovered ? "border-white w-6 h-6" : "border-white/20"}`} />
            <span className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 transition-all duration-300 ${isHovered ? "border-white w-6 h-6" : "border-white/20"}`} />
          </div>

          {/* Hover Center Indicator */}
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 bg-black/30 backdrop-blur-[2px]">
            <span className="px-5 py-2 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-bold shadow-2xl flex items-center gap-2 transform group-hover:scale-105 transition-transform">
              <span>EXPLORE CASE STUDY</span>
              <span className="text-sm">→</span>
            </span>
          </div>

          {/* Bottom Title Bar on Image for quick glance */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-xs font-mono text-white/80 z-10 pointer-events-none">
            <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/15 text-[11px] truncate max-w-[70%]">
              {project.deliverableType}
            </span>
            <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15 text-[10px] text-white/80 uppercase tracking-wider">
              ACES HDR
            </span>
          </div>
        </Link>
      </div>

      {/* 2. Editorial Information Column */}
      <div
        className={`lg:col-span-5 flex flex-col justify-between space-y-6 relative z-10 ${isEven ? "lg:order-2" : "lg:order-1"
          }`}
      >
        {/* Meta header */}
        <div className="flex items-center justify-between text-xs font-mono tracking-widest text-brand-grey border-b border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold bg-white/10 px-2.5 py-0.5 rounded-md border border-white/15">
              [ {group.number}.0{idx + 1} ]
            </span>
            <span className="text-white/30">•</span>
            <span className="text-white/90 font-medium">{project.client}</span>
          </div>
          <span className="text-white font-semibold">{project.year}</span>
        </div>

        {/* Title & Deliverable Type */}
        <div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight uppercase text-white group-hover:text-brand-light transition-colors mb-2 leading-none">
            <Link to={`/work/${project.slug}`}>{project.title}</Link>
          </h3>
          <p className="text-xs font-mono text-white/70 uppercase tracking-wider font-semibold">
            {project.deliverableType}
          </p>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-brand-grey leading-relaxed font-light">
          {project.description}
        </p>

        {/* Scope Tags */}
        {project.scope && (
          <div className="flex flex-wrap gap-2 pt-1">
            {project.scope.map((item, sIdx) => (
              <span
                key={sIdx}
                className="text-xs sm:text-[13px] uppercase font-mono px-3.5 py-1.5 rounded-md bg-white/5 text-white/90 border border-white/10 hover:border-white/30 transition-colors cursor-default tracking-wider font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        {/* Campaign Results Badge */}
        {project.impact && (
          <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.04] border border-white/20 text-white text-xs sm:text-sm font-mono flex items-center gap-3">
            <span className="font-medium tracking-wide">{project.impact}</span>
          </div>
        )}

        {/* Action Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/10 pt-4 sm:pt-5 mt-1 text-xs font-mono">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-white/80 text-xs uppercase tracking-widest font-mono font-medium">
              {project.category}
            </span>
          </div>

          <Link
            to={`/work/${project.slug}`}
            className="group/link inline-flex items-center justify-center gap-2.5 px-6 py-3 sm:py-2.5 rounded-full bg-white text-black hover:bg-brand-light font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto"
          >
            <span>VIEW CASE STUDY</span>
            <span className="group-hover/link:translate-x-1 transition-transform duration-300">
              →
            </span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const headerRef = useRef<HTMLDivElement>(null);

  // Sync active category from URL hash if navigating directly to a discipline
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const found = disciplineGroups.find(g => g.id === hash);
        if (found) {
          setActiveCategory(found.name);
          const el = document.getElementById(found.id);
          if (el) {
            setTimeout(() => {
              el.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const getCategoryCount = (cat: string) => {
    if (cat === "ALL") return projects.length;
    return projects.filter(p => p.category === cat).length;
  };

  // Filter groups depending on active tab
  const displayedGroups = useMemo(() => {
    if (activeCategory === "ALL") return disciplineGroups;
    return disciplineGroups.filter(g => g.name === activeCategory);
  }, [activeCategory]);

  return (
    <main className="min-h-screen bg-brand-black text-brand-light relative overflow-x-hidden selection:bg-white selection:text-black">
      <Navbar />

      {/* 1. HERO HEADER */}
      <section
        ref={headerRef}
        className="relative pt-24 sm:pt-28 md:pt-36 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-12 border-b border-white/10 overflow-hidden bg-gradient-to-b from-brand-dark/90 via-brand-black to-brand-black"
      >
        {/* Ambient background glow & subtle mesh */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-40" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col">
            {/* Top Brand Banner */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 text-[10px] sm:text-xs font-mono tracking-widest uppercase text-white/70">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white font-semibold">
                VIYANA PRODUCTIONS
              </span>
              <span className="text-white/30 hidden sm:inline">•</span>
              <span className="text-white/60">
                CREATIVE ADVERTISING × VIDEO PRODUCTION × GRAPHIC DESIGN × BRANDING × PHOTO &amp; VIDEO SHOOT
              </span>
            </div>

            {/* Stepped Title: SELECTED WORK */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[7.5vw] font-display font-extrabold tracking-tight uppercase leading-[0.88] text-white select-none mb-6">
              <span className="block hover:text-brand-light transition-colors">SELECTED</span>
              <span className="flex items-baseline text-white">
                <span className="invisible select-none opacity-0 pointer-events-none" aria-hidden="true">SELEC</span>
                <span>WORK.</span>
              </span>
            </h1>

            {/* Headline Subtitle & Capabilities */}
            <div className="space-y-6 pt-2 pb-6 border-b border-white/10">
              <p className="text-base sm:text-lg md:text-2xl font-light text-white/90 max-w-3xl leading-relaxed">
                We create cinematic campaigns, commercial films, and distinctive visual experiences that help ambitious brands get noticed and remembered.
              </p>

              {/* Core Capabilities Pills */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {coreCapabilities.map((cap) => {
                  const Icon = cap.icon;
                  return (
                    <span
                      key={cap.name}
                      className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white/[0.04] border border-white/15 hover:border-white/40 text-white/90 text-xs font-mono uppercase tracking-wider transition-colors"
                    >
                      <Icon className="w-3.5 h-3.5 text-white/70" />
                      <span>{cap.name}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Creative Philosophy & About Viyana Card */}
            <div className="mt-8 p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/15 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

              {/* Philosophy Header */}
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.25em] text-white/60 mb-6">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>OUR CREATIVE PHILOSOPHY</span>
              </div>

              {/* 3 Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pb-8 mb-8 border-b border-white/10">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-white/40 block">[ 01 ]</span>
                  <h3 className="text-2xl sm:text-3xl font-syne font-bold uppercase tracking-tight text-white">
                    IDEAS FIRST.
                  </h3>
                </div>
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-white/40 block">[ 02 ]</span>
                  <h3 className="text-2xl sm:text-3xl font-syne font-bold uppercase tracking-tight text-white">
                    VISUALS WITH PURPOSE.
                  </h3>
                </div>
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-white/40 block">[ 03 ]</span>
                  <h3 className="text-2xl sm:text-3xl font-syne font-bold uppercase tracking-tight text-white">
                    STORIES THAT STAY.
                  </h3>
                </div>
              </div>

              {/* About Viyana Sub-Block */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
                <div className="lg:col-span-5 space-y-2">
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/50 block">
                    ABOUT VIYANA
                  </span>
                  <h4 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight uppercase leading-tight">
                    We Turn Ideas Into <br />
                    <span className="font-bold text-white">Visual Experiences.</span>
                  </h4>
                </div>

                <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm md:text-base text-brand-grey font-light leading-relaxed">
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

            {/* Archive Filter Stats Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 text-xs uppercase font-mono tracking-widest text-brand-grey">
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-white/30" />
                <span className="text-white font-medium">CURATED ARCHIVE &amp; CASE STUDIES</span>
              </div>
              <div className="flex items-center gap-4 sm:gap-6">
                <span>TOTAL // <strong className="text-white font-normal">0{projects.length} CASE STUDIES</strong></span>
                <span className="text-white/20">•</span>
                <span className="text-white font-semibold">ALL DISCIPLINES</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STICKY FILTER BAR */}
      <section className="sticky top-16 sm:top-20 z-30 py-2.5 sm:py-3 px-3 sm:px-6 lg:px-8 bg-brand-black/95 backdrop-blur-2xl border-y border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.7)] transition-all duration-300">
        <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between gap-3 lg:gap-6">

          {/* Left: Discipline Indicator */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-mono tracking-[0.22em] text-white/40 leading-tight">
                FILTER ARCHIVE
              </span>
              <span className="text-xs font-mono text-white font-medium">
                {activeCategory === "ALL" ? "ALL DISCIPLINES" : activeCategory}
              </span>
            </div>
          </div>

          {/* Center: Sleek Horizontal Segmented Capsule Track with touch momentum and edge indicator */}
          <div className="relative w-full flex-1 overflow-hidden">
            <div className="flex items-center p-1 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-inner overflow-x-auto no-scrollbar touch-scroll-momentum flex-nowrap gap-1 w-full pr-8">
              {filterOptions.map((cat) => {
                const count = getCategoryCount(cat);
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative text-[11px] uppercase tracking-wider px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full transition-all duration-200 font-mono flex items-center gap-1.5 cursor-pointer shrink-0 whitespace-nowrap active:scale-95 group ${isActive
                        ? "text-black font-bold"
                        : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryPill"
                        className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.35)]"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
                    <span
                      className={`relative z-10 text-[9px] px-1.5 py-0.5 rounded-full font-mono transition-colors ${isActive
                          ? "bg-black/15 text-black font-bold"
                          : "bg-white/[0.08] text-white/50 group-hover:bg-white/15 group-hover:text-white border border-white/10"
                        }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
            {/* Subtle Right Fade for mobile scroll discoverability */}
            <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-brand-black/95 via-brand-black/60 to-transparent pointer-events-none sm:hidden" />
          </div>

          {/* Right: Showing Counter Stats */}
          <div className="hidden 2xl:flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-grey shrink-0">
            <span className="text-white/40">SHOWING:</span>
            <span className="text-white font-semibold bg-white/10 px-2.5 py-0.5 rounded-md border border-white/20">
              {activeCategory === "ALL" ? `0${projects.length} CASE STUDIES` : `0${getCategoryCount(activeCategory)} CASE STUDY`}
            </span>
          </div>

        </div>
      </section>

      {/* 3. DISCIPLINE SHOWCASE WITH FAST HIGH-QUALITY IMAGERY */}
      <section className="py-10 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 relative">
        <div className="container mx-auto max-w-7xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-16 sm:space-y-24"
            >
              {displayedGroups.map((group) => {
                const groupProjects = projects.filter(p => p.category === group.name);

                if (groupProjects.length === 0) return null;

                return (
                  <div key={group.id} id={group.id} className="scroll-mt-28">

                    {/* DISCIPLINE SECTION HEADING */}
                    <div className="border-b border-white/15 pb-5 mb-8 sm:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[11px] font-mono tracking-widest text-white px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20">
                            DISCIPLINE {group.number}
                          </span>
                          <span className="text-[11px] uppercase tracking-[0.25em] text-white/60 font-mono">
                            {groupProjects.length} {groupProjects.length === 1 ? "PROJECT ARCHIVED" : "PROJECTS ARCHIVED"}
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-syne font-bold uppercase tracking-tight text-white">
                          {group.heading}
                        </h2>
                        <p className="text-xs sm:text-sm font-mono text-brand-grey mt-1">
                          {group.subtitle}
                        </p>
                      </div>

                      <Link
                        to="/contact"
                        className="text-xs font-mono uppercase tracking-widest text-brand-light hover:text-white flex items-center gap-2 group/link px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 hover:border-white transition-colors shrink-0"
                      >
                        <span>COMMISSION {group.name} →</span>
                      </Link>
                    </div>

                    {/* PROJECTS IN THIS DISCIPLINE */}
                    <div className="flex flex-col gap-10 sm:gap-14 md:gap-16">
                      {groupProjects.map((project, idx) => {
                        const isEven = idx % 2 === 0;

                        return (
                          <ProjectCard
                            key={project.slug}
                            project={project}
                            idx={idx}
                            group={group}
                            isEven={isEven}
                          />
                        );
                      })}
                    </div>

                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 4. STUDIO RENTAL SECTION */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-12 border-t border-white/10 relative overflow-hidden bg-brand-black">
        {/* Ambient glow */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[80px] pointer-events-none translate-x-1/3 translate-y-1/3" />

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8 sm:mb-12"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/50">SERVICES / 01</span>
          </motion.div>

          {/* Two-column hero layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 lg:gap-20 items-start mb-14 sm:mb-20">
            {/* Left: headline + description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex flex-col justify-between gap-8"
            >
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/40 block mb-4">STUDIO RENTAL</span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight leading-[0.88] text-white mb-6">
                  PROFESSIONAL<br />
                  <span className="text-white/40">STUDIO SPACES</span><br />
                  FOR EVERY<br />
                  CREATIVE.
                </h2>
                <p className="text-sm sm:text-base text-brand-grey leading-relaxed font-light max-w-sm">
                  A versatile production studio designed for photography, video production, brand shoots, interviews, and creative projects. From controlled lighting to flexible setups, our studio gives you the space and production environment to bring your ideas to life.
                </p>
              </div>
              <Link
                to="/studio"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-brand-light hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] w-full sm:w-auto"
                id="explore-studio-btn"
              >
                <span>EXPLORE STUDIO</span>
                <span className="group-hover:translate-x-1 transition-transform font-bold">→</span>
              </Link>
            </motion.div>

            {/* Right: feature grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="lg:col-span-7"
            >
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  { num: "01", title: "Photography & Video Studio", desc: "Full-spec controlled environment" },
                  { num: "02", title: "Professional Lighting Setup", desc: "Strobes, softboxes & LED arrays" },
                  { num: "03", title: "Product & Brand Shoots", desc: "Tabletop to full-scale product" },
                  { num: "04", title: "Interview Setup", desc: "Multi-cam dialogue ready" },
                  { num: "05", title: "Green Screen Setup", desc: "Chroma key & VFX composite" },
                  { num: "06", title: "Creative & Editorial", desc: "Fashion, editorial & conceptual" },
                  { num: "07", title: "Flexible Configurations", desc: "Modular layout for any brief" },
                  { num: "08", title: "Production Support", desc: "On-site crew & equipment" },
                ].map((feature, i) => (
                  <motion.div
                    key={feature.num}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="group p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/25 transition-all duration-300 cursor-default"
                  >
                    <span className="text-[10px] font-mono text-white/30 block mb-2 tracking-widest">[{feature.num}]</span>
                    <h4 className="text-sm sm:text-base font-display font-bold text-white uppercase tracking-tight leading-tight mb-1 group-hover:text-brand-light transition-colors">{feature.title}</h4>
                    <p className="text-[11px] sm:text-xs text-brand-grey font-light leading-snug">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom divider line */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </section>

      {/* 5. PODCAST PRODUCTION SECTION */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-12 border-t border-white/10 relative overflow-hidden bg-brand-dark/30">
        {/* Ambient glow */}
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-white/[0.015] rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/2" />
        <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] bg-white/[0.018] rounded-full blur-[80px] pointer-events-none" />

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8 sm:mb-12"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/50">SERVICES / 02</span>
          </motion.div>

          {/* Two-column hero layout   reversed */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 lg:gap-20 items-start mb-14 sm:mb-20">
            {/* Left: feature grid */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="lg:col-span-7 order-2 lg:order-1"
            >
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  { num: "01", title: "Podcast Studio Rental", desc: "Acoustically treated pro space" },
                  { num: "02", title: "Multi-Camera Recording", desc: "Cinematic multi-angle capture" },
                  { num: "03", title: "Professional Audio", desc: "Studio-grade mics & mixing" },
                  { num: "04", title: "Video Podcast Production", desc: "Full-production video podcasts" },
                  { num: "05", title: "Interview & Talk Shows", desc: "Guest & panel formats" },
                  { num: "06", title: "Podcast Editing", desc: "Post-production & mastering" },
                  { num: "07", title: "Reels & Short-Form Clips", desc: "Social-ready clip delivery" },
                  { num: "08", title: "YouTube Podcast Production", desc: "Long-form YouTube ready" },
                ].map((feature, i) => (
                  <motion.div
                    key={feature.num}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="group p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/25 transition-all duration-300 cursor-default"
                  >
                    <span className="text-[10px] font-mono text-white/30 block mb-2 tracking-widest">[{feature.num}]</span>
                    <h4 className="text-sm sm:text-base font-display font-bold text-white uppercase tracking-tight leading-tight mb-1 group-hover:text-brand-light transition-colors">{feature.title}</h4>
                    <p className="text-[11px] sm:text-xs text-brand-grey font-light leading-snug">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: headline + description */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex flex-col justify-between gap-8 order-1 lg:order-2"
            >
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/40 block mb-4">PODCAST PRODUCTION</span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight leading-[0.88] text-white mb-6">
                  YOUR VOICE.<br />
                  <span className="text-white/40">YOUR STORY.</span><br />
                  YOUR<br />
                  PLATFORM.
                </h2>
                <p className="text-sm sm:text-base text-brand-grey leading-relaxed font-light max-w-sm">
                  A complete podcast production setup built for creators, brands, entrepreneurs, and businesses. From studio recording and multi-camera production to professional audio, editing, and final delivery   we help turn conversations into engaging content.
                </p>
              </div>
              <Link
                to="/podcast"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-brand-light hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] w-full sm:w-auto"
                id="explore-podcasts-btn"
              >
                <span>EXPLORE PODCASTS</span>
                <span className="group-hover:translate-x-1 transition-transform font-bold">→</span>
              </Link>
            </motion.div>
          </div>

          {/* Bottom divider line */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </section>

      {/* 6. ABOUT VIYANA - IDEAS INTO VISUAL STORIES */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 border-t border-white/10 bg-brand-dark/40 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none rounded-full" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/50 block">
                ABOUT VIYANA
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-bold uppercase tracking-tight text-white leading-tight">
                IDEAS INTO <br />
                <span className="font-bold text-white">VISUAL STORIES.</span>
              </h2>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-brand-light active:scale-95 transition-all shadow-lg"
                >
                  <span>MORE ABOUT VIYANA →</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <p className="text-base sm:text-lg text-white/95 font-light leading-relaxed">
                Viyana Productions creates advertising, films, and visual experiences for brands that want to stand out.
              </p>
              <p className="text-sm sm:text-base text-brand-grey font-light leading-relaxed">
                From the first concept to the final frame, we combine creative thinking with cinematic production and purposeful design to create work that people notice and remember.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CTA: HAVE A STORY TO TELL? */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-brand-dark text-center border-t border-white/10 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)] pointer-events-none rounded-full" />
        <div className="container mx-auto max-w-4xl relative z-10 space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/60 block">
            HAVE A STORY TO TELL?
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-syne font-bold uppercase tracking-tight text-white">
            Let&apos;s give it the frame it deserves.
          </h2>
          <p className="text-sm sm:text-base text-brand-grey max-w-xl mx-auto font-light leading-relaxed">
            We create cinematic campaigns, commercial films, and distinctive visual experiences that help ambitious brands get noticed and remembered.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-brand-light hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl"
            >
              <span>START A PROJECT →</span>
            </Link>
          </div>

          <div className="pt-10 mt-8 border-t border-white/10 flex flex-col items-center gap-2 text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40 font-semibold">
              VIYANA PRODUCTIONS
            </span>
            <p className="text-[11px] sm:text-xs font-mono text-white/60 uppercase tracking-wider max-w-2xl leading-relaxed">
              CREATIVE ADVERTISING × VIDEO PRODUCTION × GRAPHIC DESIGN × BRANDING × PHOTO &amp; VIDEO SHOOT
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
