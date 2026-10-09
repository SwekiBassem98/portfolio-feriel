import { useParams, Navigate } from "react-router-dom";
import { useState, useMemo, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import ArticleCard from "@/components/ArticleCard";
import { getArticleById, getRelatedArticles } from "@/data/articles";
import { Facebook, Twitter, Link2, ArrowLeft, FileText, X, ChevronLeft, ChevronRight, Eye, Images, Sparkles, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/i18n/LanguageContext";
import { ProjectOverview, ProjectProcessPhases } from "@/components/InteractiveCaseStudy";

const Article = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>("all");

  const article = id ? getArticleById(id, language) : undefined;
  const galleryLength = article?.gallery?.length ?? 0;

  // Ensure page always opens from the very top when navigating to project details
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [id]);

  const nextImage = useCallback(() => {
    if (galleryLength === 0) return;
    setLightboxIndex((prev) => (prev + 1) % galleryLength);
  }, [galleryLength]);

  const prevImage = useCallback(() => {
    if (galleryLength === 0) return;
    setLightboxIndex((prev) => (prev - 1 + galleryLength) % galleryLength);
  }, [galleryLength]);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, nextImage, prevImage, closeLightbox]);

  // Images to display based on section filter (for multi-section projects like Winkler)
  const displayedImages = useMemo(() => {
    if (!article) return [];
    if (!article.gallerySections || article.gallerySections.length === 0 || selectedSectionFilter === "all") {
      return article.gallery.map((img, idx) => ({ img, originalIndex: idx, section: "" }));
    }
    const targetSection = article.gallerySections.find(s => s.title === selectedSectionFilter);
    if (!targetSection) return article.gallery.map((img, idx) => ({ img, originalIndex: idx, section: "" }));

    return targetSection.images.map(img => ({
      img,
      originalIndex: article.gallery.indexOf(img),
      section: targetSection.title,
    }));
  }, [article, selectedSectionFilter]);

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return getRelatedArticles(article.id, 3, language);
  }, [article, language]);

  if (!article) {
    return <Navigate to="/404" replace />;
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(t('article.linkCopied'));
  };

  const getCategoryClass = (cat: string) => {
    const normalized = cat.toLowerCase();
    if (normalized.includes("financ")) return "tag-financing";
    if (normalized.includes("lifestyle")) return "tag-lifestyle";
    if (normalized.includes("community")) return "tag-community";
    if (normalized.includes("wellness")) return "tag-wellness";
    if (normalized.includes("travel")) return "tag-travel";
    if (normalized.includes("creativ")) return "tag-creativity";
    if (normalized.includes("growth")) return "tag-growth";
    return "tag-lifestyle";
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />

      <main>
        {/* Back Navigation - Reduced Height */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {t('article.backToProjects')}
          </a>
        </div>

        {/* Cover Image */}
        <div className="relative w-full h-[320px] md:h-[420px] lg:h-[480px] mb-6 sm:mb-8">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 md:-mt-32 relative z-10">
          {/* Article Header */}
          <div className="mb-8 animate-slide-up">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className={`px-3 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase ${getCategoryClass(article.category)}`}>
                {article.category}
              </span>
              <span className="text-xs text-muted-foreground font-medium">{article.date}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-primary/10 text-primary font-semibold">
                {t('article.designedBy')}
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold font-sans tracking-tight mb-2.5 leading-tight text-foreground">
              {article.title}
            </h1>

            <p className="text-base md:text-lg text-muted-foreground font-medium max-w-3xl">
              {article.subtitle}
            </p>
          </div>

          {/* 1. PROJECT OVERVIEW SECTION FIRST */}
          <ProjectOverview article={article} />

          {/* 2. PROJECT GALLERY SECTION */}
          {article.gallery.length > 0 && (
            <div className="mb-10 animate-slide-up" id="project-gallery">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-border/70">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                    <Images className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold font-sans tracking-tight">
                      {t('article.projectGallery')}
                    </h2>
                    <p className="text-[11px] text-muted-foreground">
                      {t('article.galleryHelper')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-muted text-foreground">
                    {article.gallery.length} {t('article.allImages')}
                  </span>
                </div>
              </div>

              {/* Multi-section Filter Pills (e.g. for Winkler with Catalogs, Bifold, Posters) */}
              {article.gallerySections && article.gallerySections.length > 0 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-3 scrollbar-none">
                  <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1 shrink-0 pl-1 pr-1.5">
                    <Filter className="w-3 h-3" />
                    {t('article.filterLabel')}
                  </span>
                  <button
                    onClick={() => setSelectedSectionFilter("all")}
                    className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all shrink-0 cursor-pointer ${
                      selectedSectionFilter === "all"
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t('article.allImages')} ({article.gallery.length})
                  </button>
                  {article.gallerySections.map((section, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => setSelectedSectionFilter(section.title)}
                      className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all shrink-0 cursor-pointer ${
                        selectedSectionFilter === section.title
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {section.title} ({section.images.length})
                    </button>
                  ))}
                </div>
              )}

              {/* Gallery Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {displayedImages.map(({ img, originalIndex, section }, index) => (
                  <button
                    key={index}
                    onClick={() => openLightbox(originalIndex >= 0 ? originalIndex : index)}
                    className="group relative aspect-square overflow-hidden rounded-md border border-border/80 bg-muted/40 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                    aria-label={t('article.viewImageAria', { title: article.title, index: index + 1 })}
                  >
                    <img
                      src={img}
                      alt={t('article.imageAsset', { title: article.title, index: index + 1 })}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Hover Overlay with Glass Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-3 text-white">
                      <div className="flex justify-end">
                        <span className="w-7 h-7 rounded-md bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-xs">
                          <Eye className="w-3.5 h-3.5" />
                        </span>
                      </div>
                      <div>
                        {section && (
                          <span className="text-[10px] font-semibold text-white/80 uppercase tracking-wider block">
                            {section}
                          </span>
                        )}
                        <span className="text-[11px] font-medium text-white/95">
                          {t('article.view')} #{originalIndex + 1}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. PDF FILE SECTION RIGHT AFTER THE PHOTOS */}
          {article.pdfUrl ? (
            <div className="mb-10 p-5 md:p-6 rounded-md border border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 shadow-xs animate-slide-up">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-md bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-sans text-foreground">{t('article.projectFile')}</h3>
                    <p className="text-xs text-muted-foreground">{t('article.viewProjectFile')}</p>
                  </div>
                </div>
                <a href={article.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-md gap-1.5 px-4 py-1.5 text-xs shadow-xs bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer h-8">
                    <Eye className="w-3.5 h-3.5" />
                    {t('article.view')} PDF
                  </Button>
                </a>
              </div>
            </div>
          ) : (
            <div className="mb-10 p-5 md:p-6 rounded-md border border-dashed border-border bg-muted/30 animate-slide-up">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-md bg-muted flex items-center justify-center shrink-0 text-muted-foreground">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-sans">{t('article.projectFile')}</h3>
                  <p className="text-xs text-muted-foreground">{t('article.pdfComingSoon')}</p>
                </div>
              </div>
            </div>
          )}

          {/* 4. SECTION INDICATED BY SCREENSHOT: DESIGN PROCESS PHASES */}
          <ProjectProcessPhases article={article} />

          {/* Tags */}
          <div className="mb-8 pb-8 border-b border-border">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-md text-[11px] font-semibold bg-muted/80 hover:bg-muted text-foreground transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share Buttons */}
          <div className="mb-8 pb-8 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs font-semibold text-foreground">{t('article.shareThisProject')}</p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="px-3.5 py-1.5 rounded-md border border-border hover:border-primary hover:bg-muted transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs font-medium"
              >
                <Link2 className="w-3.5 h-3.5" />
                <span>{t('article.copyLink')}</span>
              </button>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md border border-border hover:border-primary hover:bg-muted transition-all flex items-center justify-center cursor-pointer"
                aria-label={t('article.shareTwitter')}
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md border border-border hover:border-primary hover:bg-muted transition-all flex items-center justify-center cursor-pointer"
                aria-label={t('article.shareFacebook')}
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Hire / Contact Banner */}
          <div className="mb-12 rounded-md bg-gradient-to-br from-card via-card to-primary/10 border border-primary/20 p-6 md:p-8 text-center relative overflow-hidden shadow-xs">
            <div className="max-w-xl mx-auto space-y-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-primary/10 text-primary">
                <Sparkles className="w-3 h-3" />
                {t('article.hireBannerTagline')}
              </span>
              <h3 className="text-lg md:text-xl font-bold font-sans">
                {t('article.enjoyedThisProject')}
              </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {t('article.aboutHiring')}
                </p>
              <div className="pt-1.5 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                <a
                  href="mailto:ferielbouzzid@gmail.com"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs shadow-xs transition-all"
                >
                  ferielbouzzid@gmail.com
                </a>
                <a
                  href="/#contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 rounded-md border border-border hover:bg-muted font-semibold text-xs transition-all"
                >
                  {t('article.viewFullPortfolio')}
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* Related Projects */}
        <section className="bg-muted/50 py-12 animate-fade-in border-t border-border/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold font-sans">{t('article.youMightAlsoLike')}</h2>
              <a href="/" className="text-xs font-semibold text-primary hover:underline">
                {t('article.viewAllProjects')}
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedArticles.map((relatedArticle, index) => (
                <div key={relatedArticle.id} className={`animate-slide-up stagger-${Math.min(index + 1, 3)}`}>
                  <ArticleCard {...relatedArticle} size="small" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox with Keyboard Navigation */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" 
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-9 h-9 rounded-md bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white cursor-pointer z-20"
            aria-label={t('article.closeLightbox')}
          >
            <X className="w-4 h-4" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 md:left-8 w-10 h-10 rounded-md bg-white/10 hover:bg-white/25 transition-colors flex items-center justify-center text-white cursor-pointer z-20"
            aria-label={t('article.previousImage')}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="relative max-w-5xl max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={article.gallery[lightboxIndex]}
              alt={t('article.imageAsset', { title: article.title, index: lightboxIndex + 1 })}
              className="max-w-full max-h-[82vh] object-contain rounded-md shadow-2xl"
            />
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 md:right-8 w-10 h-10 rounded-md bg-white/10 hover:bg-white/25 transition-colors flex items-center justify-center text-white cursor-pointer z-20"
            aria-label={t('article.nextImage')}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 font-mono text-xs px-3.5 py-1 rounded-md bg-black/50 backdrop-blur-xs border border-white/10">
            {lightboxIndex + 1} / {article.gallery.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default Article;
