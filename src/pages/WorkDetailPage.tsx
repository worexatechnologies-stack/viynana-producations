import { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";

function getInstagramEmbedUrl(url: string): string {
  const match = url.match(/instagram\.com\/(?:reel|p|tv)\/([^/?#&]+)/i);
  if (match && match[1]) {
    return `https://www.instagram.com/reel/${match[1]}/embed/`;
  }
  return url;
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

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

  // Define unified Slide structure: VIDEO / REEL FIRST (if available), followed by images
  interface Slide {
    type: "youtube" | "video" | "image" | "instagram";
    src?: string;
    youtubeId?: string;
    instagramUrl?: string;
    thumbnail: string;
    title: string;
  }

  const galleryImages = project.gallery && project.gallery.length > 0 ? project.gallery : [project.thumbnail];
  
  const slides: Slide[] = [];

  // 1. VIDEOS & REELS FIRST: YouTube, Self-Hosted Video, Instagram Reel
  if (project.youtubeVideoId) {
    slides.push({
      type: "youtube",
      youtubeId: project.youtubeVideoId,
      thumbnail: `https://img.youtube.com/vi/${project.youtubeVideoId}/hqdefault.jpg`,
      title: `${project.title} - Video Reel`,
    });
  } else if (project.video) {
    slides.push({
      type: "video",
      src: project.video,
      thumbnail: galleryImages[0] || project.thumbnail,
      title: `${project.title} - Video Preview`,
    });
  }

  // Instagram Reel slides (e.g. for product-shoot and models-portfolio-shoots)
  const instagramList = project.instagramReels && project.instagramReels.length > 0
    ? project.instagramReels
    : project.instagramReelUrl
    ? [project.instagramReelUrl]
    : [];

  instagramList.forEach((reelUrl, rIdx) => {
    slides.push({
      type: "instagram",
      instagramUrl: getInstagramEmbedUrl(reelUrl),
      src: reelUrl,
      thumbnail: galleryImages[rIdx] || galleryImages[0] || project.thumbnail,
      title: `${project.title} - Instagram Reel ${instagramList.length > 1 ? `#${rIdx + 1}` : ""}`,
    });
  });

  // 2. Then all images
  galleryImages.forEach((imgUrl, idx) => {
    slides.push({
      type: "image",
      src: imgUrl,
      thumbnail: imgUrl,
      title: `${project.title} - Frame ${idx + 1}`,
    });
  });

  const slideCount = slides.length;
  const isProductShoot = project.slug === "product-shoot";
  const isModelPortfolio =
    project.category === "MODELS PORTFOLIO SHOOTS" ||
    project.slug === "models-portfolio-shoots" ||
    project.slug === "model-portfolio-shoots";
  const isPortrait =
    isModelPortfolio ||
    project.category === "VERTICAL SERIES" ||
    project.slug === "vertical-series";
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeReelIdx, setActiveReelIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isYoutubePlaying, setIsYoutubePlaying] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [inquiry, setInquiry] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryError, setInquiryError] = useState<string | null>(null);

  const currentSlide = slides[activeImageIdx] || slides[0];
  const isYoutubeSlide = currentSlide?.type === "youtube";
  const isDirectVideoSlide = currentSlide?.type === "video";
  const isInstagramSlide = currentSlide?.type === "instagram";
  const isVideoSlide = isYoutubeSlide || isDirectVideoSlide || isInstagramSlide;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

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

    if (!payload.name || !payload.email || !payload.phone || !payload.message) {
      setInquiryError("Please fill in all fields (Name, Email, Phone, and Message).");
      setIsSubmittingInquiry(false);
      return;
    }

    try {
      let response: Response | null = null;
      let lastErrorMessage = "";

      // 1. Try relative endpoint /api/contact first
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          response = res;
        } else {
          try {
            const errData = (await res.json()) as { error?: string };
            if (errData?.error) lastErrorMessage = errData.error;
          } catch {
            // Non-JSON response
          }
        }
      } catch (networkError) {
        // Network failure
      }

      // 2. If relative endpoint didn't succeed, attempt fallback to local API server on port 3001
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

  // Reset active image index whenever the slug changes
  useEffect(() => {
    setActiveImageIdx(0);
    setActiveReelIdx(0);
    setIsYoutubePlaying(false);
    setLightboxOpen(false);
    setInquiry({ name: "", email: "", phone: "", message: "" });
    setInquirySubmitted(false);
    setInquiryError(null);
  }, [slug]);

  useEffect(() => {
    setIsYoutubePlaying(false);
  }, [activeImageIdx]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, slideCount]);

  // Automatic scrolling interval (cycles every 3.5 seconds unless hovered or playing video)
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;
    if (isVideoSlide) return;

    const interval = setInterval(() => {
      setActiveImageIdx((prev) => (prev + 1) % slideCount);
    }, 3500);

    return () => clearInterval(interval);
  }, [slideCount, isAutoPlaying, isHovered, isVideoSlide]);

  const handleNext = () => {
    setActiveImageIdx((prev) => (prev + 1) % slideCount);
  };

  const handlePrev = () => {
    setActiveImageIdx((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const pageTitle = project.seo?.metaTitle || `${project.title} | Viyana Productions`;
  const pageDescription = project.seo?.metaDescription || project.description;
  const pageKeywords = project.seo?.metaKeywords || `${project.title.toLowerCase()}, video production, viyana productions, bangalore`;
  const pageOgTitle = project.seo?.ogTitle || `${project.title} | Viyana Productions`;
  const pageOgType = project.seo?.ogType || "website";
  const pageOgDescription = project.seo?.ogDescription || project.description;
  const pageOgUrl = project.seo?.ogUrl || `https://viyana.productions/work/${project.slug}`;
  const pageOgSiteName = project.seo?.ogSiteName || "Viyana Productions";
  const pageOgImage = project.seo?.ogImage || "https://viyana.productions/logo-black.png";
  const pageTwitterSite = project.seo?.twitterSite || "https://twitter.com/";
  const pageTwitterTitle = project.seo?.twitterTitle || `${project.title} | Viyana Productions`;
  const pageTwitterDescription = project.seo?.twitterDescription || project.description;
  const pageAuthor = project.seo?.author || "Akshay";
  const pageCanonical = project.seo?.canonical || `https://viyana.productions/work/${project.slug}`;
  const pageIndexingStatus = project.seo?.indexingStatus || "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  const pagePublisher = project.seo?.publisher || "Viyana Productions";
  const pageOgLocale = project.seo?.ogLocale || "en_US";

  return (
    <main className="bg-[#080808] text-brand-light min-h-screen selection:bg-white selection:text-black overflow-x-hidden">
      <SEO
        title={pageTitle}
        description={pageDescription}
        keywords={pageKeywords}
        ogTitle={pageOgTitle}
        ogType={pageOgType}
        ogDescription={pageOgDescription}
        ogUrl={pageOgUrl}
        ogSiteName={pageOgSiteName}
        ogImage={pageOgImage}
        twitterSite={pageTwitterSite}
        twitterTitle={pageTwitterTitle}
        twitterDescription={pageTwitterDescription}
        author={pageAuthor}
        canonical={pageCanonical}
        robots={pageIndexingStatus}
        publisher={pagePublisher}
        ogLocale={pageOgLocale}
      />

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
            <div className="mb-3 sm:mb-4 px-1 space-y-2.5 sm:space-y-0 sm:flex sm:items-center sm:justify-between max-w-5xl mx-auto">
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
                  PRODUCTION VISUALS // {isVideoSlide ? "FEATURED VIDEO" : `FRAME ${String(activeImageIdx + 1).padStart(2, "0")}`} OF {String(slideCount).padStart(2, "0")}
                </span>
                <span className="hidden sm:inline-block text-[9px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50 shrink-0">
                  {isHovered ? "PAUSED ON HOVER" : "AUTO-SCROLLING"}
                </span>
              </div>

              {/* Row 2: Controls — full-width pill buttons on mobile */}
              <div className="flex items-center gap-2 sm:justify-end">
                {/* Pause / Play — icon-only on mobile, icon+label on desktop */}
                <button
                  type="button"
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="flex-1 sm:flex-none px-3 py-2 sm:px-2.5 sm:py-1.5 rounded-xl sm:rounded-full border border-white/15 bg-white/5 hover:bg-white/15 active:bg-white/20 active:scale-95 transition-all text-[11px] font-mono text-white/70 hover:text-white flex items-center justify-center gap-1.5 cursor-pointer"
                  title={isAutoPlaying ? "Pause Auto-scroll" : "Resume Auto-scroll"}
                >
                  <span className="text-base sm:text-xs leading-none">{isAutoPlaying ? "⏸" : "▶"}</span>
                  <span className="sm:hidden text-[10px] uppercase tracking-wider">{isAutoPlaying ? "Pause" : "Play"}</span>
                  <span className="hidden md:inline text-[10px]">{isAutoPlaying ? "AUTO" : "PAUSED"}</span>
                </button>

                {/* Prev */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex-1 sm:flex-none px-3 py-2 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black active:bg-white active:text-black active:scale-95 transition-all text-[11px] font-mono flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  aria-label="Previous image"
                >
                  <span className="text-sm sm:text-xs">←</span>
                  <span className="text-[10px] uppercase tracking-wider sm:hidden">Prev</span>
                  <span className="hidden sm:inline text-[10px]">PREV</span>
                </button>

                {/* Next */}
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 sm:flex-none px-3 py-2 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black active:bg-white active:text-black active:scale-95 transition-all text-[11px] font-mono flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
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
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className={`relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-brand-dark shadow-[0_20px_70px_rgba(0,0,0,0.95)] group transition-all duration-500 ${
                isInstagramSlide
                  ? "w-full min-h-[580px] sm:min-h-[640px] max-w-4xl mx-auto bg-black"
                  : isYoutubeSlide
                  ? "w-full aspect-video max-w-5xl mx-auto"
                  : isProductShoot
                  ? "w-full aspect-[3/2] sm:aspect-[16/10] max-w-5xl mx-auto bg-black"
                  : isPortrait
                  ? "w-full aspect-[4/5] sm:aspect-[4/5] md:aspect-[4/3.6] lg:aspect-[4/3.5] md:max-h-[560px] lg:max-h-[580px] max-w-2xl mx-auto"
                  : isDirectVideoSlide
                    ? "w-full aspect-video max-w-5xl mx-auto"
                  : "w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9]"
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
                  {currentSlide.type === "youtube" && currentSlide.youtubeId ? (
                    isYoutubePlaying ? (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${currentSlide.youtubeId}?autoplay=1&playsinline=1&rel=0`}
                        title={`${project.title} YouTube video`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsYoutubePlaying(true)}
                        aria-label={`Play ${project.title} YouTube video`}
                        className="relative w-full h-full flex items-center justify-center bg-black cursor-pointer group/video"
                      >
                        <img
                          src={`https://img.youtube.com/vi/${currentSlide.youtubeId}/hqdefault.jpg`}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <span className="absolute inset-0 bg-black/40 group-hover/video:bg-black/20 transition-colors" />
                        <span className="relative z-10 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 text-white shadow-2xl group-hover/video:scale-110 transition-transform">
                          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-7 h-7 sm:w-9 sm:h-9 fill-current ml-1">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-mono text-white">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                          <span>FEATURED 4K VIDEO REEL</span>
                        </div>
                      </button>
                    )
                  ) : currentSlide.type === "instagram" && currentSlide.instagramUrl ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-black/95 p-3 sm:p-5 relative">
                      <div className="relative w-full max-w-[340px] sm:max-w-[380px] h-[480px] sm:h-[540px] rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_40px_rgba(253,29,29,0.2)] bg-black">
                        <iframe
                          src={currentSlide.instagramUrl}
                          title={`${project.title} Instagram Reel`}
                          className="w-full h-full border-0"
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          allowFullScreen
                          scrolling="no"
                        />
                      </div>
                      <div className="mt-3 flex items-center gap-2.5 z-10">
                        <a
                          href={currentSlide.src || project.instagramReelUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-[11px] font-mono font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-lg"
                        >
                          <InstagramIcon className="w-3.5 h-3.5" />
                          <span>Open on Instagram</span>
                          <span className="text-xs">↗</span>
                        </a>
                      </div>
                    </div>
                  ) : currentSlide.type === "video" && currentSlide.src ? (
                    <video
                      src={currentSlide.src}
                      poster={currentSlide.thumbnail}
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                      className={`w-full h-full ${isPortrait ? "object-cover object-[center_top]" : "object-cover"}`}
                    />
                  ) : (
                    <img
                      src={currentSlide.src || currentSlide.thumbnail}
                      alt={currentSlide.title}
                      loading="eager"
                      decoding="async"
                      onClick={() => setLightboxOpen(true)}
                      className={`w-full h-full cursor-zoom-in ${
                        isProductShoot
                          ? "object-cover object-center filter contrast-[1.03] brightness-95"
                          : isPortrait
                          ? "object-cover object-[center_top] filter contrast-[1.05] brightness-95"
                          : "object-cover object-[center_top] filter contrast-[1.05] brightness-95"
                      }`}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Expand / Zoom Button Overlay (only for image slides) */}
              {!isVideoSlide && (
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  aria-label="Tap to view full resolution"
                  className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/75 hover:bg-black backdrop-blur-md border border-white/20 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-white/90 flex items-center gap-1.5 transition-all shadow-lg active:scale-95 cursor-pointer"
                >
                  <svg className="w-3 h-3 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                  <span className="hidden xs:inline sm:inline">FULLSCREEN</span>
                </button>
              )}

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
                    {isVideoSlide ? "FEATURED VIDEO" : `SHOT ${String(activeImageIdx + 1).padStart(2, "0")}`}
                  </span>
                </div>

                {/* Interactive Pagination Dots */}
                <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 bg-black/75 backdrop-blur-md px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full border border-white/15 shadow-lg shrink-0">
                  {Array.from({ length: slideCount }, (_, idx) => (
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
                  <span className="sm:hidden">{isYoutubeSlide ? "YOUTUBE" : isInstagramSlide ? "INSTAGRAM" : isDirectVideoSlide ? "4K MOTION" : "4K RAW"}</span>
                  <span className="hidden sm:inline">{isYoutubeSlide ? "YOUTUBE • 16:9" : isInstagramSlide ? "INSTAGRAM • REEL 9:16" : isDirectVideoSlide ? "4K DCI • MOTION" : "4K DCI • RAW STILL"}</span>
                </span>
              </div>
            </div>

            {/* Interactive Thumbnail Gallery Strip (Mobile & Desktop) */}
            {slideCount > 1 && (
              <div className="mt-3 sm:mt-4 max-w-5xl mx-auto">
                <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar py-1 px-0.5 touch-pan-x">
                  {slides.map((slide, idx) => {
                    const isActive = activeImageIdx === idx;
                    const isVideo = slide.type === "youtube" || slide.type === "video";
                    const isInstagram = slide.type === "instagram";

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIdx(idx)}
                        aria-label={`View ${slide.title}`}
                        className={`relative shrink-0 rounded-xl overflow-hidden transition-all duration-300 border cursor-pointer ${
                          isActive
                            ? isInstagram
                              ? "w-20 h-14 sm:w-24 sm:h-16 border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.5)] ring-2 ring-pink-500/50 scale-[1.03]"
                              : isVideo
                              ? "w-20 h-14 sm:w-24 sm:h-16 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)] ring-2 ring-red-500/50 scale-[1.03]"
                              : "w-20 h-14 sm:w-24 sm:h-16 border-white shadow-[0_0_15px_rgba(255,255,255,0.4)] ring-2 ring-white/50 scale-[1.03]"
                            : "w-16 h-12 sm:w-20 sm:h-14 border-white/20 opacity-60 hover:opacity-100 hover:border-white/50"
                        }`}
                      >
                        <img
                          src={slide.thumbnail}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {isInstagram ? (
                          <span className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#fd1d1d] to-[#833ab4] text-white flex items-center justify-center shadow-md">
                              <InstagramIcon className="w-3.5 h-3.5" />
                            </span>
                          </span>
                        ) : isVideo ? (
                          <span className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] pl-0.5">▶</span>
                          </span>
                        ) : null}
                        <span className={`absolute bottom-1 right-1 text-[8.5px] font-mono px-1 py-0.2 rounded font-bold ${
                          isInstagram ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white" : isVideo ? "bg-red-600 text-white" : "bg-black/80 text-white"
                        }`}>
                          {isInstagram ? "REEL" : isVideo ? "VIDEO" : String(idx).padStart(2, "0")}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* FEATURED INSTAGRAM REEL SHOWCASE (e.g. for product-shoot and models-portfolio-shoots) */}
        {instagramList.length > 0 && (
          <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-12 border-t border-white/10 bg-gradient-to-b from-brand-black via-[#0d090d] to-brand-black relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-[#833ab4]/15 via-[#fd1d1d]/10 to-transparent blur-3xl pointer-events-none rounded-full" />
            <div className="container mx-auto max-w-6xl relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                
                {/* Left: Reel Details & Hook */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#833ab4]/20 via-[#fd1d1d]/20 to-[#fcb045]/20 border border-pink-500/30 text-[11px] font-mono text-pink-300">
                    <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                    <span>{isModelPortfolio ? "OFFICIAL INSTAGRAM REEL // MODEL PORTFOLIO" : "OFFICIAL INSTAGRAM REEL // PRODUCT SHOWCASE"}</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-serif text-white tracking-tight leading-tight">
                    {isModelPortfolio ? "Watch the Model Portfolio in Motion" : "Watch the Product in Motion"}
                  </h2>

                  <p className="text-brand-grey text-sm sm:text-base leading-relaxed font-light">
                    {isModelPortfolio
                      ? "Crafted for editorial agencies, comp cards, and luxury brand showcases. Featuring sculpted strobe lighting, fluid model posing, and high-fashion visual rhythm designed for vertical engagement."
                      : "Engineered specifically for high-retention vertical feeds. From dynamic macro lighting shifts to organic textures and seamless product rotation, this reel demonstrates our approach to viral luxury e-commerce visual storytelling."}
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block mb-1">FORMAT</span>
                      <span className="text-sm font-mono font-semibold text-white">9:16 Vertical Reel</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block mb-1">PRODUCTION</span>
                      <span className="text-sm font-mono font-semibold text-white">
                        {isModelPortfolio ? "Editorial Key Light & ACEScc" : "Macro Lighting & FX"}
                      </span>
                    </div>
                  </div>

                  {/* Multi-Reel Selector Tabs (if more than 1 reel) */}
                  {instagramList.length > 1 && (
                    <div className="pt-2 flex items-center gap-2.5">
                      <span className="text-[11px] font-mono text-white/60 uppercase tracking-wider">Select Reel:</span>
                      <div className="flex items-center gap-2">
                        {instagramList.map((_, rIdx) => (
                          <button
                            key={rIdx}
                            type="button"
                            onClick={() => setActiveReelIdx(rIdx)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                              activeReelIdx === rIdx
                                ? "bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-bold shadow-lg scale-105"
                                : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                            }`}
                          >
                            Reel 0{rIdx + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <a
                      href={instagramList[activeReelIdx] || instagramList[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white font-mono text-xs uppercase tracking-wider font-semibold transition-transform active:scale-95 shadow-[0_10px_25px_rgba(253,29,29,0.3)]"
                    >
                      <InstagramIcon className="w-4 h-4" />
                      <span>Watch on Instagram</span>
                      <span className="text-sm">↗</span>
                    </a>
                    <span className="text-xs font-mono text-white/50">
                      @viyana.productions
                    </span>
                  </div>
                </div>

                {/* Right: Instagram Embedded Frame */}
                <div className="lg:col-span-6 flex justify-center">
                  <div className="w-full max-w-[360px] sm:max-w-[400px] rounded-3xl overflow-hidden border border-white/20 bg-black shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(253,29,29,0.15)] p-2.5 sm:p-3 relative group">
                    <div className="w-full h-[560px] sm:h-[600px] rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                      <iframe
                        key={activeReelIdx}
                        src={getInstagramEmbedUrl(instagramList[activeReelIdx] || instagramList[0])}
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

                <div className="lg:sticky lg:top-28 p-6 sm:p-7 rounded-3xl bg-white text-neutral-900 border border-white shadow-2xl">
                  {inquirySubmitted ? (
                    <div className="py-8 text-center space-y-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
                        ✓
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-display font-bold uppercase text-neutral-900">Message Sent</h3>
                        <p className="text-sm text-neutral-600">
                          Thanks, {inquiry.name}. We&apos;ll be in touch about {project.title.toLowerCase()}.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setInquiry({ name: "", email: "", phone: "", message: "" });
                          setInquirySubmitted(false);
                          setInquiryError(null);
                        }}
                        className="mt-2 text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-neutral-900 underline transition-colors cursor-pointer"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} className="space-y-4">
                      <div className="space-y-2 border-b border-neutral-200 pb-4">
                        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500 block font-semibold">
                          START A PROJECT
                        </span>
                        <h3 className="text-xl sm:text-2xl font-display font-bold uppercase text-neutral-900">
                          {project.title}
                        </h3>
                      </div>

                      <label className="block space-y-1.5">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-600">Name</span>
                        <input
                          type="text"
                          name="name"
                          value={inquiry.name}
                          onChange={(event) => setInquiry({ ...inquiry, name: event.target.value })}
                          autoComplete="name"
                          required
                          className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white focus:outline-none transition-all"
                          placeholder="Your name"
                        />
                      </label>

                      <label className="block space-y-1.5">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-600">Email</span>
                        <input
                          type="email"
                          name="email"
                          value={inquiry.email}
                          onChange={(event) => setInquiry({ ...inquiry, email: event.target.value })}
                          autoComplete="email"
                          required
                          className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white focus:outline-none transition-all"
                          placeholder="Your email address"
                        />
                      </label>

                      <label className="block space-y-1.5">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-600">Phone</span>
                        <input
                          type="tel"
                          name="phone"
                          value={inquiry.phone}
                          onChange={(event) => setInquiry({ ...inquiry, phone: event.target.value })}
                          autoComplete="tel"
                          required
                          className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white focus:outline-none transition-all"
                          placeholder="Your phone number"
                        />
                      </label>

                      <label className="block space-y-1.5">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-600">Message</span>
                        <textarea
                          name="message"
                          value={inquiry.message}
                          onChange={(event) => setInquiry({ ...inquiry, message: event.target.value })}
                          required
                          rows={4}
                          className="w-full resize-y rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white focus:outline-none transition-all"
                          placeholder={`Tell us about your ${project.title.toLowerCase()} project`}
                        />
                      </label>

                      {inquiryError && (
                        <div role="alert" className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-mono text-red-700 leading-relaxed flex items-start gap-2">
                          <span className="text-red-500 font-bold shrink-0">!</span>
                          <span>{inquiryError}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmittingInquiry}
                        className="w-full py-3.5 px-4 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 disabled:cursor-wait disabled:opacity-60 cursor-pointer"
                      >
                        {isSubmittingInquiry ? "SENDING..." : "SEND MESSAGE →"}
                      </button>
                    </form>
                  )}
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
              loading="lazy"
              decoding="async"
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

      {/* FULLSCREEN LIGHTBOX MODAL (MOBILE & DESKTOP) */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between z-10 w-full max-w-6xl mx-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-2 text-xs font-mono text-white/80">
                <span className="font-bold text-white uppercase">{project.title}</span>
                <span>•</span>
                <span>{isVideoSlide ? "FEATURED VIDEO" : `FRAME ${String(activeImageIdx + 1).padStart(2, "0")} OF ${String(slideCount).padStart(2, "0")}`}</span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center font-mono text-sm transition-all cursor-pointer shadow-lg border border-white/20"
                aria-label="Close fullscreen view"
              >
                ✕
              </button>
            </div>

            {/* Center High-Res Image Viewport with swipe */}
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="relative my-auto max-h-[80vh] max-w-6xl mx-auto flex items-center justify-center select-none w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {currentSlide.type === "youtube" && currentSlide.youtubeId ? (
                <div className="w-full aspect-video max-w-4xl">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${currentSlide.youtubeId}?autoplay=1&playsinline=1&rel=0`}
                    title={`${project.title} YouTube video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="w-full h-full rounded-2xl"
                  />
                </div>
              ) : currentSlide.type === "video" && currentSlide.src ? (
                <video
                  src={currentSlide.src}
                  controls
                  autoPlay
                  className="max-h-[78vh] max-w-full rounded-xl"
                />
              ) : (
                <img
                  src={currentSlide.src || currentSlide.thumbnail}
                  alt={currentSlide.title}
                  className="max-h-[78vh] max-w-full object-contain rounded-xl sm:rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] border border-white/10"
                />
              )}
            </div>

            {/* Bottom Controls */}
            <div
              className="flex items-center justify-between max-w-md mx-auto w-full z-10 gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-2 rounded-full border border-white/20 bg-white/10 hover:bg-white hover:text-black text-xs font-mono uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                ← PREV
              </button>
              <span className="text-[10px] sm:text-xs font-mono text-white/50 text-center">
                SWIPE / TAP TO NAVIGATE
              </span>
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 rounded-full border border-white/20 bg-white/10 hover:bg-white hover:text-black text-xs font-mono uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                NEXT →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}