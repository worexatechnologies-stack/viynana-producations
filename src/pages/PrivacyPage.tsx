"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function PrivacyPage() {
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
              <span>DATA &amp; PRIVACY COMPLIANCE</span>
              <span className="text-white/20">•</span>
              <span>DPDP FRAMEWORK INDIA</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif uppercase tracking-tight text-white mb-6">
              PRIVACY POLICY
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-white/90 font-light leading-relaxed">
              Viyana Productions respects your privacy and is committed to protecting personal information that you provide through our website. This Privacy Policy explains what information we may collect, how we use it, how we protect it, and the choices available to you.
            </p>
          </div>

          {/* Body Sections */}
          <div className="space-y-10 sm:space-y-14 text-brand-grey text-sm md:text-base font-light leading-relaxed">
            
            {/* 1 */}
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-syne font-bold uppercase tracking-tight text-white">
                1. Information We May Collect
              </h2>
              <p>
                Depending on how you interact with our website, we may collect information such as:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 font-mono text-xs text-white/90">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                  <span className="text-white font-bold uppercase tracking-wider block">CONTACT INFORMATION</span>
                  <ul className="space-y-1 text-white/70">
                    <li>• Name</li>
                    <li>• Email address</li>
                    <li>• Phone number</li>
                    <li>• Company / organization name</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                  <span className="text-white font-bold uppercase tracking-wider block">PROJECT INFORMATION</span>
                  <ul className="space-y-1 text-white/70">
                    <li>• Project requirements</li>
                    <li>• Creative briefs</li>
                    <li>• Messages &amp; enquiries</li>
                    <li>• Information voluntarily provided</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                  <span className="text-white font-bold uppercase tracking-wider block">TECHNICAL INFORMATION</span>
                  <ul className="space-y-1 text-white/70">
                    <li>• IP address &amp; browser type</li>
                    <li>• Device &amp; operating system</li>
                    <li>• Website usage &amp; pages visited</li>
                    <li>• Approximate location</li>
                  </ul>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-white/70">
                We only seek information that is reasonably relevant to the purpose for which it is collected.
              </p>
            </div>

            {/* 2 */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-syne font-bold uppercase tracking-tight text-white">
                2. How We Collect Information
              </h2>
              <p>Information may be collected when you:</p>
              <ul className="space-y-1.5 list-disc list-inside pl-1 text-white/80 font-mono text-xs sm:text-sm">
                <li>Submit a contact form</li>
                <li>Request a quotation</li>
                <li>Enquire about our services</li>
                <li>Contact us by email or phone</li>
                <li>Submit a project brief</li>
                <li>Communicate with our team</li>
                <li>Browse or interact with our website</li>
              </ul>
            </div>

            {/* 3 */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-syne font-bold uppercase tracking-tight text-white">
                3. How We Use Your Information
              </h2>
              <p>We may use collected information to:</p>
              <ul className="space-y-1.5 list-disc list-inside pl-1 text-white/80 font-mono text-xs sm:text-sm">
                <li>Respond to enquiries</li>
                <li>Discuss potential projects</li>
                <li>Prepare quotations and proposals</li>
                <li>Deliver requested services</li>
                <li>Communicate about projects</li>
                <li>Improve our website and services</li>
                <li>Maintain website security</li>
                <li>Manage business relationships</li>
                <li>Meet applicable legal or contractual obligations</li>
              </ul>
              <p className="pt-2 text-white/90">
                Personal data should be processed for a lawful purpose and, where consent is the basis, consent should be appropriately informed and specific under India&apos;s DPDP framework.
              </p>
            </div>

            {/* 4 */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-syne font-bold uppercase tracking-tight text-white">
                4. Cookies &amp; Analytics
              </h2>
              <p>
                Our website may use cookies, analytics tools, or similar technologies to understand website usage and improve performance.
              </p>
              <p>These technologies may collect information such as:</p>
              <ul className="space-y-1 list-disc list-inside pl-1 text-white/80 font-mono text-xs sm:text-sm">
                <li>Pages visited</li>
                <li>Session information</li>
                <li>Device/browser information</li>
                <li>Traffic sources</li>
                <li>Website interactions</li>
              </ul>
              <p className="text-xs sm:text-sm text-white/70">
                You may be able to control cookies through your browser settings.
              </p>
            </div>

            {/* 5 */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-syne font-bold uppercase tracking-tight text-white">
                5. Marketing Communications
              </h2>
              <p>
                If you voluntarily provide your contact information for marketing or communication purposes, we may contact you about relevant services, projects, updates, or company information where permitted by applicable law. You may request that we stop sending marketing communications at any time.
              </p>
            </div>

            {/* 6 */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-syne font-bold uppercase tracking-tight text-white">
                6. Sharing of Information
              </h2>
              <p>
                We do not intend to sell your personal information.
              </p>
              <p>We may share information where reasonably necessary with:</p>
              <ul className="space-y-1.5 list-disc list-inside pl-1 text-white/80 font-mono text-xs sm:text-sm">
                <li>Service providers</li>
                <li>Website hosting providers</li>
                <li>Technology providers</li>
                <li>Analytics providers</li>
                <li>Production partners</li>
                <li>Professional advisers</li>
                <li>Government or law-enforcement authorities where legally required</li>
              </ul>
              <p className="text-xs sm:text-sm text-white/70">
                Third parties receiving information may be subject to contractual, legal, or other applicable obligations.
              </p>
            </div>

            {/* 7 */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-syne font-bold uppercase tracking-tight text-white">
                7. Client &amp; Project Information
              </h2>
              <p>
                Information shared with Viyana Productions for a project may be used for delivering the agreed services. Confidential project information will be handled according to applicable contractual confidentiality obligations. If a project contains confidential information, clients should communicate any specific confidentiality requirements before sharing sensitive materials.
              </p>
            </div>

            {/* 8 */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-syne font-bold uppercase tracking-tight text-white">
                8. Data Security
              </h2>
              <p>
                We take reasonable measures to protect personal information against unauthorized access, misuse, alteration, disclosure, or destruction. However, no internet transmission or electronic storage system can be guaranteed to be completely secure.
              </p>
            </div>

            {/* 9 */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-syne font-bold uppercase tracking-tight text-white">
                9. Data Retention
              </h2>
              <p>
                We retain personal information only for as long as reasonably necessary for the purpose for which it was collected, including applicable business, contractual, legal, accounting, or dispute-resolution requirements. When information is no longer required, we may securely delete or anonymize it where appropriate.
              </p>
            </div>

            {/* 10 */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-syne font-bold uppercase tracking-tight text-white">
                10. Your Privacy Rights
              </h2>
              <p>
                Depending on applicable law and circumstances, you may have rights relating to your personal data, including rights concerning access, correction, withdrawal of consent, and other applicable data-principal rights. India&apos;s DPDP framework provides mechanisms for individuals to manage or withdraw consent and exercise applicable rights.
              </p>
              <p>
                To make a privacy-related request, contact us using the details below.
              </p>
            </div>

            {/* 11 */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-syne font-bold uppercase tracking-tight text-white">
                11. Children&apos;s Privacy
              </h2>
              <p>
                Our website is not intentionally designed to collect personal information from children. If you believe that a child has provided personal information to us without appropriate authorization, please contact us so that we can review and take appropriate action.
              </p>
            </div>

            {/* 12 */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-syne font-bold uppercase tracking-tight text-white">
                12. Third-Party Websites
              </h2>
              <p>
                Our website may contain links to external websites, social-media platforms, video platforms, or other third-party services. Their privacy practices are governed by their own policies. We recommend reviewing their privacy policies before providing personal information.
              </p>
            </div>

            {/* 13 */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-syne font-bold uppercase tracking-tight text-white">
                13. Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy periodically to reflect changes in our services, technology, business practices, or applicable legal requirements. The latest version will be published on this page with the updated date.
              </p>
            </div>

            {/* 14 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/15 space-y-4">
              <h2 className="text-lg sm:text-xl font-syne font-bold uppercase tracking-tight text-white">
                14. Contact
              </h2>
              <p className="text-sm">
                For questions regarding this Privacy Policy:
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
                <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
                  Terms &amp; Conditions →
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
