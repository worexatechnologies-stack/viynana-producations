import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { clsx } from "clsx";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";

// Keep HomePage eager for instant homepage rendering
import HomePage from "@/pages/HomePage";

// Code-split all other routes to keep initial bundle ultra-fast & lightweight
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const WorkPage = lazy(() => import("@/pages/WorkPage"));
const WorkDetailPage = lazy(() => import("@/pages/WorkDetailPage"));
const ShowreelPage = lazy(() => import("@/pages/ShowreelPage"));
const DirectorsPage = lazy(() => import("@/pages/DirectorsPage"));
const DirectorDetailPage = lazy(() => import("@/pages/DirectorDetailPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const StillsPage = lazy(() => import("@/pages/StillsPage"));
const StudioPage = lazy(() => import("@/pages/StudioPage"));
const JournalPage = lazy(() => import("@/pages/JournalPage"));
const PressPage = lazy(() => import("@/pages/PressPage"));
const ProducersPage = lazy(() => import("@/pages/ProducersPage"));
const OriginalContentPage = lazy(() => import("@/pages/OriginalContentPage"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));
const TermsPage = lazy(() => import("@/pages/TermsPage"));
const PodcastPage = lazy(() => import("@/pages/PodcastPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

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
        <Suspense fallback={<div className="min-h-screen bg-brand-black" />}>
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
            <Route path="/podcast" element={<PodcastPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
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
