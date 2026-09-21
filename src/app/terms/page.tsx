"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-brand-black text-brand-light">
      <Navbar />

      <section className="pt-28 sm:pt-36 md:pt-48 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-12">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl sm:text-5xl font-serif tracking-tighter mb-10 sm:mb-16">TERMS OF SERVICE</h1>

          <div className="space-y-8 sm:space-y-12 text-brand-grey text-sm md:text-base leading-relaxed">
            <div>
              <h2 className="text-xl font-syne font-semibold text-brand-light mb-4">1. Acceptance of Terms</h2>
              <p>By accessing and using the Viyana Production website (the &quot;Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>
            </div>

            <div>
              <h2 className="text-xl font-syne font-semibold text-brand-light mb-4">2. Intellectual Property</h2>
              <p>All content on this website, including but not limited to videos, images, text, logos, and graphics, is the exclusive property of Viyana Production Pvt. Ltd. and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or use any content without explicit written permission.</p>
            </div>

            <div>
              <h2 className="text-xl font-syne font-semibold text-brand-light mb-4">3. User Conduct</h2>
              <p>You agree to use the Service only for lawful purposes. You must not use the website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website.</p>
            </div>

            <div>
              <h2 className="text-xl font-syne font-semibold text-brand-light mb-4">4. Limitation of Liability</h2>
              <p>Viyana Production Pvt. Ltd. shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service.</p>
            </div>

            <div>
              <h2 className="text-xl font-syne font-semibold text-brand-light mb-4">5. Changes to Terms</h2>
              <p>We reserve the right to modify these terms at any time. We will notify users of any changes by updating the date at the bottom of this page. Your continued use of the Service after changes constitutes acceptance of the new terms.</p>
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
