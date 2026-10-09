import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Article } from "@/data/articles.en";
import { useTranslation } from "react-i18next";

interface ScrollExpandProjectProps {
  article: Article;
  index: number;
}

export const ScrollExpandProject: React.FC<ScrollExpandProjectProps> = ({ article, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  // Scroll tracking linked to container entering and passing through viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scale from 0.78 (centered pill) to 1.0 (full width card) smoothly
  const scale = useTransform(scrollYProgress, [0.08, 0.42, 0.68, 0.95], [0.8, 1.0, 1.0, 0.94]);
  
  // Border radius smoothing from sleek pill (9999px) to modern card (28px)
  const borderRadius = useTransform(scrollYProgress, [0.08, 0.42], ["90px", "24px"]);
  
  // Parallax zoom and content fade
  const imgScale = useTransform(scrollYProgress, [0.08, 0.42, 0.9], [1.25, 1.04, 1.12]);
  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.42], [0.3, 1.0]);

  return (
    <div
      ref={containerRef}
      className="relative py-6 md:py-10 flex items-center justify-center"
    >
      <motion.div
        style={{
          scale,
          borderRadius,
          willChange: "transform, border-radius",
        }}
        className="relative w-full max-w-5xl mx-auto overflow-hidden bg-card border border-border shadow-xl hover:shadow-2xl transition-shadow duration-500"
        data-lens="reveal"
        data-lens-size="110"
      >
        {/* Media Container */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/10] overflow-hidden bg-muted">
          <motion.img
            src={article.image}
            alt={article.title}
            style={{
              scale: imgScale,
              willChange: "transform",
            }}
            className="w-full h-full object-cover"
          />

          {/* Vignette Gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

          {/* Interactive Info Overlay with authentic texts */}
          <motion.div
            style={{ opacity: contentOpacity }}
            className="absolute inset-0 p-6 sm:p-8 md:p-12 flex flex-col justify-between z-20 pointer-events-none"
          >
            {/* Top metadata */}
            <div className="flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-2.5">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary text-primary-foreground backdrop-blur-md shadow-sm">
                  {article.category}
                </span>
                <span className="hidden sm:inline-block px-3 py-1.5 rounded-full text-xs font-medium bg-black/40 text-white/90 backdrop-blur-md border border-white/20">
                  {article.date}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-white/70">
                <span>0{index + 1}</span>
              </div>
            </div>

            {/* Bottom title & Action */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 pointer-events-auto">
              <div className="max-w-xl">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-sans tracking-tight text-white mb-2">
                  {article.title}
                </h3>
                <p className="text-white/80 text-sm sm:text-base line-clamp-2 font-sans font-light">
                  {article.subtitle}
                </p>
              </div>

              <a
                href={`/article/${article.id}`}
                className="self-start sm:self-auto inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F8F4E9] text-[#241227] font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 shadow-lg group shrink-0"
                data-lens="reveal"
              >
                <span>{t("article.view")}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
