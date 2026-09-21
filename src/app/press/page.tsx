"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { press } from "@/data/press";

export default function PressPage() {
  return (
    <main className="min-h-screen bg-brand-black text-brand-light">
      <Navbar />

      <section className="pt-28 sm:pt-36 md:pt-48 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-12">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="mb-16 sm:mb-24 text-center md:text-left"
          >
            <h1 className="text-4xl sm:text-5xl md:text-[7vw] font-serif tracking-tighter leading-[0.85] mb-6">
              PRESS &<br />RECOGNITION
            </h1>
          </motion.div>

          <div className="flex flex-col border-t border-brand-grey/20">
            {press.map((item, idx) => (
              <motion.a
                href={item.link}
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group flex flex-col md:flex-row md:items-center justify-between py-8 sm:py-12 border-b border-brand-grey/20 cursor-pointer"
                data-cursor="open"
              >
                <div className="md:w-1/5 mb-3 sm:mb-4 md:mb-0">
                  <span className="text-[10px] tracking-widest uppercase text-brand-grey">{item.date}</span>
                </div>
                <div className="md:w-3/5 mb-3 sm:mb-4 md:mb-0 pr-0 sm:pr-8">
                  <h3 className="text-xl sm:text-2xl md:text-4xl font-serif tracking-tight group-hover:text-brand-grey transition-colors mb-2 leading-tight text-balance">{item.headline}</h3>
                  <p className="text-xs tracking-widest uppercase text-brand-grey mt-3 sm:mt-4 md:mt-0">{item.project}</p>
                </div>
                <div className="md:w-1/5 flex md:justify-end">
                  <span className="text-xs uppercase tracking-widest text-brand-light font-medium group-hover:text-brand-grey transition-colors">{item.publication}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
