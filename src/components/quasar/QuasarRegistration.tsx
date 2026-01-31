import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Ticket } from "lucide-react"; // Opcional: ícones para o botão

export const QuasarRegistration = () => {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // Script do Even3 (preservando seu código existente de injeção do script)
    const script = document.createElement("script");
    script.src = "https://www.even3.com.br/widget/js?e=ii-encontro-quasar-688507";
    script.async = true;
    
    // Adicione um manipulador de erro direto no script
    script.onerror = () => setShowFallback(true);
    
    document.getElementById("even3-widget-container")?.appendChild(script);

    // TEMPORIZADOR DE SEGURANÇA:
    // Verifica após 4 segundos se o widget carregou visualmente
    const timer = setTimeout(() => {
      const widget = document.getElementById("even3-widget-container");
      // Se a div estiver vazia ou muito pequena (indicando falha no iframe), mostra o botão
      if (!widget || widget.clientHeight < 50 || widget.innerHTML.trim() === "") {
        setShowFallback(true);
      }
    }, 4000);

    return () => {
      // Limpeza (opcional, dependendo de como o widget se comporta ao desmontar)
      clearTimeout(timer);
      const container = document.getElementById("even3-widget-container");
      if (container) container.innerHTML = ""; 
    };
  }, []);

  return (
    <section className="py-20 bg-white" id="inscricao">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Inscrição</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Garanta sua participação no II Encontro Quasar.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden min-h-[400px] relative">
          
          {/* Container do Widget Even3 */}
          <div id="even3-widget-container" className={showFallback ? "hidden" : "block"}></div>

          {/* Botão de Fallback - Aparece apenas se houver erro ou demora */}
          {showFallback && (
            <div className="flex flex-col items-center justify-center h-[400px] bg-gray-50 p-8 text-center animate-in fade-in duration-500">
              <Ticket className="w-16 h-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Não foi possível carregar o formulário aqui
              </h3>
              <p className="text-gray-600 mb-6 max-w-md">
                O widget de inscrição encontrou um problema ou demorou para responder. 
                Você pode se inscrever diretamente na página oficial.
              </p>
              
              <Button 
                asChild 
                size="lg" 
                className="bg-[#009CA6] hover:bg-[#007F87] text-white font-bold py-6 px-8 text-lg"
              >
                <a 
                  href="https://www.even3.com.br/tickets/get/ii-encontro-quasar-688507?even3_orig=get_tickets" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Inscrever-se Diretamente no Even3
                  <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
            </div>
          )}
          
          {/* Opcional: Loading state inicial */}
          {!showFallback && (
            <div className="absolute inset-0 -z-10 flex items-center justify-center bg-gray-50">
              <span className="animate-pulse text-gray-400">Carregando formulário...</span>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};