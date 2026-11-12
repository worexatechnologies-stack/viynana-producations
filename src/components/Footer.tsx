import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Check,
  Copy,
  ChevronUp,
  Sparkles,
  Clock,
} from "lucide-react";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YouTubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const capabilityLinks = [
  { name: "Commercial Ads & Films", href: "/work" },
  { name: "Cinematic Content Shoot", href: "/work/cinematic-content-shoot" },
  { name: "Product Shoot & Cinema", href: "/work/product-shoot" },
  { name: "Model Portfolio Shoots", href: "/work/model-portfolio-shoots" },
  { name: "Influencer Vertical Reels", href: "/work/influencer-shoot" },
  { name: "Production Studio Rental", href: "/studio" },
  { name: "Podcast Production Suite", href: "/podcast" },
];

const studioLinks = [
  { name: "About the Studio", href: "/about" },
  { name: "Directing Roster", href: "/directors" },
  { name: "Master Showreel", href: "/showreel" },
  { name: "Production Stills", href: "/stills" },
  { name: "Producers & Production Team", href: "/producers" },
  { name: "Press & Features", href: "/press" },
  { name: "Production Journal", href: "/journal" },
];

export default function Footer({
  variant = "dark",
  hideCtaBanner = false,
}: {
  variant?: "dark" | "light";
  hideCtaBanner?: boolean;
}) {
  const isLight = variant === "light";
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText("info.viyanaproductions@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    }
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      className={`relative w-full overflow-hidden transition-colors ${
        isLight
          ? "bg-[#fbfbf9] text-neutral-900 border-t border-neutral-200"
          : "bg-[#050507] text-[#f5f3ee] border-t border-white/10"
      }`}
    >
      {/* Subtle Ambient Glow Behind Footer */}
      {!isLight && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-32 bg-gradient-to-b from-white/[0.03] to-transparent blur-3xl pointer-events-none" />
      )}

      {/* Optional Pre-Footer CTA Invitation Strip */}
      {!hideCtaBanner && (
        <div
          className={`relative border-b ${
            isLight
              ? "border-neutral-200 bg-neutral-100/70"
              : "border-white/10 bg-gradient-to-b from-[#0b0c0f] to-[#050507]"
          }`}
        >
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-10 sm:py-14">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase mb-3 border backdrop-blur-md bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Accepting Commissions • Q2 / Q3 2026</span>
                </div>
                <h3
                  className={`text-2xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight uppercase leading-tight ${
                    isLight ? "text-neutral-900" : "text-white"
                  }`}
                >
                  Have a vision to capture? <br className="hidden sm:inline" />
                  <span className="italic font-serif font-normal lowercase tracking-normal text-white/70">
                    let&apos;s produce something iconic.
                  </span>
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <Link
                  to="/contact"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 bg-white text-black hover:bg-neutral-200 hover:shadow-[0_10px_30px_rgba(255,255,255,0.18)] active:scale-95"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href="/portfolio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 border active:scale-95 ${
                    isLight
                      ? "border-neutral-300 text-neutral-900 hover:bg-neutral-200"
                      : "border-white/20 text-white hover:bg-white/10 hover:border-white/40"
                  }`}
                >
                  <span>Viyana Portfolio</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>

                <a
                  href="https://wa.me/919187233615?text=Hello%20Viyana%20Productions%2C%20I%20would%20like%20to%20discuss%20an%20upcoming%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Direct WhatsApp Message"
                  className="p-3.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all duration-300"
                  title="Chat directly on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Luxury 4-Column Grid */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 pt-12 sm:pt-16 pb-8 sm:pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-10 border-b border-white/10">
          {/* Column 1: Studio Brand, Manifesto & Direct Connect (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link to="/" aria-label="Viyana Productions Home" className="inline-block mb-6 group">
                <img
                  src={isLight ? "/logo-black.png" : "/logo-white.png"}
                  alt="Viyana Productions Logo"
                  loading="lazy"
                  decoding="async"
                  width="180"
                  height="48"
                  className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </Link>

              <p
                className={`text-sm sm:text-base font-light leading-relaxed mb-8 max-w-md ${
                  isLight ? "text-neutral-600" : "text-white/65"
                }`}
              >
                A cinematic film and commercial production studio based in Bengaluru. We architect evocative visual narratives, luxury commercial films, and brand cinema built to move audiences globally.
              </p>

              {/* Quick Direct Connect Cards */}
              <div className="space-y-2.5 max-w-md">
                {/* Email Pill with Copy Action */}
                <div
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs transition-colors ${
                    isLight
                      ? "bg-neutral-100 border-neutral-200 text-neutral-800"
                      : "bg-[#0e0f13] border-white/10 text-white/80"
                  }`}
                >
                  <a
                    href="mailto:info.viyanaproductions@gmail.com"
                    className="flex items-center gap-2.5 hover:underline truncate"
                  >
                    <Mail className="w-4 h-4 text-white/50 shrink-0" />
                    <span className="truncate font-mono">info.viyanaproductions@gmail.com</span>
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="ml-2 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider font-semibold border flex items-center gap-1 shrink-0 transition-all hover:bg-white/10"
                    title="Copy Email Address"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 opacity-60" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Direct Phone */}
                <a
                  href="tel:+919187233615"
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs font-mono transition-colors group ${
                    isLight
                      ? "bg-neutral-100 border-neutral-200 text-neutral-800 hover:border-black"
                      : "bg-[#0e0f13] border-white/10 text-white/80 hover:border-white/30"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-white/50" />
                    <span>+91 91872 33615</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-white/40 group-hover:text-white transition-colors">
                    Call Direct ↗
                  </span>
                </a>

                {/* Physical Location */}
                <a
                  href="https://www.google.com/maps/place/Viyana+Productions/@12.9263246,77.5483582,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-start justify-between p-3 rounded-xl border text-xs transition-colors group ${
                    isLight
                      ? "bg-neutral-100 border-neutral-200 text-neutral-700 hover:border-black"
                      : "bg-[#0e0f13] border-white/10 text-white/70 hover:border-white/30"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-white/50 shrink-0 mt-0.5" />
                    <span className="leading-snug">
                      4th Floor, Gopalan Workspace, Banashankari 3rd Stage, Bengaluru
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-white/40 group-hover:text-white transition-colors shrink-0 ml-2">
                    Maps ↗
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Capabilities / Services (3 Cols) */}
          <div className="lg:col-span-3">
            <h4
              className={`text-xs font-mono uppercase tracking-[0.2em] font-semibold mb-6 flex items-center gap-2 ${
                isLight ? "text-neutral-900" : "text-white"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span>Capabilities</span>
            </h4>
            <ul className="space-y-3.5 text-sm">
              {capabilityLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`inline-flex items-center gap-1.5 transition-all duration-200 hover:translate-x-1 ${
                      isLight
                        ? "text-neutral-600 hover:text-black font-medium"
                        : "text-white/60 hover:text-white font-light"
                    }`}
                  >
                    <span className="text-[10px] opacity-30">›</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: The Studio & Roster (2 Cols) */}
          <div className="lg:col-span-2">
            <h4
              className={`text-xs font-mono uppercase tracking-[0.2em] font-semibold mb-6 flex items-center gap-2 ${
                isLight ? "text-neutral-900" : "text-white"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span>The Studio</span>
            </h4>
            <ul className="space-y-3.5 text-sm">
              {studioLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`inline-flex items-center gap-1.5 transition-all duration-200 hover:translate-x-1 ${
                      isLight
                        ? "text-neutral-600 hover:text-black font-medium"
                        : "text-white/60 hover:text-white font-light"
                    }`}
                  >
                    <span className="text-[10px] opacity-30">›</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Channels & Operating Hours (2 Cols) */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <h4
                className={`text-xs font-mono uppercase tracking-[0.2em] font-semibold mb-6 flex items-center gap-2 ${
                  isLight ? "text-neutral-900" : "text-white"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span>Channels</span>
              </h4>

              {/* Social Channels List with Sleek Cards */}
              <div className="space-y-2 mb-8">
                {[
                  {
                    name: "Instagram",
                    handle: "@viyana.productions",
                    href: "https://www.instagram.com/viyana.productions/reels/",
                    icon: InstagramIcon,
                    accent: "hover:border-pink-500/40 hover:text-pink-400",
                  },
                  {
                    name: "YouTube",
                    handle: "Commercials & 4K",
                    href: "https://www.youtube.com/@viyana.productions/shorts",
                    icon: YouTubeIcon,
                    accent: "hover:border-red-500/40 hover:text-red-400",
                  },
                  {
                    name: "WhatsApp",
                    handle: "+91 91872 33615",
                    href: "https://wa.me/919187233615",
                    icon: MessageCircle,
                    accent: "hover:border-emerald-500/40 hover:text-emerald-400",
                  },
                  {
                    name: "Facebook",
                    handle: "Official Studio",
                    href: "https://www.facebook.com/profile.php?id=61594256189978",
                    icon: FacebookIcon,
                    accent: "hover:border-blue-500/40 hover:text-blue-400",
                  },
                ].map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between p-2.5 rounded-lg border text-xs transition-all duration-200 group ${
                        isLight
                          ? "bg-neutral-100 border-neutral-200 text-neutral-800 hover:bg-neutral-200"
                          : `bg-[#0e0f13] border-white/10 text-white/70 ${social.accent} hover:bg-white/5`
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-3.5 h-3.5 opacity-80" />
                        <span className="font-medium text-white/90">{social.name}</span>
                      </div>
                      <ArrowUpRight className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity" />
                    </a>
                  );
                })}
              </div>

              {/* Studio Hours Card */}
              <div
                className={`p-3.5 rounded-xl border text-[11px] font-mono leading-relaxed ${
                  isLight
                    ? "bg-neutral-100 border-neutral-200 text-neutral-600"
                    : "bg-[#0b0c10] border-white/10 text-white/50"
                }`}
              >
                <div className="flex items-center gap-1.5 text-white/80 font-semibold mb-1">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  <span>STUDIO HOURS</span>
                </div>
                <div>Mon – Sat: 9:30 AM – 9:00 PM IST</div>
                <div className="text-[10px] text-white/40 mt-1">Average Response: &lt; 2 Hours</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Utility, Legal & Credits Bar */}
        <div
          className={`flex flex-col md:flex-row items-center justify-between gap-4 pt-6 text-[11px] font-mono ${
            isLight ? "text-neutral-500" : "text-white/40"
          }`}
        >
          {/* Copyright */}
          <div className="text-center md:text-left">
            <span>© 2026 VIYANA PRODUCTIONS PRIVATE LIMITED • ALL RIGHTS RESERVED</span>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4 text-center">
            <Link
              to="/privacy-policy"
              className="hover:text-white transition-colors hover:underline"
            >
              PRIVACY POLICY
            </Link>
            <span>•</span>
            <Link
              to="/terms-and-conditions"
              className="hover:text-white transition-colors hover:underline"
            >
              TERMS &amp; CONDITIONS
            </Link>
            <span>•</span>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors hover:underline"
            >
              SITEMAP
            </a>
          </div>

          {/* Dev Credit & Back to Top */}
          <div className="flex items-center gap-4">
            <a
              href="https://worexatechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:underline font-bold transition-colors ${
                isLight ? "text-neutral-800" : "text-white/70 hover:text-white"
              }`}
            >
              CRAFTED BY WOREXA
            </a>
            <button
              onClick={scrollToTop}
              className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                isLight
                  ? "border-neutral-300 text-neutral-700 hover:border-black hover:text-black"
                  : "border-white/15 text-white/60 hover:border-white hover:text-white hover:bg-white/10"
              }`}
              title="Back to Top"
              aria-label="Back to top"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
