import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleNavClick = (anchor: string) => {
    setIsMenuOpen(false);
    if (isHomePage) {
      const el = document.querySelector(anchor);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = `/${anchor}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 py-1.5 sm:py-2 bg-background/85 backdrop-blur-md border-b border-border/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-11 sm:h-12">
          {/* Logo / Folio Wordmark */}
          <div className="flex items-center gap-3">
            <Link to="/" className="group flex items-baseline gap-2 text-foreground hover:opacity-90 transition-opacity">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tighter text-foreground font-sans">
                fol<span className="text-[#F44B0B] inline-block scale-125 transition-transform group-hover:scale-150 duration-300">•</span>io
              </span>
              <span className="hidden sm:inline-block text-[11px] font-semibold text-muted-foreground uppercase tracking-widest pl-2 border-l border-border">
                {t("header.ferielBouzid")}
              </span>
            </Link>
          </div>

          {/* Desktop Single-Page Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => handleNavClick("#work")}
              className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/70 rounded-full px-3.5 py-1.5 transition-all cursor-pointer"
            >
              {t("common.projects")}
            </button>
            <button
              onClick={() => handleNavClick("#about")}
              className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/70 rounded-full px-3.5 py-1.5 transition-all cursor-pointer"
            >
              {t("common.about")}
            </button>
            <button
              onClick={() => handleNavClick("#experience")}
              className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/70 rounded-full px-3.5 py-1.5 transition-all cursor-pointer"
            >
              {t("common.experience")}
            </button>
            <button
              onClick={() => handleNavClick("#skills")}
              className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/70 rounded-full px-3.5 py-1.5 transition-all cursor-pointer"
            >
              {t("common.skills")}
            </button>
            <button
              onClick={() => handleNavClick("#contact")}
              className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/70 rounded-full px-3.5 py-1.5 transition-all cursor-pointer"
            >
              {t("common.contact")}
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
            {/* Direct Get in touch CTA */}
            <button
              onClick={() => handleNavClick("#contact")}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-foreground text-background text-xs font-semibold hover:bg-foreground/90 transition-all cursor-pointer shadow-sm"
            >
              <span>{t("index.getInTouch")}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#F44B0B]" />
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded-full border border-border/80 hover:bg-muted/60 transition-all text-[11px] font-bold tracking-wider"
              aria-label={t("header.toggleLanguage")}
            >
              {language.toUpperCase()}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full border border-border/80 hover:bg-muted/60 transition-all text-muted-foreground hover:text-foreground"
              aria-label={t("header.toggleTheme")}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-1.5 rounded-full border border-border text-foreground hover:bg-muted/60"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={t("header.toggleMenu")}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border mt-3 space-y-2 animate-fade-in">
            <button
              onClick={() => handleNavClick("#work")}
              className="w-full text-left px-3 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors"
            >
              {t("common.projects")}
            </button>
            <button
              onClick={() => handleNavClick("#about")}
              className="w-full text-left px-3 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors"
            >
              {t("common.about")}
            </button>
            <button
              onClick={() => handleNavClick("#experience")}
              className="w-full text-left px-3 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors"
            >
              {t("common.experience")}
            </button>
            <button
              onClick={() => handleNavClick("#skills")}
              className="w-full text-left px-3 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors"
            >
              {t("common.skills")}
            </button>
            <button
              onClick={() => handleNavClick("#contact")}
              className="w-full text-left px-3 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors"
            >
              {t("common.contact")}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
