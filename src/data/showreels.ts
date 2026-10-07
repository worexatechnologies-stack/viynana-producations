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
    id: "classic-master-showreel",
    number: "01",
    title: "Viyana Cinematic Visual Reel",
    subtitle: "High-Impact Commercial Films, TVCs & Cinematic Visuals",
    category: "SIGNATURE SHOWREEL",
    src: "/showreel-master.mp4",
    poster: "/images/website-video-2-poster.jpg",
    specs: "4K DCI 60FPS • DOLBY VISION • ACES COLOR",
    duration: "CINEMATIC CUT",
    description:
      "Our signature visual showreel featuring high-impact commercial campaigns, corporate brand films, large-format cinematography, and color grading craft.",
    tags: ["Commercial Films", "TVCs & Ads", "Dolby Vision", "Large Format"],
  },
];
