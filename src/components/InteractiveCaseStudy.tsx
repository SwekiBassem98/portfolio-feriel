import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Compass, 
  Palette, 
  Layers, 
  Briefcase, 
  FileCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Article } from "@/data/articles.en";

// Project metadata for concise recruiter presentation
interface ProjectMeta {
  accentColor: string;
  gradient: string;
}

const projectMetas: Record<string, ProjectMeta> = {
  "001": {
    accentColor: "#FFC800",
    gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
  },
  "002": {
    accentColor: "#C25E3E",
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
  },
  "003": {
    accentColor: "#DC2626",
    gradient: "from-red-500/20 via-rose-500/10 to-transparent",
  },
  "004": {
    accentColor: "#EC4899",
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
  },
  "005": {
    accentColor: "#EAB308",
    gradient: "from-yellow-500/20 via-orange-500/10 to-transparent",
  },
  "006": {
    accentColor: "#E11D48",
    gradient: "from-rose-500/20 via-red-500/10 to-transparent",
  },
};

const defaultMeta: ProjectMeta = {
  accentColor: "#6366F1",
  gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
};

const sectionIcons = [
  Compass,     // Strategy & Concept
  Palette,     // Visual Execution
  Layers,      // Deliverables & Impact
];

interface CaseStudyProps {
  article: Article;
}

/**
 * 1. Project Overview Component (Placed FIRST on the details page)
 * "Recruiter Fast-Track" button removed as requested.
 * Reduced border radius and text sizes for headings and descriptions.
 */
export const ProjectOverview: React.FC<CaseStudyProps> = ({ article }) => {
  const { t } = useTranslation();
  const projectMeta = projectMetas[article.id] || defaultMeta;
  const meta = {
    ...projectMeta,
    deliverablesCount: article.deliverablesCount || t("article.defaultDeliverables"),
    keySkills: (article.keySkills ?? t("article.defaultKeySkills", { returnObjects: true })) as string[],
  };

  return (
    <section className="mb-10 space-y-4 animate-fade-in" id="project-overview">
      {/* SECTION HEADER */}
      <div className="pb-3 border-b border-border/70">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-primary/10 text-primary uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            {t("article.caseStudy")}
          </span>
            <span className="text-[11px] text-muted-foreground font-mono">
              {t("header.ferielBouzid")} • {article.category}
            </span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold font-sans tracking-tight text-foreground">
          {t("article.projectOverview")}
        </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {t("article.executiveSummaryDesc")}
          </p>
      </div>

      {/* INTRODUCTION HERO CARD - Uniform rounded-md container */}
      <div className="relative rounded-md p-5 md:p-6 bg-card border border-border/80 shadow-xs overflow-hidden">
        <div className={`absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl ${meta.gradient} rounded-md blur-3xl -z-10 pointer-events-none`} />

        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0 text-primary mt-0.5">
            <Briefcase className="w-5 h-5" />
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold font-sans text-foreground tracking-tight">
                {t("article.executiveOverview")}
              </h3>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-muted font-mono font-medium text-foreground">
                {meta.deliverablesCount}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-normal leading-relaxed text-muted-foreground">
              {article.content.introduction}
            </p>

            {/* Quick Skills Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1.5">
              {meta.keySkills.map((skill) => (
                <span
                  key={skill}
                  className="text-[11px] px-2.5 py-0.5 rounded-md bg-muted/70 text-muted-foreground font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * 2. Project Process Phases Component (Placed AFTER the PDF file section)
 * Reduced border radius and text sizes for headings and descriptions.
 */
export const ProjectProcessPhases: React.FC<CaseStudyProps> = ({ article }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"interactive" | "all">("interactive");

  if (!article.content.sections || article.content.sections.length === 0) {
    return null;
  }

  return (
    <section className="mb-10 space-y-4 animate-fade-in" id="project-phases">
      {/* Section Header & Stepper View Mode Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/70">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-primary/10 text-primary uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              {t("article.creativeProcess")}
            </span>
            <span className="text-[11px] text-muted-foreground font-mono">
              {article.content.sections.length} {t("article.phases")}
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-sans tracking-tight">
            {t("article.designProcess")}
          </h2>
        </div>

        {/* View mode toggle */}
        <div className="inline-flex rounded-md bg-muted p-1 text-[11px] self-start sm:self-auto">
          <button
            onClick={() => setViewMode("interactive")}
            className={`px-2.5 py-1 rounded-sm font-medium transition-all cursor-pointer ${
              viewMode === "interactive"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("article.stepByStep")}
          </button>
          <button
            onClick={() => setViewMode("all")}
            className={`px-2.5 py-1 rounded-sm font-medium transition-all cursor-pointer ${
              viewMode === "all"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("article.allSections")}
          </button>
        </div>
      </div>

      {/* Interactive Mode or Full Sequential Mode */}
      {viewMode === "interactive" ? (
        <div className="space-y-4">
          {/* Animated Tab Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
            {article.content.sections.map((section, index) => {
              const Icon = sectionIcons[index % sectionIcons.length];
              const isActive = activeTab === index;
              return (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground bg-muted/60 hover:bg-muted"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 rounded-md bg-primary"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    <span className="font-mono text-[11px] opacity-75">0{index + 1}.</span>
                    {section.heading}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Section Card Reveal - Uniform rounded-md container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative rounded-md p-6 md:p-7 bg-card border border-border shadow-xs overflow-hidden"
            >
              {/* Watermark Step Number */}
              <div className="absolute top-4 right-6 text-5xl md:text-6xl font-black font-mono text-muted/20 select-none pointer-events-none">
                0{activeTab + 1}
              </div>

              <div className="relative z-10 space-y-3 max-w-2xl">
                <div className="flex items-center gap-2 text-primary font-mono text-[11px] font-semibold uppercase tracking-wider">
                  <span>{t("article.phase")} 0{activeTab + 1}</span>
                  <span>•</span>
                  <span>{article.category} {t("article.processSuffix")}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold font-sans text-foreground">
                  {article.content.sections[activeTab].heading}
                </h3>

                <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {article.content.sections[activeTab].content}
                </p>

                {/* Section Navigation Buttons */}
                <div className="flex items-center gap-2.5 pt-3">
                  {activeTab > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTab((prev) => Math.max(0, prev - 1))}
                      className="rounded-md text-xs cursor-pointer h-8 px-3"
                    >
                      {t("article.previousPhase")}
                    </Button>
                  )}
                  {activeTab < article.content.sections.length - 1 ? (
                    <Button
                      size="sm"
                      onClick={() => setActiveTab((prev) => Math.min(article.content.sections.length - 1, prev + 1))}
                      className="rounded-md text-xs gap-1.5 cursor-pointer h-8 px-3"
                    >
                      {t("article.nextPhaseWithHeading", { heading: article.content.sections[activeTab + 1].heading })}
                    </Button>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-md">
                      <FileCheck className="w-3.5 h-3.5" />
                      {t("article.allPhasesCompleted")}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* Full Sequential View - Uniform rounded-md containers */
        <div className="space-y-4">
          {article.content.sections.map((section, index) => {
            const Icon = sectionIcons[index % sectionIcons.length];
            return (
              <div
                key={index}
                className="relative rounded-md p-5 md:p-6 bg-card border border-border/80 shadow-xs"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0 text-primary mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                      <span className="font-semibold text-primary">0{index + 1}</span>
                      <span>/</span>
                      <span>0{article.content.sections.length}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold font-sans text-foreground">
                      {section.heading}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
