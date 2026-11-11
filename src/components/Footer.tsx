import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MessageCircle } from "lucide-react";

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

const navLinks = [
  { name: "Portfolio", href: "/portfolio/", external: true },
  { name: "All Works", href: "/work" },
  { name: "Directors", href: "/directors" },
  { name: "Process", href: "/process" },
  { name: "About", href: "/about" },
  { name: "Showreel", href: "/showreel" },
  { name: "Contact", href: "/contact" },
];

export default function Footer({
  variant = "dark",
  hideCtaBanner = true,
}: {
  variant?: "dark" | "light";
  hideCtaBanner?: boolean;
}) {
  const isLight = variant === "light";

  return (
    <footer
      className={`w-full border-t transition-colors ${
        isLight
          ? "bg-white text-neutral-900 border-neutral-200"
          : "bg-[#060608] text-white border-white/10"
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-8 sm:py-10">
        {/* Main Reduced Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-black/5 dark:border-white/10">
          {/* Brand & Tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <Link to="/" aria-label="Viyana Productions Home">
              <img
                src={isLight ? "/logo-black.png" : "/logo-white.png"}
                alt="Viyana Productions"
                loading="lazy"
                decoding="async"
                width="140"
                height="40"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </Link>
            <span
              className={`text-xs font-light max-w-xs ${
                isLight ? "text-neutral-500" : "text-white/50"
              }`}
            >
              Cinematic Film &amp; Commercial Production Studio • Bengaluru
            </span>
          </div>

          {/* Inline Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono uppercase tracking-wider">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 font-semibold transition-colors ${
                    isLight ? "text-neutral-900 hover:text-black" : "text-white hover:text-brand-light"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`transition-colors ${
                    isLight ? "text-neutral-600 hover:text-black" : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            {[
              { name: "Instagram", href: "https://www.instagram.com/viyana.productions/reels/", icon: InstagramIcon },
              { name: "WhatsApp", href: "https://wa.me/919187233615", icon: MessageCircle },
              { name: "YouTube", href: "https://www.youtube.com/@viyana.productions/shorts", icon: YouTubeIcon },
              { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61594256189978", icon: FacebookIcon },
            ].map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                    isLight
                      ? "border-neutral-200 text-neutral-600 hover:text-black hover:border-black hover:bg-neutral-50"
                      : "border-white/15 text-white/70 hover:text-white hover:border-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Reduced Utility Row */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-[11px] font-mono ${
            isLight ? "text-neutral-500" : "text-white/45"
          }`}
        >
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-center sm:text-left">
            <span>Bengaluru HQ: Gopalan Workspace, Banashankari</span>
            <span className="hidden sm:inline">•</span>
            <a href="tel:+919187233615" className="hover:underline">+91 91872 33615</a>
            <span className="hidden sm:inline">•</span>
            <a href="mailto:info.viyanaproductions@gmail.com" className="hover:underline">info.viyanaproductions@gmail.com</a>
          </div>

          <div className="flex items-center gap-3">
            <span>© 2026 VIYANA PRODUCTIONS</span>
            <span>•</span>
            <a
              href="https://worexatechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:underline font-semibold ${isLight ? "text-neutral-700" : "text-white/70"}`}
            >
              DEV BY WOREXA
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
