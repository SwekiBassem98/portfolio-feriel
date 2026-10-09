export interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  gallery: string[];
  gallerySections?: {
    title: string;
    images: string[];
  }[];
  pdfUrl?: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  content: {
    introduction: string;
    sections: {
      heading: string;
      content: string;
    }[];
    conclusion: string;
  };
  tags: string[];
  keySkills?: string[];
  deliverablesCount?: string;
}


export const articles: Article[] = [
  {
    id: "001",
    title: "Moderna",
    subtitle: "Social Media Identity",
    category: "Industrial",
    date: "Oct 16, 2024",
    readTime: "5 min",
    image: "/images/projects/moderna/Moderna-thumbnail.jpg",
    gallery: [
      "/images/projects/moderna/1.png",
      "/images/projects/moderna/2.png",
      "/images/projects/moderna/3.png",
      "/images/projects/moderna/4.png",
      "/images/projects/moderna/5.png",
      "/images/projects/moderna/6.png",
      "/images/projects/moderna/7.png",
      "/images/projects/moderna/8.png",
      "/images/projects/moderna/9.png",
      "/images/projects/moderna/10.png",
      "/images/projects/moderna/11.png",
      "/images/projects/moderna/12.png",
      "/images/projects/moderna/13.png",
      "/images/projects/moderna/14.png",
      "/images/projects/moderna/15.png",
      "/images/projects/moderna/16.png",
      "/images/projects/moderna/17.png",
      "/images/projects/moderna/18.png",
      "/images/projects/moderna/19.png",
      "/images/projects/moderna/20.png",
      "/images/projects/moderna/21.png",
    ],
    author: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
      bio: "Financial wellness writer and personal growth advocate",
    },
    content: {
      introduction: "A high-impact social media identity created for MODERNA, a Tunisian industrial metal fabrication company in Nabeul specializing in precision laser cutting, punching, bending, and welding.",
      sections: [
        {
          heading: "Concept & Strategy",
          content: "Built a disciplined visual narrative balancing authentic factory photography with bold, high-contrast typography. Each post delivers a single, focused message that positions MODERNA as a modern, reliable industrial partner.",
        },
        {
          heading: "Visual Execution",
          content: "High-contrast palette pairing MODERNA's signature yellow with charcoal blacks and workshop textures. Heavy condensed uppercase typography ensures instant readability across mobile feeds.",
        },
        {
          heading: "Deliverables & Impact",
          content: "Full suite of 21 Instagram feed assets showcasing manufacturing capabilities, team culture, and technical equipment partnerships (including AMADA), establishing a modern digital presence.",
        },
      ],
      conclusion: "Demonstrates how heavy B2B industrial brands can achieve modern, engaging digital aesthetics through structured layout systems, authentic imagery, and disciplined typography.",
    },
    keySkills: ["Industrial Art Direction", "High-Contrast Typography", "B2B Social Systems", "Photo Post-Production"],
    deliverablesCount: "21 Feed Assets",
    tags: ["metal fabrication", "industrial design", "social media branding", "B2B marketing"],
  },
  {
    id: "002",
    title: "Il Mercato",
    subtitle: "Social Media Identity",
    category: "Food",
    date: "Oct 23, 2024",
    readTime: "6 min",
    image: "/images/projects/ilmercato/IlMercato-thumbnail.jpg",
    gallery: [
      "/images/projects/ilmercato/1.jpg",
      "/images/projects/ilmercato/2.jpg",
      "/images/projects/ilmercato/3.png",
      "/images/projects/ilmercato/4.png",
      "/images/projects/ilmercato/5.jpg",
      "/images/projects/ilmercato/6.png",
      "/images/projects/ilmercato/7.png",
      "/images/projects/ilmercato/8.png",
      "/images/projects/ilmercato/9.png",
      "/images/projects/ilmercato/10.png",
      "/images/projects/ilmercato/11.jpg",
      "/images/projects/ilmercato/12.jpg",
      "/images/projects/ilmercato/13.jpg",
      "/images/projects/ilmercato/14.jpg",
      "/images/projects/ilmercato/15.jpg",
    ],
    author: {
      name: "Sofia Rodriguez",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
      bio: "Creative writer and mindfulness practitioner",
    },
    content: {
      introduction: "A refined social media visual identity created for Il Mercato, a gourmet grocery boutique (épicerie fine) in Nabeul celebrating Mediterranean culinary craftsmanship.",
      sections: [
        {
          heading: "Concept & Strategy",
          content: "Positioned the brand around sensory indulgence and authenticity. Each post spotlights a single hero delicacy — from cured bottarga to Turkish coffee — supported by rich culinary textures and warm natural light.",
        },
        {
          heading: "Visual Execution",
          content: "Artisanal script logotype paired with clean editorial typography. Adaptive moody and bright backdrops tailored to each product line, accented with warm terracotta and olive tones.",
        },
        {
          heading: "Deliverables & Impact",
          content: "15 Instagram feed visuals highlighting gourmet specialties, packaging details, and seasonal greetings that elevated the store's digital reputation across Tunisia.",
        },
      ],
      conclusion: "Demonstrates sensitive food art direction, balancing artisanal warmth with clean commercial presentation to inspire gourmet desire.",
    },
    keySkills: ["Artisanal Branding", "Food Styling Direction", "Editorial Typographic Pairing", "Social Media Strategy"],
    deliverablesCount: "15 Gourmet Assets",
    tags: ["food photography", "gourmet branding", "épicerie fine", "social media design"],
  },
  {
    id: "003",
    title: "CBSS",
    subtitle: "Corporate Brochure",
    category: "Corporate",
    date: "Dec 4, 2024",
    readTime: "5 min",
    image: "/images/projects/cbss/CBSS-thumbnail.jpg",
    gallery: [
      "/images/projects/cbss/1.png",
      "/images/projects/cbss/2.png",
      "/images/projects/cbss/3.png",
      "/images/projects/cbss/4.png",
      "/images/projects/cbss/5.png",
      "/images/projects/cbss/6.png",
      "/images/projects/cbss/7.png",
    ],
    pdfUrl: "/images/projects/cbss/finale.pdf",
    author: {
      name: "Marcus Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      bio: "Community builder and contemplative writer",
    },
    content: {
      introduction: "A multi-page corporate profile and sales brochure designed for CBSS (Safety For Business), leaders in electronic security and fire protection in Tunisia.",
      sections: [
        {
          heading: "Concept & Strategy",
          content: "Structured an authoritative, sequential reading flow (01 to 06) that establishes technical credibility, international certifications (SGS, HIKVISION), and client trust across B2B sectors.",
        },
        {
          heading: "Visual Execution",
          content: "Clean corporate grid balancing CBSS's signature red with generous white space, technical iconography, and on-site event photography for effortless readability.",
        },
        {
          heading: "Deliverables & Impact",
          content: "Complete print-ready brochure and high-resolution digital presentation used for client pitches, public tenders, and corporate partnership summits.",
        },
      ],
      conclusion: "Translates complex technical security services into a polished, business-ready document that reinforces enterprise credibility.",
    },
    keySkills: ["Corporate Print Design", "Information Architecture", "Editorial Grid Systems", "Technical Diagrams"],
    deliverablesCount: "7 Multi-Page Spreads",
    tags: ["corporate brochure", "print design", "B2B branding", "security industry"],
  },
  {
    id: "004",
    title: "Curvita",
    subtitle: "Educational Content",
    category: "Beauty",
    date: "Apr 21, 2025",
    readTime: "6 min",
    image: "/images/projects/curvita/Curvita-thumbnail.jpg",
    gallery: [
      "/images/projects/curvita/11.jpg",
      "/images/projects/curvita/12.jpg",
      "/images/projects/curvita/13.jpg",
      "/images/projects/curvita/14.jpg",
      "/images/projects/curvita/15.jpg",
      "/images/projects/curvita/16.jpg",
      "/images/projects/curvita/19.jpg",
      "/images/projects/curvita/20.jpg",
      "/images/projects/curvita/24.jpg",
      "/images/projects/curvita/25.jpg",
      "/images/projects/curvita/26.jpg",
      "/images/projects/curvita/27.jpg",
      "/images/projects/curvita/29.jpg",
      "/images/projects/curvita/30.jpg",
      "/images/projects/curvita/31.jpg",
      "/images/projects/curvita/34.jpg",
      "/images/projects/curvita/35.jpg",
      "/images/projects/curvita/36.jpg",
      "/images/projects/curvita/37.jpg",
      "/images/projects/curvita/38.jpg",
      "/images/projects/curvita/42.jpg",
      "/images/projects/curvita/43.jpg",
      "/images/projects/curvita/45.jpg",
      "/images/projects/curvita/46.jpg",
      "/images/projects/curvita/47.jpg",
      "/images/projects/curvita/49.jpg",
      "/images/projects/curvita/50.jpg",
      "/images/projects/curvita/51.jpg",
      "/images/projects/curvita/52.jpg",
      "/images/projects/curvita/54.jpg",
      "/images/projects/curvita/55.jpg",
      "/images/projects/curvita/56.jpg",
      "/images/projects/curvita/57.jpg",
      "/images/projects/curvita/58.jpg",
      "/images/projects/curvita/59.jpg",
      "/images/projects/curvita/62.jpg",
      "/images/projects/curvita/Curvita-Octobre-rose/oct-1.jpeg",
      "/images/projects/curvita/Curvita-Octobre-rose/oct-2.jpeg",
      "/images/projects/curvita/Curvita-Octobre-rose/oct-3.jpeg",
      "/images/projects/curvita/Curvita-Octobre-rose/oct-4.jpeg",
      "/images/projects/curvita/Curvita-Octobre-rose/oct-5.jpeg",
      "/images/projects/curvita/Curvita-Octobre-rose/oct-6.jpeg",
      "/images/projects/curvita/Curvita-Octobre-rose/oct-7.jpeg",
      "/images/projects/curvita/Curvita-Octobre-rose/oct-8.jpeg",
      "/images/projects/curvita/Curvita-Octobre-rose/oct-9.jpeg",
      "/images/projects/curvita/Curvita-Octobre-rose/oct-10.jpeg",
      "/images/projects/curvita/Curvita-Octobre-rose/oct-11.jpeg",
      "/images/projects/curvita/Curvita-Octobre-rose/oct-12.jpeg",
      "/images/projects/curvita/Curvita-Octobre-rose/oct-13.jpeg",
    ],
    gallerySections: [
      {
        title: "Skincare Routine",
        images: [
          "/images/projects/curvita/11.jpg",
          "/images/projects/curvita/12.jpg",
          "/images/projects/curvita/13.jpg",
          "/images/projects/curvita/14.jpg",
          "/images/projects/curvita/15.jpg",
          "/images/projects/curvita/16.jpg",
          "/images/projects/curvita/19.jpg",
          "/images/projects/curvita/20.jpg",
          "/images/projects/curvita/24.jpg",
          "/images/projects/curvita/25.jpg",
          "/images/projects/curvita/26.jpg",
          "/images/projects/curvita/27.jpg",
          "/images/projects/curvita/29.jpg",
          "/images/projects/curvita/30.jpg",
          "/images/projects/curvita/31.jpg",
          "/images/projects/curvita/34.jpg",
          "/images/projects/curvita/35.jpg",
          "/images/projects/curvita/36.jpg",
          "/images/projects/curvita/37.jpg",
          "/images/projects/curvita/38.jpg",
          "/images/projects/curvita/42.jpg",
          "/images/projects/curvita/43.jpg",
          "/images/projects/curvita/45.jpg",
          "/images/projects/curvita/46.jpg",
          "/images/projects/curvita/47.jpg",
          "/images/projects/curvita/49.jpg",
          "/images/projects/curvita/50.jpg",
          "/images/projects/curvita/51.jpg",
          "/images/projects/curvita/52.jpg",
          "/images/projects/curvita/54.jpg",
          "/images/projects/curvita/55.jpg",
          "/images/projects/curvita/56.jpg",
          "/images/projects/curvita/57.jpg",
          "/images/projects/curvita/58.jpg",
          "/images/projects/curvita/59.jpg",
          "/images/projects/curvita/62.jpg",
        ],
      },
      {
        title: "Pink October Campaign",
        images: [
          "/images/projects/curvita/Curvita-Octobre-rose/oct-1.jpeg",
          "/images/projects/curvita/Curvita-Octobre-rose/oct-2.jpeg",
          "/images/projects/curvita/Curvita-Octobre-rose/oct-3.jpeg",
          "/images/projects/curvita/Curvita-Octobre-rose/oct-4.jpeg",
          "/images/projects/curvita/Curvita-Octobre-rose/oct-5.jpeg",
          "/images/projects/curvita/Curvita-Octobre-rose/oct-6.jpeg",
          "/images/projects/curvita/Curvita-Octobre-rose/oct-7.jpeg",
          "/images/projects/curvita/Curvita-Octobre-rose/oct-8.jpeg",
          "/images/projects/curvita/Curvita-Octobre-rose/oct-9.jpeg",
          "/images/projects/curvita/Curvita-Octobre-rose/oct-10.jpeg",
          "/images/projects/curvita/Curvita-Octobre-rose/oct-11.jpeg",
          "/images/projects/curvita/Curvita-Octobre-rose/oct-12.jpeg",
          "/images/projects/curvita/Curvita-Octobre-rose/oct-13.jpeg",
        ],
      },
    ],
    author: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
      bio: "Design strategist and visual storyteller",
    },
    content: {
      introduction: "An educational social media series created for Curvita, a premium Tunisian parapharmacy guiding customers through science-backed skincare routines.",
      sections: [
        {
          heading: "Concept & Strategy",
          content: "Structured an easy-to-follow 4-step routine (Cleanse, Hydrate, Protect, Restore) for oily and combination skin, demystifying skincare through approachable, empathetic visual guidance.",
        },
        {
          heading: "Visual Execution",
          content: "Vibrant color-coded split layouts pairing diverse lifestyle imagery with clear pharmacy product placements (La Roche-Posay, Avène, SVR, Uriage) and soft feminine typography.",
        },
        {
          heading: "Deliverables & Impact",
          content: "Engaging 5-slide educational carousel that drove record save rates, community shares, and qualified purchase inquiries across Instagram.",
        },
      ],
      conclusion: "Combines dermatological clarity with vibrant lifestyle design to build authentic consumer trust and retail desire.",
    },
    keySkills: ["Educational Content Design", "Dermocosmetics Branding", "Color-Coded Routine Flow", "Multi-brand Layouts"],
    deliverablesCount: "5-Slide Carousel",
    tags: ["skincare content", "dermocosmetics", "educational design", "beauty branding"],
  },
  {
    id: "005",
    title: "Uniconfort",
    subtitle: "Social Media & Promotional Identity",
    category: "Retail",
    date: "Apr 21, 2025",
    readTime: "5 min",
    image: "/images/projects/uniconfort/Uniconfort-thumbnail.jpg",
    gallery: [
      "/images/projects/uniconfort/1.jpg",
      "/images/projects/uniconfort/2.png",
      "/images/projects/uniconfort/3.jpg",
      "/images/projects/uniconfort/4.jpg",
      "/images/projects/uniconfort/5.jpg",
      "/images/projects/uniconfort/6.jpg",
      "/images/projects/uniconfort/7.png",
      "/images/projects/uniconfort/8.jpg",
      "/images/projects/uniconfort/9.jpg",
      "/images/projects/uniconfort/10.jpg",
    ],
    author: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
      bio: "Enterprise solutions architect",
    },
    content: {
      introduction: "A versatile promotional and social media identity system for Uniconfort, a major retailer of sanitary fixtures, heating, and HVAC equipment in Tunisia.",
      sections: [
        {
          heading: "Concept & Strategy",
          content: "Balanced an inspirational home-renovation brand campaign with high-impact retail promotional posts emphasizing seasonal pricing and partner brand trust.",
        },
        {
          heading: "Visual Execution",
          content: "High-contrast yellow and charcoal grid with prominent price badges, promotional ribbons, and clean integrations of partner logos (Grohe, Remer, Chaffoteaux).",
        },
        {
          heading: "Deliverables & Impact",
          content: "Full suite of 10 promotional assets across water heating, air conditioning, and sanitary fittings that stimulated immediate showroom visits and sales inquiries.",
        },
      ],
      conclusion: "Demonstrates practical commercial agility, delivering high-conversion retail promotions without compromising brand consistency.",
    },
    keySkills: ["Retail Promotional Design", "Home Improvement Marketing", "Pricing Callout Hierarchy", "Brand Synergy (Grohe, Remer)"],
    deliverablesCount: "10 Retail & Ad Assets",
    tags: ["retail marketing", "product promotion", "home improvement", "brand identity"],
  },
  {
    id: "006",
    title: "Winkler",
    subtitle: "Corporate Brochure",
    category: "Corporate",
    date: "Jun 10, 2025",
    readTime: "5 min",
    image: "/images/projects/winkler/Winkler-thumbnail.jpg",
    gallery: [
      "/images/projects/winkler/2.png",
      "/images/projects/winkler/3.png",
      "/images/projects/winkler/4.png",
      "/images/projects/winkler/5.png",
      "/images/projects/winkler/6.png",
      "/images/projects/winkler/7.png",
      "/images/projects/winkler/8.png",
      "/images/projects/winkler/9.png",
      "/images/projects/winkler/10.png",
      "/images/projects/winkler/11.jpg",
      "/images/projects/winkler/12.jpg",
      "/images/projects/winkler/13.jpg",
      "/images/projects/winkler/14.png",
      "/images/projects/winkler/15.png",
      "/images/projects/winkler/16.jpg",
      "/images/projects/winkler/17.jpg",
      "/images/projects/winkler/18.jpg",
      "/images/projects/winkler/19.jpg",
      "/images/projects/winkler/20.jpg",
      "/images/projects/winkler/21.png",
      "/images/projects/winkler/22.png",
      "/images/projects/winkler/23.png",
      "/images/projects/winkler/24.png",
      "/images/projects/winkler/25.png",
      "/images/projects/winkler/26.png",
      "/images/projects/winkler/27.png",
      "/images/projects/winkler/28.png",
      "/images/projects/winkler/29.png",
    ],
    gallerySections: [
      {
        title: "First Catalog",
        images: [
          "/images/projects/winkler/2.png",
          "/images/projects/winkler/3.png",
          "/images/projects/winkler/4.png",
          "/images/projects/winkler/5.png",
          "/images/projects/winkler/6.png",
          "/images/projects/winkler/7.png",
        ],
      },
      {
        title: "Bifold",
        images: [
          "/images/projects/winkler/8.png",
          "/images/projects/winkler/9.png",
          "/images/projects/winkler/10.png",
        ],
      },
      {
        title: "Flyer",
        images: [
          "/images/projects/winkler/11.jpg",
          "/images/projects/winkler/12.jpg",
          "/images/projects/winkler/13.jpg",
        ],
      },
      {
        title: "Posters",
        images: [
          "/images/projects/winkler/14.png",
          "/images/projects/winkler/15.png",
          "/images/projects/winkler/16.jpg",
          "/images/projects/winkler/17.jpg",
          "/images/projects/winkler/18.jpg",
          "/images/projects/winkler/19.jpg",
          "/images/projects/winkler/20.jpg",
        ],
      },
      {
        title: "Business Card",
        images: [
          "/images/projects/winkler/21.png",
          "/images/projects/winkler/22.png",
          "/images/projects/winkler/23.png",
        ],
      },
      {
        title: "Banner",
        images: [
          "/images/projects/winkler/24.png",
        ],
      },
      {
        title: "Second Catalog",
        images: [
          "/images/projects/winkler/25.png",
          "/images/projects/winkler/26.png",
          "/images/projects/winkler/27.png",
          "/images/projects/winkler/28.png",
          "/images/projects/winkler/29.png",
        ],
      },
    ],
    author: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
      bio: "Design strategist and visual storyteller",
    },
    content: {
      introduction: "A complete print identity and technical documentation ecosystem created for Winkler AG, a leading German manufacturer of industrial electric heating solutions.",
      sections: [
        {
          heading: "Concept & Strategy",
          content: "Built a modular brochure architecture enabling sales engineers to present specific product lines (PILZ® mantles, silicone heaters, ATEX systems) with technical precision and German engineering prestige.",
        },
        {
          heading: "Visual Execution",
          content: "Signature diagonal cut-line visual motif in Winkler red and carbon grey, paired with structured specification tables, bilingual nomenclature, and high-precision schematics.",
        },
        {
          heading: "Deliverables & Impact",
          content: "Comprehensive collateral system: 2 product catalogs (29 pages), bifold brochures, exhibition roll-ups, flyers, QR-enabled business cards, and branded packaging tape.",
        },
      ],
      conclusion: "Demonstrates master-level control of large-scale, multi-format technical print design for an international engineering leader.",
    },
    keySkills: ["Global Print Architecture", "Bilingual Technical Catalogs", "Trade Show Booth Collateral", "German Engineering Standards"],
    deliverablesCount: "29-Page Collateral Suite",
    tags: ["corporate brochure", "print design", "brand identity", "industrial branding"],
  },
];

export function getArticleById(id: string): Article | undefined {
  return articles.find(article => article.id === id);
}

export function getRelatedArticles(currentId: string, limit: number = 3): Article[] {
  const currentArticle = getArticleById(currentId);
  if (!currentArticle) return articles.slice(0, limit);
  
  // Get articles from the same category, excluding current
  const related = articles.filter(
    article => article.id !== currentId && article.category === currentArticle.category
  );
  
  // If not enough from same category, add others
  if (related.length < limit) {
    const others = articles.filter(
      article => article.id !== currentId && article.category !== currentArticle.category
    );
    return [...related, ...others].slice(0, limit);
  }
  
  return related.slice(0, limit);
}
