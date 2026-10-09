import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

const skillCategories = [
  {
    title: "Design Tools",
    skills: [
      { name: "Adobe Photoshop", level: 95 },
      { name: "Adobe Illustrator", level: 90 },
      { name: "Adobe InDesign", level: 85 },
      { name: "Adobe After Effects", level: 75 },
      { name: "Adobe Premiere Pro", level: 70 },
      { name: "Adobe XD", level: 80 },
    ],
  },
  {
    title: "UI/UX & Prototyping",
    skills: [
      { name: "Figma", level: 90 },
      { name: "Sketch", level: 70 },
      { name: "Canva", level: 85 },
      { name: "InVision", level: 65 },
    ],
  },
  {
    title: "Development",
    skills: [
      { name: "HTML / CSS", level: 85 },
      { name: "JavaScript", level: 60 },
      { name: "WordPress", level: 70 },
      { name: "Webflow", level: 65 },
    ],
  },
  {
    title: "Other Skills",
    skills: [
      { name: "Branding & Identity", level: 95 },
      { name: "Typography", level: 90 },
      { name: "Print Design", level: 85 },
      { name: "Motion Graphics", level: 70 },
      { name: "Photography", level: 75 },
      { name: "Social Media Design", level: 80 },
    ],
  },
];

const Skills = () => {
  const { t } = useTranslation();

  const getCategoryTitle = (title: string) => {
    if (title === "Design Tools") return t('wellness.designTools');
    if (title === "UI/UX & Prototyping") return t('wellness.uiuxPrototyping');
    if (title === "Development") return t('wellness.development');
    if (title === "Other Skills") return t('wellness.otherSkills');
    return title;
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="mb-16 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-sans animate-slide-down">
            {t('wellness.skillsTools')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up stagger-1">
            {t('wellness.skillsDescription')}
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIndex) => (
            <div
              key={category.title}
              className={`bg-card rounded-lg border p-6 md:p-8 animate-slide-up stagger-${Math.min(catIndex + 2, 6)}`}
            >
              <h2 className="text-2xl font-bold font-sans mb-6">{getCategoryTitle(category.title)}</h2>
              <div className="space-y-5">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {skill.level}%
                      </Badge>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-700"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Programs Banner */}
        <section className="mt-16 rounded-lg bg-card border p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold font-sans mb-4">{t('wellness.programsTitle')}</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('wellness.programsDescription')}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Photoshop", "Illustrator", "InDesign", "After Effects", "Premiere Pro",
              "Figma", "Adobe XD", "Canva", "Lightroom", "Blender",
              "WordPress", "Webflow", "HTML/CSS",
            ].map((program) => (
              <Badge key={program} variant="outline" className="px-4 py-2 text-sm">
                {program}
              </Badge>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Skills;