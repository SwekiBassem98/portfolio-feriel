import Header from "@/components/Header";
import { useTranslation } from "react-i18next";

const Privacy = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight animate-slide-down">
            {t('privacy.privacyPolicy')}
          </h1>
          <p className="text-muted-foreground animate-slide-up stagger-1">
            {t('privacy.lastUpdated')}
          </p>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">{t('privacy.introduction')}</h2>
            <p className="text-muted-foreground">
              {t('privacy.privacyIntro')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('privacy.informationWeCollect')}</h2>
            <h3 className="text-xl font-semibold mb-3 mt-6">{t('privacy.personalInformation')}</h3>
            <p className="text-muted-foreground mb-4">
              {t('privacy.personalInfoIntro')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>{t('privacy.personalInfoBullet1')}</li>
              <li>{t('privacy.personalInfoBullet2')}</li>
              <li>{t('privacy.personalInfoBullet3')}</li>
              <li>{t('privacy.personalInfoBullet4')}</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              {t('privacy.personalInfoOutro')}
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">{t('privacy.automaticallyCollectedInformation')}</h3>
            <p className="text-muted-foreground">
              {t('privacy.autoCollectInfo')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('privacy.howWeUseYourInformation')}</h2>
            <p className="text-muted-foreground mb-4">
              {t('privacy.useInfoIntro')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>{t('privacy.useInfoBullet1')}</li>
              <li>{t('privacy.useInfoBullet2')}</li>
              <li>{t('privacy.useInfoBullet3')}</li>
              <li>{t('privacy.useInfoBullet4')}</li>
              <li>{t('privacy.useInfoBullet5')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('privacy.cookiesAndTracking')}</h2>
            <p className="text-muted-foreground">
              {t('privacy.cookiesText')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('privacy.dataSecurity')}</h2>
            <p className="text-muted-foreground">
              {t('privacy.dataSecurityText')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('privacy.yourRights')}</h2>
            <p className="text-muted-foreground mb-4">
              {t('privacy.rightsIntro')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>{t('privacy.rightBullet1')}</li>
              <li>{t('privacy.rightBullet2')}</li>
              <li>{t('privacy.rightBullet3')}</li>
              <li>{t('privacy.rightBullet4')}</li>
              <li>{t('privacy.rightBullet5')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('privacy.thirdPartyServices')}</h2>
            <p className="text-muted-foreground">
              {t('privacy.thirdPartyText')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('privacy.childrensPrivacy')}</h2>
            <p className="text-muted-foreground">
              {t('privacy.childrenPrivacyText')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('privacy.changesToPolicy')}</h2>
            <p className="text-muted-foreground">
              {t('privacy.changesText')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('privacy.contactUs')}</h2>
            <p className="text-muted-foreground">
              {t('privacy.contactUsText')}
            </p>
            <p className="text-muted-foreground mt-4">
              {t('privacy.privacyEmail')}<br />
              {t('privacy.privacyAddress')}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Privacy;