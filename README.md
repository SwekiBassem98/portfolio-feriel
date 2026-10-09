# Feriel Bouzid — Portfolio

Portfolio of Feriel Bouzid, graphic designer (brand, print & social media), based in Nabeul, Tunisia.

Built with **Vite + React + TypeScript + Tailwind CSS**, bilingual (EN/FR), light/dark themes, and a CSS-only motion system (`src/motion.css`).

## Run locally

Requires Node.js 18.18+ (Node 20 recommended, see `.nvmrc`).

```sh
npm ci
npm run dev        # http://localhost:3000
npm run build      # production build into dist/
npm run preview    # serve the production build
npm run lint
npm run typecheck
```

## Deploy on Vercel

The repository is ready for Vercel: `vercel.json` sets the build and the SPA routing.

1. Push the repository to GitHub.
2. On [vercel.com/new](https://vercel.com/new), import the repository. Vercel detects **Vite** automatically. The settings already come from `vercel.json`:
   - Install command: `npm ci`
   - Build command: `npm run build`
   - Output directory: `dist`
3. Click **Deploy**. Every push to `main` then deploys production, and every pull request gets a preview URL.

What `vercel.json` handles:

- **Client-side routes:** direct visits and refreshes on `/article/003` etc. are rewritten to `index.html`. Existing files are always served first.
- **Caching:** hashed JS/CSS/fonts in `/assets` are cached for a year (immutable); images for 30 days.
- **Security headers:** `nosniff`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, HSTS.

### Site URL (social previews, canonical, sitemap)

Link previews (WhatsApp, LinkedIn, Facebook, X) need an absolute image URL. At build time the site URL is taken from Vercel's system variable `VERCEL_PROJECT_PRODUCTION_URL`, so it works without any setup.

If you add a custom domain, set an environment variable in **Vercel → Project → Settings → Environment Variables**:

```
SITE_URL=https://your-domain.com
```

The build then writes the URL into the Open Graph tags and `canonical`, and generates `robots.txt` and `sitemap.xml`.

## Images

Original project images live in `public/images/projects/<project>/`. The site serves optimised WebP variants generated next to them:

| Variant | Width | Used for |
|---|---|---|
| `thumbs/sm/<name>.webp` | 480px | grids on phones |
| `thumbs/<name>.webp` | 960px | grids on tablets / desktop |
| `thumbs/xl/<name>.webp` | 1800px | lightbox |
| `<Project>-thumbnail-836.webp` / `-1672.webp` | 836 / 1672px | 16:9 project covers |

The full-resolution originals are left out of the production build to keep the deployment small (~26 MB instead of ~200 MB). Set `KEEP_ORIGINALS=1` to ship them as well.

When you add or replace a project image, regenerate the variants (Python 3 + Pillow) and update the sizes table:

```sh
pip install pillow
python3 scripts/image-variants.py
```

## Content

- Projects (EN / FR): `src/data/articles.en.ts`, `src/data/articles.fr.ts`
- Brand colour, discipline, year and home-page samples per project: `src/data/site.ts`
- Contact details, CV path and social links: `PROFILE` in `src/data/site.ts`. A social link appears only when its URL is filled in.
- Interface copy: `src/i18n/locales/en.json`, `fr.json` (keys under `site.*`)
