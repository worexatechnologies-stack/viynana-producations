"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoModal from "@/components/VideoModal";
import {
  Play,
  ArrowUpRight,
  MapPin,
  CheckCircle2,
} from "lucide-react";

const pillarsOfImpact = [
  {
    num: "01",
    slug: "the-next-move",
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
    slug: "silent-echo",
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
    slug: "genesis",
    title: "Graphic & Visual Design",
    tagline: "Visual identities built to be remembered.",
    desc: "Design is more than aesthetics. It's how a brand becomes recognisable. We create visual systems that bring consistency and personality across every touchpoint — from brand identity and campaigns to digital platforms, packaging, and social media.",
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
];


const processSteps = [
  {
    step: "01",
    title: "DISCOVER & DEFINE",
    subtitle: "Start with understanding.",
    desc: "We begin by understanding your brand, audience, objectives, and the story you want to tell. We research, ask the right questions, and define a clear creative direction before moving forward.",
  },
  {
    step: "02",
    title: "CONCEPT & SCRIPT",
    subtitle: "Turn strategy into an idea.",
    desc: "We develop the central creative concept and build the story around it. From treatments and scripts to storyboards and visual references, every element is designed to give the project a strong foundation.",
  },
  {
    step: "03",
    title: "DIRECT & PRODUCE",
    subtitle: "Bring the vision to life.",
    desc: "This is where the idea becomes real. Our directors, cinematographers, production teams, and creative specialists work together to capture every scene with purpose, precision, and visual character.",
  },
  {
    step: "04",
    title: "POST & DELIVERY",
    subtitle: "Perfect every detail.",
    desc: "The final story comes together in post-production. Through editing, colour grading, motion graphics, VFX, sound design, and finishing, we refine every detail and prepare the work for its intended platforms.",
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
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <main className="min-h-screen bg-brand-black text-brand-light selection:bg-white selection:text-black">
      <Navbar />

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoSrc="/website-video-2.mp4"
        title="VIYANA PRODUCTIONS // OFFICIAL 4K SHOWREEL"
        category="STUDIO MASTER SHOWREEL"
      />

      {/* 1. HERO SECTION */}
      <section className="pt-24 sm:pt-40 md:pt-48 pb-12 sm:pb-24 px-4 sm:px-10 lg:px-16 border-b border-white/10 relative overflow-hidden">
        {/* Subtle Ambient Light Glow (GPU-optimized radial gradient) */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none rounded-full" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Status Pill */}
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] sm:tracking-[0.25em] text-white/70 mb-5 sm:mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>STUDIO PROFILE</span>
              <span className="text-white/20">•</span>
              <span className="text-white/50">BANGALORE, INDIA</span>
            </div>

            {/* Monumental Headline */}
            <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight uppercase leading-[0.95] sm:leading-[0.92] text-white mb-6 sm:mb-8">
              ABOUT <br />
              <span className="text-white">
                VIYANA PRODUCTIONS.
              </span>
            </h1>

            {/* Core Matter */}
            <div className="space-y-6 sm:space-y-8 pt-1">
              <div className="max-w-4xl space-y-3 sm:space-y-4">
                <h2 className="text-xl sm:text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-tight leading-snug">
                  WHERE HIGH-IMPACT STRATEGY MEETS <br className="hidden sm:inline" />
                  <span className="text-white">CINEMA-GRADE CRAFT.</span>
                </h2>
                
                <p className="text-lg sm:text-2xl font-display font-medium text-white/90 uppercase tracking-tight pt-0.5 sm:pt-1">
                  We exist to make brands impossible to ignore.
                </p>

                <p className="text-xs sm:text-base md:text-xl text-brand-grey font-light leading-relaxed">
                  We merge high-level advertising strategy with cinematic film production and world-class graphic design to create work that captures attention, builds brands, and drives meaningful growth.
                </p>
              </div>

              {/* One Creative Partner Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 pt-6 border-t border-white/10 items-start">
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-white/80 block">
                    OUR ECOSYSTEM
                  </span>
                  <h3 className="text-xl sm:text-3xl font-display font-bold uppercase text-white tracking-tight leading-snug">
                    One creative partner. <br />
                    <span className="text-white/60">One unified vision.</span>
                  </h3>
                  <div className="pt-2 flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full sm:w-auto">
                    <Link
                      to="/contact"
                      className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-brand-light active:scale-95 transition-all shadow-lg"
                    >
                      Start a Project →
                    </Link>
                    <button
                      type="button"
                      onClick={() => setIsVideoOpen(true)}
                      className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Play Reel</span>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-xs sm:text-base text-brand-grey font-light leading-relaxed">
                  <p>
                    Traditional agency models often separate strategy, production, and design. We bring them together under one creative ecosystem combining brand strategy, creative direction, filmmaking, motion, sound design, and graphic design.
                  </p>
                  <p>
                    From high-impact campaigns and brand identity systems to digital films and visual experiences, we create work designed to connect with modern audiences and deliver measurable results.
                  </p>
                  <p>
                    Our directors, writers, cinematographers, designers, and production artists collaborate from the first idea to final delivery, ensuring every frame, message, and visual serves a clear purpose.
                  </p>
                </div>
              </div>
            </div>

            {/* Studio Metric Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-8 sm:pt-12 mt-8 sm:mt-12 border-t border-white/10">
              <div className="space-y-1 p-3 sm:p-0 rounded-xl bg-white/[0.02] sm:bg-transparent border border-white/10 sm:border-0">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/50 block">
                  STUDIO MODEL
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white font-mono block">
                  Agency + Cinema Studio
                </span>
              </div>
              <div className="space-y-1 p-3 sm:p-0 rounded-xl bg-white/[0.02] sm:bg-transparent border border-white/10 sm:border-0">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/50 block">
                  HEADQUARTERS
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white font-mono block">
                  Bangalore, India
                </span>
              </div>
              <div className="space-y-1 p-3 sm:p-0 rounded-xl bg-white/[0.02] sm:bg-transparent border border-white/10 sm:border-0">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/50 block">
                  PRODUCTION PIPELINE
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white font-mono block">
                  4K Cinema • ARRI &amp; RED
                </span>
              </div>
              <div className="space-y-1 p-3 sm:p-0 rounded-xl bg-white/[0.02] sm:bg-transparent border border-white/10 sm:border-0">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/50 block">
                  CORE DISCIPLINES
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white font-mono block">
                  Ads • Videos • Design
                </span>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* 2. SHOWREEL VISUAL SHOWCASE */}
      <section className="py-12 sm:py-16 px-6 sm:px-10 lg:px-16">
        <div className="container mx-auto max-w-6xl">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden border border-white/15 bg-brand-dark group shadow-2xl">
            <img
              src="/images/website-video-2-poster.jpg"
              alt="Viyana Productions Master Showreel"
              
              className="object-cover w-full h-full absolute inset-0 object-center filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-black/40 to-black/20" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/20 hover:bg-white text-white hover:text-black backdrop-blur-xl border border-white/40 flex items-center justify-center transition-all duration-300 shadow-2xl hover:scale-110 cursor-pointer group/btn mb-4"
                aria-label="Play showreel video"
              >
                <Play className="w-8 h-8 fill-current translate-x-0.5" />
              </button>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/90 bg-black/60 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
                WATCH 4K SHOWREEL
              </span>
            </div>

            {/* Bottom Meta */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-xs font-mono text-white/70 z-10">
              <span className="hidden sm:inline">VIYANA PRODUCTIONS // CINEMATIC REEL</span>
              <span className="bg-black/70 px-3 py-1 rounded-md border border-white/10">
                DOLBY VISION • 4K DCI
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE DISCIPLINES (SEVEN PILLARS OF PRODUCTION) */}
      <section className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16 border-t border-white/10 bg-brand-dark/40 overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[400px] bg-emerald-500/[0.03] blur-[150px] pointer-events-none rounded-full" />

        <div className="container mx-auto max-w-6xl relative z-10">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.1 }}
            className="max-w-4xl mb-14 sm:mb-20"
          >
            {/* Animated Eyebrow */}
            <motion.div 
              variants={headerRevealVariants}
              className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-white/50 mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>THREE PILLARS OF IMPACT</span>
            </motion.div>

            {/* Headline matching user design */}
            <motion.h2 
              variants={headerRevealVariants}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-syne font-bold text-white uppercase tracking-tight leading-[1.08] mb-5"
            >
              THREE PILLARS OF{" "}
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
              className="text-sm sm:text-base md:text-lg text-brand-grey font-light leading-relaxed max-w-3xl"
            >
              We bring together advertising strategy, cinematic video production, and visual design to create communication that captures attention, builds brands, and drives impact.
            </motion.p>
          </motion.div>

          {/* Staggered Grid of Pillar Cards */}
          <motion.div 
            variants={pillarsContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {pillarsOfImpact.map((d) => {
              return (
                <motion.div
                  key={d.num}
                  variants={pillarCardVariants}
                  whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
                  className="relative p-7 sm:p-8 rounded-2xl bg-gradient-to-b from-white/[0.035] to-white/[0.01] border border-white/10 hover:border-white/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(255,255,255,0.08)] transition-all duration-300 flex flex-col justify-between group space-y-6 overflow-hidden"
                >
                  <Link to={`/work/${d.slug}`} className="absolute inset-0 z-20" aria-label={`Open ${d.title} case study`} />

                  {/* Subtle top card shimmer bar */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/60 transition-all duration-500" />

                  {/* Ambient internal card glow on hover */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/0 group-hover:bg-white/5 blur-2xl transition-all duration-500 rounded-full pointer-events-none" />

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-white font-semibold px-2.5 py-1 rounded-md bg-white/10 border border-white/20 group-hover:bg-white/20 group-hover:border-white/40 transition-colors">
                        {d.num}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-serif text-white uppercase tracking-tight group-hover:text-brand-light transition-colors">
                        {d.title}
                      </h3>
                      <span className="text-xs font-mono text-white/50 block mt-1">
                        {d.tagline}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-brand-grey font-light leading-relaxed">
                      {d.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 space-y-2 relative z-10">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block">
                      KEY DELIVERABLES
                    </span>
                    <ul className="space-y-1.5">
                      {d.deliverables.map((item) => (
                        <li
                          key={item}
                          className="text-xs text-white/80 font-mono flex items-center gap-2 group-hover:text-white transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-125 transition-transform duration-200 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </section>

      {/* 4. CREATIVE PROCESS (HOW WE WORK) */}
      {/* 4. CREATIVE PROCESS (HOW WE WORK) */}
      <section className="py-16 sm:py-24 px-6 sm:px-10 lg:px-16 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/50 block mb-2">
                OUR CREATIVE PROCESS
              </span>
              <h2 className="text-3xl sm:text-5xl font-syne font-bold text-white uppercase tracking-tight">
                FROM THE FIRST IDEA TO THE FINAL FRAME.
              </h2>
            </div>
            <p className="text-xs font-mono uppercase tracking-widest text-white/40">
              Four calibrated phases of production.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-xs font-mono text-white/80 font-bold block">
                    STEP // {step.step}
                  </span>
                  <h3 className="text-xl font-display font-bold uppercase tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs font-mono text-white/60 uppercase tracking-wide">
                    {step.subtitle}
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-brand-grey font-light leading-relaxed pt-2 border-t border-white/5">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 6. STUDIO LOCATION CALLOUT (BANGALORE) */}
      <section className="py-12 sm:py-24 px-4 sm:px-10 lg:px-16 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="p-5 sm:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/15 backdrop-blur-sm grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-3 sm:space-y-4">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-white/80 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-white" />
                <span>STUDIO HEADQUARTERS</span>
              </span>
              <h2 className="text-2xl sm:text-4xl font-syne font-bold text-white uppercase tracking-tight">
                Based in Bangalore, India.
              </h2>
              <p className="text-xs sm:text-sm text-brand-grey font-light leading-relaxed max-w-lg">
                Located at 4th floor, Gopalan Workspace, Kathriguppe Main Rd, 3rd Phase, Banashankari 3rd Stage, Banashankari, Bengaluru, Karnataka 560085 — our creative space operates as our central hub for creative development, post-production, sound engineering, and visual design.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-xs font-mono text-white/70">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>Client Previews &amp; Consultations</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>Cinema Post-Production Suites</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-2.5 sm:gap-3 justify-end w-full">
              <Link
                to="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-brand-light active:scale-95 transition-all shadow-xl"
              >
                <span>Initiate A Brief →</span>
              </Link>
              <a
                href="https://wa.me/919187233615?text=Hello%20Viyana%20Productions,%20I'd%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-mono text-xs uppercase tracking-widest active:scale-95 transition-colors"
              >
                <span>WhatsApp Producer Desk ↗</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="py-16 sm:py-28 px-4 sm:px-10 lg:px-16 border-t border-white/10 bg-brand-dark/50 text-center">
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
