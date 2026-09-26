export type ProjectCategory =
  | "COMMERCIAL ADS"
  | "CINEMATIC CONTENT SHOOT"
  | "ADVERTISEMENT"
  | "MODELS PORTFOLIO SHOOTS"
  | "VERTICAL SERIES"
  | "WEB SERIES"
  | "SHORT FILMS"
  | "FILM PRODUCTION"
  | "GRAPHIC DESIGN"
  | "PRODUCT SHOOT"
  | "INFLUENCER SHOOT";

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
  fullDescription?: string;
  creativeApproach?: string;
  highlights?: { title: string; subtitle: string }[];
  keyFeatures?: string[];
  credits?: Record<string, string>;
  gallery: string[];
  scope?: string[];
  impact?: string;
  ctaText?: string;
  tagline?: string;
}

export const projects: Project[] = [
  {
    slug: "the-next-move",
    title: "COMMERCIAL ADS",
    category: "COMMERCIAL ADS",
    year: "2026",
    client: "Viyana Productions",
    director: "Elena Rostova",
    deliverableType: "Full-Scale Commercial Production & TVC",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop",
    description: "A full-scale commercial production crafted to bring powerful brand stories to life   combining cinematic visuals, dynamic camera movement, and high-impact storytelling for television, digital platforms, and social media. Built around a strong creative concept, every frame is designed to capture attention, communicate the brand message, and create a lasting visual impression.",
    fullDescription: "Working closely with our creative and production team, Viyana Productions brings together direction, cinematography, production design, editing, and post-production to create a distinctive visual experience.",
    scope: [
      "Commercial Films",
      "Brand Films",
      "Cinematic Camera Work",
      "Product Videos",
      "Social Media Films",
      "Post-Production & Color Grading"
    ],
    credits: {
      "STUDIO": "Viyana Productions",
      "PROJECT": "Commercial Film",
      "FORMAT": "4K Digital",
      "COLOR": "Professional Color Grading",
      "DELIVERY": "TV • Digital • Social Media"
    },
    tagline: "YOUR STORY. OUR FRAME. LET'S CREATE",
    impact: "Broadcast on National TV Networks • Multi-Platform Digital Distribution",
    gallery: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop"
    ]
  },
  {
    slug: "silent-echo",
    title: "CINEMATIC CONTENT SHOOT",
    category: "CINEMATIC CONTENT SHOOT",
    year: "2026",
    client: "Viyana Productions",
    director: "Marcus Chen",
    deliverableType: "Atmospheric Cinematic Production",
    thumbnail: "/images/cinematic-content-shoot.jpg",
    description: "An atmospheric cinematic production designed to transform ideas into visually rich stories combining expressive cinematography, carefully crafted lighting, immersive sound, and refined visual aesthetics.",
    creativeApproach: "From initial concept to final delivery, Viyana Productions brings together creative direction, cinematography, lighting, production, and post-production to create visuals that feel distinctive, polished, and memorable. Every frame is carefully crafted to establish mood, strengthen the story, and create a strong visual identity for the brand.",
    scope: [
      "Cinematic Content Direction",
      "Professional Camera Package",
      "Lighting & Visual Design",
      "4K Master Delivery",
      "Color Grading & Sound Design"
    ],
    credits: {
      "STUDIO": "Viyana Productions",
      "PROJECT": "Cinematic Content Shoot",
      "FORMAT": "4K Digital",
      "PRODUCTION": "Cinematography • Lighting • Direction",
      "POST-PRODUCTION": "Editing • Color Grading • Sound Design"
    },
    ctaText: "COMMISSION A CINEMATIC CONTENT SHOOT",
    tagline: "VINAYA PRODUCTIONS   Crafting stories. Creating visual experiences.",
    impact: "Premiered across luxury channels & festival showcases",
    gallery: [
      "/images/cinematic-content-shoot.jpg"
    ]
  },
  {
    slug: "lumina-prime",
    title: "ADVERTISEMENT",
    category: "ADVERTISEMENT",
    year: "2026",
    client: "Viyana Productions",
    director: "Elena Rostova",
    deliverableType: "High-Impact Advertising Campaign",
    thumbnail: "/images/vanguard-mobility-tech.jpg",
    description: "A high-impact advertising campaign crafted to capture attention, strengthen brand presence, and drive audience engagement across digital, social, and broadcast platforms. Combining strategic storytelling, cinematic visuals, dynamic camera movements, and compelling creative direction, the campaign was designed to turn brand messages into memorable experiences.",
    scope: [
      "Campaign Creative Strategy",
      "Advertising Film Production",
      "Dynamic Product & Automotive Visuals",
      "Motion-Control Cinematography",
      "Multi-Aspect Deliverables",
      "Post-Production & Visual Finishing"
    ],
    impact: "+310% Engagement & Click-Through Growth • High Retention Audience Attention",
    credits: {
      "Production House": "Viyana Productions",
      "Creative Direction": "Viyana Productions",
      "Production": "Viyana Productions",
      "Cinematography": "Viyana Productions",
      "Editing & Post-Production": "Viyana Productions",
      "Brand Partner": "Worexa technologies",
      "Campaign Format": "4K Digital & Broadcast"
    },
    ctaText: "LET'S CREATE",
    gallery: [
      "/images/vanguard-mobility-tech.jpg"
    ]
  },
  {
    slug: "vogue-silhouette",
    title: "MODEL PORTFOLIO SHOOTS",
    category: "MODELS PORTFOLIO SHOOTS",
    year: "2026",
    client: "Viyana Productions",
    director: "David Okafor",
    deliverableType: "Premium Editorial Model Portfolio Production",
    thumbnail: "/images/models-portfolio-shoots.jpg",
    description: "A premium editorial-model portfolio production crafted to showcase high-fashion aesthetics, refined studio lighting, and sophisticated portraiture for modeling agencies, comp cards, and luxury publications. From sculpted lighting and couture styling to detailed skin retouching and color grading, every element was designed to create a distinctive visual identity and elevate the model portfolio.",
    scope: [
      "High-Fashion Editorial Direction",
      "Model Portfolio & Comp Card Suite",
      "Sculpted Strobe & Continuous Key Lighting",
      "High-End Skin Retouching & Color Grading",
      "Luxury Editorial Portraiture",
      "Portfolio-Ready Image Production"
    ],
    impact: "Featured across fashion editorials & agency portfolios • High Retention Visual Engagement",
    credits: {
      "CLIENT": "Viyana Productions",
      "DIRECTOR": "David Okafor",
      "CAPTURE FORMAT": "4K DCI Large Format",
      "COLOR PIPELINE": "ACEScc • 16-Bit Float",
      "RELEASE YEAR": "2026"
    },
    ctaText: "LET'S CREATE",
    gallery: [
      "/images/models-portfolio-shoots.jpg"
    ]
  },
  {
    slug: "neon-horizons",
    title: "VERTICAL SERIES",
    category: "VERTICAL SERIES",
    year: "2026",
    client: "Viyana Productions",
    director: "Viyana Digital Lab",
    deliverableType: "9:16 Mobile-First Vertical Series",
    thumbnail: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2071&auto=format&fit=crop",
    description: "A new-generation storytelling format designed specifically for mobile audiences. Vertical series use a 9:16 full-screen format to deliver cinematic stories through smartphones and social platforms. The format combines fast-paced narratives, immersive visuals, cinematic colour grading, dynamic camera movements, and sound design to keep viewers engaged from scene to scene.",
    fullDescription: "Built for: Short-form entertainment, thriller narratives, branded storytelling, and digital-first original content.",
    keyFeatures: [
      "Mobile-first 9:16 storytelling",
      "Fast-paced cinematic editing",
      "Professional colour grading",
      "Vertical cinematography & framing",
      "Cyber-motion VFX & visual effects",
      "Immersive spatial audio",
      "Optimised for Reels, Shorts & vertical streaming",
      "4K production-ready visuals"
    ],
    scope: [
      "Mobile-First 9:16 Storytelling",
      "Fast-Paced Cinematic Editing",
      "Professional Colour Grading",
      "Vertical Cinematography & Framing",
      "Cyber-Motion VFX & Effects",
      "Immersive Spatial Audio",
      "Reels, Shorts & Streaming Optimization",
      "4K Production Visuals"
    ],
    credits: {
      "Production House": "Viyana Productions",
      "Creative Direction": "Viyana Productions",
      "Story & Concept": "Viyana Productions",
      "Direction": "Viyana Productions",
      "Cinematography": "Viyana Productions",
      "Editing & Post-Production": "Viyana Productions",
      "Sound Design & Mixing": "Viyana Productions",
      "Visual Effects & Finishing": "Viyana Productions",
      "Format": "9:16 Vertical • 4K",
      "Platforms": "Instagram • YouTube Shorts • Digital Platforms",
      "Production Year": "2026"
    },
    impact: "Optimized for Instagram Reels, YouTube Shorts & vertical streaming networks",
    ctaText: "LET'S CREATE",
    tagline: "VIYANA PRODUCTIONS",
    gallery: [
      "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2071&auto=format&fit=crop"
    ]
  },
  {
    slug: "hyper-dimension",
    title: "WEB SERIES",
    category: "WEB SERIES",
    year: "2026",
    client: "StreamWave Originals",
    director: "Elena Rostova & David Okafor",
    deliverableType: "4K Digital & OTT Originals",
    thumbnail: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2070&auto=format&fit=crop",
    description: "Stories built for the streaming generation. We develop and produce original web series that combine compelling narratives with cinematic production. From the first concept and screenplay to casting, production, cinematography, and final post-production, every stage is crafted to create an engaging episodic viewing experience. Our approach brings together strong storytelling, character-driven narratives, cinematic visuals, and professional sound design to create series suitable for digital platforms, OTT audiences, and independent distribution.",
    fullDescription: "Formats We Develop: Drama • Thriller • Crime • Romance • Comedy • Mystery • Action • Anthology • Youth Stories • Social Stories.",
    highlights: [
      { title: "4K Cinematic Production", subtitle: "High-resolution visuals designed for large screens and streaming platforms." },
      { title: "Episodic Storytelling", subtitle: "Each episode is structured to build narrative momentum and maintain audience engagement." },
      { title: "Cinematic Sound & Music", subtitle: "Dialogue, ambience, sound effects, and music designed to strengthen emotional experience." },
      { title: "Professional Post-Production", subtitle: "End-to-end editing, colour grading, VFX, and mastering." }
    ],
    scope: [
      "Concept & Story Development",
      "Screenplay & Episode Writing",
      "Pre-Production & Casting",
      "4K Cinematic Cinematography",
      "Performance & Narrative Direction",
      "End-to-End Production Execution",
      "Post-Production, VFX & Color Grading",
      "OTT & Digital Master Delivery"
    ],
    credits: {
      "Production House": "Viyana Productions",
      "Format": "4K Digital OTT Mini-Series",
      "Post-Production": "Editing, Colour Grading & VFX",
      "Sound Design": "Cinematic Sound & Original Score",
      "Release Year": "2026"
    },
    impact: "Full OTT & digital delivery workflows engineered for modern streaming platforms",
    gallery: [
      "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2070&auto=format&fit=crop"
    ]
  },
  {
    slug: "made-to-be-seen",
    title: "SHORT FILMS",
    category: "SHORT FILMS",
    year: "2026",
    client: "Viyana Productions",
    director: "David Okafor",
    deliverableType: "Original Cinema & Festival Short Film",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop",
    description: "Cinematic Stories with a Distinctive Creative Vision. We produce original short films that transform compelling ideas into engaging cinematic experiences. From story development and scripting to direction, cinematography, editing, and sound design, every element is crafted to support the story and connect with the audience. Our short-film productions are suitable for film festivals, digital platforms, independent releases, and creative showcases.",
    fullDescription: "Focus: Original Stories • Independent Cinema • Festival Films • Drama • Thriller • Experimental Films • Auteur Storytelling.",
    scope: [
      "Original Story & Screenplay",
      "Directorial Vision & Development",
      "Cinematography & Production Design",
      "Editing & Post-Production",
      "Sound Design & Original Music",
      "Color Grading & Visual Finishing",
      "Film Festival Circuit Packaging"
    ],
    credits: {
      "Production House": "Viyana Productions",
      "Creative Development": "Viyana Productions",
      "Story & Screenplay": "Viyana Productions",
      "Direction": "Viyana Productions",
      "Cinematography": "Viyana Productions",
      "Production Design": "Viyana Productions",
      "Editing & Post-Production": "Viyana Productions",
      "Sound Design & Music": "Viyana Productions",
      "Color Grading & Finishing": "Viyana Productions",
      "Format": "Digital • 4K • Cinema",
      "Production Type": "Short Films • Feature Films • Independent Cinema",
      "Production Year": "2026"
    },
    tagline: "CREATE STORIES. CRAFT CINEMA. VIYANA PRODUCTIONS",
    impact: "Suitable for film festivals, digital platforms, independent releases, and creative showcases",
    gallery: [
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop"
    ]
  },
  {
    slug: "beyond-the-horizon",
    title: "FEATURE FILM PRODUCTION",
    category: "FILM PRODUCTION",
    year: "2026",
    client: "Aero Athletics & Global Cinema",
    director: "Marcus Chen",
    deliverableType: "Theatrical Feature Film Production",
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop",
    description: "A cinematic feature film built around powerful storytelling, striking environments, and deeply human moments. From expansive landscapes to meticulously designed sets, every frame was crafted to create a visually immersive theatrical experience. The production brought together cinematography, production design, large-format capture, practical effects, and sound to build a distinctive visual world that supports the story from beginning to end.",
    highlights: [
      { title: "LARGE-FORMAT CINEMA", subtitle: "Designed for an immersive big-screen experience" },
      { title: "14+ TERRITORIES", subtitle: "Planned theatrical distribution across multiple markets" }
    ],
    scope: [
      "Feature Film Production",
      "Large-Format Cinematography",
      "Production Design & Set Execution",
      "Crane & Camera Rigging",
      "Location & Landscape Cinematography",
      "Cinematic Color Finishing",
      "Theatrical Sound Design"
    ],
    credits: {
      "PRODUCTION": "Viyana Productions",
      "PRODUCTION PARTNER": "Aero Athletics & Global Cinema",
      "DIRECTOR": "Marcus Chen",
      "CINEMATOGRAPHY": "65mm Large Format",
      "POST PRODUCTION": "Color • Sound • Finishing",
      "RELEASE": "2026"
    },
    ctaText: "EXPLORE THE PRODUCTION",
    impact: "Large-Format Cinema • Planned theatrical distribution across 14+ territories",
    gallery: [
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop"
    ]
  },
  {
    slug: "genesis",
    title: "GRAPHIC DESIGN & VISUAL IDENTITY",
    category: "GRAPHIC DESIGN",
    year: "2026",
    client: "Worexa",
    director: "Viyana Graphic Atelier",
    deliverableType: "Graphic Design & Visual Identity System",
    thumbnail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop",
    description: "A complete visual design system created to give brands, artists, and creative projects a distinctive presence across print and digital platforms. From brand identity and typography to campaign visuals, motion graphics, and digital assets, every element is designed with clarity, consistency, and a strong visual point of view.",
    highlights: [
      { title: "VISUAL CONSISTENCY", subtitle: "A unified design language across platforms" },
      { title: "DIGITAL-FIRST CREATIVE", subtitle: "Assets built for modern campaigns and audiences" }
    ],
    scope: [
      "Visual Brand Identity",
      "Typography & Design Systems",
      "Album Artwork & Cover Design",
      "Campaign Key Visuals",
      "Motion Graphics",
      "Social Media Creative Assets",
      "Color Direction & Visual Finishing"
    ],
    credits: {
      "Studio": "Viyana Productions",
      "Creative Direction": "Viyana Productions",
      "Brand Strategy": "Viyana Productions",
      "Visual Identity": "Viyana Productions",
      "Graphic Design": "Viyana Productions",
      "Art Direction": "Viyana Productions",
      "Typography & Layout": "Viyana Productions",
      "Digital Production": "Viyana Productions",
      "Client": "Worexa",
      "Format": "4K Digital • Large Format",
      "Production Year": "2026"
    },
    tagline: "DESIGNED TO BE SEEN. BUILT TO BE REMEMBERED. VIYANA PRODUCTIONS",
    impact: "Visual consistency & digital-first creative across all physical and digital touchpoints",
    gallery: [
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop"
    ]
  },
  {
    slug: "product-shoot",
    title: "PRODUCT SHOOT",
    category: "PRODUCT SHOOT",
    year: "2026",
    client: "Various Brands",
    director: "Viyana Creative Lab",
    deliverableType: "HD Photos and Reels",
    thumbnail: "/images/product-shoot.jpg",
    description: "We take clear and attractive photos and videos of your products. It helps your customers to like your product and buy it.",
    fullDescription: "We do: Online store photos, Lifestyle photos, Product videos. For: Dress brands, Beauty products, Food, Gadgets.",
    scope: [
      "Online store photos",
      "Lifestyle photos",
      "Product videos"
    ],
    impact: "Helps your customers to like your product and buy it",
    credits: {
      "STUDIO": "Viyana Productions",
      "DELIVERABLES": "HD Photos and Reels",
      "FOR": "Dress brands, Beauty products, Food, Gadgets"
    },
    ctaText: "BOOK A PRODUCT SHOOT",
    tagline: "CLEAR & ATTRACTIVE PHOTOS AND VIDEOS.",
    gallery: [
      "/images/product-shoot.jpg"
    ]
  },
  {
    slug: "influencer-shoot",
    title: "INFLUENCER SHOOT",
    category: "INFLUENCER SHOOT",
    year: "2026",
    client: "Influencers & Creators",
    director: "Viyana Creative Lab",
    deliverableType: "Reels, Photos and Short Videos",
    thumbnail: "https://images.unsplash.com/photo-1516575334481-bea2089ba96a?q=80&w=2070&auto=format&fit=crop",
    description: "We shoot stylish videos and photos for influencers. It helps you to get more followers and brand deals.",
    fullDescription: "We do: Instagram Reels, Model Photos, Brand Collab Shoots. For: Models, Influencers, Youtubers.",
    scope: [
      "Instagram Reels",
      "Model Photos",
      "Brand Collab Shoots"
    ],
    impact: "Helps you to get more followers and brand deals",
    credits: {
      "STUDIO": "Viyana Productions",
      "DELIVERABLES": "Reels, Photos and Short Videos",
      "FOR": "Models, Influencers, Youtubers"
    },
    ctaText: "BOOK AN INFLUENCER SHOOT",
    tagline: "STYLISH VIDEOS & PHOTOS.",
    gallery: [
      "https://images.unsplash.com/photo-1516575334481-bea2089ba96a?q=80&w=2070&auto=format&fit=crop"
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
