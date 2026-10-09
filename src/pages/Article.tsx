import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight, ArrowUpRight, ArrowDownToLine, ChevronLeft, ChevronRight, FileText, X, Link2 } from "lucide-react";
import { toast } from "sonner";
import Header, { RegMark } from "@/components/Header";
import Reveal from "@/components/site/Reveal";
import MaskText from "@/components/site/MaskText";
import TransitionLink from "@/components/site/TransitionLink";
import CursorLabel from "@/components/site/CursorLabel";
import { getArticleById, getArticles } from "@/data/articles";
import { useLanguage } from "@/i18n/LanguageContext";
import { PROFILE, coverSrcSet, fullSrc, fullSrcSet, getProjectMeta, sizeOf, thumb, thumbSrcSet } from "@/data/site";

/* ------------------------------------------------------------------ */
/* Lightbox                                                            */
/* ------------------------------------------------------------------ */
interface LightboxProps {
  images: string[];
  index: number;
  dir: "next" | "prev" | null;
  title: string;
  onClose: () => void;
  onIndex: (i: number, dir: "next" | "prev") => void;
}

const Lightbox = ({ images, index, dir, title, onClose, onIndex }: LightboxProps) => {
  const { t } = useTranslation();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const total = images.length;
  const next = useCallback(() => onIndex((index + 1) % total, "next"), [index, total, onIndex]);
  const prev = useCallback(() => onIndex((index - 1 + total) % total, "prev"), [index, total, onIndex]);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const a = f[0];
        const z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault();
          z.focus();
        } else if (!e.shiftKey && document.activeElement === z) {
          e.preventDefault();
          a.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, onClose]);

  // Preload neighbours so arrows feel instant
  useEffect(() => {
    [images[(index + 1) % total], images[(index - 1 + total) % total]].forEach((src) => {
      const img = new Image();
      img.sizes = "100vw";
      const set = fullSrcSet(src);
      if (set) img.srcset = set;
      img.src = fullSrc(src);
    });
  }, [index, images, total]);

  const src = images[index];
  const [w, h] = sizeOf(src);
  const btn =
    "flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-white hover:bg-white/10";

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — ${t("site.project.counter", { index: index + 1, total })}`}
      className="lb-enter fixed inset-0 z-[150] flex flex-col bg-[#0d0c0b]/[.97] text-white"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/70" aria-live="polite">
          {title} · {t("site.project.counter", { index: index + 1, total })}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} className={btn} aria-label={t("site.project.close")}>
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-20" onClick={onClose}>
        <img
          key={src}
          src={fullSrc(src)}
          srcSet={fullSrcSet(src)}
          sizes="100vw"
          alt={t("article.imageAsset", { title, index: index + 1 })}
          width={w}
          height={h}
          onClick={(e) => e.stopPropagation()}
          data-dir={dir ?? undefined}
          className="lb-img max-h-full max-w-full object-contain"
        />
      </div>
      <div className="flex items-center justify-center gap-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:absolute sm:inset-y-0 sm:left-0 sm:right-0 sm:justify-between sm:px-5 sm:pb-0 sm:pointer-events-none">
        <button type="button" onClick={prev} className={`${btn} sm:pointer-events-auto`} aria-label={t("site.project.prevImg")}>
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button type="button" onClick={next} className={`${btn} sm:pointer-events-auto`} aria-label={t("site.project.nextImg")}>
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Case study page                                                     */
/* ------------------------------------------------------------------ */
const Article = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [section, setSection] = useState<string>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [lbDir, setLbDir] = useState<"next" | "prev" | null>(null);

  const article = id ? getArticleById(id, language) : undefined;
  const all = useMemo(() => getArticles(language), [language]);

  useEffect(() => setSection("all"), [id]);

  useEffect(() => {
    if (article) document.title = `${article.title} — ${article.subtitle} · Feriel Bouzid`;
    return () => {
      document.title = "Feriel Bouzid — Graphic Designer · Brand, Print & Social";
    };
  }, [article]);

  // The gallery shown (and navigated in the lightbox) follows the active filter
  const images = useMemo(() => {
    if (!article) return [];
    if (section === "all" || !article.gallerySections?.length) {
      // "All" = every image across sections, de-duplicated, in order
      const fromSections = article.gallerySections?.flatMap((s) => s.images) ?? [];
      return Array.from(new Set([...(fromSections.length ? fromSections : article.gallery)]));
    }
    return article.gallerySections.find((s) => s.title === section)?.images ?? article.gallery;
  }, [article, section]);

  if (!article) return <Navigate to="/404" replace />;

  const meta = getProjectMeta(article.id);
  const pos = all.findIndex((p) => p.id === article.id);
  const nextP = all[(pos + 1) % all.length];
  const prevP = all[(pos - 1 + all.length) % all.length];
  const discipline = meta.discipline === "print" ? t("site.work.disciplinePrint") : t("site.work.disciplineSocial");
  const isPrint = meta.discipline === "print";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success(t("site.project.linkCopied"));
    } catch {
      toast(window.location.href);
    }
  };

  const facts: [string, string][] = [
    [t("site.project.sector"), article.category],
    [t("site.project.year"), meta.year],
    [t("site.project.discipline"), discipline],
    [t("site.project.deliverables"), article.deliverablesCount ?? "—"],
    [t("site.project.role"), t("article.leadDesigner")],
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grain" aria-hidden="true" />
      <CursorLabel />
      <Header />

      <main id="main" key={article.id}>
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
          {/* Slug line */}
          <div className="flex items-center justify-between border-b border-foreground/15 py-4">
            <TransitionLink to="/#work" className="group -my-3 inline-flex min-h-11 items-center gap-2 py-3 text-sm font-medium">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
              {t("site.project.back")}
            </TransitionLink>
            <span className="slug intro-item" style={{ ["--intro-base" as string]: "300ms" }}>
              {t("site.project.folio")} {article.id} / {String(all.length).padStart(3, "0")}
            </span>
          </div>

          {/* Title block */}
          <header className="grid gap-10 pb-12 pt-12 sm:pt-16 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="intro-item flex items-center gap-3" style={{ ["--intro-base" as string]: "0ms" }}>
                <span className="h-3 w-3 rounded-full" style={{ background: meta.accent }} aria-hidden="true" />
                <span className="slug">{discipline}</span>
              </p>
              <h1 key={article.id} className="mw-intro mt-6 text-[clamp(3.5rem,11vw,8.5rem)] font-semibold leading-[0.88] tracking-[-0.05em]">
                <MaskText base={120}>{article.title}</MaskText>
              </h1>
              <p className="intro-item mt-4 text-[clamp(1.35rem,2.6vw,2rem)] font-medium leading-tight tracking-[-0.02em] text-muted-foreground" style={{ ["--intro-base" as string]: "320ms" }}>
                {article.subtitle}
              </p>
            </div>
            <dl className="self-end border-t border-foreground lg:col-span-4">
              {facts.map(([k, v], i) => (
                <div
                  key={k}
                  className="intro-item grid grid-cols-[7rem_1fr] gap-3 border-b border-foreground/15 py-3 text-sm"
                  style={{ ["--intro-base" as string]: "380ms", ["--i" as string]: i }}
                >
                  <dt className="slug pt-0.5">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </header>

          {/* Cover (full content width, no crop marks) */}
          <div>
            <img
              data-vt-target=""
              style={{ viewTransitionName: "project-cover" }}
              src={article.image}
              srcSet={coverSrcSet(article.image)}
              sizes="(min-width: 1280px) 1200px, 94vw"
              alt={`${article.title} — ${article.subtitle}`}
              width={1672}
              height={941}
              decoding="async"
              className="block aspect-video w-full bg-muted object-cover outline outline-1 -outline-offset-1 outline-foreground/10"
            />
          </div>

          {/* Overview */}
          <section aria-labelledby="overview" className="grid gap-10 py-16 sm:py-24 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <h2 id="overview" className="slug">
                {t("site.project.overview")}
              </h2>
            </div>
            <Reveal className="lg:col-span-9">
              <p className="text-[clamp(1.5rem,2.8vw,2.25rem)] font-medium leading-[1.25] tracking-[-0.02em]">{article.content.introduction}</p>
              {article.keySkills && (
                <ul className="mt-8 flex flex-wrap gap-2" aria-label={t("site.project.skills")}>
                  {article.keySkills.map((s) => (
                    <li key={s} className="rounded-full border border-foreground/20 px-3 py-1.5 text-sm">
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </section>

          {/* Approach */}
          <section aria-labelledby="approach" className="border-t border-foreground pb-16 pt-6 sm:pb-24">
            <h2 id="approach" className="slug">
              {t("site.project.approach")}
            </h2>
            <ol className="mt-8 grid gap-10 md:grid-cols-3 md:gap-8">
              {article.content.sections.map((s, i) => (
                <Reveal as="li" key={s.heading} delay={i * 100}>
                  <span className="font-mono text-xs spot-ink">0{i + 1}</span>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight">{s.heading}</h3>
                  <p className="mt-3 leading-relaxed text-foreground/80">{s.content}</p>
                </Reveal>
              ))}
            </ol>
            <Reveal as="blockquote" className="mt-16 max-w-4xl border-l-2 pl-6 sm:pl-8" style={{ borderColor: meta.accent }}>
              <p className="text-[clamp(1.35rem,2.6vw,2rem)] font-medium leading-snug tracking-[-0.02em]">{article.content.conclusion}</p>
            </Reveal>
          </section>

          {/* Gallery */}
          <section aria-labelledby="gallery" className="border-t border-foreground pb-16 pt-6 sm:pb-24">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 id="gallery" className="slug">
                {t("site.project.gallery")}
              </h2>
              <p className="slug" aria-live="polite">
                {t("site.project.pieces", { count: images.length })}
              </p>
            </div>

            {article.gallerySections && article.gallerySections.length > 0 && (
              <div role="group" aria-label={t("article.filterLabel")} className="-mx-1 mt-6 flex gap-2 overflow-x-auto px-1 pb-2">
                {[{ title: "all", label: t("site.project.allFilter") }, ...article.gallerySections.map((s) => ({ title: s.title, label: s.title }))].map(
                  (s) => (
                    <button
                      key={s.title}
                      type="button"
                      onClick={() => setSection(s.title)}
                      aria-pressed={section === s.title}
                      className={`press min-h-11 shrink-0 rounded-full border px-4 py-2 text-sm font-medium md:min-h-0 ${
                        section === s.title ? "border-foreground bg-foreground text-background" : "border-foreground/20 hover:border-foreground"
                      }`}
                    >
                      {s.label}
                    </button>
                  ),
                )}
              </div>
            )}

            <ul className={`mt-8 gap-3 sm:gap-4 ${isPrint ? "columns-1 sm:columns-2" : "columns-2 md:columns-3"}`}>
              {images.map((src, i) => {
                const [w, h] = sizeOf(src);
                return (
                  <Reveal as="li" key={`${section}-${src}`} delay={(i % 3) * 80} className="mb-3 break-inside-avoid sm:mb-4">
                    <button
                      type="button"
                      onClick={() => {
                        setLbDir(null);
                        setLightbox(i);
                      }}
                      data-cursor={t("article.view")}
                      className="group relative block w-full overflow-hidden bg-muted"
                      aria-label={t("site.project.viewImage", { index: i + 1, title: article.title })}
                    >
                      <img
                        src={thumb(src)}
                        srcSet={thumbSrcSet(src)}
                        sizes={isPrint ? "(min-width: 1280px) 600px, (min-width: 640px) 46vw, 92vw" : "(min-width: 1280px) 400px, (min-width: 768px) 30vw, 46vw"}
                        alt=""
                        width={w}
                        height={h}
                        loading="lazy"
                        decoding="async"
                        className="block h-auto w-full transition-transform duration-700 ease-proof group-hover:scale-[1.025]"
                      />
                      <span className="absolute left-2 top-2 rounded-full bg-background/90 px-2 py-0.5 font-mono text-[10px] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </button>
                  </Reveal>
                );
              })}
            </ul>

            {article.pdfUrl && (
              <div className="mt-10 flex flex-col gap-4 border border-foreground p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="flex items-center gap-4">
                  <FileText className="h-6 w-6 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-semibold">{t("site.project.file")}</p>
                    <p className="text-sm text-muted-foreground">{t("site.project.fileDesc")}</p>
                  </div>
                </div>
                <a
                  href={article.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-spot hover:text-[#141312]"
                >
                  {t("site.project.openPdf")}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            )}

            {/* Tags & share */}
            <div className="mt-12 flex flex-col gap-4 border-t border-foreground/15 pt-5 text-sm sm:flex-row sm:items-center sm:justify-between">
              <ul className="flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground">
                {article.tags.map((tag) => (
                  <li key={tag}>#{tag}</li>
                ))}
              </ul>
              <div className="flex items-center gap-4">
                <button type="button" onClick={copyLink} className="inline-flex min-h-11 items-center gap-1.5 font-medium">
                  <Link2 className="h-4 w-4" aria-hidden="true" />
                  <span className="ink-link">{t("site.project.copyLink")}</span>
                </button>
                <a
                  className="inline-flex min-h-11 min-w-11 items-center justify-center"
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("article.shareTwitter")}
                >
                  <span className="ink-link">X</span>
                </a>
                <a
                  className="inline-flex min-h-11 items-center"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("article.shareFacebook")}
                >
                  <span className="ink-link">Facebook</span>
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Previous / next */}
        <nav aria-label={t("site.project.next")} className="border-t border-foreground">
          <div className="mx-auto grid max-w-[1280px] sm:grid-cols-[1fr_2fr]">
            <TransitionLink to={`/article/${prevP.id}`} className="group flex flex-col justify-between gap-6 border-b border-foreground/15 px-4 py-8 sm:border-b-0 sm:border-r sm:px-6 lg:px-10">
              <span className="slug inline-flex items-center gap-2">
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                {t("site.project.prev")}
              </span>
              <span className="text-2xl font-semibold tracking-tight">{prevP.title}</span>
            </TransitionLink>
            <TransitionLink to={`/article/${nextP.id}`} className="group relative flex flex-col justify-between gap-6 overflow-hidden px-4 py-8 sm:px-6 lg:px-10">
              <span className="slug inline-flex items-center gap-2">
                {t("site.project.next")}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
              <span className="flex items-center gap-4 text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-none tracking-[-0.04em]">
                <span
                  className="h-4 w-4 shrink-0 rounded-full transition-transform duration-500 group-hover:scale-150"
                  style={{ background: getProjectMeta(nextP.id).accent }}
                  aria-hidden="true"
                />
                {nextP.title}
              </span>
              <span className="text-lg text-muted-foreground">{nextP.subtitle}</span>
            </TransitionLink>
          </div>
        </nav>

        {/* Closing CTA */}
        <section className="ink-panel bg-foreground text-background">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-4 py-14 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-10">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-background/60">{t("site.project.talk")}</p>
              <a href={`mailto:${PROFILE.email}`} className="group mt-3 inline-flex min-h-11 max-w-full items-center gap-3 break-all text-[clamp(1.25rem,5.6vw,3rem)] font-semibold tracking-tight">
                <span className="ink-link">{PROFILE.email}</span>
                <ArrowUpRight className="h-7 w-7 text-spot transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={PROFILE.cvUrl}
                download={PROFILE.cvFileName}
                className="inline-flex items-center gap-2 rounded-full bg-spot px-5 py-3 text-sm font-semibold text-[#141312]"
              >
                <ArrowDownToLine className="h-4 w-4" aria-hidden="true" />
                {t("site.hero.ctaCv")}
              </a>
              <Link to="/#work" className="inline-flex items-center gap-2 rounded-full border border-background/30 px-5 py-3 text-sm font-semibold hover:border-background">
                {t("site.project.back")}
              </Link>
            </div>
          </div>
          <div className="mx-auto flex max-w-[1280px] items-center gap-3 border-t border-background/15 px-4 py-5 text-xs text-background/60 sm:px-6 lg:px-10">
            <RegMark className="h-4 w-4 text-background" />© {new Date().getFullYear()} {PROFILE.name}
          </div>
        </section>
      </main>

      {lightbox !== null && images.length > 0 && (
        <Lightbox
          images={images}
          index={lightbox}
          dir={lbDir}
          title={article.title}
          onClose={() => setLightbox(null)}
          onIndex={(i, d) => {
            setLbDir(d);
            setLightbox(i);
          }}
        />
      )}
    </div>
  );
};

export default Article;
