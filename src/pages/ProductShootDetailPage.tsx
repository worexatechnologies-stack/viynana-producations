import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  ArrowUpRight,
  Sparkles,
  Camera,
  Film,
  CheckCircle2,
  Layers,
  ArrowRight,
} from "lucide-react";

function InstagramIcon({ className = "w-4 h-4", size = 16 }: { className?: string; size?: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Project, projects } from "@/data/projects";

export interface ProductShootDetailPageProps {
  project: Project;
  nextProject: Project;
  onInquirySubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  inquiry: { name: string; email: string; phone: string; message: string };
  setInquiry: React.Dispatch<
    React.SetStateAction<{ name: string; email: string; phone: string; message: string }>
  >;
  isSubmittingInquiry: boolean;
  inquirySubmitted: boolean;
  inquiryError: string | null;
  setInquirySubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ProductFilmItem {
  id: string;
  title: string;
  tag: string;
  category: string;
  src: string;
  poster: string;
  badge: string;
  description: string;
}

const productVideos: ProductFilmItem[] = [
  {
    id: "jewellery-bts",
    title: "Behind The Scenes — Luxury Jewellery Production Breakdown",
    tag: "BTS Studio Breakdown",
    category: "Fine Jewellery",
    src: "/videos/product-jewellery-behind-the-scenes.mp4",
    poster: "/images/product-shoot/10-antique-gold-bangles-sculptural.jpg",
    badge: "01 / BTS Reel",
    description:
      "Exclusive BTS breakdown showing paper-tear styling, precision directional lighting, and mannequin hand composition in Bangalore.",
  },
  {
    id: "jewellery-oole",
    title: "Oole Style Everyday — Fine Jewellery Commercial Reel",
    tag: "Commercial Film",
    category: "Fine Jewellery",
    src: "/videos/product-jewellery-oole-commercial.mp4",
    poster: "/images/product-shoot/11-pearl-butterfly-gold-chain-nest.jpg",
    badge: "02 / Fine Jewellery",
    description:
      "Artisanal gold metallurgy, egg nest conceptual still life, and luxury ring details engineered for social conversion.",
  },
  {
    id: "chopping-board",
    title: "Precision Craft & Kitchenware — Chopping Board Commercial",
    tag: "Kitchenware Film",
    category: "Commercial Ads",
    src: "/videos/product-chopping-board.mp4",
    poster: "/images/product-shoot/01-melanex-serum.jpg",
    badge: "03 / Tactile Kitchenware",
    description:
      "Dynamic studio lighting, organic wood grain textures, and tactile commercial pacing for premium cookware.",
  },
  {
    id: "commercial-render",
    title: "Product Motion & Macro Studio Render",
    tag: "Motion & CGI",
    category: "3D Motion",
    src: "/videos/product-commercial-render.mp4",
    poster: "/images/product-shoot/03-dewexa-cloud-cream.jpg",
    badge: "04 / 3D Macro Motion",
    description:
      "High-contrast studio lighting highlighting product silhouettes, glass reflections, and cinematic brand pacing.",
  },
  {
    id: "final-output",
    title: "Luxury Product Commercial & Visual Motion Master",
    tag: "Commercial Master",
    category: "Product Cinema",
    src: "/videos/product-final-output.mp4",
    poster: "/images/product-shoot/06-genex-serum.jpg",
    badge: "05 / Commercial Master",
    description:
      "High-fidelity cinema lighting, crisp packaging reflections, and rhythmic commercial pacing engineered for luxury conversion.",
  },
];

interface ProductStillItem {
  id: string;
  title: string;
  category: "Jewellery" | "Skincare" | "Commercial";
  tag: string;
  image: string;
  alt: string;
  description: string;
}

const productStills: ProductStillItem[] = [
  {
    id: "01",
    title: "Antique Temple Gold Necklace — Chessboard Study",
    category: "Jewellery",
    tag: "Fine Jewellery · Antique Gold",
    image: "/images/product-shoot/07-antique-gold-necklace-chess.jpg",
    alt: "Handcrafted antique gold necklace and jhumkas on wooden chessboard",
    description:
      "Rich warm temple gold with handcrafted filigree and ruby bead accents, staged across a rustic chessboard with royal chess pieces.",
  },
  {
    id: "02",
    title: "Artisanal Gold Filigree Jhumkas with Sapphire Beads",
    category: "Jewellery",
    tag: "Earrings · Bridal & Festive",
    image: "/images/product-shoot/08-filigree-jhumkas-blue-beads.jpg",
    alt: "Gold filigree jhumka earrings with deep blue droplet beads suspended against architectural lattice",
    description:
      "Intricate jaali dome work adorned with royal blue droplet beads, highlighting delicate gold metallurgy against clean architectural contrast.",
  },
  {
    id: "03",
    title: "Peacock Motif Antique Gold Studs — Parisian Accent",
    category: "Jewellery",
    tag: "Earrings · Heritage Craft",
    image: "/images/product-shoot/09-peacock-gold-earrings-eiffel.jpg",
    alt: "Peacock motif antique gold stud earrings with ruby stones mounted on bronze Eiffel tower",
    description:
      "Traditional Mayura peacock carvings with ruby eyes mounted on a Parisian bronze spire, blending heritage craftsmanship with contemporary concept.",
  },
  {
    id: "04",
    title: "Sculptural Antique Gold Bangles — Contrast Composition",
    category: "Jewellery",
    tag: "Bangles · Luxury Editorial",
    image: "/images/product-shoot/10-antique-gold-bangles-sculptural.jpg",
    alt: "Antique gold bangles displayed on matte black mannequin hands breaking through white paper",
    description:
      "High-contrast studio editorial featuring antique gold floral kadas held by matte black sculptural hands emerging from torn white paper.",
  },
  {
    id: "05",
    title: "Pearl Butterfly Fine Gold Chain — Nest Installation",
    category: "Jewellery",
    tag: "Neckwear · Minimalist Luxury",
    image: "/images/product-shoot/11-pearl-butterfly-gold-chain-nest.jpg",
    alt: "Delicate gold link chain with sculpted pearl butterflies draped over porcelain egg in straw nest",
    description:
      "Organic conceptual still life featuring iridescent mother-of-pearl butterflies on a fine gold chain, delicately draped over an egg in a natural twig nest.",
  },
  {
    id: "06",
    title: "Dermera Melanex Face & Body Serum",
    category: "Skincare",
    tag: "Serum · 100 ml",
    image: "/images/product-shoot/01-melanex-serum.jpg",
    alt: "Dermera Melanex face and body serum bottle",
    description:
      "Clean studio strobe highlighting pure white glass bottle, precision pump, and minimalist luxury typography.",
  },
  {
    id: "07",
    title: "Genex Advanced PDRN+ Revitalizing Serum",
    category: "Skincare",
    tag: "Serum · 30 ml",
    image: "/images/product-shoot/06-genex-serum.jpg",
    alt: "Dermera Genex Advanced PDRN+ Revitalizing face serum bottle",
    description:
      "Frosted matte finish with delicate pastel amber gradient, showcasing precision dispenser typography.",
  },
  {
    id: "08",
    title: "Luminex Luminous Face Wash & Packaging",
    category: "Skincare",
    tag: "Cleanser · 100 ml",
    image: "/images/product-shoot/02-luminex-face-wash.jpg",
    alt: "Dermera Luminex luminous face wash tube and packaging box",
    description:
      "High-contrast studio lighting capturing the rich metallic gold foil and deep charcoal black luxury carton.",
  },
  {
    id: "09",
    title: "Dewexa Dermal Bio Cloud Cream",
    category: "Skincare",
    tag: "Moisturizer · 50 g",
    image: "/images/product-shoot/03-dewexa-cloud-cream.jpg",
    alt: "Dermera Dewexa Dermal Bio Cloud Cream jar and crimson box",
    description:
      "Polished gold metallic lid paired with crimson red textured box, angled with razor-sharp reflection.",
  },
  {
    id: "10",
    title: "Spiculex Advanced Bio Micro Needle Serum",
    category: "Skincare",
    tag: "Micro Needle Serum · 30 ml",
    image: "/images/product-shoot/04-spiculex-serum.jpg",
    alt: "Dermera Spiculex Advanced Bio micro needle serum bottle and box",
    description:
      "Amber glass bottle paired with artisanal textured box, highlighting micro-needle bio formulation details.",
  },
  {
    id: "11",
    title: "Dewexa Bio Cloud Cream — Angle View",
    category: "Skincare",
    tag: "Packaging & Perspective Study · 50 g",
    image: "/images/product-shoot/05-dewexa-detail.jpg",
    alt: "Dermera Dewexa Bio Cloud Cream studio perspective view",
    description:
      "Perspective 3D angle composition showcasing gold metallic reflection, box typography, and glass jar depth.",
  },
  {
    id: "12",
    title: "Studio Product Editorial — E-Commerce Packshot 01",
    category: "Commercial",
    tag: "E-Commerce · Studio Lighting",
    image: "/images/product-shoot-1.jpg",
    alt: "Commercial product studio still 1",
    description: "Pristine white background studio packshot for luxury retail listing.",
  },
  {
    id: "13",
    title: "Studio Product Editorial — Macro Texture 02",
    category: "Commercial",
    tag: "Macro · Commercial",
    image: "/images/product-shoot-2.jpg",
    alt: "Commercial product studio still 2",
    description: "Pin-sharp macro detail capturing formulation density and packaging reflection.",
  },
  {
    id: "14",
    title: "Studio Product Editorial — Staged Composition 03",
    category: "Commercial",
    tag: "Editorial Staging",
    image: "/images/product-shoot-3.jpg",
    alt: "Commercial product studio still 3",
    description: "Artful shadow play and directional key light for premium campaign branding.",
  },
];

const instagramReels = [
  {
    id: "reel-01",
    title: "Behind The Scenes — Jewellery Production Breakdown",
    url: "https://www.instagram.com/reel/DdlycB7Dn08/",
    tag: "BTS Breakdown",
  },
  {
    id: "reel-02",
    title: "Oole Fine Jewellery Commercial Reel",
    url: "https://www.instagram.com/reel/DdZHtpjB3kZ/",
    tag: "Jewellery Reel",
  },
  {
    id: "reel-03",
    title: "Dermera Luxury Skincare Product Reel",
    url: "https://www.instagram.com/reel/DfFIBz-ESJx/?exln=OGJ1bGl6bGhxeWxl",
    tag: "Skincare Reel",
  },
];

export default function ProductShootDetailPage({
  project,
  nextProject,
  onInquirySubmit,
  inquiry,
  setInquiry,
  isSubmittingInquiry,
  inquirySubmitted,
  inquiryError,
  setInquirySubmitted,
}: ProductShootDetailPageProps) {
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeReelIdx, setActiveReelIdx] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const activeVideo = productVideos[activeVideoIdx];

  const filteredStills =
    activeFilter === "All"
      ? productStills
      : productStills.filter((still) => still.category === activeFilter);

  // Auto-play when activeVideo changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [activeVideoIdx]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handlePrevVideo = () => {
    setActiveVideoIdx((prev) => (prev === 0 ? productVideos.length - 1 : prev - 1));
  };

  const handleNextVideo = () => {
    setActiveVideoIdx((prev) => (prev === productVideos.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev === 0 ? filteredStills.length - 1 : (prev ?? 1) - 1));
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev === filteredStills.length - 1 ? 0 : (prev ?? 0) + 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredStills.length]);

  return (
    <main className="bg-[#070709] text-white min-h-screen selection:bg-amber-400 selection:text-black overflow-x-hidden font-sans">
      <SEO
        title={project.seo?.metaTitle || "Product Photo Shoot in Bangalore | Viyana Productions"}
        description={
          project.seo?.metaDescription ||
          "Professional product photography and commercial films in Bangalore by Viyana Productions."
        }
        keywords={
          project.seo?.metaKeywords ||
          "product photo shoot, jewellery photoshoot, commercial product films, Bangalore product photographer"
        }
        ogTitle={project.seo?.ogTitle || "Product Photo Shoot in Bangalore | Viyana Productions"}
        ogType={project.seo?.ogType || "website"}
        ogDescription={
          project.seo?.ogDescription ||
          "Elevate your brand with Viyana Productions. High-end product photography, fine jewellery films, and macro commercials."
        }
        ogUrl={project.seo?.ogUrl || "https://viyana.productions/work/product-shoot"}
        ogSiteName="Viyana Productions"
        ogImage={project.seo?.ogImage || "https://viyana.productions/logo-black.png"}
        canonical={project.seo?.canonical || "https://viyana.productions/work/product-shoot"}
      />

      <Navbar />

      {/* 1. BESPOKE EDITORIAL HERO SECTION */}
      <section className="relative pt-32 sm:pt-40 md:pt-44 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-12 border-b border-white/[0.08] overflow-hidden">
        {/* Ambient Golden / Violet Atmospheric Glow */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/10 via-amber-700/5 to-transparent blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-gradient-to-tr from-purple-500/8 via-transparent to-transparent blur-[120px] pointer-events-none rounded-full" />

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Eyebrow Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6 text-xs font-mono uppercase tracking-[0.25em] text-white/50">
            <Link to="/work" className="hover:text-white transition-colors">
              WORK ARCHIVE
            </Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold">CATEGORY 10</span>
            <span>/</span>
            <span className="text-white/80">PRODUCT CINEMA &amp; MACRO STILLS</span>
          </div>

          {/* Hero Monumental Title with Serif Contrast */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end mb-10">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6.5vw] font-display font-extrabold uppercase tracking-tight text-white leading-[0.92]">
                Product Shoot<span className="text-amber-400">.</span>
              </h1>
              <p className="text-base sm:text-xl md:text-2xl font-serif font-light text-white/80 leading-relaxed max-w-3xl">
                Tactile macro lighting, fine jewellery metallurgy, and commercial motion engineered to make customers fall in love with your brand.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-1">
                  <span>PRODUCTION CATALOG</span>
                  <span className="text-amber-400 font-bold">5 FILMS · 14+ STILLS</span>
                </div>
                <span className="text-sm font-semibold text-white">Fine Jewellery, Skincare &amp; E-Commerce</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-1">
                  <span>STUDIO BASE</span>
                  <span className="text-emerald-400 font-bold">BANGALORE HQ</span>
                </div>
                <span className="text-sm font-semibold text-white">Macro Precision Stages &amp; Set Builds</span>
              </div>
            </div>
          </div>

          {/* Navigation Quick Anchors */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.08]">
            <a
              href="#cinema-films"
              className="px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-amber-300 transition-all shadow-lg flex items-center gap-2"
            >
              <Film size={14} />
              <span>Watch Commercial Films ({productVideos.length})</span>
            </a>
            <a
              href="#stills-catalog"
              className="px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <Camera size={14} />
              <span>Stills &amp; Jewellery Catalog ({productStills.length})</span>
            </a>
            <a
              href="#instagram-reels"
              className="px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <InstagramIcon size={14} />
              <span>Instagram Reels</span>
            </a>
            <a
              href="#book-shoot"
              className="px-5 py-2.5 rounded-full bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/40 text-amber-300 font-mono text-xs uppercase tracking-wider transition-all ml-auto flex items-center gap-1.5"
            >
              <span>Book a Product Shoot</span>
              <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </section>

      {/* 2. THEATER CINEMA PLAYER (FEATURED VIDEOS 01 TO 05) */}
      <section id="cinema-films" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-12 bg-black relative">
        <div className="container mx-auto max-w-7xl space-y-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-amber-400 mb-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>COMMERCIAL MOTION &amp; REELS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-white">
                Commercial Product Cinema<span className="text-amber-400">.</span>
              </h2>
            </div>
            <p className="text-sm font-mono text-white/60 max-w-md">
              From behind-the-scenes breakdown to 4K commercial broadcast masters, each film is shot with razor-sharp macro glass and cinematic lighting.
            </p>
          </div>

          {/* Main Cinema Screen Container */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-[#0a0a0c] shadow-[0_30px_90px_rgba(0,0,0,0.95)]">
            {/* Viewport Box */}
            <div
              onClick={togglePlay}
              className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[640px] bg-black flex items-center justify-center cursor-pointer group"
            >
              <video
                ref={videoRef}
                key={activeVideo.src}
                src={activeVideo.src}
                poster={activeVideo.poster}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="metadata"
                className="w-full h-full object-contain bg-black"
              />

              {/* Top Film Badge */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{activeVideo.badge} · {activeVideo.category}</span>
              </div>

              {/* Prev / Next Floating Navigation Buttons */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevVideo();
                }}
                aria-label="Previous film"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/70 hover:bg-white hover:text-black text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all active:scale-90 shadow-2xl cursor-pointer"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextVideo();
                }}
                aria-label="Next film"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/70 hover:bg-white hover:text-black text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all active:scale-90 shadow-2xl cursor-pointer"
              >
                <ChevronRight size={24} />
              </button>

              {/* Center Play / Pause Indicator */}
              <div
                className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200 ${
                  !isPlaying ? "opacity-100 bg-black/40" : "opacity-0 group-hover:opacity-100"
                }`}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xl">
                  {!isPlaying ? (
                    <Play className="w-8 h-8 fill-current ml-1 text-white" />
                  ) : (
                    <Pause className="w-8 h-8 fill-current text-white" />
                  )}
                </div>
              </div>

              {/* Bottom In-Video Action Pills */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-black/80 hover:bg-black text-white border border-white/20 backdrop-blur-md text-xs font-mono flex items-center gap-2 transition-all cursor-pointer shadow-lg"
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  <span>{isMuted ? "UNMUTE" : "MUTED"}</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (videoRef.current) {
                      if (document.fullscreenElement) {
                        document.exitFullscreen().catch(() => {});
                      } else {
                        videoRef.current.requestFullscreen().catch(() => {});
                      }
                    }
                  }}
                  className="w-8 h-8 rounded-full bg-black/80 hover:bg-black text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-lg"
                  title="Fullscreen"
                >
                  <Maximize2 size={14} />
                </button>
              </div>
            </div>

            {/* Bottom Meta Bar */}
            <div className="p-5 sm:p-7 bg-[#0d0d11] border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                  <span className="font-bold">FILM 0{activeVideoIdx + 1} OF 0{productVideos.length}</span>
                  <span>•</span>
                  <span>{activeVideo.tag}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-white font-medium">
                  {activeVideo.title}
                </h3>
                <p className="text-sm text-white/70 font-light max-w-3xl">
                  {activeVideo.description}
                </p>
              </div>

              {/* Film Switcher Pills */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-mono text-white/50 uppercase tracking-wider mr-1">Switch:</span>
                {productVideos.map((video, idx) => (
                  <button
                    key={video.id}
                    type="button"
                    onClick={() => setActiveVideoIdx(idx)}
                    className={`w-9 h-9 rounded-full text-xs font-mono font-bold transition-all flex items-center justify-center cursor-pointer ${
                      activeVideoIdx === idx
                        ? "bg-amber-400 text-black shadow-[0_0_15px_rgba(251,191,36,0.5)] scale-105"
                        : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Video Catalog Playlist Cards (5 Films) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
            {productVideos.map((film, fIdx) => {
              const isSelected = activeVideoIdx === fIdx;
              return (
                <button
                  key={film.id}
                  type="button"
                  onClick={() => setActiveVideoIdx(fIdx)}
                  className={`p-3.5 rounded-2xl text-left transition-all border cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? "bg-white/[0.08] border-amber-400/80 shadow-[0_0_20px_rgba(251,191,36,0.2)] ring-1 ring-amber-400/40"
                      : "bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/20"
                  }`}
                >
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-black mb-3 relative">
                    <img
                      src={film.poster}
                      alt={film.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
                          isSelected
                            ? "bg-amber-400 text-black scale-110 shadow-lg"
                            : "bg-white/30 text-white group-hover:scale-110"
                        }`}
                      >
                        <Play size={13} className="fill-current ml-0.5" />
                      </span>
                    </div>
                    <span className="absolute bottom-1.5 right-1.5 text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/80 text-white">
                      0{fIdx + 1}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block mb-1">
                    {film.tag}
                  </span>
                  <h4 className="text-xs font-semibold text-white line-clamp-2 leading-snug">
                    {film.title}
                  </h4>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CURATED FINE JEWELLERY & SKINCARE STILLS CATALOG */}
      <section id="stills-catalog" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 border-t border-white/10 bg-[#070709] relative">
        <div className="container mx-auto max-w-7xl space-y-10">
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-amber-400 mb-2">
                <Sparkles size={14} />
                <span>HIGH-RESOLUTION CATALOG</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-white">
                Editorial Stills &amp; Jewellery Master<span className="text-amber-400">.</span>
              </h2>
              <p className="text-sm font-mono text-white/60 mt-1 max-w-xl">
                Pin-sharp macro glass, organic props, and color-accurate ACEScc workflow. Tap any photo to expand into the fullscreen craft viewer.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              {["All", "Jewellery", "Skincare", "Commercial"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    activeFilter === cat
                      ? "bg-white text-black font-bold shadow-lg scale-105"
                      : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {cat === "All" ? `All Works (${productStills.length})` : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Stills Gallery Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
          >
            <AnimatePresence>
              {filteredStills.map((still, idx) => (
                <motion.div
                  layout
                  key={still.image}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.03 }}
                  onClick={() => setLightboxIndex(idx)}
                  className="group rounded-2xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-amber-400/60 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(251,191,36,0.15)] flex flex-col cursor-pointer"
                >
                  {/* Image Card Container */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/60 flex items-center justify-center p-3">
                    <img
                      src={still.image}
                      alt={still.alt}
                      loading="lazy"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Category Pill Tag */}
                    <span className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white/90">
                      {still.category}
                    </span>

                    {/* Zoom Icon Hover Overlay */}
                    <span className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/80 group-hover:bg-amber-400 group-hover:text-black text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-lg">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>

                  {/* Caption Meta */}
                  <div className="p-4 space-y-1 bg-[#0c0c10] border-t border-white/10 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-amber-400/90 uppercase tracking-wider block">
                        {still.tag}
                      </span>
                      <h3 className="text-sm font-semibold text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                        {still.title}
                      </h3>
                    </div>
                    <p className="text-[11px] text-white/50 line-clamp-2 font-light pt-1">
                      {still.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 4. LIGHTBOX HIGH-RESOLUTION MODAL */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredStills[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Bar */}
            <div
              className="flex items-center justify-between z-10 max-w-7xl mx-auto w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-0.5">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                  FRAME 0{lightboxIndex + 1} OF 0{filteredStills.length} · {filteredStills[lightboxIndex].category}
                </span>
                <h3 className="text-base sm:text-lg font-serif text-white font-medium line-clamp-1">
                  {filteredStills[lightboxIndex].title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close modal"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all cursor-pointer border border-white/20"
              >
                <X size={20} />
              </button>
            </div>

            {/* Central Media Container with Prev/Next */}
            <div
              className="relative flex-1 flex items-center justify-center my-4 max-w-7xl mx-auto w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((prev) => (prev === 0 ? filteredStills.length - 1 : (prev ?? 1) - 1))
                }
                aria-label="Previous image"
                className="absolute left-2 sm:left-4 z-20 w-12 h-12 rounded-full bg-black/80 hover:bg-white hover:text-black text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-2xl"
              >
                <ChevronLeft size={24} />
              </button>

              <img
                src={filteredStills[lightboxIndex].image}
                alt={filteredStills[lightboxIndex].alt}
                className="max-h-[70vh] sm:max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl select-none"
              />

              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((prev) => (prev === filteredStills.length - 1 ? 0 : (prev ?? 0) + 1))
                }
                aria-label="Next image"
                className="absolute right-2 sm:right-4 z-20 w-12 h-12 rounded-full bg-black/80 hover:bg-white hover:text-black text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-2xl"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom Caption & Thumbnails */}
            <div
              className="max-w-4xl mx-auto w-full text-center space-y-2 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-xs sm:text-sm text-white/70 font-light">
                {filteredStills[lightboxIndex].description}
              </p>
              <span className="text-[10px] font-mono text-white/40 block">
                Use Left &amp; Right arrows to navigate • Press Esc to close
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. OFFICIAL INSTAGRAM VERTICAL REELS SHOWCASE */}
      <section id="instagram-reels" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-t border-white/10 bg-gradient-to-b from-[#070709] via-[#0d0910] to-[#070709] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gradient-to-br from-[#833ab4]/15 via-[#fd1d1d]/10 to-transparent blur-3xl pointer-events-none rounded-full" />
        
        <div className="container mx-auto max-w-6xl relative z-10 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#833ab4]/20 via-[#fd1d1d]/20 to-[#fcb045]/20 border border-pink-500/30 text-xs font-mono text-pink-300 mb-2">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                <span>OFFICIAL INSTAGRAM REELS // @VIYANA.PRODUCTIONS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-white">
                Vertical Motion Stories<span className="text-pink-500">.</span>
              </h2>
            </div>
            <p className="text-sm font-mono text-white/60 max-w-md">
              High-retention 9:16 vertical cuts engineered specifically to stop thumbs on Instagram feeds and convert followers into buyers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Reel Details & Selectors */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block">
                  SELECTED VERTICAL CAMPAIGN
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white font-medium leading-snug">
                  {instagramReels[activeReelIdx].title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed font-light">
                  Tailored specifically for social algorithms with crisp keyframe animation, tactile audio design, and cinematic grade that pops on OLED smartphone screens.
                </p>
              </div>

              {/* Selector Tabs for the 3 Reels */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-white/50 uppercase tracking-wider block">
                  Available Reels:
                </span>
                <div className="flex flex-col gap-2">
                  {instagramReels.map((reel, rIdx) => (
                    <button
                      key={reel.id}
                      type="button"
                      onClick={() => setActiveReelIdx(rIdx)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        activeReelIdx === rIdx
                          ? "bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-transparent border-pink-500/60 text-white shadow-lg"
                          : "bg-white/[0.02] border-white/10 text-white/70 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-black/60 text-pink-300 font-bold">
                          0{rIdx + 1}
                        </span>
                        <span className="text-xs font-semibold">{reel.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">
                        {reel.tag}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={instagramReels[activeReelIdx].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white font-mono text-xs uppercase tracking-wider font-semibold transition-transform active:scale-95 shadow-[0_10px_25px_rgba(253,29,29,0.3)]"
                >
                  <InstagramIcon size={16} />
                  <span>Open Directly on Instagram</span>
                  <span className="text-sm">↗</span>
                </a>
              </div>
            </div>

            {/* Right: Embedded Instagram Player */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-[360px] sm:max-w-[400px] rounded-3xl overflow-hidden border border-white/20 bg-black shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(253,29,29,0.15)] p-2.5 relative group">
                <div className="w-full h-[560px] sm:h-[600px] rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                  <iframe
                    key={activeReelIdx}
                    src={`https://www.instagram.com/reel/${
                      instagramReels[activeReelIdx].url.split("/reel/")[1]?.replace(/\/.*$/, "") || ""
                    }/embed/`}
                    title={`${instagramReels[activeReelIdx].title} Instagram Reel`}
                    className="w-full h-full border-0"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    scrolling="no"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CRAFT, METHODOLOGY & HIGH-CONVERSION INQUIRY BOOKING */}
      <section id="book-shoot" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 border-t border-white/10 bg-[#060608] relative">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Creative Narrative & Scope */}
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-amber-400 block font-semibold">
                  THE VIYANA METHODOLOGY
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white leading-tight tracking-tight">
                  &ldquo;Clear, evocative, and attractive visuals that command desire.&rdquo;
                </h2>
              </div>

              <div className="space-y-4 text-white/70 font-light text-base leading-relaxed border-t border-white/10 pt-6">
                <p className="text-white/90">
                  {project.fullDescription ||
                    "Specializing in high-end cosmetic, beauty, skincare, and luxury fine jewellery photography and commercial video production."}
                </p>
                <p>
                  At Viyana Productions in Bangalore, our dedicated product cinema stage is built around tactile precision. Whether crafting paper-tear contrast styling for antique gold bridal jewellery or capturing crisp metallic foil reflection on frosted glass serum dispensers, every setup is engineered for measurable brand impact.
                </p>
              </div>

              {/* Highlights 4-Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/15 space-y-1.5">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <CheckCircle2 size={14} />
                    <span>MACRO PRECISION</span>
                  </span>
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    Pin-sharp focus on intricate typography, textures, and luxury bottle finishes.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/15 space-y-1.5">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <CheckCircle2 size={14} />
                    <span>EDITORIAL STYLING</span>
                  </span>
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    Creative backdrops, chessboards, organic straw nests, and paper-tear sets.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/15 space-y-1.5">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <CheckCircle2 size={14} />
                    <span>STROBE SCIENCE</span>
                  </span>
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    Color-accurate Profoto strobe lighting capturing true gold metallurgy and packaging foil.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/15 space-y-1.5">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <CheckCircle2 size={14} />
                    <span>COMMERCIAL REELS</span>
                  </span>
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    High-retention 9:16 vertical reels and 16:9 4K commercials optimized for high-conversion ads.
                  </p>
                </div>
              </div>

              {/* Deliverables Badges */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono uppercase tracking-widest text-white/50 block">
                  DELIVERABLES &amp; PRODUCTION SCOPE
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    "E-Commerce Packshots",
                    "Fine Jewellery Macro Stills",
                    "Skincare & Beauty Editorial",
                    "Lifestyle Prop Staging",
                    "4K Commercial Broadcast Films",
                    "Social-Ready Vertical Reels",
                    "Catalog Retouching & Color Grading",
                  ].map((scopeItem, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/15 text-xs font-mono text-white/90 uppercase tracking-wider"
                    >
                      {scopeItem}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Credits Dossier */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">STUDIO</span>
                  <span className="text-white font-semibold">Viyana Productions</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">LOCATION</span>
                  <span className="text-white font-semibold">Bengaluru, India</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">SPECIALTY</span>
                  <span className="text-amber-400 font-semibold">Luxury Products &amp; Jewellery</span>
                </div>
              </div>
            </div>

            {/* Right Column: Inquiry / Booking Form */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28 p-7 sm:p-9 rounded-3xl bg-[#101015] border border-white/20 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                {inquirySubmitted ? (
                  <div className="py-10 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto text-2xl font-bold">
                      ✓
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-2xl font-display font-bold uppercase text-white">
                        Inquiry Received
                      </h3>
                      <p className="text-sm text-white/70 max-w-xs mx-auto">
                        Thank you, {inquiry.name}. Our production producer will contact you within 24 hours.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setInquiry({ name: "", email: "", phone: "", message: "" });
                        setInquirySubmitted(false);
                      }}
                      className="mt-3 text-xs font-mono uppercase tracking-wider text-amber-400 hover:text-amber-300 underline cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onInquirySubmit} className="space-y-4 relative z-10">
                    <div className="space-y-1.5 border-b border-white/10 pb-4">
                      <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-400 block font-semibold">
                        BOOK A PRODUCT SHOOT
                      </span>
                      <h3 className="text-2xl font-display font-bold uppercase text-white">
                        Start Your Campaign
                      </h3>
                      <p className="text-xs text-white/60">
                        Let us craft unforgettable stills and high-converting commercial reels for your products.
                      </p>
                    </div>

                    <label className="block space-y-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-white/70">
                        Name *
                      </span>
                      <input
                        type="text"
                        name="name"
                        value={inquiry.name}
                        onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                        required
                        className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-amber-400 focus:bg-white/[0.08] focus:outline-none transition-all"
                        placeholder="Your full name"
                      />
                    </label>

                    <label className="block space-y-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-white/70">
                        Email Address *
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={inquiry.email}
                        onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })}
                        required
                        className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-amber-400 focus:bg-white/[0.08] focus:outline-none transition-all"
                        placeholder="name@company.com"
                      />
                    </label>

                    <label className="block space-y-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-white/70">
                        Phone Number *
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        value={inquiry.phone}
                        onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })}
                        required
                        className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-amber-400 focus:bg-white/[0.08] focus:outline-none transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </label>

                    <label className="block space-y-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-white/70">
                        Project Details *
                      </span>
                      <textarea
                        name="message"
                        value={inquiry.message}
                        onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                        required
                        rows={4}
                        className="w-full resize-y rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-amber-400 focus:bg-white/[0.08] focus:outline-none transition-all"
                        placeholder="Tell us about your product range, quantity, required stills and video deliverables..."
                      />
                    </label>

                    {inquiryError && (
                      <div
                        role="alert"
                        className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-300 leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-red-400 font-bold">!</span>
                        <span>{inquiryError}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmittingInquiry}
                      className="w-full py-4 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all shadow-[0_10px_30px_rgba(251,191,36,0.3)] active:scale-95 disabled:opacity-60 cursor-pointer"
                    >
                      {isSubmittingInquiry ? "PROCESSING INQUIRY..." : "SUBMIT PRODUCT SHOOT INQUIRY →"}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. ALL WORKS ARCHIVE & NEXT PROJECT FOOTER */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-12 border-t border-white/10 bg-[#050507]">
        <div className="container mx-auto max-w-7xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/50 block">
                EXPLORE PORTFOLIO
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold uppercase text-white">
                All Production Categories
              </h3>
            </div>
            {nextProject && (
              <Link
                to={`/work/${nextProject.slug}`}
                className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 hover:text-white uppercase tracking-wider transition-colors"
              >
                <span>Next Project: {nextProject.title}</span>
                <ArrowRight size={13} />
              </Link>
            )}
          </div>

          {/* Projects Quick Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {projects.map((p) => {
              const isCurrent = p.slug === "product-shoot";
              return (
                <Link
                  key={p.slug}
                  to={`/work/${p.slug}`}
                  className={`p-3 rounded-xl border text-xs font-mono transition-all truncate block ${
                    isCurrent
                      ? "bg-amber-400 text-black font-bold border-amber-400 shadow-md"
                      : "bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.08] hover:text-white hover:border-white/20"
                  }`}
                >
                  {p.title}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
