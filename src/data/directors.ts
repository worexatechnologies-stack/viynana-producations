export interface Director {
  id: string;
  name: string;
  category: "commercial" | "narrative" | "documentary" | "fashion";
  specialization: string;
  image: string;
  location: string;
  quote: string;
  bio: string;
  clients: string[];
  styleTags: string[];
  awards: string[];
  representation: string;
  reelSrc: string;
  filmFormat: string;
  cameraPackage: string;
  lensChoice: string;
  colorPipeline: string;
  lightingPhilosophy: string;
  sampleCampaigns: { title: string; client: string; year: string }[];
}

export const directors: Director[] = [
  {
    id: "preethish",
    name: "Preethish",
    category: "narrative",
    specialization: "Narrative Cinema, Visual Storytelling & Feature Direction",
    image: "/images/preethish.jpg",
    location: "Bengaluru, India",
    quote: "Cinema is the art of capturing raw human emotion and giving soul to the silent spaces between frames.",
    bio: "Preethish is an acclaimed film director and visual storyteller based in Bengaluru. Renowned for his evocative visual pacing, dynamic camera movement, and profound narrative depth, he specializes in feature narrative cinema, dramatic storytelling, and high-impact visual productions that resonate deeply with modern audiences.",
    clients: ["Viyana Feature Studio", "Cinema Narrative Labs", "Original Drama Productions", "National Creative Houses"],
    styleTags: ["Narrative Cinema", "Gimbal Motion Choreography", "Atmospheric Realism", "Anamorphic Visuals"],
    awards: ["Best Narrative Director 2026", "Cinema Excellence Award", "Bengaluru Film Guild Honors"],
    representation: "Viyana Global Directing Desk",
    reelSrc: "/showreel-video-4k-h264.mp4",
    filmFormat: "CINEMA 4K OPEN GATE // FULL FRAME",
    cameraPackage: "Large-Format Cinema Package + Precision 3-Axis Gimbal System",
    lensChoice: "Cinema Anamorphic & Ultra-Fast Primes T1.5",
    colorPipeline: "DaVinci Resolve Studio ACEScc Cinema Master Workflow",
    lightingPhilosophy: "Naturalistic atmospheric lighting with sculpted chiaroscuro contrast",
    sampleCampaigns: [
      { title: "Chronicles of the City", client: "Viyana Feature Studio", year: "2026" },
      { title: "Whispers in the Mist", client: "Narrative Cinema Labs", year: "2025" },
      { title: "The Silent Canvas", client: "Original Drama Series", year: "2025" }
    ]
  }
];

