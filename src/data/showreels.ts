export interface Showreel {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  src: string;
  fallbackSrc?: string;
  poster?: string;
  specs: string;
  aspectRatio: "16:9" | "9:16";
  duration?: string;
  description: string;
  tags: string[];
}

export const showreels: Showreel[] = [
  {
    id: "signature-4k-showreel",
    number: "01",
    title: "Viyana Signature 4K Cinema Reel",
    subtitle: "Commercial & Cinema Master Cut",
    category: "4K CINEMA MASTER",
    src: "/showreel-4k-web.mp4",
    fallbackSrc: "/showreel-1080p-fast.mp4",
    poster: "/images/website-video-2-poster.jpg",
    specs: "4K UHD • 60FPS • MASTER AUDIO • ACES COLOR GRADED",
    aspectRatio: "16:9",
    duration: "4K MASTER CUT",
    description: "Our premier commercial cinema showcase highlighting multi-category campaigns and large-format direction.",
    tags: ["Commercial Direction", "4K Cinema", "Brand Narrative"],
  },
  {
    id: "master-production-film",
    number: "02",
    title: "Viyana Master Production Film",
    subtitle: "Flagship Directorial Reel",
    category: "DIRECTORIAL MASTER",
    src: "/viyana-production-final-video.mp4",
    fallbackSrc: "/viyana%20production%20final%20video.mp4",
    poster: "/images/website-video-2-poster.jpg",
    specs: "4K DCI • MASTER AUDIO • ACES COLOR GRADED",
    aspectRatio: "9:16",
    duration: "DIRECTOR'S CUT",
    description: "Comprehensive production reel featuring dynamic visual pacing and premium execution.",
    tags: ["Commercial Direction", "Cinematic Lighting"],
  },
  {
    id: "ganesha-devotional-film",
    number: "03",
    title: "Viyana Ganesha Devotional Film",
    subtitle: "Cultural Visual Symphony",
    category: "DEVOTIONAL CINEMA",
    src: "/viyana-ganesha.mp4",
    fallbackSrc: "/viyana%20ganesha.mp4",
    poster: "/images/website-video-2-poster.jpg",
    specs: "4K ULTRA HD • HIGH-CONTRAST CHOREOGRAPHY • ATMOS MIX",
    aspectRatio: "9:16",
    duration: "CULTURAL SPECIAL",
    description: "Grand devotional cinematic piece uniting spiritual devotion and dramatic illumination.",
    tags: ["Cultural Heritage", "Dramatic Illumination"],
  },
  {
    id: "commercial-fashion-reel",
    number: "04",
    title: "Viyana Commercial & Style Reel",
    subtitle: "High-Speed Dynamic Visuals",
    category: "COMMERCIAL SPOT",
    src: "/viyana-commercial-reel.mp4",
    fallbackSrc: "/2.mp4",
    poster: "/images/website-video-2-poster.jpg",
    specs: "4K RAW • 60FPS SLOW-MO • DCI-P3 WIDE COLOR",
    aspectRatio: "9:16",
    duration: "COMMERCIAL EDIT",
    description: "Fast-paced commercial spot focused on brand aesthetics and sharp choreography.",
    tags: ["Fashion & Style", "Brand Identity"],
  },
];
