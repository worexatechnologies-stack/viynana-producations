import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Film, Play, User, Send, ChevronDown, ChevronRight, Phone, Mail, ArrowUpRight, X } from "lucide-react";
import BackArrow from "./BackArrow";
import Magnetic from "./Magnetic";

const navLinks = [
  { name: "About", path: "/about" },
  { name: "Work", path: "/work" },
  { name: "Showreel", path: "/showreel" },
  { name: "Directors", path: "/directors" },
  { name: "Contact", path: "/contact" },
];

const mobileBottomNavItems = [
  {
    name: "Work",
    path: "/work",
    icon: Film,
    isActive: (pathname: string) => pathname.startsWith("/work") || pathname.startsWith("/services"),
  },
  {
    name: "Showreel",
    path: "/showreel",
    icon: Play,
    isActive: (pathname: string) => pathname.startsWith("/showreel"),
  },
  {
    name: "Home",
    path: "/",
    icon: Home,
    isActive: (pathname: string) => pathname === "/",
  },
  {
    name: "About",
    path: "/about",
    icon: User,
    isActive: (pathname: string) => pathname.startsWith("/about"),
  },
  {
    name: "Contact",
    path: "/contact",
    icon: Send,
    isActive: (pathname: string) => pathname.startsWith("/contact"),
  },
];

const workCategories = [
  { id: "commercial-ads", number: "01", name: "Commercial Ads", slug: "commercial-ads" },
  { id: "cinematic-content", number: "02", name: "Cinematic Content Shoot", slug: "cinematic-content-shoot" },
  { id: "advertisement", number: "03", name: "Advertisement", slug: "advertisement" },
  { id: "models-portfolio", number: "04", name: "Models Portfolio Shoots", slug: "models-portfolio-shoots" },
  { id: "vertical-series", number: "05", name: "Vertical Series", slug: "vertical-series" },
  { id: "web-series", number: "06", name: "Web Series", slug: "web-series" },
  { id: "short-films", number: "07", name: "Short Films", slug: "short-films" },
  { id: "film-production", number: "08", name: "Film Production", slug: "feature-film-production" },
  { id: "graphic-design", number: "09", name: "Graphic Design", slug: "graphic-design-and-visual-identity" },
  { id: "product-shoot", number: "10", name: "Product Shoot", slug: "product-shoot" },
  { id: "influencer-shoot", number: "11", name: "Influencer Shoot", slug: "influencer-shoot" },
  { id: "studio-rental", number: "12", name: "Studio Rental", slug: "studio-rental" },
  { id: "podcast-production", number: "13", name: "Podcast Production", slug: "podcast-production" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
    setWorkDropdownOpen(false);
    setMobileServicesExpanded(false);
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
            ? "bg-[#060606]/85 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] py-3 sm:py-3.5"
            : "bg-gradient-to-b from-[#050505]/90 via-[#050505]/50 to-transparent py-4 sm:py-6"
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
                pathname === link.path ||
                (link.name === "Work" &&
                  (pathname.startsWith("/work") || pathname.startsWith("/services")));

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
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Desktop Start Project Button */}
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

            {/* Mobile Header Quick Contact Button */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/contact");
              }}
              className="sm:hidden relative z-[101] px-3.5 py-1.5 rounded-full bg-gradient-to-r from-white via-neutral-100 to-white text-black font-mono text-[10.5px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[0_4px_16px_rgba(255,255,255,0.22)] border border-white active:scale-95 transition-all cursor-pointer"
              aria-label="Start Project"
            >
              <span>Start</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              type="button"
              className={`md:hidden relative z-[101] flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 cursor-pointer ${
                mobileMenuOpen
                  ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                  : "bg-white/[0.08] text-white hover:bg-white/[0.15] border border-white/15"
              } active:scale-95`}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 stroke-[2.2]" />
              ) : (
                <div className="w-4 h-3.5 flex flex-col justify-between items-center">
                  <span className="w-full h-[1.5px] bg-current transition-all duration-300" />
                  <span className="w-3/4 self-end h-[1.5px] bg-current transition-all duration-300" />
                  <span className="w-full h-[1.5px] bg-current transition-all duration-300" />
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Luxury Cinematic Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            className="fixed inset-0 z-[110] bg-[#060606]/98 backdrop-blur-3xl flex flex-col justify-between px-5 sm:px-8 pt-20 pb-8 overflow-y-auto overscroll-contain will-change-transform"
          >
            {/* Ambient Lighting Accents */}
            <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 left-0 w-[300px] h-[300px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col pt-2">
              {/* Top Studio Indicator Bar */}
              <div className="mb-6 flex items-center justify-between pb-4 border-b border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/");
                  }}
                  className="flex items-center gap-2 cursor-pointer"
                  aria-label="Viyana Productions Home"
                >
                  <img
                    src="/logo-white.png"
                    alt="Viyana Productions"
                    loading="eager"
                    width="120"
                    height="32"
                    className="h-7 w-auto object-contain filter brightness-110 drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]"
                  />
                </button>

                {/* Live Availability Badge */}
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                  <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-white/70">
                    STUDIO • BANGALORE
                  </span>
                </div>
              </div>

              {/* Primary Navigation List */}
              <nav aria-label="Mobile Navigation Links" className="flex flex-col space-y-2">
                {/* 01 HOME */}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.02 }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/");
                    }}
                    className={`w-full text-left py-2.5 px-3 rounded-xl flex items-center justify-between transition-all duration-200 cursor-pointer ${
                      pathname === "/"
                        ? "bg-white/10 text-white font-bold"
                        : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-[10px] font-mono text-white/40">01</span>
                      <span className="text-2xl font-display uppercase tracking-tight">HOME</span>
                    </div>
                    {pathname === "/" ? (
                      <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-white/30" />
                    )}
                  </button>
                </motion.div>

                {/* 02 WORK & SERVICES (ACCORDION) */}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.04 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
                    className={`w-full text-left py-3 px-3 flex items-center justify-between transition-colors duration-200 cursor-pointer ${
                      pathname.startsWith("/work") || pathname.startsWith("/services")
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                    }`}
                    aria-expanded={mobileServicesExpanded}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-[10px] font-mono text-white/40">02</span>
                      <span className="text-2xl font-display uppercase tracking-tight">WORK &amp; SERVICES</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/15 text-white font-semibold tracking-wider">
                        13 DISCIPLINES
                      </span>
                      <motion.div
                        animate={{ rotate: mobileServicesExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4 text-white/60" />
                      </motion.div>
                    </div>
                  </button>

                  {/* Accordion Content: 13 Services Grid */}
                  <AnimatePresence>
                    {mobileServicesExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden border-t border-white/10 bg-black/40 px-3 py-3"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-[300px] overflow-y-auto pr-1">
                          {workCategories.map((cat) => {
                            const isCurrent =
                              pathname === `/work/${cat.slug}` ||
                              pathname === `/services/${cat.slug}`;

                            return (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  navigate(`/work/${cat.slug}`);
                                }}
                                className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between border transition-all cursor-pointer ${
                                  isCurrent
                                    ? "bg-white text-black border-white font-semibold"
                                    : "bg-white/[0.03] hover:bg-white/[0.08] border-white/5 text-white/75 hover:text-white"
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <span
                                    className={`text-[9.5px] font-mono shrink-0 ${
                                      isCurrent ? "text-black/60 font-bold" : "text-white/40"
                                    }`}
                                  >
                                    {cat.number}
                                  </span>
                                  <span className="text-xs truncate font-medium">
                                    {cat.name}
                                  </span>
                                </div>
                                <ArrowUpRight
                                  className={`w-3.5 h-3.5 shrink-0 ${
                                    isCurrent ? "text-black" : "text-white/40"
                                  }`}
                                />
                              </button>
                            );
                          })}
                        </div>

                        {/* View All Works Quick Link */}
                        <div className="mt-2.5 pt-2 border-t border-white/10">
                          <button
                            type="button"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              navigate("/work");
                            }}
                            className="w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white hover:text-black text-white text-center font-mono text-[10px] font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <span>EXPLORE ALL 13 SERVICES DIRECTORY</span>
                            <span>→</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* 03 SHOWREEL */}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.06 }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/showreel");
                    }}
                    className={`w-full text-left py-2.5 px-3 rounded-xl flex items-center justify-between transition-all duration-200 cursor-pointer ${
                      pathname.startsWith("/showreel")
                        ? "bg-white/10 text-white font-bold"
                        : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-[10px] font-mono text-white/40">03</span>
                      <span className="text-2xl font-display uppercase tracking-tight">SHOWREEL</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                        4K REEL
                      </span>
                      <Play className="w-3.5 h-3.5 fill-white/80 text-white/80" />
                    </div>
                  </button>
                </motion.div>

                {/* 04 DIRECTORS */}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.08 }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/directors");
                    }}
                    className={`w-full text-left py-2.5 px-3 rounded-xl flex items-center justify-between transition-all duration-200 cursor-pointer ${
                      pathname.startsWith("/directors")
                        ? "bg-white/10 text-white font-bold"
                        : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-[10px] font-mono text-white/40">04</span>
                      <span className="text-2xl font-display uppercase tracking-tight">DIRECTORS</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/30" />
                  </button>
                </motion.div>

                {/* 05 ABOUT */}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.10 }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/about");
                    }}
                    className={`w-full text-left py-2.5 px-3 rounded-xl flex items-center justify-between transition-all duration-200 cursor-pointer ${
                      pathname.startsWith("/about")
                        ? "bg-white/10 text-white font-bold"
                        : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-[10px] font-mono text-white/40">05</span>
                      <span className="text-2xl font-display uppercase tracking-tight">ABOUT</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/30" />
                  </button>
                </motion.div>

                {/* 06 CONTACT */}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.12 }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/contact");
                    }}
                    className={`w-full text-left py-2.5 px-3 rounded-xl flex items-center justify-between transition-all duration-200 cursor-pointer ${
                      pathname.startsWith("/contact")
                        ? "bg-white/10 text-white font-bold"
                        : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-[10px] font-mono text-white/40">06</span>
                      <span className="text-2xl font-display uppercase tracking-tight">CONTACT</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/30" />
                  </button>
                </motion.div>
              </nav>

              {/* Start Project Primary CTA Button */}
              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/contact");
                  }}
                  className="w-full py-4 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.35)] active:scale-98 transition-transform"
                >
                  <span>START A PROJECT</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

              {/* Studio Quick Connect Cards */}
              <div className="mt-5 grid grid-cols-2 gap-2.5">
                <a
                  href="tel:+919187233615"
                  className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/25 flex flex-col gap-1 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-white/40">CALL US</span>
                    <Phone className="w-3.5 h-3.5 text-white/70" />
                  </div>
                  <span className="text-xs font-semibold text-white truncate">+91 91872 33615</span>
                  <span className="text-[9px] text-white/40">Direct Producer Line</span>
                </a>

                <a
                  href="mailto:creative@viyana.productions"
                  className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/25 flex flex-col gap-1 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-white/40">EMAIL</span>
                    <Mail className="w-3.5 h-3.5 text-white/70" />
                  </div>
                  <span className="text-xs font-semibold text-white truncate">creative@viyana</span>
                  <span className="text-[9px] text-white/40">Pitch / Inquiries</span>
                </a>
              </div>
            </div>

            {/* Mobile Footer Matrix */}
            <div className="relative z-10 mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
              <span>© {new Date().getFullYear()} VIYANA PRODUCTIONS</span>
              <a
                href="https://www.instagram.com/viyana.productions/reels/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white uppercase tracking-widest flex items-center gap-1"
              >
                <span>INSTAGRAM</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MOBILE BOTTOM FLOATING DOCK (iOS / Glassmorphism Dock Style) ── */}
      <div
        className={`md:hidden fixed bottom-[calc(0.35rem+env(safe-area-inset-bottom,0px))] inset-x-2.5 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-[420px] max-w-[440px] z-[120] transition-all duration-300 pointer-events-auto touch-manipulation ${
          mobileMenuOpen ? "opacity-0 pointer-events-none translate-y-6" : "opacity-100 translate-y-0"
        }`}
      >
        <nav
          aria-label="Mobile Bottom Navigation"
          className="relative flex items-center justify-between p-1.5 rounded-full bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(255,255,255,0.06),inset_0_1px_1px_rgba(255,255,255,0.2)]"
        >
          {/* Subtle Ambient Glow behind dock */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/5 via-white/10 to-white/5 pointer-events-none blur-sm" />

          {mobileBottomNavItems.map((item) => {
            const Icon = item.icon;
            const active = item.isActive(pathname);

            return (
              <button
                key={item.name}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileMenuOpen(false);
                  navigate(item.path);
                }}
                className="relative flex-1 flex flex-col items-center justify-center min-h-[48px] py-1.5 px-1 rounded-full group select-none active:scale-95 transition-transform cursor-pointer"
                aria-label={item.name}
                aria-current={active ? "page" : undefined}
              >
                {/* Active Pill Highlight with Spring Animation (Style 05 & 11) */}
                {active && (
                  <motion.div
                    layoutId="mobile-dock-active-pill"
                    className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)] z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Icon & Label */}
                <div className="relative z-10 flex flex-col items-center justify-center gap-0.5">
                  <Icon
                    className={`w-[19px] h-[19px] transition-all duration-200 ${
                      active
                        ? item.name === "Showreel"
                          ? "text-black fill-black scale-105"
                          : "text-black stroke-[2.2] scale-105"
                        : item.name === "Showreel"
                          ? "text-white/60 group-hover:text-white fill-white/60 group-hover:fill-white"
                          : "text-white/60 group-hover:text-white stroke-[1.8]"
                    }`}
                  />
                  <span
                    className={`text-[9px] font-mono tracking-tight uppercase transition-colors duration-200 ${
                      active
                        ? "text-black font-bold"
                        : "text-white/55 group-hover:text-white font-medium"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}