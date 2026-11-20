import React, { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowUpRight,
  Camera,
  Film,
  Phone,
  Mail,
  MapPin,
  Check,
  Copy,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { projects, Project } from "@/data/projects";

interface CinemaFilmItem {
  id: string;
  title: string;
  tag: string;
  category: string;
  src?: string;
  youtubeId?: string;
  poster: string;
  badge: string;
  description: string;
}

export interface CinemaStillItem {
  id: string;
  title: string;
  category: string;
  tag: string;
  image: string;
  alt: string;
  description: string;
}

function getProjectCinemaFilms(project: Project): CinemaFilmItem[] {
  const defaultPoster = project.thumbnail || (project.gallery && project.gallery[0]) || "/images/hero-bg.jpg";

  if (project.slug === "product-shoot") {
    return [
      {
        id: "jewellery-bts",
        title: "Behind The Scenes — Luxury Jewellery Production Breakdown",
        tag: "BTS Studio Breakdown",
        category: "Fine Jewellery",
        src: "/videos/product-jewellery-behind-the-scenes.mp4",
        poster: "/images/product-shoot/10-antique-gold-bangles-sculptural.jpg",
        badge: "01 / BTS Reel",
        description:
          "Exclusive BTS breakdown showing paper-tear styling, precision directional lighting, and mannequin hand composition in Bangalore.",
      },
      {
        id: "jewellery-oole",
        title: "Oole Style Everyday — Fine Jewellery Commercial Reel",
        tag: "Commercial Film",
        category: "Fine Jewellery",
        src: "/videos/product-jewellery-oole-commercial.mp4",
        poster: "/images/product-shoot/11-pearl-butterfly-gold-chain-nest.jpg",
        badge: "02 / Fine Jewellery",
        description:
          "Artisanal gold metallurgy, egg nest conceptual still life, and luxury ring details engineered for social conversion.",
      },
      {
        id: "chopping-board",
        title: "Precision Craft & Kitchenware — Chopping Board Commercial",
        tag: "Kitchenware Film",
        category: "Commercial Ads",
        src: "/videos/product-chopping-board.mp4",
        poster: "/images/product-shoot/01-melanex-serum.jpg",
        badge: "03 / Tactile Kitchenware",
        description:
          "Dynamic studio lighting, organic wood grain textures, and tactile commercial pacing for premium cookware.",
      },
      {
        id: "commercial-render",
        title: "Product Motion & Macro Studio Render",
        tag: "Motion & CGI",
        category: "3D Motion",
        src: "/videos/product-commercial-render.mp4",
        poster: "/images/product-shoot/03-dewexa-cloud-cream.jpg",
        badge: "04 / 3D Macro Motion",
        description:
          "High-contrast studio lighting highlighting product silhouettes, glass reflections, and cinematic brand pacing.",
      },
      {
        id: "final-output",
        title: "Luxury Product Commercial & Visual Motion Master",
        tag: "Commercial Master",
        category: "Product Cinema",
        src: "/videos/product-final-output.mp4",
        poster: "/images/product-shoot/06-genex-serum.jpg",
        badge: "05 / Commercial Master",
        description:
          "High-fidelity cinema lighting, crisp packaging reflections, and rhythmic commercial pacing engineered for luxury conversion.",
      },
    ];
  }

  if (project.slug === "influencer-shoot") {
    return [
      {
        id: "influencer-master",
        title: "Featured Influencer Film · 4K Edition",
        tag: "Creator Showcase",
        category: "Influencer Shoot",
        src: "/final-output.mp4",
        poster: "/reel-01-poster.jpg",
        badge: "01 / Featured Reel",
        description:
          "High-retention 9:16 vertical cuts and cinematic 4K creator storytelling engineered to capture attention on Instagram feeds.",
      },
      {
        id: "influencer-render",
        title: "Influencer Lifestyle Editorial Motion Master",
        tag: "Lifestyle Motion",
        category: "Influencer Shoot",
        src: "/final-render-video-volpue.mp4",
        poster: "/reel-02-poster.jpg",
        badge: "02 / Creator Cinema",
        description:
          "Trend-conscious color grading and visual rhythm engineered to captivate social feeds and maximize audience retention.",
      },
      {
        id: "influencer-commercial-reel",
        title: "Model & Brand Fashion Reel",
        tag: "Fashion Reel",
        category: "Influencer Shoot",
        src: "/viyana-commercial-reel.mp4",
        poster: "/images/model-shoot/01-emerald-saree-model.jpg",
        badge: "03 / Brand Collab",
        description:
          "Dynamic model movement and sculpted lighting for viral creator content and brand campaigns.",
      },
      {
        id: "influencer-production-final",
        title: "Style Motion & High-Fashion Aesthetics Cut",
        tag: "Viral Style",
        category: "Influencer Shoot",
        src: "/viyana-production-final-video.mp4",
        poster: "/images/model-shoot/02-black-sequin-saree.jpg",
        badge: "04 / Viral Style",
        description:
          "Fluid high-fashion posing movement and beauty grades engineered for audience retention.",
      },
      {
        id: "influencer-editorial-runway",
        title: "Editorial Model Portrait & Comp-Card Reel",
        tag: "Editorial Cut",
        category: "Influencer Shoot",
        src: "/2.mp4",
        poster: "/images/model-shoot/03-temple-heritage-pose.jpg",
        badge: "05 / Runway Cut",
        description:
          "Sculpted directional key lighting and rhythmic creator motion crafted for international talent comp cards.",
      },
    ];
  }

  if (project.slug === "models-portfolio-shoots") {
    return [
      {
        id: "model-reel-1",
        title: "High-Fashion Editorial Model Reel & Comp-Card Motion",
        tag: "Editorial Reel",
        category: "Model Portfolio",
        src: "/viyana-production-final-video.mp4",
        poster: project.gallery[0] || defaultPoster,
        badge: "01 / Fashion Reel",
        description:
          "Sculpted key lighting, fluid high-fashion posing movement, and cinematic beauty grades for talent comp cards.",
      },
      {
        id: "model-reel-2",
        title: "Studio Model Commercial & Runway Pacing Master",
        tag: "Commercial Runway",
        category: "Studio Motion",
        src: "/viyana-commercial-reel.mp4",
        poster: project.gallery[1] || defaultPoster,
        badge: "02 / Commercial Runway",
        description:
          "Dynamic model movement and directional key strobe lighting designed for international casting and brand campaigns.",
      },
    ];
  }

  if (project.slug === "commercial-ads") {
    return [
      {
        id: "comm-ad-1",
        title: "National Broadcast Commercial & TVC Master",
        tag: "Broadcast TVC",
        category: "Commercial Film",
        src: "/viyana-commercial-reel.mp4",
        poster: project.gallery[0] || defaultPoster,
        badge: "01 / Broadcast TVC",
        description:
          "Full-scale commercial production crafted to bring brand stories to life with cinematic visuals and high-impact pacing.",
      },
      {
        id: "comm-ad-2",
        title: "Cinematic Brand Campaign & Commercial Cinema",
        tag: "Brand Cinema",
        category: "Brand Master",
        src: "/showreel-hero-4k.mp4",
        poster: project.gallery[1] || defaultPoster,
        badge: "02 / Brand Cinema",
        description:
          "Dynamic camera movement, theatrical lighting design, and professional ACEScc color grading.",
      },
    ];
  }

  if (project.slug === "podcast-production") {
    return [
      {
        id: "podcast-1",
        title: "Broadcast Multi-Camera Studio Podcast Master",
        tag: "4K Broadcast",
        category: "Podcast Studio",
        src: "/showreel-video-4k-h264.mp4",
        youtubeId: project.youtubeVideoId,
        poster: project.gallery[0] || defaultPoster,
        badge: "01 / Podcast Master",
        description:
          "Multi-camera 4K dynamic switching, broadcast Shure SM7B acoustic audio processing, and high-retention vertical clips.",
      },
    ];
  }

  if (project.slug === "vertical-series") {
    return [
      {
        id: "vertical-1",
        title: "High-Retention Vertical Cinema Series Master",
        tag: "Vertical 9:16",
        category: "Vertical Series",
        src: "/final-output.mp4",
        poster: project.gallery[0] || defaultPoster,
        badge: "01 / Vertical Master",
        description:
          "Native 9:16 vertical storytelling crafted with cinematic optics, rapid episode pacing, and cliffhanger retention.",
      },
      {
        id: "vertical-2",
        title: "Episodic Social Drama & Vertical Motion",
        tag: "Social Drama",
        category: "Vertical Series",
        src: "/viyana-production-final-video.mp4",
        poster: project.gallery[1] || defaultPoster,
        badge: "02 / Episodic Drama",
        description:
          "Compelling character close-ups and smartphone-native compositions engineered for bingeable retention.",
      },
    ];
  }

  if (project.slug === "advertisement") {
    return [
      {
        id: "ad-1",
        title: "High-Conversion Digital Advertisement & TVC Campaign",
        tag: "Commercial Master",
        category: "Advertisement",
        src: "/viyana-commercial-reel.mp4",
        poster: project.gallery[0] || defaultPoster,
        badge: "01 / Digital TVC",
        description:
          "Data-driven visual hooks, rhythmic pacing, and striking cinematography engineered for measurable brand performance.",
      },
      {
        id: "ad-2",
        title: "Visual Brand Campaign Commercial",
        tag: "Brand Film",
        category: "Brand Campaign",
        src: "/final-output.mp4",
        poster: project.gallery[1] || defaultPoster,
        badge: "02 / Campaign Master",
        description:
          "High-impact visuals and emotional narrative built to drive conversion and long-term brand equity.",
      },
    ];
  }

  if (project.slug === "cinematic-content-shoot") {
    return [
      {
        id: "cinema-1",
        title: "Cinematic Brand Narrative & Large-Format Visuals",
        tag: "Cinematic Reel",
        category: "Content Cinema",
        src: "/showreel-hero-4k.mp4",
        poster: project.gallery[0] || defaultPoster,
        badge: "01 / Cinema Master",
        description:
          "High-end cinema camera workflow capturing raw emotion, textured natural light, and atmospheric storytelling.",
      },
      {
        id: "cinema-2",
        title: "Atmospheric Visual Storytelling Master",
        tag: "Visual Story",
        category: "Content Film",
        src: "/website-video-2.mp4",
        poster: project.gallery[1] || defaultPoster,
        badge: "02 / Visual Story",
        description:
          "Deliberate framing, organic camera movement, and filmic color science crafted for visionary brands.",
      },
    ];
  }

  if (project.slug === "graphic-design-and-visual-identity") {
    return [
      {
        id: "graphic-1",
        title: "3D Brand Motion & Comprehensive Visual Identity",
        tag: "3D Motion",
        category: "Visual Identity",
        src: "/videos/product-commercial-render.mp4",
        poster: project.gallery[0] || defaultPoster,
        badge: "01 / Visual Identity",
        description:
          "Bespoke typography, 3D motion systems, and brand guidelines engineered for luxury brand equity.",
      },
    ];
  }

  if (project.slug === "studio-rental") {
    return [
      {
        id: "studio-1",
        title: "Acoustic Soundstage & Production Studio Tour",
        tag: "Studio Tour",
        category: "Studio Rental",
        src: "/showreel-video-4k-h264.mp4",
        poster: project.gallery[0] || defaultPoster,
        badge: "01 / Studio Space",
        description:
          "Fully equipped production soundstage in Bangalore with Aputure/Profoto lighting grid, cyclorama wall, and client amenities.",
      },
    ];
  }

  // Fallback for any other projects
  const films: CinemaFilmItem[] = [];

  if (project.videos && project.videos.length > 0) {
    project.videos.forEach((vSrc, idx) => {
      films.push({
        id: `${project.slug}-vid-${idx + 1}`,
        title: `${project.title} — Reel ${String(idx + 1).padStart(2, "0")}`,
        tag: project.deliverableType || "Commercial Film",
        category: project.category,
        src: vSrc,
        poster: project.gallery[idx] || defaultPoster,
        badge: `0${idx + 1} / Reel`,
        description: project.description,
      });
    });
  } else if (project.video) {
    films.push({
      id: `${project.slug}-main`,
      title: `${project.title} — Official Commercial Master`,
      tag: project.deliverableType || "Commercial Master",
      category: project.category,
      src: project.video,
      poster: defaultPoster,
      badge: "01 / Commercial Master",
      description: project.description,
    });
  } else {
    films.push({
      id: `${project.slug}-feature`,
      title: `${project.title} — Cinematic Showcase`,
      tag: project.deliverableType || "Brand Film",
      category: project.category,
      src: "/showreel-hero-4k.mp4",
      poster: defaultPoster,
      badge: "01 / Featured Film",
      description: project.description,
    });
  }

  return films;
}

export function getProjectCinemaStills(project: Project): CinemaStillItem[] {
  if (project.slug === "product-shoot") {
    return [
      {
        id: "01",
        title: "Antique Temple Gold Necklace — Chessboard Study",
        category: "Jewellery",
        tag: "Fine Jewellery · Antique Gold",
        image: "/images/product-shoot/07-antique-gold-necklace-chess.jpg",
        alt: "Handcrafted antique gold necklace and jhumkas on wooden chessboard",
        description:
          "Rich warm temple gold with handcrafted filigree and ruby bead accents, staged across a rustic chessboard with royal chess pieces.",
      },
      {
        id: "02",
        title: "Artisanal Gold Filigree Jhumkas with Sapphire Beads",
        category: "Jewellery",
        tag: "Earrings · Bridal & Festive",
        image: "/images/product-shoot/08-filigree-jhumkas-blue-beads.jpg",
        alt: "Gold filigree jhumka earrings with deep blue droplet beads suspended against architectural lattice",
        description:
          "Intricate jaali dome work adorned with royal blue droplet beads, highlighting delicate gold metallurgy against clean architectural contrast.",
      },
      {
        id: "03",
        title: "Peacock Motif Antique Gold Studs — Parisian Accent",
        category: "Jewellery",
        tag: "Earrings · Heritage Craft",
        image: "/images/product-shoot/09-peacock-gold-earrings-eiffel.jpg",
        alt: "Peacock motif antique gold stud earrings with ruby stones mounted on bronze Eiffel tower",
        description:
          "Traditional Mayura peacock carvings with ruby eyes mounted on a Parisian bronze spire, blending heritage craftsmanship with contemporary concept.",
      },
      {
        id: "04",
        title: "Sculptural Antique Gold Bangles — Contrast Composition",
        category: "Jewellery",
        tag: "Bangles · Luxury Editorial",
        image: "/images/product-shoot/10-antique-gold-bangles-sculptural.jpg",
        alt: "Antique gold bangles displayed on matte black mannequin hands breaking through white paper",
        description:
          "High-contrast studio editorial featuring antique gold floral kadas held by matte black sculptural hands emerging from torn white paper.",
      },
      {
        id: "05",
        title: "Pearl Butterfly Fine Gold Chain — Nest Installation",
        category: "Jewellery",
        tag: "Neckwear · Minimalist Luxury",
        image: "/images/product-shoot/11-pearl-butterfly-gold-chain-nest.jpg",
        alt: "Delicate gold link chain with sculpted pearl butterflies draped over porcelain egg in straw nest",
        description:
          "Organic conceptual still life featuring iridescent mother-of-pearl butterflies on a fine gold chain, delicately draped over an egg in a natural twig nest.",
      },
      {
        id: "06",
        title: "Dewexa Dermal Bio Cloud Cream — Podium & Packaging",
        category: "Skincare",
        tag: "Moisturizer · 50 g",
        image: "/images/product-shoot/dewexa-biocloud-cream-podium.jpg",
        alt: "Dermera Dewexa Dermal Bio Cloud Cream jar with crimson luxury box on studio podium",
        description:
          "Polished gold metallic lid paired with textured crimson red carton, angled with razor-sharp reflection on studio pedestal.",
      },
      {
        id: "07",
        title: "Dewexa Dermal Bio Cloud Cream — Zero-Gravity Bubbles",
        category: "Skincare",
        tag: "Moisturizer · 50 g",
        image: "/images/product-shoot/dewexa-biocloud-cream-bubbles.jpg",
        alt: "Dermera Dewexa Dermal Bio Cloud Cream floating with crystalline bubbles on soft azure blue",
        description:
          "Weightless studio levitation surrounded by crystalline water spheres on soft azure blue backdrop.",
      },
      {
        id: "08",
        title: "Luminex Luminous Face Wash — Foaming Lather In-Hand",
        category: "Skincare",
        tag: "Cleanser · 100 ml",
        image: "/images/product-shoot/luminex-facewash-foam-hand.jpg",
        alt: "Dermera Luminex face wash tube held in hand with rich cleansing lather",
        description:
          "Matte black tube nestled in rich cloud-like cleansing lather against a fresh studio backdrop.",
      },
      {
        id: "09",
        title: "Luminex Luminous Face Wash — Botanical Moisture & Dewdrop",
        category: "Skincare",
        tag: "Cleanser · 100 ml",
        image: "/images/product-shoot/luminex-facewash-botanical-dew.jpg",
        alt: "Dermera Luminex face wash tube resting on foam with fresh green leaves and dew drops",
        description:
          "Resting on dense white cleansing foam framed by dew-kissed betel leaves on organic green set.",
      },
      {
        id: "10",
        title: "Luminex Luminous Face Wash — Golden Gel Texture Pour",
        category: "Skincare",
        tag: "Cleanser · 100 ml",
        image: "/images/product-shoot/luminex-facewash-gel-pour.jpg",
        alt: "Dermera Luminex face wash dispensing viscous golden cleansing gel into hand",
        description:
          "Sensorial dispensing action capturing golden amber cleansing gel streaming into open palm on peach backdrop.",
      },
      {
        id: "11",
        title: "Genex Advanced PDRN+ Revitalizing Serum — Liquid Ribbon Motion",
        category: "Skincare",
        tag: "Serum · 30 ml",
        image: "/images/product-shoot/genex-pdrn-serum-ribbons.jpg",
        alt: "Dermera Genex Advanced PDRN+ serum bottle with swirling pink liquid ribbons and bubbles",
        description:
          "Frosted glass dispenser enveloped in dynamic swirling pink serum ribbons and ambient droplets.",
      },
      {
        id: "12",
        title: "Primex Dermal Repair Toner Cum Face Serum — Silhouette Study",
        category: "Skincare",
        tag: "Serum · 30 ml",
        image: "/images/product-shoot/primex-toner-serum-silhouette.jpg",
        alt: "Dermera Primex Dermal Repair Toner Serum floating with silhouette hands behind scrim",
        description:
          "Conceptual editorial installation with floating golden elixir surrounded by ethereal shadowy hands behind diffused silk scrim.",
      },
      {
        id: "12",
        title: "Studio Product Editorial — E-Commerce Packshot 01",
        category: "Commercial",
        tag: "E-Commerce · Studio Lighting",
        image: "/images/product-shoot-1.jpg",
        alt: "Studio lighting product editorial packshot",
        description: "Studio strobe setup with reflection control.",
      },
      {
        id: "13",
        title: "Studio Product Editorial — E-Commerce Packshot 02",
        category: "Commercial",
        tag: "E-Commerce · High Key",
        image: "/images/product-shoot-2.jpg",
        alt: "Studio product photography with crisp shadows",
        description: "High-key studio product lighting on clean pedestal.",
      },
      {
        id: "14",
        title: "Studio Product Editorial — E-Commerce Packshot 03",
        category: "Commercial",
        tag: "E-Commerce · Dark Editorial",
        image: "/images/product-shoot-3.jpg",
        alt: "Luxury editorial product composition with directional light",
        description: "Dark, moody luxury editorial product setup.",
      },
    ];
  }

  if (project.slug === "influencer-shoot") {
    return [
      {
        id: "01",
        title: "Featured Influencer Film · 4K Edition",
        category: "Creator Showcase",
        tag: "Creator Showcase",
        image: "/reel-01-poster.jpg",
        alt: "Featured Influencer Film · 4K Edition",
        description: "Editorial portrait and high-engagement creator storytelling shot in Bangalore.",
      },
      {
        id: "02",
        title: "Influencer Lifestyle Editorial Motion Master",
        category: "Lifestyle Motion",
        tag: "Lifestyle Motion",
        image: "/reel-02-poster.jpg",
        alt: "Influencer Lifestyle Editorial Motion Master",
        description: "Lifestyle creator motion master with calibrated natural light.",
      },
      {
        id: "03",
        title: "Model & Brand Fashion Reel",
        category: "Fashion Reel",
        tag: "Fashion Reel",
        image: "/images/model-shoot/01-emerald-saree-model.jpg",
        alt: "Model & Brand Fashion Reel",
        description: "High-fashion apparel editorial and brand collaboration.",
      },
      {
        id: "04",
        title: "Style Motion & High-Fashion Aesthetics Cut",
        category: "Viral Style",
        tag: "Viral Style",
        image: "/images/model-shoot/02-black-sequin-saree.jpg",
        alt: "Style Motion & High-Fashion Aesthetics Cut",
        description: "Black sequin saree styling with sculpted rim lighting.",
      },
      {
        id: "05",
        title: "Editorial Model Portrait & Comp-Card Reel",
        category: "Editorial Motion",
        tag: "Editorial Cut",
        image: "/images/model-shoot/03-temple-heritage-pose.jpg",
        alt: "Editorial Model Portrait & Comp-Card Reel",
        description: "Temple heritage architectural pose and talent comp card master.",
      },
    ];
  }

  const images =
    Array.isArray(project.gallery) && project.gallery.length > 0
      ? project.gallery
      : project.thumbnail
      ? [project.thumbnail]
      : [];

  return images.map((img, idx) => {
    const subtitle =
      project.highlights?.[idx]?.subtitle ||
      project.keyFeatures?.[idx] ||
      `${project.title} production still crafted by Viyana Productions in Bangalore.`;

    const title =
      project.highlights?.[idx]?.title ||
      `${project.title} — Frame ${String(idx + 1).padStart(2, "0")}`;

    return {
      id: String(idx + 1).padStart(2, "0"),
      title,
      category: project.category,
      tag: project.deliverableType || "Production Still",
      image: img,
      alt: `${project.title} still ${idx + 1}`,
      description: subtitle,
    };
  });
}

export default function WorkDetailPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug || p.aliases?.includes(slug!));

  if (!project) {
    return <Navigate to="/not-found" />;
  }

  if (project.slug !== slug) {
    return <Navigate to={`/work/${project.slug}`} replace />;
  }

  const currentIdx = projects.findIndex((p) => p.slug === project.slug);
  const nextProjectIdx = (currentIdx + 1) % projects.length;
  const nextProject = projects[nextProjectIdx];

  return (
    <UniversalWorkCinemaPage
      project={project}
      nextProject={nextProject}
      categoryIndex={currentIdx + 1}
    />
  );
}

export function UniversalWorkCinemaPage({
  project,
  nextProject,
  categoryIndex,
}: {
  project: Project;
  nextProject: Project;
  categoryIndex: number;
}) {
  const films = getProjectCinemaFilms(project);
  const stills = getProjectCinemaStills(project);

  const [selectedVideoIdx, setSelectedVideoIdx] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Inquiry Form States
  const [inquiry, setInquiry] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryError, setInquiryError] = useState<string | null>(null);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopy = (text: string, type: "email" | "phone" | "address") => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      if (type === "email") {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else if (type === "phone") {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      } else if (type === "address") {
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 2000);
      }
    }
  };

  const handleInquirySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmittingInquiry(true);
    setInquiryError(null);

    const payload = {
      name: inquiry.name.trim(),
      email: inquiry.email.trim(),
      phone: inquiry.phone.trim(),
      service: project.title,
      message: inquiry.message.trim(),
    };

    try {
      let response: Response | null = null;
      let lastErrorMessage = "";

      // 1. Try relative endpoints in sequence (Node/Vercel -> PHP on Hostinger -> Root PHP)
      const endpointsToTry = ["/api/contact", "/api/contact.php", "/contact.php"];
      for (const endpoint of endpointsToTry) {
        if (response) break;
        try {
          const fetchRes = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(payload),
          });

          if (fetchRes.ok) {
            response = fetchRes;
            break;
          } else {
            try {
              const errData = (await fetchRes.json()) as { error?: string };
              if (errData?.error) lastErrorMessage = errData.error;
            } catch {
              // Non-JSON response
            }
          }
        } catch {
          // Network error on this endpoint, try next
        }
      }

      // 2. Fallback to local server on port 3001 if on localhost
      if (!response && typeof window !== "undefined") {
        const hostname = window.location.hostname;
        const isLocalHost =
          hostname === "localhost" ||
          hostname === "127.0.0.1" ||
          hostname.startsWith("192.168.") ||
          hostname.startsWith("10.") ||
          hostname.endsWith(".local");

        if (isLocalHost) {
          try {
            const fallbackRes = await fetch(`http://${hostname}:3001/api/contact`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });

            if (fallbackRes.ok) {
              response = fallbackRes;
            } else {
              try {
                const errData = (await fallbackRes.json()) as { error?: string };
                if (errData?.error) lastErrorMessage = errData.error;
              } catch {
                // Non-JSON response
              }
            }
          } catch {
            // Direct fallback error
          }
        }
      }

      if (!response) {
        throw new Error(
          lastErrorMessage || "Unable to send your message right now. Please try again or reach out directly."
        );
      }

      const text = await response.text();
      let result: { success?: boolean; error?: string } = {};
      try {
        result = JSON.parse(text);
      } catch {
        if (!response.ok) {
          throw new Error("Unable to parse server response.");
        }
      }

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to send your message. Please try again.");
      }

      setInquirySubmitted(true);
    } catch (error: unknown) {
      setInquiryError(
        error instanceof Error ? error.message : "Unable to send your message. Please try again."
      );
    } finally {
      setIsSubmittingInquiry(false);
    }
  };

  // Keyboard navigation for Lightbox & Video Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === "Escape") setLightboxIndex(null);
        if (e.key === "ArrowLeft") {
          setLightboxIndex((prev) => (prev === 0 ? stills.length - 1 : (prev ?? 1) - 1));
        }
        if (e.key === "ArrowRight") {
          setLightboxIndex((prev) => (prev === stills.length - 1 ? 0 : (prev ?? 0) + 1));
        }
      }

      if (selectedVideoIdx !== null) {
        if (e.key === "Escape") setSelectedVideoIdx(null);
        if (e.key === "ArrowLeft") {
          setSelectedVideoIdx((prev) => (prev === 0 ? films.length - 1 : (prev ?? 1) - 1));
        }
        if (e.key === "ArrowRight") {
          setSelectedVideoIdx((prev) => (prev === films.length - 1 ? 0 : (prev ?? 0) + 1));
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, selectedVideoIdx, stills.length, films.length]);

  return (
    <main className="bg-[#050505] text-[#f5f3ee] min-h-screen selection:bg-amber-400 selection:text-black overflow-x-hidden font-sans">
      <SEO
        title={project.seo?.metaTitle || `${project.title} | Viyana Productions`}
        description={project.seo?.metaDescription || project.description}
        keywords={project.seo?.metaKeywords || `${project.title.toLowerCase()}, video production, bangalore`}
        ogTitle={project.seo?.ogTitle || `${project.title} | Viyana Productions`}
        ogType={project.seo?.ogType || "website"}
        ogDescription={project.seo?.ogDescription || project.description}
        ogUrl={project.seo?.ogUrl || `https://viyana.productions/work/${project.slug}`}
        ogSiteName="Viyana Productions"
        ogImage={project.seo?.ogImage || project.thumbnail || "https://viyana.productions/logo-black.png"}
        canonical={project.seo?.canonical || `https://viyana.productions/work/${project.slug}`}
      />

      <Navbar />

      {/* 1. HERO: FIRST KEEP TITLE AND LITTLE CONTENT WHAT IS THERE THAT ONLY */}
      <section className="relative pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-8 lg:px-16 border-b border-white/[0.08] overflow-hidden">
        {/* Subtle ambient golden atmospheric glow */}
        <div className="absolute top-0 right-1/4 w-[550px] h-[550px] bg-gradient-to-br from-amber-500/10 via-amber-700/5 to-transparent blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-gradient-to-tr from-purple-500/5 via-transparent to-transparent blur-[120px] pointer-events-none rounded-full" />

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Eyebrow */}
          <div className="eyebrow mb-4">
            <span className="eyebrow-bullet" />
            <span>
              WORK ARCHIVE / {project.deliverableType || project.category}
            </span>
          </div>

          {/* Title First */}
          <h1 className="section-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white mb-4">
            {project.title}
            <em>.</em>
          </h1>

          {/* Little Content What Is There That Only */}
          <p className="section-note text-base sm:text-lg max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </div>
      </section>

      {/* 2. SECTION 1: VIDEOS (3, 3 IN A ROW) */}
      <section id="cinema-films" className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 bg-[#050507] relative border-b border-white/10">
        <div className="container mx-auto max-w-6xl space-y-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="eyebrow mb-2">
                <span className="eyebrow-bullet" />
                <span>COMMERCIAL MOTION &amp; FILMS</span>
              </div>
              <h2 className="section-title text-2xl sm:text-4xl lg:text-5xl">
                Featured <em>Films.</em>
              </h2>
            </div>
            <p className="section-note text-sm max-w-md">
              From behind-the-scenes breakdown to 4K commercial broadcast masters, each film is shot with razor-sharp glass and cinematic lighting.
            </p>
          </div>

          {/* 3, 3 in a Row Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {films.map((film, idx) => (
              <div
                key={film.id || idx}
                onClick={() => setSelectedVideoIdx(idx)}
                className="group rounded-2xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-amber-400/60 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(251,191,36,0.15)] flex flex-col cursor-pointer"
              >
                {/* 16:9 Video Aspect Ratio Frame */}
                <div className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center">
                  <img
                    src={film.poster}
                    alt={film.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="w-12 h-12 rounded-full bg-white/20 group-hover:bg-amber-400 group-hover:text-black text-white border border-white/30 backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-xl group-hover:scale-110">
                      <Play size={18} className="fill-current ml-0.5" />
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white/90">
                    0{idx + 1} · {film.tag}
                  </span>
                </div>

                {/* Caption Meta */}
                <div className="p-4 sm:p-5 space-y-1.5 bg-[#0c0c10] border-t border-white/10 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400/90 uppercase tracking-wider block mb-1">
                      {film.category}
                    </span>
                    <h3 className="font-serif text-lg font-medium text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                      {film.title}
                    </h3>
                  </div>
                  <p className="section-note text-xs text-white/70 line-clamp-2 pt-1 font-light">
                    {film.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SECTION 2: IMAGES (SAME FORMAT: 3, 3 IN A ROW) */}
      <section id="stills-catalog" className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 bg-[#070709] relative border-b border-white/10">
        <div className="container mx-auto max-w-6xl space-y-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="eyebrow mb-2">
                <span className="eyebrow-bullet" />
                <span>HIGH-RESOLUTION CATALOG</span>
              </div>
              <h2 className="section-title text-2xl sm:text-4xl lg:text-5xl">
                Editorial <em>Stills.</em>
              </h2>
            </div>
            <p className="section-note text-sm max-w-md">
              Pin-sharp macro glass, cinematic color science, and calibrated lighting workflow. Tap any photo to expand into fullscreen.
            </p>
          </div>

          {/* 3, 3 in a Row Images Grid (Same Format) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {stills.map((still, idx) => (
              <div
                key={still.id || idx}
                onClick={() => setLightboxIndex(idx)}
                className="group rounded-2xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-amber-400/60 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(251,191,36,0.15)] flex flex-col cursor-pointer"
              >
                {/* Image Container with 4:5 Aspect Ratio */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/60 flex items-center justify-center p-3">
                  <img
                    src={still.image}
                    alt={still.alt}
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Category Pill Tag */}
                  <span className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white/90">
                    {still.category}
                  </span>

                  {/* Zoom Icon Hover Overlay */}
                  <span className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/80 group-hover:bg-amber-400 group-hover:text-black text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-lg">
                    <ArrowUpRight size={16} />
                  </span>
                </div>

                {/* Caption Meta */}
                <div className="p-4 sm:p-5 space-y-1 bg-[#0c0c10] border-t border-white/10 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400/90 uppercase tracking-wider block mb-1">
                      {still.tag}
                    </span>
                    <h3 className="font-serif text-base font-medium text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                      {still.title}
                    </h3>
                  </div>
                  <p className="section-note text-xs text-white/70 line-clamp-2 pt-1 font-light">
                    {still.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECTION 3: CONTACT FORM DIRECTLY AFTER IMAGES (PORTFOLIO DESIGN STYLE) */}
      <section id="book-shoot" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 bg-[#060608] relative border-b border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left: Studio Direct Desks & Info */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="eyebrow mb-3">
                  <span className="eyebrow-bullet" />
                  <span>PROJECT INQUIRY</span>
                </div>
                <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
                  Start Your <em>Campaign.</em>
                </h2>
                <p className="section-note text-sm sm:text-base leading-relaxed">
                  Let us craft unforgettable stills and cinematic films for your brand. Reach out to our Bangalore studio directly or submit a project brief below.
                </p>
              </div>

              {/* Direct Info Desks */}
              <div className="space-y-3 pt-2">
                {/* Email */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 transition-all">
                  <a
                    href="mailto:info.viyanaproductions@gmail.com"
                    className="flex items-center gap-3 min-w-0"
                  >
                    <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-xs sm:text-sm font-mono text-white truncate">
                      info.viyanaproductions@gmail.com
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy("info.viyanaproductions@gmail.com", "email")}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer shrink-0 ml-2"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 transition-all">
                  <a
                    href="tel:+919187233615"
                    className="flex items-center gap-3 min-w-0"
                  >
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs sm:text-sm font-mono text-white truncate">
                      +91 91872 33615
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy("+919187233615", "phone")}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer shrink-0 ml-2"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>

                {/* Studio Location */}
                <a
                  href="https://www.google.com/maps?cid=13843918391266491417&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en&gl=IN&source=embed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 transition-all"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-mono uppercase tracking-wider text-white">
                        Bengaluru Studio HQ
                      </span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed font-sans">
                    4th Floor, Gopalan Workspace, Kathriguppe Main Rd, 3rd Phase, Banashankari 3rd Stage, Bengaluru 560085
                  </p>
                </a>
              </div>
            </div>

            {/* Right: High-Impact Luxury Form Card */}
            <div className="lg:col-span-7 bg-white text-neutral-900 p-6 sm:p-9 md:p-10 rounded-2xl sm:rounded-3xl border border-white shadow-[0_25px_70px_rgba(0,0,0,0.65),0_0_50px_rgba(255,255,255,0.08)] relative overflow-hidden">
              {inquirySubmitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
                    ✓
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-2xl font-serif font-bold uppercase text-neutral-900">
                      Inquiry Received
                    </h3>
                    <p className="text-sm text-neutral-600 max-w-xs mx-auto font-sans">
                      Thank you, {inquiry.name}. Our production team will contact you within 24 hours.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setInquiry({ name: "", email: "", phone: "", message: "" });
                      setInquirySubmitted(false);
                    }}
                    className="mt-3 text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-black underline cursor-pointer transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4 relative z-10">
                  <div className="space-y-1.5 border-b border-neutral-200 pb-4">
                    <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500 block font-semibold">
                      INQUIRE FOR {project.title.toUpperCase()}
                    </span>
                    <h3 className="text-2xl font-serif font-bold uppercase text-neutral-900">
                      Start Your Campaign
                    </h3>
                    <p className="text-xs text-neutral-600 font-sans">
                      Let us craft unforgettable stills and cinematic films for your brand.
                    </p>
                  </div>

                  <label className="block space-y-1.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-700">
                      Name *
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={inquiry.name}
                      onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                      required
                      className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white focus:outline-none transition-all font-sans"
                      placeholder="Your full name"
                    />
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="block space-y-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-700">
                        Email Address *
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={inquiry.email}
                        onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })}
                        required
                        className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white focus:outline-none transition-all font-sans"
                        placeholder="name@company.com"
                      />
                    </label>

                    <label className="block space-y-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-700">
                        Phone Number *
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        value={inquiry.phone}
                        onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })}
                        required
                        className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white focus:outline-none transition-all font-sans"
                        placeholder="+91 98765 43210"
                      />
                    </label>
                  </div>

                  <label className="block space-y-1.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-700">
                      Project Details *
                    </span>
                    <textarea
                      name="message"
                      value={inquiry.message}
                      onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                      required
                      rows={4}
                      className="w-full resize-y rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white focus:outline-none transition-all font-sans"
                      placeholder={`Tell us about your ${project.title.toLowerCase()} goals, timeline, and deliverables...`}
                    />
                  </label>

                  {inquiryError && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-mono text-red-700 leading-relaxed flex items-start gap-2"
                    >
                      <span className="text-red-500 font-bold">!</span>
                      <span>{inquiryError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmittingInquiry}
                    className="w-full py-4 px-6 rounded-xl bg-neutral-900 hover:bg-black text-white font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmittingInquiry ? "PROCESSING INQUIRY..." : `SUBMIT ${project.title.toUpperCase()} INQUIRY →`}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEXT PROJECT TEASER */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-t border-white/10 overflow-hidden bg-[#09090c] group/next">
        <div className="absolute inset-0 z-0 opacity-25 group-hover/next:opacity-35 transition-opacity duration-700 pointer-events-none">
          <img
            src={nextProject.thumbnail}
            alt={nextProject.title}
            loading="lazy"
            decoding="async"
            className="object-cover w-full h-full absolute inset-0 filter brightness-75 contrast-110 scale-100 group-hover/next:scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/85 to-[#050505]" />
        </div>

        <div className="relative z-10 container mx-auto max-w-4xl text-center flex flex-col items-center">
          <div className="eyebrow mb-3">
            <span className="eyebrow-bullet" />
            <span>
              UP NEXT / {nextProject.category}
            </span>
          </div>

          <Link
            to={`/work/${nextProject.slug}`}
            className="group/title block mb-4 max-w-2xl"
          >
            <h2 className="section-title text-3xl sm:text-5xl md:text-6xl text-white group-hover/title:text-amber-300 transition-colors leading-tight">
              {nextProject.title}<em>.</em>
            </h2>
          </Link>

          <p className="section-note text-sm max-w-lg mb-8">
            {nextProject.description}
          </p>

          <Link
            to={`/work/${nextProject.slug}`}
            className="group/btn inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-amber-300 hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <span>EXPLORE {nextProject.title}</span>
            <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </section>

      {/* 6. REDUCED LUXURY FOOTER */}
      <Footer variant="light" hideCtaBanner={true} />

      {/* VIDEO THEATER MODAL */}
      <AnimatePresence>
        {selectedVideoIdx !== null && films[selectedVideoIdx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-center items-center p-4 sm:p-8"
            onClick={() => setSelectedVideoIdx(null)}
          >
            {/* Header bar */}
            <div
              className="flex items-center justify-between w-full max-w-5xl mb-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                  FILM 0{selectedVideoIdx + 1} OF 0{films.length} · {films[selectedVideoIdx].tag}
                </span>
                <h3 className="font-serif text-lg sm:text-2xl text-white font-medium line-clamp-1">
                  {films[selectedVideoIdx].title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedVideoIdx(null)}
                aria-label="Close video modal"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all cursor-pointer border border-white/20"
              >
                <X size={20} />
              </button>
            </div>

            {/* Video Frame */}
            <div
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/15"
              onClick={(e) => e.stopPropagation()}
            >
              {films[selectedVideoIdx].youtubeId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${films[selectedVideoIdx].youtubeId}?autoplay=1&playsinline=1&rel=0`}
                  title={films[selectedVideoIdx].title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <video
                  key={films[selectedVideoIdx].src}
                  src={films[selectedVideoIdx].src}
                  poster={films[selectedVideoIdx].poster}
                  autoPlay
                  controls
                  playsInline
                  className="w-full h-full object-contain bg-black"
                />
              )}
            </div>

            {/* Navigation Buttons (when multiple films) */}
            {films.length > 1 && (
              <div
                className="flex items-center gap-4 mt-4"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() =>
                    setSelectedVideoIdx((prev) =>
                      prev === 0 ? films.length - 1 : (prev ?? 1) - 1
                    )
                  }
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer border border-white/20"
                >
                  <ChevronLeft size={16} /> Previous Film
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedVideoIdx((prev) =>
                      prev === films.length - 1 ? 0 : (prev ?? 0) + 1
                    )
                  }
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer border border-white/20"
                >
                  Next Film <ChevronRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* LIGHTBOX HIGH-RESOLUTION MODAL */}
      <AnimatePresence>
        {lightboxIndex !== null && stills[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Bar */}
            <div
              className="flex items-center justify-between z-10 max-w-6xl mx-auto w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-0.5">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                  FRAME 0{lightboxIndex + 1} OF 0{stills.length} · {stills[lightboxIndex].category}
                </span>
                <h3 className="text-base sm:text-xl font-serif text-white font-medium line-clamp-1">
                  {stills[lightboxIndex].title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close image modal"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all cursor-pointer border border-white/20"
              >
                <X size={20} />
              </button>
            </div>

            {/* Central Media Container with Prev/Next */}
            <div
              className="relative flex-1 flex items-center justify-center my-4 max-w-6xl mx-auto w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((prev) => (prev === 0 ? stills.length - 1 : (prev ?? 1) - 1))
                }
                aria-label="Previous image"
                className="absolute left-2 sm:left-4 z-20 w-12 h-12 rounded-full bg-black/80 hover:bg-white hover:text-black text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-2xl"
              >
                <ChevronLeft size={24} />
              </button>

              <img
                src={stills[lightboxIndex].image}
                alt={stills[lightboxIndex].alt}
                className="max-h-[72vh] sm:max-h-[78vh] max-w-full object-contain rounded-xl shadow-2xl select-none"
              />

              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((prev) => (prev === stills.length - 1 ? 0 : (prev ?? 0) + 1))
                }
                aria-label="Next image"
                className="absolute right-2 sm:right-4 z-20 w-12 h-12 rounded-full bg-black/80 hover:bg-white hover:text-black text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-2xl"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom Caption */}
            <div
              className="max-w-3xl mx-auto w-full text-center space-y-1.5 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-xs sm:text-sm text-white/70 font-light font-sans">
                {stills[lightboxIndex].description}
              </p>
              <span className="text-[10px] font-mono text-white/40 block">
                Use Left &amp; Right arrows to navigate • Press Esc to close
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
