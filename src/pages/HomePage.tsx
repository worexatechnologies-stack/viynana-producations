import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";
import TextReveal from "@/components/TextReveal";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (heroVideoRef.current) {
      heroVideoRef.current.muted = !heroVideoRef.current.muted;
      setIsMuted(heroVideoRef.current.muted);
    }
  };
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Hero Parallax Setup
  const yHeroVideo = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yHeroTitle = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !wrapper) return;

    const ctx = gsap.matchMedia();

    ctx.add("(min-width: 768px)", () => {
      const getScrollAmount = () => {
        return -(wrapper.scrollWidth - window.innerWidth + 120);
      };

      const tween = gsap.timeline({ defaults: { ease: "none" } });
      tween.to(wrapper, { x: getScrollAmount, duration: 1 });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${Math.max(1800, Math.abs(getScrollAmount()))}`,
        pin: true,
        animation: tween,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const scrollLeftMobile = () => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRightMobile = () => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <main ref={containerRef} className="relative w-full bg-brand-black min-h-screen overflow-x-hidden">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[100svh] min-h-[600px] overflow-hidden flex flex-col items-center justify-center">
        <motion.div style={{ y: yHeroVideo }} className="absolute inset-0 w-full h-full z-0 will-change-transform">
          <div className="absolute inset-0 bg-brand-black/35 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/50 z-10" />
          <video
            ref={heroVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover scale-105"
            poster="/images/hero-poster.jpg"
          >
            <source src="/13232-246463976_medium.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Sound Toggle Button */}
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-30 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 hover:border-white/50 hover:bg-black/80 text-white text-[11px] font-mono uppercase tracking-widest transition-all active:scale-95 shadow-2xl cursor-pointer group"
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 group-hover:opacity-100 transition-opacity"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 group-hover:opacity-100 transition-opacity"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          )}
          <span>{isMuted ? "Unmute" : "Sound On"}</span>
        </button>

        {/* Center Hero Content: VIYANA PRODUCTIONS */}
        <motion.div
          style={{ y: yHeroTitle }}
          className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto my-auto pt-16 sm:pt-20"
        >
          {/* Subtle Studio Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 mb-4 sm:mb-6 shadow-2xl"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/90 animate-ping" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-mono text-white/90 font-medium">
              Creative Ad Agency &amp; Production Studio
            </span>
          </motion.div>

          {/* Official Viyana Productions Logo in Banner Center */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center select-none"
          >
            <img
              src="/logo-white.png"
              alt="Viyana Productions"
              width="970"
              height="435"
              fetchPriority="high"
              decoding="async"
              className="w-auto h-28 sm:h-40 md:h-52 lg:h-64 max-w-[90vw] object-contain drop-shadow-[0_10px_50px_rgba(0,0,0,0.95)] filter brightness-110 select-none pointer-events-none"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base text-white/85 max-w-lg font-normal tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] leading-relaxed"
          >
            Crafting bold advertising campaigns, cinematic films &amp; iconic brand stories.
          </motion.p>

          {/* Action CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full sm:w-auto max-w-xs sm:max-w-none mt-8 sm:mt-10"
          >
            <Link
              to="/showreel"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black text-xs font-mono tracking-widest uppercase font-bold hover:bg-brand-light active:scale-95 transition-all shadow-[0_0_35px_rgba(255,255,255,0.35)] flex items-center justify-center gap-2.5 group cursor-pointer"
              data-cursor="play"
            >
              <span className="w-2 h-2 rounded-full bg-black group-hover:scale-125 transition-transform" />
              <span>WATCH SHOWREEL</span>
            </Link>
            <Link
              to="/work"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/30 hover:border-white text-white text-xs font-mono tracking-widest uppercase font-medium hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-lg"
            >
              <span>EXPLORE WORK</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none text-white/60">
          <span className="text-[9px] uppercase tracking-[0.3em] font-mono">Scroll</span>
          <div className="w-[1px] h-7 sm:h-10 bg-white/20 overflow-hidden">
            <motion.div
              animate={{ y: [0, 40] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-full h-1/2 bg-white"
            />
          </div>
        </div>
      </section>

      {/* 2. BRAND STATEMENT */}
      <section className="relative w-full py-16 sm:py-24 md:py-48 px-4 sm:px-6 lg:px-12 flex items-center justify-center bg-brand-black z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex flex-col items-center justify-center pointer-events-none z-10 px-2 sm:px-6 text-center">
            <TextReveal
              text="WE DON'T JUST MAKE FILMS. WE CREATE PERSPECTIVES."
              className="text-2xl sm:text-4xl md:text-6xl lg:text-[7vw] leading-[1.15] font-display font-extrabold tracking-tight uppercase text-balance text-brand-light justify-center"
            />
          </div>
        </div>
      </section>

      {/* 3. ABOUT PREVIEW */}
      <section className="relative w-full py-16 sm:py-24 md:py-32 px-5 sm:px-6 lg:px-12 bg-brand-black z-10 border-t border-white/10">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 sm:gap-16">
            <div className="md:w-1/3 flex flex-col">
              <span className="text-xs uppercase tracking-widest text-brand-grey mb-4 sm:mb-8 font-mono">01 / ABOUT VIYANA</span>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold leading-tight tracking-tight mb-4 sm:mb-8 text-white uppercase">
                IDEAS INTO<br />VISUAL STORIES.
              </h3>
              <p className="text-brand-grey text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-12 max-w-sm font-light">
                Viyana Productions creates advertising, films, and visual experiences for brands that want to stand out. From the first concept to the final frame, we combine creative thinking with cinematic production and purposeful design.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-mono font-medium text-white hover:text-brand-grey transition-colors w-fit px-4 py-2 rounded-full border border-white/20 bg-white/5 sm:border-transparent sm:bg-transparent sm:p-0"
              >
                <span>MORE ABOUT VIYANA</span>
                <span>→</span>
              </Link>
            </div>

            <div className="md:w-2/3 relative w-full aspect-[16/10] sm:aspect-[4/5] md:aspect-[16/9] overflow-hidden group rounded-2xl border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1200&auto=format&fit=crop"
                alt="Behind the scenes at Viyana"
                loading="lazy"
                decoding="async"
                width="1200"
                height="675"
                className="object-cover w-full h-full absolute inset-0 w-full h-full transition-transform duration-1000 group-hover:scale-105 filter contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-white/80 pointer-events-none">
                <span className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                  CINEMA POST FACILITY
                </span>
                <span className="hidden sm:inline bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                  BANGALORE, INDIA
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SELECTED WORK - HORIZONTAL SCROLL TRACK */}
      <section
        ref={sectionRef}
        className="horizontal-scroll-container bg-brand-black w-full relative z-10 py-10 sm:py-12 md:py-0 md:h-screen md:overflow-hidden flex flex-col justify-center items-center border-t border-white/10"
      >
        <div className="w-full flex flex-col justify-center h-full max-h-screen py-4 sm:py-6 md:py-8 space-y-4 md:space-y-6">
          {/* Top Header Bar */}
          <div className="w-full px-4 sm:px-6 lg:px-14 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 z-20 shrink-0">
            <Link
              to="/work"
              className="group inline-flex items-center gap-2.5 sm:gap-4 cursor-pointer w-fit"
              aria-label="View all selected works in portfolio"
            >
              <span className="text-xs sm:text-base font-mono tracking-widest text-white/60 group-hover:text-white transition-colors">
                [ 02 ]
              </span>
              <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tight text-white group-hover:text-brand-light transition-colors">
                SELECTED WORK
              </h3>
              <span className="text-lg sm:text-2xl text-white/40 group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300">
                →
              </span>
            </Link>

            <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-4">
              <Link
                to="/work"
                className="text-[11px] sm:text-xs uppercase font-mono tracking-widest text-white/90 hover:text-white flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 border border-white/20 hover:border-white transition-colors shrink-0"
              >
                <span>VIEW ALL (07)</span>
                <span>→</span>
              </Link>

              <div className="flex md:hidden items-center gap-1.5">
                <button
                  onClick={scrollLeftMobile}
                  aria-label="Previous work"
                  type="button"
                  className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-full bg-white/5 active:bg-white/20 text-white text-xs cursor-pointer"
                >
                  ←
                </button>
                <button
                  onClick={scrollRightMobile}
                  aria-label="Next work"
                  type="button"
                  className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-full bg-white/5 active:bg-white/20 text-white text-xs cursor-pointer"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Horizontal Carousel */}
          <div
            ref={wrapperRef}
            data-lenis-prevent
            className="horizontal-wrapper flex flex-row overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none gap-4 sm:gap-8 md:gap-10 px-4 sm:px-6 lg:px-14 w-full md:w-max items-center no-scrollbar touch-pan-x touch-scroll-momentum will-change-transform py-1"
          >
            {projects.map((project, idx) => (
              <Link
                to={`/work/${project.slug}`}
                key={project.slug}
                className="group flex flex-col w-[84vw] sm:w-[62vw] md:w-[48vh] lg:w-[52vh] xl:w-[54vh] max-w-[500px] aspect-[4/3] sm:aspect-square shrink-0 snap-start transition-all duration-300 hover:-translate-y-2 active:scale-[0.99]"
                data-cursor="view"
              >
                <div className="relative w-full h-full overflow-hidden rounded-2xl border border-white/15 bg-brand-dark shadow-[0_20px_50px_rgba(0,0,0,0.9)] group-hover:border-white/45 transition-all duration-500">
                  <img
                    src={project.thumbnail}
                    alt={`${project.title} - ${project.category}`}
                    loading="lazy"
                    decoding="async"
                    width="500"
                    height="500"
                    className="object-cover w-full h-full absolute inset-0 w-full h-full filter contrast-[1.05] brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/10 group-hover:opacity-85 transition-opacity duration-500 pointer-events-none"></div>

                  <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-10">
                    <span className="px-3 py-1 sm:px-4 sm:py-2 bg-black/80 backdrop-blur-md text-[9px] sm:text-xs font-mono font-medium tracking-wider uppercase text-white rounded-full border border-white/20 shadow-lg">
                      {project.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10">
                    <span className="text-[10px] sm:text-sm font-mono tracking-widest text-white bg-black/80 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md border border-white/20 backdrop-blur-md shadow-md">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 z-10">
                    <span className="text-[11px] sm:text-sm font-mono text-white/80 block mb-1 tracking-wider uppercase">
                      {project.client} • {project.year}
                    </span>
                    <h4 className="text-lg sm:text-2xl md:text-3xl lg:text-[2.2rem] font-display font-bold text-white tracking-tight leading-tight group-hover:text-brand-light transition-colors line-clamp-1 mb-1.5 sm:mb-2 uppercase">
                      {project.title}
                    </h4>
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-white/60">
                      <span className="truncate max-w-[70%]">{project.deliverableType}</span>
                      <span className="text-white group-hover:translate-x-1 transition-transform font-bold shrink-0 ml-2">
                        CASE STUDY →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {/* View All Work End Card */}
            <div className="w-[84vw] sm:w-[62vw] md:w-[48vh] lg:w-[52vh] xl:w-[54vh] max-w-[500px] aspect-[4/3] sm:aspect-square shrink-0 snap-start flex items-center justify-center p-6 sm:p-12 border border-white/15 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
              <Link
                to="/work"
                className="text-center group flex flex-col items-center justify-center gap-3 sm:gap-4"
              >
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-brand-grey group-hover:text-white transition-colors">
                  PORTFOLIO
                </span>
                <span className="text-xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight uppercase text-white group-hover:text-brand-grey transition-colors">
                  EXPLORE ALL WORKS ⟶
                </span>
                <span className="text-[10px] sm:text-xs font-mono text-brand-grey mt-1">
                  9 DISCIPLINES • 4K MASTER CUTS
                </span>
              </Link>
            </div>
          </div>

          {/* Subtle Bottom Status Bar */}
          <div className="w-full px-4 sm:px-6 lg:px-14 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-white/50 z-20 shrink-0">
            <span>01 / 09 CURATED CASE STUDIES</span>
            <span className="hidden sm:inline-block">SCROLL TO NAVIGATE HORIZONTALLY ⟶</span>
            <span className="sm:hidden">SWIPE HORIZONTALLY →</span>
          </div>
        </div>
      </section>

      {/* 5. CONTACT CTA */}
      <section className="relative w-full py-16 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-12 bg-brand-dark z-10 flex flex-col items-center justify-center text-center border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center w-full px-2">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-white/50 font-sans font-medium mb-3 sm:mb-4 block">
            LET&apos;S COLLABORATE
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight uppercase text-white mb-4 sm:mb-6 leading-[1.1]">
            HAVE A STORY<br />TO TELL?
          </h2>
          <p className="text-white/60 text-xs sm:text-sm tracking-[0.18em] uppercase mb-7 sm:mb-10 font-sans font-normal max-w-lg">
            Let&apos;s create something worth remembering.
          </p>
          <Link
            to="/contact"
            className="w-full sm:w-auto max-w-xs sm:max-w-none group inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-white text-black font-sans text-xs uppercase tracking-widest font-semibold hover:bg-brand-light transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95"
          >
            <span>START A PROJECT</span>
            <span className="transition-transform group-hover:translate-x-1.5 font-bold">→</span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
