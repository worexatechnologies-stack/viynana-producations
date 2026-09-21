"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";

const stills = [
  { url: "https://images.unsplash.com/photo-1542451313056-b7c8e626645f?q=80&w=2000&auto=format&fit=crop", aspect: "aspect-[16/9]" },
  { url: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2000&auto=format&fit=crop", aspect: "aspect-[4/5]" },
  { url: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2000&auto=format&fit=crop", aspect: "aspect-[3/2]" },
  { url: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2000&auto=format&fit=crop", aspect: "aspect-square" },
  { url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000&auto=format&fit=crop", aspect: "aspect-[4/5]" },
  { url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000&auto=format&fit=crop", aspect: "aspect-[16/9]" },
  { url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2000&auto=format&fit=crop", aspect: "aspect-[3/2]" },
  { url: "https://images.unsplash.com/photo-1517457210348-703079e57d4b?q=80&w=2000&auto=format&fit=crop", aspect: "aspect-square" },
];

export default function StillsPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-brand-black text-brand-light">
      <Navbar />

      <section className="pt-28 sm:pt-36 md:pt-48 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-12">
        <div className="container mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="text-4xl sm:text-5xl md:text-8xl font-serif tracking-tighter mb-16 sm:mb-24"
          >
            STILLS<br />ARCHIVE
          </motion.h1>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 sm:gap-6 lg:gap-12 space-y-4 sm:space-y-6 lg:space-y-12">
            {stills.map((still, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className={`relative w-full ${still.aspect} overflow-hidden group cursor-pointer`}
                onClick={() => setLightboxIndex(idx)}
                data-cursor="view"
              >
                <img
                  src={still.url}
                  alt={`Viyana Still ${idx + 1}`}
                  className="object-cover w-full h-full absolute inset-0 transition-transform duration-1000 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-black/95 backdrop-blur flex items-center justify-center p-6 lg:p-12"
          >
            <button
              className="absolute top-4 sm:top-8 right-4 sm:right-8 z-[110] text-xs uppercase tracking-widest hover:text-brand-grey transition-colors"
              onClick={() => setLightboxIndex(null)}
            >
              CLOSE
            </button>
            <button
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-[110] text-xs uppercase tracking-widest hover:text-brand-grey transition-colors"
              onClick={() => setLightboxIndex((prev) => prev! > 0 ? prev! - 1 : stills.length - 1)}
            >
              PREV
            </button>
            <button
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-[110] text-xs uppercase tracking-widest hover:text-brand-grey transition-colors"
              onClick={() => setLightboxIndex((prev) => prev! < stills.length - 1 ? prev! + 1 : 0)}
            >
              NEXT
            </button>

            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={stills[lightboxIndex].url}
                alt="Lightbox Image"
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
