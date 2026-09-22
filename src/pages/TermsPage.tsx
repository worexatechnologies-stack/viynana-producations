"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-brand-black text-brand-light selection:bg-white selection:text-black">
      <Navbar />

      <section className="pt-28 sm:pt-36 md:pt-44 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto max-w-4xl relative z-10">
          
          {/* Header */}
          <div className="border-b border-white/10 pb-8 sm:pb-12 mb-10 sm:mb-14">
            <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.25em] text-white/50 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>LEGAL DOCUMENTATION</span>
              <span className="text-white/20">•</span>
              <span>VIYANA PRODUCTIONS</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif uppercase tracking-tight text-white mb-6">
              TERMS &amp; CONDITIONS
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-white/90 font-light leading-relaxed">
              Welcome to Viyana Productions. By accessing or using this website, you agree to the following Terms &amp; Conditions. If you do not agree with these terms, please do not use the website.
            </p>
          </div>

          {/* Body Sections */}
          <div className="space-y-10 sm:space-y-14 text-brand-grey text-sm md:text-base font-light leading-relaxed">
            
            {/* 1 */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-syne font-bold uppercase tracking-tight text-white">
                1. About Viyana Productions
              </h2>
              <p>
                Viyana Productions is a creative production company providing services including advertising production, film production, web and vertical series, cinematography, graphic design, visual identity, post-production, and related creative services.
              </p>
            </div>

            {/* 2 */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-syne font-bold uppercase tracking-tight text-white">
                2. Website Use
              </h2>
              <p>
                You may use this website for lawful purposes only.
              </p>
              <p className="font-medium text-white/80">You agree not to:</p>
              <ul className="space-y-2 list-disc list-inside pl-1 text-white/80 font-mono text-xs sm:text-sm">
                <li>Use the website for unlawful or fraudulent purposes.</li>
                <li>Attempt to gain unauthorized access to the website or its systems.</li>
                <li>Copy, reproduce, modify, or distribute website content without permission.</li>
                <li>Use our brand, name, logo, images, videos, or creative materials without authorization.</li>
                <li>Upload or transmit malicious software or harmful content.</li>
                <li>Interfere with the operation or security of the website.</li>
              </ul>
            </div>

            {/* 3 */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-syne font-bold uppercase tracking-tight text-white">
                3. Intellectual Property
              </h2>
              <p>
                All content appearing on this website, including but not limited to:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-2 font-mono text-xs text-white/90">
                <span className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">• Logos &amp; brand elements</span>
                <span className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">• Photographs</span>
                <span className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">• Videos &amp; films</span>
                <span className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">• Graphics</span>
                <span className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">• Designs</span>
                <span className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">• Text</span>
                <span className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">• Illustrations</span>
                <span className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">• Portfolio work</span>
                <span className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">• Creative concepts</span>
                <span className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 sm:col-span-3">• Website design</span>
              </div>
              <p>
                Owned by or licensed to Viyana Productions, unless otherwise stated. No content may be copied, reproduced, republished, distributed, modified, or commercially exploited without prior written permission.
              </p>
            </div>

            {/* 4 */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-syne font-bold uppercase tracking-tight text-white">
                4. Portfolio &amp; Client Work
              </h2>
              <p>
                Projects displayed on the website may include work created for clients, collaborators, brands, artists, or production partners. Where applicable, third-party trademarks, logos, names, photographs, footage, and other materials remain the property of their respective owners. The appearance of a project or brand in our portfolio does not necessarily imply an ongoing partnership or endorsement.
              </p>
            </div>

            {/* 5 */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-syne font-bold uppercase tracking-tight text-white">
                5. Creative Services
              </h2>
              <p>
                Any information about our services displayed on the website is for general information. Specific project requirements, timelines, deliverables, revisions, fees, licensing, usage rights, and responsibilities will be determined through a separate proposal, quotation, agreement, work order, or contract where applicable.
              </p>
            </div>

            {/* 6 */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-syne font-bold uppercase tracking-tight text-white">
                6. Project Deliverables
              </h2>
              <p>
                Final deliverables will be provided according to the agreed project scope. Additional revisions, formats, production requirements, locations, talent, equipment, licensing, travel, reshoots, or other requirements outside the agreed scope may involve additional charges.
              </p>
            </div>

            {/* 7 */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-syne font-bold uppercase tracking-tight text-white">
                7. Third-Party Materials
              </h2>
              <p>
                Some projects may use third-party: Music, Stock footage, Fonts, Images, Software, Locations, Talent, or Production resources. The applicable licensing and usage restrictions may apply to such materials. Clients are responsible for complying with any agreed licensing or usage limitations applicable to materials supplied or approved by them.
              </p>
            </div>

            {/* 8 */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-syne font-bold uppercase tracking-tight text-white">
                8. Website Accuracy
              </h2>
              <p>
                We aim to keep the information on this website accurate and current. However, we do not guarantee that all website content will always be complete, accurate, or up to date. We may modify, update, remove, or add website content at any time without prior notice.
              </p>
            </div>

            {/* 9 */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-syne font-bold uppercase tracking-tight text-white">
                9. External Links
              </h2>
              <p>
                Our website may contain links to third-party websites or platforms. Viyana Productions does not control those websites and is not responsible for their content, availability, security, privacy practices, or terms.
              </p>
            </div>

            {/* 10 */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-syne font-bold uppercase tracking-tight text-white">
                10. Limitation of Liability
              </h2>
              <p>
                To the extent permitted by applicable law, Viyana Productions will not be responsible for indirect, incidental, consequential, or business losses arising from the use of this website or reliance on information provided through it.
              </p>
            </div>

            {/* 11 */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-syne font-bold uppercase tracking-tight text-white">
                11. Website Availability
              </h2>
              <p>
                We do not guarantee that the website will always be available, uninterrupted, secure, or free from errors. Temporary interruptions may occur because of maintenance, technical problems, hosting issues, or circumstances beyond our reasonable control.
              </p>
            </div>

            {/* 12 */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-syne font-bold uppercase tracking-tight text-white">
                12. Changes to These Terms
              </h2>
              <p>
                Viyana Productions may update these Terms &amp; Conditions from time to time. Any updated version will be published on this page with the revised Last Updated date.
              </p>
            </div>

            {/* 13 */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-syne font-bold uppercase tracking-tight text-white">
                13. Governing Law
              </h2>
              <p>
                These Terms &amp; Conditions shall be governed by the applicable laws of India.
              </p>
              <p>
                Any dispute arising in connection with these terms shall be subject to the jurisdiction of the appropriate courts having jurisdiction over Bengaluru, Karnataka, India, unless otherwise agreed in writing.
              </p>
            </div>

            {/* 14 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/15 space-y-4">
              <h2 className="text-lg sm:text-xl font-syne font-bold uppercase tracking-tight text-white">
                14. Contact
              </h2>
              <p className="text-sm">
                For questions regarding these Terms &amp; Conditions:
              </p>

              <div className="space-y-3 pt-2 font-mono text-xs sm:text-sm">
                <p className="text-white font-bold text-base font-syne">Viyana Productions</p>
                
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-white/60 shrink-0" />
                  <a href="mailto:info.viyanaproductions@gmail.com" className="text-white hover:underline">
                    info.viyanaproductions@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-white/60 shrink-0" />
                  <a href="tel:+919187233615" className="text-white hover:underline">
                    +91 91872 33615
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-white/60 shrink-0 mt-0.5" />
                  <span className="text-white/80">
                    4th floor, Gopalan Workspace, Kathriguppe Main Rd, 3rd Phase, Banashankari 3rd Stage, Banashankari, Bengaluru, Karnataka 560085
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-white/40 uppercase tracking-widest">
              <span>LAST REVISED: 2026</span>
              <div className="flex gap-4">
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy →
                </Link>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
