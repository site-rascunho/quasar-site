import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2, Ticket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const EVENT_CODE = "ii-encontro-quasar-688507"; 
const WIDGET_TYPE = "ticket"; 

const QuasarRegistration = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showFallback, setShowFallback] = useState(false);
  const { t, language } = useLanguage();

  useEffect(() => {
    setIsLoading(true);
    setShowFallback(false);

    const cleanupWidget = () => {
      const oldScript = document.getElementById("even3-script");
      if (oldScript) oldScript.remove();
      
      const widgetContainer = document.getElementById(`even3-widget-${WIDGET_TYPE}`);
      if (widgetContainer) widgetContainer.innerHTML = "";
    };

    cleanupWidget();

    // Reduzi o tempo de segurança para 2.5s. Se a internet for lenta, já libera o botão.
    const safetyTimer = setTimeout(() => {
      const widget = document.getElementById(`even3-widget-${WIDGET_TYPE}`);
      // Verifica se carregou. Se a altura for 0 ou muito pequena, assume erro.
      if (!widget || widget.clientHeight < 50 || widget.children.length === 0) {
        console.warn("Even3 widget timed out or failed to render properly.");
        setShowFallback(true);
        setIsLoading(false);
      }
    }, 2500);

    const loadEven3Widget = () => {
      try {
        if (document.getElementById("even3-script")) return;
        
        const script = document.createElement("script");
        script.id = "even3-script";
        script.src = `https://www.even3.com.br/widget/js?e=${EVENT_CODE}&t=${WIDGET_TYPE}&lang=${language}`;
        script.async = true;
        
        script.onload = () => {
          // Mesmo carregando o script, damos um pequeno delay para ver se renderiza
          setTimeout(() => setIsLoading(false), 500);
        };
        
        script.onerror = () => {
          setShowFallback(true);
          setIsLoading(false);
        };
        
        document.body.appendChild(script);
      } catch (error) {
        setShowFallback(true);
        setIsLoading(false);
      }
    };

    // Pequeno delay inicial para garantir que o DOM está pronto
    const initTimer = setTimeout(loadEven3Widget, 100);

    return () => {
      clearTimeout(safetyTimer);
      clearTimeout(initTimer);
      cleanupWidget();
    };
  }, [language]);

  return (
    <section id="inscricao" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-light text-foreground">
              {t.registration.title}
            </h2>
            <p className="text-muted-foreground">
              {t.registration.description}
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm min-h-[300px] relative transition-all duration-300">
            
            {/* Loading State */}
            {isLoading && !showFallback && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-card z-20">
                <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">{t.registration.loading}</p>
              </div>
            )}

            {/* Widget Container - Só renderiza se NÃO tiver fallback */}
            <div 
              id={`even3-widget-${WIDGET_TYPE}`} 
              className={`w-full ${showFallback ? "hidden" : "block"}`}
            ></div>

            {/* Fallback Screen - Força a aparecer se showFallback for true */}
            {showFallback && (
              <div className="flex flex-col items-center justify-center h-full min-h-[350px] p-8 text-center animate-in fade-in zoom-in duration-500 bg-card">
                <div className="bg-primary/10 p-4 rounded-full mb-6">
                  <Ticket className="w-10 h-10 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{t.registration.available}</h3>
                <p className="text-muted-foreground mb-8 max-w-md">
                  {t.registration.fallbackText || "Para garantir sua vaga, acesse a página oficial de inscrição."}
                </p>
                
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-[#009CA6] hover:bg-[#007F87] text-white font-semibold h-12 px-8 text-base shadow-md hover:shadow-lg transition-all w-full md:w-auto"
                >
                  <a 
                    href={`https://www.even3.com.br/tickets/get/ii-encontro-quasar-688507?even3_orig=get_tickets&lang=${language}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    {t.registration.button}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            )}
            
          </div>
          
          <div className="text-center mt-6">
            <p className="text-xs text-muted-foreground">
              {t.registration.secure}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default QuasarRegistration;