"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  title?: string;
  category?: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  videoSrc,
  title = "Viyana Showreel",
  category = "Cinematic Production",
}: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          data-lenis-prevent
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-3 sm:p-6 md:p-10 overflow-y-auto overscroll-contain"
          onClick={onClose}
        >
          {/* Floating Top Right Close Button for Mobile & Desktop */}
          <button
            onClick={onClose}
            type="button"
            className="fixed top-4 sm:top-6 right-4 sm:right-6 z-[210] px-4 py-2 rounded-full bg-white/15 hover:bg-white text-white hover:text-black border border-white/30 backdrop-blur-xl text-xs font-mono uppercase tracking-widest transition-all duration-300 shadow-2xl flex items-center gap-2 cursor-pointer active:scale-95"
            aria-label="Close video player"
          >
            <span>CLOSE</span>
            <span className="text-sm font-bold">✕</span>
          </button>

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl bg-brand-dark rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-black mt-12 sm:mt-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-brand-black/90 backdrop-blur-md">
              <div className="flex items-center gap-2.5 min-w-0 pr-4">
                <span className="w-2 h-2 rounded-full bg-white animate-ping flex-shrink-0" />
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-brand-grey font-mono truncate">
                  {category}
                </span>
                <span className="text-white/30 hidden sm:inline">•</span>
                <span className="text-xs sm:text-sm font-serif uppercase tracking-tight text-white font-semibold truncate">
                  {title}
                </span>
              </div>

              <button
                onClick={onClose}
                type="button"
                className="text-[10px] sm:text-xs uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/20 hover:border-white text-white hover:bg-white hover:text-black transition-colors font-mono cursor-pointer shrink-0"
                aria-label="Close video player"
              >
                CLOSE ✕
              </button>
            </div>

            {/* Video Player */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              <video
                ref={videoRef}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Footer Bar */}
            <div className="px-4 sm:px-6 py-2.5 bg-brand-black/90 border-t border-white/10 flex justify-between items-center text-[10px] sm:text-[11px] text-brand-grey uppercase tracking-widest font-mono">
              <span className="truncate">VIYANA PRODUCTIONS // CINEMA MASTER</span>
              <span className="hidden sm:inline-block">PRESS ESC TO CLOSE</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
