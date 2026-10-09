import React from "react";
import { ArrowDown, ArrowUpRight, Sparkles, Mail, Linkedin, Instagram } from "lucide-react";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();

  const scrollToWork = () => {
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 md:pt-14 md:pb-20 border-b border-border/60">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Folio 2020 Typography & Editorial Hierarchy */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8">
          
          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2.5 self-start px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>{t("index.availableForWork")}</span>
          </div>

          {/* Main Folio 2020 Headline */}
          <div className="space-y-3">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#F44B0B] font-mono block">
              {t("index.heroGreeting")} {t("header.ferielBouzid")}
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-sans tracking-tight text-foreground leading-[1.08]">
              {t("index.heroStatement")}
            </h1>
          </div>

          {/* Editorial Paragraph */}
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl font-normal">
            {t("index.heroDescriptionFull")}
          </p>

          {/* Action CTAs & Social Links */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            <button
              onClick={scrollToWork}
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-[#F44B0B] text-white font-semibold text-sm hover:bg-[#F44B0B]/90 shadow-md shadow-[#F44B0B]/20 transition-all cursor-pointer hover:translate-y-[-1px]"
            >
              <span>{t("index.exploreWork")}</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>

            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full border border-border bg-card hover:bg-muted text-foreground font-semibold text-sm transition-all cursor-pointer shadow-sm hover:translate-y-[-1px]"
            >
              <span>{t("index.getInTouch")}</span>
              <ArrowUpRight className="w-4 h-4 text-[#F44B0B]" />
            </button>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pl-2">
              <a
                href="mailto:ferielbouzzid@gmail.com"
                className="w-10 h-10 rounded-full border border-border/80 bg-card hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
                title={t("contact.emailLabel")}
                aria-label={t("contact.emailLabel")}
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                 className="w-10 h-10 rounded-full border border-border/80 bg-card hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
                 title={t("hero.linkedinAria")}
                 aria-label={t("hero.linkedinAria")}
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://behance.net"
                target="_blank"
                rel="noopener noreferrer"
                 className="w-10 h-10 rounded-full border border-border/80 bg-card hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
                 title={t("hero.behanceTitle")}
                 aria-label={t("hero.behanceAria")}
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border/60">
            <div>
              <span className="block font-sans font-bold text-2xl sm:text-3xl text-foreground">06</span>
              <span className="text-xs text-muted-foreground font-medium">{t("index.projectsCompleted")}</span>
            </div>
            <div>
              <span className="block font-sans font-bold text-2xl sm:text-3xl text-foreground">3+</span>
              <span className="text-xs text-muted-foreground font-medium">{t("index.yearsExperience")}</span>
            </div>
            <div>
              <span className="block font-sans font-bold text-2xl sm:text-3xl text-foreground">100%</span>
              <span className="text-xs text-muted-foreground font-medium">{t("index.craftSatisfaction")}</span>
            </div>
            <div>
              <span className="block font-sans font-bold text-2xl sm:text-3xl text-foreground">TN</span>
              <span className="text-xs text-muted-foreground font-medium">{t("index.nabeulTunisia")}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Folio 2020 Featured Spotlight Preview Card */}
        <div className="lg:col-span-5 relative">
          <div
            onClick={scrollToWork}
            className="group relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] rounded-3xl overflow-hidden border border-border/80 bg-card shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <img
              src="/images/projects/moderna/1.png"
              alt={t("hero.featuredImageAlt")}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Soft dark vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Folio top corner badge */}
            <div className="absolute top-5 left-5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-[#F44B0B]" />
                {t("hero.spotlightWork")}
              </span>
            </div>

            {/* Bottom Project Tag */}
            <div className="absolute bottom-5 left-5 right-5 p-5 rounded-2xl bg-card/90 dark:bg-card/85 backdrop-blur-md border border-border/60 text-foreground transition-transform duration-300 group-hover:-translate-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground font-mono mb-1">
                <span className="text-[#F44B0B] font-bold uppercase tracking-wider">{t("hero.featuredSubtitle")}</span>
                <span>2024</span>
              </div>
              <h3 className="text-lg font-bold font-sans text-foreground">
                {t("hero.featuredTitle")}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                {t("hero.featuredDesc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
