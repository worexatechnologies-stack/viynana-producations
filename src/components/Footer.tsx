"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText("info.viyanaproductions@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <footer className="w-full bg-brand-black text-brand-light pt-12 sm:pt-24 pb-12 pb-safe relative overflow-hidden border-t border-white/15">
      {/* Decorative gradient flare */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* Kinetic Infinite Marquee Ribbon */}
      <div className="relative w-full overflow-hidden border-y border-white/15 py-3 sm:py-4 mb-10 sm:mb-16 bg-white/[0.035] backdrop-blur-sm">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 28 }}
          className="flex whitespace-nowrap text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] sm:tracking-[0.28em] text-white/85 font-medium w-max select-none"
        >
          <span>VIYANA PRODUCTIONS <span className="text-white/70 px-2">✦</span> COMMERCIAL ADS <span className="text-white/40 px-2">•</span> CINEMATIC CONTENT SHOOT <span className="text-white/40 px-2">•</span> ADVERTISEMENT <span className="text-white/40 px-2">•</span> MODELS PORTFOLIO SHOOTS <span className="text-white/40 px-2">•</span> VERTICAL SERIES <span className="text-white/40 px-2">•</span> WEB SERIES <span className="text-white/40 px-2">•</span> SHORT FILMS <span className="text-white/40 px-2">•</span> FILM PRODUCTION <span className="text-white/40 px-2">•</span> BANGALORE <span className="text-white/70 px-2">✦</span> </span>
          <span>VIYANA PRODUCTIONS <span className="text-white/70 px-2">✦</span> COMMERCIAL ADS <span className="text-white/40 px-2">•</span> CINEMATIC CONTENT SHOOT <span className="text-white/40 px-2">•</span> ADVERTISEMENT <span className="text-white/40 px-2">•</span> MODELS PORTFOLIO SHOOTS <span className="text-white/40 px-2">•</span> VERTICAL SERIES <span className="text-white/40 px-2">•</span> WEB SERIES <span className="text-white/40 px-2">•</span> SHORT FILMS <span className="text-white/40 px-2">•</span> FILM PRODUCTION <span className="text-white/40 px-2">•</span> BANGALORE <span className="text-white/70 px-2">✦</span> </span>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Top Callout Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-6 pb-6 sm:pb-12 mb-8 sm:mb-16 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="text-[10px] sm:text-xs uppercase font-mono tracking-widest text-brand-light">
              NOW ACCEPTING COMMISSIONS FOR 2026
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-[10px] sm:text-xs font-mono tracking-widest text-brand-grey">
            <span>STUDIO TIME (IST): <strong className="text-white font-normal">{time || "12:00:00 PM"}</strong></span>
            <span className="text-white/20">•</span>
            <span>BANGALORE</span>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 mb-10 sm:mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            <div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-brand-grey font-mono block mb-2">
                CREATIVE AD AGENCY &amp; PRODUCTION STUDIO
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-syne font-bold leading-[0.92] sm:leading-[0.9] tracking-tight uppercase mb-3 text-white">
                VIYANA<br />PRODUCTIONS
              </h2>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.18em] text-white/80 font-medium font-mono leading-relaxed mb-3 sm:mb-4">
                COMMERCIAL ADS • CINEMATIC CONTENT SHOOT • ADVERTISEMENT • MODELS PORTFOLIO SHOOTS • VERTICAL SERIES • WEB SERIES • SHORT FILMS • FILM PRODUCTION
              </p>
              <p className="text-xs sm:text-sm text-brand-grey max-w-sm leading-relaxed font-light">
                Crafting cinematic commercials, editorial fashion shoots, episodic series, and theatrical feature film productions for ambitious brands and global audiences.
              </p>
            </div>

            {/* Quick Email Copy Button */}
            <div className="pt-1">
              <button
                onClick={copyEmail}
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-3 px-4 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer active:scale-95"
              >
                <span className="text-white truncate">info.viyanaproductions@gmail.com</span>
                <span className={`text-[10px] font-semibold shrink-0 ${copied ? "text-emerald-400" : "text-white/60"}`}>
                  {copied ? "✓ COPIED" : "COPY"}
                </span>
              </button>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="lg:col-span-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-grey block mb-4 sm:mb-6 font-semibold font-mono">
              [ NAVIGATION ]
            </span>
            <ul className="flex flex-col space-y-2.5 sm:space-y-3 text-xs uppercase tracking-widest font-medium">
              {[
                { name: "About", href: "/about" },
                { name: "Work", href: "/work" },
                { name: "Showreel", href: "/showreel" },
                { name: "Directors", href: "/directors" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-white transition-colors py-1 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disciplines Column */}
          <div className="lg:col-span-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 block mb-4 sm:mb-6 font-semibold font-mono">
              [ DISCIPLINES ]
            </span>
            <ul className="flex flex-col space-y-2 text-xs uppercase tracking-wider font-medium">
              {[
                { name: "01 // Commercial Ads", href: "/work#commercial-ads" },
                { name: "02 // Cinematic Content Shoot", href: "/work#cinematic-content-shoot" },
                { name: "03 // Advertisement", href: "/work#advertisement" },
                { name: "04 // Models Portfolio Shoots", href: "/work#models-portfolio-shoots" },
                { name: "05 // Vertical Series", href: "/work#vertical-series" },
                { name: "06 // Web Series", href: "/work#web-series" },
                { name: "07 // Short Films", href: "/work#short-films" },
                { name: "08 // Film Production", href: "/work#film-production" },
                { name: "09 // Graphic Design", href: "/work#graphic-design" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-white transition-colors py-1 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Social Column */}
          <div className="lg:col-span-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-grey block mb-4 sm:mb-6 font-semibold font-mono">
              [ CONNECT ]
            </span>
            <ul className="flex flex-col space-y-2 text-xs uppercase tracking-wider font-medium">
              {[
                {
                  name: "Instagram",
                  href: "https://www.instagram.com/viyana.productions/reels/",
                  icon: (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  )
                },
                {
                  name: "Facebook",
                  href: "https://www.facebook.com/profile.php?id=61594256189978",
                  icon: (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  )
                },
                {
                  name: "YouTube",
                  href: "https://youtube.com",
                  icon: (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" stroke="none" />
                    </svg>
                  )
                },
                {
                  name: "LinkedIn",
                  href: "https://linkedin.com",
                  icon: (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  )
                },
                {
                  name: "WhatsApp",
                  href: "https://wa.me/919187233616?text=Hello%20Viyana%20Productions,%20I'd%20like%20to%20discuss%20a%20project.",
                  icon: (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  )
                },
                {
                  name: "Email Us",
                  href: "mailto:info.viyanaproductions@gmail.com",
                  icon: (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  )
                },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="text-brand-grey hover:text-white transition-all duration-300 inline-flex items-center justify-between w-full group py-1.5 px-2.5 -mx-2.5 rounded-lg hover:bg-white/5"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-white/60 group-hover:text-white transition-colors">
                        {item.icon}
                      </span>
                      <span className="group-hover:translate-x-0.5 transition-transform">
                        {item.name}
                      </span>
                    </span>
                    <span className="text-[10px] text-white/40 group-hover:text-white transition-colors">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Back to Top */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-white/10 pt-8 text-[11px] text-brand-grey uppercase tracking-widest gap-4 font-mono">
          <p className="text-center sm:text-left text-white/70">
            © {new Date().getFullYear()} VIYANA PRODUCTIONS. ALL RIGHTS RESERVED.
          </p>

          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors py-1">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors py-1">
              Terms
            </Link>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            type="button"
            className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer py-1"
          >
            <span>BACK TO TOP</span>
            <span>↑</span>
          </button>
        </div>

      </div>
    </footer>
  );
}