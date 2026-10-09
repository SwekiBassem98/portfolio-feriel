import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowDownRight, ArrowDownToLine, ArrowUpRight, Shuffle } from "lucide-react";
import type { Article } from "@/data/articles.en";
import { PROFILE, getProjectMeta } from "@/data/site";

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return reduced;
};

/**
 * The hero's interactive detail: the six project covers as a stack of
 * printed proofs. Clicking (or the Shuffle button) sends the top proof to
 * the back; the top proof always links to its case study.
 */
const ProofStack = ({ projects }: { projects: Article[] }) => {
  const { t } = useTranslation();
  const reduced = usePrefersReducedMotion();
  const [order, setOrder] = useState(() => projects.map((_, i) => i));
  const [paused, setPaused] = useState(false);
  const touched = useRef(false);

  useEffect(() => setOrder(projects.map((_, i) => i)), [projects]);

  const shuffle = useCallback(() => setOrder((o) => [...o.slice(1), o[0]]), []);

  // Gentle auto-advance until the visitor interacts; never with reduced motion
  useEffect(() => {
    if (reduced || paused || touched.current) return;
    const id = window.setInterval(shuffle, 4200);
    return () => window.clearInterval(id);
  }, [reduced, paused, shuffle]);

  const front = projects[order[0]];
  if (!front) return null;
  const frontMeta = getProjectMeta(front.id);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative aspect-[16/11] w-full" role="group" aria-label={t("site.hero.stackLabel")}>
        {order.map((projectIndex, pos) => {
          const p = projects[projectIndex];
          const depth = Math.min(pos, 4);
          const rot = [-2.5, 3.5, -5, 6, -7][depth];
          const x = [0, 3, -4, 6, -6][depth];
          const y = [0, -3, -6, -8, -10][depth];
          return (
            <button
              key={p.id}
              type="button"
              tabIndex={-1}
              aria-hidden={pos !== 0}
              onClick={() => {
                touched.current = true;
                shuffle();
              }}
              className="absolute inset-x-[6%] top-[8%] block cursor-pointer outline-none transition-[transform,opacity] duration-700 ease-proof"
              style={{
                zIndex: 20 - pos,
                transform: `translate(${x}%, ${y}%) rotate(${rot}deg)`,
                opacity: pos > 4 ? 0 : 1,
              }}
            >
              <span className="block overflow-hidden bg-card outline outline-1 -outline-offset-1 outline-foreground/10 shadow-[0_1px_0_rgba(0,0,0,.08),0_18px_40px_-18px_rgba(20,19,18,.45)]">
                <img
                  src={p.image}
                  alt=""
                  width={1672}
                  height={941}
                  className="block aspect-video w-full object-cover"
                  loading={pos < 2 ? "eager" : "lazy"}
                  decoding="async"
                />
              </span>
            </button>
          );
        })}
      </div>

      {/* Caption + accessible controls for the top proof */}
      <div className="mt-3 flex items-center justify-between gap-3 border-t border-foreground/15 pt-3">
        <Link to={`/article/${front.id}`} className="group flex min-w-0 items-center gap-3">
          <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: frontMeta.accent }} aria-hidden="true" />
          <span className="font-mono text-[11px] text-muted-foreground">{front.id}</span>
          <span className="shrink-0 text-sm font-semibold">{front.title}</span>
          <span className="hidden min-w-0 truncate text-sm text-muted-foreground sm:inline">— {front.subtitle}</span>
          <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          <span className="sr-only">{t("site.hero.openFront")}</span>
        </Link>
        <button
          type="button"
          onClick={() => {
            touched.current = true;
            shuffle();
          }}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-foreground/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors hover:border-foreground"
        >
          <Shuffle className="h-3.5 w-3.5" aria-hidden="true" />
          {t("site.hero.shuffle")}
        </button>
      </div>
    </div>
  );
};

const Hero = ({ projects }: { projects: Article[] }) => {
  const { t } = useTranslation();
  const facts = useMemo(
    () => [
      { value: "3", label: t("site.hero.factYears") },
      { value: String(projects.length).padStart(2, "0"), label: t("site.hero.factProjects") },
      { value: "AR · FR · EN", label: t("site.hero.factLanguages"), small: true },
      { value: "2022", label: t("site.hero.factEducation") },
    ],
    [t, projects.length],
  );

  const scrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section aria-labelledby="hero-title" className="relative pb-16 pt-8 sm:pt-12 lg:pb-24">
      {/* Slug line */}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-foreground/15 pb-3">
        <span className="slug">{t("site.hero.kicker")}</span>
        <span className="slug hidden sm:inline">{t("site.hero.disciplines")}</span>
        <span className="slug inline-flex items-center gap-2">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {t("site.hero.based")}
        </span>
      </div>

      <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h1 id="hero-title" className="font-sans font-semibold leading-[0.86] tracking-[-0.045em]">
            <span className="block text-[clamp(4.25rem,15vw,10.5rem)]">Feriel</span>
            <span className="block pl-[0.6em] text-[clamp(4.25rem,15vw,10.5rem)]">
              Bouzid<span className="text-spot">.</span>
            </span>
            <span className="mt-4 block font-serif text-[clamp(1.6rem,3.6vw,2.6rem)] font-normal italic leading-tight tracking-normal text-muted-foreground">
              {t("site.hero.role")} — <span className="text-foreground">{t("site.hero.short")}</span>
            </span>
          </h1>

          <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-foreground/80 sm:text-xl">
            {t("site.hero.statementA")} <em className="font-serif text-[1.15em] italic text-foreground">{t("site.hero.statementEm")}</em>{" "}
            {t("site.hero.statementB")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              onClick={scrollToWork}
              className="group inline-flex items-center gap-2 rounded-full bg-spot px-6 py-3.5 text-sm font-semibold text-[#141312] transition-transform hover:-translate-y-0.5"
            >
              {t("site.hero.ctaWork")}
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
            <a
              href={PROFILE.cvUrl}
              download={PROFILE.cvFileName}
              className="inline-flex items-center gap-2 rounded-full border border-foreground/25 px-6 py-3.5 text-sm font-semibold transition-colors hover:border-foreground"
            >
              <ArrowDownToLine className="h-4 w-4" aria-hidden="true" />
              {t("site.hero.ctaCv")}
            </a>
            <a href={`mailto:${PROFILE.email}`} className="ink-link px-2 py-3 text-sm font-semibold">
              {PROFILE.email}
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 lg:pt-6">
          <ProofStack projects={projects} />
          <p className="mt-6 font-serif text-xl italic text-muted-foreground">“{t("site.hero.motto")}”</p>
        </div>
      </div>

      {/* Facts as a proof-sheet table */}
      <dl className="mt-14 grid grid-cols-2 border-t border-foreground/15 lg:mt-20 lg:grid-cols-4">
        {facts.map((f, i) => (
          <div
            key={f.label}
            className={`flex flex-col border-b border-foreground/15 py-5 pr-4 lg:border-b-0 ${i % 2 === 1 ? "pl-4 lg:pl-6" : "lg:pl-6"} ${
              i > 0 ? "lg:border-l" : "lg:!pl-0"
            } ${i % 2 === 1 ? "border-l lg:border-l" : ""}`}
          >
            <dt className="slug order-2 mt-1">{f.label}</dt>
            <dd className={`order-1 font-semibold tracking-tight ${f.small ? "text-2xl sm:text-3xl" : "text-4xl sm:text-5xl"}`}>{f.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default Hero;
