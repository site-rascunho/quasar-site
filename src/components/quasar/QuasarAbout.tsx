import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";

const QuasarAbout = () => {
  const { t } = useLanguage();

  return (
    <section id="sobre" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-justify">
          <h2 className="text-3xl md:text-4xl font-light text-foreground text-center mb-8">
            {t.about.title}
          </h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p dangerouslySetInnerHTML={{ __html: t.about.p1 }} />
            <p dangerouslySetInnerHTML={{ __html: t.about.p2 }} />
            <p dangerouslySetInnerHTML={{ __html: t.about.p3 }} />
            <p dangerouslySetInnerHTML={{ __html: t.about.p4 }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuasarAbout;