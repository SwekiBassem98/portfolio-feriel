import { useState, useMemo, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ArticleCard from "@/components/ArticleCard";
import { getArticles } from "@/data/articles";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Calendar,
  Layers,
  Send,
  Sparkles,
  ArrowUp,
  Briefcase,
  CheckCircle2,
} from "lucide-react";
import { toast } from "@/components/ui/sonner";

const Index = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const projectList = useMemo(() => getArticles(language), [language]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projectList;
    if (activeFilter === "social") {
      return projectList.filter((p) =>
        p.category.toLowerCase().includes("social")
      );
    }
    if (activeFilter === "print") {
      return projectList.filter((p) =>
        p.category.toLowerCase().includes("print") ||
        p.category.toLowerCase().includes("brochure") ||
        p.category.toLowerCase().includes("edition") ||
        p.category.toLowerCase().includes("editorial")
      );
    }
    if (activeFilter === "brand") {
      return projectList.filter((p) =>
        p.id === "moderna" || p.id === "il-mercato" || p.id === "cbss" || p.id === "winkler"
      );
    }
    return projectList;
  }, [activeFilter, projectList]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error(t("index.formError"));
      return;
    }

    setFormSubmitted(true);
    toast.success(t("index.formSuccess"));
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[#F44B0B]/20 selection:text-[#F44B0B] transition-colors">
      {/* Sticky Folio Navigation */}
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 md:space-y-32">
        {/* 01. Hero Section matching Folio 2020 */}
        <HeroSection />

        {/* 02. Selected Work Section */}
        <section id="work" className="scroll-mt-24 space-y-8 sm:space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-border/70">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F44B0B]" />
                <span className="text-xs font-semibold uppercase tracking-widest text-[#F44B0B] font-mono">
                  {t("index.selectedWorks")} • {t("index.portfolioYearRange")}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold font-sans tracking-tight text-foreground">
                {t("index.featuredProjects")}
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
                {t("index.selectedWorksSubtitle")}
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-muted/60 dark:bg-muted/30 rounded-full border border-border/60 self-start md:self-end">
              {[
                { id: "all", label: t("index.allFilter") },
                { id: "social", label: t("index.socialMediaFilter") },
                { id: "print", label: t("index.printFilter") },
                { id: "brand", label: t("index.brandFilter") },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeFilter === tab.id
                      ? "bg-foreground text-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/60"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filteredProjects.map((project, idx) => (
              <ArticleCard
                key={project.id}
                id={project.id}
                title={project.title}
                subtitle={project.subtitle}
                category={project.category}
                date={project.date}
                image={project.image}
                size={idx === 0 && filteredProjects.length % 2 !== 0 ? "large" : "small"}
              />
            ))}
          </div>
        </section>

        {/* 03. About Me Section */}
        <section id="about" className="scroll-mt-24 space-y-8 sm:space-y-10">
          <div className="pb-4 border-b border-border/70">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#F44B0B]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#F44B0B] font-mono">
                02 • {t("common.about")}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-sans tracking-tight text-foreground">
              {t("index.aboutMe")}
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Profile Summary Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl bg-card border border-border/80 p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-muted overflow-hidden border border-border/80 shrink-0">
                    <img
                      src="/images/projects/moderna/1.png"
                      alt={t("header.ferielBouzid")}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                     <h3 className="font-sans font-bold text-xl text-foreground">
                       {t("header.ferielBouzid")}
                     </h3>
                    <p className="text-xs sm:text-sm text-[#F44B0B] font-semibold mt-0.5">
                      {t("index.folioTagline")}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{t("index.nabeulTunisia")}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/70 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-medium">
                      {t("index.languagesLocation")}
                    </span>
                    <span className="font-semibold text-foreground">{t("index.languages")}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-medium">{t("index.availabilityLabel")}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                      {t("index.availabilityValue")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-medium">{t("index.workModelLabel")}</span>
                    <span className="font-semibold text-foreground">{t("index.workModelValue")}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="mailto:ferielbouzzid@gmail.com"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-foreground text-background font-semibold text-xs hover:bg-foreground/90 transition-all shadow-sm"
                  >
                    <span>{t("contact.emailValue")}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#F44B0B]" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Story & Design Philosophy */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-foreground leading-snug">
                {t("index.creativeVersatileDesigner")}
              </h3>

              <div className="space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed font-normal">
                <p>{t("index.aboutIntro1")}</p>
                <p>{t("index.aboutIntro2")}</p>
                <p>{t("index.aboutIntro3")}</p>
              </div>

              {/* Working Values / Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                {[
                  { title: t("index.collaborative"), desc: t("index.collaborativeDesc") },
                  { title: t("index.communicative"), desc: t("index.communicativeDesc") },
                  { title: t("index.timeManagement"), desc: t("index.timeManagementDesc") },
                  { title: t("index.autonomous"), desc: t("index.autonomousDesc") },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-card border border-border/80 space-y-1 hover:border-foreground/20 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 text-foreground font-semibold text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F44B0B]" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 04. Experience Timeline Section */}
        <section id="experience" className="scroll-mt-24 space-y-8 sm:space-y-10">
          <div className="pb-4 border-b border-border/70">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#F44B0B]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#F44B0B] font-mono">
                03 • {t("common.experience")}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-sans tracking-tight text-foreground">
              {t("index.careerJourney")}
            </h2>
          </div>

          <div className="space-y-4">
          {/* Experience item 1 */}
          <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border/80 hover:border-foreground/20 transition-all space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#F44B0B]/10 text-[#F44B0B] text-xs font-bold font-mono mb-1">
                  {t("index.exp1Badge")}
                </span>
                <h3 className="font-sans font-bold text-xl text-foreground">
                  {t("index.exp1Title")}
                </h3>
                <p className="text-sm font-semibold text-muted-foreground">
                  {t("index.exp1Company")}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-muted-foreground px-3 py-1.5 rounded-full bg-muted/60 self-start sm:self-center">
                <Calendar className="w-3.5 h-3.5 text-[#F44B0B]" />
                <span>{t("index.exp1Date")}</span>
              </div>
            </div>

            <ul className="grid sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm text-muted-foreground">
              <li className="p-3 rounded-xl bg-muted/40 border border-border/50">
                <span className="font-semibold text-foreground block mb-0.5">{t("index.exp1Bullet1Title")}</span>
                {t("index.exp1Bullet1Desc")}
              </li>
              <li className="p-3 rounded-xl bg-muted/40 border border-border/50">
                <span className="font-semibold text-foreground block mb-0.5">{t("index.exp1Bullet2Title")}</span>
                {t("index.exp1Bullet2Desc")}
              </li>
              <li className="p-3 rounded-xl bg-muted/40 border border-border/50">
                <span className="font-semibold text-foreground block mb-0.5">{t("index.exp1Bullet3Title")}</span>
                {t("index.exp1Bullet3Desc")}
              </li>
            </ul>
          </div>

          {/* Experience item 2 */}
          <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border/80 hover:border-foreground/20 transition-all space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-sans font-bold text-xl text-foreground">
                  {t("index.exp2Title")}
                </h3>
                <p className="text-sm font-semibold text-muted-foreground">
                  {t("index.exp2Company")}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-muted-foreground px-3 py-1.5 rounded-full bg-muted/60 self-start sm:self-center">
                <Calendar className="w-3.5 h-3.5" />
                <span>{t("index.exp2Date")}</span>
              </div>
            </div>

            <ul className="grid sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm text-muted-foreground">
              <li className="p-3 rounded-xl bg-muted/40 border border-border/50">
                <span className="font-semibold text-foreground block mb-0.5">{t("index.exp2Bullet1Title")}</span>
                {t("index.exp2Bullet1Desc")}
              </li>
              <li className="p-3 rounded-xl bg-muted/40 border border-border/50">
                <span className="font-semibold text-foreground block mb-0.5">{t("index.exp2Bullet2Title")}</span>
                {t("index.exp2Bullet2Desc")}
              </li>
              <li className="p-3 rounded-xl bg-muted/40 border border-border/50">
                <span className="font-semibold text-foreground block mb-0.5">{t("index.exp2Bullet3Title")}</span>
                {t("index.exp2Bullet3Desc")}
              </li>
            </ul>
          </div>

          {/* Experience item 3 */}
          <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border/80 hover:border-foreground/20 transition-all space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-sans font-bold text-xl text-foreground">
                  {t("index.exp3Title")}
                </h3>
                <p className="text-sm font-semibold text-muted-foreground">
                  {t("index.exp3Company")}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-muted-foreground px-3 py-1.5 rounded-full bg-muted/60 self-start sm:self-center">
                <Calendar className="w-3.5 h-3.5" />
                <span>{t("index.exp3Date")}</span>
              </div>
            </div>

            <ul className="grid sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm text-muted-foreground">
              <li className="p-3 rounded-xl bg-muted/40 border border-border/50">
                <span className="font-semibold text-foreground block mb-0.5">{t("index.exp3Bullet1Title")}</span>
                {t("index.exp3Bullet1Desc")}
              </li>
              <li className="p-3 rounded-xl bg-muted/40 border border-border/50">
                <span className="font-semibold text-foreground block mb-0.5">{t("index.exp3Bullet2Title")}</span>
                {t("index.exp3Bullet2Desc")}
              </li>
              <li className="p-3 rounded-xl bg-muted/40 border border-border/50">
                <span className="font-semibold text-foreground block mb-0.5">{t("index.exp3Bullet3Title")}</span>
                {t("index.exp3Bullet3Desc")}
              </li>
            </ul>
          </div>
          </div>
        </section>

        {/* 05. Skills & Toolset Section */}
        <section id="skills" className="scroll-mt-24 space-y-8 sm:space-y-10">
          <div className="pb-4 border-b border-border/70">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#F44B0B]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#F44B0B] font-mono">
                04 • {t("common.skills")}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-sans tracking-tight text-foreground">
              {t("index.skillsAndTools")}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Disciplines with clean progress indicators */}
            <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border/80 space-y-6">
              <h3 className="font-sans font-bold text-lg text-foreground flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#F44B0B]" />
                <span>{t("index.coreDisciplines")}</span>
              </h3>

              <div className="space-y-5">
                {[
                  { name: t("index.branding"), level: 95 },
                  { name: t("index.printDesign"), level: 90 },
                  { name: t("index.socialMedia"), level: 90 },
                  { name: t("index.photoEditing"), level: 85 },
                ].map((skill, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-foreground">{skill.name}</span>
                      <span className="text-[#F44B0B] font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#F44B0B] transition-all duration-700 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Creative Software Stack */}
            <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border/80 space-y-6">
              <h3 className="font-sans font-bold text-lg text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F44B0B]" />
                <span>{t("index.toolsSoftware")}</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: "Photoshop", tag: t("index.toolPhotoshopTag") },
                  { name: "Illustrator", tag: t("index.toolIllustratorTag") },
                  { name: "InDesign", tag: t("index.toolInDesignTag") },
                  { name: "Adobe XD", tag: t("index.toolAdobeXdTag") },
                  { name: "Figma", tag: t("index.toolFigmaTag") },
                  { name: "CorelDRAW", tag: t("index.toolCorelDrawTag") },
                ].map((tool, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-muted/40 border border-border/60 hover:border-foreground/20 hover:bg-muted/70 transition-all text-center space-y-1"
                  >
                    <span className="font-sans font-bold text-sm text-foreground block">
                      {tool.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono block">
                      {tool.tag}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-[#F44B0B]/5 border border-[#F44B0B]/20 text-xs text-muted-foreground flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#F44B0B] shrink-0 mt-0.5" />
                 <p>
                   {t("index.skillsProficiency")}
                 </p>
              </div>
            </div>
          </div>
        </section>

        {/* 06. Contact Section */}
        <section id="contact" className="scroll-mt-24 space-y-8 sm:space-y-10">
          <div className="pb-4 border-b border-border/70">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#F44B0B]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#F44B0B] font-mono">
                05 • {t("common.contact")}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-sans tracking-tight text-foreground">
              {t("index.contactSectionHeading")}
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Contact Information & Channels */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                 <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {t("index.contactSectionIntro")}
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href="mailto:ferielbouzzid@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/80 hover:border-[#F44B0B] transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F44B0B]/10 text-[#F44B0B] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                      {t("contact.emailLabel")}
                    </span>
                    <span className="font-sans font-bold text-sm text-foreground group-hover:text-[#F44B0B] transition-colors">
                      {t("contact.emailValue")}
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/80">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                      {t("contact.locationLabel")}
                    </span>
                    <span className="font-sans font-bold text-sm text-foreground">
                      {t("index.contactLocationValue")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Contact Form */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleContactSubmit}
                className="p-6 sm:p-8 rounded-3xl bg-card border border-border/80 space-y-4 shadow-sm"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {t("index.formNameLabel")}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t("index.formNamePlaceholder")}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border/80 text-foreground text-sm focus:outline-none focus:border-[#F44B0B] transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {t("index.formEmailLabel")}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={t("index.formEmailPlaceholder")}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border/80 text-foreground text-sm focus:outline-none focus:border-[#F44B0B] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {t("index.formSubjectLabel")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("index.formSubjectPlaceholder")}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border/80 text-foreground text-sm focus:outline-none focus:border-[#F44B0B] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {t("index.formMessageLabel")}
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder={t("index.formMessagePlaceholder")}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border/80 text-foreground text-sm focus:outline-none focus:border-[#F44B0B] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#F44B0B] text-white font-semibold text-sm hover:bg-[#F44B0B]/90 transition-all shadow-md shadow-[#F44B0B]/20 cursor-pointer"
                >
                   <span>{t("contact.sendMessageButton")}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* 07. Folio 2020 Minimalist Footer */}
      <footer className="mt-20 sm:mt-28 md:mt-36 border-t border-border/70 py-10 sm:py-12 bg-card/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-xl tracking-tighter text-foreground font-sans">
              fol<span className="text-[#F44B0B]">•</span>io
            </span>
            <span className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} {t("header.ferielBouzid")}. {t("index.allRightsReserved")}
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-muted-foreground font-medium">
            <a href="#work" className="hover:text-foreground transition-colors">
              {t("common.projects")}
            </a>
            <a href="#about" className="hover:text-foreground transition-colors">
              {t("common.about")}
            </a>
            <a href="#experience" className="hover:text-foreground transition-colors">
              {t("common.experience")}
            </a>
            <a href="#skills" className="hover:text-foreground transition-colors">
              {t("common.skills")}
            </a>
            <a href="#contact" className="hover:text-foreground transition-colors">
              {t("common.contact")}
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full border border-border/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer"
            title={t("index.backToTop")}
            aria-label={t("index.backToTop")}
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Index;
