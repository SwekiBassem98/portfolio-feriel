import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/site/Hero";
import Work from "@/components/site/Work";
import About from "@/components/site/About";
import Experience from "@/components/site/Experience";
import Skills from "@/components/site/Skills";
import Contact from "@/components/site/Contact";
import { getArticles } from "@/data/articles";
import { useLanguage } from "@/i18n/LanguageContext";

const Index = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const projects = useMemo(() => getArticles(language), [language]);

  // Arriving from another page with a hash (e.g. /#contact): scroll to it
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: "start" }), 60);
    return () => window.clearTimeout(t);
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grain" aria-hidden="true" />
      <Header />
      <main id="main">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
          <Hero projects={projects} />
          <Work projects={projects} />
          <About />
          <Experience />
          <Skills />
        </div>
        <Contact />
      </main>
    </div>
  );
};

export default Index;
