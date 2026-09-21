export type ProjectCategory =
  | "COMMERCIAL ADS"
  | "CINEMATIC CONTENT SHOOT"
  | "ADVERTISEMENT"
  | "MODELS PORTFOLIO SHOOTS"
  | "VERTICAL SERIES"
  | "WEB SERIES"
  | "SHORT FILMS"
  | "FILM PRODUCTION"
  | "GRAPHIC DESIGN";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  client: string;
  director?: string;
  thumbnail: string;
  video?: string;
  videoDuration?: string;
  deliverableType: string;
  description: string;
  gallery: string[];
  scope?: string[];
  impact?: string;
}

export const projects: Project[] = [
  {
    slug: "the-next-move",
    title: "THE NEXT MOVE",
    category: "COMMERCIAL ADS",
    year: "2026",
    client: "Kinetic Dynamics",
    director: "Elena Rostova",
    deliverableType: "High-Impact Commercial Film & National Ad Rollout",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop",
    description: "A full-scale commercial advertising campaign combining cinematic film, dynamic camera choreography, and high-impact visual narrative engineered for TV broadcast and global digital rollout.",
    scope: ["National TV Commercial", "Cinema Camera Package", "High-Speed Bolt Rig", "DaVinci Color Pipeline", "Dolby Atmos Audio Mix"],
    impact: "+240% Lift in Brand Recall across broadcast and digital channels",
    gallery: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop"
    ]
  },
  {
    slug: "silent-echo",
    title: "SILENT ECHO",
    category: "CINEMATIC CONTENT SHOOT",
    year: "2025",
    client: "Atelier Mode & Luxury Group",
    director: "Marcus Chen",
    deliverableType: "Luxury Cinematic Content Shoot & Visual Storytelling",
    thumbnail: "/images/cinematic-content-shoot.jpg",
    description: "An atmospheric cinematic content shoot incorporating poetic cinematography and immersive sound design. A masterclass in lighting, visual texture, and high-end visual luxury crafted for discerning audiences.",
    scope: ["Cinematic Content Direction", "Anamorphic Primes Package", "Master Lighting Architecture", "ACES 16-bit Master Grade"],
    impact: "Premiered at International Fashion Film Awards & Global Showcases",
    gallery: [
      "/images/cinematic-content-shoot.jpg"
    ]
  },
  {
    slug: "lumina-prime",
    title: "LUMINA PRIME",
    category: "ADVERTISEMENT",
    year: "2026",
    client: "Vanguard Mobility & Tech",
    director: "Elena Rostova",
    deliverableType: "High-Conversion Multi-Platform Advertisement Campaign",
    thumbnail: "/images/vanguard-mobility-tech.jpg",
    description: "A dynamic advertising campaign engineered for high consumer conversion across digital, social, and broadcast platforms. Combining sharp visual effects, fast camera moves, and compelling value hooks.",
    scope: ["Campaign Creative Strategy", "Dynamic Product & Automotive Rigging", "Motion Control CineBot", "Multi-Aspect Deliverables (16:9, 9:16, 1:1)"],
    impact: "+310% Engagement and record click-through across national digital launches",
    gallery: [
      "/images/vanguard-mobility-tech.jpg"
    ]
  },
  {
    slug: "vogue-silhouette",
    title: "VOGUE SILHOUETTE",
    category: "MODELS PORTFOLIO SHOOTS",
    year: "2026",
    client: "Elite Model Management & Haute Atelier",
    director: "David Okafor",
    deliverableType: "High-Fashion Editorial Lookbook & Model Portfolio Sessions",
    thumbnail: "/images/models-portfolio-shoots.jpg",
    description: "A premier editorial model portfolio production. Sculpted studio lighting, haute couture styling, and high-fashion portraiture engineered for international modeling agencies, comp cards, and luxury magazine covers.",
    scope: ["High-Fashion Editorial Direction", "Model Portfolio & Comp Card Suite", "Sculpted Strobe & Continuous Key Lighting", "High-End Skin Retouching & Color Grading"],
    impact: "Featured across leading fashion editorials & agency sign-ups worldwide",
    gallery: [
      "/images/models-portfolio-shoots.jpg"
    ]
  },
  {
    slug: "neon-horizons",
    title: "NEON HORIZONS",
    category: "VERTICAL SERIES",
    year: "2026",
    client: "CyberTech Media",
    director: "Viyana Digital Lab",
    deliverableType: "9:16 Mobile-First Episodic Sci-Fi Series",
    thumbnail: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2071&auto=format&fit=crop",
    description: "A groundbreaking vertical narrative series crafted natively for mobile screens (9:16), combining rapid cyber-thriller pacing, cinematic color timing, and immersive vertical framing.",
    scope: ["Vertical Direction (9:16)", "Movie Set Rigging", "Cyber Motion VFX", "Spatial Audio Mastering"],
    impact: "Over 12M views across vertical streaming and social channels",
    gallery: [
      "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2071&auto=format&fit=crop"
    ]
  },
  {
    slug: "hyper-dimension",
    title: "HYPER-DIMENSION",
    category: "WEB SERIES",
    year: "2026",
    client: "StreamWave Originals",
    director: "Elena Rostova & David Okafor",
    deliverableType: "4K Digital OTT Drama Mini-Series",
    thumbnail: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2070&auto=format&fit=crop",
    description: "A 6-part episodic web series exploring quantum anomalies and technological frontiers. Built with cinema-grade virtual production and gripping narrative character arcs.",
    scope: ["Showrunning & Writing", "Virtual Production LED Stage", "ARRI Alexa 35", "4K HDR Dolby Vision"],
    impact: "Nominated for Best Digital Web Series at Asia Web Awards 2026",
    gallery: [
      "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2070&auto=format&fit=crop"
    ]
  },
  {
    slug: "made-to-be-seen",
    title: "MADE TO BE SEEN",
    category: "SHORT FILMS",
    year: "2026",
    client: "Lumière Film Pavilion",
    director: "David Okafor",
    deliverableType: "Festival Award-Winning Narrative Short Film",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop",
    description: "An evocative narrative short exploring personal heritage and modern urban isolation through high-contrast 35mm optical cinematography and poetic pacing.",
    scope: ["Original Screenplay", "35mm Camera Rig", "Auteur Direction", "International Festival Packaging"],
    impact: "Official Selection at 5 International Short Film Festivals",
    gallery: [
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop"
    ]
  },
  {
    slug: "beyond-the-horizon",
    title: "BEYOND THE HORIZON",
    category: "FILM PRODUCTION",
    year: "2026",
    client: "Aero Athletics & Global Cinema",
    director: "Marcus Chen",
    deliverableType: "Theatrical Feature Film Co-Production",
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop",
    description: "An ambitious feature film co-production chronicling human resilience against brutalist, sweeping landscapes. Shot on 65mm format with large-scale practical sets and orchestral score.",
    scope: ["Feature Film Co-Production", "Large Camera Cranes & Heavy Rigging", "Principal 65mm Cinematography", "Theatrical 7.1 Mix"],
    impact: "Theatrical release slated across 14 territories in Late 2026",
    gallery: [
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop"
    ]
  },
  {
    slug: "genesis",
    title: "GENESIS AESTHETICS",
    category: "GRAPHIC DESIGN",
    year: "2026",
    client: "Soundscape Records & Arts",
    director: "Viyana Graphic Atelier",
    deliverableType: "Visual Identity, Key Visuals & Packaging Suite",
    thumbnail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop",
    description: "Complete graphic design suite, typography systems, key visuals, album art direction, and digital campaign assets engineered for cultural impact.",
    scope: ["Visual Brand Identity", "Motion Design Studio", "Typography Systems", "Color Grading & Key Visuals"],
    impact: "Featured across leading international design publications worldwide",
    gallery: [
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop"
    ]
  }
];

export const projectsArchive: Project[] = [
  {
    slug: "velocity",
    title: "VELOCITY AD CAMPAIGN",
    category: "COMMERCIAL ADS",
    year: "2026",
    client: "Apex Performance",
    director: "David Okafor",
    deliverableType: "Multi-Platform Commercial & Social Ad Rollout",
    thumbnail: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop",
    video: "/showreel-video-4k-h264.mp4",
    videoDuration: "1:05",
    description: "A multi-platform advertising campaign combining cinematic commercial ads, interactive digital ad units, and targeted social media conversion assets.",
    scope: ["Ad Campaign", "Paid Media Creatives", "Social Storyboards", "Conversion Assets"],
    impact: "+180% Return on Ad Spend (ROAS) across paid channels",
    gallery: [
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop"
    ]
  }
];
