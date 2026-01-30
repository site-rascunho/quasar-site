import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2 } from "lucide-react";

// --- CONFIGURAÇÃO DO EVEN3 ---
const EVENT_CODE = "ii-encontro-quasar-688507"; 
const WIDGET_TYPE = "ticket"; 

const QuasarRegistration = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadEven3Widget = () => {
      try {
        const existingScript = document.getElementById("even3-script");
        if (existingScript) return;

        const script = document.createElement("script");
        script.id = "even3-script";
        script.src = `https://www.even3.com.br/widget/js?e=${EVENT_CODE}&t=${WIDGET_TYPE}&lang=pt`;
        script.async = true;
        
        script.onload = () => {
          setIsLoading(false);
        };

        script.onerror = () => {
          console.error("Erro ao carregar widget do Even3");
          setHasError(true);
          setIsLoading(false);
        };

        document.body.appendChild(script);
      } catch (error) {
        console.error("Erro na integração Even3:", error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    const timer = setTimeout(loadEven3Widget, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section id="inscricao" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-light text-foreground">
              Inscrição
            </h2>
            <p className="text-muted-foreground">
              Registre seu interesse em participar do II Encontro Quasar.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm min-h-[400px] relative">
            
            {/* Estado de Carregamento */}
            {isLoading && !hasError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/80 z-10">
                <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Carregando formulário...</p>
              </div>
            )}

            {/* Container do Widget */}
            <div id={`even3-widget-${WIDGET_TYPE}`} className="w-full"></div>

            {/* Fallback de Erro ou Bloqueio de Script */}
            {hasError && (
              <div className="flex flex-col items-center justify-center p-12 text-center space-y-6">
                <p className="text-muted-foreground">
                  Não foi possível carregar o formulário aqui (pode ser um bloqueador de anúncios).
                </p>
                <Button asChild size="lg">
                  <a 
                    href="https://www.even3.com.br/tickets/get/ii-encontro-quasar-688507?even3_orig=get_tickets"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Acessar Página de Inscrição Oficial
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            )}
            
          </div>
          
          <div className="text-center mt-6">
            <p className="text-xs text-muted-foreground">
              Ambiente seguro processado por Even3. Seus dados estão protegidos.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default QuasarRegistration;