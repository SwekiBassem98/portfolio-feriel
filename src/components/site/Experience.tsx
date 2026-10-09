import { useTranslation } from "react-i18next";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const Experience = () => {
  const { t } = useTranslation();
  const roles = [1, 2, 3].map((n) => ({
    n,
    title: t(`index.exp${n}Title`),
    company: t(`index.exp${n}Company`),
    date: t(`index.exp${n}Date`),
    current: n === 1,
    bullets: [1, 2, 3].map((b) => [t(`index.exp${n}Bullet${b}Title`), t(`index.exp${n}Bullet${b}Desc`)]),
  }));

  return (
    <section id="experience" aria-labelledby="experience-title" className="py-16 sm:py-24">
      <SectionHead number="03" label={t("site.experience.label")} id="experience-title" title={t("site.experience.title")} />

      <ol className="mt-12 border-t border-foreground">
        {roles.map((r, i) => (
          <Reveal as="li" key={r.n} delay={i * 80} className="grid gap-6 border-b border-foreground/15 py-10 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="font-mono text-sm">{r.date}</p>
              {r.current && (
                <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-spot px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-[#141312]">
                  {t("site.experience.current")}
                </p>
              )}
            </div>
            <div className="lg:col-span-4">
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{r.title}</h3>
              <p className="mt-1 text-lg text-muted-foreground">{r.company}</p>
            </div>
            <ul className="space-y-4 lg:col-span-5">
              {r.bullets.map(([bt, bd]) => (
                <li key={bt} className="grid grid-cols-[1rem_1fr] gap-2">
                  <span className="mt-2 h-px w-3 bg-foreground" aria-hidden="true" />
                  <p className="leading-relaxed text-foreground/80">
                    <span className="font-semibold text-foreground">{bt}.</span> {bd}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </section>
  );
};

export default Experience;
