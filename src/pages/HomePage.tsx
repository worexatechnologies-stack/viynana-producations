"use client";

import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoModal from "@/components/VideoModal";
import { projects } from "@/data/projects";
import {
  ArrowRight,
  ArrowLeft,
  Play,
  ChevronDown,
  Award,
  Video,
  Globe,
  Film,
  Camera,
  Layers,
  MonitorPlay,
  CheckCircle2,
} from "lucide-react";



// Major video production services for the floating staggered slider
const floatingServices = [
  {
    title: "Commercial Ads",
    subtitle: "High-impact TV & digital commercials",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1500&auto=format&fit=crop",
    link: "/services/ad-agency",
    offset: "normal",
  },
  {
    title: "Cinematic Content Shoot",
    subtitle: "Large format cinema lighting & craft",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1500&auto=format&fit=crop",
    link: "/services/ads-videos",
    offset: "low",
  },
  {
    title: "Advertisement",
    subtitle: "Brand storytelling & campaign films",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1500&auto=format&fit=crop",
    link: "/services/ads-videos",
    offset: "high",
  },
  {
    title: "Models Portfolio Shoots",
    subtitle: "Editorial & fashion portfolio photography",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1500&auto=format&fit=crop",
    link: "/services/product-shoot",
    offset: "normal",
  },
  {
    title: "Vertical Series",
    subtitle: "Short-form mobile-first content series",
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1500&auto=format&fit=crop",
    link: "/services/ads-videos",
    offset: "low",
  },
  {
    title: "Web Series",
    subtitle: "Multi-episode scripted digital originals",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1500&auto=format&fit=crop",
    link: "/work",
    offset: "high",
  },
  {
    title: "Short Films",
    subtitle: "Narrative cinema & festival submissions",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1500&auto=format&fit=crop",
    link: "/work",
    offset: "normal",
  },
  {
    title: "Film Production",
    subtitle: "Full-scale feature & commercial films",
    image: "https://images.unsplash.com/photo-1569701813229-33284b643e3c?q=80&w=1500&auto=format&fit=crop",
    link: "/services/ads-videos",
    offset: "low",
  },
  {
    title: "Graphic Design",
    subtitle: "Motion graphics, titles & visual identity",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1500&auto=format&fit=crop",
    link: "/services/ad-agency",
    offset: "high",
  },
  {
    title: "Product Shoot",
    subtitle: "E-commerce, launches & macro detail",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1500&auto=format&fit=crop",
    link: "/services/product-shoot",
    offset: "normal",
  },
  {
    title: "Influencer Shoot",
    subtitle: "Creator content & brand collaborations",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=1500&auto=format&fit=crop",
    link: "/services/ads-videos",
    offset: "low",
  },
  {
    title: "Studio Rental",
    subtitle: "Acoustic stage & live 4K multi-cam",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1500&auto=format&fit=crop",
    link: "/services/studio-rental",
    offset: "high",
  },
  {
    title: "Podcast Production",
    subtitle: "Audio & video podcast studio sessions",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1500&auto=format&fit=crop",
    link: "/services/studio-rental",
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

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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

  // Mouse drag-to-scroll tracking
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const hasMovedRef = useRef(false);
  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  // Section-wide smooth mouse wheel horizontal scrolling
  useEffect(() => {
    const section = selectedWorkSectionRef.current;
    const slider = servicesSliderRef.current;
    if (!section || !slider) return;

    targetScrollRef.current = slider.scrollLeft;
    currentScrollRef.current = slider.scrollLeft;

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const updateScroll = () => {
      if (!slider) return;
      const diff = targetScrollRef.current - currentScrollRef.current;

      if (Math.abs(diff) > 0.4) {
        currentScrollRef.current = lerp(currentScrollRef.current, targetScrollRef.current, 0.16);
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

      // Only transition to vertical page scroll after completely finishing all cards
      const isCompletelyAtEnd = slider.scrollLeft >= maxScroll - 6 && targetScrollRef.current >= maxScroll - 6;
      const isCompletelyAtStart = slider.scrollLeft <= 6 && targetScrollRef.current <= 6;

      if ((isScrollingDown && isCompletelyAtEnd) || (isScrollingUp && isCompletelyAtStart)) {
        targetScrollRef.current = isScrollingDown ? maxScroll : 0;
        currentScrollRef.current = targetScrollRef.current;
        slider.scrollLeft = targetScrollRef.current;

        // Smoothly delegate vertical page scroll to Lenis
        e.preventDefault();
        e.stopPropagation();

        const currentLenis = lenisRef.current;
        if (currentLenis) {
          currentLenis.scrollTo(currentLenis.scroll + e.deltaY, { programmatic: false });
        } else {
          window.scrollBy({ top: e.deltaY, behavior: "auto" });
        }
        return;
      }

      // Smooth horizontal gliding through selected work cards
      e.preventDefault();
      e.stopPropagation();

      const rawDelta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 120);
      const step = rawDelta * 2.4;

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
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
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
    if (!isDraggingRef.current) return;
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

  const scrollServices = (direction: "left" | "right") => {
    if (servicesSliderRef.current) {
      const card = servicesSliderRef.current.querySelector<HTMLElement>(".service-card");
      const cardWidth = card ? card.offsetWidth + 24 : 440;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      servicesSliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleServicesScroll = () => {
    if (servicesSliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = servicesSliderRef.current;
      const max = scrollWidth - clientWidth;
      if (max > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollLeft / max) * 100)));
      }
      const card = servicesSliderRef.current.querySelector<HTMLElement>(".service-card");
      const cardWidth = card ? card.offsetWidth + 24 : 440;
      const idx = Math.min(
        projects.length - 1,
        Math.max(0, Math.round(scrollLeft / cardWidth))
      );
      setActiveServiceIdx(idx);
    }
  };

  return (
    <main
      ref={containerRef}
      className="relative w-full bg-[#050505] text-[#f3f3ef] min-h-screen overflow-x-hidden selection:bg-white selection:text-black font-sans"
    >
      <Navbar />

      {/* 1. HERO SECTION (VE-HERO SIGNATURE LOOK) */}
      <header className="relative w-full min-h-[100svh] flex flex-col px-6 sm:px-10 lg:px-16 overflow-hidden pt-20 sm:pt-24 pb-6 sm:pb-8">
        {/* Parallax Video Background */}
        <motion.div
          style={{ y: yHeroVideo }}
          className="absolute inset-0 -top-[5%] w-full h-[110%] z-0 pointer-events-none will-change-transform"
        >
          <video
            ref={heroVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/hero-poster.jpg"
            className="w-full h-full object-cover filter brightness-[0.78] contrast-[1.08] saturate-[1.05]"
          >
            <source src="/13232-246463976_medium.mp4" type="video/mp4" />
          </video>
          {/* Visual Entity signature layered ambient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/35 to-[#050505]/65" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_20%,#050505_95%)]" />
        </motion.div>



        {/* Content block — mt-auto always pushes this to the bottom, identical on both Mac & Windows */}
        <div className="relative z-20 max-w-5xl mt-auto mb-[clamp(3rem,13vh,7rem)]">
          <div className="space-y-3 sm:space-y-4">
            <span className="text-[11px] sm:text-xs font-mono tracking-[0.25em] uppercase text-white/60 font-medium block">
              VIDEO PRODUCTION • BRAND FILMS • CORPORATE • INDUSTRIAL • PRODUCT
            </span>

            <h1 className="text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.5rem] font-display font-extrabold tracking-tight text-[#f3f3ef] uppercase leading-[1.04] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] max-w-4xl">
              BRING YOUR BRAND TO LIFE THROUGH POWERFUL VISUAL STORIES
            </h1>

            <p className="text-xs sm:text-sm text-[#f3f3ef]/80 font-normal leading-relaxed max-w-2xl pt-0.5">
              Viyana Productions is a Bangalore-based video production studio creating corporate films, industrial videos, product films, brand stories, and digital content that help businesses communicate with clarity and impact. From corporate films and product videos to industrial storytelling and brand content, Viyana Productions creates high-quality videos designed to engage audiences and elevate your brand.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() =>
                  setActiveModalVideo({
                    src: "/showreel-video-4k-h264.mp4",
                    title: "Viyana Productions Showreel",
                    category: "Commercial & Cinema Master",
                  })
                }
                type="button"
                className="px-6 py-3 rounded-full bg-[#f3f3ef] text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-white active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.25)] flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>WATCH SHOWREEL</span>
              </button>

              <Link
                to="/services"
                className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/50 text-[#f3f3ef] font-mono text-xs uppercase tracking-wider font-medium hover:bg-white/15 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>EXPLORE SERVICES</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </header>



      {/* 3. COMPANY IMPACT BAND & 4-COLUMN STATS GRID (VE-BAND) */}
      <section className="relative w-full py-20 sm:py-32 px-5 sm:px-8 lg:px-16 border-t border-white/10 mt-16 bg-[#070707]">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Two-Column Section Head */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-[#f3f3ef] leading-tight">
                VIDEO PRODUCTION THAT MOVES PEOPLE &amp; BRANDS
              </h2>
            </div>
            <div className="lg:col-span-5 text-sm sm:text-base text-white/65 font-normal leading-relaxed space-y-3">
              <p>
                From the first idea to the final frame, Viyana Productions creates cinematic visual content that helps brands tell their story, showcase their products, and connect with their audience.
              </p>
              <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-white/50">
                Corporate Films • Product Videos • Industrial Films • Brand Films • Documentaries • Commercials
              </p>
            </div>
          </div>

          {/* 4-Column Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { stat: "1+", label: "YEAR OF CREATIVE EXPERIENCE" },
              { stat: "10+", label: "PROJECTS COMPLETED" },
              { stat: "15+", label: "VIDEOS PRODUCED" },
              { stat: "BENGALURU", label: "BASED PRODUCTION STUDIO" },
            ].map((item) => (
              <div
                key={item.stat}
                className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)] hover:border-white/25 transition-colors flex flex-col justify-between"
              >
                <strong className={`font-display font-extrabold text-[#f3f3ef] tracking-tight block ${item.stat.length > 5 ? "text-2xl sm:text-3xl lg:text-4xl" : "text-3xl sm:text-4xl md:text-5xl"}`}>
                  {item.stat}
                </strong>
                <span className="text-xs sm:text-sm text-white/55 font-normal mt-3 block leading-relaxed uppercase tracking-wider font-mono">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/work"
              className="px-7 py-3 rounded-full bg-[#f3f3ef] text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-white active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.2)] flex items-center gap-2"
            >
              <span>OUR WORK</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/contact"
              className="px-7 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/50 text-[#f3f3ef] font-mono text-xs uppercase tracking-wider font-medium hover:bg-white/15 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>START A PROJECT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      <section
        ref={selectedWorkSectionRef}
        className="relative w-full py-16 sm:py-24 border-t border-white/10 bg-[#060606] overflow-hidden"
      >
        {/* Subtle ambient glow */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-white/[0.015] rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full space-y-8 sm:space-y-10">
          {/* Top Header Bar */}
          <div className="w-full px-5 sm:px-8 lg:px-16 flex items-center justify-between z-20">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-xs sm:text-sm font-mono text-white/40 tracking-widest font-semibold">[ 02 ]</span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white uppercase flex items-center gap-2">
                <span>SELECTED WORK</span>
                <span className="text-white/40">→</span>
              </h2>
            </div>
            
            <Link
              to="/work"
              className="px-4 sm:px-5 py-2 sm:py-2.5 border border-white/20 hover:border-white rounded-full text-[11px] sm:text-xs font-mono tracking-widest uppercase text-white hover:bg-white hover:text-black transition-all flex items-center gap-2 group shadow-sm"
            >
              <span>VIEW ALL ({String(projects.length).padStart(2, "0")})</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          </div>

          {/* Horizontal Carousel Track - Smooth inertia scroll */}
          <div
            ref={servicesSliderRef}
            onScroll={handleServicesScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className="flex flex-row overflow-x-auto gap-4 sm:gap-6 px-5 sm:px-8 lg:px-16 w-full items-stretch ve-scrollbar-none touch-pan-x py-2 cursor-grab active:cursor-grabbing select-none"
          >
            {projects.map((project, idx) => {
              const heroImg = project.thumbnail || project.gallery[0];
              const displayNumber = String(idx + 1).padStart(2, "0");

              return (
                <Link
                  to={`/work/${project.slug}`}
                  key={project.slug}
                  onClick={(e) => {
                    if (hasMovedRef.current) {
                      e.preventDefault();
                    }
                  }}
                  className="service-card group flex flex-col w-[82vw] sm:w-[380px] md:w-[420px] lg:w-[440px] aspect-[4/5] shrink-0 transition-all duration-300 hover:-translate-y-2 active:scale-[0.99] select-none"
                  aria-label={`View ${project.title} service`}
                >
                  <div className="relative w-full h-full overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-brand-dark shadow-[0_20px_50px_rgba(0,0,0,0.8)] group-hover:border-white/40 transition-all duration-500 flex flex-col justify-between">
                    {/* Background Image */}
                    <img
                      src={heroImg}
                      alt={`${project.title} - ${project.category}`}
                      className="object-cover w-full h-full absolute inset-0 filter contrast-[1.05] brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Overlay for high-contrast typography */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/25 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

                    {/* Top Row: Category Tag & Index Number */}
                    <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between gap-2">
                      <span className="px-3.5 py-1.5 bg-black/75 backdrop-blur-md text-[10px] sm:text-[11px] font-mono font-medium tracking-wider uppercase text-white rounded-full border border-white/20 shadow-md truncate max-w-[75%]">
                        {project.category}
                      </span>

                      <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-white bg-black/75 px-3 py-1.5 rounded-xl border border-white/20 backdrop-blur-md shadow-md shrink-0">
                        {displayNumber}
                      </span>
                    </div>

                    {/* Bottom Content Block */}
                    <div className="relative z-10 p-5 sm:p-6 mt-auto">
                      <span className="text-[10px] sm:text-[11px] font-mono text-white/60 block mb-1.5 tracking-widest uppercase font-medium">
                        VIYANA PRODUCTIONS • {project.year}
                      </span>

                      <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight leading-tight group-hover:text-brand-light transition-colors line-clamp-1 mb-2.5 uppercase">
                        {project.title}
                      </h3>

                      <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-white/65 pt-2 border-t border-white/15">
                        <span className="truncate max-w-[65%] font-medium">
                          {project.deliverableType}
                        </span>
                        <span className="text-white font-bold group-hover:translate-x-1 transition-transform shrink-0 ml-2 flex items-center gap-1">
                          <span>CASE STUDY</span>
                          <span>→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* View All Services End Card */}
            <div className="service-card w-[82vw] sm:w-[380px] md:w-[420px] lg:w-[440px] aspect-[4/5] shrink-0 flex items-center justify-center p-6 sm:p-10 border border-white/15 rounded-2xl sm:rounded-3xl bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/30 transition-all duration-300">
              <Link
                to="/work"
                onClick={(e) => {
                  if (hasMovedRef.current) {
                    e.preventDefault();
                  }
                }}
                className="text-center group flex flex-col items-center justify-center gap-4 w-full h-full"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-black flex items-center justify-center transition-all duration-300 shadow-lg">
                  <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-white/50 group-hover:text-white transition-colors">
                  PORTFOLIO
                </span>
                <span className="text-2xl sm:text-3xl font-display font-extrabold uppercase tracking-tight text-white group-hover:text-brand-light transition-colors">
                  EXPLORE ALL 13 SERVICES →
                </span>
                <span className="text-[11px] font-mono text-white/50">
                  13 DISCIPLINES • 4K MASTER CUTS
                </span>
              </Link>
            </div>
          </div>

          {/* Bottom Status Bar with Counter, Progress Bar & Arrow Controls */}
          <div className="w-full px-5 sm:px-8 lg:px-16 flex items-center justify-between text-[11px] sm:text-xs font-mono text-white/50 z-20 pt-2">
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="tracking-wider uppercase font-semibold text-white/70">
                {String(activeServiceIdx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} CURATED WORKS
              </span>

              {/* Luxury Progress Scrub Bar */}
              <div className="hidden sm:flex items-center gap-3">
                <div className="w-24 md:w-36 lg:w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-150 ease-out shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                    style={{ width: `${Math.max(6, scrollProgress)}%` }}
                  />
                </div>
                <span className="text-[10px] text-white/40 tracking-wider">
                  {Math.round(scrollProgress)}%
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden md:inline-block text-[10px] text-white/40 uppercase tracking-widest font-mono">
                MOUSE WHEEL TO SCROLL
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollServices("left")}
                  aria-label="Previous work"
                  type="button"
                  className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-sm"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => scrollServices("right")}
                  aria-label="Next work"
                  type="button"
                  className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-sm"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CLIENT STORIES VIDEO TESTIMONIALS (AUTOMATIC RUNNING MARQUEE) */}
      <section className="relative w-full py-20 sm:py-32 border-t border-white/10 bg-gradient-to-b from-[#111] to-[#070707] overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 space-y-6">
          {/* Header without arrow buttons */}
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/50 block mb-3 font-semibold">
              03 / CLIENT PERSPECTIVES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-[#f3f3ef] leading-tight">
              Client stories, not just client logos.
            </h2>
            <p className="text-sm sm:text-base text-white/60 font-normal leading-relaxed mt-3">
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
                className="shrink-0 w-[84vw] sm:w-[460px] md:w-[500px] mx-3 sm:mx-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between select-none"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-white/50 font-medium">
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
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/15 text-[10px] font-mono uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
                    >
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>Watch</span>
                    </button>
                  </div>

                  <blockquote className="text-sm sm:text-base md:text-lg font-display font-medium text-white leading-relaxed italic">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <cite className="text-xs sm:text-sm font-mono uppercase tracking-wider text-white font-semibold not-italic">
                    — {item.client}
                  </cite>
                  <div className="flex items-center gap-0.5 text-amber-400 text-xs tracking-widest select-none" aria-label="5 stars rating">
                    ★★★★★
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BUILT FOR BRANDS WITH BIG IDEAS (WHAT WE CREATE + BOTTOM CTA) */}
      <section className="relative w-full py-24 sm:py-32 px-5 sm:px-8 lg:px-16 border-t border-white/10 bg-[#060606] overflow-hidden">
        {/* Subtle background ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto space-y-16 sm:space-y-20">
          {/* Top Section Header */}
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/50 block font-semibold">
              WHAT WE CREATE
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-[#f4f4ec] leading-[1.08]">
              BUILT FOR BRANDS WITH BIG IDEAS
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/70 font-normal leading-relaxed pt-1 max-w-2xl">
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
                link: "/services/ad-agency",
              },
              {
                index: "02",
                title: "PRODUCT",
                description: "Visual content that makes your products stand out.",
                icon: Camera,
                link: "/services/product-shoot",
              },
              {
                index: "03",
                title: "BRAND STORIES",
                description: "Creative storytelling that builds brand identity and connection.",
                icon: Video,
                link: "/services/ads-videos",
              },
              {
                index: "04",
                title: "DIGITAL CONTENT",
                description: "Engaging videos designed for websites, social media, and campaigns.",
                icon: MonitorPlay,
                link: "/work",
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  to={card.link}
                  className="group relative p-8 sm:p-9 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/30 hover:bg-white/[0.06] transition-all duration-300 flex flex-col justify-between min-h-[260px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] hover:-translate-y-1.5"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-white/40 tracking-widest font-semibold">
                        {card.index}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-white/30 group-hover:bg-white/10 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white uppercase tracking-tight mb-2.5">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/65 leading-relaxed font-normal">
                        {card.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 flex items-center text-xs font-mono uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                    <span>EXPLORE</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bottom CTA Banner */}
          <div className="relative rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.07] via-white/[0.03] to-transparent backdrop-blur-xl p-8 sm:p-14 lg:p-16 overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="max-w-2xl space-y-3">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/50 block font-semibold">
                  GET STARTED
                </span>
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-[#f3f3ef] leading-tight">
                  HAVE A STORY TO TELL?
                </h3>
                <p className="text-sm sm:text-base text-white/75 font-normal leading-relaxed">
                  Let’s turn your idea into something people remember.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#f3f3ef] text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-white active:scale-95 transition-all shadow-[0_10px_35px_rgba(255,255,255,0.25)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.35)] cursor-pointer"
                >
                  <span>START A PROJECT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LATEST WORK SHOWCASE GRID (VE-WORK-GRID) */}
      <section className="relative w-full py-20 sm:py-32 px-5 sm:px-8 lg:px-16 border-t border-white/10 bg-[#070707]">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Head */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/50 block mb-3">
                03 / SELECTED FILM ARCHIVE
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-[#f3f3ef]">
                Latest corporate, product, and industrial video work.
              </h2>
            </div>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black font-mono text-xs uppercase tracking-wider font-semibold transition-all shrink-0 w-fit"
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
                className="group relative min-h-[380px] sm:min-h-[420px] rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-end p-6 sm:p-8 transition-all duration-500 hover:border-white/40"
              >
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent pointer-events-none" />

                {/* Card Tags & Details */}
                <div className="relative z-10 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-white/70">
                    <span className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span>0{idx + 1}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-tight pt-1">
                    {project.title}
                  </h3>

                  <p className="text-xs font-mono uppercase tracking-wider text-white/60">
                    {project.client} • {project.year}
                  </p>

                  <div className="pt-3 flex items-center text-xs font-mono text-white/50 group-hover:text-white transition-colors">
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
      <section className="relative w-full py-20 sm:py-32 px-5 sm:px-8 lg:px-16 border-t border-white/10 bg-[#050505]">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Head */}
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/50 block mb-3 font-semibold">
              04 / PRODUCTION ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-[#f3f3ef] leading-tight">
              One team from first idea to final film.
            </h2>
            <p className="text-sm sm:text-base text-white/65 font-normal leading-relaxed mt-3">
              A disciplined 5-stage production pipeline designed for creative clarity, transparent collaboration, and broadcast-grade finishing.
            </p>
          </div>

          {/* 5-Step Process Flow */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0a0a0a] border border-white/10 shadow-[0_26px_76px_rgba(0,0,0,0.5)] space-y-8">
            <div className="border-b border-white/10 pb-5 flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/50">
                END-TO-END WORKFLOW PIPELINE
              </span>
              <span className="text-xs font-mono text-white/40">5 PHASES • 100% TRANSPARENCY</span>
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
                  className="relative p-5 sm:p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/30 transition-colors flex flex-col justify-between min-h-[150px]"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-white/50">
                    <span className="font-semibold text-white/80">{item.step}</span>
                    {idx < 4 && <span className="hidden lg:inline text-white/30">→</span>}
                  </div>
                  <div>
                    <strong className="text-sm font-display font-bold text-white block uppercase tracking-tight mb-1.5">
                      {item.title}
                    </strong>
                    <p className="text-xs text-white/55 leading-relaxed font-normal">
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
      <section className="relative w-full py-20 sm:py-32 px-5 sm:px-8 lg:px-16 border-t border-white/10 bg-[#070707]">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Head */}
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/50 block mb-3 font-semibold">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-[#f3f3ef]">
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
                        ? "border-white/20 bg-white/[0.05] shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      type="button"
                      className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <span className="font-mono text-xs text-white/40 pt-1 shrink-0">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm sm:text-base font-medium text-white tracking-tight leading-snug">
                          {faq.question}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-white/60 shrink-0 transition-transform duration-300 mt-0.5 ml-2 ${
                          isOpen ? "rotate-180 text-white" : ""
                        }`}
                      />
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
                          <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/5 pt-4 pl-9 sm:pl-11">
                            {faq.answer}
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
                        ? "border-white/20 bg-white/[0.05] shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      type="button"
                      className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <span className="font-mono text-xs text-white/40 pt-1 shrink-0">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm sm:text-base font-medium text-white tracking-tight leading-snug">
                          {faq.question}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-white/60 shrink-0 transition-transform duration-300 mt-0.5 ml-2 ${
                          isOpen ? "rotate-180 text-white" : ""
                        }`}
                      />
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
                          <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/5 pt-4 pl-9 sm:pl-11">
                            {faq.answer}
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
      <section className="relative w-full py-20 sm:py-32 px-5 sm:px-8 lg:px-16 border-t border-white/10 bg-[#050505] text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/50 block font-semibold">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight text-white leading-tight">
            Tell us what you need to communicate.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:text-sm text-white/70 font-mono tracking-wider max-w-2xl mx-auto">
            <a href="mailto:creative@viyana.productions" className="hover:text-white underline underline-offset-4 transition-colors">
              creative@viyana.productions
            </a>
            <span className="text-white/30">•</span>
            <a href="mailto:director@viyana.productions" className="hover:text-white underline underline-offset-4 transition-colors">
              director@viyana.productions
            </a>
            <span className="text-white/30">•</span>
            <a href="tel:+919187233615" className="hover:text-white transition-colors">
              +91 91872 33615
            </a>
            <span className="text-white/30">•</span>
            <span>Bangalore, India</span>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-9 py-4 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-neutral-200 active:scale-95 transition-all shadow-[0_10px_35px_rgba(255,255,255,0.25)] flex items-center gap-2 group"
            >
              <span>START A PROJECT</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/work"
              className="px-9 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-widest font-medium transition-all"
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
