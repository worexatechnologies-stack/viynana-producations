import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import BackArrow from "./BackArrow";
import Magnetic from "./Magnetic";

const navLinks = [
  { name: "About", path: "/about" },
  { name: "Work", path: "/work" },
  { name: "Showreel", path: "/showreel" },
  { name: "Directors", path: "/directors" },
];

const workCategories = [
  { id: "commercial-ads", number: "01", name: "Commercial Ads", slug: "commercial-ads" },
  { id: "cinematic-content", number: "02", name: "Cinematic Content Shoot", slug: "cinematic-content-shoot" },
  { id: "advertisement", number: "03", name: "Advertisement", slug: "advertisement" },
  { id: "models-portfolio", number: "04", name: "Models Portfolio Shoots", slug: "models-portfolio-shoots" },
  { id: "vertical-series", number: "05", name: "Vertical Series", slug: "vertical-series" },
  { id: "web-series", number: "06", name: "Web Series", slug: "web-series" },
  { id: "short-films", number: "07", name: "Short Films", slug: "short-films" },
  { id: "film-production", number: "08", name: "Film Production", slug: "film-production" },
  { id: "graphic-design", number: "09", name: "Graphic Design", slug: "graphic-design" },
  { id: "product-shoot", number: "10", name: "Product Shoot", slug: "product-shoot" },
  { id: "influencer-shoot", number: "11", name: "Influencer Shoot", slug: "influencer-shoot" },
  { id: "studio-rental", number: "12", name: "Studio Rental", slug: "studio-rental" },
  { id: "podcast-production", number: "13", name: "Podcast Production", slug: "podcast-production" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { pathname } = useLocation();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
    setWorkDropdownOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWorkMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setWorkDropdownOpen(true);
  };

  const handleWorkMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setWorkDropdownOpen(false);
    }, 180);
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {pathname !== "/" && <BackArrow />}

      {/* Cinematic Studio Edge-to-Edge Navigation */}
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 select-none ${
          scrolled
            ? "bg-[#060606]/85 backdrop-blur-2xl border-b border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.8)] py-3 sm:py-3.5"
            : "bg-gradient-to-b from-[#050505]/90 via-[#050505]/50 to-transparent border-b border-white/[0.04] py-4 sm:py-6"
        }`}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          
          {/* Brand Anchor */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="group flex items-center gap-3 relative z-[101]"
              aria-label="Viyana Productions Home"
            >
              <img
                src="/logo-white.png"
                alt="Viyana Productions"
                width="140"
                height="40"
                fetchPriority="high"
                decoding="async"
                className="h-8 sm:h-9 md:h-10 w-auto object-contain filter brightness-110 drop-shadow-[0_0_16px_rgba(255,255,255,0.3)] transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </Link>
          </div>

          {/* Desktop Center Navigation (Floating Glass Pill Deck) */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 px-1.5 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_20px_rgba(0,0,0,0.5)]"
          >
            {navLinks.map((link) => {
              const isActive =
                pathname === link.path || (link.name === "Work" && pathname.startsWith("/work"));

              if (link.name === "Work") {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={handleWorkMouseEnter}
                    onMouseLeave={handleWorkMouseLeave}
                  >
                    <Link
                      to={link.path}
                      className={`relative px-4 py-2 rounded-full text-xs font-mono uppercase tracking-[0.16em] flex items-center gap-1.5 transition-all duration-300 z-10 ${
                        isActive
                          ? "text-black font-bold"
                          : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                      }`}
                    >
                      <span className="relative z-10">{link.name}</span>
                      <svg
                        className={`w-3 h-3 relative z-10 transition-transform duration-300 ${
                          workDropdownOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                      {isActive && (
                        <motion.div
                          layoutId="nav-active-pill"
                          className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)] z-0"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                    </Link>

                    {/* Mega-Menu Dropdown */}
                    <AnimatePresence>
                      {workDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[620px] z-[120] pointer-events-auto"
                        >
                          <div className="p-4 rounded-3xl bg-[#090909]/95 backdrop-blur-3xl border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_30px_rgba(255,255,255,0.03)] overflow-hidden">
                            {/* Dropdown Header */}
                            <div className="px-3 pt-1 pb-3 flex items-center justify-between border-b border-white/10 mb-2.5">
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/60">
                                  13 Core Services &amp; Disciplines
                                </span>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white font-semibold">
                                13 SERVICES
                              </span>
                            </div>

                            {/* Services Grid */}
                            <div className="grid grid-cols-2 gap-1.5 max-h-[360px] overflow-y-auto pr-1 no-scrollbar">
                              {workCategories.map((cat, i) => (
                                <motion.div
                                  initial={{ opacity: 0, x: -6 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.02, duration: 0.2 }}
                                  key={cat.id}
                                >
                                  <Link
                                    to={`/work/${cat.slug}`}
                                    onClick={() => setWorkDropdownOpen(false)}
                                    className="group/item flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.08] border border-transparent hover:border-white/10 transition-all duration-200"
                                  >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                      <span className="text-[10px] font-mono text-white/35 group-hover/item:text-white font-semibold shrink-0">
                                        {cat.number}
                                      </span>
                                      <span className="text-xs text-white/80 group-hover/item:text-white font-medium truncate">
                                        {cat.name}
                                      </span>
                                    </div>
                                    <svg
                                      className="w-3.5 h-3.5 text-white/0 group-hover/item:text-white/70 transition-all -translate-x-1 group-hover/item:translate-x-0 shrink-0"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                      />
                                    </svg>
                                  </Link>
                                </motion.div>
                              ))}
                            </div>

                            {/* Dropdown Bottom Banner */}
                            <div className="mt-3 pt-2.5 border-t border-white/10 px-1">
                              <Link
                                to="/work"
                                onClick={() => setWorkDropdownOpen(false)}
                                className="block w-full py-2.5 rounded-xl bg-white/10 text-white text-center text-xs font-semibold tracking-widest hover:bg-white hover:text-black transition-colors uppercase font-mono"
                              >
                                EXPLORE ALL 13 SERVICES →
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-full text-xs font-mono uppercase tracking-[0.16em] transition-all duration-300 z-10 ${
                    isActive
                      ? "text-black font-bold"
                      : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)] z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Area: Start Project CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:block">
              <Magnetic>
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:bg-brand-light hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] active:scale-95"
                >
                  <span>Start Project</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </Link>
              </Magnetic>
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden relative z-[101] flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 active:scale-95 transition-all cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <div className="w-4 h-3.5 flex flex-col justify-between items-center relative">
                <span
                  className={`w-full h-[1.5px] bg-white transition-all duration-300 origin-center ${
                    mobileMenuOpen ? "rotate-45 translate-y-[6px]" : ""
                  }`}
                />
                <span
                  className={`w-full h-[1.5px] bg-white transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0 scale-x-0" : ""
                  }`}
                />
                <span
                  className={`w-full h-[1.5px] bg-white transition-all duration-300 origin-center ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            className="fixed inset-0 z-[90] bg-[#050505]/98 backdrop-blur-3xl flex flex-col justify-between px-6 pt-24 pb-8 overflow-y-auto overscroll-contain"
          >
            {/* Ambient Lighting Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col pt-4">
              <div className="mb-6">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-block"
                  aria-label="Viyana Productions Home"
                >
                  <img
                    src="/logo-white.png"
                    alt="Viyana Productions"
                    loading="lazy"
                    width="140"
                    height="40"
                    className="h-10 sm:h-12 w-auto object-contain filter brightness-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                  />
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col space-y-3">
                {[{ name: "Home", path: "/" }, ...navLinks, { name: "Contact", path: "/contact" }].map(
                  (link, i) => {
                    const isActive =
                      link.path === "/"
                        ? pathname === "/"
                        : pathname === link.path ||
                          (link.name === "Work" && pathname.startsWith("/work"));
                    return (
                      <motion.div
                        initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        key={link.name}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`text-3xl sm:text-4xl font-display uppercase tracking-tight font-bold flex items-center justify-between transition-all duration-300 ${
                            isActive
                              ? "text-white pl-4 border-l-2 border-white"
                              : "text-white/40 hover:text-white hover:pl-2 border-l-2 border-transparent"
                          }`}
                        >
                          <span className="-ml-1">{link.name}</span>
                          {isActive && (
                            <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                          )}
                        </Link>
                      </motion.div>
                    );
                  }
                )}
              </div>

              {/* Mobile Start Project Button */}
              <div className="mt-6">
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2"
                >
                  <span>Start Project</span>
                  <span>↗</span>
                </Link>
              </div>
            </div>

            {/* Mobile Footer Matrix */}
            <div className="relative z-10 mt-10 pt-6 border-t border-white/10 flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">
                  Connect // Studio
                </span>
                <a
                  href="mailto:creative@viyana.productions"
                  className="text-xs sm:text-sm font-sans text-white/80 hover:text-white"
                >
                  creative@viyana.productions
                </a>
                <a
                  href="mailto:director@viyana.productions"
                  className="text-xs sm:text-sm font-sans text-white/80 hover:text-white"
                >
                  director@viyana.productions
                </a>
                <a
                  href="tel:+919187233615"
                  className="text-xs sm:text-sm font-sans text-white/80 hover:text-white"
                >
                  +91 91872 33615
                </a>
              </div>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/viyana.productions/reels/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono uppercase tracking-widest text-white/50 hover:text-white"
                >
                  Instagram
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}