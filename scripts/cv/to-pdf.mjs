// Renders scripts/cv/cv-{fr,en}.html to public/cv/*.pdf with headless Chromium.
// Usage:  python3 scripts/cv/build-cv.py && npx -y playwright@1 install chromium && node scripts/cv/to-pdf.mjs
import { chromium } from "playwright";
import path from "node:path";

const dir = path.dirname(new URL(import.meta.url).pathname);
const browser = await chromium.launch();
const page = await browser.newPage();
for (const lang of ["fr", "en"]) {
  await page.goto(`file://${path.join(dir, `cv-${lang}.html`)}`);
  await page.pdf({
    path: path.join(dir, "../../public/cv", `Feriel-Bouzid-CV-${lang.toUpperCase()}.pdf`),
    format: "A4",
    preferCSSPageSize: true,
    tagged: true,
  });
}
await browser.close();
