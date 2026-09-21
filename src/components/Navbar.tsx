"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import BackArrow from "./BackArrow";

const navLinks = [
  { name: "About", path: "/about" },
  { name: "Work", path: "/work" },
  { name: "Showreel", path: "/showreel" },
  { name: "Directors", path: "/directors" },
  { name: "Contact", path: "/contact" },
];

const workCategories = [
  { id: "commercial-ads", number: "01", name: "Commercial Ads", desc: "TVCs & National Commercial Campaigns", slug: "the-next-move" },
  { id: "cinematic-content-shoot", number: "02", name: "Cinematic Content Shoot", desc: "Atmospheric Brand Films & Cinematic Visuals", slug: "silent-echo" },
  { id: "advertisement", number: "03", name: "Advertisement", desc: "High-Conversion Multi-Platform Campaigns", slug: "lumina-prime" },
  { id: "models-portfolio-shoots", number: "04", name: "Models Portfolio Shoots", desc: "High-Fashion Lookbooks & Agency Portfolios", slug: "vogue-silhouette" },
  { id: "vertical-series", number: "05", name: "Vertical Series", desc: "9:16 Mobile-First Episodic Series", slug: "neon-horizons" },
  { id: "web-series", number: "06", name: "Web Series", desc: "4K Digital OTT Originals", slug: "hyper-dimension" },
  { id: "short-films", number: "07", name: "Short Films", desc: "Festival Selection & Auteur Storytelling", slug: "made-to-be-seen" },
  { id: "film-production", number: "08", name: "Film Production", desc: "Theatrical Feature Film Co-Productions", slug: "beyond-the-horizon" },
  { id: "graphic-design", number: "09", name: "Graphic Design", desc: "Visual Brand Identities & Key Visuals", slug: "genesis" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
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
      
      {/* Top Fixed Header */}
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          isScrolled || mobileMenuOpen
            ? "py-3 sm:py-4 bg-brand-black/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/80"
            : "py-3.5 sm:py-6 bg-brand-black/80 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border-b border-white/10 sm:border-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-center">
          
          {/* Brand Logo & Name */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="group flex items-center gap-2.5 sm:gap-3 relative z-[101] py-1 select-none"
            aria-label="Viyana Productions Home"
          >
            <div className="relative w-7 h-7 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-white/25 bg-brand-dark flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.jpg"
                alt="Viyana Emblem"
                fill
                sizes="36px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] sm:text-sm md:text-base font-serif tracking-wider uppercase font-semibold text-white group-hover:text-brand-light transition-colors leading-tight">
                VIYANA PRODUCTIONS
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-brand-grey font-mono">
                Creative Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center space-x-6 lg:space-x-8"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.path || (link.name === "Work" && pathname.startsWith("/work"));

              if (link.name === "Work") {
                return (
                  <div
                    key={link.name}
                    className="relative py-2"
                    onMouseEnter={handleWorkMouseEnter}
                    onMouseLeave={handleWorkMouseLeave}
                  >
                    <Link
                      href={link.path}
                      className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 flex items-center gap-1.5 relative group ${
                        isActive ? "text-white font-semibold" : "text-brand-grey hover:text-white"
                      }`}
                    >
                      <span>{link.name}</span>
                      <svg
                        className={`w-3 h-3 transition-transform duration-300 ${
                          workDropdownOpen ? "rotate-180 text-white" : "text-white/40 group-hover:text-white"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      <span
                        className={`absolute bottom-0 left-0 h-[1px] bg-white transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </Link>

                    {/* Hover Dropdown Menu */}
                    <AnimatePresence>
                      {workDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/4 sm:-translate-x-1/3 md:-translate-x-1/3 pt-3 w-[94vw] max-w-[760px] z-[120] pointer-events-auto"
                        >
                          <div className="p-5 sm:p-6 rounded-3xl bg-[#0b0c10]/95 backdrop-blur-2xl border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.85)] ring-1 ring-white/10 font-sans">
                            {/* Dropdown Header */}
                            <div className="px-1 pb-4 border-b border-white/10 flex items-center justify-between mb-4">
                              <div className="flex items-center gap-2.5">
                                <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
                                <span className="text-xs uppercase tracking-[0.2em] text-white font-semibold font-sans">
                                  Portfolio Disciplines
                                </span>
                              </div>
                              <span className="text-[11px] font-medium text-white/70 px-3 py-1 rounded-full bg-white/[0.08] border border-white/15 font-sans">
                                07 Categories
                              </span>
                            </div>

                            {/* Two-Column Grid: One side 3, another side 4 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {/* Left Column: 3 Categories + Studio Highlight */}
                              <div className="space-y-2.5">
                                {workCategories.slice(0, 3).map((cat) => (
                                  <Link
                                    key={cat.id}
                                    href={`/work/${cat.slug}`}
                                    onClick={() => setWorkDropdownOpen(false)}
                                    className="group/item flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-white/25 transition-all duration-200 text-left shadow-sm hover:shadow-md"
                                  >
                                    <div className="flex items-center gap-3.5">
                                      <span className="text-xs font-semibold text-white/45 group-hover/item:text-white font-sans w-5 shrink-0 transition-colors">
                                        {cat.number}
                                      </span>
                                      <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-white group-hover/item:text-white transition-colors font-sans">
                                          {cat.name}
                                        </span>
                                        <span className="text-xs text-white/60 group-hover/item:text-white/80 font-sans mt-0.5 leading-snug font-normal">
                                          {cat.desc}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="w-7 h-7 rounded-full bg-white/[0.06] group-hover/item:bg-white text-white/70 group-hover/item:text-black flex items-center justify-center text-xs transition-all shrink-0 ml-3 group-hover/item:translate-x-1 font-sans">
                                      →
                                    </div>
                                  </Link>
                                ))}

                                {/* Balanced Studio Reel Callout Card in 4th slot */}
                                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-white/[0.06] to-white/[0.02] border border-white/15 flex items-center justify-between">
                                  <div className="flex flex-col text-left">
                                    <span className="text-xs text-white font-semibold tracking-wide uppercase flex items-center gap-2 font-sans">
                                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                      4K Cinema Mastered
                                    </span>
                                    <span className="text-xs text-white/60 font-sans mt-0.5 font-normal">
                                      Dolby Vision &amp; Atmos Studio
                                    </span>
                                  </div>
                                  <Link
                                    href="/showreel"
                                    onClick={() => setWorkDropdownOpen(false)}
                                    className="text-xs font-sans uppercase tracking-wider text-white hover:text-black hover:bg-white flex items-center gap-1.5 font-semibold px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 transition-all shadow-sm shrink-0 ml-3"
                                  >
                                    <span>Reel</span>
                                    <span>→</span>
                                  </Link>
                                </div>
                              </div>

                              {/* Right Column: 4 Categories */}
                              <div className="space-y-2.5">
                                {workCategories.slice(3, 7).map((cat) => (
                                  <Link
                                    key={cat.id}
                                    href={`/work/${cat.slug}`}
                                    onClick={() => setWorkDropdownOpen(false)}
                                    className="group/item flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-white/25 transition-all duration-200 text-left shadow-sm hover:shadow-md"
                                  >
                                    <div className="flex items-center gap-3.5">
                                      <span className="text-xs font-semibold text-white/45 group-hover/item:text-white font-sans w-5 shrink-0 transition-colors">
                                        {cat.number}
                                      </span>
                                      <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-white group-hover/item:text-white transition-colors font-sans">
                                          {cat.name}
                                        </span>
                                        <span className="text-xs text-white/60 group-hover/item:text-white/80 font-sans mt-0.5 leading-snug font-normal">
                                          {cat.desc}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="w-7 h-7 rounded-full bg-white/[0.06] group-hover/item:bg-white text-white/70 group-hover/item:text-black flex items-center justify-center text-xs transition-all shrink-0 ml-3 group-hover/item:translate-x-1 font-sans">
                                      →
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>

                            {/* Dropdown Footer CTA */}
                            <div className="pt-4 border-t border-white/10 mt-4">
                              <Link
                                href="/work"
                                onClick={() => setWorkDropdownOpen(false)}
                                className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-white text-black hover:bg-brand-light text-xs font-sans tracking-widest uppercase transition-all font-bold shadow-lg group/all hover:scale-[1.005]"
                              >
                                <span>VIEW ALL WORK (07)</span>
                                <span className="transition-transform group-hover/all:translate-x-1.5 font-bold">→</span>
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
                  href={link.path}
                  className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 relative py-2 group ${
                    isActive ? "text-white font-semibold" : "text-brand-grey hover:text-white"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-[1px] bg-white transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Action Area: Desktop CTA & Mobile Hamburger Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 hover:border-white text-xs tracking-widest uppercase font-medium bg-white/5 hover:bg-white hover:text-black transition-all duration-300 group"
            >
              <span>LET&apos;S CREATE</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden relative z-[101] flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/25 bg-brand-black/95 active:scale-95 text-white text-xs uppercase tracking-widest font-mono font-medium transition-all shadow-xl cursor-pointer"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span className="text-[11px] font-semibold tracking-wider">{mobileMenuOpen ? "CLOSE" : "MENU"}</span>
              <div className="w-4 h-3.5 flex flex-col justify-between items-center relative">
                <span
                  className={`w-4 h-0.5 bg-white transition-all duration-300 transform origin-center ${
                    mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                />
                <span
                  className={`w-4 h-0.5 bg-white transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0 scale-x-0" : ""
                  }`}
                />
                <span
                  className={`w-4 h-0.5 bg-white transition-all duration-300 transform origin-center ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            className="fixed inset-0 z-[90] bg-[#070707] flex flex-col justify-between px-5 sm:px-8 pt-20 pb-6 overflow-y-auto overscroll-contain touch-scroll-momentum"
          >
            {/* Ambient Lighting Gradient */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col space-y-6 pt-2">
              {/* Studio Status Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-white/70">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>COMMISSIONS OPEN 2026</span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                  BANGALORE
                </span>
              </div>

              {/* Primary Navigation Links */}
              <div className="flex flex-col space-y-1">
                <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-mono mb-1">
                  MAIN DIRECTORY
                </span>
                {[
                  { name: "Home", path: "/" },
                  ...navLinks,
                ].map((link, i) => {
                  const isActive =
                    link.path === "/"
                      ? pathname === "/"
                      : pathname === link.path || (link.name === "Work" && pathname.startsWith("/work"));

                  return (
                    <Link
                      key={link.name}
                      href={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-2xl sm:text-3xl font-serif tracking-tight py-2.5 px-2 flex items-center justify-between rounded-xl transition-all duration-200 active:scale-[0.99] ${
                        isActive
                          ? "text-white font-semibold bg-white/10 pl-3 border-l-2 border-white"
                          : "text-white/80 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      <span>{link.name}</span>
                      <span className="text-xs text-white/40 tracking-widest font-mono">
                        0{i + 1}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Core Disciplines - Modern 2-Column Compact Grid */}
              <div className="pt-2 space-y-2.5 font-sans">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-white/50 font-mono font-medium">
                    DISCIPLINES (09)
                  </span>
                  <Link
                    href="/work"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[10px] uppercase font-mono tracking-wider text-white/80 hover:text-white underline underline-offset-2"
                  >
                    View All →
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {workCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/work/${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2.5 rounded-xl bg-white/[0.035] border border-white/10 text-left active:bg-white/15 transition-all flex flex-col justify-between group hover:border-white/30"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-white/40 mb-1">
                        <span>{cat.number}</span>
                        <span className="group-hover:translate-x-0.5 transition-transform text-white/60">→</span>
                      </div>
                      <span className="text-xs font-sans font-medium text-white line-clamp-1 leading-tight">
                        {cat.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky/Fixed Bottom CTA & Direct Touch Channels */}
            <div className="relative z-10 flex flex-col space-y-2.5 pt-6 pb-safe border-t border-white/10 mt-6">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-full bg-white text-black text-center text-xs tracking-widest uppercase font-semibold hover:bg-brand-light transition-transform active:scale-[0.98] shadow-2xl font-mono flex items-center justify-center gap-2"
              >
                <span>START A PROJECT</span>
                <span className="font-bold">→</span>
              </Link>
              
              <div className="grid grid-cols-2 gap-2 text-center">
                <a
                  href="https://wa.me/919187233616?text=Hello%20Viyana%20Productions,%20I'd%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-full bg-white/5 border border-white/15 text-[11px] font-mono text-white/80 hover:text-white active:bg-white/15 transition-colors"
                >
                  WhatsApp ↗
                </a>
                <a
                  href="tel:+919187233616"
                  className="py-2 px-3 rounded-full bg-white/5 border border-white/15 text-[11px] font-mono text-white/80 hover:text-white active:bg-white/15 transition-colors"
                >
                  Call Desk ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}