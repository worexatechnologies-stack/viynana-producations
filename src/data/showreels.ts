export interface Showreel {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  src: string;
  poster?: string;
  specs: string;
  aspectRatio?: string;
  duration?: string;
  description: string;
  tags: string[];
}

export const showreels: Showreel[] = [
  {
    id: "master-production-film",
    number: "01",
    title: "Viyana Master Production Film",
    subtitle: "Flagship Directorial Reel • Commercial & Cinema Showcase",
    category: "MASTER CUT 2026",
    src: "/viyana%20production%20final%20video.mp4",
    poster: "/images/website-video-2-poster.jpg",
    specs: "4K DCI • MASTER AUDIO • ACES COLOR GRADED",
    duration: "DIRECTOR'S CUT",
    description:
      "Our premier comprehensive production reel featuring high-impact commercial campaigns, brand narratives, dynamic visual pacing, and premium cinematic execution.",
    tags: ["Commercial Direction", "Cinematic Lighting", "Brand Narrative", "Color Grading"],
  },
  {
    id: "ganesha-devotional-film",
    number: "02",
    title: "Viyana Ganesha Devotional Film",
    subtitle: "Cultural Visual Symphony • Grand Narrative Cinema",
    category: "DEVOTIONAL & CULTURAL CINEMA",
    src: "/viyana%20ganesha.mp4",
    specs: "4K ULTRA HD • HIGH-CONTRAST CHOREOGRAPHY • ATMOS MIX",
    duration: "CULTURAL SPECIAL",
    description:
      "A grand devotional cinematic piece uniting spiritual devotion, heritage rhythm, and dramatic illumination with high-production aesthetic excellence.",
    tags: ["Cultural Heritage", "Dramatic Illumination", "Devotional Rhythm", "5.1 Sound Design"],
  },
  {
    id: "commercial-fashion-reel",
    number: "03",
    title: "Viyana Commercial & Style Reel",
    subtitle: "High-Speed Dynamic Visuals • Contemporary Brand Identity",
    category: "COMMERCIAL & FASHION SPOT",
    src: "/2.mp4",
    specs: "4K RAW • 60FPS SLOW-MO • DCI-P3 WIDE COLOR",
    duration: "COMMERCIAL EDIT",
    description:
      "Fast-paced, vibrant commercial spot focused on contemporary brand aesthetics, sharp choreography, bold fashion staging, and modern digital momentum.",
    tags: ["Fashion & Style", "Dynamic Pacing", "High-Speed Cinema", "Brand Identity"],
  },
  {
    id: "classic-master-showreel",
    number: "04",
    title: "Viyana Cinematic Visual Reel",
    subtitle: "High-Impact Commercial Films, TVCs & Cinematic Visuals",
    category: "SIGNATURE SHOWREEL",
    src: "/website-video-2.mp4",
    poster: "/images/website-video-2-poster.jpg",
    specs: "4K DCI 60FPS • DOLBY VISION • ACES COLOR",
    duration: "CINEMATIC CUT",
    description:
      "Our signature visual showreel featuring high-impact commercial campaigns, corporate brand films, large-format cinematography, and color grading craft.",
    tags: ["Commercial Films", "TVCs & Ads", "Dolby Vision", "Large Format"],
  },
];
