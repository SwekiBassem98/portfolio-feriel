import { articles as enArticles, getArticleById as getEnArticleById, getRelatedArticles as getEnRelatedArticles } from "./articles.en";
import { articles as frArticles, getArticleById as getFrArticleById, getRelatedArticles as getFrRelatedArticles } from "./articles.fr";

export { enArticles as articles };

export const getArticles = (lang: string) => {
  return lang === "fr" ? frArticles : enArticles;
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
