import Header from "@/components/Header";
import { Mail, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section with Personal Photo */}
        <div className="mb-16 flex flex-col items-center space-y-8 animate-slide-down">
          {/* Personal Photo Placeholder */}
          <div className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-muted border-4 border-border overflow-hidden flex items-center justify-center">
            <Camera className="w-10 h-10 text-muted-foreground" />
          </div>
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {t('about.aboutFerielBouzid')}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed animate-slide-up stagger-1">
              {t('about.aboutDescription')}
            </p>
          </div>
        </div>

        {/* Story Section */}
        <section className="mb-16 space-y-6 text-muted-foreground animate-slide-up stagger-2">
          <h2 className="text-3xl font-bold text-foreground mb-6">{t('about.ourStory')}</h2>
          <p>
            {t('about.perspectiveStory1')}
          </p>
          <p>
            {t('about.perspectiveStory2')}
          </p>
          <p>
            {t('about.perspectiveStory3')}
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-16 rounded-2xl bg-card p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6">{t('about.ourMission')}</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              {t('about.perspectiveMission')}
            </p>
            <ul className="space-y-3 ml-6">
              <li className="flex items-start">
                <span className="mr-3 mt-1">•</span>
                <span>{t('about.missionBullet1')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1">•</span>
                <span>{t('about.missionBullet2')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1">•</span>
                <span>{t('about.missionBullet3')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1">•</span>
                <span>{t('about.missionBullet4')}</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">{t('about.ourValues')}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-muted">
              <h3 className="text-xl font-semibold mb-3">{t('about.authenticity')}</h3>
              <p className="text-muted-foreground">
                {t('about.authenticityDesc')}
              </p>
            </div>
            <div className="p-6 rounded-xl bg-muted">
              <h3 className="text-xl font-semibold mb-3">{t('about.thoughtfulness')}</h3>
              <p className="text-muted-foreground">
                {t('about.thoughtfulnessDesc')}
              </p>
            </div>
            <div className="p-6 rounded-xl bg-muted">
              <h3 className="text-xl font-semibold mb-3">{t('about.inclusivity')}</h3>
              <p className="text-muted-foreground">
                {t('about.inclusivityDesc')}
              </p>
            </div>
            <div className="p-6 rounded-xl bg-muted">
              <h3 className="text-xl font-semibold mb-3">{t('about.sustainability')}</h3>
              <p className="text-muted-foreground">
                {t('about.sustainabilityDesc')}
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-12 rounded-2xl bg-card">
          <h2 className="text-3xl font-bold mb-4">{t('about.joinOurCommunity')}</h2>
           <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('about.subscribeDescription')}
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8">
            <Mail className="mr-2 h-4 w-4" />
            {t('about.subscribeNow')}
          </Button>
        </section>
      </main>
    </div>
  );
};

export default About;