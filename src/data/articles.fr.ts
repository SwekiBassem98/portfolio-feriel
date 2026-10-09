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
    title: "MODERNA",
    subtitle: "Identité sur les réseaux sociaux",
    category: "Industriel",
    date: "16 Oct 2024",
    readTime: "5 min",
    image: "/images/projects/moderna/1.png",
    gallery: [
      "/images/projects/moderna/1.png","/images/projects/moderna/2.png","/images/projects/moderna/3.png","/images/projects/moderna/4.png","/images/projects/moderna/5.png","/images/projects/moderna/6.png","/images/projects/moderna/7.png","/images/projects/moderna/8.png","/images/projects/moderna/9.png","/images/projects/moderna/10.png","/images/projects/moderna/11.png","/images/projects/moderna/12.png","/images/projects/moderna/13.png","/images/projects/moderna/14.png","/images/projects/moderna/15.png","/images/projects/moderna/16.png","/images/projects/moderna/17.png","/images/projects/moderna/18.png","/images/projects/moderna/19.png","/images/projects/moderna/20.png","/images/projects/moderna/21.png"
    ],
    author: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
      bio: "Rédacteur spécialisé dans le bien-être financier et défenseur du développement personnel",
    },
    content: {
      introduction: "Ce projet présente l'identité sur les réseaux sociaux créée pour MODERNA, une entreprise tunisienne de construction et fabrication métallique basée à Nabeul, spécialisée dans la découpe laser, le poinçonnage, le pliage et la soudure métallique pour des clients industriels et professionnels. J'ai développé un système de contenu Instagram cohérent qui traduit l'expertise industrielle de la marque en un storytelling visuel percutant à fort contraste.",
      sections: [
        {
          heading: "Concept & Stratégie",
          content: "La direction créative vise à communiquer la précision industrielle et la maîtrise technique à travers le contraste visuel : des environnements d'usine sombres et texturés associés à une typographie nette et à fort impact. Chaque publication est construite autour d'un message clair unique, faisant du feed une vitrine modulaire plutôt qu'un mélange dispersé de contenu. La stratégie s'appuie sur des images authentiques d'atelier pour ancrer la marque dans une capacité de production réelle.",
        },
        {
          heading: "Exécution visuelle",
          content: "La palette est ancrée dans le jaune signature de MODERNA contrasté avec le noir, le blanc et la photographie industrielle désaturée. La typographie est bold et condensée pour les titres. Une formule de mise en page récurrente confère au feed une structure disciplinée et répétable, rendant le contenu facile à scanner même pour un secteur technique.",
        },
        {
          heading: "Livrables & Impact",
          content: "Les livrables consistent en un ensemble complet de publications Instagram couvrant les points forts des services, les propositions de valeur, les partenariats d'équipements, le contenu motivationnel et culture d'équipe, les vœux saisonniers et les CTA vers le site web. Ensemble, ces publications forment une bibliothèque de contenu cohérente qui renforce la présence digitale de MODERNA.",
        },
      ],
      conclusion: "À travers ce projet, je démontre ma capacité à adapter le design d'identité visuelle à un contexte industriel B2B technique sans perdre l'impact créatif. Mon rôle a consisté à définir un langage visuel cohérent et à l'appliquer sur l'ensemble d'un set de contenu réseaux sociaux.",
    },
    keySkills: ["Direction artistique industrielle", "Typographie à fort contraste", "Systèmes sociaux B2B", "Retouche photo"],
    deliverablesCount: "21 visuels pour les réseaux sociaux",
    tags: ["fabrication métallique", "design industriel", "branding réseaux sociaux", "marketing B2B"],
  },
  {
    id: "002",
    title: "Il Mercato",
    subtitle: "Identité sur les réseaux sociaux",
    category: "Alimentation",
    date: "23 Oct 2024",
    readTime: "6 min",
    image: "/images/projects/ilmercato/1.jpg",
    gallery: [
      "/images/projects/ilmercato/1.jpg","/images/projects/ilmercato/2.jpg","/images/projects/ilmercato/3.png","/images/projects/ilmercato/4.png","/images/projects/ilmercato/5.jpg","/images/projects/ilmercato/6.png","/images/projects/ilmercato/7.png","/images/projects/ilmercato/8.png","/images/projects/ilmercato/9.png","/images/projects/ilmercato/10.png","/images/projects/ilmercato/11.jpg","/images/projects/ilmercato/12.jpg","/images/projects/ilmercato/13.jpg","/images/projects/ilmercato/14.jpg","/images/projects/ilmercato/15.jpg"
    ],
    author: {
      name: "Sofia Rodriguez",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
      bio: "Rédactrice créative et praticienne de la pleine conscience",
    },
    content: {
      introduction: "Ce projet présente l'identité visuelle sur les réseaux sociaux développée pour Il Mercato, une épicerie fine à Nabeul, en Tunisie, offrant une sélection soignée de produits gourmets et méditerranéens. J'ai conçu un système de contenu raffiné pour le feed Instagram de la marque, associant une photographie de produits élégante à des mises en page chaleureuses de style éditorial.",
      sections: [
        {
          heading: "Concept & Stratégie",
          content: "La direction créative positionne Il Mercato comme un fournisseur de délicatesses authentiques et premium, utilisant une photographie de produits rapprochés et stylisés pour évoquer l'indulgence et le savoir-faire artisanal. Chaque publication est dédiée à un produit vedette unique, permettant à la marque d'éduquer et d'attirer son audience une spécialité à la fois.",
        },
        {
          heading: "Exécution visuelle",
          content: "L'identité repose sur la logotype manuscrite élégante signature de la marque associée à des titres en sans-serif épuré. Les palettes de couleurs varient selon la publication pour compléter l'aliment présenté, tandis qu'une couleur d'accent rouge constante est utilisée pour les tags d'appel à l'action. La photographie est stylisée dans un format plongée rappelant les éditoriaux gastronomiques.",
        },
        {
          heading: "Livrables & Impact",
          content: "Les livrables incluent une série de publications Instagram dédiées chacune à la présentation d'une ligne de produits gourmets spécifique, ainsi que des visuels d'emballage et une publication saisonnière de vœux Ramadan. L'utilisation constante de la typographie signature donne un feed cohérent et reconnaissable qui renforce le positionnement de la boutique comme destination premium.",
        },
      ],
      conclusion: "À travers ce projet, je démontre une sensibilité raffinée pour le branding alimentaire et lifestyle, adaptant le ton visuel produit par produit tout en maintenant une identité de marque unifiée. Mon rôle a consisté à structurer chaque publication pour mettre en valeur l'attrait sensoriel de la sélection gourmet d'Il Mercato.",
    },
    keySkills: ["Branding artisanal", "Direction du styling culinaire", "Harmonnie typo éditoriale", "Stratégie réseaux sociaux"],
    deliverablesCount: "15 visuels gourmet",
    tags: ["photographie alimentaire", "branding gourmet", "épicerie fine", "design réseaux sociaux"],
  },
  {
    id: "003",
    title: "CBSS",
    subtitle: "Brochure corporate",
    category: "Corporate",
    date: "4 Déc 2024",
    readTime: "5 min",
    image: "/images/projects/cbss/1.png",
    gallery: [
      "/images/projects/cbss/1.png","/images/projects/cbss/2.png","/images/projects/cbss/3.png","/images/projects/cbss/4.png","/images/projects/cbss/5.png","/images/projects/cbss/6.png","/images/projects/cbss/7.png"
    ],
    pdfUrl: "/images/projects/cbss/finale.pdf",
    author: {
      name: "Marcus Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      bio: "Constructeur communautaire et écrivain contemplatif",
    },
    content: {
      introduction: "Ce projet présente la conception de la brochure corporate créée pour CBSS (Safety For Business), une entreprise tunisienne spécialisée dans les systèmes de sécurité électronique et de protection incendie, basée à Nabeul et Hammamet depuis 2016. J'ai conçu un document de profil d'entreprise multipages qui présente l'expertise, les services et les certifications de la marque dans un format structuré et professionnel.",
      sections: [
        {
          heading: "Concept & Stratégie",
          content: "La brochure est structurée comme un profil d'entreprise séquentiel, guidant le lecteur depuis la mission de CBSS à travers ses champs d'activité, ses services, ses certifications, son processus et ses partenaires. La stratégie met l'accent sur la crédibilité et la confiance, consacrant des doubles pages entières aux certifications et aux partenaires financiers.",
        },
        {
          heading: "Exécution visuelle",
          content: "Le design utilise un système de grille cohérent sur l'ensemble des spreads, avec des onglets rouges numérotés guidant le lecteur dans un ordre de lecture clair. La palette est construite autour du rouge signature de CBSS, associé à des espaces blancs et à un texte gris foncé pour un rendu épuré et corporate.",
        },
        {
          heading: "Livrables & Impact",
          content: "Le livrable est une brochure corporate multipages complète couvrant la présentation de CBSS, ses services, ses certifications, son processus commercial, ses partenaires et ses références clients. Le document fonctionne comme un outil commercial et de crédibilité complet, adapté aux réunions clients et aux présentations partenaires.",
        },
      ],
      conclusion: "À travers ce projet, je démontre ma capacité à structurer un contenu B2B dense et technique en un outil de communication print clair et professionnel, transformant l'offre d'une entreprise de sécurité technique en une brochure corporate accessible et prête pour les affaires.",
    },
    keySkills: ["Design print corporatif", "Architecture de l'information", "Systèmes de grille éditoriale", "Schémas techniques"],
    deliverablesCount: "7 pages étalées",
    tags: ["brochure corporate", "design print", "branding B2B", "industrie de la sécurité"],
  },
  {
    id: "004",
    title: "Curvita",
    subtitle: "Contenu éducatif",
    category: "Beauté",
    date: "21 Avr 2025",
    readTime: "6 min",
    image: "/images/projects/curvita/aloha-gold.jpg",
    gallery: [
      "/images/projects/curvita/11.jpg","/images/projects/curvita/12.jpg","/images/projects/curvita/13.jpg","/images/projects/curvita/14.jpg","/images/projects/curvita/15.jpg","/images/projects/curvita/16.jpg","/images/projects/curvita/19.jpg","/images/projects/curvita/20.jpg","/images/projects/curvita/24.jpg","/images/projects/curvita/25.jpg","/images/projects/curvita/26.jpg","/images/projects/curvita/27.jpg","/images/projects/curvita/29.jpg","/images/projects/curvita/30.jpg","/images/projects/curvita/31.jpg","/images/projects/curvita/34.jpg","/images/projects/curvita/35.jpg","/images/projects/curvita/36.jpg","/images/projects/curvita/37.jpg","/images/projects/curvita/38.jpg","/images/projects/curvita/42.jpg","/images/projects/curvita/43.jpg","/images/projects/curvita/45.jpg","/images/projects/curvita/46.jpg","/images/projects/curvita/47.jpg","/images/projects/curvita/49.jpg","/images/projects/curvita/50.jpg","/images/projects/curvita/51.jpg","/images/projects/curvita/52.jpg","/images/projects/curvita/54.jpg","/images/projects/curvita/55.jpg","/images/projects/curvita/56.jpg","/images/projects/curvita/57.jpg","/images/projects/curvita/58.jpg","/images/projects/curvita/59.jpg","/images/projects/curvita/62.jpg","/images/projects/curvita/Curvita-Octobre-rose/oct-1.jpeg","/images/projects/curvita/Curvita-Octobre-rose/oct-2.jpeg","/images/projects/curvita/Curvita-Octobre-rose/oct-3.jpeg","/images/projects/curvita/Curvita-Octobre-rose/oct-4.jpeg","/images/projects/curvita/Curvita-Octobre-rose/oct-5.jpeg","/images/projects/curvita/Curvita-Octobre-rose/oct-6.jpeg","/images/projects/curvita/Curvita-Octobre-rose/oct-7.jpeg","/images/projects/curvita/Curvita-Octobre-rose/oct-8.jpeg","/images/projects/curvita/Curvita-Octobre-rose/oct-9.jpeg","/images/projects/curvita/Curvita-Octobre-rose/oct-10.jpeg","/images/projects/curvita/Curvita-Octobre-rose/oct-11.jpeg","/images/projects/curvita/Curvita-Octobre-rose/oct-12.jpeg","/images/projects/curvita/Curvita-Octobre-rose/oct-13.jpeg"
    ],
    gallerySections: [
      {
        title: "Routine de soin",
        images: [
          "/images/projects/curvita/11.jpg","/images/projects/curvita/12.jpg","/images/projects/curvita/13.jpg","/images/projects/curvita/14.jpg","/images/projects/curvita/15.jpg","/images/projects/curvita/16.jpg","/images/projects/curvita/19.jpg","/images/projects/curvita/20.jpg","/images/projects/curvita/24.jpg","/images/projects/curvita/25.jpg","/images/projects/curvita/26.jpg","/images/projects/curvita/27.jpg","/images/projects/curvita/29.jpg","/images/projects/curvita/30.jpg","/images/projects/curvita/31.jpg","/images/projects/curvita/34.jpg","/images/projects/curvita/35.jpg","/images/projects/curvita/36.jpg","/images/projects/curvita/37.jpg","/images/projects/curvita/38.jpg","/images/projects/curvita/42.jpg","/images/projects/curvita/43.jpg","/images/projects/curvita/45.jpg","/images/projects/curvita/46.jpg","/images/projects/curvita/47.jpg","/images/projects/curvita/49.jpg","/images/projects/curvita/50.jpg","/images/projects/curvita/51.jpg","/images/projects/curvita/52.jpg","/images/projects/curvita/54.jpg","/images/projects/curvita/55.jpg","/images/projects/curvita/56.jpg","/images/projects/curvita/57.jpg","/images/projects/curvita/58.jpg","/images/projects/curvita/59.jpg","/images/projects/curvita/62.jpg"
        ],
      },
      {
        title: "Campagne Octobre Rose",
        images: [
          "/images/projects/curvita/Curvita-Octobre-rose/oct-1.jpeg","/images/projects/curvita/Curvita-Octobre-rose/oct-2.jpeg","/images/projects/curvita/Curvita-Octobre-rose/oct-3.jpeg","/images/projects/curvita/Curvita-Octobre-rose/oct-4.jpeg","/images/projects/curvita/Curvita-Octobre-rose/oct-5.jpeg","/images/projects/curvita/Curvita-Octobre-rose/oct-6.jpeg","/images/projects/curvita/Curvita-Octobre-rose/oct-7.jpeg","/images/projects/curvita/Curvita-Octobre-rose/oct-8.jpeg","/images/projects/curvita/Curvita-Octobre-rose/oct-9.jpeg","/images/projects/curvita/Curvita-Octobre-rose/oct-10.jpeg","/images/projects/curvita/Curvita-Octobre-rose/oct-11.jpeg","/images/projects/curvita/Curvita-Octobre-rose/oct-12.jpeg","/images/projects/curvita/Curvita-Octobre-rose/oct-13.jpeg"
        ],
      },
    ],
    author: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
      bio: "Stratège en design et conteur visuel",
    },
    content: {
      introduction: "Ce projet présente la série de contenu sur les réseaux sociaux créée pour Curvita, une parapharmacie tunisienne proposant des produits dermocosmétiques et de soin de la peau des principales marques pharmaceutiques. J'ai conçu un carrousel éducatif Instagram dédié aux routines de soin pour peaux mixtes à grasses.",
      sections: [
        {
          heading: "Concept & Stratégie",
          content: "Le concept créatif est centré sur l'éducation skincare, structurant le carrousel comme une routine numérotée étape par étape adaptée aux peaux mixtes et grasses. Ce format positionne Curvita comme un guide knowledgeable, établissant la confiance auprès d'un audience à la recherche de conseils skincare fiables.",
        },
        {
          heading: "Exécution visuelle",
          content: "Chaque diapositive suit une mise en page split-screen cohérente, permettant au design de changer de couleur par étape tout en maintenant un rythme structurel unifié. Des badges circulaires numérotés guident le spectateur à travers la routine en séquence. La typographie combine un sans-serif bold pour les instructions avec un script doux pour la messagerie secondaire.",
        },
        {
          heading: "Livrables & Impact",
          content: "Le livrable est un post carrousel Instagram formant un guide complet de routine skincare pour peaux mixtes et grasses. Ce format encourage les sauvegardes et les partages en offrant une valeur éducative authentique tout en présentant un large assortiment du catalogue de la parapharmacie.",
        },
      ],
      conclusion: "À travers ce projet, je démontre ma capacité à fusionner contenu éducatif et présentation commerciale de produits dans un format visuellement cohérent, aidant la marque à établir la confiance tout en présentant sa vaste gamme de produits dermocosmétiques.",
    },
    keySkills: ["Design de contenu éducatif", "Branding dermocosmétique", "Flux de routine codé par couleur", "Maquettes multi-marques"],
    deliverablesCount: "Carrousel de 5 diaposititions",
    tags: ["contenu skincare", "dermocosmétique", "design éducatif", "branding beauté"],
  },
  {
    id: "005",
    title: "Uniconfort",
    subtitle: "Identité sur les réseaux sociaux et promotionnelle",
    category: "Retail",
    date: "21 Avr 2025",
    readTime: "5 min",
    image: "/images/projects/uniconfort/1.jpg",
    gallery: [
      "/images/projects/uniconfort/1.jpg","/images/projects/uniconfort/2.png","/images/projects/uniconfort/3.jpg","/images/projects/uniconfort/4.jpg","/images/projects/uniconfort/5.jpg","/images/projects/uniconfort/6.jpg","/images/projects/uniconfort/7.png","/images/projects/uniconfort/8.jpg","/images/projects/uniconfort/9.jpg","/images/projects/uniconfort/10.jpg"
    ],
    author: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
      bio: "Architecte solutions entreprise",
    },
    content: {
      introduction: "Ce projet présente l'identité visuelle sur les réseaux sociaux et promotionnelle créée pour Uniconfort, un détaillant tunisien spécialisé dans les équipements sanitaires, les robinetteries, les chauffe-eau et les systèmes de climatisation. J'ai conçu un système de contenu polyvalent construit autour de l'identité industrielle jaune et noir d'Uniconfort.",
      sections: [
        {
          heading: "Concept & Stratégie",
          content: "La direction créative équilibre deux registres distincts : une campagne de marque émotionnelle et un catalogue de publications promotionnelles produits propres conçues pour générer des ventes directes. Chaque publication est adaptée à sa catégorie pour correspondre à la façon dont chaque produit est vécu par le client.",
        },
        {
          heading: "Exécution visuelle",
          content: "L'identité est ancrée dans le schéma jaune et sombre d'Uniconfort, avec une typographie bold et condensée et un ruban rouge PROMO utilisé pour une reconnaissance instantanée. Les publications produits privilégient une mise en page clean et à fort contraste avec prix affiché en grands chiffres.",
        },
        {
          heading: "Livrables & Impact",
          content: "Les livrables incluent un visuel de campagne de marque, plusieurs publications promotionnelles produits et des mises en avant de marques partenaires. Chaque publication est structurée pour convertir la navigation en intention d'achat, donnant à Uniconfort une présence digitale cohérente et orientée retail.",
        },
      ],
      conclusion: "À travers ce projet, je démontre ma polyvalence à adapter une identité de marque unique à travers du contenu de campagne émotionnel et des promotions produits à fort taux de conversion.",
    },
    keySkills: ["Design promotionnel retail", "Marketing bricolage", "Hiérarchie des prix", "Synergie de marque (Grohe, Remer)"],
    deliverablesCount: "10 visuels retail & publicitaires",
    tags: ["marketing retail", "promotion produits", "amélioration domiciliaire", "identité de marque"],
  },
  {
    id: "006",
    title: "Winkler",
    subtitle: "Brochure corporate",
    category: "Corporate",
    date: "10 Juin 2025",
    readTime: "5 min",
    image: "/images/projects/winkler/0.png",
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
        title: "Premier catalogue",
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
        title: "Dépliant bifold",
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
        title: "Affiches",
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
        title: "Carte de visite",
        images: [
          "/images/projects/winkler/21.png",
          "/images/projects/winkler/22.png",
          "/images/projects/winkler/23.png",
        ],
      },
      {
        title: "Bannière",
        images: [
          "/images/projects/winkler/24.png",
        ],
      },
      {
        title: "Deuxième catalogue",
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
      bio: "Stratège en design et conteur visuel",
    },
    content: {
      introduction: "Un écosystème complet d'outils print et de documentation technique conçu pour Winkler AG, fabricant allemand de référence en solutions de chauffage électrique industriel.",
      sections: [
        {
          heading: "Concept & Stratégie",
          content: "Architecture de brochures modulaire permettant aux ingénieurs commerciaux de présenter des gammes ciblées (creusets PILZ®, éléments silicone, systèmes ATEX) avec une rigueur technique exemplaire.",
        },
        {
          heading: "Exécution visuelle",
          content: "Motif visuel signature en découpe diagonale aux couleurs rouge et gris Winkler, combiné à des grilles de spécifications claires, schémas isométriques et typographie bilingue.",
        },
        {
          heading: "Livrables & Impact",
          content: "Système complet de 2 catalogues produits (29 pages), dépliants bifold, roll-ups d'exposition, flyers, cartes de visite avec QR code et ruban d'emballage logoté.",
        },
      ],
      conclusion: "Démontre une maîtrise avancée de la conception print technique à grande échelle pour un acteur industriel international de premier plan.",
    },
    keySkills: ["Architecture print globale", "Catalogues techniques bilingues", "Supports de salon", "Normes d'ingénierie allemandes"],
    deliverablesCount: "Suite de supports de 29 pages",
    tags: ["brochure corporate", "design print", "identité de marque", "branding industriel"],
  },
];

export function getArticleById(id: string): Article | undefined {
  return articles.find(article => article.id === id);
}

export function getRelatedArticles(currentId: string, limit: number = 3): Article[] {
  const currentArticle = getArticleById(currentId);
  if (!currentArticle) return articles.slice(0, limit);
  const related = articles.filter(article => article.id !== currentId && article.category === currentArticle.category);
  if (related.length < limit) {
    const others = articles.filter(article => article.id !== currentId && article.category !== currentArticle.category);
    return [...related, ...others].slice(0, limit);
  }
  return related.slice(0, limit);
}
