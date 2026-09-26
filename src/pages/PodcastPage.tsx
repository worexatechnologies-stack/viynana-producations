"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const podcastServices = [
  { num: "01", title: "Podcast Studio Rental", desc: "Acoustically treated, professional recording environment built for pristine sound capture." },
  { num: "02", title: "Multi-Camera Recording", desc: "Cinematic multi-angle capture   bring the visual energy of your conversations to life." },
  { num: "03", title: "Professional Audio Recording", desc: "Studio-grade microphones, live mixing, and crystal-clear audio engineering." },
  { num: "04", title: "Video Podcast Production", desc: "Full-production video podcasts with broadcast-quality lighting and set design." },
  { num: "05", title: "Interview & Talk Shows", desc: "Structured guest and panel formats optimised for conversation and engagement." },
  { num: "06", title: "Podcast Editing", desc: "Complete post-production   cut, clean, master and deliver a polished final product." },
  { num: "07", title: "Reels & Short-Form Clips", desc: "Social-ready highlight clips and engaging short-form content for every platform." },
  { num: "08", title: "YouTube Podcast Production", desc: "Long-form, fully produced YouTube episodes with graphics, intros and thumbnails." },
];

export default function PodcastPage() {
  return (
    <main className="min-h-screen bg-brand-black text-brand-light relative overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-28 sm:pt-36 md:pt-48 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.04)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-white/[0.012] rounded-full blur-[140px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none opacity-30" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/50">
              VIYANA PRODUCTIONS / PODCAST PRODUCTION
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-end">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <h1 className="text-5xl sm:text-7xl md:text-[8vw] lg:text-[7.5vw] font-display font-extrabold uppercase tracking-tight leading-[0.85] text-white select-none">
                YOUR<br />
                <span className="text-white/35">VOICE.</span><br />
                YOUR<br />
                <span className="text-white/35">STORY.</span><br />
                YOUR<br />
                PLATFORM.
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="lg:col-span-5 flex flex-col gap-8"
            >
              <p className="text-sm sm:text-base md:text-lg text-brand-grey leading-relaxed font-light">
                A complete podcast production setup built for creators, brands, entrepreneurs, and businesses. From studio recording and multi-camera production to professional audio, editing, and final delivery   we help turn conversations into engaging content.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  id="podcast-start-project-btn"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-brand-light hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                >
                  <span>START A PROJECT</span>
                  <span className="group-hover:translate-x-1 transition-transform font-bold">→</span>
                </Link>
                <Link
                  to="/studio"
                  id="podcast-explore-studio-btn"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-mono text-xs uppercase tracking-widest hover:border-white hover:bg-white/10 active:scale-95 transition-all duration-300"
                >
                  <span>EXPLORE STUDIO</span>
                  <span>→</span>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                {[
                  { value: "8+", label: "Services" },
                  { value: "4K", label: "Video Output" },
                  { value: "360", label: "Production" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-1">
                    <span className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">{stat.value}</span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 border-t border-white/10 relative">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16"
          >
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/40 block mb-3">PODCAST SERVICES</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-white leading-tight">
                EVERYTHING YOU<br />NEED TO RECORD.
              </h2>
            </div>
            <Link
              to="/contact"
              className="text-xs font-mono uppercase tracking-widest text-white/80 hover:text-white flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white bg-white/5 hover:bg-white/10 transition-all shrink-0"
            >
              <span>BOOK A SESSION →</span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {podcastServices.map((service, i) => (
              <motion.div
                key={service.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                className="group relative p-6 sm:p-7 rounded-2xl border border-white/10 bg-white/[0.025] hover:bg-white/[0.06] hover:border-white/30 transition-all duration-300 cursor-default overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
                <span className="text-[10px] font-mono text-white/25 block mb-4 tracking-widest relative z-10">[{service.num}]</span>
                <h3 className="text-base sm:text-lg font-display font-bold text-white uppercase tracking-tight leading-tight mb-3 group-hover:text-brand-light transition-colors relative z-10">{service.title}</h3>
                <p className="text-xs sm:text-sm text-brand-grey font-light leading-relaxed relative z-10">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS STRIP */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-t border-white/10 bg-brand-dark/30">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/40 block mb-3">HOW IT WORKS</span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">THE PROCESS</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { step: "01", title: "BRIEF & PLANNING", desc: "We understand your show format, audience, and brand goals." },
              { step: "02", title: "STUDIO SESSION", desc: "Record in our acoustically treated, fully equipped studio." },
              { step: "03", title: "POST-PRODUCTION", desc: "Our editors cut, clean, mix, and master your episode." },
              { step: "04", title: "FINAL DELIVERY", desc: "Receive all formats   audio, video, reels and clips ready to publish." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col gap-4 p-6 rounded-2xl border border-white/8 bg-white/[0.02]"
              >
                <span className="text-4xl sm:text-5xl font-display font-extrabold text-white/10 tracking-tighter leading-none">{item.step}</span>
                <div>
                  <h4 className="text-sm font-display font-bold text-white uppercase tracking-tight mb-2">{item.title}</h4>
                  <p className="text-xs text-brand-grey font-light leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 text-center border-t border-white/10 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)] pointer-events-none rounded-full" />
        <div className="container mx-auto max-w-4xl relative z-10 space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/50 block">READY TO START?</span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-white leading-tight">
            YOUR NEXT EPISODE<br />STARTS HERE.
          </h2>
          <p className="text-sm sm:text-base text-brand-grey max-w-xl mx-auto font-light leading-relaxed">
            Book a session, bring your ideas, and let us handle the rest. From recording to delivery, we have got you covered.
          </p>
          <div className="pt-3 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              id="podcast-cta-book-btn"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-brand-light hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl"
            >
              <span>BOOK A SESSION →</span>
            </Link>
            <Link
              to="/work"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full border border-white/20 text-white font-mono text-xs uppercase tracking-widest hover:border-white hover:bg-white/10 active:scale-95 transition-all duration-300"
            >
              <span>VIEW OUR WORK →</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
