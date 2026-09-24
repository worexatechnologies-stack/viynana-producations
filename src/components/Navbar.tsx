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
  { id: "commercial-ads", number: "01", name: "Commercial Ads", slug: "the-next-move" },
  { id: "cinematic-content", number: "02", name: "Cinematic Content", slug: "silent-echo" },
  { id: "vertical-series", number: "03", name: "Vertical Series", slug: "neon-horizons" },
  { id: "web-series", number: "04", name: "Web Series", slug: "hyper-dimension" },
  { id: "short-films", number: "05", name: "Short Films", slug: "made-to-be-seen" },
];

export default function Navbar() {
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
      
      {/* The Always-On Floating Island */}
      <div className="fixed top-4 sm:top-6 left-0 w-full z-[100] flex justify-center px-4 pointer-events-none">
        <header className="pointer-events-auto flex items-center gap-4 sm:gap-8 bg-[#0a0a0a]/60 backdrop-blur-3xl saturate-150 border border-white/10 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.6),0_0_20px_rgba(255,255,255,0.03)] rounded-full px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-500 hover:bg-[#0a0a0a]/70 hover:border-white/20 hover:shadow-[0_30px_70px_-10px_rgba(0,0,0,0.8),0_0_30px_rgba(255,255,255,0.05)]">
          
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="group flex items-center gap-3 z-[101] select-none"
            aria-label="Viyana Productions Home"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-105 group-hover:border-white/30 group-hover:bg-white/10 shadow-inner p-1.5">
              <img
                src="/logo-icon-white.png"
                alt="Viyana Emblem"
                className="object-contain w-full h-full filter brightness-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
              />
            </div>
            {/* Optional text part, hidden on very small screens */}
            <div className="hidden sm:flex flex-col overflow-hidden">
              <span className="text-[13px] font-display tracking-tight font-bold text-white group-hover:text-white/80 transition-colors leading-none uppercase">
                VIYANA
              </span>
            </div>
          </Link>

          {/* Vertical Divider */}
          <div className="hidden md:block w-px h-6 bg-white/10" />

          {/* Desktop Navigation */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center space-x-1">
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
                      className={`text-xs font-sans tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5 relative group px-4 py-2 rounded-full ${
                        isActive ? "text-black bg-white" : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span className={`relative z-10 ${isActive ? "font-bold" : "font-semibold"}`}>{link.name}</span>
                      <svg className={`w-3.5 h-3.5 relative z-10 transition-transform duration-300 ${workDropdownOpen ? "rotate-180" : "group-hover:text-current"} ${isActive ? "text-black" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      {isActive && <motion.div layoutId="island-pill" className="absolute inset-0 bg-white rounded-full z-0 shadow-[0_0_15px_rgba(255,255,255,0.4)]" />}
                    </Link>

                    {/* Mega Menu Dropdown */}
                    <AnimatePresence>
                      {workDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.98, filter: "blur(4px)" }}
                          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: 10, scale: 0.98, filter: "blur(4px)" }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[400px] z-[120] pointer-events-auto"
                        >
                          <div className="p-3 rounded-[24px] bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden ring-1 ring-white/5">
                            <div className="px-3 pt-2 pb-3 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 border-b border-white/5 mb-2">
                              Portfolio Disciplines
                            </div>
                            <div className="flex flex-col gap-1">
                              {workCategories.map((cat, i) => (
                                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05, duration: 0.3 }} key={cat.id}>
                                  <Link to={`/work/${cat.slug}`} onClick={() => setWorkDropdownOpen(false)} className="group/item flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.06] transition-all duration-300">
                                    <div className="flex items-center gap-3">
                                      <span className="text-[10px] font-mono text-white/30 group-hover/item:text-white/60">{cat.number}</span>
                                      <span className="text-sm text-white/80 group-hover/item:text-white font-medium">{cat.name}</span>
                                    </div>
                                    <svg className="w-4 h-4 text-white/0 group-hover/item:text-white/60 transition-all -translate-x-2 group-hover/item:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                            <div className="mt-2 px-1">
                              <Link to="/work" onClick={() => setWorkDropdownOpen(false)} className="block w-full py-3 rounded-xl bg-white/5 text-white text-center text-xs font-semibold tracking-widest hover:bg-white hover:text-black transition-colors">
                                VIEW ALL WORK
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
                  className={`text-xs font-sans tracking-widest uppercase transition-all duration-300 relative group px-4 py-2 rounded-full ${
                    isActive ? "text-black bg-white" : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className={`relative z-10 ${isActive ? "font-bold" : "font-semibold"}`}>{link.name}</span>
                  {isActive && <motion.div layoutId="island-pill" className="absolute inset-0 bg-white rounded-full z-0 shadow-[0_0_15px_rgba(255,255,255,0.4)]" />}
                </Link>
              );
            })}
          </nav>

          {/* Divider & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="w-px h-6 bg-white/10" />
            <Magnetic>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 bg-white/10 text-white border border-white/20 hover:bg-white hover:text-black px-6 py-2.5 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                <span>Start Project</span>
              </Link>
            </Magnetic>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="md:hidden relative z-[101] flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 active:scale-95 transition-all cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <div className="w-4 h-3.5 flex flex-col justify-between items-center relative">
              <span className={`w-full h-[1.5px] bg-white transition-all duration-300 origin-center ${mobileMenuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
              <span className={`w-full h-[1.5px] bg-white transition-all duration-300 ${mobileMenuOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`w-full h-[1.5px] bg-white transition-all duration-300 origin-center ${mobileMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
            </div>
          </button>
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
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col">
              <div className="flex flex-col space-y-4">
                {[{ name: "Home", path: "/" }, ...navLinks, { name: "Contact", path: "/contact" }].map((link, i) => {
                  const isActive = link.path === "/" ? pathname === "/" : pathname === link.path || (link.name === "Work" && pathname.startsWith("/work"));
                  return (
                    <motion.div initial={{ opacity: 0, x: -20, filter: "blur(10px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }} key={link.name}>
                      <Link to={link.path} onClick={() => setMobileMenuOpen(false)} className={`text-4xl sm:text-5xl font-sans tracking-tight font-medium flex items-center justify-between transition-all duration-300 ${isActive ? "text-white pl-4 border-l-2 border-white" : "text-white/40 hover:text-white hover:pl-2 border-l-2 border-transparent"}`}>
                        <span className="-ml-1">{link.name}</span>
                        {isActive && <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="relative z-10 mt-12 pt-8 border-t border-white/10 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">Connect</span>
                <a href="mailto:info.viyanaproductions@gmail.com" className="text-sm font-sans text-white/80 hover:text-white">info.viyanaproductions@gmail.com</a>
                <a href="tel:+919187233615" className="text-sm font-sans text-white/80 hover:text-white">+91 91872 33615</a>
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