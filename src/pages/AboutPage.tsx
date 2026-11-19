"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SEO from "@/components/SEO";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Play,
  Pause,
  ArrowUpRight,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Volume2,
  VolumeX,
  Film,
  Compass,
  FileText,
  Video,
  SlidersHorizontal,
  GitBranch,
} from "lucide-react";

const pillarsOfImpact = [
  {
    num: "01",
    slug: "commercial-ads",
    title: "Advertising & Creative Strategy",
    tagline: "Ideas built to move brands forward.",
    desc: "We develop advertising concepts and creative strategies that connect brand objectives with compelling storytelling. From campaign thinking to multi-channel execution, we create ideas designed to reach the right audience and create meaningful impact.",
    deliverables: [
      "Cinematic Commercial Scriptwriting",
      "Creative Concept & Campaign Strategy",
      "Brand Narrative & Art Direction",
      "Digital & Multi-Channel Campaigns",
      "Social & Performance Creative",
      "Integrated Campaign Rollout Plans",
    ],
  },
  {
    num: "02",
    slug: "cinematic-content-shoot",
    title: "Film & Video Production",
    tagline: "Stories brought to life, frame by frame.",
    desc: "We produce films that combine strong storytelling with cinematic craft. From commercials and brand films to documentaries and fashion content, our production approach is built around creating visuals that people want to watch and remember.",
    deliverables: [
      "National TVCs & Digital Commercials",
      "Brand Films & Documentaries",
      "Fashion & Lifestyle Films",
      "Corporate & Promotional Films",
      "Cinematography & Production",
      "Editing & Post-Production",
      "Colour Grading & Finishing",
    ],
  },
  {
    num: "03",
    slug: "graphic-design-and-visual-identity",
    title: "Graphic & Visual Design",
    tagline: "Visual identities built to be remembered.",
    desc: "Design is more than aesthetics. It's how a brand becomes recognisable. We create visual systems that bring consistency and personality across every touchpoint from brand identity and campaigns to digital platforms, packaging, and social media.",
    deliverables: [
      "Visual Identity & Brand Systems",
      "Logo & Brand Identity Design",
      "Typography & Editorial Design",
      "Print, Packaging & OOH Billboards",
      "Digital & Social Media Design",
      "Campaign Creative & Art Direction",
      "Presentation & Marketing Collateral",
    ],
  },
  {
    num: "04",
    slug: "product-shoot",
    title: "Product Shoot",
    tagline: "Clear & attractive photos and videos.",
    desc: "We take clear and attractive photos and videos of your products. Whether it's for an online store or social media, our visuals are designed to help your customers fall in love with your product and drive sales.",
    deliverables: [
      "Online Store Photos",
      "Lifestyle Photos",
      "Product Videos",
      "HD Photos & Reels",
      "E-commerce Ready Images",
    ],
  },
  {
    num: "05",
    slug: "influencer-shoot",
    title: "Influencer Shoot",
    tagline: "Stylish videos & photos for personal brands.",
    desc: "Stand out in a crowded digital landscape with striking visuals. We provide professional shooting services for models, influencers, and YouTubers looking to elevate their personal brand and secure more deals.",
    deliverables: [
      "Instagram Reels",
      "Model Photos",
      "Brand Collab Shoots",
      "Short Form Videos",
      "Viral Content Creation",
    ],
  },
];

const duplicatedPillars = [...pillarsOfImpact, ...pillarsOfImpact];


const processSteps = [
  {
    step: "01",
    branchName: "BRANCH // 01 • STRATEGY",
    title: "DISCOVER & DEFINE",
    subtitle: "Start with understanding.",
    desc: "We begin by understanding your brand, audience, objectives, and the story you want to tell. We research, ask the right questions, and define a clear creative direction before moving forward.",
    deliverables: ["Brand & Audience Research", "Strategic Positioning", "Creative Brief"],
    icon: Compass,
    accent: "from-amber-500/20 to-amber-500/5",
    borderGlow: "group-hover:border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.15)]",
    dotColor: "bg-amber-400",
  },
  {
    step: "02",
    branchName: "BRANCH // 02 • SCREENPLAY",
    title: "CONCEPT & SCRIPT",
    subtitle: "Turn strategy into an idea.",
    desc: "We develop the central creative concept and build the story around it. From treatments and scripts to storyboards and visual references, every element is designed to give the project a strong foundation.",
    deliverables: ["Scriptwriting & Treatments", "Visual Storyboarding", "Director's Deck"],
    icon: FileText,
    accent: "from-purple-500/20 to-purple-500/5",
    borderGlow: "group-hover:border-purple-400/60 shadow-[0_0_20px_rgba(168,85,247,0.15)]",
    dotColor: "bg-purple-400",
  },
  {
    step: "03",
    branchName: "BRANCH // 03 • CINEMATOGRAPHY",
    title: "DIRECT & PRODUCE",
    subtitle: "Bring the vision to life.",
    desc: "This is where the idea becomes real. Our directors, cinematographers, production teams, and creative specialists work together to capture every scene with purpose, precision, and visual character.",
    deliverables: ["4K ARRI & RED Camera Packages", "Cine Lighting & Art Direction", "On-Set Directing"],
    icon: Video,
    accent: "from-emerald-500/20 to-emerald-500/5",
    borderGlow: "group-hover:border-emerald-400/60 shadow-[0_0_20px_rgba(16,185,129,0.15)]",
    dotColor: "bg-emerald-400",
  },
  {
    step: "04",
    branchName: "BRANCH // 04 • FINISHING",
    title: "POST & DELIVERY",
    subtitle: "Perfect every detail.",
    desc: "The final story comes together in post-production. Through editing, colour grading, motion graphics, VFX, sound design, and finishing, we refine every detail and prepare the work for its intended platforms.",
    deliverables: ["Cinema Color Grading (LOG-C4)", "Spatial Sound & Audio Mastering", "4K DCI Multi-Platform Delivery"],
    icon: SlidersHorizontal,
    accent: "from-blue-500/20 to-blue-500/5",
    borderGlow: "group-hover:border-blue-400/60 shadow-[0_0_20px_rgba(59,130,246,0.15)]",
    dotColor: "bg-blue-400",
  },
];

// Animation variants for Seven Pillars section
const pillarsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.15,
    },
  },
};

const pillarCardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const headerRevealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function AboutPage() {
  const [isPillarsPaused, setIsPillarsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const toggleAudio = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <main className="about-cinematic min-h-screen bg-[#fbfaf8] text-[#20201e] selection:bg-[#111827] selection:text-white font-portfolio-sans relative overflow-x-hidden">
      <SEO
        title="About Viyana Productions | Our Story and Creative Vision"
        description="Learn about Viyana Productions, our creative vision, and our approach to filmmaking, commercial advertising, cinematic storytelling, and professional video production."
        keywords="about viyana productions, creative production agency in bangalore, creative production agency, creative production studio in bangalore, film production company in bangalore, brand film production agency"
        ogTitle="About Viyana Productions | Our Story, Vision and Creativity"
        ogType="website"
        ogDescription="Discover the story behind about Viyana Productions. Learn about our creative approach, passion for visual storytelling, and commitment to producing compelling cinematic content."
        ogUrl="https://viyana.productions/about"
        ogSiteName="Viyana Productions"
        ogImage="https://viyana.productions/logo-black.png"
        twitterSite="https://twitter.com/"
        twitterTitle="About Viyana Productions services in Bangalore | Our Creative Journey"
        twitterDescription="Viyana Productions transforms ideas and brands into captivating stories through creative commercial advertising and visual storytelling that engage and inspire audiences. Discover the magic with us!"
        author="Akshay"
        canonical="https://viyana.productions/about"
        robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        publisher="Viyana Productions"
        ogLocale="en_US"
      />

      <Navbar />

      {/* 1. HERO SECTION (CINEMATIC ARCHITECTURE WITH LIVE SHOWREEL) */}
      <section className="relative w-full pt-24 sm:pt-32 md:pt-36 pb-12 sm:pb-20 px-5 sm:px-8 lg:px-16 border-b border-[#e7e6e2] bg-[#fbfaf8] overflow-hidden">
        {/* Subtle Ambient Paper Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[radial-gradient(circle_at_top,rgba(202,138,4,0.06)_0%,transparent_75%)] pointer-events-none blur-2xl" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Live Studio Status Pill */}
            <div className="mb-6 sm:mb-8">
              <span className="text-xs font-portfolio-sans uppercase tracking-[0.22em] text-[#ca8a04] font-bold px-3 py-1 rounded-full bg-[#ca8a04]/10 border border-[#ca8a04]/20 inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ca8a04] animate-pulse" />
                <span>STUDIO PROFILE</span>
                <span className="text-[#a68e67]">•</span>
                <span className="text-[#686762]">BENGALURU, INDIA</span>
              </span>
            </div>

            {/* SPLIT HERO COMPOSITION (TYPOGRAPHY NARRATIVE + CLEAN CINEMATIC SHOWREEL) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center mb-10 sm:mb-16">
              
              {/* LEFT COLUMN: BRAND MANIFESTO & STRATEGIC VISION (6 COLS) */}
              <div className="lg:col-span-6 space-y-6 sm:space-y-7">
                {/* Monumental Headline */}
                <div>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-portfolio-serif font-normal tracking-tight text-[#20201e] leading-[1.12]">
                    Where High&#8209;Impact Strategy <br className="hidden sm:inline" />
                    Meets <em>Cinema&#8209;Grade Craft.</em>
                  </h1>
                </div>

                {/* Golden Accent Manifesto Callout */}
                <div className="relative pl-4 sm:pl-5 border-l-2 border-[#ca8a04] py-1 space-y-1.5 bg-[#ca8a04]/5 rounded-r-xl">
                  <p className="text-xl sm:text-2xl font-portfolio-serif font-semibold tracking-tight text-[#20201e] leading-snug">
                    "We exist to make brands impossible to ignore."
                  </p>
                  <p className="text-xs sm:text-sm font-portfolio-sans text-[#a68e67] uppercase tracking-wider font-semibold">
                    One Creative Partner • Unified Vision • Measurable Commercial Growth
                  </p>
                </div>

                {/* Core Narrative Paragraph */}
                <p className="text-sm sm:text-base md:text-lg text-[#686762] font-normal leading-relaxed max-w-2xl">
                  Traditional agency models fracture strategy, film production, and design across disconnected vendors. At Viyana Productions, we eliminate the friction—uniting brand positioning, cinematic commercial filmmaking, motion design, and post-production under one collaborative roof in Bangalore.
                </p>

                {/* Value Propositions / Quality Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="flex items-center gap-2 text-xs font-portfolio-sans text-[#20201e] bg-white border border-[#dedbd4] px-3.5 py-2.5 rounded-xl shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#ca8a04] shrink-0" />
                    <span className="font-medium">Integrated Creative</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-portfolio-sans text-[#20201e] bg-white border border-[#dedbd4] px-3.5 py-2.5 rounded-xl shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#ca8a04] shrink-0" />
                    <span className="font-medium">In-House 4K Cinema</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-portfolio-sans text-[#20201e] bg-white border border-[#dedbd4] px-3.5 py-2.5 rounded-xl shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#ca8a04] shrink-0" />
                    <span className="font-medium">Script-to-Screen</span>
                  </div>
                </div>

                {/* Dual CTA Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <Link
                    to="/contact"
                    className="group w-full sm:w-auto text-center px-8 py-3.5 rounded-full bg-[#111827] text-white hover:bg-[#ca8a04] font-portfolio-sans text-xs uppercase tracking-wider font-bold shadow-md hover:shadow-lg active:scale-95 transition-all inline-flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <span>START A PROJECT</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/work"
                    className="group w-full sm:w-auto text-center px-8 py-3.5 rounded-full bg-white hover:bg-[#f7f6f3] border border-[#dedbd4] text-[#20201e] font-portfolio-sans text-xs uppercase tracking-wider font-semibold transition-all inline-flex items-center justify-center gap-2.5 active:scale-95 shadow-sm"
                  >
                    <Film className="w-4 h-4 text-[#ca8a04]" />
                    <span>EXPLORE SHOWREEL</span>
                    <ArrowUpRight className="w-4 h-4 text-[#686762] group-hover:text-[#20201e]" />
                  </Link>
                </div>
              </div>

              {/* RIGHT COLUMN: CINEMATIC SHOWREEL VIDEO */}
              <div className="lg:col-span-6 relative">
                {/* Ambient Soft Paper Glow */}
                <div className="absolute -inset-2 bg-[radial-gradient(circle,rgba(202,138,4,0.12)_0%,transparent_70%)] rounded-[32px] blur-2xl pointer-events-none" />

                {/* Video Container */}
                <div className="relative rounded-3xl p-1.5 bg-white border border-[#e7e6e2] shadow-[0_20px_50px_rgba(0,0,0,0.06)] group">
                  <div className="relative aspect-[16/11] min-h-[320px] sm:min-h-[400px] lg:min-h-[450px] w-full overflow-hidden rounded-[22px] bg-[#f7f6f3]">
                    <video
                      ref={videoRef}
                      src="/showreel-1080p-fast.mp4"
                      poster="/cinematic-content-shoot.jpg"
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />

                    {/* Sound Mute/Unmute Toggle Button */}
                    <button
                      type="button"
                      onClick={toggleAudio}
                      aria-label={isMuted ? "Unmute reel audio" : "Mute reel audio"}
                      title={isMuted ? "Click to unmute" : "Click to mute"}
                      className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 p-2 sm:p-2.5 rounded-full bg-white/90 hover:bg-white text-[#20201e] border border-[#dedbd4] shadow-md transition-all cursor-pointer active:scale-95"
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 text-[#686762]" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-[#ca8a04]" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* STUDIO METRIC MATRIX STRIP */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 mt-10">
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#e7e6e2] shadow-[0_8px_24px_-10px_rgba(0,0,0,0.05)] hover:border-[#ca8a04] hover:shadow-[0_16px_36px_rgba(202,138,4,0.1)] transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#ca8a04]/20 group-hover:bg-[#ca8a04] transition-colors duration-300" />
                <span className="text-[10px] sm:text-[11px] font-portfolio-sans uppercase tracking-widest text-[#ca8a04] block mb-1.5 font-bold">
                  01 / STUDIO MODEL
                </span>
                <span className="text-sm sm:text-base font-portfolio-serif font-semibold text-[#20201e] block">
                  Agency + 4K Cinema Studio
                </span>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#e7e6e2] shadow-[0_8px_24px_-10px_rgba(0,0,0,0.05)] hover:border-[#ca8a04] hover:shadow-[0_16px_36px_rgba(202,138,4,0.1)] transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#ca8a04]/20 group-hover:bg-[#ca8a04] transition-colors duration-300" />
                <span className="text-[10px] sm:text-[11px] font-portfolio-sans uppercase tracking-widest text-[#ca8a04] block mb-1.5 font-bold">
                  02 / HEADQUARTERS
                </span>
                <span className="text-sm sm:text-base font-portfolio-serif font-semibold text-[#20201e] block">
                  Bengaluru, Karnataka, India
                </span>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#e7e6e2] shadow-[0_8px_24px_-10px_rgba(0,0,0,0.05)] hover:border-[#ca8a04] hover:shadow-[0_16px_36px_rgba(202,138,4,0.1)] transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#ca8a04]/20 group-hover:bg-[#ca8a04] transition-colors duration-300" />
                <span className="text-[10px] sm:text-[11px] font-portfolio-sans uppercase tracking-widest text-[#ca8a04] block mb-1.5 font-bold">
                  03 / PRODUCTION PIPELINE
                </span>
                <span className="text-sm sm:text-base font-portfolio-serif font-semibold text-[#20201e] block">
                  4K Cinema • ARRI &amp; RED Rigs
                </span>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#e7e6e2] shadow-[0_8px_24px_-10px_rgba(0,0,0,0.05)] hover:border-[#ca8a04] hover:shadow-[0_16px_36px_rgba(202,138,4,0.1)] transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#ca8a04]/20 group-hover:bg-[#ca8a04] transition-colors duration-300" />
                <span className="text-[10px] sm:text-[11px] font-portfolio-sans uppercase tracking-widest text-[#ca8a04] block mb-1.5 font-bold">
                  04 / CORE DISCIPLINES
                </span>
                <span className="text-sm sm:text-base font-portfolio-serif font-semibold text-[#20201e] block">
                  TVCs • Digital Ads • Brand Films
                </span>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* 2. CORE DISCIPLINES (FIVE PILLARS OF IMPACT - CONTINUOUS RUNNING SLIDER) */}
      <section className="relative w-full py-16 sm:py-24 border-t border-b border-[#e7e6e2] bg-white text-[#20201e] overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[400px] bg-[radial-gradient(circle,rgba(202,138,4,0.05)_0%,transparent_70%)] blur-3xl pointer-events-none" />

        <div className="container mx-auto max-w-7xl px-5 sm:px-8 lg:px-16 relative z-10">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.1 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14"
          >
            <div className="max-w-3xl space-y-2">
              {/* Eyebrow */}
              <span className="text-xs font-portfolio-sans uppercase tracking-[0.22em] text-[#ca8a04] block font-bold px-3 py-1 rounded-full bg-[#ca8a04]/10 border border-[#ca8a04]/20 w-fit">
                02 / FIVE PILLARS OF IMPACT
              </span>

              {/* Headline */}
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-portfolio-serif font-normal text-[#20201e] tracking-tight leading-[1.08]">
                Five Pillars of <em>Impact.</em>
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-[#686762] font-normal leading-relaxed">
                We bring together advertising strategy, cinematic video production, and visual design to create communication that captures attention, builds brands, and drives impact.
              </p>
            </div>

            {/* Slider Live Status & Pause / Play Control */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsPillarsPaused(!isPillarsPaused)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-portfolio-sans uppercase tracking-wider font-semibold transition-all border cursor-pointer ${
                  isPillarsPaused
                    ? "bg-[#111827] text-white border-[#111827] shadow-sm"
                    : "bg-[#f7f6f3] border-[#dedbd4] text-[#20201e] hover:border-[#111827]"
                }`}
                title={isPillarsPaused ? "Resume running slider" : "Pause running slider"}
              >
                {isPillarsPaused ? (
                  <Play className="w-3 h-3 fill-current" />
                ) : (
                  <Pause className="w-3 h-3" />
                )}
                <span>{isPillarsPaused ? "Paused" : "Live Running"}</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Continuous Horizontal Running Slider Track */}
        <div className="relative w-full overflow-hidden group/marquee">
          {/* Edge Gradient Vignettes */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 z-20 bg-gradient-to-r from-white via-white/80 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 z-20 bg-gradient-to-l from-white via-white/80 to-transparent" />

          {/* Running Track with all 5 cards in same horizontal line */}
          <div
            className={`pillars-marquee-track flex gap-6 sm:gap-8 px-4 sm:px-8 py-4 ${
              isPillarsPaused ? "pillars-marquee-paused" : ""
            }`}
          >
            {duplicatedPillars.map((d, idx) => (
              <div
                key={`${d.num}-${idx}`}
                className="w-[300px] sm:w-[360px] md:w-[410px] shrink-0 relative p-7 sm:p-8 rounded-3xl bg-[#fbfaf8] border border-[#e7e6e2] hover:border-[#ca8a04] hover:shadow-[0_16px_36px_rgba(202,138,4,0.1)] transition-all duration-300 flex flex-col justify-between group space-y-6 overflow-hidden"
              >
                <Link
                  to={`/work/${d.slug}`}
                  className="absolute inset-0 z-20"
                  aria-label={`Open ${d.title} case study`}
                />

                {/* Subtle top card shimmer bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ca8a04]/40 to-transparent group-hover:via-[#ca8a04] transition-all duration-500" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-portfolio-sans text-[#ca8a04] font-bold px-3 py-1 rounded-full bg-[#ca8a04]/10 border border-[#ca8a04]/20">
                      {d.num}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#777671] group-hover:text-[#ca8a04] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-portfolio-serif font-bold text-[#20201e] group-hover:text-[#ca8a04] transition-colors leading-tight">
                      {d.title}
                    </h3>
                    <span className="text-xs font-portfolio-sans text-[#a68e67] font-semibold block mt-1">
                      {d.tagline}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-portfolio-sans text-[#686762] font-normal leading-relaxed line-clamp-4">
                    {d.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#e7e6e2] space-y-2 relative z-10">
                  <span className="text-[10px] font-portfolio-sans uppercase tracking-widest text-[#777671] font-semibold block">
                    KEY DELIVERABLES
                  </span>
                  <ul className="space-y-1.5">
                    {d.deliverables.slice(0, 5).map((item) => (
                      <li
                        key={item}
                        className="text-xs text-[#686762] font-portfolio-sans flex items-center gap-2 group-hover:text-[#20201e] transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ca8a04] shrink-0" />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom subtle guidance pill */}
        <div className="container mx-auto max-w-7xl px-5 sm:px-8 lg:px-16 mt-6 flex justify-between items-center text-xs font-portfolio-sans text-[#777671]">
          <span className="font-semibold text-[#ca8a04]">01 — 05 DISCIPLINES</span>
          <span className="hidden sm:inline">HOVER OVER ANY CARD TO PAUSE • CLICK TO EXPLORE</span>
        </div>
      </section>

      {/* 3. CREATIVE PROCESS (PRODUCTION TREE GRAPH WORKFLOW) */}
      <section className="relative w-full py-16 sm:py-24 px-5 sm:px-8 lg:px-16 border-t border-[#e7e6e2] bg-[#fbfaf8] text-[#20201e] overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(202,138,4,0.06)_0%,transparent_70%)] blur-3xl pointer-events-none" />

        <div className="container mx-auto max-w-7xl relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-14 gap-4 pb-6 border-b border-[#e7e6e2]">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-portfolio-sans uppercase tracking-[0.22em] text-[#ca8a04] block font-bold px-3 py-1 rounded-full bg-[#ca8a04]/10 border border-[#ca8a04]/20 w-fit">
                03 / PRODUCTION TREE GRAPH
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-portfolio-serif font-normal text-[#20201e] tracking-tight leading-tight">
                From the First Idea <br className="hidden sm:inline" />
                to the <em>Final Frame.</em>
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-portfolio-sans text-[#686762] uppercase tracking-wider font-semibold max-w-xs leading-relaxed">
              Every phase branches directly into the next, maintaining unbroken creative fidelity.
            </p>
          </div>

          {/* TREE GRAPH VISUAL CONTAINER */}
          <div className="relative">
            
            {/* Horizontal Tree Trunk Connecting Line (Desktop lg+) */}
            <div className="hidden lg:block absolute top-[52px] left-[6%] right-[6%] h-[2px] bg-[#e7e6e2] z-0">
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-[#ca8a04] to-transparent blur-[2px]"
                animate={{ left: ["0%", "100%"] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Tree Graph Grid (4 Branch Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 relative z-10">
              {processSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: idx * 0.12 }}
                    className="relative group flex flex-col"
                  >
                    {/* Tree Node Junction Pin */}
                    <div className="flex items-center gap-3 mb-4 lg:flex-col lg:items-center">
                      <div className="relative flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white border-2 border-[#dedbd4] group-hover:border-[#ca8a04] flex items-center justify-center text-[#20201e] font-portfolio-sans font-bold text-xs tracking-wider transition-all duration-300 shadow-md group-hover:shadow-[0_0_20px_rgba(202,138,4,0.2)] z-10">
                          <Icon className="w-5 h-5 text-[#ca8a04] group-hover:scale-110 transition-transform" />
                        </div>
                        <span className="absolute inset-0 rounded-full border border-[#ca8a04]/30 animate-ping opacity-40" />
                      </div>

                      {/* Branch Stem Connector Line */}
                      <div className="hidden lg:block w-[2px] h-4 bg-[#ca8a04]/40" />

                      {/* Mobile Step Badge */}
                      <div className="lg:hidden flex items-center gap-2">
                        <span className="text-[10px] font-portfolio-sans text-[#ca8a04] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#ca8a04]/10 border border-[#ca8a04]/20">
                          {step.branchName}
                        </span>
                      </div>
                    </div>

                    {/* Tree Branch Card Pod */}
                    <div className="flex-1 p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#e7e6e2] hover:border-[#ca8a04] shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(202,138,4,0.1)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden group-hover:-translate-y-1.5">
                      {/* Top Branch Indicator (Desktop) */}
                      <div className="space-y-2 mb-4 relative z-10">
                        <div className="hidden lg:flex items-center justify-between">
                          <span className="text-[10px] font-portfolio-sans text-[#ca8a04] uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-[#ca8a04]/10 border border-[#ca8a04]/20">
                            PHASE // {step.step}
                          </span>
                          <span className="w-2 h-2 rounded-full bg-[#ca8a04]" />
                        </div>

                        <h3 className="text-lg sm:text-xl font-portfolio-serif font-bold text-[#20201e] group-hover:text-[#ca8a04] transition-colors pt-1">
                          {step.title}
                        </h3>
                        <p className="text-xs font-portfolio-sans text-[#a68e67] uppercase tracking-wide font-semibold">
                          {step.subtitle}
                        </p>
                      </div>

                      {/* Body Description */}
                      <p className="text-xs sm:text-[13px] font-portfolio-sans text-[#686762] font-normal leading-relaxed mb-5 relative z-10">
                        {step.desc}
                      </p>

                      {/* Tree Deliverable Tags */}
                      <div className="pt-3 border-t border-[#e7e6e2] space-y-1.5 relative z-10 mt-auto">
                        <span className="text-[9px] font-portfolio-sans uppercase tracking-widest text-[#777671] block mb-1 font-semibold">
                          TREE OUTPUTS:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {step.deliverables.map((deliv, dIdx) => (
                            <span
                              key={dIdx}
                              className="text-[10px] font-portfolio-sans text-[#20201e] bg-[#f7f6f3] border border-[#dedbd4] px-2 py-1 rounded-md font-medium"
                            >
                              {deliv}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Tree Graph Flow Summary Bar */}
            <div className="mt-8 sm:mt-10 p-4 rounded-2xl bg-white border border-[#e7e6e2] flex flex-col sm:flex-row items-center justify-between text-xs font-portfolio-sans text-[#686762] gap-3 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[#20201e] font-semibold">END-TO-END PRODUCTION INTEGRATION</span>
              </div>
              <span className="text-[#a68e67] font-semibold hidden sm:inline">DISCOVERY → SCREENPLAY → CINEMATOGRAPHY → FINISHING</span>
            </div>

          </div>

        </div>
      </section>

      {/* 4. STUDIO LOCATION CALLOUT */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 lg:px-16 bg-white text-[#20201e] border-t border-b border-[#e7e6e2] relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="p-8 sm:p-14 lg:p-16 rounded-3xl bg-[#fbfaf8] border border-[#e7e6e2] shadow-[0_12px_40px_rgba(0,0,0,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(202,138,4,0.06)_0%,transparent_70%)] pointer-events-none blur-3xl" />

            <div className="lg:col-span-7 space-y-4 relative z-10">
              <span className="text-xs font-portfolio-sans uppercase tracking-[0.22em] text-[#ca8a04] font-bold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#ca8a04]" />
                <span>STUDIO HEADQUARTERS</span>
              </span>
              <h2 className="text-3xl sm:text-5xl font-portfolio-serif font-normal text-[#20201e] tracking-tight leading-tight">
                Based in Bengaluru, <em>India.</em>
              </h2>
              <p className="text-sm sm:text-base font-portfolio-sans text-[#686762] font-normal leading-relaxed max-w-lg">
                Located at{" "}
                <a
                  href="https://www.google.com/maps?cid=13843918391266491417&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en&gl=IN&source=embed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#20201e] hover:text-[#ca8a04] underline underline-offset-4 decoration-[#ca8a04]/40 hover:decoration-[#ca8a04] transition-all font-medium inline-block"
                  title="Open in Google Maps"
                >
                  4th Floor, Gopalan Workspace, Kathriguppe Main Rd, 3rd Phase, Banashankari 3rd Stage, Banashankari, Bengaluru, Karnataka 560085 ↗
                </a>{" "}
                — our creative space operates as our central hub for creative development, post-production, sound engineering, and visual design.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6 text-xs font-portfolio-sans text-[#20201e]">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ca8a04] shrink-0" />
                  <span className="font-medium">Client Previews &amp; Consultations</span>
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ca8a04] shrink-0" />
                  <span className="font-medium">Cinema Post-Production Suites</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3 justify-end w-full relative z-10">
              <Link
                to="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#111827] text-white hover:bg-[#ca8a04] font-portfolio-sans text-xs uppercase tracking-wider font-bold shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <span>INITIATE A BRIEF</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href="https://wa.me/919187233615?text=Hello%20Viyana%20Productions,%20I'd%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-[#f7f6f3] text-[#20201e] border border-[#dedbd4] font-portfolio-sans text-xs uppercase tracking-wider font-semibold active:scale-95 transition-all shadow-sm"
              >
                <span>WHATSAPP PRODUCER DESK ↗</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 lg:px-16 border-t border-[#e7e6e2] bg-[#fbfaf8] text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(circle,rgba(202,138,4,0.06)_0%,transparent_70%)] pointer-events-none blur-3xl" />
        
        <div className="container mx-auto max-w-4xl space-y-4 sm:space-y-6 relative z-10">
          <span className="text-xs font-portfolio-sans uppercase tracking-[0.25em] text-[#ca8a04] block font-bold px-3 py-1 rounded-full bg-[#ca8a04]/10 border border-[#ca8a04]/20 w-fit mx-auto">
            04 / GET STARTED
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-portfolio-serif font-normal text-[#20201e] tracking-tight">
            Have a Story to <em>Tell?</em>
          </h2>
          <p className="text-sm sm:text-base text-[#686762] font-normal leading-relaxed max-w-lg mx-auto">
            Let’s turn your idea into something people remember.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3.5 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto">
            <Link
              to="/contact"
              className="group w-full sm:w-auto text-center px-9 py-4 rounded-full bg-[#111827] text-white hover:bg-[#ca8a04] font-portfolio-sans text-xs uppercase tracking-wider font-bold shadow-md hover:shadow-lg active:scale-95 transition-all inline-flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>START A PROJECT</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/work"
              className="group w-full sm:w-auto text-center px-8 py-4 rounded-full bg-white hover:bg-[#f7f6f3] border border-[#dedbd4] text-[#20201e] font-portfolio-sans text-xs uppercase tracking-wider font-semibold active:scale-95 transition-all inline-flex items-center justify-center gap-2.5 shadow-sm"
            >
              <span>EXPLORE OUR WORK</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
