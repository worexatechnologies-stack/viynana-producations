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
    <main className="about-cinematic min-h-screen bg-brand-black text-brand-light selection:bg-white selection:text-black relative overflow-x-hidden">
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

      {/* 1. HERO SECTION (REDESIGNED CINEMATIC ARCHITECTURE WITH OPTICAL VIEWFINDER & LIVE SHOWREEL) */}
      <section className="about-studio-backdrop pt-24 sm:pt-32 md:pt-36 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-12 border-b border-white/10 relative overflow-hidden bg-[#050505]">
        {/* Cinematic Ambient Flare Glows */}
        <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[700px] h-[380px] bg-[radial-gradient(circle,rgba(245,158,11,0.06)_0%,rgba(168,85,247,0.04)_45%,transparent_70%)] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-4 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)] pointer-events-none rounded-full blur-[120px]" />
        
        {/* Tactical Director's Optical Dot Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none opacity-50" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Live Studio Status Pill */}
            <div className="mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/15 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-white/90 font-medium">
                  STUDIO PROFILE
                </span>
                <span className="text-white/25">•</span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-white/60">
                  BANGALORE, INDIA
                </span>
              </div>
            </div>

            {/* SPLIT HERO COMPOSITION (TYPOGRAPHY NARRATIVE + CLEAN CINEMATIC SHOWREEL) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center mb-10 sm:mb-16">
              
              {/* LEFT COLUMN: BRAND MANIFESTO & STRATEGIC VISION (6 COLS) */}
              <div className="lg:col-span-6 space-y-6 sm:space-y-7">
                {/* Monumental Headline (Clean 2-Line Architecture) */}
                <div>
                  <h1 className="text-[clamp(1.15rem,2.8vw,2.35rem)] sm:text-[clamp(1.25rem,3.2vw,2.55rem)] font-display font-extrabold uppercase tracking-tight leading-[1.12] text-white">
                    <span className="block whitespace-nowrap">
                      WHERE HIGH&#8209;IMPACT STRATEGY
                    </span>
                    <span className="block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-white drop-shadow-[0_2px_15px_rgba(245,158,11,0.25)]">
                      MEETS CINEMA&#8209;GRADE CRAFT.
                    </span>
                  </h1>
                </div>

                {/* Golden Accent Manifesto Callout */}
                <div className="relative pl-4 sm:pl-5 border-l-2 border-amber-400/90 py-1 space-y-1.5 bg-gradient-to-r from-white/[0.03] to-transparent rounded-r-xl">
                  <p className="text-lg sm:text-2xl font-display font-bold uppercase tracking-tight text-white leading-snug">
                    "We exist to make brands impossible to ignore."
                  </p>
                  <p className="text-xs sm:text-sm font-mono text-amber-300/85 uppercase tracking-widest font-medium">
                    One Creative Partner • Unified Vision • Measurable Commercial Growth
                  </p>
                </div>

                {/* Core Narrative Paragraph */}
                <p className="text-sm sm:text-base md:text-lg text-neutral-300 font-light leading-relaxed max-w-2xl">
                  Traditional agency models fracture strategy, film production, and design across disconnected vendors. At Viyana Productions, we eliminate the friction—uniting brand positioning, cinematic commercial filmmaking, motion design, and post-production under one collaborative roof in Bangalore.
                </p>

                {/* Value Propositions / Quality Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-white/80 bg-white/[0.03] border border-white/10 px-3 py-2 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Integrated Creative</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-white/80 bg-white/[0.03] border border-white/10 px-3 py-2 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>In-House 4K Cinema</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-white/80 bg-white/[0.03] border border-white/10 px-3 py-2 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Script-to-Screen</span>
                  </div>
                </div>

                {/* Dual CTA Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-neutral-200 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_45px_rgba(255,255,255,0.4)]"
                  >
                    <span>Start a Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/work"
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-sm active:scale-95"
                  >
                    <Film className="w-4 h-4 text-amber-400" />
                    <span>Explore Showreel</span>
                    <ArrowUpRight className="w-4 h-4 opacity-70" />
                  </Link>
                </div>
              </div>

              {/* RIGHT COLUMN: CINEMATIC SHOWREEL VIDEO (BIGGER, CLEAN VIDEO ONLY) */}
              <div className="lg:col-span-6 relative">
                {/* Ambient Multi-Spectrum Glow Halo */}
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/20 via-purple-500/15 to-blue-500/20 rounded-[30px] blur-2xl opacity-50 pointer-events-none group-hover:opacity-80 transition-opacity duration-700" />

                {/* Video Container (Clean, Larger, No Viewfinder/Record Overlays) */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 bg-black shadow-[0_25px_80px_rgba(0,0,0,0.85),inset_0_1px_2px_rgba(255,255,255,0.15)] group">
                  <div className="relative aspect-[16/11] min-h-[320px] sm:min-h-[400px] lg:min-h-[450px] w-full overflow-hidden bg-black">
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

                    {/* Minimal Sound Mute/Unmute Toggle Button */}
                    <button
                      type="button"
                      onClick={toggleAudio}
                      aria-label={isMuted ? "Unmute reel audio" : "Mute reel audio"}
                      title={isMuted ? "Click to unmute" : "Click to mute"}
                      className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 p-2 sm:p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/25 hover:border-amber-400/60 backdrop-blur-md transition-all cursor-pointer shadow-xl active:scale-95"
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 text-white/80" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-amber-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* STUDIO METRIC MATRIX STRIP */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.06] border border-white/10 hover:border-amber-400/40 transition-all duration-300 relative overflow-hidden group shadow-lg">
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent group-hover:via-amber-400 transition-all duration-500" />
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-amber-300/70 block mb-1 font-semibold">
                  01 / STUDIO MODEL
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white font-mono block">
                  Agency + 4K Cinema Studio
                </span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.06] border border-white/10 hover:border-amber-400/40 transition-all duration-300 relative overflow-hidden group shadow-lg">
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent group-hover:via-amber-400 transition-all duration-500" />
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-amber-300/70 block mb-1 font-semibold">
                  02 / HEADQUARTERS
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white font-mono block">
                  Bangalore, Karnataka, India
                </span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.06] border border-white/10 hover:border-amber-400/40 transition-all duration-300 relative overflow-hidden group shadow-lg">
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent group-hover:via-amber-400 transition-all duration-500" />
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-amber-300/70 block mb-1 font-semibold">
                  03 / PRODUCTION PIPELINE
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white font-mono block">
                  4K Cinema • ARRI &amp; RED Rigs
                </span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.06] border border-white/10 hover:border-amber-400/40 transition-all duration-300 relative overflow-hidden group shadow-lg">
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent group-hover:via-amber-400 transition-all duration-500" />
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-amber-300/70 block mb-1 font-semibold">
                  04 / CORE DISCIPLINES
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white font-mono block">
                  TVCs • Digital Ads • Brand Films
                </span>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* 3. CORE DISCIPLINES (FIVE PILLARS OF IMPACT - CONTINUOUS RUNNING SLIDER) */}
      <section className="about-studio-backdrop relative py-20 sm:py-28 border-t border-white/10 border-b border-white/10 bg-black text-white overflow-hidden selection:bg-white selection:text-black">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[400px] bg-white/[0.015] blur-[150px] pointer-events-none rounded-full" />

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 relative z-10">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.1 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14"
          >
            <div className="max-w-3xl">
              {/* Animated Eyebrow */}
              <motion.div
                variants={headerRevealVariants}
                className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-white/60 mb-4"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>FIVE PILLARS OF IMPACT</span>
              </motion.div>

              {/* Headline matching user design */}
              <motion.h2
                variants={headerRevealVariants}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-syne font-bold text-white uppercase tracking-tight leading-[1.08] mb-5"
              >
                FIVE PILLARS OF{" "}
                <br className="hidden sm:inline" />
                <span className="relative inline-block text-white">
                  IMPACT<span className="text-white">.</span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
                    className="absolute left-0 -bottom-1.5 w-full h-[2px] bg-gradient-to-r from-white via-white/50 to-transparent origin-left"
                  />
                </span>
              </motion.h2>

              <motion.p
                variants={headerRevealVariants}
                className="text-sm sm:text-base md:text-lg text-neutral-300 font-light leading-relaxed"
              >
                We bring together advertising strategy, cinematic video production, and visual design to create communication that captures attention, builds brands, and drives impact.
              </motion.p>
            </div>

            {/* Slider Live Status & Pause / Play Control */}
            <motion.div variants={headerRevealVariants} className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsPillarsPaused(!isPillarsPaused)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                  isPillarsPaused
                    ? "bg-white text-black border-white font-semibold shadow-lg"
                    : "bg-white/10 text-white/80 border-white/20 hover:border-white/40 hover:text-white"
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
            </motion.div>
          </motion.div>
        </div>

        {/* Continuous Horizontal Running Slider Track */}
        <div className="relative w-full overflow-hidden group/marquee">

          {/* Running Track with all 5 cards in same horizontal line */}
          <div
            className={`pillars-marquee-track flex gap-6 sm:gap-8 px-4 sm:px-8 py-4 ${
              isPillarsPaused ? "pillars-marquee-paused" : ""
            }`}
          >
            {duplicatedPillars.map((d, idx) => (
              <div
                key={`${d.num}-${idx}`}
                className="w-[300px] sm:w-[360px] md:w-[410px] shrink-0 relative p-7 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#141414] border border-white/10 hover:border-white/40 hover:shadow-[0_25px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(255,255,255,0.06)] transition-all duration-300 flex flex-col justify-between group space-y-6 overflow-hidden"
              >
                <Link
                  to={`/work/${d.slug}`}
                  className="absolute inset-0 z-20"
                  aria-label={`Open ${d.title} case study`}
                />

                {/* Subtle top card shimmer bar */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/60 transition-all duration-500" />

                {/* Ambient internal card glow on hover */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/0 group-hover:bg-white/5 blur-2xl transition-all duration-500 rounded-full pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-white font-semibold px-2.5 py-1 rounded-md bg-white/10 border border-white/20 group-hover:bg-white/20 group-hover:border-white/40 transition-colors">
                      {d.num}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-serif text-white uppercase tracking-tight group-hover:text-brand-light transition-colors">
                      {d.title}
                    </h3>
                    <span className="text-xs font-mono text-white/50 block mt-1">
                      {d.tagline}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-grey font-light leading-relaxed line-clamp-4">
                    {d.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-2 relative z-10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block">
                    KEY DELIVERABLES
                  </span>
                  <ul className="space-y-1.5">
                    {d.deliverables.slice(0, 5).map((item) => (
                      <li
                        key={item}
                        className="text-xs text-white/80 font-mono flex items-center gap-2 group-hover:text-white transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-125 transition-transform duration-200 shrink-0" />
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
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 mt-6 flex justify-between items-center text-[11px] font-mono text-white/40">
          <span>01 — 05 DISCIPLINES</span>
          <span className="hidden sm:inline">HOVER OVER ANY CARD TO PAUSE • CLICK TO EXPLORE</span>
        </div>
      </section>

      {/* 4. CREATIVE PROCESS (PRODUCTION TREE GRAPH WORKFLOW) */}
      <section className="about-studio-backdrop py-14 sm:py-20 px-4 sm:px-8 lg:px-14 border-t border-white/10 relative overflow-hidden bg-gradient-to-b from-[#080706] via-[#0c0a0d] to-[#080706]">
        {/* Subtle Ambient Glow Mesh */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.06)_0%,rgba(168,85,247,0.04)_45%,transparent_70%)] blur-3xl pointer-events-none" />
        
        {/* Engineering Coordinate Grid Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-40" />

        <div className="container mx-auto max-w-7xl relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-14 gap-4 pb-6 border-b border-white/10">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/15 backdrop-blur-md">
                <GitBranch className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-white/90 font-medium">
                  PRODUCTION TREE GRAPH
                </span>
                <span className="text-white/20">•</span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] text-amber-300/80">
                  4 CALIBRATED PHASES
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold text-white uppercase tracking-tight leading-tight">
                FROM THE FIRST IDEA <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-white">
                  TO THE FINAL FRAME.
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-mono text-white/50 uppercase tracking-widest max-w-xs leading-relaxed">
              Every phase branches directly into the next, maintaining unbroken creative fidelity.
            </p>
          </div>

          {/* TREE GRAPH VISUAL CONTAINER */}
          <div className="relative">
            
            {/* Horizontal Tree Trunk Connecting Line with Animated Light Pulse (Desktop lg+) */}
            <div className="hidden lg:block absolute top-[52px] left-[6%] right-[6%] h-[2px] bg-gradient-to-r from-amber-400/40 via-purple-400/40 to-blue-400/40 z-0">
              {/* Traveling light pulse along the tree trunk */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent blur-[2px]"
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
                    {/* Tree Node Junction Pin (Center-top of card on desktop) */}
                    <div className="flex items-center gap-3 mb-4 lg:flex-col lg:items-center">
                      {/* Circular Glowing Tree Node */}
                      <div className="relative flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#120f17] border-2 border-white/20 group-hover:border-amber-400/80 flex items-center justify-center text-white font-mono font-bold text-xs tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.8)] group-hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] z-10">
                          <Icon className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
                        </div>
                        {/* Concentric node pulse ring */}
                        <span className="absolute inset-0 rounded-full border border-amber-400/30 animate-ping opacity-40" />
                      </div>

                      {/* Branch Stem Connector Line (Desktop: vertical connector from node into card) */}
                      <div className="hidden lg:block w-[2px] h-4 bg-gradient-to-b from-amber-400/50 to-white/20" />

                      {/* Mobile Step Badge */}
                      <div className="lg:hidden flex items-center gap-2">
                        <span className="text-[10px] font-mono text-amber-300/90 font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                          {step.branchName}
                        </span>
                      </div>
                    </div>

                    {/* Tree Branch Card Pod */}
                    <div className={`flex-1 p-6 rounded-2xl bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent border border-white/12 ${step.borderGlow} transition-all duration-500 flex flex-col justify-between backdrop-blur-xl relative overflow-hidden group-hover:-translate-y-1.5`}>
                      {/* Ambient internal card glow */}
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${step.accent} rounded-full blur-2xl pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity`} />
                      
                      {/* Top Branch Indicator (Desktop) */}
                      <div className="space-y-2 mb-4 relative z-10">
                        <div className="hidden lg:flex items-center justify-between">
                          <span className="text-[9.5px] font-mono text-amber-300/80 uppercase tracking-widest font-semibold px-2 py-0.5 rounded bg-white/[0.03] border border-white/10">
                            PHASE // {step.step}
                          </span>
                          <span className={`w-2 h-2 rounded-full ${step.dotColor} shadow-[0_0_8px_currentColor]`} />
                        </div>

                        <h3 className="text-lg sm:text-xl font-display font-bold uppercase tracking-tight text-white group-hover:text-amber-200 transition-colors pt-1">
                          {step.title}
                        </h3>
                        <p className="text-xs font-mono text-white/60 uppercase tracking-wide">
                          {step.subtitle}
                        </p>
                      </div>

                      {/* Body Description */}
                      <p className="text-xs sm:text-[13px] text-neutral-300 font-light leading-relaxed mb-5 relative z-10">
                        {step.desc}
                      </p>

                      {/* Tree Leaves / Deliverable Tags */}
                      <div className="pt-3 border-t border-white/10 space-y-1.5 relative z-10 mt-auto">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 block mb-1">
                          TREE OUTPUTS:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {step.deliverables.map((deliv, dIdx) => (
                            <span
                              key={dIdx}
                              className="text-[10px] font-mono text-white/75 bg-white/[0.04] border border-white/10 px-2 py-1 rounded-md"
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
            <div className="mt-8 sm:mt-10 p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/60 gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white/80 font-medium">END-TO-END PRODUCTION INTEGRATION</span>
              </div>
              <span className="text-amber-300/80 hidden sm:inline">DISCOVERY → SCREENPLAY → CINEMATOGRAPHY → FINISHING</span>
            </div>

          </div>

        </div>
      </section>

      {/* 6. STUDIO LOCATION CALLOUT (WHITE SECTION CANVAS WITH MONUMENTAL BLACK CARD) */}
      <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-16 bg-white text-black border-t border-black/10 border-b border-black/10 relative z-10 selection:bg-white selection:text-black">
        {/* Subtle architectural dot grid pattern for luxury texture on white canvas */}
        <div className="absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Inner Floating Black Card */}
          <div className="p-6 sm:p-12 md:p-14 rounded-2xl sm:rounded-3xl bg-[#090909] text-white border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.35)] grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative overflow-hidden">
            {/* Ambient internal card glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

            <div className="lg:col-span-7 space-y-3 sm:space-y-4 relative z-10">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-white/80 font-semibold flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-white" />
                <span>STUDIO HEADQUARTERS</span>
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-syne font-bold text-white uppercase tracking-tight">
                Based in Bangalore, India.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-lg">
                Located at{" "}
                <a
                  href="https://www.google.com/maps?cid=13843918391266491417&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en&gl=IN&source=embed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline underline-offset-4 decoration-white/40 hover:decoration-white transition-all font-normal inline-block"
                  title="Open in Google Maps"
                >
                  4th Floor, Gopalan Workspace, Kathriguppe Main Rd, 3rd Phase, Banashankari 3rd Stage, Banashankari, Bengaluru, Karnataka 560085 ↗
                </a>{" "}
                — our creative space operates as our central hub for creative development, post-production, sound engineering, and visual design.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row sm:flex-wrap gap-2.5 sm:gap-5 text-xs font-mono text-white/80">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>Client Previews &amp; Consultations</span>
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>Cinema Post-Production Suites</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-2.5 sm:gap-3.5 justify-end w-full relative z-10">
              <Link
                to="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-neutral-200 active:scale-95 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.2)]"
              >
                <span>Initiate A Brief →</span>
              </Link>
              <a
                href="https://wa.me/919187233615?text=Hello%20Viyana%20Productions,%20I'd%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 font-mono text-xs uppercase tracking-widest font-medium active:scale-95 transition-colors shadow-sm"
              >
                <span>WhatsApp Producer Desk ↗</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="about-studio-backdrop py-16 sm:py-28 px-4 sm:px-10 lg:px-16 border-t border-white/10 bg-brand-dark/50 text-center">
        <div className="container mx-auto max-w-4xl space-y-4 sm:space-y-6">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-white/50 block">
            CTA
          </span>
          <h2 className="text-2xl sm:text-5xl md:text-6xl font-syne font-bold text-white uppercase tracking-tight">
            HAVE A PROJECT IN MIND?
          </h2>
          <p className="text-sm sm:text-xl font-serif italic text-brand-light max-w-lg mx-auto">
            LET&apos;S CREATE
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-brand-light active:scale-95 transition-all shadow-xl text-center"
            >
              START A PROJECT →
            </Link>
            <Link
              to="/work"
              className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs uppercase tracking-widest active:scale-95 transition-colors text-center"
            >
              EXPLORE OUR WORK
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
