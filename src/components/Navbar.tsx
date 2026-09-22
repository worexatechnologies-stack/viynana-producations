import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import BackArrow from "./BackArrow";

const navLinks = [
  { name: "About", path: "/about" },
  { name: "Work", path: "/work" },
  { name: "Showreel", path: "/showreel" },
  { name: "Directors", path: "/directors" },
];

const workCategories = [
  { id: "commercial-ads", number: "01", name: "Commercial Ads", slug: "the-next-move" },
  { id: "cinematic-content", number: "02", name: "Cinematic Content", slug: "silent-echo" },
  { id: "vertical-series", number: "03", name: "Vertical Series", slug: "neon-horizons" },
  { id: "web-series", number: "04", name: "Web Series", slug: "hyper-dimension" },
  { id: "short-films", number: "05", name: "Short Films", slug: "made-to-be-seen" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const { pathname } = useLocation();
  const [prevPathname, setPrevPathname] = useState(pathname);
  
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  const handleWorkMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setWorkDropdownOpen(true);
  };

  const handleWorkMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setWorkDropdownOpen(false);
    }, 150);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
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

      {/* Floating Pill Header Container */}
      <div className="fixed top-0 left-0 w-full z-[100] pt-4 sm:pt-6 px-4 sm:px-6 pointer-events-none flex justify-center">
        <header
          className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-visible ${
            isScrolled || mobileMenuOpen
              ? "w-full max-w-5xl bg-[#0a0a0a]/85 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] rounded-full py-2.5 sm:py-3 px-4 sm:px-6"
              : "w-full max-w-7xl bg-transparent border border-transparent shadow-none rounded-none py-3 px-0 sm:px-2"
          }`}
        >
          {/* Brand Logo & Name */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="group flex items-center gap-2.5 sm:gap-3 z-[101] select-none"
            aria-label="Viyana Productions Home"
          >
            <div className={`relative rounded-full overflow-hidden border border-white/20 bg-black/60 flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-105 group-hover:border-white/40 shadow-inner ${
              isScrolled ? "w-8 h-8 p-1.5" : "w-10 h-10 p-2"
            }`}>
              <img
                src="/logo-icon-white.png"
                alt="Viyana Emblem"
                className="object-contain w-full h-full filter brightness-110"
              />
            </div>
            <div className={`flex flex-col overflow-hidden transition-all duration-500 ${isScrolled ? "w-0 opacity-0 sm:w-auto sm:opacity-100" : "w-auto opacity-100"}`}>
              <span className="text-[14px] sm:text-base font-display tracking-tight font-bold text-white group-hover:text-white/80 transition-colors leading-none uppercase">
                VIYANA
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-white/70 font-display font-semibold mt-0.5">
                PRODUCTIONS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className={`hidden md:flex items-center transition-all duration-500 ${
              isScrolled ? "space-x-1 bg-white/[0.03] p-1 rounded-full border border-white/5" : "space-x-8"
            }`}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.path || (link.name === "Work" && pathname.startsWith("/work"));

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
                      className={`text-sm font-sans tracking-wide transition-all duration-300 flex items-center gap-1.5 relative group ${
                        isScrolled ? "px-4 py-2 rounded-full" : "py-2"
                      } ${
                        isActive
                          ? isScrolled ? "bg-white/10 text-white" : "text-white"
                          : isScrolled ? "text-white/70 hover:text-white hover:bg-white/5" : "text-white/70 hover:text-white"
                      }`}
                    >
                      <span className={isActive ? "font-medium" : "font-normal"}>{link.name}</span>
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          workDropdownOpen ? "rotate-180 text-white" : "text-white/50 group-hover:text-white"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                      </svg>
                      
                      {!isScrolled && isActive && (
                        <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white" />
                      )}
                    </Link>

                    {/* Minimal Work Dropdown */}
                    <AnimatePresence>
                      {workDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.98 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[280px] z-[120] pointer-events-auto"
                        >
                          <div className="p-2 rounded-2xl bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/15 shadow-[0_30px_60px_rgba(0,0,0,0.6)] ring-1 ring-white/5 font-sans overflow-hidden">
                            <div className="px-3 pt-2 pb-2 text-[10px] font-mono uppercase tracking-widest text-white/40 border-b border-white/5 mb-1">
                              Portfolio Disciplines
                            </div>
                            <div className="flex flex-col">
                              {workCategories.map((cat) => (
                                <Link
                                  key={cat.id}
                                  to={`/work/${cat.slug}`}
                                  onClick={() => setWorkDropdownOpen(false)}
                                  className="group/item flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors"
                                >
                                  <span className="text-[10px] font-mono text-white/30 group-hover/item:text-white/50 w-4">
                                    {cat.number}
                                  </span>
                                  <span className="text-sm text-white/80 group-hover/item:text-white font-medium">
                                    {cat.name}
                                  </span>
                                </Link>
                              ))}
                            </div>
                            <div className="mt-1 p-1">
                              <Link
                                to="/work"
                                onClick={() => setWorkDropdownOpen(false)}
                                className="block w-full py-2.5 rounded-xl bg-white text-black text-center text-xs font-semibold tracking-wider hover:bg-brand-light transition-colors"
                              >
                                View All Work
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
                  className={`text-sm font-sans tracking-wide transition-all duration-300 relative group ${
                    isScrolled ? "px-4 py-2 rounded-full" : "py-2"
                  } ${
                    isActive
                      ? isScrolled ? "bg-white/10 text-white" : "text-white"
                      : isScrolled ? "text-white/70 hover:text-white hover:bg-white/5" : "text-white/70 hover:text-white"
                  }`}
                >
                  <span className={isActive ? "font-medium" : "font-normal"}>{link.name}</span>
                  {!isScrolled && isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Area: Desktop CTA & Mobile Hamburger Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/contact"
              className={`hidden md:inline-flex items-center justify-center rounded-full font-sans text-sm font-medium transition-all duration-300 group ${
                isScrolled 
                  ? "bg-white text-black px-5 py-2 hover:scale-105" 
                  : "bg-white/10 text-white border border-white/20 hover:bg-white hover:text-black px-6 py-2.5"
              }`}
            >
              <span>Start a Project</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className={`md:hidden relative z-[101] flex items-center justify-center w-10 h-10 rounded-full border border-white/15 active:scale-95 transition-all cursor-pointer ${
                mobileMenuOpen || isScrolled ? "bg-white/10 backdrop-blur-md" : "bg-black/20 backdrop-blur-md"
              }`}
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
        </header>
      </div>

      {/* Full-Screen Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            className="fixed inset-0 z-[90] bg-[#050505]/95 backdrop-blur-3xl flex flex-col justify-between px-6 pt-28 pb-8 overflow-y-auto overscroll-contain"
          >
            {/* Ambient Lighting Gradient */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col">
              <div className="flex flex-col space-y-4">
                {[
                  { name: "Home", path: "/" },
                  ...navLinks,
                  { name: "Contact", path: "/contact" }
                ].map((link, i) => {
                  const isActive =
                    link.path === "/"
                      ? pathname === "/"
                      : pathname === link.path || (link.name === "Work" && pathname.startsWith("/work"));

                  return (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      key={link.name}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-4xl sm:text-5xl font-sans tracking-tight font-medium flex items-center justify-between transition-colors ${
                          isActive ? "text-white" : "text-white/40 hover:text-white"
                        }`}
                      >
                        <span>{link.name}</span>
                        {isActive && <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Footer Links */}
            <div className="relative z-10 mt-12 pt-8 border-t border-white/10 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">Connect</span>
                <a href="mailto:info.viyanaproductions@gmail.com" className="text-sm font-sans text-white/80 hover:text-white">
                  info.viyanaproductions@gmail.com
                </a>
                <a href="tel:+919187233615" className="text-sm font-sans text-white/80 hover:text-white">
                  +91 91872 33615
                </a>
              </div>
              <div className="flex gap-4">
                <a href="#" className="text-xs font-mono uppercase tracking-widest text-white/50 hover:text-white">Instagram</a>
                <a href="#" className="text-xs font-mono uppercase tracking-widest text-white/50 hover:text-white">LinkedIn</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}