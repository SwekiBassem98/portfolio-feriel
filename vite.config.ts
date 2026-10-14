import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

/**
 * Public site URL, used for absolute social-preview URLs, the canonical link
 * and the sitemap. On Vercel it is picked up automatically from the system
 * environment variables; set SITE_URL to override (e.g. a custom domain).
 */
const siteUrl = (() => {
  const raw =
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
    "";
  return raw.replace(/\/$/, "");
})();

const PROJECT_IDS = ["001", "002", "003", "004", "005", "006"];

/** Injects the site URL into index.html and emits robots.txt + sitemap.xml. */
const seo = (): Plugin => ({
  name: "portfolio-seo",
  // "pre": runs before Vite parses the HTML (the placeholder is not a valid URL)
  transformIndexHtml: { order: "pre", handler: (html) => html.replace(/%SITE_URL%/g, siteUrl) },
  generateBundle() {
    const lines = ["User-agent: *", "Allow: /"];
    if (siteUrl) {
      lines.push(`Sitemap: ${siteUrl}/sitemap.xml`);
      const urls = ["/", ...PROJECT_IDS.map((id) => `/article/${id}`)]
        .map((p) => `  <url><loc>${siteUrl}${p}</loc></url>`)
        .join("\n");
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
    }
    this.emitFile({ type: "asset", fileName: "robots.txt", source: lines.join("\n") + "\n" });
  },
});

/**
 * The site only serves optimised WebP variants of project images (see
 * src/data/site.ts). The full-resolution originals stay in the repository as
 * source files but are left out of the deployed build: ~200 MB → ~25 MB.
 * Set KEEP_ORIGINALS=1 to ship them anyway.
 */
const pruneOriginals = (): Plugin => ({
  name: "prune-original-images",
  apply: "build",
  closeBundle() {
    if (process.env.KEEP_ORIGINALS) return;
    const root = path.resolve(__dirname, "dist/images/projects");
    if (!fs.existsSync(root)) return;
    let removed = 0;
    const walk = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (entry.name !== "thumbs") walk(p);
        } else if (/\.(png|jpe?g)$/i.test(entry.name) && !entry.name.includes("-thumbnail.")) {
          fs.rmSync(p);
          removed++;
        }
      }
    };
    walk(root);
    console.log(`\n[prune-original-images] left ${removed} full-resolution originals out of dist/`);
  },
});

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "0.0.0.0",
    port: 3000,
    hmr: process.env.DISABLE_HMR !== "true",
    watch: process.env.DISABLE_HMR === "true" ? null : {},
  },
  plugins: [react(), seo(), pruneOriginals()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    rollupOptions: {
      output: {
        // keep the framework in its own long-cached chunk
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          i18n: ["i18next", "react-i18next"],
        },
      },
    },
  },
}));
