import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2, Ticket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const EVENT_CODE = "ii-encontro-quasar-688507"; 
const WIDGET_TYPE = "ticket"; 

const QuasarRegistration = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showFallback, setShowFallback] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      const widget = document.getElementById(`even3-widget-${WIDGET_TYPE}`);
      if (!widget || widget.clientHeight < 50 || widget.children.length === 0) {
        setShowFallback(true);
        setIsLoading(false);
      }
    }, 4000);

    const loadEven3Widget = () => {
      try {
        if (document.getElementById("even3-script")) return;
        const script = document.createElement("script");
        script.id = "even3-script";
        script.src = `https://www.even3.com.br/widget/js?e=${EVENT_CODE}&t=${WIDGET_TYPE}&lang=pt`;
        script.async = true;
        script.onload = () => setIsLoading(false);
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
    const initTimer = setTimeout(loadEven3Widget, 100);
    return () => {
      clearTimeout(safetyTimer);
      clearTimeout(initTimer);
    };
  }, []);

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

          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm min-h-[400px] relative transition-all duration-300">
            
            {isLoading && !showFallback && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/80 z-10">
                <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">{t.registration.loading}</p>
              </div>
            )}

            <div 
              id={`even3-widget-${WIDGET_TYPE}`} 
              className={`w-full ${showFallback ? "hidden" : "block"}`}
            ></div>

            {showFallback && (
              <div className="flex flex-col items-center justify-center h-[400px] p-8 text-center animate-in fade-in zoom-in duration-500">
                <div className="bg-primary/10 p-4 rounded-full mb-6">
                  <Ticket className="w-10 h-10 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{t.registration.available}</h3>
                <p className="text-muted-foreground mb-8 max-w-md">
                  {t.registration.fallbackText}
                </p>
                
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-[#009CA6] hover:bg-[#007F87] text-white font-semibold h-12 px-8 text-base shadow-md hover:shadow-lg transition-all"
                >
                  <a 
                    href="https://www.even3.com.br/tickets/get/ii-encontro-quasar-688507?even3_orig=get_tickets"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
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