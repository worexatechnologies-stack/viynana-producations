"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MessageSquare, ArrowUpRight, Check, Copy, Loader2, AlertCircle } from "lucide-react";

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
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const copyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("info.viyanaproductions@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: selectedService,
          message: formData.message,
        }),
      });

      const text = await res.text();
      let data: { success?: boolean; error?: string } = {};

      try {
        data = JSON.parse(text);
      } catch {
        // If server returns HTML instead of JSON (e.g. 404 or 500), handle gracefully
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
              <div className="space-y-2">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/50 block">
                  Email
                </span>
                <a
                  href="mailto:info.viyanaproductions@gmail.com"
                  className="text-lg sm:text-2xl font-serif text-white hover:text-brand-light transition-colors block break-all"
                >
                  info.viyanaproductions@gmail.com
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="text-xs font-mono text-white/70 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5 py-1"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied to clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy email</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone & WhatsApp */}
              <div className="space-y-3">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/50 block">
                  Phone / WhatsApp
                </span>
                <a
                  href="tel:+919187233615"
                  className="text-xl sm:text-2xl font-mono text-white hover:text-brand-light transition-colors block"
                >
                  +91 91872 33615
                </a>
                <div className="pt-1">
                  <a
                    href="https://wa.me/919187233615?text=Hello%20Viyana%20Productions,%20I'd%20like%20to%20discuss%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/20 text-xs font-mono uppercase tracking-wider transition-colors w-full sm:w-auto"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat on WhatsApp ↗</span>
                  </a>
                </div>
              </div>

              {/* Studio */}
              <div className="space-y-3 pt-6 border-t border-white/10">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/50 block">
                  Studio Location
                </span>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <h3 className="text-sm font-serif uppercase text-white mb-1">Bengaluru</h3>
                  <p className="text-xs text-brand-grey leading-relaxed">
                    4th floor, Gopalan Workspace,<br />
                    Kathriguppe Main Rd, 3rd Phase,<br />
                    Banashankari 3rd Stage, Banashankari,<br />
                    Bengaluru, Karnataka 560085
                  </p>
                </div>
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
                    { name: "YouTube", href: "https://youtube.com" },
                    { name: "LinkedIn", href: "https://linkedin.com" },
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
                  {/* Service Selection */}
                  <div className="space-y-2.5 sm:space-y-3">
                    <label className="block text-xs font-mono uppercase tracking-widest text-white/70">
                      I&apos;m interested in
                    </label>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {services.map((service) => {
                        const isSelected = selectedService === service;
                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() => setSelectedService(service)}
                            className={`text-[11px] sm:text-xs font-mono uppercase px-3.5 py-2 sm:px-4 sm:py-2 rounded-full border transition-all cursor-pointer min-h-[38px] flex items-center justify-center ${
                              isSelected
                                ? "bg-white text-black border-white font-semibold shadow-md"
                                : "bg-transparent text-white/70 border-white/15 hover:border-white/40 hover:text-white"
                            }`}
                          >
                            {service}
                          </button>
                        );
                      })}
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
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
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
                    <div className="p-3.5 sm:p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs sm:text-sm flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-medium text-red-300">{errorMessage}</p>
                        <p className="text-[11px] text-red-200/70">
                          Need instant assistance? Reach us directly on WhatsApp at{" "}
                          <a
                            href="https://wa.me/919187233615"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-white font-medium"
                          >
                            +91 91872 33615
                          </a>
                        </p>
                      </div>
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
              href="https://www.google.com/maps?q=4th+floor,+Gopalan+Workspace,+Kathriguppe+Main+Rd,+3rd+Phase,+Banashankari+3rd+Stage,+Banashankari,+Bengaluru,+Karnataka+560085"
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
                src="https://maps.google.com/maps?q=Gopalan+Workspace,+Kathriguppe+Main+Rd,+3rd+Phase,+Banashankari+3rd+Stage,+Bengaluru,+Karnataka+560085&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
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
                <p className="text-xs text-brand-grey leading-relaxed mb-3">
                  4th floor, Gopalan Workspace,<br />
                  Kathriguppe Main Rd, 3rd Phase,<br />
                  Banashankari 3rd Stage, Banashankari,<br />
                  Bengaluru, Karnataka 560085
                </p>
                <div className="flex items-center justify-between pt-2.5 border-t border-white/10 text-[11px] text-white/70">
                  <span>Mon – Sat: 9:30 AM – 7:30 PM</span>
                  <a
                    href="https://www.google.com/maps?q=4th+floor,+Gopalan+Workspace,+Kathriguppe+Main+Rd,+3rd+Phase,+Banashankari+3rd+Stage,+Banashankari,+Bengaluru,+Karnataka+560085"
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
              <p className="text-xs text-brand-grey leading-relaxed mb-3">
                4th floor, Gopalan Workspace, Kathriguppe Main Rd, 3rd Phase, Banashankari 3rd Stage, Banashankari, Bengaluru, Karnataka 560085
              </p>
              <div className="flex items-center justify-between pt-2.5 border-t border-white/10 text-xs text-white/80">
                <span>Mon – Sat: 9:30 AM – 7:30 PM</span>
                <a
                  href="https://www.google.com/maps?q=4th+floor,+Gopalan+Workspace,+Kathriguppe+Main+Rd,+3rd+Phase,+Banashankari+3rd+Stage,+Banashankari,+Bengaluru,+Karnataka+560085"
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
