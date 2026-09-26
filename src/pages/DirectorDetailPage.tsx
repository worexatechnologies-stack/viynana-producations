import { useParams } from "react-router-dom";
"use client";

import { use, useState, useRef } from "react";
import { Navigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Play,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Camera,
  Award,
  Volume2,
  VolumeX,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoModal from "@/components/VideoModal";
import { directors } from "@/data/directors";

const monochromeDirectorTheme = {
  accent: "text-white",
  glow: "rgba(255, 255, 255, 0.15)",
  badge: "bg-white/10 border-white/20 text-white",
  dot: "bg-white",
  borderGlow: "border-white/25 shadow-[0_0_40px_rgba(255,255,255,0.08)]",
  gradient: "from-white/15 via-white/5 to-transparent",
  bgWash: "bg-white/5",
};

const directorThemes: Record<string, typeof monochromeDirectorTheme> = {
  "preethish": monochromeDirectorTheme,
  "elena-rostova": monochromeDirectorTheme,
};

export default function DirectorProfilePage() {
  const { id } = useParams<{ id: string }>();
  const director = directors.find((d) => d.id === id);

  if (!director) {
    return <Navigate to="/not-found" />;
  }

  const theme = (id && directorThemes[id]) || monochromeDirectorTheme;

  const currentIdx = directors.findIndex((d) => d.id === id);
  const nextDirector = directors[(currentIdx + 1) % directors.length];

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState({ src: "", title: "", category: "" });
  const [isInlineMuted, setIsInlineMuted] = useState(true);
  const inlineVideoRef = useRef<HTMLVideoElement>(null);

  const toggleInlineAudio = () => {
    if (inlineVideoRef.current) {
      inlineVideoRef.current.muted = !inlineVideoRef.current.muted;
      setIsInlineMuted(inlineVideoRef.current.muted);
    }
  };

  const openShowreelModal = (title?: string) => {
    setSelectedVideo({
      src: director.reelSrc || "/showreel-video-4k-h264.mp4",
      title: title || `${director.name}   Directorial Showreel`,
      category: `${director.specialization} • ${director.filmFormat.split("//")[0]}`,
    });
    setIsVideoModalOpen(true);
  };

  return (
    <main className="bg-brand-black text-brand-light min-h-screen overflow-x-hidden selection:bg-white selection:text-black">
      <Navbar />

      {/* TOP BAR / BACK NAVIGATION */}
      <div className="pt-28 pb-4 px-6 sm:px-10 lg:px-16 border-b border-white/10 bg-brand-black/90 backdrop-blur-md sticky top-0 z-30">
        <div className="container mx-auto max-w-6xl flex items-center justify-between">
          <Link
            to="/directors"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/70 hover:text-white transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Directors</span>
          </Link>

          <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/15 text-white/80">
            {director.category} {"// ROSTER"}
          </span>
        </div>
      </div>

      {/* 1. MAIN SECTION: DIRECTOR IMAGE & ABOUT */}
      <section className="py-12 sm:py-16 md:py-20 px-6 sm:px-10 lg:px-16 relative overflow-hidden">
        {/* Ambient Director Color Aurora (GPU accelerated) */}
        <div
          className="absolute -top-32 -left-20 w-[550px] h-[550px] rounded-full pointer-events-none opacity-40"
          style={{ background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)` }}
        />
        <div
          className="absolute top-1/2 -right-20 w-[450px] h-[450px] rounded-full pointer-events-none opacity-25"
          style={{ background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)` }}
        />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left: Director Image Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className={`lg:col-span-5 relative aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden border bg-brand-dark shadow-2xl group ${theme.borderGlow}`}
            >
              <img
                src={director.image}
                alt={director.name}


                className="object-cover w-full h-full absolute inset-0 object-top filter brightness-[0.9] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              {/* Image Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider z-10">
                <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white/90">
                  {director.filmFormat.split("//")[0].trim()}
                </span>
                <span className={`w-2 h-2 rounded-full ${theme.dot} animate-pulse`} />
              </div>

              <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between">
                <span className="text-xs font-mono text-white/80 flex items-center gap-1.5">
                  <MapPin className={`w-3.5 h-3.5 ${theme.accent}`} />
                  <span>{director.location}</span>
                </span>
                <span className={`text-[10px] font-mono uppercase tracking-widest ${theme.accent}`}>
                  {director.representation}
                </span>
              </div>
            </motion.div>

            {/* Right: Content About Director */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="space-y-2">
                <span className={`text-xs font-mono uppercase tracking-[0.25em] ${theme.accent} block`}>
                  {director.specialization}
                </span>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-syne font-bold uppercase tracking-tight text-white leading-[0.95]">
                  {director.name}
                </h1>
              </div>

              {/* Directorial Quote */}
              <blockquote className="text-base sm:text-xl font-serif italic text-white/90 border-l-2 pl-4 py-1 leading-relaxed" style={{ borderColor: theme.glow }}>
                &ldquo;{director.quote}&rdquo;
              </blockquote>

              {/* Bio Description */}
              <p className="text-sm sm:text-base text-brand-grey font-light leading-relaxed">
                {director.bio}
              </p>

              {/* Style Tags */}
              <div className="pt-2 flex flex-wrap gap-2">
                {director.styleTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wider text-white/80"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => openShowreelModal()}
                  className="px-7 py-3.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-brand-light transition-all flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-black" />
                  <span>Watch Reel</span>
                </button>

                <Link
                  to={`/contact?director=${encodeURIComponent(director.name)}`}
                  className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-mono text-xs uppercase tracking-widest font-medium transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Inquire / Book</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. RELATED SECTION 1: SHOWREEL & FEATURED WORK */}
      <section className="py-16 sm:py-20 px-6 sm:px-10 lg:px-16 border-t border-white/10 bg-brand-dark/40 relative">
        <div className="container mx-auto max-w-6xl space-y-10">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
            <div>
              <span className={`text-xs font-mono uppercase tracking-[0.25em] ${theme.accent} block mb-1`}>
                SCREENING ROOM
              </span>
              <h2 className="text-2xl sm:text-4xl font-syne font-bold uppercase tracking-tight text-white">
                Showreel &amp; Campaigns
              </h2>
            </div>

            <button
              type="button"
              onClick={toggleInlineAudio}
              className="px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs font-mono uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
            >
              {isInlineMuted ? <VolumeX className="w-3.5 h-3.5 text-white/60" /> : <Volume2 className={`w-3.5 h-3.5 ${theme.accent}`} />}
              <span>{isInlineMuted ? "Sound Off" : "Sound On"}</span>
            </button>
          </div>

          {/* Embedded Video Showcase */}
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/15 bg-black shadow-2xl group">
            <video
              ref={inlineVideoRef}
              src={director.reelSrc || "/showreel-video-4k-h264.mp4"}
              preload="metadata"
              poster={director.image}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* Bottom Bar on Video */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-white z-10">
              <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15">
                {director.filmFormat}
              </span>
              <button
                type="button"
                onClick={() => openShowreelModal()}
                className="px-4 py-1.5 rounded-full bg-white text-black font-semibold hover:bg-brand-light transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3 h-3 fill-black" />
                <span>Fullscreen</span>
              </button>
            </div>
          </div>

          {/* Sample Campaigns Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-2">
            {director.sampleCampaigns.map((camp) => (
              <div
                key={camp.title}
                onClick={() => openShowreelModal(`${camp.title}   ${camp.client}`)}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/25 hover:bg-white/[0.04] transition-all cursor-pointer group space-y-3"
              >
                <div className={`flex items-center justify-between text-xs font-mono ${theme.accent}`}>
                  <span>{camp.year}</span>
                  <Play className="w-3 h-3 fill-white text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <h3 className="text-lg font-syne font-bold text-white uppercase tracking-tight group-hover:text-white transition-colors leading-tight">
                    {camp.title}
                  </h3>
                  <span className="text-xs font-mono text-white/50 block mt-1">
                    {camp.client}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. RELATED SECTION 2: CINEMA CRAFT & NEXT DIRECTOR */}
      <section className="py-16 sm:py-20 px-6 sm:px-10 lg:px-16 border-t border-white/10">
        <div className="container mx-auto max-w-6xl space-y-12">

          <div>
            <span className={`text-xs font-mono uppercase tracking-[0.25em] ${theme.accent} block mb-1`}>
              PRODUCTION DETAILS
            </span>
            <h2 className="text-2xl sm:text-4xl font-syne font-bold uppercase tracking-tight text-white">
              Cinema Craft &amp; Clients
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1: Camera & Format */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className={`flex items-center gap-2 text-xs font-mono ${theme.accent} uppercase tracking-wider`}>
                <Camera className="w-4 h-4" />
                <span>Camera &amp; Optics</span>
              </div>
              <p className="text-sm font-mono text-white leading-relaxed">
                {director.cameraPackage}
              </p>
              <p className="text-xs font-mono text-white/50">
                Lenses: {director.lensChoice}
              </p>
            </div>

            {/* Card 2: Clients & Accolades */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className={`flex items-center gap-2 text-xs font-mono ${theme.accent} uppercase tracking-wider`}>
                <Award className="w-4 h-4" />
                <span>Commercial Clients</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {director.clients.map((client) => (
                  <span
                    key={client}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/80"
                  >
                    {client}
                  </span>
                ))}
              </div>
              <p className={`text-xs font-mono ${theme.accent} pt-1`}>
                {director.awards[0]}
              </p>
            </div>

            {/* Card 3: Next Director & Book */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/15 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block">
                  {directors.length > 1 ? "EXPLORE NEXT ROSTER DIRECTOR" : "EXPLORE PRODUCTION WORKS"}
                </span>
                {directors.length > 1 ? (
                  <>
                    <Link
                      to={`/directors/${nextDirector.id}`}
                      className="text-xl font-syne font-bold uppercase text-white hover:text-brand-light transition-colors block mt-1"
                    >
                      {nextDirector.name} →
                    </Link>
                    <p className="text-xs font-mono text-white/50 mt-0.5">
                      {nextDirector.specialization}
                    </p>
                  </>
                ) : (
                  <>
                    <Link
                      to="/work"
                      className="text-xl font-syne font-bold uppercase text-white hover:text-brand-light transition-colors block mt-1"
                    >
                      All Selected Works →
                    </Link>
                    <p className="text-xs font-mono text-white/50 mt-0.5">
                      Commercials, Features, Virtual VFX
                    </p>
                  </>
                )}
              </div>

              <Link
                to={`/contact?director=${encodeURIComponent(director.name)}`}
                className="w-full py-3 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-brand-light transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Book {director.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Fullscreen Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc={selectedVideo.src}
        title={selectedVideo.title}
        category={selectedVideo.category}
      />

      <Footer />
    </main>
  );
}
