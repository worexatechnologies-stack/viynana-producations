import React, { useState, useEffect, useRef } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
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
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { projects, Project } from "@/data/projects";
import ProductShootDetailPage from "@/pages/ProductShootDetailPage";

function InstagramIcon({
  className = "w-4 h-4",
  size = 16,
}: {
  className?: string;
  size?: number;
}) {
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

interface CinemaFilmItem {
  id: string;
  title: string;
  tag: string;
  category: string;
  src?: string;
  youtubeId?: string;
  poster: string;
  badge: string;
  description: string;
}

interface CinemaStillItem {
  id: string;
  title: string;
  category: string;
  tag: string;
  image: string;
  alt: string;
  description: string;
}

interface InstagramReelItem {
  id: string;
  title: string;
  url: string;
  tag: string;
}

function getProjectCinemaFilms(project: Project): CinemaFilmItem[] {
  const defaultPoster = project.thumbnail || (project.gallery && project.gallery[0]) || "/images/hero-bg.jpg";

  if (project.slug === "influencer-shoot") {
    return [
      {
        id: "influencer-master",
        title: "Luxury Influencer & Creator Commercial Campaign",
        tag: "Creator Master",
        category: "Influencer Cinema",
        src: "/final-output.mp4",
        poster: "/images/influencer-shoot/01-influencer.jpg",
        badge: "01 / Influencer Film",
        description:
          "High-engagement commercial motion engineered for digital creator brands, luxury apparel, and lifestyle partnerships.",
      },
      {
        id: "influencer-render",
        title: "Influencer Lifestyle Editorial Motion Master",
        tag: "Lifestyle Motion",
        category: "Lifestyle Cinema",
        src: "/final-render-video-volpue.mp4",
        poster: "/images/influencer-shoot/02-influencer.jpg",
        badge: "02 / Lifestyle Cinema",
        description:
          "Trend-conscious color grading and visual rhythm engineered to captivate social feeds and maximize audience retention.",
      },
    ];
  }

  if (project.slug === "models-portfolio-shoots") {
    return [
      {
        id: "model-reel-1",
        title: "High-Fashion Editorial Model Reel & Comp-Card Motion",
        tag: "Editorial Reel",
        category: "Model Portfolio",
        src: "/viyana-production-final-video.mp4",
        poster: project.gallery[0] || defaultPoster,
        badge: "01 / Fashion Reel",
        description:
          "Sculpted key lighting, fluid high-fashion posing movement, and cinematic beauty grades for talent comp cards.",
      },
      {
        id: "model-reel-2",
        title: "Studio Model Commercial & Runway Pacing Master",
        tag: "Commercial Runway",
        category: "Studio Motion",
        src: "/viyana-commercial-reel.mp4",
        poster: project.gallery[1] || defaultPoster,
        badge: "02 / Commercial Runway",
        description:
          "Dynamic model movement and directional key strobe lighting designed for international casting and brand campaigns.",
      },
    ];
  }

  if (project.slug === "commercial-ads") {
    return [
      {
        id: "comm-ad-1",
        title: "National Broadcast Commercial & TVC Master",
        tag: "Broadcast TVC",
        category: "Commercial Film",
        src: "/viyana-commercial-reel.mp4",
        poster: project.gallery[0] || defaultPoster,
        badge: "01 / Broadcast TVC",
        description:
          "Full-scale commercial production crafted to bring brand stories to life with cinematic visuals and high-impact pacing.",
      },
      {
        id: "comm-ad-2",
        title: "Cinematic Brand Campaign & Commercial Cinema",
        tag: "Brand Cinema",
        category: "Brand Master",
        src: "/showreel-hero-4k.mp4",
        poster: project.gallery[1] || defaultPoster,
        badge: "02 / Brand Cinema",
        description:
          "Dynamic camera movement, theatrical lighting design, and professional ACEScc color grading.",
      },
    ];
  }

  if (project.slug === "podcast-production") {
    return [
      {
        id: "podcast-1",
        title: "Broadcast Multi-Camera Studio Podcast Master",
        tag: "4K Broadcast",
        category: "Podcast Studio",
        src: "/showreel-video-4k-h264.mp4",
        youtubeId: project.youtubeVideoId,
        poster: project.gallery[0] || defaultPoster,
        badge: "01 / Podcast Master",
        description:
          "Multi-camera 4K dynamic switching, broadcast Shure SM7B acoustic audio processing, and high-retention vertical clips.",
      },
    ];
  }

  if (project.slug === "vertical-series") {
    return [
      {
        id: "vertical-1",
        title: "High-Retention Vertical Cinema Series Master",
        tag: "Vertical 9:16",
        category: "Vertical Series",
        src: "/final-output.mp4",
        poster: project.gallery[0] || defaultPoster,
        badge: "01 / Vertical Master",
        description:
          "Native 9:16 vertical storytelling crafted with cinematic optics, rapid episode pacing, and cliffhanger retention.",
      },
      {
        id: "vertical-2",
        title: "Episodic Social Drama & Vertical Motion",
        tag: "Social Drama",
        category: "Vertical Series",
        src: "/viyana-production-final-video.mp4",
        poster: project.gallery[1] || defaultPoster,
        badge: "02 / Episodic Drama",
        description:
          "Compelling character close-ups and smartphone-native compositions engineered for bingeable retention.",
      },
    ];
  }

  if (project.slug === "advertisement") {
    return [
      {
        id: "ad-1",
        title: "High-Conversion Digital Advertisement & TVC Campaign",
        tag: "Commercial Master",
        category: "Advertisement",
        src: "/viyana-commercial-reel.mp4",
        poster: project.gallery[0] || defaultPoster,
        badge: "01 / Digital TVC",
        description:
          "Data-driven visual hooks, rhythmic pacing, and striking cinematography engineered for measurable brand performance.",
      },
      {
        id: "ad-2",
        title: "Visual Brand Campaign Commercial",
        tag: "Brand Film",
        category: "Brand Campaign",
        src: "/final-output.mp4",
        poster: project.gallery[1] || defaultPoster,
        badge: "02 / Campaign Master",
        description:
          "High-impact visuals and emotional narrative built to drive conversion and long-term brand equity.",
      },
    ];
  }

  if (project.slug === "cinematic-content-shoot") {
    return [
      {
        id: "cinema-1",
        title: "Cinematic Brand Narrative & Large-Format Visuals",
        tag: "Cinematic Reel",
        category: "Content Cinema",
        src: "/showreel-hero-4k.mp4",
        poster: project.gallery[0] || defaultPoster,
        badge: "01 / Cinema Master",
        description:
          "High-end cinema camera workflow capturing raw emotion, textured natural light, and atmospheric storytelling.",
      },
      {
        id: "cinema-2",
        title: "Atmospheric Visual Storytelling Master",
        tag: "Visual Story",
        category: "Content Film",
        src: "/website-video-2.mp4",
        poster: project.gallery[1] || defaultPoster,
        badge: "02 / Visual Story",
        description:
          "Deliberate framing, organic camera movement, and filmic color science crafted for visionary brands.",
      },
    ];
  }

  if (project.slug === "graphic-design-and-visual-identity") {
    return [
      {
        id: "graphic-1",
        title: "3D Brand Motion & Comprehensive Visual Identity",
        tag: "3D Motion",
        category: "Visual Identity",
        src: "/product-commercial-render.mp4",
        poster: project.gallery[0] || defaultPoster,
        badge: "01 / Visual Identity",
        description:
          "Bespoke typography, 3D motion systems, and brand guidelines engineered for luxury brand equity.",
      },
    ];
  }

  if (project.slug === "studio-rental") {
    return [
      {
        id: "studio-1",
        title: "Acoustic Soundstage & Production Studio Tour",
        tag: "Studio Tour",
        category: "Studio Rental",
        src: "/showreel-video-4k-h264.mp4",
        poster: project.gallery[0] || defaultPoster,
        badge: "01 / Studio Space",
        description:
          "Fully equipped production soundstage in Bangalore with Aputure/Profoto lighting grid, cyclorama wall, and client amenities.",
      },
    ];
  }

  if (project.slug === "influencer-shoot") {
    return [
      {
        id: "influencer-1",
        title: "Featured Influencer Film · 4K Edition",
        tag: "Creator Showcase",
        category: "Influencer Shoot",
        src: "/final-output.mp4",
        poster: "/reel-01-poster.jpg",
        badge: "01 / Featured Reel",
        description:
          "High-retention 9:16 vertical cuts and cinematic 4K creator storytelling engineered to capture attention on Instagram feeds.",
      },
      {
        id: "influencer-2",
        title: "Creator Lifestyle & Viral Motion Master",
        tag: "Creator Cinema",
        category: "Influencer Shoot",
        src: "/final-render-video-volpue.mp4",
        poster: "/reel-02-poster.jpg",
        badge: "02 / Creator Cinema",
        description:
          "Dynamic handheld motion, high-energy pacing, and OLED-optimized color grading for lifestyle influencers and brand collaborators.",
      },
    ];
  }

  // Generic / Default for other categories (web series, short films, feature films, etc.)
  const films: CinemaFilmItem[] = [];

  if (project.videos && project.videos.length > 0) {
    project.videos.forEach((vSrc, idx) => {
      films.push({
        id: `${project.slug}-vid-${idx + 1}`,
        title: `${project.title} — Production Reel ${String(idx + 1).padStart(2, "0")}`,
        tag: project.deliverableType || "Commercial Film",
        category: project.category,
        src: vSrc,
        poster: project.gallery[idx] || defaultPoster,
        badge: `0${idx + 1} / Cinema Reel`,
        description: project.description,
      });
    });
  } else if (project.video) {
    films.push({
      id: `${project.slug}-vid-1`,
      title: `${project.title} — Official Production Master`,
      tag: project.deliverableType || "Commercial Film",
      category: project.category,
      src: project.video,
      poster: defaultPoster,
      badge: "01 / Production Master",
      description: project.description,
    });
  } else if (project.youtubeVideoId) {
    films.push({
      id: `${project.slug}-yt-1`,
      title: `${project.title} — 4K Showreel Master`,
      tag: "4K Showreel",
      category: project.category,
      youtubeId: project.youtubeVideoId,
      poster: `https://img.youtube.com/vi/${project.youtubeVideoId}/hqdefault.jpg`,
      badge: "01 / YouTube Master",
      description: project.description,
    });
  } else {
    films.push(
      {
        id: `${project.slug}-reel-1`,
        title: `${project.title} — 4K Theatrical Master Showcase`,
        tag: project.deliverableType || "Studio Master",
        category: project.category,
        src: "/showreel-hero-4k.mp4",
        poster: defaultPoster,
        badge: "01 / Cinema Master",
        description: project.description,
      },
      {
        id: `${project.slug}-reel-2`,
        title: `${project.title} — Behind The Scenes & Visual Process`,
        tag: "Production Process",
        category: project.category,
        src: "/website-video-2.mp4",
        poster: project.gallery[1] || defaultPoster,
        badge: "02 / Production Process",
        description:
          "A look into Viyana's meticulous directorial planning, large-format camera setups, and high-impact storytelling.",
      }
    );
  }

  return films;
}

function getProjectCinemaStills(project: Project): CinemaStillItem[] {
  const images =
    Array.isArray(project.gallery) && project.gallery.length > 0
      ? project.gallery
      : project.thumbnail
      ? [project.thumbnail]
      : [];

  return images.map((img, idx) => {
    const subtitle =
      project.highlights?.[idx]?.subtitle ||
      project.keyFeatures?.[idx] ||
      `${project.title} production still crafted by Viyana Productions in Bangalore.`;

    const title =
      project.highlights?.[idx]?.title ||
      `${project.title} — Frame ${String(idx + 1).padStart(2, "0")}`;

    return {
      id: String(idx + 1).padStart(2, "0"),
      title,
      category: project.category,
      tag: project.deliverableType || "Production Still",
      image: img,
      alt: `${project.title} still ${idx + 1}`,
      description: subtitle,
    };
  });
}

function getProjectInstagramReels(project: Project): InstagramReelItem[] {
  const reels: InstagramReelItem[] = [];

  const rawList =
    project.instagramReels && project.instagramReels.length > 0
      ? project.instagramReels
      : project.instagramReelUrl
      ? [project.instagramReelUrl]
      : [];

  const customReelTitles: Record<string, string[]> = {
    "influencer-shoot": [
      "Creator Lifestyle & Fashion Reel",
      "High-Retention Beauty & Viral Motion",
      "Cinematic Brand Collaboration Cut",
      "Dynamic Portrait & Street Editorial",
    ],
  };

  const projectTitles = customReelTitles[project.slug] || [];

  rawList.forEach((url, idx) => {
    reels.push({
      id: `reel-${idx + 1}`,
      title: projectTitles[idx] || `${project.title} Official Instagram Reel ${rawList.length > 1 ? `#${idx + 1}` : ""}`,
      url,
      tag: `${project.category} Reel`,
    });
  });

  return reels;
}

export default function WorkDetailPage() {
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

  // Inquiry form states
  const [inquiry, setInquiry] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryError, setInquiryError] = useState<string | null>(null);

  const handleInquirySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmittingInquiry(true);
    setInquiryError(null);

    const payload = {
      name: inquiry.name.trim(),
      email: inquiry.email.trim(),
      phone: inquiry.phone.trim(),
      service: project.title,
      message: inquiry.message.trim(),
    };

    try {
      let response: Response | null = null;
      let lastErrorMessage = "";

      // 1. Try relative endpoints in sequence (Node/Vercel -> PHP on Hostinger -> Root PHP)
      const endpointsToTry = ["/api/contact", "/api/contact.php", "/contact.php"];
      for (const endpoint of endpointsToTry) {
        if (response) break;
        try {
          const fetchRes = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(payload),
          });

          if (fetchRes.ok) {
            response = fetchRes;
            break;
          } else {
            try {
              const errData = (await fetchRes.json()) as { error?: string };
              if (errData?.error) lastErrorMessage = errData.error;
            } catch {
              // Non-JSON response
            }
          }
        } catch {
          // Network error on this endpoint, try next
        }
      }

      // 2. Fallback to local server on port 3001 if on localhost
      if (!response && typeof window !== "undefined") {
        const hostname = window.location.hostname;
        const isLocalHost =
          hostname === "localhost" ||
          hostname === "127.0.0.1" ||
          hostname.startsWith("192.168.") ||
          hostname.startsWith("10.") ||
          hostname.endsWith(".local");

        if (isLocalHost) {
          try {
            const fallbackRes = await fetch(`http://${hostname}:3001/api/contact`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });

            if (fallbackRes.ok) {
              response = fallbackRes;
            } else {
              try {
                const errData = (await fallbackRes.json()) as { error?: string };
                if (errData?.error) lastErrorMessage = errData.error;
              } catch {
                // Non-JSON response
              }
            }
          } catch {
            // Direct fallback error
          }
        }
      }

      if (!response) {
        throw new Error(
          lastErrorMessage || "Unable to send your message right now. Please try again or reach out directly."
        );
      }

      const text = await response.text();
      let result: { success?: boolean; error?: string } = {};
      try {
        result = JSON.parse(text);
      } catch {
        if (!response.ok) {
          throw new Error("Unable to parse server response.");
        }
      }

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to send your message. Please try again.");
      }

      setInquirySubmitted(true);
    } catch (error: unknown) {
      setInquiryError(
        error instanceof Error ? error.message : "Unable to send your message. Please try again."
      );
    } finally {
      setIsSubmittingInquiry(false);
    }
  };

  // Dedicated bespoke luxury showcase for Product Shoot
  if (project.slug === "product-shoot") {
    return (
      <ProductShootDetailPage
        project={project}
        nextProject={nextProject}
        onInquirySubmit={handleInquirySubmit}
        inquiry={inquiry}
        setInquiry={setInquiry}
        isSubmittingInquiry={isSubmittingInquiry}
        inquirySubmitted={inquirySubmitted}
        inquiryError={inquiryError}
        setInquirySubmitted={setInquirySubmitted}
      />
    );
  }

  // Universal Cinema Architecture for all other 12 projects
  return (
    <UniversalWorkCinemaPage
      project={project}
      nextProject={nextProject}
      categoryIndex={currentIdx + 1}
      onInquirySubmit={handleInquirySubmit}
      inquiry={inquiry}
      setInquiry={setInquiry}
      isSubmittingInquiry={isSubmittingInquiry}
      inquirySubmitted={inquirySubmitted}
      inquiryError={inquiryError}
      setInquirySubmitted={setInquirySubmitted}
    />
  );
}

function UniversalWorkCinemaPage({
  project,
  nextProject,
  categoryIndex,
  onInquirySubmit,
  inquiry,
  setInquiry,
  isSubmittingInquiry,
  inquirySubmitted,
  inquiryError,
  setInquirySubmitted,
}: {
  project: Project;
  nextProject: Project;
  categoryIndex: number;
  onInquirySubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  inquiry: { name: string; email: string; phone: string; message: string };
  setInquiry: React.Dispatch<
    React.SetStateAction<{ name: string; email: string; phone: string; message: string }>
  >;
  isSubmittingInquiry: boolean;
  inquirySubmitted: boolean;
  inquiryError: string | null;
  setInquirySubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const films = getProjectCinemaFilms(project);
  const stills = getProjectCinemaStills(project);
  const reels = getProjectInstagramReels(project);

  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeReelIdx, setActiveReelIdx] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const activeVideo = films[activeVideoIdx] || films[0];

  const filteredStills =
    activeFilter === "All"
      ? stills
      : stills.filter((s) => s.category === activeFilter);

  // Auto-play when activeVideo changes
  useEffect(() => {
    if (videoRef.current && activeVideo?.src) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [activeVideoIdx, activeVideo?.src]);

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
    setActiveVideoIdx((prev) => (prev === 0 ? films.length - 1 : prev - 1));
  };

  const handleNextVideo = () => {
    setActiveVideoIdx((prev) => (prev === films.length - 1 ? 0 : prev + 1));
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

  // Extract highlight badges
  const highlightCards = [
    {
      title: "CINEMATIC DIRECTION",
      description: "Strategic narrative, distinctive framing, and uncompromising visual rhythm.",
    },
    {
      title: "RAPID PAN-INDIA DELIVERY",
      description: "Studio stages in Bangalore with seamless on-location agile crews across India.",
    },
    {
      title: "ACEScc COLOR WORKFLOW",
      description: "Color-calibrated Hollywood workflow ensuring accurate brand palettes on all screens.",
    },
    {
      title: "HIGH-CONVERSION PACING",
      description: "Engineered for TVC, theatrical distribution, and high-retention digital feeds.",
    },
  ];

  return (
    <main className="bg-[#070709] text-white min-h-screen selection:bg-amber-400 selection:text-black overflow-x-hidden font-sans">
      <SEO
        title={project.seo?.metaTitle || `${project.title} | Viyana Productions`}
        description={project.seo?.metaDescription || project.description}
        keywords={project.seo?.metaKeywords || `${project.title.toLowerCase()}, video production, bangalore`}
        ogTitle={project.seo?.ogTitle || `${project.title} | Viyana Productions`}
        ogType={project.seo?.ogType || "website"}
        ogDescription={project.seo?.ogDescription || project.description}
        ogUrl={project.seo?.ogUrl || `https://viyana.productions/work/${project.slug}`}
        ogSiteName="Viyana Productions"
        ogImage={project.seo?.ogImage || project.thumbnail || "https://viyana.productions/logo-black.png"}
        canonical={project.seo?.canonical || `https://viyana.productions/work/${project.slug}`}
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
            <span className="text-amber-400 font-semibold">
              CATEGORY {String(categoryIndex).padStart(2, "0")}
            </span>
            <span>/</span>
            <span className="text-white/80">{project.deliverableType || project.category}</span>
          </div>

          {/* Hero Title with Balanced Responsive Typography (1-2 Lines Max) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-8 sm:mb-10">
            <div className="lg:col-span-8 xl:col-span-9 space-y-3 sm:space-y-4">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-display font-extrabold uppercase tracking-tight text-white leading-[1.08] sm:leading-[1.03] max-w-4xl">
                {project.title}
                <span className="text-amber-400">.</span>
              </h1>
              <p className="text-sm sm:text-lg md:text-xl font-serif font-light text-white/80 leading-relaxed max-w-3xl">
                {project.description}
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="lg:col-span-4 xl:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-3">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-1">
                  <span>PRODUCTION CATALOG</span>
                  <span className="text-amber-400 font-bold">
                    {films.length} FILMS · {stills.length}+ STILLS
                  </span>
                </div>
                <span className="text-sm font-semibold text-white">
                  {project.deliverableType || project.category}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-1">
                  <span>STUDIO BASE</span>
                  <span className="text-emerald-400 font-bold">BANGALORE HQ</span>
                </div>
                <span className="text-sm font-semibold text-white">
                  4K Commercial Cameras &amp; Soundstages
                </span>
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
              <span>Watch Films ({films.length})</span>
            </a>
            <a
              href="#stills-catalog"
              className="px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <Camera size={14} />
              <span>Stills &amp; Production Catalog ({stills.length})</span>
            </a>
            {reels.length > 0 && (
              <a
                href="#instagram-reels"
                className="px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <InstagramIcon size={14} />
                <span>Instagram Reels ({reels.length})</span>
              </a>
            )}
            <a
              href="#book-shoot"
              className="px-5 py-2.5 rounded-full bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/40 text-amber-300 font-mono text-xs uppercase tracking-wider transition-all ml-auto flex items-center gap-1.5"
            >
              <span>Book this Shoot</span>
              <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </section>

      {/* 2. THEATER CINEMA PLAYER */}
      <section id="cinema-films" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-12 bg-black relative">
        <div className="container mx-auto max-w-7xl space-y-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-amber-400 mb-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>COMMERCIAL MOTION &amp; REELS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tight text-white leading-tight">
                {project.title} Cinema
                <span className="text-amber-400">.</span>
              </h2>
            </div>
            <p className="text-sm font-mono text-white/60 max-w-md">
              From behind-the-scenes breakdown to 4K commercial broadcast masters, each film is shot with razor-sharp glass and cinematic lighting.
            </p>
          </div>

          {/* Main Cinema Screen Container */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-[#0a0a0c] shadow-[0_30px_90px_rgba(0,0,0,0.95)]">
            {/* Viewport Box */}
            <div
              onClick={togglePlay}
              className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[640px] bg-black flex items-center justify-center cursor-pointer group"
            >
              {activeVideo.youtubeId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&playsinline=1&rel=0`}
                  title={`${activeVideo.title} YouTube Video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
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
              )}

              {/* Top Film Badge */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  {activeVideo.badge} · {activeVideo.category}
                </span>
              </div>

              {/* Prev / Next Floating Navigation Buttons (when multiple films) */}
              {films.length > 1 && (
                <>
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
                </>
              )}

              {/* Center Play / Pause Indicator (for HTML5 video) */}
              {!activeVideo.youtubeId && (
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
              )}

              {/* Bottom In-Video Action Pills */}
              {!activeVideo.youtubeId && (
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
              )}
            </div>

            {/* Bottom Meta Bar */}
            <div className="p-5 sm:p-7 bg-[#0d0d11] border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                  <span className="font-bold">
                    FILM 0{activeVideoIdx + 1} OF 0{films.length}
                  </span>
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

              {/* Film Switcher Pills (when multiple films) */}
              {films.length > 1 && (
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono text-white/50 uppercase tracking-wider mr-1">
                    Switch:
                  </span>
                  {films.map((film, idx) => (
                    <button
                      key={film.id}
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
              )}
            </div>
          </div>

          {/* Video Catalog Playlist Cards (when multiple films) */}
          {films.length > 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {films.map((film, fIdx) => {
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
          )}
        </div>
      </section>

      {/* 3. CURATED EDITORIAL STILLS & PRODUCTION CATALOG */}
      <section id="stills-catalog" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 border-t border-white/10 bg-[#070709] relative">
        <div className="container mx-auto max-w-7xl space-y-10">
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-amber-400 mb-2">
                <Sparkles size={14} />
                <span>HIGH-RESOLUTION CATALOG</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tight text-white leading-tight">
                Editorial Stills &amp; Production Master
                <span className="text-amber-400">.</span>
              </h2>
              <p className="text-sm font-mono text-white/60 mt-1 max-w-xl">
                Pin-sharp macro glass, cinematic color science, and calibrated lighting workflow. Tap any photo to expand into the fullscreen craft viewer.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setActiveFilter("All")}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === "All"
                    ? "bg-white text-black font-bold shadow-lg scale-105"
                    : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                All Works ({stills.length})
              </button>
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
                  key={still.image + idx}
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

            {/* Bottom Caption */}
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

      {/* 5. OFFICIAL INSTAGRAM VERTICAL REELS SHOWCASE (when available) */}
      {reels.length > 0 && (
        <section
          id="instagram-reels"
          className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-t border-white/10 bg-gradient-to-b from-[#070709] via-[#0d0910] to-[#070709] relative overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gradient-to-br from-[#833ab4]/15 via-[#fd1d1d]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

          <div className="container mx-auto max-w-6xl relative z-10 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#833ab4]/20 via-[#fd1d1d]/20 to-[#fcb045]/20 border border-pink-500/30 text-xs font-mono text-pink-300 mb-2">
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                  <span>OFFICIAL INSTAGRAM REELS // @VIYANA.PRODUCTIONS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tight text-white leading-tight">
                  Vertical Motion Stories
                  <span className="text-pink-500">.</span>
                </h2>
              </div>
              <p className="text-sm font-mono text-white/60 max-w-md">
                High-retention 9:16 vertical cuts engineered specifically to stop thumbs on Instagram feeds and build deep audience connection.
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
                    {reels[activeReelIdx]?.title || project.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed font-light">
                    Tailored specifically for social algorithms with crisp keyframe animation, tactile audio design, and cinematic grade that pops on OLED smartphone screens.
                  </p>
                </div>

                {/* Multi-Reel Selector Tabs */}
                {reels.length > 1 && (
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-white/50 uppercase tracking-wider block">
                      Available Reels:
                    </span>
                    <div className="flex flex-col gap-2">
                      {reels.map((reel, rIdx) => (
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
                )}

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href={reels[activeReelIdx]?.url || "https://www.instagram.com/viyana.productions/reels/"}
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
                        reels[activeReelIdx]?.url.split("/reel/")[1]?.replace(/\/.*$/, "") || ""
                      }/embed/`}
                      title={`${project.title} Instagram Reel`}
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
      )}

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
                  &ldquo;{project.tagline || "Clear, evocative, and attractive visuals that command desire."}&rdquo;
                </h2>
              </div>

              <div className="space-y-4 text-white/70 font-light text-base leading-relaxed border-t border-white/10 pt-6">
                <p className="text-white/90">
                  {project.fullDescription || project.description}
                </p>
                <p>
                  At Viyana Productions in Bangalore, our dedicated cinema stage and on-location production infrastructure are engineered around visual discipline. Whether directing actors for high-stakes broadcast commercials or orchestrating precise studio lighting for luxury brands, every setup is crafted for measurable brand impact.
                </p>
              </div>

              {/* Highlights 4-Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {highlightCards.map((h, hIdx) => (
                  <div
                    key={hIdx}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/15 space-y-1.5"
                  >
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <CheckCircle2 size={14} />
                      <span>{h.title}</span>
                    </span>
                    <p className="text-xs text-white/70 font-light leading-relaxed">
                      {h.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Inquiry / Booking Form (Luxury White Card) */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28 p-7 sm:p-9 rounded-3xl bg-white text-neutral-900 border border-neutral-200 shadow-2xl relative overflow-hidden">
                {inquirySubmitted ? (
                  <div className="py-10 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
                      ✓
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-2xl font-display font-bold uppercase text-neutral-900">
                        Inquiry Received
                      </h3>
                      <p className="text-sm text-neutral-600 max-w-xs mx-auto">
                        Thank you, {inquiry.name}. Our production team will contact you within 24 hours.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setInquiry({ name: "", email: "", phone: "", message: "" });
                        setInquirySubmitted(false);
                      }}
                      className="mt-3 text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-black underline cursor-pointer transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onInquirySubmit} className="space-y-4 relative z-10">
                    <div className="space-y-1.5 border-b border-neutral-200 pb-4">
                      <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500 block font-semibold">
                        BOOK A {project.title}
                      </span>
                      <h3 className="text-2xl font-display font-bold uppercase text-neutral-900">
                        Start Your Campaign
                      </h3>
                      <p className="text-xs text-neutral-600">
                        Let us craft unforgettable stills and cinematic films for your brand.
                      </p>
                    </div>

                    <label className="block space-y-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-700">
                        Name *
                      </span>
                      <input
                        type="text"
                        name="name"
                        value={inquiry.name}
                        onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                        required
                        className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white focus:outline-none transition-all"
                        placeholder="Your full name"
                      />
                    </label>

                    <label className="block space-y-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-700">
                        Email Address *
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={inquiry.email}
                        onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })}
                        required
                        className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white focus:outline-none transition-all"
                        placeholder="name@company.com"
                      />
                    </label>

                    <label className="block space-y-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-700">
                        Phone Number *
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        value={inquiry.phone}
                        onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })}
                        required
                        className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white focus:outline-none transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </label>

                    <label className="block space-y-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-700">
                        Project Details *
                      </span>
                      <textarea
                        name="message"
                        value={inquiry.message}
                        onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                        required
                        rows={4}
                        className="w-full resize-y rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white focus:outline-none transition-all"
                        placeholder={`Tell us about your ${project.title.toLowerCase()} goals, timeline, and deliverables...`}
                      />
                    </label>

                    {inquiryError && (
                      <div
                        role="alert"
                        className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-mono text-red-700 leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-red-500 font-bold">!</span>
                        <span>{inquiryError}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmittingInquiry}
                      className="w-full py-4 px-6 rounded-xl bg-neutral-900 hover:bg-black text-white font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-60 cursor-pointer"
                    >
                      {isSubmittingInquiry ? "PROCESSING INQUIRY..." : `SUBMIT ${project.title} INQUIRY →`}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. NEXT PROJECT TEASER */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-t border-white/10 overflow-hidden bg-[#09090c] group/next">
        <div className="absolute inset-0 z-0 opacity-25 group-hover/next:opacity-35 transition-opacity duration-700 pointer-events-none">
          <img
            src={nextProject.thumbnail}
            alt={nextProject.title}
            loading="lazy"
            decoding="async"
            className="object-cover w-full h-full absolute inset-0 filter brightness-75 contrast-110 scale-100 group-hover/next:scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070709] via-[#070709]/85 to-[#070709]" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
        </div>

        <div className="relative z-10 container mx-auto max-w-4xl text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 mb-4 shadow-xl">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-white/80">
              NEXT DISCIPLINE // {String(categoryIndex % projects.length + 1).padStart(2, "0")} OF {String(projects.length).padStart(2, "0")}
            </span>
          </div>

          <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-white/90 mb-3 font-semibold">
            {nextProject.category} • {nextProject.client}
          </span>

          <Link
            to={`/work/${nextProject.slug}`}
            className="group/title block mb-6 max-w-2xl"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tight text-white group-hover/title:text-amber-300 transition-colors leading-tight">
              <span>{nextProject.title}</span>
            </h2>
          </Link>

          <p className="text-xs font-mono text-white/60 uppercase tracking-wider mb-8 max-w-lg">
            {nextProject.deliverableType}
          </p>

          <Link
            to={`/work/${nextProject.slug}`}
            className="w-full sm:w-auto max-w-xs sm:max-w-none group/btn inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-amber-300 hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(251,191,36,0.35)]"
          >
            <span>EXPLORE {nextProject.category}</span>
            <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </section>

      {/* 8. STREAMLINED LUXURY REDUCED WHITE FOOTER */}
      <Footer variant="light" hideCtaBanner={true} />
    </main>
  );
}
