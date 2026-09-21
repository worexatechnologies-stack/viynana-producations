"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


const originals = [
  { title: "SILENT ECHO", type: "FEATURE FILM", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop" },
  { title: "URBAN SYMPHONY", type: "DOCUMENTARY", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop" },
  { title: "THE CRAFT", type: "DOCUSERIES", image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2069&auto=format&fit=crop" },
];

export default function OriginalContentPage() {
  return (
    <main className="min-h-screen bg-brand-black text-brand-light">
      <Navbar />

      <section className="pt-28 sm:pt-36 md:pt-48 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-12">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-serif tracking-tighter mb-6 sm:mb-8 leading-[0.85]">
              ORIGINAL<br />CONTENT
            </h1>
            <p className="text-brand-grey text-sm tracking-widest uppercase mb-16 sm:mb-24 max-w-lg">
              Proprietary formats, short films, and feature-length narratives developed entirely in-house by Viyana Production.
            </p>
          </motion.div>

          <div className="flex flex-col gap-16 sm:gap-24">
            {originals.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="group relative w-full h-[50vh] sm:h-[60vh] md:h-[80vh] overflow-hidden"
                data-cursor="view"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-full h-full absolute inset-0 transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/20 to-transparent"></div>

                <div className="absolute bottom-8 sm:bottom-12 left-4 sm:left-6 lg:left-12">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-brand-light/70 mb-3 sm:mb-4 block">{item.type}</span>
                  <h2 className="text-3xl sm:text-4xl md:text-7xl font-syne font-bold tracking-tight text-brand-light">{item.title}</h2>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
