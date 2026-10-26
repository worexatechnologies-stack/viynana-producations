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
  | "INFLUENCER SHOOT"
  | "STUDIO RENTAL"
  | "PODCAST PRODUCTION";

export interface ProjectSEO {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogTitle?: string;
  ogType?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogSiteName?: string;
  ogImage?: string;
  twitterSite?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  author?: string;
  canonical?: string;
  indexingStatus?: string;
  publisher?: string;
  ogLocale?: string;
}

export interface Project {
  slug: string;
  aliases?: string[];
  title: string;
  category: ProjectCategory;
  year: string;
  client: string;
  director?: string;
  thumbnail: string;
  video?: string;
  youtubeVideoId?: string;
  instagramReelUrl?: string;
  instagramReels?: string[];
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
  seo?: ProjectSEO;
}

export const projects: Project[] = [
  {
    slug: "commercial-ads",
    aliases: ["the-next-move", "ad-agency"],
    title: "COMMERCIAL ADS",
    category: "COMMERCIAL ADS",
    year: "2026",
    client: "Viyana Productions",
    director: "Elena Rostova",
    deliverableType: "Full-Scale Commercial Production & TVC",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=75&w=720&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=75&w=720&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=75&w=720&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=75&w=720&auto=format&fit=crop"
    ],
    seo: {
      metaTitle: "Commercial Ads Production Services | Viyana Productions",
      metaDescription: "Promote your brand with creative commercial ads by Viyana Productions. We produce engaging video advertisements designed to capture attention and drive action.",
      metaKeywords: "commercial ads, commercial video production, tv commercial production, video production ads, commercial film production companies, video production for commercials",
      ogTitle: "Creative Commercial Ads Production for Brands and Businesses",
      ogType: "website",
      ogDescription: "Make your brand stand out with professional commercial ads, engaging visuals, and creative storytelling tailored to your marketing goals and audience.",
      ogUrl: "https://viyana.productions/work/commercial-ads",
      ogSiteName: "Viyana Productions",
      ogImage: "https://viyana.productions/logo-black.png",
      twitterSite: "https://twitter.com/",
      twitterTitle: "Commercial Ads That Make Your Brand Stand Out | Viyana Productions",
      twitterDescription: "Turn your ideas into memorable advertisements with Viyana Productions. Explore creative commercial video production designed to boost brand awareness, engagement, and promotional impact.",
      author: "Akshay",
      canonical: "https://viyana.productions/work/commercial-ads",
      indexingStatus: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      publisher: "Viyana Productions",
      ogLocale: "en_US"
    }
  },
  {
    slug: "cinematic-content-shoot",
    aliases: ["silent-echo"],
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
      "/images/cinematic-content-shoot.jpg",
      "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=75&w=720&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=75&w=720&auto=format&fit=crop"
    ],
    seo: {
      metaTitle: "Cinematic Content Shoot Services | Viyana Productions",
      metaDescription: "Book a cinematic content shoot with Viyana Productions. We create stunning visuals, compelling stories, and professional video content for your brands.",
      metaKeywords: "cinematic content, Cinematic video production services, commercial video production, promotional video production, corporate promotional video",
      ogTitle: "Cinematic Content Shoots for Powerful Brand Storytelling",
      ogType: "website",
      ogDescription: "Bring your vision to life with cinematic content shoots, creative storytelling, and stunning visuals crafted by Viyana Productions for brands and businesses.",
      ogUrl: "https://viyana.productions/work/cinematic-content-shoot",
      ogSiteName: "Viyana Productions",
      ogImage: "https://viyana.productions/logo-black.png",
      twitterSite: "https://twitter.com/",
      twitterTitle: "Cinematic Content Shoots That Bring Your Vision to Life",
      twitterDescription: "Capture your story with cinematic visuals, creative direction, and professional production. Viyana Productions delivers engaging content shoots that connect with audiences and elevate your brand.",
      author: "Akshay",
      canonical: "https://viyana.productions/work/cinematic-content-shoot",
      indexingStatus: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      publisher: "Viyana Productions",
      ogLocale: "en_US"
    }
  },
  {
    slug: "advertisement",
    aliases: ["lumina-prime", "ads-videos"],
    title: "ADVERTISEMENT",
    category: "ADVERTISEMENT",
    year: "2026",
    client: "Viyana Productions",
    director: "Elena Rostova",
    deliverableType: "High-Impact Advertising Campaign",
    thumbnail: "/images/advertisement-campaign.jpg",
    description: "A high-impact advertising campaign crafted to capture attention, strengthen brand presence, and drive audience engagement across digital, social, and broadcast platforms. Combining strategic storytelling, cinematic visuals, dynamic camera movements, and compelling creative direction, the campaign was designed to turn brand messages into memorable experiences.",
    scope: [
      "Campaign Creative Strategy",
      "Advertising Film Production",
      "Dynamic Commercial & Brand Visuals",
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
      "/images/advertisement-campaign.jpg",
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=75&w=720&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=75&w=720&auto=format&fit=crop"
    ],
    seo: {
      metaTitle: "Creative Advertising Services | Viyana Productions",
      metaDescription: "Elevate your brand with creative advertising services from Viyana Productions. We craft compelling visual campaigns that connect with your target audience.",
      metaKeywords: "advertising, advertising production, advertising video production, advertising film production, advertising campaign production, brand advertising",
      ogTitle: "Creative Advertising Solutions for Modern Brands | Viyana Productions",
      ogType: "website",
      ogDescription: "Build brand awareness through creative advertising, powerful visuals, and engaging campaigns designed to communicate your message and connect with audiences.",
      ogUrl: "https://viyana.productions/work/advertisement",
      ogSiteName: "Viyana Productions",
      ogImage: "https://viyana.productions/logo-black.png",
      twitterSite: "https://twitter.com/",
      twitterTitle: "Creative Advertising Services for Your Brand | Viyana Productions",
      twitterDescription: "Make a lasting impression with creative advertising from Viyana Productions. Discover visual storytelling and promotional content tailored to elevate your brand and connect with your audience.",
      author: "Akshay",
      canonical: "https://viyana.productions/work/advertisement",
      indexingStatus: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      publisher: "Viyana Productions",
      ogLocale: "en_US"
    }
  },
  {
    slug: "models-portfolio-shoots",
    aliases: ["model-portfolio-shoots", "models-portfolio", "vogue-silhouette"],
    title: "MODEL PORTFOLIO SHOOTS",
    category: "MODELS PORTFOLIO SHOOTS",
    year: "2026",
    client: "Viyana Productions",
    director: "David Okafor",
    deliverableType: "Premium Editorial Model Portfolio Production",
    thumbnail: "/images/models-portfolio-saree.jpg",
    instagramReelUrl: "https://www.instagram.com/reel/DdJl4OtJ1N2/?obrf=MXVjejcxNmxkeDZ2ag==",
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
      "/images/models-portfolio-saree.jpg",
      "/images/models-portfolio-shoots.jpg",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=75&w=720&auto=format&fit=crop"
    ],
    seo: {
      metaTitle: "Model Portfolio Photography Services | Viyana Productions",
      metaDescription: "Build your professional model portfolio with Viyana Productions. Get stunning photographs, creative concepts, and high-quality images to showcase your talent.",
      metaKeywords: "model portfolio, model portfolio photography, professional model portfolio shoot, model portfolio photographer, fashion portfolio photography, modelling portfolio shoot",
      ogTitle: "Professional Model Portfolio Photography for Aspiring Models | Viyana Productions",
      ogType: "website",
      ogDescription: "Showcase your personality and style with a professional model portfolio by Viyana Productions. Get creative photoshoots designed to highlight your unique look and talent.",
      ogUrl: "https://viyana.productions/work/models-portfolio-shoots",
      ogSiteName: "Viyana Productions",
      ogImage: "https://viyana.productions/logo-black.png",
      twitterSite: "https://twitter.com/",
      twitterTitle: "Professional Model Portfolio Photography | Viyana Productions",
      twitterDescription: "Ready to start your modeling journey? Viyana Productions creates professional model portfolios with creative concepts, stylish photography, and stunning visuals. Launch your career with us today!",
      author: "Akshay",
      canonical: "https://viyana.productions/work/models-portfolio-shoots",
      indexingStatus: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      publisher: "Viyana Productions",
      ogLocale: "en_US"
    }
  },
  {
    slug: "vertical-series",
    aliases: ["neon-horizons"],
    title: "VERTICAL SERIES",
    category: "VERTICAL SERIES",
    year: "2026",
    client: "Viyana Productions",
    director: "Viyana Digital Lab",
    deliverableType: "9:16 Mobile-First Vertical Series",
    thumbnail: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=75&w=720&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=75&w=720&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=75&w=720&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=75&w=720&auto=format&fit=crop"
    ],
    seo: {
      metaTitle: "Vertical Series Production Services | Viyana Productions",
      metaDescription: "Create engaging vertical series with Viyana Productions. We produce mobile-first episodic videos designed for social media audiences and digital platforms.",
      metaKeywords: "vertical series, vertical series production, vertical video production, short form series production, vertical series production company in bangalore",
      ogTitle: "Vertical Series Production Tailored for Mobile-First Audiences | Viyana Productions",
      ogType: "website",
      ogDescription: "Capture attention with engaging vertical series, compelling episodes, and mobile-first storytelling created for social media platforms and digital audiences.",
      ogUrl: "https://viyana.productions/work/vertical-series",
      ogSiteName: "Viyana Productions",
      ogImage: "https://viyana.productions/logo-black.png",
      twitterSite: "https://twitter.com/",
      twitterTitle: "Vertical Series Production for Mobile & Social | Viyana Productions",
      twitterDescription: "Tell stories in a vertical format with Viyana Productions. We create engaging, episodic content optimized for mobile viewing, social media feeds, and fast-paced digital audiences.",
      author: "Akshay",
      canonical: "https://viyana.productions/work/vertical-series",
      indexingStatus: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      publisher: "Viyana Productions",
      ogLocale: "en_US"
    }
  },
  {
    slug: "web-series",
    aliases: ["hyper-dimension"],
    title: "WEB SERIES",
    category: "WEB SERIES",
    year: "2026",
    client: "StreamWave Originals",
    director: "Elena Rostova & David Okafor",
    deliverableType: "4K Digital & OTT Originals",
    thumbnail: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=75&w=720&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=75&w=720&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?q=75&w=720&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=75&w=720&auto=format&fit=crop"
    ],
    seo: {
      metaTitle: "Web Series Production Services | Viyana Productions",
      metaDescription: "Create engaging web series with Viyana Productions. We develop compelling episodic content through creative storytelling and professional video production.",
      metaKeywords: "web series, web series production, web series production company, web series production company in bangalore",
      ogTitle: "Professional Web Series Production for Digital Platforms | Viyana Productions",
      ogType: "website",
      ogDescription: "Bring episodic stories to life with Viyana Productions. Our web series production combines creative concepts, engaging narratives, and cinematic visuals for digital audiences.",
      ogUrl: "https://viyana.productions/work/web-series",
      ogSiteName: "Viyana Productions",
      ogImage: "https://viyana.productions/logo-black.png",
      twitterSite: "https://twitter.com/",
      twitterTitle: "Web Series Production Services for Digital Audiences | Viyana Productions",
      twitterDescription: "Create memorable digital entertainment with Viyana Productions. Discover professional web series production featuring compelling stories, engaging episodes, and high-quality filmmaking for audiences.",
      author: "Akshay",
      canonical: "https://viyana.productions/work/web-series",
      indexingStatus: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      publisher: "Viyana Productions",
      ogLocale: "en_US"
    }
  },
  {
    slug: "short-films",
    aliases: ["made-to-be-seen"],
    title: "SHORT FILMS",
    category: "SHORT FILMS",
    year: "2026",
    client: "Viyana Productions",
    director: "David Okafor",
    deliverableType: "Original Cinema & Festival Short Film",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=75&w=720&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=75&w=720&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=75&w=720&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=75&w=720&auto=format&fit=crop"
    ],
    seo: {
      metaTitle: "Short Film Production Services | Viyana Productions",
      metaDescription: "Bring your story to life with Viyana Productions. We create engaging short films with cinematic visuals, creative storytelling, and professional production.",
      metaKeywords: "short film, short film production, short film production company, short film production services, cinematic short film production, short film production houses in bangalore, short film distribution",
      ogTitle: "Creative Short Film Production for Powerful Storytelling | Viyana Productions",
      ogType: "website",
      ogDescription: "Turn your ideas into memorable short films with Viyana Productions. Discover cinematic storytelling, creative direction, and professional video production services.",
      ogUrl: "https://viyana.productions/work/short-films",
      ogSiteName: "Viyana Productions",
      ogImage: "https://viyana.productions/logo-black.png",
      twitterSite: "https://twitter.com/",
      twitterTitle: "Short Film Production Services for Creative Storytelling | Viyana Productions",
      twitterDescription: "Tell compelling stories through cinema with Viyana Productions. Explore professional short film production featuring creative concepts, cinematic visuals, and storytelling.",
      author: "Akshay",
      canonical: "https://viyana.productions/work/short-films",
      indexingStatus: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      publisher: "Viyana Productions",
      ogLocale: "en_US"
    }
  },
  {
    slug: "feature-film-production",
    aliases: ["film-production", "beyond-the-horizon"],
    title: "FEATURE FILM PRODUCTION",
    category: "FILM PRODUCTION",
    year: "2026",
    client: "Aero Athletics & Global Cinema",
    director: "Marcus Chen",
    deliverableType: "Theatrical Feature Film Production",
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=75&w=720&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=75&w=720&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=75&w=720&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=75&w=720&auto=format&fit=crop"
    ],
    seo: {
      metaTitle: "Feature Film Production Services | Viyana Productions",
      metaDescription: "Discover feature film production with Viyana Productions. We bring creative concepts to life through cinematic storytelling, professional filming, and visuals.",
      metaKeywords: "feature film, feature film production, feature film production company, feature film production company in bangalore, cinematic lighting equipment",
      ogTitle: "Feature Film Production for Stories That Inspire Audiences | Viyana Productions",
      ogType: "website",
      ogDescription: "Bring your cinematic vision to life with Viyana Productions. Explore feature film production focused on compelling narratives, creative direction, and cinematic visuals.",
      ogUrl: "https://viyana.productions/work/feature-film-production",
      ogSiteName: "Viyana Productions",
      ogImage: "https://viyana.productions/logo-black.png",
      twitterSite: "https://twitter.com/",
      twitterTitle: "Feature Film Production & Development Services | Viyana Productions",
      twitterDescription: "Turn ambitious stories into cinematic experiences with Viyana Productions. Explore feature film production, creative storytelling, and professional filmmaking services for your next project",
      author: "Akshay",
      canonical: "https://viyana.productions/work/feature-film-production",
      indexingStatus: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      publisher: "Viyana Productions",
      ogLocale: "en_US"
    }
  },
  {
    slug: "graphic-design-and-visual-identity",
    aliases: ["graphic-design", "genesis", "graphic-designing", "graphic-design-visual-identity"],
    title: "GRAPHIC DESIGN & VISUAL IDENTITY",
    category: "GRAPHIC DESIGN",
    year: "2026",
    client: "Worexa",
    director: "Viyana Graphic Atelier",
    deliverableType: "Graphic Design & Visual Identity System",
    thumbnail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=75&w=720&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=75&w=720&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=75&w=720&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=75&w=720&auto=format&fit=crop"
    ],
    seo: {
      metaTitle: "Visual Identity Design Services | Viyana Productions",
      metaDescription: "Build a memorable brand with Viyana Productions. Discover visual identity services that bring your brand personality to life through cohesive and creative design.",
      metaKeywords: "visual identity, brand identity design, visual branding services, graphic design services, logo and brand identity design, visual identity design agency in bangalore",
      ogTitle: "Creative Visual Identity Design for Memorable Brands | Viyana Productions",
      ogType: "website",
      ogDescription: "Create a consistent and recognizable brand with Viyana Productions. Explore visual identity solutions designed to communicate your brand personality across digital and print platforms.",
      ogUrl: "https://viyana.productions/work/graphic-design-and-visual-identity",
      ogSiteName: "Viyana Productions",
      ogImage: "https://viyana.productions/logo-black.png",
      twitterSite: "https://twitter.com/",
      twitterTitle: "Visual Identity Design Services for Modern Brands | Viyana Productions",
      twitterDescription: "Make your brand instantly recognizable with Viyana Productions. Discover creative visual identity services that help businesses communicate their personality through consistent design.",
      author: "Akshay",
      canonical: "https://viyana.productions/work/graphic-design-and-visual-identity",
      indexingStatus: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      publisher: "Viyana Productions",
      ogLocale: "en_US"
    }
  },
  {
    slug: "product-shoot",
    title: "PRODUCT SHOOT",
    category: "PRODUCT SHOOT",
    year: "2026",
    client: "Luxury Jewelry & E-Commerce Brands",
    director: "Viyana Creative Lab",
    deliverableType: "HD Photos, Macro Stills and Reels",
    thumbnail: "/images/product-shoot-1.jpg",
    instagramReelUrl: "https://www.instagram.com/reel/DdlycB7Dn08/?srtk=MWpsMW5lamtuN2I5cA==",
    instagramReels: [
      "https://www.instagram.com/reel/DdlycB7Dn08/?srtk=MWpsMW5lamtuN2I5cA==",
      "https://www.instagram.com/reel/DdZHtpjB3kZ/?xtok=MW13aHFyb2VkZ20wcQ=="
    ],
    description: "We take clear, evocative, and attractive photos and videos of your products. It helps your customers fall in love with your product and buy it.",
    fullDescription: "Specializing in high-end jewelry, e-commerce, and luxury goods photography. From macro texture capture to editorial lifestyle staging, our lighting and framing accentuate every intricate design detail.",
    creativeApproach: "Masterful studio lighting, high-magnification macro optics, and artful prop styling designed to highlight craftsmanship, metallic luster, and gemstone brilliance.",
    highlights: [
      { title: "MACRO PRECISION", subtitle: "Pin-sharp focus on intricate details, gemstone facets, and fine gold filigree" },
      { title: "EDITORIAL STYLING", subtitle: "Creative thematic backdrops, organic textures, and cinematic lighting setups" }
    ],
    keyFeatures: [
      "High-Resolution Macro Photography",
      "Creative Editorial & Prop Styling",
      "E-Commerce White & Natural Backgrounds",
      "Color-Accurate Studio Lighting",
      "High-End Retouching & Color Grading",
      "Social-Ready Reels & Short-Form Video"
    ],
    scope: [
      "Online store photos",
      "Lifestyle & editorial photos",
      "Macro jewelry & product stills",
      "Product showcase reels",
      "E-commerce catalog ready assets"
    ],
    impact: "Helps your customers to like your product and buy it with proven visual appeal",
    credits: {
      "STUDIO": "Viyana Productions",
      "DELIVERABLES": "HD Photos, Macro Stills & Reels",
      "FOR": "Jewelry, Fashion Brands, Beauty & Luxury Products"
    },
    ctaText: "BOOK A PRODUCT SHOOT",
    tagline: "CLEAR & ATTRACTIVE PHOTOS AND VIDEOS.",
    gallery: [
      "/images/product-shoot-1.jpg",
      "/images/product-shoot-2.jpg",
      "/images/product-shoot-3.jpg",
      "/images/product-shoot-4.jpg",
      "/images/product-shoot-5.jpg"
    ],
    seo: {
      metaTitle: "Product Photo Shoot in Bangalore | Viyana Productions",
      metaDescription: "Professional product photo shoot in Bangalore by Viyana Productions. High-quality product photo shoots for e-commerce, advertising, and brand promotion.",
      metaKeywords: "product photo shoot, product shoot photographer, product shots photography, product photography outdoor, photoshoot for clothing brand, jewellery product photoshoot, photoshoot ideas for products",
      ogTitle: "Professional Product Photo Shoot in Bangalore | Production Company",
      ogType: "website",
      ogDescription: "Make your products stand out with Viyana Productions. We create high-quality product photo shoots in Bangalore for e-commerce stores, advertising campaigns, and brand marketing.",
      ogUrl: "https://viyana.productions/work/product-shoot",
      ogSiteName: "Viyana Productions",
      ogImage: "https://viyana.productions/logo-black.png",
      twitterSite: "https://twitter.com/",
      twitterTitle: "Product Photo Shoot Services in Bangalore | Viyana Productions",
      twitterDescription: "Show your products at their best with Viyana Productions. Professional product photo shoot in Bangalore with creative compositions and high-quality visuals for e-commerce and advertising.",
      author: "Akshay",
      canonical: "https://viyana.productions/work/product-shoot",
      indexingStatus: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      publisher: "Viyana Productions",
      ogLocale: "en_US"
    }
  },
  {
    slug: "influencer-shoot",
    title: "INFLUENCER SHOOT",
    category: "INFLUENCER SHOOT",
    year: "2026",
    client: "Influencers & Creators",
    director: "Viyana Creative Lab",
    deliverableType: "Reels, Photos and Short Videos",
    thumbnail: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=75&w=720&auto=format&fit=crop",
    video: "/showreel-video-4k-h264.mp4",
    videoDuration: "1:30",
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
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=75&w=720&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=75&w=720&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=75&w=720&auto=format&fit=crop"
    ],
    seo: {
      metaTitle: "Influencer shoot in Bangalore | Viyana Productions",
      metaDescription: "Create standout social media content with Viyana Productions. Our influencer shoots in Bangalore deliver visuals for personal branding and campaigns.",
      metaKeywords: "influencer shoot, influencer photoshoot, influencer video production, influencer content creation, influencer shoot in bangalore, influencer photo shoot, influencer shooting",
      ogTitle: "Influencer shoots in Bangalore for Personal Branding | Production Company",
      ogType: "website",
      ogDescription: "Elevate your online presence with Viyana Productions. We create professional influencer shoots in Bangalore with engaging visuals for social media, brand collaborations, and personal branding.",
      ogUrl: "https://viyana.productions/work/influencer-shoot",
      ogSiteName: "Viyana Productions",
      ogImage: "https://viyana.productions/logo-black.png",
      twitterSite: "https://twitter.com/",
      twitterTitle: "Influencer shoot Company in Bangalore | Viyana Productions",
      twitterDescription: "Create scroll-stopping content with Viyana Productions. Our influencer shoots in Bangalore help creators and brands showcase their personality through professional photography.",
      author: "Akshay",
      canonical: "https://viyana.productions/work/influencer-shoot",
      indexingStatus: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      publisher: "Viyana Productions",
      ogLocale: "en_US"
    }
  },
  {
    slug: "studio-rental",
    title: "STUDIO RENTAL",
    category: "STUDIO RENTAL",
    year: "2026",
    client: "Viyana Studio Bangalore",
    director: "Viyana Studio Crew",
    deliverableType: "Photography & Video Studio × Brand Shoots × Interview & Green Screen",
    thumbnail: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=75&w=720&auto=format&fit=crop",
    description: "A versatile production studio designed for photography, video production, brand shoots, interviews, and creative projects. From controlled lighting to flexible setups, our studio gives you the space and production environment to bring your ideas to life.",
    fullDescription: "Our professional studio is built for creators who refuse to compromise. Fully equipped with cinema-grade lighting, flexible set configurations, green screen capability, and interview-ready multi-camera rigs — every shoot at Viyana Studio is set up for success from the first frame to the last. Whether you are photographing a product, shooting a brand film, conducting an interview, or executing a full creative editorial, our space adapts to your vision.",
    creativeApproach: "A versatile production space tailored for commercial photography, high-end video shoots, fashion lookbooks, and broadcast interviews with controlled lighting and modular setups.",
    highlights: [
      { title: "FULL PRODUCTION SPACE", subtitle: "Equipped with professional strobes, continuous LED lighting, and modifiers" },
      { title: "HALF & FULL DAY BOOKINGS", subtitle: "Flexible slots with lighting packages, backdrop systems, and crew support" }
    ],
    keyFeatures: [
      "Photography & Video Studio",
      "Professional Lighting Setup",
      "Product & Brand Shoots",
      "Interview Setup",
      "Green Screen Setup",
      "Creative & Editorial Shoots",
      "Flexible Configurations",
      "Production Support"
    ],
    scope: [
      "Photography & Video Studio",
      "Professional Lighting Setup",
      "Product & Brand Shoots",
      "Interview Setup",
      "Green Screen Setup",
      "Creative & Editorial Shoots",
      "Flexible Studio Configurations",
      "Production Support"
    ],
    impact: "Full Production Space • 4K & Cinema Grade Ready • Half-Day & Full-Day Bookings",
    credits: {
      "STUDIO": "Viyana Productions",
      "LOCATION": "Bangalore",
      "TYPE": "Full Production Space",
      "FORMAT": "4K & Cinema Grade Ready",
      "BOOKING": "Half-Day & Full-Day Bookings Available"
    },
    ctaText: "BOOK THE STUDIO",
    tagline: "PROFESSIONAL STUDIO SPACES FOR EVERY CREATIVE.",
    gallery: [
      "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=75&w=720&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=75&w=720&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542451313056-b7c8e626645f?q=75&w=720&auto=format&fit=crop"
    ],
    seo: {
      metaTitle: "Photography Studio Rental Services | Viyana Productions",
      metaDescription: "Find a creative space for your next shoot with Viyana Productions. Explore studio rental options for photography, video production, interviews, and content creation.",
      metaKeywords: "studio rental, studios for rent near me, studio space for rent, studio room for rent, photography studio rental, rent studio for photoshoot, video studio rental, studio rental in bangalore",
      ogTitle: "Creative Studio Rental for Photography and Video Production | Viyana Productions.",
      ogType: "website",
      ogDescription: "Bring your creative projects to life with Viyana Productions. Explore studio rental options for photography sessions, video shoots, interviews, and professional content creation.",
      ogUrl: "https://viyana.productions/work/studio-rental",
      ogSiteName: "Viyana Productions",
      ogImage: "https://viyana.productions/logo-black.png",
      twitterSite: "https://twitter.com/",
      twitterTitle: "Photography and Video Studio Rentals in Bangalore | Viyana Productions",
      twitterDescription: "Are you looking for a studio for your next creative project? Viyana Productions offers versatile rental options ideal for photography, video production, interviews, and social media content creation.",
      author: "Akshay",
      canonical: "https://viyana.productions/work/studio-rental",
      indexingStatus: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      publisher: "Viyana Productions",
      ogLocale: "en_US"
    }
  },
  {
    slug: "podcast-production",
    title: "PODCAST PRODUCTION",
    category: "PODCAST PRODUCTION",
    year: "2026",
    client: "Viyana Studio Bangalore",
    director: "Viyana Audio & Video Engineers",
    deliverableType: "Studio Recording × Multi-Camera × Professional Audio × Final Delivery",
    thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=75&w=720&auto=format&fit=crop",
    video: "/showreel-video-4k-h264.mp4",
    youtubeVideoId: "TxPzxJCl37o",
    description: "A complete podcast production setup built for creators, brands, entrepreneurs, and businesses. From studio recording and multi-camera production to professional audio, editing, and final delivery — we help turn conversations into engaging content.",
    fullDescription: "Podcasting is the most powerful long-form platform of our time. At Viyana, we give your show the production quality it deserves. From our acoustically treated recording studio and multi-camera cinematic capture to professional audio engineering, sharp editing, and ready-to-publish delivery — every episode is handled with the same precision we bring to our commercial productions. Whether you are launching a business podcast, interview show, talk show, or YouTube series, we are your full production partner.",
    creativeApproach: "Turn conversations into engaging, broadcast-grade episodic content with multi-camera 4K visual capture, high-fidelity acoustic engineering, and viral short-form cutdowns.",
    highlights: [
      { title: "STUDIO-GRADE AUDIO", subtitle: "Acoustically treated studio with broadcast microphones and real-time monitoring" },
      { title: "4K MULTI-CAMERA RIG", subtitle: "Dynamic angle switching, professional lighting, and complete post-production mastering" }
    ],
    keyFeatures: [
      "Podcast Studio Rental",
      "Multi-Camera Recording",
      "Professional Audio Recording",
      "Video Podcast Production",
      "Interview & Talk Shows",
      "Podcast Editing",
      "Reels & Short-Form Clips",
      "YouTube Podcast Production"
    ],
    scope: [
      "Podcast Studio Rental",
      "Multi-Camera Recording",
      "Professional Audio",
      "Video Podcast Production",
      "Interview & Talk Shows",
      "Podcast Editing",
      "Reels & Short-Form Clips",
      "YouTube Podcast Production"
    ],
    impact: "Up to 4K Multi-Cam Video • Studio Mastered Audio • Audio + Video + Viral Social Clips",
    credits: {
      "STUDIO": "Viyana Productions",
      "LOCATION": "Bangalore",
      "AUDIO": "Studio Mastered Audio",
      "VIDEO": "4K Multi-Camera Studio",
      "DELIVERY": "Full Audio + Video + Viral Short-Form Clips"
    },
    ctaText: "START YOUR PODCAST",
    tagline: "YOUR VOICE. YOUR STORY. YOUR PLATFORM.",
    gallery: [
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=75&w=720&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542451313056-b7c8e626645f?q=75&w=720&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=75&w=720&auto=format&fit=crop"
    ],
    seo: {
      metaTitle: "Podcast Production Services in Bangalore | Viyana Productions",
      metaDescription: "Launch your podcast with Viyana Productions. Get professional podcast production support for recording, video content, and engaging audio-visual storytelling.",
      metaKeywords: "podcast production, video podcast production, podcast recording services, podcast editing services, podcast production company, complete podcast setup, podcast producer companies, podcast production in bangalore",
      ogTitle: "Professional Podcast Production for Creators and Businesses | Production company",
      ogType: "website",
      ogDescription: "Turn conversations into engaging content with Viyana Productions. Explore podcast production services for creators and businesses seeking professional audio-visual storytelling.",
      ogUrl: "https://viyana.productions/work/podcast-production",
      ogSiteName: "Viyana Productions",
      ogImage: "https://viyana.productions/logo-black.png",
      twitterSite: "https://twitter.com/",
      twitterTitle: "Podcast Production Services in Bengaluru | Viyana Productions Studio",
      twitterDescription: "Bring your podcast ideas to life with Viyana Productions. We create engaging audio and video content, offering professional production support tailored for both creators and businesses.",
      author: "Akshay",
      canonical: "https://viyana.productions/work/podcast-production",
      indexingStatus: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      publisher: "Viyana Productions",
      ogLocale: "en_US"
    }
  }
];

export const projectsArchive: Project[] = [
  {
    slug: "velocity-ad-campaign",
    title: "VELOCITY AD CAMPAIGN",
    category: "COMMERCIAL ADS",
    year: "2026",
    client: "Apex Performance",
    director: "David Okafor",
    deliverableType: "Multi-Platform Commercial & Social Ad Rollout",
    thumbnail: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=75&w=720&auto=format&fit=crop",
    video: "/showreel-video-4k-h264.mp4",
    videoDuration: "1:05",
    description: "A multi-platform advertising campaign combining cinematic commercial ads, interactive digital ad units, and targeted social media conversion assets.",
    scope: ["Ad Campaign", "Paid Media Creatives", "Social Storyboards", "Conversion Assets"],
    impact: "+180% Return on Ad Spend (ROAS) across paid channels",
    gallery: [
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=75&w=720&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=75&w=720&auto=format&fit=crop"
    ],
    seo: {
      metaTitle: "Velocity Ad Campaign | Commercial Production | Viyana Productions",
      metaDescription: "A multi-platform advertising campaign combining cinematic commercial ads, interactive digital ad units, and targeted social media conversion assets by Viyana Productions.",
      metaKeywords: "velocity ad campaign, commercial ads, advertising production, commercial film bangalore, viyana productions",
      ogTitle: "Velocity Ad Campaign | Commercial Production by Viyana Productions",
      ogType: "website",
      ogDescription: "A multi-platform advertising campaign combining cinematic commercial ads, interactive digital ad units, and targeted social media conversion assets by Viyana Productions.",
      ogUrl: "https://viyana.productions/work/velocity-ad-campaign",
      ogSiteName: "Viyana Productions",
      ogImage: "https://viyana.productions/logo-black.png",
      twitterSite: "https://twitter.com/",
      twitterTitle: "Velocity Ad Campaign | Viyana Productions",
      twitterDescription: "A multi-platform advertising campaign combining cinematic commercial ads, interactive digital ad units, and targeted social media conversion assets by Viyana Productions.",
      author: "Akshay",
      canonical: "https://viyana.productions/work/velocity-ad-campaign",
      indexingStatus: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      publisher: "Viyana Productions",
      ogLocale: "en_US"
    }
  }
];
