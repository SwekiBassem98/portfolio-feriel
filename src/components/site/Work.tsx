import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/data/articles.en";
import { coverSrcSet, getProjectMeta, sizeOf, thumb, thumbSrcSet, type Discipline } from "@/data/site";
import { hasFinePointer, prefersReducedMotion, useMagnetic } from "@/lib/motion";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import MaskText from "./MaskText";
import TransitionLink from "./TransitionLink";

type Filter = "all" | Discipline;
const vars = (o: Record<string, string | number>) => o as CSSProperties;

/* ------------------------------------------------------------------ */
/* Contents — the signature interaction                                */
/* A magazine index. On desktop a proof of the hovered project trails   */
/* the pointer with inertia, leans into the direction of travel, and    */
/* each change of project is "printed" with that client's colour plate. */
/* Clicking morphs the proof into the case-study cover.                 */
/* ------------------------------------------------------------------ */
const Contents = ({ projects }: { projects: Article[] }) => {
  const { t } = useTranslation();
  const listRef = useRef<HTMLOListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0, r: 0 });
  const raf = useRef(0);
  const [hover, setHover] = useState<string | null>(null);
  const enabled = useRef(false);

  useEffect(() => {
    enabled.current = hasFinePointer();
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const tick = () => {
    const el = previewRef.current;
    if (!el) return;
    const p = pos.current;
    const dx = target.current.x - p.x;
    const dy = target.current.y - p.y;
    p.x += dx * 0.16;
    p.y += dy * 0.16;
    // lean into the movement, clamped to ±7°
    p.r += (Math.max(-7, Math.min(7, dx * 0.08)) - p.r) * 0.2;
    el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) rotate(${p.r.toFixed(2)}deg)`;
    raf.current = Math.abs(dx) + Math.abs(dy) + Math.abs(p.r) > 0.2 ? requestAnimationFrame(tick) : 0;
  };

  const onMove = (e: React.MouseEvent) => {
    const list = listRef.current;
    if (!list || !enabled.current) return;
    const r = list.getBoundingClientRect();
    target.current = { x: e.clientX - r.left + 28, y: e.clientY - r.top - 100 };
    if (prefersReducedMotion()) {
      pos.current = { ...target.current, r: 0 };
      if (previewRef.current) previewRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0)`;
      return;
    }
    if (!raf.current) raf.current = requestAnimationFrame(tick);
  };

  const onEnterList = (e: React.MouseEvent) => {
    // start the proof under the pointer instead of flying in from the corner
    const list = listRef.current;
    if (!list) return;
    const r = list.getBoundingClientRect();
    const start = { x: e.clientX - r.left + 28, y: e.clientY - r.top - 100 };
    target.current = start;
    pos.current = { ...start, r: 0 };
  };

  const hovered = projects.find((p) => p.id === hover);
  const accent = hovered ? getProjectMeta(hovered.id).accent : "transparent";

  return (
    <Reveal variant="stage" className="relative">
      <p className="slug mb-3">{t("site.work.contents")}</p>
      <ol
        ref={listRef}
        onMouseMove={onMove}
        onMouseEnter={onEnterList}
        onMouseLeave={() => setHover(null)}
        className="stagger relative border-t border-foreground"
        style={vars({ "--stagger-base": "150ms" })}
      >
        {projects.map((p, i) => {
          const meta = getProjectMeta(p.id);
          return (
            <li key={p.id} className="border-b border-foreground/15" style={vars({ "--i": i })}>
              <TransitionLink
                to={`/article/${p.id}`}
                coverId={p.id}
                onMouseEnter={() => setHover(p.id)}
                onFocus={() => setHover(p.id)}
                onBlur={() => setHover(null)}
                className="group relative grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-4 sm:grid-cols-[3rem_minmax(0,1.3fr)_minmax(0,1fr)_5rem_auto] sm:py-5"
              >
                <span className="row-fill absolute inset-0 -z-0 opacity-[0.12]" style={{ background: meta.accent }} aria-hidden="true" />
                <span className="relative font-mono text-xs text-muted-foreground">{p.id}</span>
                <span className="relative flex items-center gap-3 text-2xl font-semibold tracking-tight transition-transform duration-500 ease-proof group-hover:translate-x-2 sm:text-3xl">
                  <span
                    className="h-2.5 w-2.5 shrink-0 scale-0 rounded-full transition-transform duration-300 ease-proof group-hover:scale-100 group-focus-visible:scale-100"
                    style={{ background: meta.accent }}
                    aria-hidden="true"
                  />
                  {p.title}
                </span>
                <span className="relative hidden truncate text-base text-muted-foreground transition-colors group-hover:text-foreground sm:block">
                  {p.subtitle}
                </span>
                <span className="relative hidden font-mono text-xs text-muted-foreground sm:block">{meta.year}</span>
                <span className="arrow-slide relative h-5 w-5 justify-self-end text-muted-foreground group-hover:text-foreground" aria-hidden="true">
                  <ArrowUpRight className="h-5 w-5" />
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </TransitionLink>
            </li>
          );
        })}
      </ol>

      {/* Trailing proof (decorative; precise pointers only) */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-10 hidden w-[320px] will-change-transform [@media(hover:hover)_and_(pointer:fine)]:block"
      >
        <div
          className={`relative origin-top-left overflow-hidden shadow-[0_24px_48px_-24px_rgba(0,0,0,.55)] transition-[opacity,transform] duration-300 ease-proof ${
            hovered ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
          data-vt-cover={hovered?.id}
        >
          {projects.map((p) => (
            <img
              key={p.id}
              src={p.image}
              srcSet={coverSrcSet(p.image)}
              sizes="320px"
              alt=""
              width={1672}
              height={941}
              loading="lazy"
              className={`aspect-video w-full object-cover ${p.id === hover ? "block" : "hidden"}`}
            />
          ))}
          {hovered && <span key={hovered.id} className="preview-wipe" style={{ background: accent }} />}
        </div>
      </div>
    </Reveal>
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
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.2, 6);
  const folio = project.id.slice(1);

  return (
    <article aria-labelledby={`p-${project.id}`} className="grid gap-8 border-t border-foreground/15 py-14 sm:py-20 lg:grid-cols-12 lg:gap-12">
      {/* Visuals: colour plate, then the image settles, then crop marks */}
      <Reveal variant="stage" className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <TransitionLink
          to={`/article/${project.id}`}
          coverId={project.id}
          className="group block"
          tabIndex={-1}
          aria-hidden="true"
          data-cursor={t("site.work.open")}
        >
          <div className="crop crop-hover m-[22px] sm:m-6">
            <div className="plate bg-muted" style={vars({ "--plate": meta.accent })} data-vt-cover={project.id}>
              <div className="sd-parallax">
                <div className="transition-transform duration-700 ease-proof group-hover:scale-[1.035]">
                  <img
                    src={project.image}
                    srcSet={coverSrcSet(project.image)}
                    sizes="(min-width: 1280px) 700px, (min-width: 1024px) 55vw, 92vw"
                    alt=""
                    width={1672}
                    height={941}
                    loading="lazy"
                    decoding="async"
                    className="plate-img block aspect-video w-full object-cover outline outline-1 -outline-offset-1 outline-foreground/10"
                  />
                </div>
              </div>
            </div>
          </div>
        </TransitionLink>
        <ul className="stagger mt-2 grid grid-cols-3 gap-2 px-[22px] sm:gap-3 sm:px-6" style={vars({ "--stagger-base": "700ms" })}>
          {meta.samples.map((src, i) => {
            const [w, h] = sizeOf(src);
            return (
              <li key={src} className="group/s overflow-hidden bg-muted" style={vars({ "--i": i })}>
                <img
                  src={thumb(src)}
                  srcSet={thumbSrcSet(src)}
                  sizes="(min-width: 1280px) 220px, (min-width: 1024px) 18vw, 30vw"
                  alt={`${t("site.work.previewOf", { title: project.title })} (${i + 1}/3)`}
                  width={w}
                  height={h}
                  loading="lazy"
                  decoding="async"
                  className={`w-full object-cover transition-transform duration-700 ease-proof group-hover/s:scale-[1.06] ${isPrint ? "aspect-[4/3]" : "aspect-square"}`}
                />
              </li>
            );
          })}
        </ul>
      </Reveal>

      {/* Text */}
      <Reveal variant="stage" className={`flex flex-col lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <div className="flex items-start justify-between gap-6">
          <span className="sd-folio block" aria-hidden="true">
            <span
              className="block whitespace-nowrap font-sans text-[clamp(4rem,20vw,5.5rem)] font-semibold leading-none tracking-[-0.06em] sm:text-[7rem]"
              style={{ color: meta.accent, WebkitTextStroke: "1.5px hsl(var(--foreground))" }}
            >
              {/* digits roll up like a numbering machine */}
              {folio.split("").map((d, i) => (
                <span className="mw" key={i}>
                  <span style={vars({ "--i": i, "--mw-base": "120ms" })}>{d}</span>
                </span>
              ))}
            </span>
          </span>
          <span className="slug stagger mt-3 min-w-0 text-right" style={vars({ "--stagger-base": "300ms" })}>
            <span className="block">{meta.discipline === "print" ? t("site.work.disciplinePrint") : t("site.work.disciplineSocial")}</span>
          </span>
        </div>

        <h3 id={`p-${project.id}`} className="mt-6 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
          <MaskText base={260}>{project.title}</MaskText>
        </h3>
        <div className="stagger" style={vars({ "--stagger-base": "420ms" })}>
          <p className="mt-2 text-xl font-medium tracking-tight text-muted-foreground" style={vars({ "--i": 0 })}>
            {project.subtitle}
          </p>
          <p className="mt-6 max-w-prose leading-relaxed text-foreground/80" style={vars({ "--i": 1 })}>
            {project.content.introduction}
          </p>
        </div>

        <dl className="stagger mt-8 grid grid-cols-2 gap-x-6 border-t border-foreground/15 text-sm" style={vars({ "--stagger-base": "560ms" })}>
          {[
            [t("site.work.sector"), project.category],
            [t("site.work.year"), meta.year],
            [t("site.work.deliverables"), project.deliverablesCount ?? "—"],
            [t("site.work.discipline"), meta.discipline === "print" ? t("site.work.print") : t("site.work.social")],
          ].map(([k, v], i) => (
            <div key={k} className="border-b border-foreground/15 py-3" style={vars({ "--i": i })}>
              <dt className="slug">{k}</dt>
              <dd className="mt-1 font-medium">{v}</dd>
            </div>
          ))}
        </dl>

        {project.keySkills && <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{project.keySkills.join(" · ")}</p>}

        <div className="mt-8 lg:mt-auto lg:pt-8">
          <TransitionLink
            ref={ctaRef}
            to={`/article/${project.id}`}
            coverId={project.id}
            className="press group inline-flex items-center gap-3 rounded-full border border-foreground px-5 py-3 text-sm font-semibold hover:bg-foreground hover:text-background"
          >
            <span className="h-2.5 w-2.5 rounded-full transition-transform duration-300 ease-proof group-hover:scale-150" style={{ background: meta.accent }} aria-hidden="true" />
            {t("site.work.open")}
            <span className="sr-only">: {project.title}</span>
            <span className="arrow-slide h-4 w-4" aria-hidden="true">
              <ArrowUpRight className="h-4 w-4" />
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </TransitionLink>
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

      <div className="mt-12">
        <Contents projects={projects} />
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label={t("site.work.discipline")} className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`press min-h-11 rounded-full border px-4 py-2 text-sm font-medium md:min-h-0 ${
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

      {/* keyed by filter: the new selection is re-printed rather than snapped in */}
      <div className="mt-6" key={filter}>
        {shown.map((p, i) => (
          <Spread key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Work;
