import Header from "@/components/Header";
import { Camera, Calendar, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const experiences = [
  {
    id: 1,
    title: "Brand Identity for Café Lumière",
    date: "2024",
    location: "Freelance Project",
    description:
      "Developed a complete brand identity including logo, color palette, packaging, and social media templates for a specialty coffee shop. The project focused on creating a warm, modern aesthetic that reflects artisan craftsmanship.",
    image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Editorial Layout — Culture Magazine",
    date: "2023",
    location: "University Project",
    description:
      "Designed a 32-page editorial layout for a cultural magazine, combining bold typography, asymmetric grids, and rich photography. The project explored the balance between readability and visual storytelling.",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Visual Identity — Design Conference",
    date: "2023",
    location: "Competition Entry",
    description:
      "Created the visual identity system for a regional design conference, including posters, badges, signage, and digital assets. The concept used geometric shapes and a vibrant palette to convey creativity and innovation.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop",
  },
];

const Travel = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-sans leading-tight animate-slide-down">
            {t('travel.experience')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up stagger-1">
            {t('travel.travelDescription')}
          </p>
        </div>

        {/* Timeline */}
        <section className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-16">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 animate-slide-up stagger-${Math.min(index + 2, 6)}`}
                >
                  {/* Dot on timeline */}
                  <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1/2 mt-2 md:mt-0 z-10" />

                  {/* Content - alternating sides on desktop */}
                  <div
                    className={`ml-14 md:ml-0 md:w-1/2 ${
                      isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:ml-auto"
                    }`}
                  >
                    {/* Date & location */}
                    <div className={`flex items-center gap-3 text-sm text-muted-foreground mb-3 ${isLeft ? "md:justify-end" : ""}`}>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </span>
                    </div>

                    {/* Image */}
                    <div className="relative aspect-video rounded-md overflow-hidden mb-4 group">
                      <img
                        src={exp.image}
                        alt={exp.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-foreground/5 group-hover:bg-foreground/0 transition-colors" />
                    </div>

                    {/* Text */}
                    <h3 className="text-xl font-bold font-sans mb-2">{exp.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Travel;
