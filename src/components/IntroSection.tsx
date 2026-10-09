import { useTranslation } from "react-i18next";

const IntroSection = () => {
  const { t } = useTranslation();
  return (
    <section className="max-w-4xl mx-auto py-12 md:py-16 px-4 animate-fade-in">
      <div className="text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight animate-slide-up">
          {t('intro.craftingVisualStories')}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto animate-slide-up stagger-1">
          {t('intro.introDescription')}
        </p>
      </div>
    </section>
  );
};

export default IntroSection;
