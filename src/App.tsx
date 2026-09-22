import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { clsx } from "clsx";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";

// Pages
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import WorkPage from "@/pages/WorkPage";
import WorkDetailPage from "@/pages/WorkDetailPage";
import ShowreelPage from "@/pages/ShowreelPage";
import DirectorsPage from "@/pages/DirectorsPage";
import DirectorDetailPage from "@/pages/DirectorDetailPage";
import ContactPage from "@/pages/ContactPage";
import StillsPage from "@/pages/StillsPage";
import StudioPage from "@/pages/StudioPage";
import JournalPage from "@/pages/JournalPage";
import PressPage from "@/pages/PressPage";
import ProducersPage from "@/pages/ProducersPage";
import OriginalContentPage from "@/pages/OriginalContentPage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import NotFoundPage from "@/pages/NotFoundPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Preloader />
      <SmoothScroll>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<WorkDetailPage />} />
          <Route path="/showreel" element={<ShowreelPage />} />
          <Route path="/directors" element={<DirectorsPage />} />
          <Route path="/directors/:id" element={<DirectorDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/stills" element={<StillsPage />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/press" element={<PressPage />} />
          <Route path="/producers" element={<ProducersPage />} />
          <Route path="/original-content" element={<OriginalContentPage />} />
          <Route path="/privacy-policy" element={<PrivacyPage />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </SmoothScroll>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div
        className={clsx(
          "antialiased bg-brand-black text-brand-light selection:bg-brand-light selection:text-brand-black font-sans"
        )}
      >
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}
