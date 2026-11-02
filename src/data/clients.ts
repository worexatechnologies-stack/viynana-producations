export interface ClientPartner {
  id: string;
  name: string;
  logo: string;
}

export interface ClientMarqueeCard {
  id: string;
  name: string;
  logo: string;
  bgClass: string;
  glowClass?: string;
}

export const clientMarqueeCards: ClientMarqueeCard[] = [
  {
    id: "taashi",
    name: "TAASHI",
    logo: "/images/clients/taashi.png",
    bgClass: "bg-white border border-slate-200/90 shadow-[0_10px_25px_rgba(0,0,0,0.35)]",
    glowClass: "hover:shadow-[0_15px_35px_rgba(255,255,255,0.2)]",
  },
  {
    id: "triadic",
    name: "TRIADIC",
    logo: "/images/clients/triadic.png",
    bgClass: "bg-white border border-slate-200/90 shadow-[0_10px_25px_rgba(0,0,0,0.35)]",
    glowClass: "hover:shadow-[0_15px_35px_rgba(255,255,255,0.2)]",
  },
  {
    id: "nexby-iq",
    name: "NexBy IQ",
    logo: "/images/clients/nexby-iq.png",
    bgClass: "bg-white border-2 border-[#ff7a29] shadow-[0_0_30px_rgba(255,122,41,0.35)]",
    glowClass: "hover:shadow-[0_0_40px_rgba(255,122,41,0.55)]",
  },
];

export const clientLogos: ClientPartner[] = [
  {
    id: "taashi",
    name: "TAASHI",
    logo: "/images/clients/taashi.png",
  },
  {
    id: "triadic",
    name: "TRIADIC",
    logo: "/images/clients/triadic.png",
  },
  {
    id: "nexby-iq",
    name: "NexBy IQ",
    logo: "/images/clients/nexby-iq.png",
  },
];

export const clients = [
  "TAASHI",
  "TRIADIC",
  "NexBy IQ",
];


