import { useTranslation } from "react-i18next";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

/**
 * Skills grouped by what they are — no percentage meters, which would
 * imply a measurement nobody made.
 */
const Skills = () => {
  const { t } = useTranslation();

  const disciplines = [
    t("index.branding"),
    t("index.printDesign"),
    t("index.socialMedia"),
    t("index.photoEditing"),
    t("site.skills.photography"),
  ];

  const tools = [
    ["Photoshop", t("index.toolPhotoshopTag")],
    ["Illustrator", t("index.toolIllustratorTag")],
    ["InDesign", t("index.toolInDesignTag")],
    ["Adobe XD", t("index.toolAdobeXdTag")],
    ["Figma", t("index.toolFigmaTag")],
    ["CorelDRAW", t("index.toolCorelDrawTag")],
  ];

  return (
    <section id="skills" aria-labelledby="skills-title" className="py-16 sm:py-24">
      <SectionHead number="04" label={t("site.skills.label")} id="skills-title" title={t("site.skills.title")} />

      <div className="mt-12 grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <h3 className="slug mb-4">{t("site.skills.disciplines")}</h3>
          <ul className="border-t border-foreground">
            {disciplines.map((d, i) => (
              <li key={d} className="flex items-baseline gap-4 border-b border-foreground/15 py-4">
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                <span className="text-2xl font-semibold tracking-tight sm:text-3xl">{d}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
          <h3 className="slug mb-4">{t("site.skills.tools")}</h3>
          <ul className="grid grid-cols-2 border-l border-t border-foreground/15 sm:grid-cols-3">
            {tools.map(([name, tag]) => (
              <li key={name} className="group border-b border-r border-foreground/15 p-4 transition-colors hover:bg-foreground hover:text-background sm:p-5">
                <span className="block text-lg font-semibold tracking-tight">{name}</span>
                <span className="mt-1 block text-xs text-muted-foreground transition-colors group-hover:text-background/70">{tag}</span>
              </li>
            ))}
          </ul>

          <h3 className="slug mb-3 mt-10">{t("site.skills.production")}</h3>
          <p className="max-w-prose font-serif text-2xl italic leading-snug">{t("index.skillsProficiency")}</p>
        </Reveal>
      </div>
    </section>
  );
};

export default Skills;
