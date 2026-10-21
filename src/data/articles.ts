import { articles as enArticles, getArticleById as getEnArticleById, getRelatedArticles as getEnRelatedArticles } from "./articles.en";
import { PROJECT_ORDER } from "./site";
import { articles as frArticles, getArticleById as getFrArticleById, getRelatedArticles as getFrRelatedArticles } from "./articles.fr";

export { enArticles as articles };

const byDisplayOrder = <T extends { id: string }>(list: T[]) =>
  [...list].sort((a, b) => PROJECT_ORDER.indexOf(a.id) - PROJECT_ORDER.indexOf(b.id));
const orderedEn = byDisplayOrder(enArticles);
const orderedFr = byDisplayOrder(frArticles);

/** Projects in display order (see PROJECT_ORDER). */
export const getArticles = (lang: string) => {
  return lang === "fr" ? orderedFr : orderedEn;
};

export const getArticleById = (id: string, lang?: string) => {
  if (lang === "fr") return getFrArticleById(id);
  const currentLang = typeof window !== "undefined" ? localStorage.getItem("language") : "en";
  return currentLang === "fr" ? getFrArticleById(id) : getEnArticleById(id);
};

export const getRelatedArticles = (currentId: string, limit?: number, lang?: string) => {
  if (lang === "fr") return getFrRelatedArticles(currentId, limit);
  const currentLang = typeof window !== "undefined" ? localStorage.getItem("language") : "en";
  if (currentLang === "fr") return getFrRelatedArticles(currentId, limit);
  return getEnRelatedArticles(currentId, limit);
};
