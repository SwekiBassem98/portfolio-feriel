import Header from "@/components/Header";
import { useTranslation } from "react-i18next";

const Terms = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight animate-slide-down">
            {t('terms.termsOfService')}
          </h1>
          <p className="text-muted-foreground animate-slide-up stagger-1">
            {t('terms.lastUpdated')}
          </p>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">{t('terms.agreementToTerms')}</h2>
            <p className="text-muted-foreground">
              {t('terms.agreementText')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('terms.useLicense')}</h2>
            <p className="text-muted-foreground mb-4">
              {t('terms.licenseText1')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>{t('terms.licenseBullet1')}</li>
              <li>{t('terms.licenseBullet2')}</li>
              <li>{t('terms.licenseBullet3')}</li>
              <li>{t('terms.licenseBullet4')}</li>
              <li>{t('terms.licenseBullet5')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('terms.userContent')}</h2>
            <p className="text-muted-foreground">
              {t('terms.userContentText')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('terms.prohibitedUses')}</h2>
            <p className="text-muted-foreground mb-4">
              {t('terms.prohibitedUsesText')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>{t('terms.prohibitedBullet1')}</li>
              <li>{t('terms.prohibitedBullet2')}</li>
              <li>{t('terms.prohibitedBullet3')}</li>
              <li>{t('terms.prohibitedBullet4')}</li>
              <li>{t('terms.prohibitedBullet5')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('terms.intellectualProperty')}</h2>
            <p className="text-muted-foreground">
              {t('terms.intellectualPropertyText')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('terms.disclaimer')}</h2>
            <p className="text-muted-foreground">
              {t('terms.disclaimerText')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('terms.limitationsOfLiability')}</h2>
            <p className="text-muted-foreground">
              {t('terms.liabilityText')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('terms.linksToOtherWebsites')}</h2>
            <p className="text-muted-foreground">
              {t('terms.linksText')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('terms.modifications')}</h2>
            <p className="text-muted-foreground">
              {t('terms.modificationsText')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('terms.governingLaw')}</h2>
            <p className="text-muted-foreground">
              {t('terms.governingLawText')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('terms.contactInformation')}</h2>
            <p className="text-muted-foreground">
              {t('terms.contactText')}
            </p>
            <p className="text-muted-foreground mt-4">
              {t('terms.termsEmail')}<br />
              {t('terms.termsAddress')}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Terms;
