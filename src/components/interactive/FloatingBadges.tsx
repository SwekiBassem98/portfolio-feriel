import React from "react";
import { motion } from "framer-motion";
import { MagneticPill } from "./MagneticPill";
import { Briefcase, Layers, Sparkles, MessageCircle, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";

interface FloatingBadgesProps {
  onContactClick?: () => void;
  onWorkClick?: () => void;
}

export const FloatingBadges: React.FC<FloatingBadgesProps> = ({
  onContactClick,
  onWorkClick,
}) => {
  const { t } = useTranslation();

  const badges = [
    {
      id: "projects",
      text: t("common.projects"),
      icon: Briefcase,
      href: "#projects",
      onClick: onWorkClick,
      color: "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20",
      delay: 0,
      duration: 4.8,
      yOffset: -10,
      magneticStrength: 0.45,
    },
    {
      id: "skills",
      text: t("common.skills"),
      icon: Layers,
      href: "#skills",
      color: "bg-card text-foreground border-border hover:border-primary/50 shadow-sm",
      delay: 0.3,
      duration: 5.5,
      yOffset: 12,
      magneticStrength: 0.4,
    },
    {
      id: "experience",
      text: t("common.experience"),
      icon: Sparkles,
      href: "#experience",
      color: "bg-secondary/40 text-secondary-foreground border-border/50 shadow-sm",
      delay: 0.6,
      duration: 5.2,
      yOffset: -8,
      repelMode: true,
      magneticStrength: 0.35,
    },
    {
      id: "about",
      text: t("common.about"),
      icon: MessageCircle,
      href: "#about",
      color: "bg-card text-foreground border-border hover:border-primary/50 shadow-sm",
      delay: 0.2,
      duration: 6.0,
      yOffset: 10,
      magneticStrength: 0.4,
    },
    {
      id: "resume",
      text: t("index.viewResume"),
      icon: FileText,
      href: "/images/projects/CV Feriel Bouzid (1).pdf",
      color: "bg-muted/70 text-foreground border-border/60 hover:border-primary/40",
      delay: 0.5,
      duration: 5.4,
      yOffset: -12,
      magneticStrength: 0.45,
    },
  ];

  return (
    <div className="relative py-2 flex flex-wrap items-center justify-start gap-2.5 sm:gap-3 max-w-2xl">
      {badges.map((badge) => {
        const Icon = badge.icon;
        return (
          <motion.div
            key={badge.id}
            animate={{
              y: [0, badge.yOffset, 0],
              rotate: [0, badge.yOffset > 0 ? 1.5 : -1.5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: badge.duration,
              ease: "easeInOut",
              delay: badge.delay,
            }}
            className="will-change-transform"
          >
            <MagneticPill
              href={badge.href}
              onClick={badge.onClick}
              repelMode={badge.repelMode}
              magneticStrength={badge.magneticStrength}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-all ${badge.color}`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0 opacity-80" />
              <span>{badge.text}</span>
            </MagneticPill>
          </motion.div>
        );
      })}
    </div>
  );
};
