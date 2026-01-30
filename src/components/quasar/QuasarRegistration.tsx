import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2 } from "lucide-react";

// --- CONFIGURAÇÃO DO EVEN3 ---
// O identificador é a parte final da URL do seu evento (ex: even3.com.br/ii-encontro-quasar)
const EVENT_CODE = "ii-encontro-quasar"; 
const WIDGET_TYPE = "ticket"; // 'ticket' é o padrão para inscrições

const QuasarRegistration = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Função para carregar o script do Even3 dinamicamente
    const loadEven3Widget = () => {
      try {
        // Verifica se o script já existe para evitar duplicação
        const existingScript = document.getElementById("even3-script");
        if (existingScript) return;

        const script = document.createElement("script");
        script.id = "even3-widget-ticket";
        script.src = `https://www.even3.com.br/widget/js?e=ii-encontro-quasar-688507&t=ticket&lang=pt`;
        script.async = true;
        
        // Callback quando o script carrega com sucesso
        script.onload = () => {
          setIsLoading(false);
        };

        // Callback de erro
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

    // Pequeno delay para garantir que o DOM (a div alvo) esteja pronto
    const timer = setTimeout(loadEven3Widget, 500);

    return () => {
      clearTimeout(timer);
      // Opcional: remover o script ao desmontar o componente, 
      // mas alguns widgets preferem persistir se o usuário navegar e voltar.
      // const script = document.getElementById("even3-script");
      // if (script) document.body.removeChild(script);
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

            {/* Container do Widget - O ID deve corresponder ao esperado pelo script do Even3 */}
            <div id={`even3-widget-ticket-${WIDGET_TYPE}`} className="w-full"></div>

            {/* Fallback de Erro ou Bloqueio de Script */}
            {hasError && (
              <div className="flex flex-col items-center justify-center p-12 text-center space-y-6">
                <p className="text-muted-foreground">
                  Não foi possível carregar o formulário aqui (pode ser um bloqueador de anúncios).
                </p>
                <Button asChild size="lg">
                  <a 
                    href={`https://www.even3.com.br/${EVENT_CODE}`} 
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