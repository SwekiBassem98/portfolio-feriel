import { imageSizes } from "./imageSizes";

/** Single source of truth for contact details and the résumé. */
export const PROFILE = {
  name: "Feriel Bouzid",
  email: "ferielbouzzid@gmail.com",
  cvUrl: "/images/projects/CV Feriel Bouzid (1).pdf",
  cvFileName: "Feriel-Bouzid-CV.pdf",
  /**
   * Public profile links. Leave a value empty to hide it — the site never
   * shows a placeholder link. Add the real URLs here when available.
   */
  links: {
    linkedin: "",
    behance: "",
    instagram: "",
  },
} as const;

export type Discipline = "social" | "print";

export interface ProjectMeta {
  /** Brand colour of the client, used as the project's spot colour. */
  accent: string;
  /** Text colour that stays readable on top of `accent`. */
  onAccent: string;
  discipline: Discipline;
  year: string;
  /** Three real pieces from the gallery, shown on the home page spread. */
  samples: [string, string, string];
}

export const projectMeta: Record<string, ProjectMeta> = {
  "001": {
    accent: "#FFD400",
    onAccent: "#141312",
    discipline: "social",
    year: "2024",
    samples: [
      "/images/projects/moderna/12.png",
      "/images/projects/moderna/9.png",
      "/images/projects/moderna/17.png",
    ],
  },
  "002": {
    accent: "#E2574C",
    onAccent: "#141312",
    discipline: "social",
    year: "2024",
    samples: [
      "/images/projects/ilmercato/2.jpg",
      "/images/projects/ilmercato/6.png",
      "/images/projects/ilmercato/10.png",
    ],
  },
  "003": {
    accent: "#E5313A",
    onAccent: "#FFFFFF",
    discipline: "print",
    year: "2024",
    samples: [
      "/images/projects/cbss/1.png",
      "/images/projects/cbss/4.png",
      "/images/projects/cbss/7.png",
    ],
  },
  "004": {
    accent: "#E8435E",
    onAccent: "#FFFFFF",
    discipline: "social",
    year: "2025",
    samples: [
      "/images/projects/curvita/13.jpg",
      "/images/projects/curvita/45.jpg",
      "/images/projects/curvita/49.jpg",
    ],
  },
  "005": {
    accent: "#FCD800",
    onAccent: "#141312",
    discipline: "social",
    year: "2025",
    samples: [
      "/images/projects/uniconfort/1.jpg",
      "/images/projects/uniconfort/7.png",
      "/images/projects/uniconfort/3.jpg",
    ],
  },
  "006": {
    accent: "#E2202C",
    onAccent: "#FFFFFF",
    discipline: "print",
    year: "2025",
    samples: [
      "/images/projects/winkler/0.png",
      "/images/projects/winkler/25.png",
      "/images/projects/winkler/22.png",
    ],
  },
};

export const fallbackMeta: ProjectMeta = {
  accent: "#F44B0B",
  onAccent: "#141312",
  discipline: "social",
  year: "",
  samples: ["", "", ""],
};

export const getProjectMeta = (id: string): ProjectMeta => projectMeta[id] ?? fallbackMeta;

/** Lightweight WebP preview (≤960px) generated next to every project image. */
export const thumb = (src: string): string => {
  if (!src.startsWith("/images/projects/") || src.includes("-thumbnail.")) return src;
  const slash = src.lastIndexOf("/");
  const name = src.slice(slash + 1).replace(/\.(png|jpe?g)$/i, ".webp");
  return `${src.slice(0, slash)}/thumbs/${name}`;
};

/** Intrinsic size of a project image, for width/height attributes. */
export const sizeOf = (src: string): [number, number] => imageSizes[src] ?? [1600, 1600];
