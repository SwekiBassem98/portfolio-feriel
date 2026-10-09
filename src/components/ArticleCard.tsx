import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ArticleCardProps {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  date: string;
  image: string;
  size?: "small" | "large";
}

const ArticleCard = ({
  id,
  title,
  subtitle,
  category,
  date,
  image,
  size = "small",
}: ArticleCardProps) => {
  return (
    <Link
      to={`/article/${id}`}
      className={`group block rounded-md bg-card border border-border/70 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-foreground/20 hover:-translate-y-1 ${
        size === "large" ? "md:col-span-2" : ""
      }`}
    >
      {/* Image Preview Container */}
      {/* 16:9 matches the project thumbnails, so logos and taglines are never cropped */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          width={1672}
          height={941}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category badge pinned to top-left */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-background/90 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-foreground border border-border/80 shadow-xs">
            {category}
          </span>
        </div>

        {/* Year/Index pinned to top-right */}
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-background/80 backdrop-blur-md text-[11px] font-mono font-medium text-muted-foreground border border-border/60">
            {date.includes(",") ? date.split(",")[1].trim() : date}
          </span>
        </div>
      </div>

      {/* Card Body with Clean Folio Typography */}
      <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-sans font-bold text-lg sm:text-xl text-foreground tracking-tight group-hover:text-[#F44B0B] transition-colors truncate">
              {title}
            </h3>
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm text-muted-foreground font-medium truncate">
              {subtitle}
            </p>
          )}
        </div>

        {/* Minimalist Arrow Indicator */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md border border-border/80 bg-background flex items-center justify-center shrink-0 text-muted-foreground group-hover:text-foreground group-hover:border-[#F44B0B] group-hover:bg-[#F44B0B]/10 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:scale-110" />
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
