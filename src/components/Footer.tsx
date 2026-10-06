"use client";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  MessageCircle,
  Mail,
  MapPin,
  Check,
  Copy
} from "lucide-react";

function InstagramIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YouTubeIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const navigationLinks = [
  { name: "About Studio", href: "/about" },
  { name: "Selected Work", href: "/work" },
  { name: "Directors Roster", href: "/directors" },
  { name: "4K Showreel", href: "/showreel" },
  { name: "Studio Rental", href: "/studio" },
  { name: "Podcast Studio", href: "/podcast" },
  { name: "Commission Brief", href: "/contact" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms-and-conditions" },
  { name: "Studio Press", href: "/press" },
  { name: "Stills Archive", href: "/stills" },
  { name: "Studio Journal", href: "/journal" },
];

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleEmailAction = (email: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => {
        setCopiedEmail((prev) => (prev === email ? null : prev));
      }, 2500);
    }
  };

  const copyEmail = () => {
    handleEmailAction("info.viyanaproductions@gmail.com");
  };

  return (
    <footer className="w-full bg-[#050505] text-brand-light relative overflow-hidden border-t border-white/10 selection:bg-white selection:text-black">
      {/* Ambient Radial Lights */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[700px] h-[350px] bg-white/[0.015] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-white/[0.012] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-40" />

      {/* Top Border Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      {/* ── 1. HERO CTA BANNER (WHITE HIGH-IMPACT EDITORIAL SECTION) ─── */}
      <div className="bg-white text-black pt-16 sm:pt-24 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-12 border-b border-black/10 relative z-10 selection:bg-black selection:text-white">
        {/* Subtle architectural dot grid pattern for luxury texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#0000000d_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">

            {/* Left: Monumental Invitation */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/5 border border-black/10 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                </span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-800 font-semibold">
                  COMMISSION BRIEFING // 2026 CALENDAR
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight uppercase leading-[0.92] text-black">
                LET&apos;S CREATE <br />
                <span className="text-black/35 hover:text-black transition-colors duration-500">
                  SOMETHING UNFORGETTABLE.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-neutral-600 font-normal max-w-xl leading-relaxed">
                Have a campaign, film, series, brand shoot, or creative project in mind? We partner with ambitious brands and creators to engineer visual stories that command attention.
              </p>
            </div>

            {/* Right: Interactive Contact Action Deck */}
            <div className="lg:col-span-5 flex flex-col gap-3.5">
              {/* Primary Direct Commission Button */}
              <Link
                to="/contact"
                className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-black text-white hover:bg-neutral-900 font-display font-bold uppercase tracking-wider text-sm sm:text-base transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)] hover:scale-[1.01] active:scale-[0.99] border border-black"
              >
                <div>
                  <span className="block leading-none text-white">START A PROJECT</span>
                  <span className="text-[10px] font-mono tracking-widest text-neutral-400 font-medium lowercase">
                    quick response within 24 hours
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </Link>

              {/* Direct Quick Channels Card */}
              <div className="flex flex-col gap-2.5">
                <div className="rounded-2xl bg-neutral-50 border border-neutral-200 overflow-hidden shadow-sm divide-y divide-neutral-200/80">
                  {[
                    { role: "Creative", email: "creative@viyana.productions" },
                    { role: "Director", email: "director@viyana.productions" },
                    { role: "Production", email: "head.production@viyana.productions" },
                    { role: "General", email: "info.viyanaproductions@gmail.com" },
                  ].map((item) => (
                    <div
                      key={item.email}
                      className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 hover:bg-white transition-all duration-200 group"
                    >
                      <a
                        href={`mailto:${item.email}`}
                        onClick={() => handleEmailAction(item.email)}
                        className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 cursor-pointer"
                        title={`Click to email ${item.email} (auto-copies address)`}
                      >
                        <Mail className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black transition-colors shrink-0" />
                        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-semibold w-20 sm:w-24 shrink-0">
                          {item.role}
                        </span>
                        <span className="text-xs font-mono text-neutral-900 group-hover:text-black font-medium select-all truncate">
                          {item.email}
                        </span>
                      </a>

                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        {copiedEmail === item.email ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-semibold animate-in fade-in">
                            <Check className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
                            <span>COPIED!</span>
                          </span>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEmailAction(item.email);
                              }}
                              className="p-1 rounded hover:bg-neutral-200 text-neutral-400 hover:text-black transition-colors cursor-pointer"
                              title="Copy email address"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <a
                              href={`mailto:${item.email}`}
                              onClick={() => handleEmailAction(item.email)}
                              className="p-1 rounded hover:bg-neutral-200 text-neutral-400 hover:text-black transition-colors cursor-pointer"
                              title="Send email via default client"
                            >
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${item.email}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hidden sm:inline-flex text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-neutral-200/70 hover:bg-neutral-300 text-neutral-600 hover:text-black transition-colors font-medium"
                              title="Compose in Gmail Web"
                            >
                              GMAIL
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Direct WhatsApp Callout */}
                <a
                  href="https://wa.me/919187233615?text=Hello%20Viyana%20Productions,%20I'd%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3.5 sm:px-4 py-3 rounded-2xl bg-neutral-50 hover:bg-white border border-neutral-200 hover:border-neutral-300 transition-all duration-200 group shadow-sm hover:shadow"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <MessageCircle className="w-4 h-4 text-emerald-600 group-hover:text-emerald-700 transition-colors shrink-0" />
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block font-medium">Chat Live via WhatsApp</span>
                      <span className="text-xs font-mono text-neutral-900 font-semibold">+91 91872 33615</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── 2. MAIN NAVIGATION MATRIX & STUDIO DATA ──────────────────── */}
      <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8">

            {/* Brand Signature Column */}
            <div className="lg:col-span-5 space-y-6">
              <Link to="/" className="inline-block group" aria-label="Viyana Productions Home">
                <img
                  src="/logo-white.png"
                  alt="Viyana Productions"
                  className="h-10 sm:h-12 w-auto object-contain filter brightness-110 group-hover:opacity-90 transition-opacity drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                />
              </Link>

              <p className="text-xs sm:text-sm text-brand-grey font-light leading-relaxed max-w-md">
                Full-scale creative ad agency and cinematic production studio based in Bangalore. Engineering commercials, original series, fashion editorials, and feature films crafted with intent.
              </p>

              {/* Clickable Studio Address Card */}
              <a
                href="https://www.google.com/maps?cid=13843918391266491417&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en&gl=IN&source=embed"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-white/25 transition-all max-w-md shadow-sm"
                title="Open Studio Location on Google Maps"
              >
                <div className="flex items-center justify-between text-white/80 mb-2 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors" />
                    <span className="font-semibold tracking-wider text-[11px] uppercase text-white/90 group-hover:text-white transition-colors">
                      STUDIO ADDRESS
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-white/40 group-hover:text-white transition-colors">
                    <span>GOOGLE MAPS</span>
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
                <p className="text-xs text-white/65 group-hover:text-white/90 leading-relaxed font-sans transition-colors">
                  4th Floor, Gopalan Workspace, Kathriguppe Main Rd, 3rd Phase, Banashankari 3rd Stage, Banashankari, Bengaluru, Karnataka 560085
                </p>
              </a>
            </div>

            {/* Quick Links Column */}
            <div className="lg:col-span-3 space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 block font-semibold">
                [ NAVIGATION ]
              </span>
              <ul className="space-y-2.5 text-xs font-mono uppercase tracking-wider">
                {navigationLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-white/70 hover:text-white flex items-center justify-between py-1 group transition-colors"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.name}
                      </span>
                      <span className="text-white/20 group-hover:text-white transition-colors">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal & Policies Column */}
            <div className="lg:col-span-2 space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 block font-semibold">
                [ LEGAL &amp; DOCS ]
              </span>
              <ul className="space-y-2.5 text-xs font-mono uppercase tracking-wider">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-white/70 hover:text-white flex items-center justify-between py-1 group transition-colors"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.name}
                      </span>
                      <span className="text-white/20 group-hover:text-white transition-colors">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Channels Column */}
            <div className="lg:col-span-2 space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 block font-semibold">
                [ CHANNELS ]
              </span>
              <ul className="space-y-2 text-xs font-mono">
                {[
                  {
                    name: "Instagram",
                    handle: "@viyana.productions",
                    href: "https://www.instagram.com/viyana.productions/reels/",
                    icon: InstagramIcon,
                  },
                  {
                    name: "WhatsApp",
                    handle: "+91 91872 33615",
                    href: "https://wa.me/919187233615",
                    icon: MessageCircle,
                  },
                  {
                    name: "YouTube",
                    handle: "@viyana.productions",
                    href: "https://www.youtube.com/@viyana.productions/shorts",
                    icon: YouTubeIcon,
                  },
                  {
                    name: "Facebook",
                    handle: "Viyana Productions",
                    href: "https://www.facebook.com/profile.php?id=61594256189978",
                    icon: FacebookIcon,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 -mx-2.5 rounded-xl hover:bg-white/[0.05] border border-transparent hover:border-white/10 transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors" />
                          <span className="text-white/80 group-hover:text-white uppercase tracking-wider text-[11px] font-medium">
                            {item.name}
                          </span>
                        </div>
                        <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* ── 4. BOTTOM UTILITY & BACK TO TOP BAR ──────────────────────── */}
      <div className="py-5 sm:py-6 px-4 sm:px-6 lg:px-12 border-t border-white/10 bg-black/80 relative z-20">
        <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 text-xs font-mono text-white/60">

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-center sm:text-left">
            <span>© 2026 VIYANA PRODUCTIONS.</span>
            <span className="text-white/20 hidden sm:inline">•</span>
            <span>ALL RIGHTS RESERVED.</span>
            <span className="text-white/20 hidden sm:inline">•</span>
            <a
              href="https://worexatechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-white/70 hover:text-white transition-colors group/dev font-medium py-0.5"
            >
              <span>DEVELOPED BY</span>
              <span className="text-white underline decoration-white/40 underline-offset-4 group-hover/dev:decoration-white transition-all font-semibold">
                WOREXA TECHNOLOGIES
              </span>
              <ArrowUpRight className="w-3 h-3 text-white/40 group-hover/dev:text-white group-hover/dev:translate-x-0.5 group-hover/dev:-translate-y-0.5 transition-transform" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}