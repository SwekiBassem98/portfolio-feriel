import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/data/articles.en";
import { getProjectMeta, sizeOf, thumb, type Discipline } from "@/data/site";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

type Filter = "all" | Discipline;

/* ------------------------------------------------------------------ */
/* Contents: a magazine-style index with a cursor-following preview     */
/* ------------------------------------------------------------------ */
const Contents = ({ projects }: { projects: Article[] }) => {
  const { t } = useTranslation();
  const listRef = useRef<HTMLOListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<string | null>(null);

  // Only on devices with a precise pointer; touch users get the spreads below
  const onMove = (e: React.MouseEvent) => {
    const list = listRef.current;
    const prev = previewRef.current;
    if (!list || !prev) return;
    const r = list.getBoundingClientRect();
    prev.style.transform = `translate3d(${e.clientX - r.left + 24}px, ${e.clientY - r.top - 90}px, 0)`;
  };

  const hovered = projects.find((p) => p.id === hover);

  return (
    <div className="relative">
      <p className="slug mb-3">{t("site.work.contents")}</p>
      <ol ref={listRef} onMouseMove={onMove} onMouseLeave={() => setHover(null)} className="relative border-t border-foreground">
        {projects.map((p) => {
          const meta = getProjectMeta(p.id);
          return (
            <li key={p.id} className="border-b border-foreground/15">
              <Link
                to={`/article/${p.id}`}
                onMouseEnter={() => setHover(p.id)}
                onFocus={() => setHover(p.id)}
                onBlur={() => setHover(null)}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-4 transition-colors sm:grid-cols-[3rem_minmax(0,1.3fr)_minmax(0,1fr)_5rem_auto] sm:py-5"
              >
                <span className="font-mono text-xs text-muted-foreground">{p.id}</span>
                <span className="flex items-center gap-3 text-2xl font-semibold tracking-tight transition-transform duration-500 ease-proof group-hover:translate-x-2 sm:text-3xl">
                  <span
                    className="h-2.5 w-2.5 shrink-0 scale-0 rounded-full transition-transform duration-300 group-hover:scale-100 group-focus-visible:scale-100"
                    style={{ background: meta.accent }}
                    aria-hidden="true"
                  />
                  {p.title}
                </span>
                <span className="hidden truncate font-serif text-lg italic text-muted-foreground sm:block">{p.subtitle}</span>
                <span className="hidden font-mono text-xs text-muted-foreground sm:block">{meta.year}</span>
                <ArrowUpRight
                  className="h-5 w-5 justify-self-end text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                  aria-hidden="true"
                />
              </Link>
            </li>
          );
        })}
      </ol>

      {/* Floating preview (decorative; desktop pointer only) */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-10 hidden w-[300px] [@media(hover:hover)_and_(pointer:fine)]:block"
      >
        <div
          className={`origin-top-left transition-[opacity,transform] duration-300 ease-proof ${
            hovered ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {projects.map((p) => (
            <img
              key={p.id}
              src={p.image}
              alt=""
              width={1672}
              height={941}
              loading="lazy"
              className={`aspect-video w-full object-cover shadow-[0_20px_40px_-20px_rgba(0,0,0,.5)] ${p.id === hover ? "block" : "hidden"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Spread: one editorial double page per project                       */
/* ------------------------------------------------------------------ */
const Spread = ({ project, index }: { project: Article; index: number }) => {
  const { t } = useTranslation();
  const meta = getProjectMeta(project.id);
  const flip = index % 2 === 1;
  const isPrint = meta.discipline === "print";

  return (
    <article aria-labelledby={`p-${project.id}`} className="grid gap-8 border-t border-foreground/15 py-14 sm:py-20 lg:grid-cols-12 lg:gap-12">
      {/* Visuals */}
      <Reveal className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <Link to={`/article/${project.id}`} className="group block" tabIndex={-1} aria-hidden="true">
          <div className="crop crop-hover m-[22px] sm:m-6">
            <div className="overflow-hidden bg-muted">
              <img
                src={project.image}
                alt=""
                width={1672}
                height={941}
                loading="lazy"
                decoding="async"
                className="aspect-video w-full object-cover outline outline-1 -outline-offset-1 outline-foreground/10 transition-transform duration-700 ease-proof group-hover:scale-[1.03]"
              />
            </div>
          </div>
        </Link>
        <ul className="mt-2 grid grid-cols-3 gap-2 px-[22px] sm:gap-3 sm:px-6">
          {meta.samples.map((src, i) => {
            const [w, h] = sizeOf(src);
            return (
              <li key={src} className="overflow-hidden bg-muted">
                <img
                  src={thumb(src)}
                  alt={`${t("site.work.previewOf", { title: project.title })} (${i + 1}/3)`}
                  width={w}
                  height={h}
                  loading="lazy"
                  decoding="async"
                  className={`w-full object-cover ${isPrint ? "aspect-[4/3]" : "aspect-square"}`}
                />
              </li>
            );
          })}
        </ul>
      </Reveal>

      {/* Text */}
      <Reveal delay={120} className={`flex flex-col lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <div className="flex items-start justify-between gap-6">
          <span
            className="font-sans text-[5.5rem] font-semibold leading-none tracking-[-0.06em] sm:text-[7rem]"
            style={{ color: meta.accent, WebkitTextStroke: "1.5px hsl(var(--foreground))" }}
            aria-hidden="true"
          >
            {project.id.slice(1)}
          </span>
          <span className="slug mt-3 text-right">
            {meta.discipline === "print" ? t("site.work.disciplinePrint") : t("site.work.disciplineSocial")}
          </span>
        </div>

        <h3 id={`p-${project.id}`} className="mt-6 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
          {project.title}
        </h3>
        <p className="mt-2 font-serif text-2xl italic text-muted-foreground">{project.subtitle}</p>
        <p className="mt-6 max-w-prose leading-relaxed text-foreground/80">{project.content.introduction}</p>

        <dl className="mt-8 grid grid-cols-2 gap-x-6 border-t border-foreground/15 text-sm">
          {[
            [t("site.work.sector"), project.category],
            [t("site.work.year"), meta.year],
            [t("site.work.deliverables"), project.deliverablesCount ?? "—"],
            [t("site.work.discipline"), meta.discipline === "print" ? t("site.work.print") : t("site.work.social")],
          ].map(([k, v]) => (
            <div key={k} className="border-b border-foreground/15 py-3">
              <dt className="slug">{k}</dt>
              <dd className="mt-1 font-medium">{v}</dd>
            </div>
          ))}
        </dl>

        {project.keySkills && (
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{project.keySkills.join(" · ")}</p>
        )}

        <div className="mt-8 lg:mt-auto lg:pt-8">
          <Link
            to={`/article/${project.id}`}
            className="group inline-flex items-center gap-3 rounded-full border border-foreground px-5 py-3 text-sm font-semibold transition-colors hover:bg-foreground hover:text-background"
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: meta.accent }} aria-hidden="true" />
            {t("site.work.open")}
            <span className="sr-only">: {project.title}</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </Reveal>
    </article>
  );
};

const Work = ({ projects }: { projects: Article[] }) => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(() => {
    const c = { all: projects.length, social: 0, print: 0 };
    projects.forEach((p) => c[getProjectMeta(p.id).discipline]++);
    return c;
  }, [projects]);

  const shown = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => getProjectMeta(p.id).discipline === filter)),
    [filter, projects],
  );

  const filters: Filter[] = ["all", "social", "print"];

  return (
    <section id="work" aria-labelledby="work-title" className="py-16 sm:py-24">
      <SectionHead number="01" label={t("site.work.label")} id="work-title" title={t("site.work.title")} intro={t("site.work.intro")} />

      <div className="mt-12 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-12">
          <Contents projects={projects} />
        </div>
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label={t("site.work.discipline")} className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                filter === f ? "border-foreground bg-foreground text-background" : "border-foreground/20 hover:border-foreground"
              }`}
            >
              {t(`site.work.${f}`)} <span className="ml-1 font-mono text-[11px] opacity-60">{counts[f]}</span>
            </button>
          ))}
        </div>
        <p className="slug" aria-live="polite">
          {t("site.work.count", { count: shown.length })}
        </p>
      </div>

      <div className="mt-6">
        {shown.map((p, i) => (
          <Spread key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Work;
