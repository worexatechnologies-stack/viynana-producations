"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import TextReveal from "@/components/TextReveal";
import { producers } from "@/data/producers";

export default function ProducersPage() {
  return (
    <main className="min-h-screen bg-brand-black text-brand-light">
      <Navbar />

      <section className="pt-28 sm:pt-36 md:pt-48 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-12">
        <div className="container mx-auto">
          <TextReveal
            text="PRODUCERS"
            className="text-4xl sm:text-5xl md:text-8xl font-serif tracking-tighter mb-16 sm:mb-24 uppercase"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {producers.map((producer, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative"
              >
                <div className="relative w-full aspect-[3/4] overflow-hidden mb-6">
                  <img
                    src={producer.image}
                    alt={producer.name}
                    className="object-cover w-full h-full absolute inset-0 transition-transform duration-1000 group-hover:scale-105 grayscale"
                  />
                </div>
                <h3 className="text-2xl font-serif tracking-tight mb-2">{producer.name}</h3>
                <p className="text-[10px] tracking-widest uppercase text-brand-grey mb-4">{producer.role}</p>
                <p className="text-sm text-brand-light/80 leading-relaxed text-balance">
                  {producer.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
