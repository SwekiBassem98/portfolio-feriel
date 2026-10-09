import Header from "@/components/Header";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const StyleGuide = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slide-down">
            {t("styleGuide.styleGuide")}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed animate-slide-up stagger-1">
            {t("styleGuide.styleGuideDescription")}
          </p>
        </div>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">{t("styleGuide.typography")}</h2>
          <div className="space-y-6">
            <div>
              <h1 className="text-5xl font-bold mb-2">{t("styleGuide.heading1")}</h1>
              <p className="text-sm text-muted-foreground">Font: Merriweather Bold, 3rem</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-2">{t("styleGuide.heading2")}</h2>
              <p className="text-sm text-muted-foreground">Font: Merriweather Bold, 2.25rem</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">{t("styleGuide.heading3")}</h3>
              <p className="text-sm text-muted-foreground">Font: Merriweather Bold, 1.875rem</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-2">{t("styleGuide.heading4")}</h4>
              <p className="text-sm text-muted-foreground">Font: Merriweather Bold, 1.5rem</p>
            </div>
            <div>
              <p className="text-lg mb-2">{t("styleGuide.bodyLarge")}</p>
              <p className="text-sm text-muted-foreground">Font: Inter Regular, 1.125rem</p>
            </div>
            <div>
              <p className="mb-2">{t("styleGuide.bodyRegular")}</p>
              <p className="text-sm text-muted-foreground">Font: Inter Regular, 1rem</p>
            </div>
            <div>
              <p className="text-sm mb-2">{t("styleGuide.bodySmall")}</p>
              <p className="text-sm text-muted-foreground">Font: Inter Regular, 0.875rem</p>
            </div>
          </div>
        </section>

        {/* Colors */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">{t("styleGuide.colorPalette")}</h2>
          
          {/* Violet Dusk Brand Palette */}
          <div className="mb-8 p-6 rounded-2xl border border-border bg-card">
            <h3 className="text-lg font-bold font-sans mb-1 text-foreground">Violet Dusk Collection</h3>
            <p className="text-sm text-muted-foreground mb-4">Official luxury palette extracted from creative visual identity</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="h-20 rounded-xl bg-[#502D55] shadow-inner flex items-end p-2">
                  <span className="text-xs font-mono font-bold text-[#F8F4E9]">#502D55</span>
                </div>
                <p className="text-xs font-semibold">Deep Violet Dusk</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-xl bg-[#935073] shadow-inner flex items-end p-2">
                  <span className="text-xs font-mono font-bold text-white">#935073</span>
                </div>
                <p className="text-xs font-semibold">Rose Mauve Plum</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-xl bg-[#F6DBC0] shadow-inner flex items-end p-2 border border-black/10">
                  <span className="text-xs font-mono font-bold text-[#502D55]">#F6DBC0</span>
                </div>
                <p className="text-xs font-semibold">Warm Champagne</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-xl bg-[#F8F4E9] shadow-inner flex items-end p-2 border border-black/10">
                  <span className="text-xs font-mono font-bold text-[#502D55]">#F8F4E9</span>
                </div>
                <p className="text-xs font-semibold">Vanilla Pearl Silk</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-background border border-border"></div>
              <p className="text-sm font-medium">{t("styleGuide.background")}</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-foreground"></div>
              <p className="text-sm font-medium">{t("styleGuide.foreground")}</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-primary"></div>
              <p className="text-sm font-medium">{t("styleGuide.primary")}</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-secondary"></div>
              <p className="text-sm font-medium">{t("styleGuide.secondary")}</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-accent"></div>
              <p className="text-sm font-medium">{t("styleGuide.accent")}</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-muted"></div>
              <p className="text-sm font-medium">{t("styleGuide.muted")}</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-card border border-border"></div>
              <p className="text-sm font-medium">{t("styleGuide.cardColor")}</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-destructive"></div>
              <p className="text-sm font-medium">{t("styleGuide.destructiveColor")}</p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">{t("styleGuide.buttons")}</h2>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
              {t("styleGuide.primaryButton")}
            </Button>
            <Button variant="secondary" className="rounded-full">
              {t("styleGuide.secondaryButton")}
            </Button>
            <Button variant="outline" className="rounded-full">
              {t("styleGuide.outlineButton")}
            </Button>
            <Button variant="ghost">
              {t("styleGuide.ghostButton")}
            </Button>
            <Button variant="destructive" className="rounded-full">
              {t("styleGuide.destructiveButton")}
            </Button>
          </div>
        </section>

        {/* Category Tags */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">{t("styleGuide.categoryTags")}</h2>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 rounded-full text-sm font-medium tag-wellness">{t("styleGuide.tagWellness")}</span>
            <span className="px-4 py-2 rounded-full text-sm font-medium tag-travel">{t("styleGuide.tagTravel")}</span>
            <span className="px-4 py-2 rounded-full text-sm font-medium tag-creativity">{t("styleGuide.tagCreativity")}</span>
            <span className="px-4 py-2 rounded-full text-sm font-medium tag-growth">{t("styleGuide.tagGrowth")}</span>
            <span className="px-4 py-2 rounded-full text-sm font-medium tag-lifestyle">{t("styleGuide.tagLifestyle")}</span>
            <span className="px-4 py-2 rounded-full text-sm font-medium tag-community">{t("styleGuide.tagCommunity")}</span>
            <span className="px-4 py-2 rounded-full text-sm font-medium tag-financing">{t("styleGuide.tagFinancing")}</span>
          </div>
        </section>

        {/* Cards */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">{t("styleGuide.cards")}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-card p-6 border border-border">
              <h3 className="text-xl font-bold mb-3">{t("styleGuide.cardTitle")}</h3>
              <p className="text-muted-foreground">
                {t("styleGuide.standardCard")}
              </p>
            </div>
            <div className="rounded-2xl bg-muted p-6">
              <h3 className="text-xl font-bold mb-3">{t("styleGuide.mutedCardTitle")}</h3>
              <p className="text-muted-foreground">
                {t("styleGuide.mutedCardText")}
              </p>
            </div>
          </div>
        </section>

        {/* Spacing */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">{t("styleGuide.spacingScale")}</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-4 bg-primary rounded"></div>
              <span className="text-sm">{t("styleGuide.smallSpacing")}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 h-4 bg-primary rounded"></div>
              <span className="text-sm">{t("styleGuide.mediumSpacing")}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 h-4 bg-primary rounded"></div>
              <span className="text-sm">{t("styleGuide.largeSpacing")}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-48 h-4 bg-primary rounded"></div>
              <span className="text-sm">{t("styleGuide.extraLargeSpacing")}</span>
            </div>
          </div>
        </section>

        {/* Border Radius */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">{t("styleGuide.borderRadius")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-full h-24 bg-primary rounded-sm mb-2"></div>
              <p className="text-sm">{t("styleGuide.smallRadius")}</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 bg-primary rounded-md mb-2"></div>
              <p className="text-sm">{t("styleGuide.mediumRadius")}</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 bg-primary rounded-lg mb-2"></div>
              <p className="text-sm">{t("styleGuide.largeRadius")}</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 bg-primary rounded-2xl mb-2"></div>
              <p className="text-sm">{t("styleGuide.extraLargeRadius")}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StyleGuide;
