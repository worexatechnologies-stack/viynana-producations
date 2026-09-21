"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function JournalPage() {
  const articles = [
    { title: "The Evolution of Virtual Production", category: "Technology", date: "Aug 12, 2026" },
    { title: "Cinematography in the Digital Age", category: "Creative", date: "Jul 28, 2026" },
    { title: "Behind the Scenes: Neon Horizons", category: "Production", date: "Jun 15, 2026" },
    { title: "Why We Still Shoot on 16mm", category: "Film", date: "May 02, 2026" },
  ];

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
            JOURNAL
          </motion.h1>

          <div className="flex flex-col border-t border-brand-grey/20">
            {articles.map((article, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex flex-col md:flex-row md:items-center justify-between py-8 sm:py-12 border-b border-brand-grey/20 cursor-pointer"
                data-cursor="open"
              >
                <div className="md:w-1/4 mb-3 sm:mb-4 md:mb-0">
                  <span className="text-[10px] tracking-widest uppercase text-brand-grey">{article.date}</span>
                </div>
                <div className="md:w-1/2 mb-3 sm:mb-4 md:mb-0">
                  <h3 className="text-xl sm:text-2xl md:text-4xl font-serif tracking-tight group-hover:text-brand-grey transition-colors">{article.title}</h3>
                </div>
                <div className="md:w-1/4 flex md:justify-end">
                  <span className="text-[10px] tracking-widest uppercase border border-brand-grey/30 rounded-full px-4 py-1">{article.category}</span>
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
