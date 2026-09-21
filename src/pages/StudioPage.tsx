"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


const studioImages = [
  { url: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2070&auto=format&fit=crop", cols: "col-span-12 md:col-span-8", aspect: "aspect-[16/9]" },
  { url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop", cols: "col-span-12 md:col-span-4", aspect: "aspect-[3/4]" },
  { url: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop", cols: "col-span-12 md:col-span-6", aspect: "aspect-square" },
  { url: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2000&auto=format&fit=crop", cols: "col-span-12 md:col-span-6", aspect: "aspect-[16/9]" },
];

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-brand-black text-brand-light">
      <Navbar />

      <section className="pt-28 sm:pt-36 md:pt-48 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-12">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col md:flex-row justify-between items-start gap-8 sm:gap-12 mb-16 sm:mb-24"
          >
            <h1 className="text-4xl sm:text-5xl md:text-[7vw] font-serif tracking-tight leading-[0.85]">
              INSIDE<br />VIYANA
            </h1>
            <div className="md:w-1/3">
              <p className="text-brand-grey text-sm md:text-base leading-relaxed text-balance">
                Our creative ecosystem is designed to foster collaboration and push boundaries. With fully equipped shooting spaces, soundstages, and advanced post-production suites under one roof, we have the freedom to execute any vision.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-12 gap-4 sm:gap-6 md:gap-12">
            {studioImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative w-full ${img.cols} ${img.aspect} overflow-hidden group`}
              >
                <img
                  src={img.url}
                  alt={`Viyana Studio ${idx + 1}`}
                  className="object-cover w-full h-full absolute inset-0 transition-transform duration-1000 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
