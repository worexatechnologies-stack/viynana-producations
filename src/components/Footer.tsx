import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Mail,
  Copy,
  Check,
  MessageCircle,
  MapPin,
} from "lucide-react";

function InstagramIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YouTubeIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function FacebookIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const navigationLinks = [
  { name: "Portfolio", href: "/portfolio/", external: true },
  { name: "All Works", href: "/work" },
  { name: "Directors Roster", href: "/directors" },
  { name: "Our Process", href: "/process" },
  { name: "Agency Profile", href: "/about" },
  { name: "Showreel 2026", href: "/showreel" },
  { name: "Studio Location", href: "/contact#map" },
  { name: "Start Project", href: "/contact" },
];

const legalLinks = [
  { name: "Client Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms-and-conditions" },
  { name: "Studio Press", href: "/press" },
  { name: "Stills Archive", href: "/stills" },
  { name: "Studio Journal", href: "/journal" },
];

export default function Footer({
  variant = "dark",
  hideCtaBanner = false,
}: {
  variant?: "dark" | "light";
  hideCtaBanner?: boolean;
}) {
  const isLight = variant === "light";
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

  return (
    <footer
      className={`w-full relative overflow-hidden border-t selection:bg-black selection:text-white ${
        isLight
          ? "bg-[#fafafa] text-neutral-900 border-neutral-200"
          : "bg-[#050505] text-brand-light border-white/10"
      }`}
    >
      {/* Ambient Radial Lights (dark theme only) */}
      {!isLight && (
        <>
          <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[700px] h-[350px] bg-white/[0.015] rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-white/[0.012] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-40" />
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        </>
      )}

      {/* ── 1. HERO CTA BANNER (COMMISSION BRIEFING) ─── */}
      {!hideCtaBanner && (
        <div className="bg-white text-black pt-16 sm:pt-24 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-12 border-b border-black/10 relative z-10 selection:bg-black selection:text-white">
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
      )}

      {/* ── 2. MAIN NAVIGATION MATRIX & STUDIO DATA ──────────────────── */}
      <div
        className={`py-12 sm:py-20 px-4 sm:px-6 lg:px-12 relative z-10 ${
          isLight ? "bg-white text-neutral-900" : ""
        }`}
      >
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8">

            {/* Brand Statement & Map Link */}
            <div className="lg:col-span-5 space-y-6">
              <Link to="/" className="inline-block group" aria-label="Viyana Productions Home">
                <img
                  src={isLight ? "/logo-black.png" : "/logo-white.png"}
                  alt="Viyana Productions"
                  loading="lazy"
                  decoding="async"
                  width="160"
                  height="48"
                  className={`h-10 sm:h-12 w-auto object-contain group-hover:opacity-90 transition-opacity ${
                    isLight ? "" : "filter brightness-110 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  }`}
                />
              </Link>

              <p
                className={`text-xs sm:text-sm font-light leading-relaxed max-w-md ${
                  isLight ? "text-neutral-600" : "text-brand-grey"
                }`}
              >
                Full-scale creative ad agency and cinematic production studio based in Bangalore. Engineering commercials, original series, fashion editorials, and feature films crafted with intent.
              </p>

              {/* Studio Map Location Card */}
              <a
                href="https://www.google.com/maps?cid=13843918391266491417&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en&gl=IN&source=embed"
                target="_blank"
                rel="noopener noreferrer"
                className={`group block p-4 rounded-2xl transition-all max-w-md shadow-sm ${
                  isLight
                    ? "bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200 text-neutral-800"
                    : "bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-white/25"
                }`}
                title="Open Studio Location on Google Maps"
              >
                <div
                  className={`flex items-center justify-between mb-2 font-mono text-xs ${
                    isLight ? "text-neutral-900" : "text-white/80"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-3.5 h-3.5 ${isLight ? "text-neutral-500" : "text-white/50"}`} />
                    <span className="font-semibold tracking-wider text-[11px] uppercase">
                      STUDIO ADDRESS
                    </span>
                  </div>
                  <div className={`flex items-center gap-1 text-[10px] ${isLight ? "text-neutral-500" : "text-white/40"}`}>
                    <span>GOOGLE MAPS</span>
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
                <p
                  className={`text-xs leading-relaxed font-sans transition-colors ${
                    isLight ? "text-neutral-600 group-hover:text-black" : "text-white/65 group-hover:text-white/90"
                  }`}
                >
                  4th Floor, Gopalan Workspace, Kathriguppe Main Rd, 3rd Phase, Banashankari 3rd Stage, Banashankari, Bengaluru, Karnataka 560085
                </p>
              </a>

              {/* Viyana Portfolio Dedicated Card */}
              <a
                href="/portfolio/"
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center justify-between p-3.5 rounded-2xl transition-all max-w-md shadow-sm ${
                  isLight
                    ? "bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200"
                    : "bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/25"
                }`}
                title="Open Viyana Portfolio Showcase"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold font-mono text-[11px] shrink-0 ${
                      isLight ? "bg-black text-white" : "bg-white text-black"
                    }`}
                  >
                    VP
                  </div>
                  <div>
                    <span
                      className={`text-xs font-mono uppercase tracking-wider font-semibold block ${
                        isLight ? "text-neutral-900" : "text-white"
                      }`}
                    >
                      VIYANA PORTFOLIO
                    </span>
                    <span
                      className={`text-[10px] font-mono block ${
                        isLight ? "text-neutral-500" : "text-white/50"
                      }`}
                    >
                      Commercials &bull; Product &bull; Editorial Shoots
                    </span>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-1 text-[11px] font-mono transition-colors ${
                    isLight
                      ? "text-neutral-600 group-hover:text-black"
                      : "text-white/60 group-hover:text-white"
                  }`}
                >
                  <span className="hidden sm:inline">EXPLORE</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            </div>

            {/* Quick Links Column */}
            <div className="lg:col-span-3 space-y-4">
              <span
                className={`text-[10px] font-mono uppercase tracking-[0.3em] block font-semibold ${
                  isLight ? "text-neutral-400" : "text-white/40"
                }`}
              >
                [ NAVIGATION ]
              </span>
              <ul className="space-y-2.5 text-xs font-mono uppercase tracking-wider">
                {navigationLinks.map((link) => (
                  <li key={link.name}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-between py-1 group transition-colors ${
                          isLight ? "text-neutral-900 hover:text-black" : "text-white hover:text-white"
                        }`}
                        title="Open Viyana Portfolio in a new tab"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-200 flex items-center gap-1.5 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {link.name}
                        </span>
                        <ArrowUpRight
                          className={`w-3.5 h-3.5 transition-colors ${
                            isLight ? "text-neutral-400 group-hover:text-black" : "text-white/50 group-hover:text-white"
                          }`}
                        />
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className={`flex items-center justify-between py-1 group transition-colors ${
                          isLight ? "text-neutral-600 hover:text-black" : "text-white/70 hover:text-white"
                        }`}
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {link.name}
                        </span>
                        <span
                          className={`transition-colors ${
                            isLight ? "text-neutral-300 group-hover:text-black" : "text-white/20 group-hover:text-white"
                          }`}
                        >
                          →
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal & Policies Column */}
            <div className="lg:col-span-2 space-y-4">
              <span
                className={`text-[10px] font-mono uppercase tracking-[0.3em] block font-semibold ${
                  isLight ? "text-neutral-400" : "text-white/40"
                }`}
              >
                [ LEGAL &amp; DOCS ]
              </span>
              <ul className="space-y-2.5 text-xs font-mono uppercase tracking-wider">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className={`flex items-center justify-between py-1 group transition-colors ${
                        isLight ? "text-neutral-600 hover:text-black" : "text-white/70 hover:text-white"
                      }`}
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.name}
                      </span>
                      <span
                        className={`transition-colors ${
                          isLight ? "text-neutral-300 group-hover:text-black" : "text-white/20 group-hover:text-white"
                        }`}
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Channels Column */}
            <div className="lg:col-span-2 space-y-4">
              <span
                className={`text-[10px] font-mono uppercase tracking-[0.3em] block font-semibold ${
                  isLight ? "text-neutral-400" : "text-white/40"
                }`}
              >
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
                        className={`p-2.5 -mx-2.5 rounded-xl border transition-all flex items-center justify-between group ${
                          isLight
                            ? "hover:bg-neutral-100 border-transparent hover:border-neutral-200 text-neutral-800"
                            : "hover:bg-white/[0.05] border-transparent hover:border-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon
                            className={`w-3.5 h-3.5 transition-colors ${
                              isLight ? "text-neutral-500 group-hover:text-black" : "text-white/50 group-hover:text-white"
                            }`}
                          />
                          <span
                            className={`uppercase tracking-wider text-[11px] font-medium transition-colors ${
                              isLight ? "text-neutral-700 group-hover:text-black" : "text-white/80 group-hover:text-white"
                            }`}
                          >
                            {item.name}
                          </span>
                        </div>
                        <ArrowUpRight
                          className={`w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ${
                            isLight ? "text-neutral-400 group-hover:text-black" : "text-white/30 group-hover:text-white"
                          }`}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

          </div>
        </div>  
      </div>

      {/* ── 3. BOTTOM UTILITY BAR ──────────────────────── */}
      <div
        className={`pt-5 pb-24 sm:pb-24 md:pb-6 px-4 sm:px-6 lg:px-12 border-t relative z-20 ${
          isLight
            ? "border-neutral-200 bg-neutral-100 text-neutral-600"
            : "border-white/10 bg-black/80 text-white/60"
        }`}
      >
        <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 text-xs font-mono">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-center sm:text-left">
            <span>© 2026 VIYANA PRODUCTIONS.</span>
            <span className={isLight ? "text-neutral-300 hidden sm:inline" : "text-white/20 hidden sm:inline"}>•</span>
            <span>ALL RIGHTS RESERVED.</span>
            <span className={isLight ? "text-neutral-300 hidden sm:inline" : "text-white/20 hidden sm:inline"}>•</span>
            <a
              href="https://worexatechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 transition-colors group/dev font-medium py-0.5 ${
                isLight ? "text-neutral-600 hover:text-black" : "text-white/70 hover:text-white"
              }`}
            >
              <span>DEVELOPED BY</span>
              <span
                className={`underline underline-offset-4 transition-all font-semibold ${
                  isLight
                    ? "text-neutral-900 decoration-neutral-300 group-hover/dev:decoration-black"
                    : "text-white decoration-white/40 group-hover/dev:decoration-white"
                }`}
              >
                WOREXA TECHNOLOGIES
              </span>
              <ArrowUpRight
                className={`w-3 h-3 group-hover/dev:translate-x-0.5 group-hover/dev:-translate-y-0.5 transition-transform ${
                  isLight ? "text-neutral-400 group-hover/dev:text-black" : "text-white/40 group-hover/dev:text-white"
                }`}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
