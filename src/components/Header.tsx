import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Moon, Sun, ArrowDownToLine } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { PROFILE } from "@/data/site";

const SECTIONS = ["work", "about", "experience", "skills", "contact"] as const;
type Section = (typeof SECTIONS)[number];

/** Printer's registration mark — the site's small signature glyph. */
export const RegMark = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 20 20" aria-hidden="true" className={className}>
    <circle cx="10" cy="10" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
    <path d="M10 0v20M0 10h20" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="10" cy="10" r="2" fill="hsl(var(--spot))" />
  </svg>
);

const useActiveSection = (enabled: boolean) => {
  const [active, setActive] = useState<Section | null>(null);
  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === "undefined") return;
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(hit.target.id as Section);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    const onTop = () => window.scrollY < 200 && setActive(null);
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, [enabled]);
  return active;
};

const Header = () => {
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const active = useActiveSection(isHome);
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined" ? document.documentElement.classList.contains("dark") : false,
  );
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock scroll, close on Escape, keep focus inside
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = menuRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && menuRef.current) {
        const f = menuRef.current.querySelectorAll<HTMLElement>("a,button");
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
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  };

  const goTo = (id: Section) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    } else {
      navigate(`/#${id}`);
    }
  };

  const iconBtn =
    "inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 text-foreground/80 transition-colors hover:border-foreground hover:text-foreground";

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[200] focus:rounded focus:bg-foreground focus:px-3 focus:py-2 focus:text-background"
      >
        {t("site.nav.skip")}
      </a>
      <header
        className={`sticky top-0 z-50 transition-[background-color,border-color] duration-300 ${
          scrolled || open ? "border-b border-foreground/10 bg-background/90 backdrop-blur-md" : "border-b border-transparent bg-background"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          <Link to="/" className="group flex items-center gap-2.5" aria-label={t("site.nav.home")} onClick={() => setOpen(false)}>
            <RegMark className="h-5 w-5 text-foreground transition-transform duration-500 group-hover:rotate-90" />
            <span className="text-[15px] font-semibold tracking-tight">Feriel Bouzid</span>
            <span className="hidden font-serif text-[17px] italic text-muted-foreground xl:inline">— {t("site.hero.role").toLowerCase()}</span>
          </Link>

          <nav aria-label={t("site.nav.primary")} className="hidden md:block">
            <ul className="flex items-center gap-1">
              {SECTIONS.map((id, i) => {
                const isActive = active === id;
                return (
                  <li key={id}>
                    <a
                      href={`/#${id}`}
                      onClick={goTo(id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`group relative flex items-baseline gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors ${
                        isActive ? "text-foreground" : "text-foreground/65 hover:text-foreground"
                      }`}
                    >
                      <span className={`font-mono text-[10px] transition-colors ${isActive ? "spot-ink" : "text-muted-foreground"}`}>
                        0{i + 1}
                      </span>
                      {t(`site.nav.${id}`)}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-foreground transition-transform duration-500 ease-proof ${
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={PROFILE.cvUrl}
              download={PROFILE.cvFileName}
              className="hidden items-center gap-1.5 rounded-full bg-foreground px-3.5 py-2 text-xs font-semibold text-background transition-colors hover:bg-spot hover:text-foreground sm:inline-flex"
            >
              <ArrowDownToLine className="h-3.5 w-3.5" aria-hidden="true" />
              {t("site.nav.cv")}
            </a>
            <button
              type="button"
              onClick={toggleLanguage}
              className={`${iconBtn} font-mono text-[11px] font-medium`}
              aria-label={t("header.toggleLanguage")}
              title={language === "en" ? "Français" : "English"}
            >
              {language === "en" ? "FR" : "EN"}
            </button>
            <button type="button" onClick={toggleTheme} className={iconBtn} aria-label={t("header.toggleTheme")} aria-pressed={isDark}>
              {isDark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
            </button>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex h-9 items-center gap-2 rounded-full border border-foreground/15 px-3 text-xs font-semibold md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-2.5 w-4" aria-hidden="true">
                <span className={`absolute left-0 top-0 h-px w-4 bg-current transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`} />
                <span className={`absolute bottom-0 left-0 h-px w-4 bg-current transition-transform ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
              </span>
              {open ? t("site.nav.close") : t("site.nav.menu")}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu: full-screen "contents page" */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("site.nav.primary")}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-background px-4 pb-10 pt-6 sm:px-6 md:hidden"
      >
        <p className="slug mb-4">{t("site.work.contents")}</p>
        <ul className="border-t border-foreground/15">
          {SECTIONS.map((id, i) => (
            <li key={id} className="border-b border-foreground/15">
              <a href={`/#${id}`} onClick={goTo(id)} className="flex items-baseline gap-4 py-4">
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                <span className="text-4xl font-semibold tracking-tight">{t(`site.nav.${id}`)}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3">
          <a
            href={PROFILE.cvUrl}
            download={PROFILE.cvFileName}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background"
          >
            <ArrowDownToLine className="h-4 w-4" aria-hidden="true" />
            {t("site.hero.ctaCv")}
          </a>
          <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-5 py-3 text-sm font-semibold">
            {PROFILE.email}
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
