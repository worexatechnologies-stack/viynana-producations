"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
    <main className="min-h-screen bg-brand-black text-brand-light selection:bg-white selection:text-black">
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
            
            {/* Left Column: Direct Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 space-y-8 sm:space-y-10"
            >
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

            {/* Right Column: Simple, Elegant Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-7 bg-brand-dark/70 p-5 sm:p-10 rounded-2xl sm:rounded-3xl border border-white/10 backdrop-blur-sm"
            >
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.25)]">
                    <Check className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <h3 className="text-2xl font-serif text-white">Message Sent!</h3>
                  <p className="text-xs sm:text-sm text-brand-grey max-w-md mx-auto">
                    Thank you, {formData.name || "there"}. We have received your enquiry and will get back to you shortly.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", phone: "", message: "" });
                        setErrorMessage(null);
                      }}
                      className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  {/* Service Selection Dropdown */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-widest text-white/70">
                      I&apos;m interested in *
                    </label>
                    <div className="relative">
                      <select
                        name="service"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full bg-brand-black border border-white/15 hover:border-white/35 focus:border-white rounded-xl px-4 sm:px-5 py-3.5 text-xs sm:text-sm text-white font-mono uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-white/20 transition-all appearance-none cursor-pointer pr-12 shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
                      >
                        {services.map((service, index) => (
                          <option
                            key={service}
                            value={service}
                            className="bg-[#111111] text-white py-2.5 text-xs sm:text-sm font-mono uppercase"
                          >
                            {String(index + 1).padStart(2, "0")} • {service.toUpperCase()}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/60">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Name & Email (text-base prevents iOS auto-zoom on focus) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="block text-xs font-mono uppercase tracking-wider text-white/60">
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
                        className="w-full bg-brand-black border border-white/15 rounded-xl px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-white transition-colors disabled:opacity-50"
                      />
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="block text-xs font-mono uppercase tracking-wider text-white/60">
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
                        className="w-full bg-brand-black border border-white/15 rounded-xl px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-white transition-colors disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/60">
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
                      className="w-full bg-brand-black border border-white/15 rounded-xl px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-white transition-colors disabled:opacity-50"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/60">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      disabled={isSubmitting}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errorMessage) setErrorMessage(null);
                      }}
                      className="w-full bg-brand-black border border-white/15 rounded-xl p-4 text-base sm:text-sm text-white focus:outline-none focus:border-white transition-colors resize-none leading-relaxed disabled:opacity-50"
                    />
                  </div>

                  {/* Error Alert if any */}
                  {errorMessage && (
                    <div className="p-3.5 sm:p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <p className="font-medium text-red-300">{errorMessage}</p>
                          <p className="text-[11px] text-red-200/70">
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
                    <span className="text-xs text-white/40 font-sans text-center sm:text-left">
                      We usually reply within 24 hours.
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black text-xs font-mono uppercase tracking-widest font-bold hover:bg-brand-light active:scale-95 transition-all cursor-pointer shadow-lg hover:shadow-white/10 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-black" />
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
