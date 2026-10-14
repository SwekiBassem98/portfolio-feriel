"""Source of the ATS-friendly CVs (French + English).

Edit the content below, then regenerate the PDFs:
    python3 scripts/cv/build-cv.py        # writes scripts/cv/cv-fr.html / cv-en.html
    node scripts/cv/to-pdf.mjs            # prints them to public/cv/*.pdf

ATS rules followed: single column, standard section headings, real selectable
text (TrueType font, ligatures off), no photo, icons, tables or text boxes,
contact details in the body, consistent dates. Uses the Carlito font
(metric-compatible with Calibri); install it or swap for Calibri/Arial.
"""
import os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
import json, html, sys
data = {
 "fr": {
  "lang":"fr","title":"Graphiste – Identité visuelle, Print & Réseaux sociaux",
  "contact":["Nabeul, Tunisie","+216 23 331 239","ferielbouzzid@gmail.com"],
  "h":{"profile":"Profil","keys":"Compétences clés","exp":"Expérience professionnelle","edu":"Formation","tools":"Logiciels","soft":"Qualités","lang":"Langues"},
  "profile":"Graphiste polyvalente avec 4 ans d’expérience dans la conception d’identités visuelles, de supports imprimés et de contenus pour les réseaux sociaux. Je maîtrise la chaîne graphique de la conception à la préparation des fichiers pour l’impression, avec une attention particulière à la cohérence de marque, à la mise en page et à la retouche photo. J’aime transformer les idées en visuels cohérents et percutants. Disponible immédiatement, sur site, en hybride ou à distance.",
  "keys":["Identité visuelle et branding","Mise en page print : brochures, catalogues, flyers, affiches, bannières","Création de contenus pour les réseaux sociaux","Retouche photo et photographie produit","Préparation des fichiers pour l’impression"],
  "exp":[
   {"role":"Graphiste","org":"Calotex SARL","place":"Nabeul, Tunisie","dates":"Août 2024 – Présent","bullets":[
     "Conception et mise en page de supports imprimés (brochure d’entreprise, catalogues, flyers, bannières, affiches) avec Adobe InDesign.",
     "Réalisation de séances photo produits et retouche des visuels.",
     "Prises de vue artistiques et reportages photo au sein de l’usine (processus de fabrication, ambiance de travail).",
     "Contribution à la cohérence visuelle de la communication interne."]},
   {"role":"Graphiste & Social Media Manager","org":"Pixel Com","place":"Nabeul, Tunisie","dates":"2022 – 2024","bullets":[
     "Conception de supports visuels imprimés et digitaux (logos, bannières, affiches, flyers, contenus pour les réseaux sociaux) dans le respect de l’identité de marque.",
     "Mise en page professionnelle et retouche photo avancée (correction, optimisation des couleurs, amélioration de la qualité visuelle) pour garantir lisibilité et impact.",
     "Définition et déploiement de stratégies visuelles alignées avec les objectifs de communication digitale ; contribution créative aux brainstormings."]},
   {"role":"Stagiaire Graphiste","org":"27 Images","place":"Hammamet, Tunisie","dates":"2022","bullets":[
     "Élaboration de maquettes pour des brochures, des menus et des documents divers.",
     "Conception de logos, bannières, affiches, flyers et autres supports de communication.",
     "Préparation des fichiers pour l’impression et la publication en ligne."]}],
  "edu":[
   {"role":"Licence en Design Image – Publicité graphique","org":"Institut Supérieur des Beaux-Arts de Nabeul","place":"Tunisie","dates":"2022"},
   {"role":"Baccalauréat – Section Lettres","org":"Lycée Aboukacem Chebbi","place":"Kesra, Siliana, Tunisie","dates":"2019"}],
  "tools":"Adobe Photoshop, Adobe Illustrator, Adobe InDesign, Adobe XD, CorelDRAW",
  "soft":"Esprit collaboratif, sens de la communication, gestion du temps, autonomie et sens des responsabilités",
  "langs":"Arabe : langue maternelle · Français : maîtrise professionnelle · Anglais : maîtrise professionnelle",
  "pdf_title":"Feriel Bouzid – CV – Graphiste",
 },
 "en": {
  "lang":"en","title":"Graphic Designer – Brand Identity, Print & Social Media",
  "contact":["Nabeul, Tunisia","+216 23 331 239","ferielbouzzid@gmail.com"],
  "h":{"profile":"Profile","keys":"Core Skills","exp":"Professional Experience","edu":"Education","tools":"Software","soft":"Soft Skills","lang":"Languages"},
  "profile":"Versatile graphic designer with 4 years of experience creating visual identities, print materials and social media content. Skilled across the full design workflow, from concept to print-ready files, with close attention to brand consistency, layout and photo retouching. I enjoy turning ideas into coherent, impactful visuals. Available immediately for on-site, hybrid or remote work.",
  "keys":["Brand identity and branding","Print layout: brochures, catalogues, flyers, posters, banners","Social media content creation","Photo retouching and product photography","Print-ready file preparation (prepress)"],
  "exp":[
   {"role":"Graphic Designer","org":"Calotex SARL","place":"Nabeul, Tunisia","dates":"Aug 2024 – Present","bullets":[
     "Design and lay out print materials (company brochure, catalogues, flyers, banners, posters) in Adobe InDesign.",
     "Plan and shoot product photography and retouch the images.",
     "Produce artistic shots and photo reports inside the factory (manufacturing processes, work environment).",
     "Contribute to the visual consistency of internal communication."]},
   {"role":"Graphic Designer & Social Media Manager","org":"Pixel Com","place":"Nabeul, Tunisia","dates":"2022 – 2024","bullets":[
     "Designed print and digital visuals (logos, banners, posters, flyers, social media content) consistent with each client’s brand identity.",
     "Produced professional layouts and advanced photo retouching (correction, colour optimisation, image quality enhancement) for legibility and impact.",
     "Defined and rolled out visual strategies aligned with digital communication goals; contributed creative ideas in brainstorming sessions."]},
   {"role":"Graphic Design Intern","org":"27 Images","place":"Hammamet, Tunisia","dates":"2022","bullets":[
     "Created mock-ups for brochures, menus and other documents.",
     "Designed logos, banners, posters, flyers and other communication materials.",
     "Prepared files for print and online publication."]}],
  "edu":[
   {"role":"Bachelor’s Degree in Image Design – Graphic Advertising","org":"Higher Institute of Fine Arts of Nabeul (ISBA Nabeul)","place":"Tunisia","dates":"2022"},
   {"role":"Baccalaureate – Literature","org":"Lycée Aboukacem Chebbi","place":"Kesra, Siliana, Tunisia","dates":"2019"}],
  "tools":"Adobe Photoshop, Adobe Illustrator, Adobe InDesign, Adobe XD, CorelDRAW",
  "soft":"Collaborative, clear communicator, strong time management, autonomous and accountable",
  "langs":"Arabic: native · French: professional proficiency · English: professional proficiency",
  "pdf_title":"Feriel Bouzid – CV – Graphic Designer",
 }}

def e(s): return html.escape(s, quote=False)

def build(d):
    exp = "".join(f'''<div class="item"><div class="row"><h3>{e(x["role"])} <span class="org">— {e(x["org"])}, {e(x["place"])}</span></h3><span class="dates">{e(x["dates"])}</span></div><ul>{"".join(f"<li>{e(b)}</li>" for b in x["bullets"])}</ul></div>''' for x in d["exp"])
    edu = "".join(f'''<div class="item"><div class="row"><h3>{e(x["role"])} <span class="org">— {e(x["org"])}, {e(x["place"])}</span></h3><span class="dates">{e(x["dates"])}</span></div></div>''' for x in d["edu"])
    h=d["h"]
    return f'''<!doctype html><html lang="{d["lang"]}"><head><meta charset="utf-8"><title>{e(d["pdf_title"])}</title>
<style>
@page {{ size: A4; margin: 13mm 16mm 12mm; }}
* {{ box-sizing: border-box; }}
html {{ font-family: "Carlito", "Calibri", "Liberation Sans", Arial, sans-serif; font-size: 10.4pt; line-height: 1.33; color: #111; font-variant-ligatures: none; font-feature-settings: "liga" 0, "clig" 0, "calt" 0; }}
body {{ margin: 0; }}
h1 {{ font-size: 23pt; letter-spacing: .01em; margin: 0; font-weight: 700; line-height: 1.1; }}
.title {{ font-size: 12pt; font-weight: 600; margin: 3pt 0 4pt; color: #222; }}
.contact {{ margin: 0; color: #222; }}
h2 {{ font-size: 11pt; text-transform: uppercase; letter-spacing: .08em; margin: 9pt 0 4pt; padding-bottom: 2pt; border-bottom: 0.8pt solid #111; font-weight: 700; }}
h3 {{ font-size: 10.6pt; margin: 0; font-weight: 700; }}
.org {{ font-weight: 400; }}
.row {{ display: flex; justify-content: space-between; align-items: baseline; gap: 12pt; }}
.dates {{ white-space: nowrap; font-weight: 600; }}
.item {{ margin-bottom: 5pt; }}
ul {{ margin: 2pt 0 0; padding-left: 13pt; }}
li {{ margin: 1pt 0; }}
p {{ margin: 0; }}
</style></head><body>
<header><h1>FERIEL BOUZID</h1><p class="title">{e(d["title"])}</p><p class="contact">{" | ".join(e(c) for c in d["contact"])}</p></header>
<h2>{e(h["profile"])}</h2><p>{e(d["profile"])}</p>
<h2>{e(h["keys"])}</h2><ul>{"".join(f"<li>{e(k)}</li>" for k in d["keys"])}</ul>
<h2>{e(h["exp"])}</h2>{exp}
<h2>{e(h["edu"])}</h2>{edu}
<h2>{e(h["tools"])}</h2><p>{e(d["tools"])}</p>
<h2>{e(h["soft"])}</h2><p>{e(d["soft"])}</p>
<h2>{e(h["lang"])}</h2><p>{e(d["langs"])}</p>
</body></html>'''

for k,d in data.items():
    open(f"cv-{k}.html","w").write(build(d))
json.dump({k:v["pdf_title"] for k,v in data.items()}, open("titles.json","w"))
