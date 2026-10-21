import { imageSizes } from "./imageSizes";

/** Single source of truth for contact details and the résumé. */
export const PROFILE = {
  name: "Feriel Bouzid",
  email: "ferielbouzzid@gmail.com",
  /** ATS-friendly CVs (single column, real text, no photo), one per site language. */
  cv: {
    en: { url: "/cv/Feriel-Bouzid-CV-EN.pdf", fileName: "Feriel-Bouzid-CV-EN.pdf" },
    fr: { url: "/cv/Feriel-Bouzid-CV-FR.pdf", fileName: "Feriel-Bouzid-CV-FR.pdf" },
  },
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

export type CvLanguage = keyof typeof PROFILE.cv;
/** The CV matching the current site language (falls back to English). */
export const cvFor = (language: string) => PROFILE.cv[(language === "fr" ? "fr" : "en") as CvLanguage];

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
  /**
   * Shape of every gallery cell (CSS aspect-ratio of the previews). A fixed
   * shape keeps the grid identical on every screen, browser and connection.
   */
  galleryRatio: string;
}

export const projectMeta: Record<string, ProjectMeta> = {
  "001": {
    accent: "#FFD400",
    onAccent: "#141312",
    discipline: "social",
    year: "2023–2024",
    galleryRatio: "455 / 480",
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
    galleryRatio: "1 / 1",
    samples: [
      "/images/projects/ilmercato/2.jpg",
      "/images/projects/ilmercato/6.png",
      "/images/projects/ilmercato/10.png",
    ],
  },
  "003": {
    accent: "#E10102",
    onAccent: "#FFFFFF",
    discipline: "print",
    year: "2022",
    galleryRatio: "4 / 3",
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
    year: "2023–2024",
    galleryRatio: "1 / 1",
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
    year: "2024",
    galleryRatio: "1 / 1",
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
    year: "2024–2026",
    galleryRatio: "4 / 3",
    samples: [
      "/images/projects/winkler/0.png",
      "/images/projects/winkler/25.png",
      "/images/projects/winkler/22.png",
    ],
  },
  "007": {
    accent: "#FE0000",
    onAccent: "#FFFFFF",
    discipline: "print",
    year: "2025–2026",
    galleryRatio: "4 / 3",
    samples: [
      "/images/projects/calotex/3.png",
      "/images/projects/calotex/6.png",
      "/images/projects/calotex/8.png",
    ],
  },
};

export const fallbackMeta: ProjectMeta = {
  accent: "#F44B0B",
  onAccent: "#141312",
  discipline: "social",
  year: "",
  samples: ["", "", ""],
  galleryRatio: "1 / 1",
};

/**
 * Display order of the projects (home page, contents, folio numbers and
 * next/previous links). Project ids stay fixed because they are the URLs.
 */
export const PROJECT_ORDER = ["003", "004", "001", "002", "005", "006", "007"];

/** Two-digit folio number of a project in the display order ("01"). */
export const folioOf = (id: string) => String(PROJECT_ORDER.indexOf(id) + 1).padStart(2, "0");

export const getProjectMeta = (id: string): ProjectMeta => projectMeta[id] ?? fallbackMeta;

/* ---------------------------------------------------------------------
   Responsive images. Every project image has WebP variants generated next
   to it (see README → "Images"):
     thumbs/sm/<name>.webp  480w   grids on phones
     thumbs/<name>.webp     960w   grids on tablets / desktop
     thumbs/xl/<name>.webp  1800w  lightbox (instead of 3–8 MB originals)
   and each 16:9 cover has <name>-836.webp / <name>-1672.webp.
   --------------------------------------------------------------------- */
const isProjectImage = (src: string) => src.startsWith("/images/projects/");
const isCover = (src: string) => src.includes("-thumbnail.");
const variant = (src: string, dir: string) => {
  const slash = src.lastIndexOf("/");
  const name = src.slice(slash + 1).replace(/\.(png|jpe?g)$/i, ".webp");
  return `${src.slice(0, slash)}/thumbs/${dir}${name}`;
};

/** 960px WebP preview of a gallery image. */
export const thumb = (src: string): string => (!isProjectImage(src) || isCover(src) ? src : variant(src, ""));

/** srcset for gallery previews (480w / 960w). */
export const thumbSrcSet = (src: string): string | undefined =>
  !isProjectImage(src) || isCover(src) ? undefined : `${variant(src, "sm/")} 480w, ${variant(src, "")} 960w`;

/** Large WebP for the lightbox, with the 960w preview for small screens. */
export const fullSrc = (src: string): string => (!isProjectImage(src) || isCover(src) ? src : variant(src, "xl/"));
export const fullSrcSet = (src: string): string | undefined =>
  !isProjectImage(src) || isCover(src) ? undefined : `${variant(src, "")} 960w, ${variant(src, "xl/")} 1800w`;

/** srcset for the 16:9 project covers (836w / 1672w WebP). */
export const coverSrcSet = (src: string): string | undefined =>
  isCover(src) ? `${src.replace(/\.(jpe?g|png)$/i, "-836.webp")} 836w, ${src.replace(/\.(jpe?g|png)$/i, "-1672.webp")} 1672w` : undefined;

/** Intrinsic size of a project image, for width/height attributes. */
export const sizeOf = (src: string): [number, number] => imageSizes[src] ?? [1600, 1600];
