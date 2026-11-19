import React, { useState, useEffect, useRef } from "react";
import { useParams, Navigate } from "react-router-dom";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { projects, Project } from "@/data/projects";

export interface CinemaFilmItem {
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

export function getProjectCinemaFilms(project: Project): CinemaFilmItem[] {
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

  // Generic / Default for other categories
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
      id: `${project.slug}-vid-1`,
      title: `${project.title} — Production Master`,
      tag: project.deliverableType || "Commercial Film",
      category: project.category,
      src: project.video,
      poster: defaultPoster,
      badge: "01 / Master",
      description: project.description,
    });
  } else if (project.youtubeVideoId) {
    films.push({
      id: `${project.slug}-yt-1`,
      title: `${project.title} — 4K Showreel`,
      tag: "4K Showreel",
      category: project.category,
      youtubeId: project.youtubeVideoId,
      poster: `https://img.youtube.com/vi/${project.youtubeVideoId}/hqdefault.jpg`,
      badge: "01 / YouTube",
      description: project.description,
    });
  } else {
    films.push(
      {
        id: `${project.slug}-reel-1`,
        title: `${project.title} — Theatrical Master`,
        tag: project.deliverableType || "Studio Master",
        category: project.category,
        src: "/showreel-hero-4k.mp4",
        poster: defaultPoster,
        badge: "01 / Master",
        description: project.description,
      },
      {
        id: `${project.slug}-reel-2`,
        title: `${project.title} — Behind The Scenes`,
        tag: "Production Process",
        category: project.category,
        src: "/website-video-2.mp4",
        poster: project.gallery[1] || defaultPoster,
        badge: "02 / Process",
        description: project.description,
      }
    );
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
        title: "Dermera Melanex Face & Body Serum",
        category: "Skincare",
        tag: "Serum · 100 ml",
        image: "/images/product-shoot/01-melanex-serum.jpg",
        alt: "Dermera Melanex face and body serum bottle",
        description:
          "Clean studio strobe highlighting pure white glass bottle, precision pump, and minimalist luxury typography.",
      },
      {
        id: "07",
        title: "Genex Advanced PDRN+ Revitalizing Serum",
        category: "Skincare",
        tag: "Serum · 30 ml",
        image: "/images/product-shoot/06-genex-serum.jpg",
        alt: "Dermera Genex Advanced PDRN+ Revitalizing face serum bottle",
        description:
          "Frosted matte finish with delicate pastel amber gradient, showcasing precision dispenser typography.",
      },
      {
        id: "08",
        title: "Luminex Luminous Face Wash & Packaging",
        category: "Skincare",
        tag: "Cleanser · 100 ml",
        image: "/images/product-shoot/02-luminex-face-wash.jpg",
        alt: "Dermera Luminex luminous face wash tube and packaging box",
        description:
          "High-contrast studio lighting capturing the rich metallic gold foil and deep charcoal black luxury carton.",
      },
      {
        id: "09",
        title: "Dewexa Dermal Bio Cloud Cream",
        category: "Skincare",
        tag: "Moisturizer · 50 g",
        image: "/images/product-shoot/03-dewexa-cloud-cream.jpg",
        alt: "Dermera Dewexa Dermal Bio Cloud Cream jar and crimson box",
        description:
          "Polished gold metallic lid paired with crimson red textured box, angled with razor-sharp reflection.",
      },
      {
        id: "10",
        title: "Spiculex Advanced Bio Micro Needle Serum",
        category: "Skincare",
        tag: "Micro Needle Serum · 30 ml",
        image: "/images/product-shoot/04-spiculex-serum.jpg",
        alt: "Dermera Spiculex Advanced Bio micro needle serum bottle and box",
        description:
          "Amber glass bottle paired with artisanal textured box, highlighting micro-needle bio formulation details.",
      },
      {
        id: "11",
        title: "Dewexa Bio Cloud Cream — Angle View",
        category: "Skincare",
        tag: "Packaging & Perspective Study · 50 g",
        image: "/images/product-shoot/05-dewexa-detail.jpg",
        alt: "Dermera Dewexa Bio Cloud Cream studio perspective view",
        description:
          "Perspective 3D angle composition showcasing gold metallic reflection, box typography, and glass jar depth.",
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

function CleanVideoCard({ film }: { film: CinemaFilmItem }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="w-full rounded-2xl border border-[#e7e6e2] bg-white overflow-hidden transition-all duration-300 hover:border-[#0284c7]/50 relative aspect-[16/10] min-h-[220px] sm:min-h-[270px] md:min-h-[300px] cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      {film.youtubeId ? (
        <iframe
          src={`https://www.youtube.com/embed/${film.youtubeId}?autoplay=0&rel=0`}
          title={film.title}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div onClick={togglePlay} className="w-full h-full relative group">
          <video
            ref={videoRef}
            src={film.src}
            poster={film.poster}
            preload="metadata"
            playsInline
            loop
            muted={isMuted}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full h-full object-cover"
          />

          {/* Center Play / Pause Indicator */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
              isPlaying ? "opacity-0 group-hover:opacity-100 bg-black/20" : "opacity-100 bg-black/30"
            }`}
          >
            <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-[#20201e] shadow-xl transition-transform group-hover:scale-105">
              {isPlaying ? (
                <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-current text-[#20201e]" />
              ) : (
                <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current text-[#20201e] ml-0.5 sm:ml-1" />
              )}
            </div>
          </div>

          {/* In-Video Action Pills */}
          <div className="absolute bottom-3 right-3 sm:bottom-3.5 sm:right-3.5 z-10 flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white text-[#20201e] backdrop-blur-md flex items-center justify-center text-xs transition-transform active:scale-90 shadow-sm"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <button
              type="button"
              onClick={handleFullscreen}
              aria-label="Fullscreen video"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white text-[#20201e] backdrop-blur-md flex items-center justify-center text-xs transition-transform active:scale-90 shadow-sm"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function UniversalWorkCinemaPage({
  project,
  onInquirySubmit,
  inquiry,
  setInquiry,
  isSubmittingInquiry,
  inquirySubmitted,
  inquiryError,
  setInquirySubmitted,
}: {
  project: Project;
  nextProject?: Project;
  categoryIndex?: number;
  onInquirySubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  inquiry: { name: string; email: string; phone: string; message: string };
  setInquiry: React.Dispatch<
    React.SetStateAction<{ name: string; email: string; phone: string; message: string }>
  >;
  isSubmittingInquiry: boolean;
  inquirySubmitted: boolean;
  inquiryError: string | null;
  setInquirySubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const films = getProjectCinemaFilms(project);
  const stills = getProjectCinemaStills(project);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev === 0 ? stills.length - 1 : (prev ?? 1) - 1));
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev === stills.length - 1 ? 0 : (prev ?? 0) + 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, stills.length]);

  return (
    <main className="bg-[#fbfaf8] text-[#20201e] min-h-screen selection:bg-[#111827] selection:text-white overflow-x-hidden font-portfolio-sans pb-24 md:pb-0">
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

      {/* 1. HERO SECTION: TITLE AND CONTENT ONLY */}
      <section className="pt-24 sm:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#e7e6e2]">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-portfolio-serif font-normal tracking-tight text-[#20201e] leading-[1.1] sm:leading-[1.08] max-w-4xl">
            {project.title}
            <span className="text-[#0284c7]">.</span>
          </h1>
          <p className="mt-3 sm:mt-5 text-sm sm:text-base md:text-lg font-portfolio-sans font-normal text-[#686762] leading-relaxed max-w-3xl">
            {project.fullDescription || project.description}
          </p>
        </div>
      </section>

      {/* 2. SECTION 1: VIDEOS SECTION (3, 3 A ROW GRID WITHOUT ATTACHED CONTENT) */}
      {films.length > 0 && (
        <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#fbfaf8] border-b border-[#e7e6e2]">
          <div className="container mx-auto max-w-[1440px]">
            {/* Videos Section Header */}
            <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0284c7]">
                  Commercial Films &amp; Motion
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-portfolio-serif font-normal text-[#20201e] mt-1">
                  Videos<span className="text-[#0284c7]">.</span>
                </h2>
              </div>
              <span className="text-xs font-portfolio-sans text-[#8e8d88] tracking-wider uppercase font-semibold">
                {films.length} Films
              </span>
            </div>

            {/* 3, 3 A Row Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
              {films.map((film, idx) => (
                <CleanVideoCard key={film.id || idx} film={film} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. SECTION 2: IMAGES SECTION (ALL STILLS GALLERY WITHOUT FILTER TABS) */}
      {stills.length > 0 && (
        <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#e7e6e2]">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8 border-b border-[#e7e6e2] pb-4 sm:pb-5">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0284c7]">
                  Production Stills
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-portfolio-serif font-normal text-[#20201e] mt-1">
                  Images &amp; Photography<span className="text-[#0284c7]">.</span>
                </h2>
              </div>
              <span className="text-xs font-portfolio-sans text-[#8e8d88] tracking-wider uppercase font-semibold">
                {stills.length} Images
              </span>
            </div>

            {/* Responsive Grid of All Images: 2 cols on mobile, 3 on tablet, 4 on desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {stills.map((still, idx) => (
                <div
                  key={still.id || idx}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-[#f0eee9] border border-[#e7e6e2] cursor-pointer"
                >
                  <img
                    src={still.image}
                    alt={still.alt || still.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2.5 sm:p-4 flex flex-col justify-end">
                    <span className="text-[10px] sm:text-[11px] font-semibold text-white/90 uppercase tracking-wider line-clamp-1 font-portfolio-sans">
                      {still.tag || still.title}
                    </span>
                    <p className="text-[11px] sm:text-xs text-white/80 line-clamp-1 mt-0.5 font-portfolio-sans hidden sm:block">
                      {still.title}
                    </p>
                  </div>
                  <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/90 text-[#20201e] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 size={12} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. SECTION 3: CONTACT / INQUIRY SECTION */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#fbfaf8]">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-6 sm:mb-8">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0284c7]">
              Start A Project
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-portfolio-serif font-normal text-[#20201e] mt-1.5">
              Book {project.title}<span className="text-[#0284c7]">.</span>
            </h2>
            <p className="font-portfolio-sans text-xs sm:text-sm text-[#686762] mt-2 max-w-md mx-auto">
              Tell us about your brand vision, deliverables, and timeline. Our production team responds within 24 hours.
            </p>
          </div>

          <div className="bg-white border border-[#e7e6e2] rounded-2xl p-4 sm:p-6 md:p-8">
            {inquirySubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="font-portfolio-serif text-xl font-normal text-[#20201e]">
                  Inquiry Received
                </h3>
                <p className="text-sm font-portfolio-sans text-[#686762] max-w-md mx-auto">
                  Thank you! Our team has received your project request and will be in touch shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setInquirySubmitted(false)}
                  className="mt-3 px-5 py-2 rounded-full bg-[#111827] text-white text-xs font-portfolio-sans uppercase tracking-wider font-semibold hover:bg-[#0284c7] transition-all cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={onInquirySubmit} className="space-y-3.5 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-portfolio-sans font-medium text-[#20201e]">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={inquiry.name}
                      onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                      required
                      placeholder="Your full name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#e7e6e2] bg-[#fbfaf8] text-base sm:text-sm text-[#20201e] placeholder:text-[#8e8d88] focus:border-[#0284c7] focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-portfolio-sans font-medium text-[#20201e]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={inquiry.email}
                      onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })}
                      required
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#e7e6e2] bg-[#fbfaf8] text-base sm:text-sm text-[#20201e] placeholder:text-[#8e8d88] focus:border-[#0284c7] focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-portfolio-sans font-medium text-[#20201e]">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={inquiry.phone}
                    onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })}
                    required
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e7e6e2] bg-[#fbfaf8] text-base sm:text-sm text-[#20201e] placeholder:text-[#8e8d88] focus:border-[#0284c7] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-portfolio-sans font-medium text-[#20201e]">
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    value={inquiry.message}
                    onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                    required
                    rows={4}
                    placeholder="Tell us about your requirements, deliverables, and timeline..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e7e6e2] bg-[#fbfaf8] text-base sm:text-sm text-[#20201e] placeholder:text-[#8e8d88] focus:border-[#0284c7] focus:bg-white focus:outline-none transition-colors resize-y"
                  />
                </div>

                {inquiryError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                    {inquiryError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmittingInquiry}
                  className="w-full py-3.5 sm:py-4 rounded-xl bg-[#111827] hover:bg-[#0284c7] text-white text-xs sm:text-sm font-portfolio-sans uppercase tracking-widest font-bold transition-all disabled:opacity-60 cursor-pointer active:scale-[0.99]"
                >
                  {isSubmittingInquiry ? "SENDING INQUIRY..." : `SUBMIT ${project.title.toUpperCase()} INQUIRY →`}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightboxIndex !== null && stills[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close image lightbox"
            className="absolute top-3 right-3 sm:top-6 sm:right-6 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-50"
          >
            <X size={18} />
          </button>

          {stills.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev === 0 ? stills.length - 1 : (prev ?? 1) - 1));
                }}
                aria-label="Previous image"
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-50"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev === stills.length - 1 ? 0 : (prev ?? 0) + 1));
                }}
                aria-label="Next image"
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-50"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          <div
            className="max-w-5xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={stills[lightboxIndex].image}
              alt={stills[lightboxIndex].alt || stills[lightboxIndex].title}
              className="max-h-[75vh] max-w-full object-contain rounded-lg"
            />
            <div className="mt-3 sm:mt-4 text-center text-white px-4">
              <p className="text-sm sm:text-base font-portfolio-sans font-medium">
                {stills[lightboxIndex].title}
              </p>
              {stills[lightboxIndex].description && (
                <p className="text-xs text-white/70 mt-1 max-w-xl mx-auto font-portfolio-sans">
                  {stills[lightboxIndex].description}
                </p>
              )}
              <span className="text-[11px] text-white/50 mt-1 block font-portfolio-sans">
                {lightboxIndex + 1} of {stills.length}
              </span>
            </div>
          </div>
        </div>
      )}

      <Footer variant="light" hideCtaBanner={true} />
    </main>
  );
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

  // Inquiry form states
  const [inquiry, setInquiry] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryError, setInquiryError] = useState<string | null>(null);

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

  return (
    <UniversalWorkCinemaPage
      project={project}
      nextProject={nextProject}
      categoryIndex={currentIdx + 1}
      onInquirySubmit={handleInquirySubmit}
      inquiry={inquiry}
      setInquiry={setInquiry}
      isSubmittingInquiry={isSubmittingInquiry}
      inquirySubmitted={inquirySubmitted}
      inquiryError={inquiryError}
      setInquirySubmitted={setInquirySubmitted}
    />
  );
}
