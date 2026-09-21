"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-brand-black text-brand-light">
      <Navbar />

      <section className="pt-28 sm:pt-36 md:pt-48 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-12">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl sm:text-5xl font-serif tracking-tighter mb-10 sm:mb-16">PRIVACY POLICY</h1>

          <div className="space-y-8 sm:space-y-12 text-brand-grey text-sm md:text-base leading-relaxed">
            <div>
              <h2 className="text-xl font-syne font-semibold text-brand-light mb-4">1. Information We Collect</h2>
              <p>We may collect personal information that you provide directly to us when you use our contact forms, subscribe to our newsletter, or interact with our website. This may include your name, email address, company name, and project details.</p>
            </div>

            <div>
              <h2 className="text-xl font-syne font-semibold text-brand-light mb-4">2. How We Use Your Information</h2>
              <p>We use the information we collect to communicate with you about your projects, respond to your inquiries, improve our website and services, and send you updates about Viyana Production (if you have opted in).</p>
            </div>

            <div>
              <h2 className="text-xl font-syne font-semibold text-brand-light mb-4">3. Data Sharing and Disclosure</h2>
              <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website or conducting our business, so long as those parties agree to keep this information confidential.</p>
            </div>

            <div>
              <h2 className="text-xl font-syne font-semibold text-brand-light mb-4">4. Data Security</h2>
              <p>We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.</p>
            </div>

            <div className="pt-12 border-t border-brand-grey/20">
              <p className="text-xs uppercase tracking-widest">Last Updated: August 2026</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
