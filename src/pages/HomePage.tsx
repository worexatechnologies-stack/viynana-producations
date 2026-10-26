"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import { Helmet } from "react-helmet-async";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoModal from "@/components/VideoModal";
import { projects } from "@/data/projects";
import {
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronDown,
  Award,
  Video,
  Globe,
  Film,
  Camera,
  Layers,
  MonitorPlay,
  CheckCircle2,
  Maximize2,
  Smartphone,
  LayoutGrid,
  SlidersHorizontal,
} from "lucide-react";

// Filter tabs for Selected Work section
const FILTER_TABS = [
  { id: "ALL", label: "ALL WORKS", count: 13 },
  { id: "COMMERCIAL", label: "COMMERCIALS", categories: ["COMMERCIAL ADS", "ADVERTISEMENT", "PRODUCT SHOOT"] },
  { id: "CINEMATIC", label: "CINEMATIC SHOOTS", categories: ["CINEMATIC CONTENT SHOOT", "FILM PRODUCTION"] },
  { id: "SERIES", label: "SERIES & FILMS", categories: ["VERTICAL SERIES", "WEB SERIES", "SHORT FILMS"] },
  { id: "MODELS", label: "MODELS & PORTFOLIO", categories: ["MODELS PORTFOLIO SHOOTS", "INFLUENCER SHOOT"] },
  { id: "CREATIVE", label: "CREATIVE & STUDIO", categories: ["STUDIO RENTAL", "PODCAST PRODUCTION", "GRAPHIC DESIGN"] },
];



// Major video production services for the floating staggered slider
const floatingServices = [
  {
    title: "Commercial Ads",
    subtitle: "High-impact TV & digital commercials",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=75&w=720&auto=format&fit=crop",
    link: "/services/commercial-ads",
    offset: "normal",
  },
  {
    title: "Cinematic Content Shoot",
    subtitle: "Large format cinema lighting & craft",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=75&w=720&auto=format&fit=crop",
    link: "/services/cinematic-content-shoot",
    offset: "low",
  },
  {
    title: "Advertisement",
    subtitle: "Brand storytelling & campaign films",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=75&w=720&auto=format&fit=crop",
    link: "/services/advertisement",
    offset: "high",
  },
  {
    title: "Models Portfolio Shoots",
    subtitle: "Editorial & fashion portfolio photography",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=75&w=720&auto=format&fit=crop",
    link: "/services/models-portfolio-shoots",
    offset: "normal",
  },
  {
    title: "Vertical Series",
    subtitle: "Short-form mobile-first content series",
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=75&w=720&auto=format&fit=crop",
    link: "/services/vertical-series",
    offset: "low",
  },
  {
    title: "Web Series",
    subtitle: "Multi-episode scripted digital originals",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=75&w=720&auto=format&fit=crop",
    link: "/services/web-series",
    offset: "high",
  },
  {
    title: "Short Films",
    subtitle: "Narrative cinema & festival submissions",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=75&w=720&auto=format&fit=crop",
    link: "/services/short-films",
    offset: "normal",
  },
  {
    title: "Film Production",
    subtitle: "Full-scale feature & commercial films",
    image: "https://images.unsplash.com/photo-1569701813229-33284b643e3c?q=75&w=720&auto=format&fit=crop",
    link: "/services/film-production",
    offset: "low",
  },
  {
    title: "Graphic Design",
    subtitle: "Motion graphics, titles & visual identity",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=75&w=720&auto=format&fit=crop",
    link: "/services/graphic-design",
    offset: "high",
  },
  {
    title: "Product Shoot",
    subtitle: "E-commerce, launches & macro detail",
    image: "/images/product-shoot-1.jpg",
    link: "/services/product-shoot",
    offset: "normal",
  },
  {
    title: "Influencer Shoot",
    subtitle: "Creator content & brand collaborations",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=75&w=720&auto=format&fit=crop",
    link: "/services/influencer-shoot",
    offset: "low",
  },
  {
    title: "Studio Rental",
    subtitle: "Acoustic stage & live 4K multi-cam",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=75&w=720&auto=format&fit=crop",
    link: "/services/studio-rental",
    offset: "high",
  },
  {
    title: "Podcast Production",
    subtitle: "Audio & video podcast studio sessions",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=75&w=720&auto=format&fit=crop",
    link: "/services/podcast-production",
    offset: "normal",
  },
];

// Client Testimonials data
const testimonials = [
  {
    id: 1,
    client: "Rahul K.",
    label: "Client Review / Commercial & Brand Shoot",
    quote: "Really happy with how everything turned out. The team was friendly, patient, and actually took the time to understand what we wanted. The final photos and videos came out much better than we expected. Would definitely recommend Viyana Productions.",
    videoSrc: "/showreel-video-4k-h264.mp4",
  },
  {
    id: 2,
    client: "Priya S.",
    label: "Client Review / Shoot & Editing",
    quote: "We had a great experience working with Viyana Productions. From the shoot to the editing, everything was handled really well. The team made us feel comfortable during the shoot, which made a big difference.",
    videoSrc: "/website-video-2.mp4",
  },
  {
    id: 3,
    client: "Arjun M.",
    label: "Client Review / Creative Direction",
    quote: "What I liked most was how easy the team was to work with. We had a few ideas in mind, and they helped us turn them into something that actually looked professional. Very happy with the final result.",
    videoSrc: "/showreel-video-4k-h264.mp4",
  },
  {
    id: 4,
    client: "Sneha R.",
    label: "Client Review / Brand Content",
    quote: "The whole experience was smooth from start to finish. They were open to our suggestions and made changes whenever we needed them. The final content looked clean, creative, and perfect for our brand.",
    videoSrc: "/website-video-2.mp4",
  },
  {
    id: 5,
    client: "Kiran R.",
    label: "Client Review / Video Production",
    quote: "Honestly, it was a really good experience. The team was professional but also very easy-going. They understood what we were looking for and delivered great-quality content. I’d definitely choose Viyana Productions again.",
    videoSrc: "/showreel-video-4k-h264.mp4",
  },
];

// Video Production FAQs
const faqs = [
  {
    question: "What video production services does Viyana Productions offer in Bengaluru?",
    answer: "Viyana Productions offers corporate video production, product videos, industrial films, brand films, commercials, documentaries, and social media video content in Bengaluru and across India.",
  },
  {
    question: "Does Viyana Productions provide corporate video production in Bengaluru?",
    answer: "Yes. Viyana Productions provides corporate video production in Bengaluru, including concept development, scripting, filming, editing, color grading, sound design, and final video delivery.",
  },
  {
    question: "Does Viyana Productions create product videos for businesses?",
    answer: "Yes. We create professional product videos that showcase product features, benefits, applications, and brand value for websites, advertisements, social media, and digital marketing campaigns.",
  },
  {
    question: "Does Viyana Productions offer industrial video production?",
    answer: "Yes. We create industrial videos for manufacturing companies, factories, infrastructure businesses, technology companies, and other industrial sectors.",
  },
  {
    question: "Does Viyana Productions handle the complete video production process?",
    answer: "Yes. Viyana Productions can manage the complete video production process, including concept development, scripting, pre-production, filming, editing, color grading, sound design, motion graphics, and final delivery.",
  },
  {
    question: "How much does video production cost in Bengaluru?",
    answer: "The cost of video production in Bengaluru depends on the video type, concept, script, location, production duration, crew, equipment, actors, and post-production requirements. Viyana Productions provides customized quotes based on each project's requirements.",
  },
  {
    question: "Does Viyana Productions work with startups and small businesses?",
    answer: "Yes. Viyana Productions works with startups, small businesses, growing companies, and established brands, creating video solutions based on their objectives, audience, and budget.",
  },
  {
    question: "Does Viyana Productions provide video production services across India?",
    answer: "Yes. Viyana Productions is based in Bengaluru, Karnataka, and can undertake video production projects across India depending on the project requirements.",
  },
  {
    question: "Can Viyana Productions create videos for social media and digital marketing?",
    answer: "Yes. We create short-form videos, promotional videos, product videos, brand content, and advertising creatives for platforms such as Instagram, YouTube, websites, and digital campaigns.",
  },
  {
    question: "How can I hire Viyana Productions for a video project?",
    answer: "Contact Viyana Productions with your project requirements, video type, location, timeline, and budget. Our team can discuss your goals and recommend a suitable production approach.",
  },
];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const servicesSliderRef = useRef<HTMLDivElement>(null);

  // Hero video loading & audio state
  const [shouldLoadVideo, setShouldLoadVideo] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isIntroFinished, setIsIntroFinished] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHeroMuted, setIsHeroMuted] = useState(false);
  const [heroVideoSrc, setHeroVideoSrc] = useState("/13232-246463976_medium.mp4");

  // Cinematic intro: enforce minimum 2.5s display even on cache-hit
  const introTimerDone = useRef(false);
  const videoDataReady = useRef(false);
  const introFinishedRef = useRef(false);

  const tryFinishIntro = () => {
    if (introTimerDone.current && videoDataReady.current && !introFinishedRef.current) {
      introFinishedRef.current = true;
      setIsIntroFinished(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      introTimerDone.current = true;
      tryFinishIntro();
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoReady = () => {
    setIsVideoLoaded(true);
    videoDataReady.current = true;
    tryFinishIntro();
  };

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    // Attempt unmuted playback with sound first
    video.muted = false;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsHeroMuted(false);
          setIsPlaying(true);
        })
        .catch(() => {
          // If browser policy blocks initial autoplay with sound, fall back to muted so video plays smoothly
          video.muted = true;
          setIsHeroMuted(true);
          video.play().catch(() => {});
        });
    }

    // Automatically unmute upon the first user interaction anywhere if sound was blocked
    const handleFirstUserInteraction = () => {
      if (video && video.muted) {
        video.muted = false;
        setIsHeroMuted(false);
      }
      window.removeEventListener("click", handleFirstUserInteraction);
      window.removeEventListener("touchstart", handleFirstUserInteraction);
      window.removeEventListener("keydown", handleFirstUserInteraction);
    };

    window.addEventListener("click", handleFirstUserInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstUserInteraction, { once: true });
    window.addEventListener("keydown", handleFirstUserInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstUserInteraction);
      window.removeEventListener("touchstart", handleFirstUserInteraction);
      window.removeEventListener("keydown", handleFirstUserInteraction);
    };
  }, []);

  const toggleHeroPlay = () => {
    if (!heroVideoRef.current) return;
    if (isPlaying) {
      heroVideoRef.current.pause();
      setIsPlaying(false);
    } else {
      heroVideoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleHeroMute = () => {
    if (!heroVideoRef.current) return;
    const nextMuted = !heroVideoRef.current.muted;
    heroVideoRef.current.muted = nextMuted;
    setIsHeroMuted(nextMuted);
    if (!nextMuted && heroVideoRef.current.paused) {
      heroVideoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Mobile viewport detection
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Enter Fullscreen Landscape Handler (Native mobile landscape orientation)
  const enterLandscapeFullscreen = () => {
    const video = heroVideoRef.current;
    if (!video) return;

    // Unmute on explicit user trigger
    if (video.muted) {
      video.muted = false;
      setIsHeroMuted(false);
    }
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    }

    if (video.requestFullscreen) {
      video
        .requestFullscreen()
        .then(() => {
          try {
            if (screen.orientation && (screen.orientation as any).lock) {
              (screen.orientation as any).lock("landscape").catch(() => {});
            }
          } catch {
            // Orientation lock may not be permitted in all browsers
          }
        })
        .catch(() => {});
    } else if ((video as any).webkitEnterFullscreen) {
      // iOS Safari native fullscreen handles landscape rotation automatically
      (video as any).webkitEnterFullscreen();
    } else if ((video as any).webkitRequestFullscreen) {
      (video as any).webkitRequestFullscreen();
    } else if ((video as any).mozRequestFullScreen) {
      (video as any).mozRequestFullScreen();
    } else if ((video as any).msRequestFullscreen) {
      (video as any).msRequestFullscreen();
    }
  };

  // Release orientation lock on fullscreen exit
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFs = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      if (!isFs && screen.orientation && (screen.orientation as any).unlock) {
        try {
          (screen.orientation as any).unlock();
        } catch {
          // ignore
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Signature Showreel modal trigger
  const openSignatureShowreelModal = () => {
    setActiveModalVideo({
      src: "/showreel-master.mp4",
      title: "Viyana Cinematic Visual Reel",
      category: "SIGNATURE SHOWREEL",
    });
  };

  // Video modal state
  const [activeModalVideo, setActiveModalVideo] = useState<{
    src: string;
    title: string;
    category: string;
  } | null>(null);

  const { scrollYProgress } = useScroll();
  const yHeroVideo = useTransform(scrollYProgress, [0, 0.4], ["0%", "15%"]);

  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  const selectedWorkSectionRef = useRef<HTMLElement>(null);
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");

  const filteredProjects = useMemo(() => {
    if (selectedFilter === "ALL") return projects;
    const tab = FILTER_TABS.find((t) => t.id === selectedFilter);
    if (!tab || !tab.categories) return projects;
    return projects.filter((p) => tab.categories.includes(p.category));
  }, [selectedFilter]);

  const handleFilterChange = (id: string) => {
    setSelectedFilter(id);
    setActiveServiceIdx(0);
    setScrollProgress(0);
    if (servicesSliderRef.current) {
      servicesSliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  // Mouse drag-to-scroll tracking for carousel mode
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const hasMovedRef = useRef(false);
  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  // Smooth mouse wheel horizontal scrolling through Selected Work cards
  useEffect(() => {
    const section = selectedWorkSectionRef.current;
    const slider = servicesSliderRef.current;
    if (!section || !slider || viewMode !== "carousel") return;

    targetScrollRef.current = slider.scrollLeft;
    currentScrollRef.current = slider.scrollLeft;

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const updateScroll = () => {
      if (!slider) return;
      const diff = targetScrollRef.current - currentScrollRef.current;

      if (Math.abs(diff) > 0.5) {
        currentScrollRef.current = lerp(currentScrollRef.current, targetScrollRef.current, 0.18);
        slider.scrollLeft = currentScrollRef.current;
        animationFrameRef.current = requestAnimationFrame(updateScroll);
      } else {
        slider.scrollLeft = targetScrollRef.current;
        currentScrollRef.current = targetScrollRef.current;
        animationFrameRef.current = null;
      }
    };

    const onWheel = (e: WheelEvent) => {
      // If horizontal trackpad swipe or Shift key held, allow native handling
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
        targetScrollRef.current = slider.scrollLeft;
        currentScrollRef.current = slider.scrollLeft;
        return;
      }

      const maxScroll = slider.scrollWidth - slider.clientWidth;
      if (maxScroll <= 0) return;

      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      const isAtEnd = slider.scrollLeft >= maxScroll - 6;
      const isAtStart = slider.scrollLeft <= 6;

      // When at start or end, do not intercept wheel — let page scroll naturally!
      if ((isScrollingDown && isAtEnd) || (isScrollingUp && isAtStart)) {
        targetScrollRef.current = slider.scrollLeft;
        currentScrollRef.current = slider.scrollLeft;
        return;
      }

      // Smooth horizontal gliding through selected work cards in the middle of screen
      e.preventDefault();

      const rawDelta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 120);
      const step = rawDelta * 2.2;

      targetScrollRef.current = Math.max(0, Math.min(maxScroll, targetScrollRef.current + step));

      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(updateScroll);
      }
    };

    section.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      section.removeEventListener("wheel", onWheel);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [viewMode, filteredProjects]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (viewMode !== "carousel") return;
    const slider = servicesSliderRef.current;
    if (!slider) return;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - slider.offsetLeft;
    scrollLeftStartRef.current = slider.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || viewMode !== "carousel") return;
    const slider = servicesSliderRef.current;
    if (!slider) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 6) {
      hasMovedRef.current = true;
    }
    slider.scrollLeft = scrollLeftStartRef.current - walk;
    targetScrollRef.current = slider.scrollLeft;
    currentScrollRef.current = slider.scrollLeft;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
    if (servicesSliderRef.current) {
      targetScrollRef.current = servicesSliderRef.current.scrollLeft;
      currentScrollRef.current = servicesSliderRef.current.scrollLeft;
    }
  };

  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    hasMovedRef.current = false;
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const diffX = Math.abs(e.touches[0].clientX - touchStartXRef.current);
    const diffY = Math.abs(e.touches[0].clientY - touchStartYRef.current);
    if (diffX > 10 || diffY > 10) {
      hasMovedRef.current = true;
    }
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      hasMovedRef.current = false;
    }, 150);
  };

  const cardWidthRef = useRef(480);
  useEffect(() => {
    const updateCardWidth = () => {
      if (servicesSliderRef.current) {
        const card = servicesSliderRef.current.querySelector<HTMLElement>(".service-card");
        const gap = window.innerWidth < 640 ? 16 : 24;
        cardWidthRef.current = card ? card.offsetWidth + gap : 480;
      }
    };
    updateCardWidth();
    window.addEventListener("resize", updateCardWidth, { passive: true });
    return () => window.removeEventListener("resize", updateCardWidth);
  }, [viewMode, selectedFilter]);

  const scrollServices = (direction: "left" | "right") => {
    if (servicesSliderRef.current) {
      const cardWidth = cardWidthRef.current || 480;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      servicesSliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollTickingRef = useRef(false);
  const handleServicesScroll = () => {
    if (scrollTickingRef.current) return;
    scrollTickingRef.current = true;
    requestAnimationFrame(() => {
      scrollTickingRef.current = false;
      if (servicesSliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = servicesSliderRef.current;
        const max = scrollWidth - clientWidth;
        if (max > 0) {
          setScrollProgress(Math.min(100, Math.max(0, (scrollLeft / max) * 100)));
        }
        const cardWidth = cardWidthRef.current || 480;
        const idx = Math.min(
          filteredProjects.length - 1,
          Math.max(0, Math.round(scrollLeft / cardWidth))
        );
        setActiveServiceIdx(idx);
      }
    });
  };

  return (
    <main
      ref={containerRef}
      className="home-cinematic relative w-full bg-brand-black text-[#fbf7ee] min-h-screen overflow-x-hidden selection:bg-white text-black selection:text-brand-black font-sans"
    >
      <SEO
        title="Video Production Company in Bangalore | Viyana Productions"
        description="Viyana Productions is a creative video production company delivering cinematic films, commercial ads, branded content, and professional video production services."
        keywords="video production company, creative production agency, video production services, corporate video production, brand film production, video production company in bangalore, video production agency in bangalore"
        ogTitle="Viyana Productions | Creative Video Production Company in Bangalore"
        ogType="website"
        ogDescription="Discover Viyana Productions, a creative video production company specializing in cinematic storytelling, commercial advertisements, branded content, and professional filmmaking."
        ogUrl="https://viyana.productions"
        ogSiteName="Viyana Productions"
        ogImage="https://viyana.productions/logo-black.png"
        twitterSite="https://twitter.com/"
        twitterTitle="Viyana Productions | Professional  Video Production Company in Bangalore"
        twitterDescription="Bring your ideas to life with Viyana Productions. We create captivating films, engaging commercials, and dynamic branded videos that tell your unique story. Let's turn your vision into reality!"
        author="Akshay"
        canonical="https://viyana.productions"
        robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        publisher="Viyana Productions"
        ogLocale="en_US"
      />

      <Navbar />

      {/* 1. HERO SECTION (BIG CINEMATIC VIDEO ACROSS MOBILE & DESKTOP WITH CLEAN ON-VIDEO BRANDING) */}
      <header className="relative w-full overflow-hidden bg-black h-[100svh] min-h-[560px] sm:min-h-[640px] flex flex-col justify-between px-4 sm:px-8 md:px-10 lg:px-16 pt-20 sm:pt-24 md:pt-28 pb-6 sm:pb-8">
        {/* Full Bleed Big Video Canvas on Mobile & Desktop */}
        <motion.div
          style={{ y: isMobile ? 0 : yHeroVideo }}
          className="absolute inset-0 -top-[5%] w-full h-[110%] md:h-[115%] overflow-hidden z-0 will-change-transform bg-black"
        >
          <video
            ref={heroVideoRef}
            autoPlay
            loop
            playsInline
            preload="auto"
            src={heroVideoSrc}
            onPlaying={handleVideoReady}
            onLoadedData={handleVideoReady}
            className="w-full h-full object-cover object-center filter contrast-[1.03] saturate-[1.04]"
          >
            <source src="/13232-246463976_medium.mp4" type="video/mp4" />
            <source src="/website-video-2.mp4" type="video/mp4" />
            <source src="/showreel-hero-4k.mp4" type="video/mp4" />
          </video>

          {/* Clean Cinematic Overlays: Top and Bottom Vignettes for perfect readability */}
          <div className="absolute top-0 left-0 right-0 h-32 sm:h-40 md:h-48 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-40 sm:h-52 md:h-64 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />
        </motion.div>

        {/* Top spacer (to balance flex-col justify-between with Navbar) */}
        <div className="relative z-10 w-full h-2 pointer-events-none" />

        {/* Central Brand Showcase: Directly ON THE VIDEO (Clean Logo, Tagline & Action Buttons) */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center my-auto px-5 py-7 sm:px-10 sm:py-9 max-w-4xl mx-auto rounded-3xl border border-white/20 bg-black/35 backdrop-blur-sm shadow-[0_24px_80px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)]">
          {/* Clean White Official Logo */}
          <div className="mb-2.5 sm:mb-3.5">
            <img
              src="/logo-white.png"
              alt="Viyana Productions"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)] filter brightness-110"
            />
          </div>

          {/* Cinema Tagline */}
          <p className="text-[11px] sm:text-xs md:text-sm font-mono uppercase tracking-[0.25em] text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] max-w-sm sm:max-w-none">
            CINEMATIC VISUAL CONTENT &bull; PRODUCTION HOUSE &bull; BENGALURU
          </p>

          {/* Buttons ON VIDEO: WATCH REELS & EXPLORE */}
          <div className="mt-5 sm:mt-7 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <button
              type="button"
              onClick={openSignatureShowreelModal}
              className="group flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white text-black hover:bg-neutral-200 font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>WATCH REELS</span>
            </button>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("selected-work");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="group flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/25 hover:border-white/50 text-white font-mono text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
            >
              <span>EXPLORE</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Bottom Ambient Controls (Floating along the bottom of viewport) */}
        <div className="relative z-20 flex items-center justify-between w-full">
          {/* Production Reel Status Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-mono tracking-widest text-white uppercase shadow-lg">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white text-black animate-pulse" />
            <span>VIYANA PRODUCTIONS</span>
          </div>

          {/* Sound Mute/Unmute & Playback Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Mute/Unmute Icon Toggle Button */}
            <button
              type="button"
              onClick={toggleHeroMute}
              aria-label={isHeroMuted ? "Unmute video sound" : "Mute video sound"}
              title={isHeroMuted ? "Unmute sound" : "Mute sound"}
              className={`group/sound relative w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.8)] backdrop-blur-md active:scale-95 hover:scale-105 ${
                !isHeroMuted
                  ? "bg-white text-black hover:bg-neutral-200 border border-white/40 shadow-[0_0_25px_rgba(255,255,255,0.15)]"
                  : "bg-black/60 hover:bg-black/80 text-[#fbf7ee] border border-white/20"
              }`}
            >
              {!isHeroMuted ? (
                <>
                  <span className="absolute inset-0 rounded-full bg-white text-black/40 animate-ping pointer-events-none" />
                  <Volume2 className="w-4 h-4 text-[#080706] relative z-10" />
                </>
              ) : (
                <VolumeX className="w-4 h-4 text-white" />
              )}
            </button>

            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={toggleHeroPlay}
              aria-label={isPlaying ? "Pause ambient video" : "Play ambient video"}
              title={isPlaying ? "Pause ambient video" : "Play ambient video"}
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white ml-0.5" />
              )}
            </button>
          </div>
        </div>
      </header>



      {/* 3. COMPANY IMPACT BAND & 4-COLUMN STATS GRID (VE-BAND) */}
      <section className="relative w-full pt-8 pb-14 sm:py-24 lg:py-32 px-5 sm:px-8 lg:px-16 border-t border-white/10 mt-0 sm:mt-16 bg-black/25 overflow-hidden">
        {/* Advanced Ambient Glow Mesh */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.15)_50%,transparent_80%)] pointer-events-none blur-2xl" />

        <div className="relative z-10 max-w-7xl mx-auto space-y-8 sm:space-y-14 lg:space-y-16">
          {/* Two-Column Section Head */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-end">
            <div className="lg:col-span-7">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-[#f3f3ef] leading-[1.12] sm:leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                VIDEO PRODUCTION THAT MOVES <br className="sm:hidden" />
                PEOPLE &amp; BRANDS
              </h2>
            </div>
            <div className="lg:col-span-5 text-sm sm:text-base text-white font-medium leading-relaxed space-y-2.5 sm:space-y-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              <p>
                From the first idea to the final frame, Viyana Productions creates cinematic visual content that helps brands tell their story, showcase their products, and connect with their audience.
              </p>
              <p className="text-[10px] sm:text-xs md:text-sm font-mono uppercase tracking-wider text-white/70 leading-relaxed">
                CORPORATE FILMS • PRODUCT VIDEOS • INDUSTRIAL FILMS • <br className="sm:hidden" />
                BRAND FILMS • DOCUMENTARIES • COMMERCIALS
              </p>
            </div>
          </div>

          {/* 4-Column Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
            {[
              { stat: "1+", label: "YEAR OF CREATIVE EXPERIENCE" },
              { stat: "10+", label: "PROJECTS COMPLETED" },
              { stat: "15+", label: "VIDEOS PRODUCED" },
              { stat: "BENGALURU", label: "BASED PRODUCTION STUDIO" },
            ].map((item) => (
              <div
                key={item.stat}
                className="group relative p-4 min-[380px]:p-5 sm:p-7 lg:p-8 rounded-2xl sm:rounded-3xl bg-[#14110d]/80 backdrop-blur-2xl border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.08)] hover:border-white/40/55 hover:shadow-[0_25px_60px_rgba(255,255,255,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between min-h-[130px] sm:min-h-[155px] lg:min-h-[180px] overflow-hidden"
              >
                {/* Subtle top-right specular rim light on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <strong
                  className={`font-display font-extrabold text-[#f3f3ef] tracking-tight block leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] ${
                    item.stat.length > 5
                      ? "text-base min-[360px]:text-[1.1rem] min-[400px]:text-xl sm:text-2xl md:text-lg lg:text-2xl xl:text-3xl"
                      : "text-2xl min-[360px]:text-3xl sm:text-4xl md:text-4xl lg:text-5xl"
                  }`}
                >
                  {item.stat}
                </strong>
                <span className="text-[10px] sm:text-xs md:text-sm text-[#fbf7ee]/65 font-normal mt-2.5 sm:mt-3 block leading-relaxed uppercase tracking-wider font-mono">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-1 sm:pt-2">
            <Link
              to="/work"
              className="group w-full sm:w-auto text-center px-8 py-4 rounded-full bg-white text-black hover:bg-neutral-200 font-mono text-xs uppercase tracking-wider font-bold hover:shadow-[0_15px_45px_rgba(255,255,255,0.15)] hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 shadow-[0_10px_35px_rgba(255,255,255,0.15),inset_0_1px_1px_rgba(255,255,255,0.6)] cursor-pointer"
            >
              <span>OUR WORK</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/contact"
              className="group w-full sm:w-auto text-center px-8 py-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 hover:border-white/40 text-[#fbf7ee] font-mono text-xs uppercase tracking-wider font-medium hover:bg-white/15 active:scale-95 transition-all flex items-center justify-center gap-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
            >
              <span>START A PROJECT</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-white" />
            </Link>
          </div>

        </div>
      </section>

      <section
        ref={selectedWorkSectionRef}
        id="selected-work"
        className="relative w-full py-16 sm:py-28 border-t border-white/15 bg-black/20 overflow-hidden"
      >
        {/* Ambient Radial Spotlight Mesh */}
        <div
          className="absolute top-1/4 right-1/4 w-[850px] h-[500px] bg-[radial-gradient(circle,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.15)_55%,transparent_80%)] rounded-full blur-3xl pointer-events-none"
          style={{ contain: "strict", transform: "translateZ(0)" }}
        />
        <div
          className="absolute bottom-10 left-10 w-[500px] h-[300px] bg-[radial-gradient(circle,rgba(255,255,255,0.15)_0%,transparent_70%)] rounded-full blur-3xl pointer-events-none"
        />

        <div className="w-full space-y-8 sm:space-y-10 relative z-10">
          {/* Top Header Bar */}
          <div className="w-full px-5 sm:px-8 lg:px-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="text-xs sm:text-sm font-mono text-white tracking-widest font-bold px-3 py-1 rounded-full bg-white/10 border border-white/20">
                  [ 02 / SELECTED WORK ]
                </span>
                <span className="hidden sm:inline-block text-xs font-mono text-white/60 uppercase tracking-widest font-semibold">
                  CINEMA ARCHIVE
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-[#f3f3ef] uppercase drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]">
                SELECTED WORK
              </h2>
              <p className="text-sm sm:text-base text-white font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                Commercials, brand films, and cinema productions crafted for broadcast &amp; digital impact.
              </p>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 shrink-0 flex-wrap">
              {/* View Mode Toggle: Carousel vs Grid */}
              <div className="flex items-center p-1 rounded-full bg-[#13100c]/90 border border-white/20 shadow-md">
                <button
                  type="button"
                  onClick={() => setViewMode("carousel")}
                  aria-label="Carousel View"
                  title="Carousel View"
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                    viewMode === "carousel"
                      ? "bg-white text-black hover:bg-neutral-200 shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                      : "text-[#fbf7ee]/70 hover:text-white"
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">CAROUSEL</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid View"
                  title="Grid View"
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-white text-black hover:bg-neutral-200 shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                      : "text-[#fbf7ee]/70 hover:text-white"
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">GRID</span>
                </button>
              </div>

              <Link
                to="/work"
                className="px-5 py-2.5 border border-white/20 hover:border-white/40 bg-[#14110d]/80 backdrop-blur-md rounded-full text-xs font-mono tracking-wider uppercase text-white hover:bg-white text-black hover:text-[#080706] transition-all flex items-center gap-2 group shadow-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] font-bold"
              >
                <span>VIEW ALL ({String(projects.length).padStart(2, "0")})</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Category Filter Pills Dock */}
          <div className="w-full px-5 sm:px-8 lg:px-16 overflow-x-auto ve-scrollbar-none py-1">
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-max">
              {FILTER_TABS.map((tab) => {
                const isActive = selectedFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleFilterChange(tab.id)}
                    className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-white text-black hover:bg-neutral-200 font-bold shadow-[0_4px_20px_rgba(255,255,255,0.15)] scale-102"
                        : "bg-[#14110d]/75 border border-white/15 text-[#fbf7ee]/75 hover:border-white/40/60 hover:text-white hover:bg-[#1a1611]/80 font-medium"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* View Mode 1: Cinema Horizontal Stage */}
          {viewMode === "carousel" ? (
            <div
              ref={servicesSliderRef}
              onScroll={handleServicesScroll}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="flex flex-row overflow-x-auto gap-4 sm:gap-6 px-5 sm:px-8 lg:px-16 w-full items-stretch ve-scrollbar-none py-2 cursor-grab active:cursor-grabbing select-none"
              style={{
                touchAction: "pan-x pan-y",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {filteredProjects.map((project, idx) => {
                const heroImg = project.thumbnail || project.gallery[0];
                const displayNumber = String(idx + 1).padStart(2, "0");

                return (
                  <Link
                    to={`/work/${project.slug}`}
                    key={project.slug}
                    draggable={false}
                    onClick={(e) => {
                      if (hasMovedRef.current) {
                        e.preventDefault();
                      }
                    }}
                    className="service-card group relative flex flex-col w-[86vw] sm:w-[460px] md:w-[500px] lg:w-[540px] aspect-[16/11] shrink-0 rounded-3xl overflow-hidden border border-white/15 bg-[#14110d] shadow-[0_22px_60px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.08)] hover:border-white/40/60 hover:shadow-[0_28px_70px_rgba(255,255,255,0.15)] transition-all duration-500 select-none"
                    aria-label={`View ${project.title} service`}
                  >
                    {/* Background Image with Cinematic Grading */}
                    <img
                      src={heroImg}
                      alt={`${project.title} - ${project.category}`}
                      loading="lazy"
                      width="540"
                      height="370"
                      decoding="async"
                      draggable={false}
                      className="object-cover w-full h-full absolute inset-0 filter contrast-[1.08] brightness-[0.88] group-hover:brightness-105 group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                    />

                    {/* Gradient Overlay for high-contrast typography */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-[#080706]/55 to-transparent pointer-events-none" />

                    {/* Top Row: Category Tag & Index Number */}
                    <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between gap-3">
                      <span className="px-3.5 py-1.5 bg-[#080706]/75 backdrop-blur-xl text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase text-white rounded-full border border-white/20 shadow-md truncate max-w-[75%]">
                        {project.category}
                      </span>

                      <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-white bg-[#080706]/75 px-3 py-1.5 rounded-xl border border-white/20 backdrop-blur-xl shadow-md shrink-0">
                        {displayNumber}
                      </span>
                    </div>

                    {/* Center Interactive Floating Play / Preview Trigger on Hover */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-black hover:bg-neutral-200 flex items-center justify-center shadow-[0_0_35px_rgba(255,255,255,0.15)] scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                        <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-[#080706] ml-0.5" />
                      </div>
                    </div>

                    {/* Bottom Content Block */}
                    <div className="relative z-10 p-5 sm:p-7 mt-auto space-y-2">
                      <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-white/80 tracking-widest uppercase font-semibold">
                        <span>VIYANA PRODUCTIONS</span>
                        <span>•</span>
                        <span>{project.year}</span>
                        <span>•</span>
                        <span className="truncate">{project.client}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight leading-tight group-hover:text-white transition-all line-clamp-1 uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                        {project.title}
                      </h3>

                      <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-white/75 pt-2 border-t border-white/15">
                        <span className="truncate max-w-[65%] font-medium text-[#fbf7ee]/70">
                          {project.deliverableType}
                        </span>
                        <span className="text-white font-bold group-hover:translate-x-1.5 transition-transform shrink-0 ml-2 flex items-center gap-1.5">
                          <span>CASE STUDY</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}

              {/* View All Services End Card */}
              <div className="service-card w-[86vw] sm:w-[400px] md:w-[440px] aspect-[16/11] shrink-0 flex items-center justify-center p-6 sm:p-8 border border-white/20 rounded-3xl bg-gradient-to-br from-[#17130f]/90 via-[#14110d]/90 to-[#0a0907]/90 backdrop-blur-2xl hover:border-white/40/70 hover:shadow-[0_25px_60px_rgba(255,255,255,0.15)] transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
                <Link
                  to="/work"
                  onClick={(e) => {
                    if (hasMovedRef.current) {
                      e.preventDefault();
                    }
                  }}
                  className="text-center group flex flex-col items-center justify-center gap-3.5 w-full h-full"
                >
                  <div className="w-14 h-14 rounded-full bg-white text-black hover:bg-neutral-200 flex items-center justify-center transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.15)] group-hover:scale-110">
                    <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-white font-bold">
                    FULL PORTFOLIO
                  </span>
                  <span className="text-xl sm:text-2xl font-display font-extrabold uppercase tracking-tight text-white group-hover:text-white transition-colors leading-tight">
                    EXPLORE ALL 13 PRODUCTIONS
                  </span>
                  <span className="text-[11px] font-mono text-[#fbf7ee]/60">
                    4K MASTER CUTS • CASE STUDIES
                  </span>
                </Link>
              </div>
            </div>
          ) : (
            /* View Mode 2: Responsive Bento / Cinema Showcase Grid */
            <div className="px-5 sm:px-8 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, idx) => {
                const heroImg = project.thumbnail || project.gallery[0];
                const displayNumber = String(idx + 1).padStart(2, "0");

                return (
                  <Link
                    to={`/work/${project.slug}`}
                    key={project.slug}
                    className="group relative flex flex-col aspect-[16/11] rounded-3xl overflow-hidden border border-white/15 bg-[#14110d] shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.08)] hover:border-white/40/60 hover:shadow-[0_25px_65px_rgba(255,255,255,0.15)] transition-all duration-500"
                    aria-label={`View ${project.title} service`}
                  >
                    <img
                      src={heroImg}
                      alt={`${project.title} - ${project.category}`}
                      loading="lazy"
                      width="540"
                      height="370"
                      decoding="async"
                      className="object-cover w-full h-full absolute inset-0 filter contrast-[1.08] brightness-[0.88] group-hover:brightness-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-[#080706]/55 to-transparent pointer-events-none" />

                    <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between gap-3">
                      <span className="px-3.5 py-1.5 bg-[#080706]/75 backdrop-blur-xl text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase text-white rounded-full border border-white/20 shadow-md truncate max-w-[75%]">
                        {project.category}
                      </span>
                      <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-white bg-[#080706]/75 px-3 py-1.5 rounded-xl border border-white/20 backdrop-blur-xl shadow-md shrink-0">
                        {displayNumber}
                      </span>
                    </div>

                    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                      <div className="w-14 h-14 rounded-full bg-white text-black hover:bg-neutral-200 flex items-center justify-center shadow-[0_0_35px_rgba(255,255,255,0.15)] scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                        <Play className="w-5 h-5 fill-current text-[#080706] ml-0.5" />
                      </div>
                    </div>

                    <div className="relative z-10 p-5 sm:p-6 mt-auto space-y-1.5">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-white/80 tracking-widest uppercase font-semibold">
                        <span>VIYANA</span>
                        <span>•</span>
                        <span>{project.year}</span>
                        <span>•</span>
                        <span className="truncate">{project.client}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight leading-tight group-hover:text-white transition-all line-clamp-1 uppercase">
                        {project.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs font-mono text-white/75 pt-2 border-t border-white/15">
                        <span className="truncate max-w-[65%] font-medium text-[#fbf7ee]/70">
                          {project.deliverableType}
                        </span>
                        <span className="text-white font-bold group-hover:translate-x-1 transition-transform shrink-0 ml-2 flex items-center gap-1">
                          <span>CASE STUDY</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}

              <div className="aspect-[16/11] flex items-center justify-center p-6 border border-white/20 rounded-3xl bg-gradient-to-br from-[#17130f]/90 via-[#14110d]/90 to-[#0a0907]/90 backdrop-blur-2xl hover:border-white/40/70 hover:shadow-[0_25px_60px_rgba(255,255,255,0.15)] transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
                <Link
                  to="/work"
                  className="text-center group flex flex-col items-center justify-center gap-3.5 w-full h-full"
                >
                  <div className="w-14 h-14 rounded-full bg-white text-black hover:bg-neutral-200 flex items-center justify-center transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.15)] group-hover:scale-110">
                    <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-white font-bold">
                    FULL ARCHIVE
                  </span>
                  <span className="text-xl sm:text-2xl font-display font-extrabold uppercase tracking-tight text-white group-hover:text-white transition-colors leading-tight">
                    EXPLORE ALL 13 PRODUCTIONS
                  </span>
                </Link>
              </div>
            </div>
          )}

          {/* Bottom Status Bar for Carousel View */}
          {viewMode === "carousel" && (
            <div className="w-full px-5 sm:px-8 lg:px-16 flex items-center justify-between text-[11px] sm:text-xs font-mono text-white/50 z-20 pt-2">
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="tracking-wider uppercase font-semibold text-white">
                  {String(Math.min(filteredProjects.length, activeServiceIdx + 1)).padStart(2, "0")} / {String(filteredProjects.length).padStart(2, "0")} CURATED WORKS
                </span>

                {/* Luxury Progress Scrub Bar */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-20 sm:w-28 md:w-44 lg:w-56 h-1.5 bg-white/10 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-white to-neutral-400 rounded-full transition-all duration-150 ease-out shadow-[0_0_10px_rgba(255,255,255,0.15)]"
                      style={{ width: `${Math.max(6, scrollProgress)}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-white/70 tracking-wider font-semibold">
                    {Math.round(scrollProgress)}%
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden md:inline-block text-[10px] text-white/60 uppercase tracking-widest font-mono">
                  DRAG OR USE ARROWS
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => scrollServices("left")}
                    aria-label="Previous work"
                    type="button"
                    className="w-10 h-10 rounded-full border border-white/20 bg-[#17130f]/90 backdrop-blur-md text-white hover:bg-white text-black hover:text-[#080706] flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-md hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scrollServices("right")}
                    aria-label="Next work"
                    type="button"
                    className="w-10 h-10 rounded-full border border-white/20 bg-[#17130f]/90 backdrop-blur-md text-white hover:bg-white text-black hover:text-[#080706] flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-md hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* MODELS & PORTFOLIO DIRECTION (WHERE CHARACTER MEETS CINEMATIC LIGHT) */}
      <section className="relative w-full py-20 sm:py-32 px-5 sm:px-8 lg:px-16 border-t border-white/10 bg-black/60 backdrop-blur-md text-[#fbf7ee] overflow-hidden">
        {/* Subtle Ambient Radial Glow Mesh */}
        <div
          className="absolute top-1/3 right-1/4 w-[750px] h-[450px] bg-[radial-gradient(circle,rgba(255,255,255,0.15)_0%,rgba(212,160,54,0.15)_60%,transparent_80%)] blur-3xl pointer-events-none rounded-full"
          style={{ contain: "strict", transform: "translateZ(0)" }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Column: Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase text-[#f3f3ef] tracking-tight leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                WHERE CHARACTER MEETS <br className="hidden sm:inline" />
                <span className="text-[#fbf7ee]/60">CINEMATIC LIGHT.</span>
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-white font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                <p>
                  Beyond traditional portraiture, Viyana Productions approaches model portfolios and commercial fashion shoots with the rigor of a cinema set. Every frame is composed with intentional lighting, authentic cultural presence, and high-fashion aesthetics that capture both vulnerability and undeniable strength.
                </p>
                <p>
                  From traditional Indian haute couture and saree editorials to modern commercial brand portfolios, we curate the entire visual atmosphere—mastering key-to-fill ratios, jewelry and textile illumination, and character-driven movement.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto">
                <Link
                  to="/work/models-portfolio-shoots"
                  className="group w-full sm:w-auto text-center px-8 py-4 rounded-full bg-white text-black hover:bg-neutral-200 font-mono text-xs uppercase tracking-wider font-bold hover:shadow-[0_15px_45px_rgba(255,255,255,0.15)] hover:brightness-105 active:scale-95 transition-all shadow-[0_10px_35px_rgba(255,255,255,0.15),inset_0_1px_1px_rgba(255,255,255,0.6)] inline-flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <span>VIEW MODEL PORTFOLIOS</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/contact"
                  className="group w-full sm:w-auto text-center px-8 py-4 rounded-full bg-white/5 hover:bg-white/15 border border-white/20 hover:border-white/40 text-[#fbf7ee] font-mono text-xs uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2.5 active:scale-95 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                >
                  <span>BOOK A PORTFOLIO SHOOT</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Model Image with Luxury Dual-Border Halo */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md lg:max-w-none aspect-[4/5] rounded-3xl p-1 bg-gradient-to-br from-white/30 via-white/10 to-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.95)] group">
                <div className="w-full h-full rounded-[22px] overflow-hidden bg-[#14110d] relative">
                  <img
                    src="/images/models-portfolio-saree.jpg"
                    alt="Viyana Productions Models Portfolio Shoot"
                    loading="lazy"
                    decoding="async"
                    width="480"
                    height="600"
                    className="w-full h-full object-cover object-[center_top] filter contrast-[1.05] brightness-95 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CLIENT STORIES VIDEO TESTIMONIALS (AUTOMATIC RUNNING MARQUEE) */}
      <section className="relative w-full py-20 sm:py-32 border-t border-white/10 bg-black/60 backdrop-blur-md overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 space-y-6">
          {/* Header without arrow buttons */}
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/70 block mb-3 font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/15 w-fit">
              03 / CLIENT PERSPECTIVES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-[#f3f3ef] leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
              Client stories, not just client logos.
            </h2>
            <p className="text-base sm:text-lg text-white font-medium leading-relaxed mt-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              Real client feedback that shows how brands and creators experience Viyana Productions&apos; planning, production, and delivery on shoots, films, and visual content.
            </p>
          </div>
        </div>

        {/* Automatic Smooth Continuous Scrolling Track */}
        <div className="relative w-full mt-10 sm:mt-14 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_4%,black_96%,transparent)]">
          <div className="ve-testimonial-track py-3">
            {[...testimonials, ...testimonials].map((item, idx) => (
              <article
                key={`${item.id}-${idx}`}
                className="group shrink-0 w-[84vw] sm:w-[460px] md:w-[500px] mx-3 sm:mx-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1a1611]/95 via-[#14110d]/90 to-[#0a0907]/95 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:border-white/40/55 transition-all duration-300 flex flex-col justify-between select-none"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-white/70 font-medium px-2.5 py-1 rounded-full bg-white/5 border border-white/15">
                      {item.label}
                    </span>
                    <button
                      onClick={() =>
                        setActiveModalVideo({
                          src: item.videoSrc,
                          title: item.client,
                          category: "Client Video Testimonial",
                        })
                      }
                      type="button"
                      aria-label={`Play testimonial from ${item.client}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white text-black text-white hover:text-[#080706] border border-white/20 text-[10px] font-mono uppercase tracking-wider transition-all active:scale-95 cursor-pointer shadow-sm"
                    >
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>Watch</span>
                    </button>
                  </div>

                  <blockquote className="text-sm sm:text-base md:text-lg font-display font-medium text-[#fbf7ee] leading-relaxed italic">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <cite className="text-xs sm:text-sm font-mono uppercase tracking-wider text-white font-semibold not-italic">
                    — {item.client}
                  </cite>
                  <div className="flex items-center gap-0.5 text-white text-xs tracking-widest select-none drop-shadow-[0_0_6px_rgba(255,255,255,0.15)]" aria-label="5 stars rating">
                    ★★★★★
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BUILT FOR BRANDS WITH BIG IDEAS (WHAT WE CREATE + BOTTOM CTA) */}
      <section className="relative w-full py-24 sm:py-32 px-5 sm:px-8 lg:px-16 border-t border-white/10 bg-black/60 backdrop-blur-md overflow-hidden">
        {/* Subtle background ambient glow mesh */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-[radial-gradient(circle,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.15)_50%,transparent_80%)] rounded-full blur-3xl pointer-events-none"
          style={{ contain: "strict", transform: "translateZ(0)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto space-y-16 sm:space-y-20">
          {/* Top Section Header */}
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/70 block font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/15 w-fit">
              WHAT WE CREATE
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-[#f3f3ef] leading-[1.08] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
              BUILT FOR BRANDS WITH BIG IDEAS
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white font-medium leading-relaxed pt-1 max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              From startups and growing businesses to established brands, Viyana Productions creates impactful visual content that brings ideas to life and helps businesses connect with their audience.
            </p>
          </div>

          {/* 4 Cards Grid - WHAT WE CREATE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                index: "01",
                title: "CORPORATE",
                description: "Professional films that showcase your company, people, and vision.",
                icon: Film,
              },
              {
                index: "02",
                title: "PRODUCT",
                description: "Visual content that makes your products stand out.",
                icon: Camera,
              },
              {
                index: "03",
                title: "BRAND STORIES",
                description: "Creative storytelling that builds brand identity and connection.",
                icon: Video,
              },
              {
                index: "04",
                title: "DIGITAL CONTENT",
                description: "Engaging videos designed for websites, social media, and campaigns.",
                icon: MonitorPlay,
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="group relative p-8 sm:p-9 rounded-3xl bg-[#14110d]/80 backdrop-blur-2xl border border-white/15 hover:border-white/40/60 hover:-translate-y-1.5 shadow-[0_15px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.08)] hover:shadow-[0_25px_60px_rgba(255,255,255,0.15)] transition-all duration-300 flex flex-col justify-between min-h-[230px] sm:min-h-[250px] overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-white tracking-widest font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/15">
                        {card.index}
                      </span>
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-white/15 to-white/5 border border-white/20 flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:scale-110 transition-transform">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white uppercase tracking-tight mb-2.5">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-normal">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA Banner */}
          <div className="relative rounded-3xl border border-white/20 bg-gradient-to-br from-[#1a1611]/95 via-[#13100c]/85 to-[#0a0907] backdrop-blur-3xl p-8 sm:p-14 lg:p-16 overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.12)]">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[radial-gradient(circle,rgba(255,255,255,0.15)_0%,transparent_70%)] pointer-events-none blur-3xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="max-w-2xl space-y-3">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/70 block font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/15 w-fit">
                  GET STARTED
                </span>
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-[#f3f3ef] leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                  HAVE A STORY TO TELL?
                </h3>
                <p className="text-sm sm:text-base text-[#fbf7ee]/80 font-normal leading-relaxed">
                  Let’s turn your idea into something people remember.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-white text-black hover:bg-neutral-200 font-mono text-xs uppercase tracking-wider font-bold hover:shadow-[0_15px_45px_rgba(255,255,255,0.15)] hover:brightness-105 active:scale-95 transition-all shadow-[0_10px_35px_rgba(255,255,255,0.15),inset_0_1px_1px_rgba(255,255,255,0.6)] cursor-pointer"
                >
                  <span>START A PROJECT</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LATEST WORK SHOWCASE GRID (VE-WORK-GRID) */}
      <section className="relative w-full py-20 sm:py-32 px-5 sm:px-8 lg:px-16 border-t border-white/15 bg-black/25 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15)_0%,transparent_70%)] pointer-events-none blur-3xl" />

        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          {/* Section Head */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/80 block mb-3 font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/15 w-fit">
                03 / SELECTED FILM ARCHIVE
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-[#f3f3ef] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                Latest corporate, product, and industrial video work.
              </h2>
            </div>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white text-black hover:text-[#080706] text-white font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.08)] hover:shadow-[0_10px_30px_rgba(255,255,255,0.15)] shrink-0 w-fit"
            >
              <span>VIEW ALL WORK (13)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 3-Column Work Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project, idx) => (
              <Link
                key={project.slug}
                to={`/work/${project.slug}`}
                className="group relative min-h-[380px] sm:min-h-[420px] rounded-2xl overflow-hidden border border-white/15 bg-[#14110d] shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.08)] flex flex-col justify-end p-6 sm:p-8 transition-all duration-500 hover:border-white/40/55 hover:shadow-[0_25px_60px_rgba(255,255,255,0.15)]"
              >
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="420"
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-[#080706]/55 to-transparent pointer-events-none" />

                {/* Card Tags & Details */}
                <div className="relative z-10 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="bg-black/20 px-3.5 py-1 rounded-full border border-white/20 uppercase tracking-wider text-white font-semibold shadow-sm">
                      {project.category}
                    </span>
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-white">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-white transition-colors uppercase tracking-tight pt-1 drop-shadow-md">
                    {project.title}
                  </h3>

                  <p className="text-xs font-mono uppercase tracking-wider text-[#fbf7ee]/65">
                    {project.client} • {project.year}
                  </p>

                  <div className="pt-3 flex items-center text-xs font-mono font-semibold text-white group-hover:text-white transition-colors">
                    <span>VIEW CASE STUDY</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PRODUCTION WORKFLOW PROCESS CARD (VE-PROCESS-CARD) */}
      <section className="relative w-full py-20 sm:py-32 px-5 sm:px-8 lg:px-16 border-t border-white/15 bg-black/20 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute bottom-0 left-1/3 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.15)_0%,transparent_70%)] pointer-events-none blur-3xl" />

        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          {/* Section Head */}
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/80 block mb-3 font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/15 w-fit">
              04 / PRODUCTION ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-[#f3f3ef] leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
              One team from first idea to final film.
            </h2>
            <p className="text-base sm:text-lg text-white font-medium leading-relaxed mt-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              A disciplined 5-stage production pipeline designed for creative clarity, transparent collaboration, and broadcast-grade finishing.
            </p>
          </div>

          {/* 5-Step Process Flow */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#14110d]/90 to-[#0d0b09]/90 border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.08)] backdrop-blur-2xl space-y-8">
            <div className="border-b border-white/15 pb-5 flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-white font-bold">
                END-TO-END WORKFLOW PIPELINE
              </span>
              <span className="text-xs font-mono text-white/60 font-semibold">5 PHASES • 100% TRANSPARENCY</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
              {[
                {
                  step: "01",
                  title: "CONCEPT & SCRIPT",
                  desc: "Creative strategy, pitch deck, scriptwriting & storyboard.",
                },
                {
                  step: "02",
                  title: "PRE-PRODUCTION",
                  desc: "Casting, technical recce, production design & scheduling.",
                },
                {
                  step: "03",
                  title: "SHOOT & DIRECTION",
                  desc: "Arri/RED camera package, precision cinema lighting & live feeds.",
                },
                {
                  step: "04",
                  title: "EDIT & COLOR",
                  desc: "Narrative assembly, DaVinci Resolve ACES grade, sound & VFX.",
                },
                {
                  step: "05",
                  title: "DELIVERY & CUTS",
                  desc: "Broadcast masters, 4K web masters & high-impact vertical cuts.",
                },
              ].map((item, idx) => (
                <div
                  key={item.step}
                  className="relative p-5 sm:p-6 rounded-2xl bg-[#1a1611]/70 border border-white/15 hover:border-white/40/55 hover:bg-[#221c14]/85 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col justify-between min-h-[160px] group"
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-4">
                    <span className="font-bold text-white px-2.5 py-1 rounded-full bg-white/10 border border-white/20">
                      {item.step}
                    </span>
                    {idx < 4 && <span className="hidden lg:inline text-white/50 font-bold group-hover:translate-x-0.5 transition-transform">→</span>}
                  </div>
                  <div>
                    <strong className="text-sm font-display font-bold text-white block uppercase tracking-tight mb-2">
                      {item.title}
                    </strong>
                    <p className="text-xs text-neutral-200 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. VIDEO PRODUCTION FAQ ACCORDION (VE-FAQ) */}
      <section className="relative w-full py-20 sm:py-32 px-5 sm:px-8 lg:px-16 border-t border-white/15 bg-black/25 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15)_0%,transparent_70%)] pointer-events-none blur-3xl" />

        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          {/* Section Head */}
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/80 block mb-3 font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/15 w-fit mx-auto">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-[#f3f3ef] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
              Frequently Asked Questions
            </h2>
          </div>

          {/* 2 Columns: 5 Left, 5 Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start">
            {/* Left Column (1 to 5) */}
            <div className="space-y-4">
              {faqs.slice(0, 5).map((faq, idx) => {
                const index = idx;
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={faq.question}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "border-l-4 border-l-white border-white/30 bg-gradient-to-r from-[#1e1912]/95 to-[#16120e]/95 shadow-[0_12px_36px_rgba(0,0,0,0.6),0_0_25px_rgba(255,255,255,0.15),inset_0_1px_1px_rgba(255,255,255,0.08)]"
                        : "border-white/10 bg-[#13100c]/60 hover:border-white/20 hover:bg-[#1a1611]/70 shadow-[0_6px_20px_rgba(0,0,0,0.3)]"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      type="button"
                      className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <span className="font-mono text-xs text-white font-bold px-2 py-0.5 rounded bg-white/5 border border-white/15 pt-0.5 shrink-0">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm sm:text-base font-semibold text-white tracking-tight leading-snug">
                          {faq.question}
                        </span>
                      </div>
                      <div className={`p-1.5 rounded-full border shrink-0 transition-colors duration-300 mt-0.5 ml-2 ${
                        isOpen ? "bg-white/15 border-white/30 text-white" : "bg-white/5 border-white/10 text-white/60"
                      }`}>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            isOpen ? "rotate-180 text-white" : ""
                          }`}
                        />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="bg-white text-neutral-900 px-5 py-4 sm:px-6 sm:py-5 text-xs sm:text-sm leading-relaxed border-t border-neutral-200">
                            <p className="text-neutral-800 font-normal leading-relaxed pl-7 sm:pl-9">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Right Column (6 to 10) */}
            <div className="space-y-4">
              {faqs.slice(5, 10).map((faq, idx) => {
                const index = idx + 5;
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={faq.question}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "border-l-4 border-l-white border-white/30 bg-gradient-to-r from-[#1e1912]/95 to-[#16120e]/95 shadow-[0_12px_36px_rgba(0,0,0,0.6),0_0_25px_rgba(255,255,255,0.15),inset_0_1px_1px_rgba(255,255,255,0.08)]"
                        : "border-white/10 bg-[#13100c]/60 hover:border-white/20 hover:bg-[#1a1611]/70 shadow-[0_6px_20px_rgba(0,0,0,0.3)]"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      type="button"
                      className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <span className="font-mono text-xs text-white font-bold px-2 py-0.5 rounded bg-white/5 border border-white/15 pt-0.5 shrink-0">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm sm:text-base font-semibold text-white tracking-tight leading-snug">
                          {faq.question}
                        </span>
                      </div>
                      <div className={`p-1.5 rounded-full border shrink-0 transition-colors duration-300 mt-0.5 ml-2 ${
                        isOpen ? "bg-white/15 border-white/30 text-white" : "bg-white/5 border-white/10 text-white/60"
                      }`}>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            isOpen ? "rotate-180 text-white" : ""
                          }`}
                        />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="bg-white text-neutral-900 px-5 py-4 sm:px-6 sm:py-5 text-xs sm:text-sm leading-relaxed border-t border-neutral-200">
                            <p className="text-neutral-800 font-normal leading-relaxed pl-7 sm:pl-9">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 9. CONTACT STRIP BANNER (VE-CONTACT-STRIP EXACT LAYOUT) */}
      <section className="relative w-full py-20 sm:py-32 px-5 sm:px-8 lg:px-16 border-t border-white/15 bg-black/30 text-center overflow-hidden">
        {/* Central Ambient Gold Spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,rgba(5,10,18,0)_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/80 block font-semibold px-3.5 py-1 rounded-full bg-white/5 border border-white/15 w-fit mx-auto">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight text-[#f3f3ef] leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            Tell us what you need to communicate.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:text-sm text-[#fbf7ee]/75 font-mono tracking-wider max-w-2xl mx-auto">
            <a href="mailto:creative@viyana.productions" className="hover:text-white underline underline-offset-4 transition-colors">
              creative@viyana.productions
            </a>
            <span className="text-white/40">•</span>
            <a href="mailto:director@viyana.productions" className="hover:text-white underline underline-offset-4 transition-colors">
              director@viyana.productions
            </a>
            <span className="text-white/40">•</span>
            <a href="tel:+919187233615" className="hover:text-white transition-colors">
              +91 91872 33615
            </a>
            <span className="text-white/40">•</span>
            <span>Bangalore, India</span>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-9 py-4 rounded-full bg-white text-black hover:bg-neutral-200 font-mono text-xs uppercase tracking-widest font-bold hover:shadow-[0_15px_45px_rgba(255,255,255,0.15)] hover:brightness-105 active:scale-95 transition-all shadow-[0_10px_35px_rgba(255,255,255,0.15),inset_0_1px_1px_rgba(255,255,255,0.6)] flex items-center gap-2 group cursor-pointer"
            >
              <span>START A PROJECT</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/work"
              className="px-9 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/20 hover:border-white/40 text-[#fbf7ee] hover:bg-white/15 hover:text-white font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-[0_10px_30px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.06)]"
            >
              <span>EXPLORE PORTFOLIO</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Global Interactive Video Modal for Testimonials & Showreel */}
      {activeModalVideo && (
        <VideoModal
          isOpen={!!activeModalVideo}
          onClose={() => setActiveModalVideo(null)}
          videoSrc={activeModalVideo.src}
          title={activeModalVideo.title}
          category={activeModalVideo.category}
        />
      )}

      <Footer />
    </main>
  );
}
