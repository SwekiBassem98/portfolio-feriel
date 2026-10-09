import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { ArrowDownRight, ArrowDownToLine, ArrowUpRight, Shuffle } from "lucide-react";
import type { Article } from "@/data/articles.en";
import { PROFILE, coverSrcSet, getProjectMeta } from "@/data/site";
import { hasFinePointer, useMagnetic, useReducedMotion } from "@/lib/motion";
import MaskText from "./MaskText";
import RegisterText from "./RegisterText";
import TransitionLink from "./TransitionLink";

/* ------------------------------------------------------------------ */
/* Opening sequence                                                    */
/* ------------------------------------------------------------------ */
/**
 * "full" on the first visit of the session (≈1.4s choreography, content is
 * readable from the first frames), "quick" afterwards, "none" for reduced
 * motion. Nothing blocks the page: there is no loader or overlay.
 */
type IntroMode = "full" | "quick" | "none";
const useIntroMode = (): IntroMode => {
  const [mode] = useState<IntroMode>(() => {
    if (typeof window === "undefined") return "none";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "none";
    if (document.documentElement.classList.contains("lite")) return "quick";
    try {
      return sessionStorage.getItem("intro-seen") ? "quick" : "full";
    } catch {
      return "full";
    }
  });
  useLayoutEffect(() => {
    document.documentElement.dataset.intro = mode;
    try {
      sessionStorage.setItem("intro-seen", "1");
    } catch {
      /* storage unavailable */
    }
  }, [mode]);
  return mode;
};

/** Inline style helper for the intro choreography. */
const at = (base: number, i = 0): CSSProperties => ({ ["--intro-base" as string]: `${base}ms`, ["--i" as string]: i });

/* ------------------------------------------------------------------ */
/* Proof stack                                                         */
/* ------------------------------------------------------------------ */
/**
 * The six covers as a stack of printed proofs. They are dealt onto the
 * table on arrival, tilt towards the pointer, fan out on hover, and the top
 * proof is sent to the back on click (or with the Shuffle button).
 */
const ProofStack = ({ projects }: { projects: Article[] }) => {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const [order, setOrder] = useState(() => projects.map((_, i) => i));
  const [paused, setPaused] = useState(false);
  const touched = useRef(false);
  const stackRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => setOrder(projects.map((_, i) => i)), [projects]);
  const shuffle = useCallback(() => setOrder((o) => [...o.slice(1), o[0]]), []);

  // Only animate while the stack is actually on screen (saves battery on phones)
  const [onScreen, setOnScreen] = useState(true);
  useEffect(() => {
    const el = stackRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Gentle auto-advance until the visitor interacts; never with reduced
  // motion or in the lite tier, and paused off-screen / in background tabs
  useEffect(() => {
    if (reduced || paused || !onScreen || touched.current || document.documentElement.classList.contains("lite")) return;
    const id = window.setInterval(() => {
      if (!document.hidden) shuffle();
    }, 4200);
    return () => window.clearInterval(id);
  }, [reduced, paused, onScreen, shuffle]);

  // Pointer tilt (desktop only): one rAF per pointer move, max ±6°
  useEffect(() => {
    const stack = stackRef.current;
    const tilt = tiltRef.current;
    if (!stack || !tilt || reduced || !hasFinePointer()) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = stack.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        tilt.style.setProperty("--tilt-y", `${(px * 12).toFixed(2)}deg`);
        tilt.style.setProperty("--tilt-x", `${(-py * 10).toFixed(2)}deg`);
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      tilt.style.setProperty("--tilt-y", "0deg");
      tilt.style.setProperty("--tilt-x", "0deg");
    };
    stack.addEventListener("pointermove", onMove);
    stack.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      stack.removeEventListener("pointermove", onMove);
      stack.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  const front = projects[order[0]];
  if (!front) return null;
  const frontMeta = getProjectMeta(front.id);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div ref={stackRef} className="stack sd-stack relative" data-cursor={t("site.hero.shuffle")}>
        <div ref={tiltRef} className="stack-tilt relative aspect-[16/11] w-full" role="group" aria-label={t("site.hero.stackLabel")}>
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
                  transform: `translate3d(calc(${x}% * var(--spread)), calc(${y}% * var(--spread)), ${-pos * 12}px) rotate(calc(${rot}deg * var(--spread)))`,
                  opacity: pos > 4 ? 0 : 1,
                }}
              >
                <span
                  className="deal block overflow-hidden bg-card shadow-[0_1px_0_rgba(0,0,0,.08),0_18px_40px_-18px_rgba(20,19,18,.45)] outline outline-1 -outline-offset-1 outline-foreground/10"
                  style={at(420, projectIndex)}
                  data-vt-cover={pos === 0 ? p.id : undefined}
                >
                  <img
                    src={p.image}
                    srcSet={coverSrcSet(p.image)}
                    sizes="(min-width: 1024px) 34vw, min(500px, 88vw)"
                    alt=""
                    width={1672}
                    height={941}
                    className="block aspect-video w-full object-cover"
                    loading={pos < 2 ? "eager" : "lazy"}
                    decoding="async"
                    draggable={false}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Caption + accessible controls for the top proof */}
      <div className="intro-item mt-3 flex items-center justify-between gap-3 border-t border-foreground/15 pt-3" style={at(1050)}>
        <TransitionLink to={`/article/${front.id}`} coverId={front.id} className="group -my-2 flex min-h-11 min-w-0 items-center gap-3 py-2">
          <span className="h-3 w-3 shrink-0 rounded-full transition-colors duration-500" style={{ background: frontMeta.accent }} aria-hidden="true" />
          <span className="font-mono text-[11px] text-muted-foreground">{front.id}</span>
          <span key={front.id} className="mw mw-swap shrink-0">
            <span className="text-sm font-semibold">
              {front.title}
            </span>
          </span>
          <span className="hidden min-w-0 truncate text-sm text-muted-foreground sm:inline">— {front.subtitle}</span>
          <span className="arrow-slide h-4 w-4 shrink-0" aria-hidden="true">
            <ArrowUpRight className="h-4 w-4" />
            <ArrowUpRight className="h-4 w-4" />
          </span>
          <span className="sr-only">{t("site.hero.openFront")}</span>
        </TransitionLink>
        <button
          type="button"
          onClick={() => {
            touched.current = true;
            shuffle();
          }}
          className="press group inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full border border-foreground/15 px-3.5 py-2 font-mono text-[11px] uppercase tracking-wider hover:border-foreground"
        >
          <Shuffle className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-180" aria-hidden="true" />
          {t("site.hero.shuffle")}
        </button>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
const Hero = ({ projects }: { projects: Article[] }) => {
  const { t } = useTranslation();
  const mode = useIntroMode();
  const primaryRef = useMagnetic<HTMLAnchorElement>();
  const cvRef = useMagnetic<HTMLAnchorElement>(0.18, 6);
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

  const playing = mode !== "none";

  return (
    <section aria-labelledby="hero-title" className="relative pb-16 pt-8 sm:pt-12 lg:pb-24">
      {/* Slug line: the rule is drawn first, like a guide on a fresh sheet */}
      <div className="relative flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pb-3">
        <span className="slug intro-item" style={at(150, 0)}>
          {t("site.hero.kicker")}
        </span>
        <span className="slug intro-item hidden sm:inline" style={at(150, 1)}>
          {t("site.hero.disciplines")}
        </span>
        <span className="slug intro-item inline-flex items-center gap-2" style={at(150, 2)}>
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {t("site.hero.based")}
        </span>
        <span className="intro-rule absolute inset-x-0 bottom-0 h-px bg-foreground/15" aria-hidden="true" />
      </div>

      <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h1 id="hero-title" className={`font-sans font-semibold leading-[0.86] tracking-[-0.045em] ${playing ? "mw-intro" : ""}`}>
            <span className="sd-hero-a block text-[clamp(4.25rem,min(15vw,24svh),10.5rem)]">
              <RegisterText play={mode === "full"} delay={260}>
                <MaskText base={60}>Feriel</MaskText>
              </RegisterText>
            </span>
            <span className="sd-hero-b block text-[clamp(4.25rem,min(15vw,24svh),10.5rem)]">
              <RegisterText play={mode === "full"} delay={360}>
                <MaskText base={60} offset={2}>
                  Bouzid
                </MaskText>
              </RegisterText>
              <span className="intro-item inline-block text-spot" style={at(mode === "full" ? 900 : 300)}>
                .
              </span>
            </span>
            <span
              className="intro-item mt-5 block text-[clamp(1.35rem,2.8vw,2rem)] font-medium leading-tight tracking-[-0.02em] text-muted-foreground"
              style={at(650)}
            >
              {t("site.hero.role")} — <span className="text-foreground">{t("site.hero.short")}</span>
            </span>
          </h1>

          <p className="intro-item mt-8 max-w-[34rem] text-lg leading-relaxed text-foreground/80 sm:text-xl" style={at(760)}>
            {t("site.hero.statementA")} <em className="font-semibold not-italic text-foreground">{t("site.hero.statementEm")}</em>{" "}
            {t("site.hero.statementB")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              ref={primaryRef}
              href="#work"
              onClick={scrollToWork}
              className="press intro-item group inline-flex items-center gap-2 rounded-full bg-spot px-6 py-3.5 text-sm font-semibold text-[#141312]"
              style={at(860, 0)}
            >
              {t("site.hero.ctaWork")}
              <span className="arrow-slide h-4 w-4" aria-hidden="true">
                <ArrowDownRight className="h-4 w-4" />
                <ArrowDownRight className="h-4 w-4" />
              </span>
            </a>
            <a
              ref={cvRef}
              href={PROFILE.cvUrl}
              download={PROFILE.cvFileName}
              className="press intro-item group inline-flex items-center gap-2 rounded-full border border-foreground/25 px-6 py-3.5 text-sm font-semibold hover:border-foreground"
              style={at(860, 1)}
            >
              <ArrowDownToLine className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
              {t("site.hero.ctaCv")}
            </a>
            <a href={`mailto:${PROFILE.email}`} className="intro-item inline-flex min-h-11 items-center px-2 text-sm font-semibold" style={at(860, 2)}>
              <span className="ink-link">{PROFILE.email}</span>
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[560px] lg:col-span-5 lg:mx-0 lg:max-w-none lg:pt-6">
          <ProofStack projects={projects} />
          <p className="intro-item mt-6 text-lg text-muted-foreground" style={at(1150)}>
            “{t("site.hero.motto")}”
          </p>
        </div>
      </div>

      {/* Facts as a proof-sheet table */}
      <dl className="mt-14 grid grid-cols-2 border-t border-foreground/15 lg:mt-20 lg:grid-cols-4">
        {facts.map((f, i) => (
          <div
            key={f.label}
            className={`intro-item flex flex-col border-b border-foreground/15 py-5 pr-4 lg:border-b-0 ${i % 2 === 1 ? "pl-4 lg:pl-6" : "lg:pl-6"} ${
              i > 0 ? "lg:border-l" : "lg:!pl-0"
            } ${i % 2 === 1 ? "border-l lg:border-l" : ""}`}
            style={at(1100, i)}
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
