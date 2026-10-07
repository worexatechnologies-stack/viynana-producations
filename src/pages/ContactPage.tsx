"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MessageSquare, ArrowUpRight, Check, Copy, Loader2, AlertCircle, ChevronDown, MapPin, Phone } from "lucide-react";

const services = [
  "Commercial Ads",
  "Cinematic Content Shoot",
  "Advertisement",
  "Models Portfolio Shoots",
  "Vertical Series",
  "Web Series",
  "Short Films",
  "Film Production",
  "Graphic Design",
  "Product Shoot",
  "Influencer Shoot",
  "Studio Rental",
  "Podcast Production",
];

export default function ContactPage() {
  const [selectedService, setSelectedService] = useState("Commercial Ads");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close custom dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: selectedService,
      message: formData.message,
    };

    try {
      let res: Response;
      try {
        res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (networkErr) {
        // If relative URL fails during local dev, fallback to direct API port 3001
        if (
          typeof window !== "undefined" &&
          (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
        ) {
          res = await fetch("http://localhost:3001/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        } else {
          throw networkErr;
        }
      }

      const text = await res.text();
      let data: { success?: boolean; error?: string } = {};

      try {
        data = JSON.parse(text);
      } catch {
        if (!res.ok) {
          throw new Error("Unable to connect to contact server right now.");
        }
      }

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send message. Please reach us directly via WhatsApp or Email.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again or reach out directly.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-brand-black text-brand-light selection:bg-white selection:text-black relative overflow-x-hidden">
      <Navbar />

      {/* Header Section */}
      <section className="pt-24 sm:pt-40 pb-8 sm:pb-16 px-4 sm:px-10 lg:px-16 border-b border-white/10">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-white/50 block mb-3 sm:mb-4">
              CONTACT US
            </span>
            <h1 className="text-3xl sm:text-6xl md:text-7xl font-display font-extrabold text-white uppercase tracking-tight leading-tight mb-4 sm:mb-6">
              Let&apos;s Work Together.
            </h1>
            <p className="text-xs sm:text-base md:text-xl text-brand-grey max-w-2xl font-light leading-relaxed">
              Have an upcoming project, commercial film, or creative idea? Reach out to us directly or send a message below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content: Clean 2-Column Layout */}
      <section className="py-10 sm:py-24 px-4 sm:px-10 lg:px-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Direct Info (Order 2 on mobile, Order 1 on desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="order-2 lg:order-1 lg:col-span-5 space-y-8 sm:space-y-10 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10"
            >
              {/* Mobile-only section label */}
              <div className="lg:hidden flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-white/50 pb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span>DIRECT STUDIO DESKS &amp; DETAILS</span>
              </div>

              {/* Email */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/50 block">
                    Direct Email Desks
                  </span>
                  <span className="text-[9px] font-mono text-white/40 lowercase">
                    click to email &amp; copy
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Creative", email: "creative@viyana.productions" },
                    { label: "Director", email: "director@viyana.productions" },
                    { label: "Production", email: "head.production@viyana.productions" },
                    { label: "General", email: "info.viyanaproductions@gmail.com" },
                  ].map((item) => (
                    <div
                      key={item.email}
                      className="group flex items-center justify-between p-2.5 sm:p-3 -mx-2.5 sm:-mx-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-white/15 transition-all"
                    >
                      <a
                        href={`mailto:${item.email}`}
                        onClick={() => handleEmailAction(item.email)}
                        className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 cursor-pointer"
                        title={`Click to email ${item.email} (auto-copies address)`}
                      >
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 w-20 sm:w-22 shrink-0">
                          {item.label}
                        </span>
                        <span className="text-xs sm:text-sm font-mono text-white group-hover:text-brand-light group-hover:underline underline-offset-4 transition-colors truncate">
                          {item.email}
                        </span>
                      </a>

                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        {copiedEmail === item.email ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-medium animate-in fade-in">
                            <Check className="w-3 h-3 text-emerald-400 stroke-[2.5]" />
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
                              className="p-1.5 rounded-lg hover:bg-white/10 text-white/30 hover:text-white transition-colors cursor-pointer"
                              title="Copy email address"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <a
                              href={`mailto:${item.email}`}
                              onClick={() => handleEmailAction(item.email)}
                              className="p-1.5 rounded-lg hover:bg-white/10 text-white/30 hover:text-white transition-colors cursor-pointer"
                              title="Send email via default client"
                            >
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${item.email}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hidden sm:inline-flex text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/5 hover:bg-white/15 text-white/50 hover:text-white transition-colors"
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
              </div>

              {/* Phone & WhatsApp */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/50 block">
                    Phone / WhatsApp
                  </span>
                  <span className="text-[9px] font-mono text-white/40 lowercase">
                    click to call / chat / copy
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-white/15 transition-all">
                  <a
                    href="tel:+919187233615"
                    className="flex items-center gap-2.5 text-lg sm:text-xl font-mono text-white hover:text-brand-light transition-colors cursor-pointer group"
                    title="Click to call +91 91872 33615"
                  >
                    <Phone className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                    <span className="group-hover:underline underline-offset-4">+91 91872 33615</span>
                  </a>

                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    {copiedPhone ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-medium animate-in fade-in">
                        <Check className="w-3 h-3 text-emerald-400 stroke-[2.5]" />
                        <span>COPIED!</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
                            navigator.clipboard.writeText("+919187233615");
                            setCopiedPhone(true);
                            setTimeout(() => setCopiedPhone(false), 2000);
                          }
                        }}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors cursor-pointer"
                        title="Copy phone number"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="pt-1 flex flex-wrap gap-2.5">
                  <a
                    href="tel:+919187233615"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/20 text-xs font-mono uppercase tracking-wider transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Now</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>

                  <a
                    href="https://wa.me/919187233615?text=Hello%20Viyana%20Productions,%20I'd%20like%20to%20discuss%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 active:scale-95 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 text-xs font-mono uppercase tracking-wider transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat on WhatsApp</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Studio Location - Clickable Google Maps Link */}
              <div className="space-y-3 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/50 block">
                    Studio Location
                  </span>
                  <div className="flex items-center gap-2">
                    {copiedAddress ? (
                      <span className="text-[10px] font-mono text-emerald-400">Address Copied!</span>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
                            navigator.clipboard.writeText("4th Floor, Gopalan Workspace, Kathriguppe Main Rd, 3rd Phase, Banashankari 3rd Stage, Banashankari, Bengaluru, Karnataka 560085");
                            setCopiedAddress(true);
                            setTimeout(() => setCopiedAddress(false), 2000);
                          }
                        }}
                        className="text-[10px] font-mono text-white/40 hover:text-white transition-colors cursor-pointer"
                        title="Copy Studio Address"
                      >
                        [copy address]
                      </button>
                    )}
                    <span className="text-[10px] font-mono text-white/40 lowercase">click for map</span>
                  </div>
                </div>

                <a
                  href="https://www.google.com/maps?cid=13843918391266491417&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en&gl=IN&source=embed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-4 sm:p-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 hover:border-white/30 transition-all cursor-pointer shadow-sm"
                  title="Open Bengaluru Studio on Google Maps"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                      <h3 className="text-sm font-serif uppercase text-white group-hover:text-white transition-colors">
                        Bengaluru Studio
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-white/40 group-hover:text-white transition-colors">
                      <span>Google Maps</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                  <p className="text-xs text-brand-grey group-hover:text-white/80 leading-relaxed transition-colors">
                    4th Floor, Gopalan Workspace,<br />
                    Kathriguppe Main Rd, 3rd Phase,<br />
                    Banashankari 3rd Stage, Banashankari,<br />
                    Bengaluru, Karnataka 560085
                  </p>
                </a>
              </div>

              {/* Socials */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/50 block">
                  Follow Us
                </span>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                  {[
                    { name: "Instagram", href: "https://www.instagram.com/viyana.productions/reels/" },
                    { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61594256189978" },
                    { name: "YouTube", href: "https://www.youtube.com/@viyana.productions/shorts" },
                  ].map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] sm:text-xs font-mono uppercase px-3 py-2 rounded-lg bg-white/5 hover:bg-white/15 active:bg-white/20 text-white/80 hover:text-white border border-white/10 transition-colors inline-flex items-center justify-between gap-1"
                    >
                      <span>{s.name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-60" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Contact Form (High-Impact White Luxury Editorial Card) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="order-1 lg:order-2 lg:col-span-7 bg-white text-neutral-900 p-6 sm:p-9 md:p-11 rounded-2xl sm:rounded-3xl border border-white shadow-[0_25px_70px_rgba(0,0,0,0.65),0_0_50px_rgba(255,255,255,0.08)] relative overflow-hidden selection:bg-black selection:text-white"
            >
              {/* Subtle luxury dot pattern for tactile depth */}
              <div className="absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

              {submitted ? (
                <div className="py-12 text-center space-y-4 relative z-10">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-600 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.25)]">
                    <Check className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <h3 className="text-3xl font-display font-bold uppercase tracking-tight text-neutral-900">Message Sent!</h3>
                  <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name || "there"}. We have received your project brief and will get back to you within 24 hours.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", phone: "", message: "" });
                        setErrorMessage(null);
                      }}
                      className="px-8 py-3 rounded-full bg-black hover:bg-neutral-800 active:scale-95 text-white text-xs font-mono uppercase tracking-widest font-bold transition-all cursor-pointer shadow-lg"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 relative z-10">
                  {/* Form Header indicator for clarity on mobile & desktop */}
                  <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-neutral-200">
                    <div className="flex items-center gap-2.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-black" />
                      </span>
                      <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] text-neutral-900 font-bold">
                        PROJECT BRIEF FORM
                      </span>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/5 border border-black/10 text-neutral-600 font-medium">
                      DIRECT INQUIRY
                    </span>
                  </div>

                  {/* Custom Service Selection Dropdown */}
                  <div className="space-y-1.5 sm:space-y-2 relative" ref={dropdownRef}>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 font-semibold">
                      I&apos;m interested in *
                    </label>
                    <input type="hidden" name="service" value={selectedService} />

                    {/* Dropdown Trigger Button */}
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`w-full bg-neutral-50 hover:bg-neutral-100/90 border rounded-xl px-4 sm:px-5 py-3.5 text-xs sm:text-sm font-mono uppercase tracking-wider text-left flex items-center justify-between transition-all cursor-pointer shadow-sm font-medium ${
                        isDropdownOpen
                          ? "border-black ring-2 ring-black/10 bg-white"
                          : "border-neutral-300"
                      }`}
                      aria-haspopup="listbox"
                      aria-expanded={isDropdownOpen}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className="text-[11px] font-mono text-neutral-500 font-bold shrink-0">
                          {String(services.indexOf(selectedService) + 1).padStart(2, "0")}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                        <span className="text-neutral-900 truncate font-semibold">
                          {selectedService}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 stroke-[2.5] text-neutral-500 transition-transform duration-200 shrink-0 ${
                          isDropdownOpen ? "rotate-180 text-black" : ""
                        }`}
                      />
                    </button>

                    {/* Animated Dropdown Menu */}
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.98 }}
                          transition={{ duration: 0.16, ease: "easeOut" }}
                          data-lenis-prevent
                          className="absolute top-full left-0 right-0 mt-2 z-50 bg-white border border-neutral-200 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2),0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden overscroll-contain"
                        >
                          <div className="p-1.5 max-h-64 sm:max-h-72 overflow-y-auto no-scrollbar space-y-1">
                            {services.map((service, index) => {
                              const isSelected = service === selectedService;
                              return (
                                <button
                                  key={service}
                                  type="button"
                                  onClick={() => {
                                    setSelectedService(service);
                                    setIsDropdownOpen(false);
                                  }}
                                  className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm font-mono uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer ${
                                    isSelected
                                      ? "bg-black text-white font-bold shadow-sm"
                                      : "text-neutral-800 hover:bg-neutral-100 hover:text-black font-medium"
                                  }`}
                                  role="option"
                                  aria-selected={isSelected}
                                >
                                  <div className="flex items-center gap-2.5 truncate">
                                    <span
                                      className={`text-[10px] font-mono shrink-0 ${
                                        isSelected ? "text-white/60 font-normal" : "text-neutral-400"
                                      }`}
                                    >
                                      {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <span
                                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                        isSelected ? "bg-white" : "bg-neutral-300"
                                      }`}
                                    />
                                    <span className="truncate">{service}</span>
                                  </div>

                                  {isSelected && (
                                    <Check className="w-3.5 h-3.5 stroke-[2.5] text-white shrink-0 ml-2" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Name & Email (text-base prevents iOS auto-zoom on focus) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 font-semibold">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        disabled={isSubmitting}
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errorMessage) setErrorMessage(null);
                        }}
                        className="w-full bg-neutral-50 hover:bg-neutral-100/90 border border-neutral-300 rounded-xl px-4 py-3 text-base sm:text-sm text-neutral-900 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all disabled:opacity-50 shadow-sm"
                      />
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 font-semibold">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        disabled={isSubmitting}
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errorMessage) setErrorMessage(null);
                        }}
                        className="w-full bg-neutral-50 hover:bg-neutral-100/90 border border-neutral-300 rounded-xl px-4 py-3 text-base sm:text-sm text-neutral-900 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all disabled:opacity-50 shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 font-semibold">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      disabled={isSubmitting}
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errorMessage) setErrorMessage(null);
                      }}
                      className="w-full bg-neutral-50 hover:bg-neutral-100/90 border border-neutral-300 rounded-xl px-4 py-3 text-base sm:text-sm text-neutral-900 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all disabled:opacity-50 shadow-sm"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 font-semibold">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      disabled={isSubmitting}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errorMessage) setErrorMessage(null);
                      }}
                      className="w-full bg-neutral-50 hover:bg-neutral-100/90 border border-neutral-300 rounded-xl p-4 text-base sm:text-sm text-neutral-900 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all resize-none leading-relaxed disabled:opacity-50 shadow-sm"
                    />
                  </div>

                  {/* Error Alert if any */}
                  {errorMessage && (
                    <div className="p-3.5 sm:p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <p className="font-semibold text-red-900">{errorMessage}</p>
                          <p className="text-[11px] text-red-700">
                            You can also reach our team immediately on WhatsApp:
                          </p>
                        </div>
                      </div>
                      <a
                        href={`https://wa.me/919187233615?text=${encodeURIComponent(
                          `Hello Viyana Productions,\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${selectedService}\n\nProject Brief:\n${formData.message}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[11px] font-semibold flex items-center gap-1.5 transition-colors shadow"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Send via WhatsApp →
                      </a>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                    <span className="text-xs text-neutral-500 font-sans text-center sm:text-left font-medium">
                      We usually reply within 24 hours.
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-9 py-4 rounded-full bg-black text-white text-xs font-mono uppercase tracking-widest font-bold hover:bg-neutral-800 active:scale-95 transition-all cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-black/25 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <span>Send Message →</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. Studio Map & Location Section */}
      <section className="py-12 sm:py-24 px-4 sm:px-10 lg:px-16 border-t border-white/10 bg-brand-dark/40">
        <div className="container mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 sm:mb-12 gap-3 sm:gap-4">
            <div>
              <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.25em] text-white/50 block mb-1.5 sm:mb-2 font-medium">
                STUDIO HEADQUARTERS // BENGALURU
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
                Find Our Studio.
              </h2>
            </div>
            <a
              href="https://www.google.com/maps?cid=13843918391266491417&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en&gl=IN&source=embed"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white hover:text-black active:scale-95 text-white text-xs font-sans uppercase tracking-widest font-semibold border border-white/20 transition-all shadow-md w-full sm:w-auto justify-center"
            >
              <span>Get Directions</span>
              <span>↗</span>
            </a>
          </div>

          {/* Interactive Map Frame with Studio Info on mobile cleanly stacked */}
          <div className="space-y-4">
            <div className="relative w-full h-[320px] sm:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-brand-dark">
              {/* Embedded Google Map */}
              <iframe
                title="Viyana Productions Studio Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.7104147210457!2d77.54835817484063!3d12.926324587384869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3fa67d6a9eef%3A0xc01f7a6dbaefbc19!2sViyana%20Productions!5e0!3m2!1sen!2sin!4v1790415624332!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full filter contrast-[1.05] brightness-[0.88] grayscale-[30%] hover:grayscale-0 transition-all duration-700"
              />

              {/* Floating Studio Info Card (Desktop only overlay) */}
              <div className="hidden sm:block absolute bottom-6 left-6 z-10 max-w-sm p-5 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/20 shadow-2xl font-sans">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-white/60 font-semibold">
                    MAIN PRODUCTION FACILITY
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-serif text-white uppercase tracking-tight mb-1">
                  Viyana Productions
                </h3>
                <a
                  href="https://www.google.com/maps?cid=13843918391266491417&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en&gl=IN&source=embed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-brand-grey hover:text-white leading-relaxed mb-3 transition-colors group/addr"
                  title="Open in Google Maps"
                >
                  4th Floor, Gopalan Workspace,<br />
                  Kathriguppe Main Rd, 3rd Phase,<br />
                  Banashankari 3rd Stage, Banashankari,<br />
                  Bengaluru, Karnataka 560085
                </a>
                <div className="flex items-center justify-between pt-2.5 border-t border-white/10 text-[11px] text-white/70">
                  <span>Mon – Sat: 9:30 AM – 7:30 PM</span>
                  <a
                    href="https://www.google.com/maps?cid=13843918391266491417&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en&gl=IN&source=embed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline font-medium"
                  >
                    Open Maps ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile Studio Info Card (Stacked below map for full interactive map view) */}
            <div className="sm:hidden p-4 rounded-2xl bg-brand-dark border border-white/15 shadow-xl font-sans">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-white/70 font-semibold">
                  MAIN PRODUCTION FACILITY
                </span>
              </div>
              <h3 className="text-base font-serif text-white uppercase tracking-tight mb-1">
                Viyana Productions
              </h3>
              <a
                href="https://www.google.com/maps?cid=13843918391266491417&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en&gl=IN&source=embed"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-brand-grey hover:text-white leading-relaxed mb-3 transition-colors"
                title="Open in Google Maps"
              >
                4th Floor, Gopalan Workspace, Kathriguppe Main Rd, 3rd Phase, Banashankari 3rd Stage, Banashankari, Bengaluru, Karnataka 560085
              </a>
              <div className="flex items-center justify-between pt-2.5 border-t border-white/10 text-xs text-white/80">
                <span>Mon – Sat: 9:30 AM – 7:30 PM</span>
                <a
                  href="https://www.google.com/maps?cid=13843918391266491417&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en&gl=IN&source=embed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-mono font-medium underline underline-offset-2"
                >
                  Open Maps ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
