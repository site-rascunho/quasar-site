import { useState, useEffect } from "react";
import { Ticket, ShieldCheck, Loader2, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const QuasarRegistration = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const { t } = useLanguage();

  return (
    <section id="inscricao" className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-50/[0.03] bg-[bottom_1px] [mask-image:linear-gradient(to_bottom,transparent,white)] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
              <Ticket className="w-3 h-3" />
              {t.registration.available}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
              {t.registration.title}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t.registration.description}
            </p>
          </div>

          {/* Card Container */}
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden relative">
            
            {/* Loading State */}
            {!iframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-card z-10 space-y-4">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="text-sm text-muted-foreground">{t.registration.loading}</p>
              </div>
            )}

            {/* BOTÃO MOBILE (NOVO) */}
            <div className="md:hidden p-6 pb-2">
              <a
                href="https://www.even3.com.br/ii-encontro-quasar-526038/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full px-6 py-4 bg-[#0097FF] hover:bg-[#007acc] text-white rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl gap-2 active:scale-95"
              >
                <ExternalLink className="w-4 h-4" />
                {/* @ts-ignore */}
                {t.registration.openExternal}
              </a>
              <div className="text-center mt-4 mb-2">
                <span className="text-xs text-muted-foreground uppercase tracking-widest px-2 bg-card relative z-10">Ou preencha abaixo</span>
                <div className="absolute left-0 right-0 h-px bg-border -mt-2 z-0 mx-6"></div>
              </div>
            </div>

            {/* Iframe Area */}
            <div className="w-full relative bg-white">
               {/* Fallback overlay se o iframe não carregar ou se o usuário preferir */}
               <div className={iframeLoaded ? "hidden" : "hidden md:flex absolute inset-0 flex-col items-center justify-center p-8 text-center bg-card/90 backdrop-blur-sm z-20"}>
                 <p className="text-muted-foreground mb-6 max-w-md">
                   {t.registration.fallbackText}
                 </p>
                 <a 
                   href="https://www.even3.com.br/ii-encontro-quasar-526038/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 px-6 py-3 bg-[#0097FF] hover:bg-[#007acc] text-white rounded-lg transition-colors font-medium shadow-md hover:shadow-lg"
                 >
                   <ExternalLink className="w-4 h-4" />
                   {t.registration.button}
                 </a>
               </div>

              <iframe 
                src="https://www.even3.com.br/ii-encontro-quasar-526038/" 
                width="100%" 
                height="1200px" 
                frameBorder="0"
                onLoad={() => setIframeLoaded(true)}
                className="w-full min-h-[600px] md:min-h-[1200px]"
                title="Inscrição Even3"
                loading="lazy"
              ></iframe>
            </div>

            {/* Footer de Segurança */}
            <div className="bg-secondary/30 p-4 border-t border-border flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
              {t.registration.secure}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuasarRegistration;