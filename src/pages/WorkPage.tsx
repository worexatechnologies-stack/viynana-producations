"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { projects, Project } from "@/data/projects";

import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <div className="absolute -top-8 sm:-top-12 left-0 right-0 pointer-events-none select-none text-[10vw] font-serif font-bold uppercase tracking-tighter text-white/[0.018] whitespace-nowrap overflow-hidden z-0">
        {project.title} • {group.name}
      </div>

      {/* 1. Curated Visual Image Column (Zero Video Overhead, Ultra Fast) */}
      <div
        className={`lg:col-span-7 flex flex-col relative z-10 ${
          isEven ? "lg:order-1" : "lg:order-2"
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
        className={`lg:col-span-5 flex flex-col justify-between space-y-6 relative z-10 ${
          isEven ? "lg:order-2" : "lg:order-1"
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
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight uppercase text-white group-hover:text-brand-light transition-colors mb-2 leading-none">
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
            {/* Top Tagline & Index */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-px bg-white/40" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-brand-grey font-mono font-medium">
                PORTFOLIO &amp; ARCHIVE
              </span>
            </div>

            {/* Stepped Title: 'WORK' starts precisely under the letter 'T' in 'SELECTED' */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[8vw] font-serif tracking-tighter uppercase leading-[0.88] text-white select-none mb-6">
              <span className="block hover:text-brand-light transition-colors">SELECTED</span>
              <span className="flex items-baseline text-brand-light/90 italic font-serif">
                <span className="invisible select-none opacity-0 pointer-events-none" aria-hidden="true">SELEC</span>
                <span>WORK</span>
              </span>
            </h1>

            {/* Editorial Overview & Stats */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 border-t border-white/10 items-end">
              <div className="md:col-span-8">
                <p className="text-sm sm:text-base md:text-lg font-light text-brand-grey max-w-2xl leading-relaxed">
                  A curated archive of commercial campaigns, luxury brand films, and visual identity systems crafted with cinematic fidelity.
                </p>
              </div>

              <div className="md:col-span-4 flex md:justify-end items-center gap-4 sm:gap-6 text-xs uppercase font-mono tracking-widest text-brand-grey">
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
                    className={`relative text-[11px] uppercase tracking-wider px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full transition-all duration-200 font-mono flex items-center gap-1.5 cursor-pointer shrink-0 whitespace-nowrap active:scale-95 group ${
                      isActive
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
                      className={`relative z-10 text-[9px] px-1.5 py-0.5 rounded-full font-mono transition-colors ${
                        isActive
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

      {/* 4. BOTTOM STUDIO CTA */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-12 bg-brand-dark text-center border-t border-white/10 mt-10 sm:mt-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-syne font-bold uppercase tracking-tight mb-4 text-white">
            HAVE A PROJECT IN MIND?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-brand-grey max-w-lg mx-auto mb-6 font-light">
            We partner with ambitious brands across advertising campaigns, commercial films, and visual design.
          </p>
          <Link
            to="/contact"
            className="w-full sm:w-auto max-w-xs sm:max-w-none inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-brand-light text-brand-black text-xs uppercase tracking-widest font-semibold hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl"
          >
            <span>START THE CONVERSATION →</span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
