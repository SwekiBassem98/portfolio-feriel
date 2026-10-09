import Header from "@/components/Header";
import { ShoppingBag, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const products = [
  {
    id: 1,
    name: "Brand Identity Kit",
    price: "$49",
    description: "Complete brand identity package with logo, color palette, and guidelines.",
  },
  {
    id: 2,
    name: "Social Media Templates",
    price: "$29",
    description: "Ready-to-use templates for Instagram, Facebook, and LinkedIn posts.",
  },
  {
    id: 3,
    name: "Business Card Design",
    price: "$19",
    description: "Professional business card design with print-ready files.",
  },
  {
    id: 4,
    name: "Poster & Flyer Pack",
    price: "$35",
    description: "Eye-catching poster and flyer designs for events and promotions.",
  },
  {
    id: 5,
    name: "Presentation Templates",
    price: "$25",
    description: "Clean and modern PowerPoint and Keynote presentation templates.",
  },
  {
    id: 6,
    name: "Logo Design Package",
    price: "$59",
    description: "Custom logo design with multiple concepts and revisions.",
  },
];

const Store = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-16 animate-slide-down">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-sans leading-tight mb-4">
            Store
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {t('store.storeDescription')}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`rounded-2xl bg-card overflow-hidden card-hover animate-slide-up stagger-${Math.min(index + 1, 6)}`}
            >
              {/* Product Image Placeholder */}
              <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                <ImageIcon className="w-10 h-10 text-muted-foreground" />
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold font-sans">{product.name}</h3>
                  <span className="text-primary font-bold text-lg">{product.price}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground mt-2 hover:scale-105 transition-all">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  {t('store.addToCart')}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <section className="text-center py-12 rounded-2xl bg-card">
          <h2 className="text-3xl font-bold font-sans mb-4">{t('store.customDesignRequest')}</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('store.customDesignDescription')}
          </p>
          <Button className="bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full px-8 hover:scale-105 transition-all">
            {t('index.contactMe')}
          </Button>
        </section>
      </main>
    </div>
  );
};

export default Store;
