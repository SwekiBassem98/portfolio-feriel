import { useTranslation } from "react-i18next";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const About = () => {
  const { t } = useTranslation();

  const facts = [
    { k: t("site.about.education"), v: t("site.about.educationValue"), sub: t("site.about.educationSchool") },
    { k: t("site.about.languages"), v: `${t("index.arabic")} — ${t("index.arabicLevel")}`, sub: `${t("index.french")}, ${t("index.english")} — ${t("index.frenchLevel")}` },
    { k: t("site.about.location"), v: t("index.nabeulTunisia"), sub: t("index.workModelValue") },
    { k: t("site.about.availability"), v: t("index.availabilityValue"), sub: t("index.availableForWork"), live: true },
  ];

  const qualities = [
    [t("index.collaborative"), t("index.collaborativeDesc")],
    [t("index.communicative"), t("index.communicativeDesc")],
    [t("index.timeManagement"), t("index.timeManagementDesc")],
    [t("index.autonomous"), t("index.autonomousDesc")],
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="py-16 sm:py-24">
      <SectionHead
        number="02"
        label={t("site.about.label")}
        id="about-title"
        title={
          <>
            {t("site.about.title")} <em className="font-serif font-normal italic tracking-normal text-spot-ink">{t("site.about.titleEm")}</em>
          </>
        }
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-12">
        <Reveal className="space-y-5 text-lg leading-relaxed text-foreground/80 lg:col-span-6">
          <p className="text-2xl leading-snug tracking-tight text-foreground sm:text-[1.7rem]">{t("index.aboutIntro1")}</p>
          <p>{t("index.aboutIntro2")}</p>
          <p>{t("index.aboutIntro3")}</p>
        </Reveal>

        <Reveal variant="stage" className="lg:col-span-5 lg:col-start-8">
          <dl className="stagger border-t border-foreground" style={{ ["--stagger-base" as string]: "150ms" }}>
            {facts.map((f, i) => (
              <div key={f.k} style={{ ["--i" as string]: i }} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-foreground/15 py-4 sm:grid-cols-[9rem_1fr]">
                <dt className="slug pt-1">{f.k}</dt>
                <dd>
                  <span className="flex items-center gap-2 font-medium">
                    {f.live && <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />}
                    {f.v}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">{f.sub}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <Reveal variant="stage" className="mt-16">
        <h3 className="slug mb-4">{t("site.about.qualities")}</h3>
        <ol className="stagger grid border-t border-foreground/15 sm:grid-cols-2 lg:grid-cols-4">
          {qualities.map(([title, desc], i) => (
            <li
              key={title}
              style={{ ["--i" as string]: i }}
              className={`border-b border-foreground/15 py-6 sm:pr-6 ${i % 2 === 1 ? "sm:border-l sm:pl-6" : ""} ${i > 0 ? "lg:border-l lg:pl-6" : ""}`}
            >
              <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              <p className="mt-3 text-xl font-semibold tracking-tight">{title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
};

export default About;
