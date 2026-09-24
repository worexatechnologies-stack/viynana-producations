export interface ServiceWorkflowStep {
  number: string;
  title: string;
  description: string;
  output: string;
}

export interface ServiceTier {
  name: string;
  duration: string;
  idealFor: string;
  includes: string[];
}

export interface ServiceItem {
  id: string;
  number: string;
  slug: string;
  pillar: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  video?: string;
  services: string[];
  deliverables: string[];
  tools: string[];
  metrics: { label: string; value: string }[];
  ctaText: string;
  workflow: ServiceWorkflowStep[];
  packages: ServiceTier[];
}

export const services: ServiceItem[] = [
  {
    id: "01",
    number: "01",
    slug: "ad-agency",
    pillar: "AD AGENCY",
    title: "IDEAS BUILT TO GET ATTENTION.",
    tagline: "Creative Strategy × Ad Campaigns × Brand Launches",
    description: "Full-service advertising solutions from audience research and provocative campaign strategy to multi-channel execution that elevates brand equity and drives commercial performance.",
    longDescription: "In an attention-deficit world, safe ideas are invisible. We engineer full-funnel advertising campaigns that penetrate cultural noise, establish unassailable market authority, and convert audience attention into measurable revenue. From strategic white-space discovery to multi-channel execution across television, digital, and out-of-home media, every touchpoint is crafted with intent.",
    image: "/images/the-next-move.jpg",
    gallery: [
      "/images/the-next-move.jpg",
      "https://images.unsplash.com/photo-1542744094-3a3172722053?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2000&auto=format&fit=crop"
    ],
    video: "/13232-246463976_medium.mp4",
    services: [
      "Creative Ad Strategy",
      "Campaign Concept Development",
      "Multi-Channel Ad Campaigns",
      "Digital Performance Creatives",
      "Brand Launch Strategy",
      "Social Media Ad Direction",
      "Product Positioning & Copy"
    ],
    deliverables: [
      "Campaign Pitch Decks & Scripts",
      "Omnichannel Visual Direction",
      "High-Conversion Ad Variations (1:1, 9:16, 16:9)",
      "Target Audience & Positioning Map",
      "Copywriting & Scripting Frameworks"
    ],
    tools: ["Audience Intelligence", "Figma", "Notion Strategy", "Omnichannel Planning"],
    metrics: [
      { label: "Execution Scope", value: "360° Campaigns" },
      { label: "Turnaround", value: "2–4 Weeks" },
      { label: "Output Formats", value: "Digital, OOH, TV" }
    ],
    ctaText: "START AD BRIEF →",
    workflow: [
      {
        number: "01",
        title: "STRATEGIC DIAGNOSIS",
        description: "Deep dive into your market landscape, competitive moat, audience friction points, and conversion triggers.",
        output: "Strategic Campaign Thesis & Positioning Matrix"
      },
      {
        number: "02",
        title: "CREATIVE CONCEPTING",
        description: "Developing 3 distinct creative campaign territories with hero messaging, visual themes, and narrative hooks.",
        output: "Creative Treatment & Concept Deck"
      },
      {
        number: "03",
        title: "MULTI-CHANNEL EXECUTION",
        description: "Deploying high-converting ad variations formatted specifically for targeted platforms (Social, Search, OOH, Digital TV).",
        output: "Master Campaign Asset Library"
      },
      {
        number: "04",
        title: "ROLLOUT & PERFORMANCE",
        description: "Staging campaign launch sequence, A/B creative testing, and optimization frameworks for maximum ROAS.",
        output: "Launch Playbook & Performance Guidelines"
      }
    ],
    packages: [
      {
        name: "PRODUCT CAMPAIGN SPRINT",
        duration: "2 Weeks",
        idealFor: "Targeted product releases & seasonal promotions",
        includes: ["1 Hero Campaign Concept", "10+ Multi-format Digital Ad Creatives", "Copywriting & Scripting Suite", "A/B Testing Variations"]
      },
      {
        name: "360° BRAND LAUNCH",
        duration: "4 Weeks",
        idealFor: "Full brand introductions & category disruptors",
        includes: ["Complete Strategic Positioning Deck", "Hero Commercial Concept & Script", "Omnichannel Ad Rollout (25+ Assets)", "Billboard & OOH Key Visuals", "Social Media Launch Grid"]
      },
      {
        name: "ENTERPRISE CREATIVE RETAINER",
        duration: "Quarterly / Ongoing",
        idealFor: "Scaling brands needing continuous fresh creative cadence",
        includes: ["Dedicated Creative Direction Team", "Monthly Fresh Campaign Assets", "Iterative Performance Ad Optimizations", "Executive Pitch Decks"]
      }
    ]
  },
  {
    id: "02",
    number: "02",
    slug: "ads-videos",
    pillar: "ADS & VIDEOS",
    title: "MAKE THEM STOP. MAKE THEM WATCH.",
    tagline: "Commercials × Product Films × Promotional Videos",
    description: "Cinematic commercial films, high-octane product reveal videos, and digital video assets engineered with cinema cameras, precision lighting, dynamic sound design, and master color grading.",
    longDescription: "Film is the ultimate emotional medium. We don't make generic video content; we craft cinematic experiences that command visceral audience attention. Utilizing cinema camera packages, precision choreography, physics-defying 3D motion graphics, and Hollywood-grade DaVinci Resolve color pipelines, every frame is engineered to elevate perception and evoke desire.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542451313056-b7c8e626645f?q=80&w=2070&auto=format&fit=crop"
    ],
    video: "/showreel-video-4k-h264.mp4",
    services: [
      "TV & Web Commercials",
      "Cinematic Product Videos",
      "Brand Hero Films",
      "High-Retention Reels & Shorts",
      "Motion Graphics & 3D Visuals",
      "DaVinci Master Color Grading",
      "Custom Sound Design & 5.1 Mix"
    ],
    deliverables: [
      "4K DCI ProRes 422HQ Masters",
      "Multi-Aspect Cuts (16:9, 9:16, 1:1, 4:5)",
      "Clean & Texted Video Deliverables",
      "Cinema Grade LUTs & Sound Mix",
      "Raw Project Archive Delivery"
    ],
    tools: ["ARRI / RED / Sony Cine", "DaVinci Resolve Studio", "Premiere Pro", "After Effects", "Cinema 4D"],
    metrics: [
      { label: "Resolution", value: "Up to 4K / 8K Cinema" },
      { label: "Audio Mix", value: "Stereo & 5.1 Surround" },
      { label: "Color Space", value: "ACES / Rec.709 Master" }
    ],
    ctaText: "START VIDEO BRIEF →",
    workflow: [
      {
        number: "01",
        title: "SCRIPT & STORYBOARD",
        description: "Transforming narrative vision into frame-by-frame visual storyboards, shot lists, and pacing blueprints.",
        output: "Director's Treatment & Visual Storyboard"
      },
      {
        number: "02",
        title: "CINEMATIC CAPTURE",
        description: "On-set production with cinema lenses, precision lighting, motion tracking rigs, and high-frame-rate recording.",
        output: "4K/8K Cinema Raw Footage Archive"
      },
      {
        number: "03",
        title: "POST & SOUND DESIGN",
        description: "Editorial rhythm assembly, spatial audio composition, custom sound effects, and CGI motion integration.",
        output: "Picture-Locked High-Res Edit"
      },
      {
        number: "04",
        title: "GRADE & MULTI-MASTER",
        description: "DaVinci Resolve color grading for filmic depth, mastering in ProRes 422HQ across 16:9, 9:16, and 1:1 aspect ratios.",
        output: "Final Broadcast & Social Master Package"
      }
    ],
    packages: [
      {
        name: "PRODUCT REVEAL SPOT",
        duration: "2–3 Weeks",
        idealFor: "Hardware, automotive, luxury & high-tech showcases",
        includes: ["1x 60s Main Reveal Film", "3x 15s High-Retention Social Cutdowns", "Custom 3D Motion Graphics", "4K ProRes Master Deliverables"]
      },
      {
        name: "CINEMATIC BRAND FILM",
        duration: "3–4 Weeks",
        idealFor: "High-impact brand positioning & flagship campaigns",
        includes: ["1x 90–120s Cinematic Flagship Film", "Director & Cinematography Crew", "Full DaVinci Color Grade + Sound Design", "Global Broadcast & Digital Master Rights"]
      },
      {
        name: "HIGH-CADENCE SOCIAL SUITE",
        duration: "Monthly / Retainer",
        idealFor: "Continuous viral TikTok & Instagram Reels presence",
        includes: ["12x Native 9:16 Vertical Video Commercials", "Dynamic Motion Captions & Hooks", "Rapid Trend Adaptation", "Fast 48h Turnaround Pipeline"]
      }
    ]
  },
  {
    id: "03",
    number: "03",
    slug: "graphic-designing",
    pillar: "GRAPHIC DESIGNING",
    title: "MAKE THE IDEA LOOK AS GOOD AS IT SOUNDS.",
    tagline: "Visual Identity × Key Visuals × Brand Art Direction",
    description: "Unforgettable graphic design systems, 3D typography, campaign key visuals, digital brand assets, and editorial print work crafted to give brands a commanding, world-class presence.",
    longDescription: "Visual identity is the permanent signature of your brand. We build graphic design systems with radical precision and artistic boldness—ranging from monumental typography and dimensional 3D CGI key visuals to luxury packaging and frictionless digital design tokens that ensure your brand looks unmistakable everywhere it appears.",
    image: "/images/neon-horizons.png",
    gallery: [
      "/images/neon-horizons.png",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542744094-3a3172722053?q=80&w=2070&auto=format&fit=crop"
    ],
    video: "/13232-246463976_medium.mp4",
    services: [
      "Campaign Key Visuals (KV)",
      "Visual Brand Identity Systems",
      "3D & Motion Typography",
      "Editorial Posters & Print Design",
      "Social Media Design Systems",
      "Product Packaging & Merch",
      "Digital Display & Web Banners"
    ],
    deliverables: [
      "Vector Identity Guides & Assets (.SVG, .AI, .EPS)",
      "High-Resolution CMYK / RGB Master Files",
      "Motion Typography Source Packages",
      "Complete Social Grid & Template Systems",
      "Brand Guidelines & Typography Specs"
    ],
    tools: ["Adobe Illustrator", "Photoshop", "After Effects", "Blender 3D", "Figma"],
    metrics: [
      { label: "Asset Quality", value: "Vector & 300DPI Print" },
      { label: "Design Systems", value: "Full Design Tokens" },
      { label: "File Deliverables", value: "Source + Cloud Assets" }
    ],
    ctaText: "START DESIGN BRIEF →",
    workflow: [
      {
        number: "01",
        title: "VISUAL MOOD & DNA",
        description: "Exploring typographic tensions, color psychology, textures, and bespoke stylistic directions.",
        output: "Moodboard & Visual Direction Deck"
      },
      {
        number: "02",
        title: "SYSTEM ARCHITECTURE",
        description: "Crafting logos, typographic hierarchies, grid geometry, and dimensional 3D graphic elements.",
        output: "Design System Tokens & Key Visuals"
      },
      {
        number: "03",
        title: "APPLICATION & MOTION",
        description: "Applying identity to real-world touchpoints: packaging, editorial posters, digital UI, and motion bumpers.",
        output: "Mockup Proofs & Motion Tests"
      },
      {
        number: "04",
        title: "SPECIFICATION & ASSET DELIVERY",
        description: "Packaging complete vector files, high-res print masters, brand bible, and digital Figma components.",
        output: "Brand Design Bible & Cloud Asset Hub"
      }
    ],
    packages: [
      {
        name: "CAMPAIGN KEY VISUALS (KV)",
        duration: "1–2 Weeks",
        idealFor: "Product launches, music releases & events",
        includes: ["3 Master Key Visual Artworks", "3D Motion Typography Loops", "OOH Billboard & Print CMYK Masters", "Digital Banner Suite (10+ Sizes)"]
      },
      {
        name: "FULL VISUAL IDENTITY SYSTEM",
        duration: "3–4 Weeks",
        idealFor: "New brand launches & comprehensive rebrands",
        includes: ["Comprehensive Logo & Symbol System", "Custom Typography & Color Palette", "Complete 60+ Page Brand Bible", "Packaging & Merch Design Concepts", "Full Vector Source Asset Library"]
      },
      {
        name: "SOCIAL & DIGITAL DESIGN SUITE",
        duration: "2 Weeks",
        idealFor: "Brands looking to overhaul their social aesthetic",
        includes: ["15+ Figma Editable Social Templates", "Motion Graphic Post Bumpers", "Story & Carousel Grid Systems", "Custom Iconography & Badge Set"]
      }
    ]
  },
  {
    id: "04",
    number: "04",
    slug: "product-shoot",
    pillar: "PRODUCT SHOOT",
    title: "CLEAR & ATTRACTIVE PHOTOS AND VIDEOS.",
    tagline: "Online Store Photos × Lifestyle Photos × Product Videos",
    description: "We take clear and attractive photos and videos of your products. It helps your customers to like your product and buy it.",
    longDescription: "High-quality imagery is crucial for e-commerce success. We specialize in capturing the essence of your products through clear, attractive photos and compelling videos. Whether you are a dress brand, beauty product line, food vendor, or tech gadget company, our visuals are designed to make your customers fall in love with your product and drive sales. We handle everything from pristine online store shots on clean backgrounds to aspirational lifestyle photos that tell a story.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2000&auto=format&fit=crop"
    ],
    video: "/showreel-video-4k-h264.mp4",
    services: [
      "Online store photos",
      "Lifestyle photos",
      "Product videos"
    ],
    deliverables: [
      "HD Photos",
      "High-Quality Reels",
      "E-commerce ready images"
    ],
    tools: ["Professional Lighting", "High-End Cameras", "Photo Editing Software"],
    metrics: [
      { label: "Ideal For", value: "Dress brands, Beauty products, Food, Gadgets" },
      { label: "Turnaround", value: "1-2 Weeks" },
      { label: "Output Format", value: "HD, 4K" }
    ],
    ctaText: "START PRODUCT SHOOT →",
    workflow: [
      {
        number: "01",
        title: "PRODUCT ANALYSIS",
        description: "Understanding your brand guidelines, target audience, and the key features of the product.",
        output: "Shoot Plan & Moodboard"
      },
      {
        number: "02",
        title: "SET DESIGN & LIGHTING",
        description: "Preparing the optimal setting, backdrops, and lighting setups to highlight the product's best angles.",
        output: "Ready Set"
      },
      {
        number: "03",
        title: "PRODUCTION",
        description: "Executing the shoot for e-commerce, lifestyle, and video requirements.",
        output: "Raw Assets"
      },
      {
        number: "04",
        title: "RETOUCHING & DELIVERY",
        description: "Professional editing, color correction, and formatting for various digital platforms.",
        output: "Final HD Photos and Reels"
      }
    ],
    packages: [
      {
        name: "E-COMMERCE STARTER",
        duration: "1 Week",
        idealFor: "New product launches",
        includes: ["Standard White Background Photos", "Basic Lifestyle Shots", "High-Res Image Delivery"]
      },
      {
        name: "FULL PRODUCT CAMPAIGN",
        duration: "2 Weeks",
        idealFor: "Seasonal collections and major launches",
        includes: ["Premium E-commerce Photos", "Advanced Lifestyle Shots", "Product Video Reels", "Full Retouching"]
      }
    ]
  },
  {
    id: "05",
    number: "05",
    slug: "influencer-shoot",
    pillar: "INFLUENCER SHOOT",
    title: "STYLISH VIDEOS & PHOTOS.",
    tagline: "Instagram Reels × Model Photos × Brand Collab Shoots",
    description: "We shoot stylish videos and photos for influencers. It helps you to get more followers and brand deals.",
    longDescription: "Stand out in a crowded digital landscape with striking visuals. We provide professional shooting services for models, influencers, and YouTubers looking to elevate their personal brand. From viral Instagram Reels to high-fashion model portfolios and brand collaboration shoots, we capture your unique personality and style. Our content is designed to maximize engagement, attract more followers, and help you secure lucrative brand partnerships.",
    image: "https://images.unsplash.com/photo-1516575334481-bea2089ba96a?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1516575334481-bea2089ba96a?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop"
    ],
    video: "/showreel-video-4k-h264.mp4",
    services: [
      "Instagram Reels",
      "Model Photos",
      "Brand Collab Shoots"
    ],
    deliverables: [
      "High-Quality Reels",
      "Professional Photos",
      "Short Form Videos"
    ],
    tools: ["Cinema Cameras", "Gimbals & Stabilizers", "Creative Lighting"],
    metrics: [
      { label: "Ideal For", value: "Models, Influencers, Youtubers" },
      { label: "Turnaround", value: "3-5 Days" },
      { label: "Output Format", value: "9:16 Vertical, 4K/HD" }
    ],
    ctaText: "START INFLUENCER SHOOT →",
    workflow: [
      {
        number: "01",
        title: "CONCEPT & TREND RESEARCH",
        description: "Identifying current viral trends and developing a personalized concept that fits your aesthetic.",
        output: "Creative Treatment"
      },
      {
        number: "02",
        title: "ON-LOCATION SHOOT",
        description: "Dynamic filming and photography at selected locations with professional direction and styling guidance.",
        output: "Raw Footage & Images"
      },
      {
        number: "03",
        title: "FAST-TRACK EDITING",
        description: "Quick turnaround editing optimized for social media algorithms and high engagement.",
        output: "First Drafts"
      },
      {
        number: "04",
        title: "FINAL DELIVERY",
        description: "Providing polished, ready-to-post Reels, photos, and short videos.",
        output: "Social Media Ready Assets"
      }
    ],
    packages: [
      {
        name: "SOCIAL MEDIA QUICK BOOST",
        duration: "3 Days",
        idealFor: "Frequent content updates",
        includes: ["3 Instagram Reels", "10 Retouched Photos", "Trend-based Editing"]
      },
      {
        name: "BRAND COLLAB PREMIUM",
        duration: "1 Week",
        idealFor: "Sponsored posts and major campaigns",
        includes: ["High-End Promotional Video", "Extensive Photo Gallery", "Custom Color Grading", "Priority Delivery"]
      }
    ]
  }
];
