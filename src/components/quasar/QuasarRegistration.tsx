import { useState } from "react";
import { Loader2 } from "lucide-react";

// --- CONFIGURAÇÃO ---
// O código do evento (parte final da URL). Ex: even3.com.br/ii-encontro-quasar
const EVENT_CODE = "ii-encontro-quasar-688507"; 

// URL direta do Widget de Tickets (Isso carrega apenas a área de inscrição, sem o cabeçalho do Even3)
const WIDGET_URL = `https://www.even3.com.br/widget/ticket?e=${EVENT_CODE}&t=ticket&lang=pt`;

const QuasarRegistration = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section id="inscricao" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-light text-foreground">
              Inscrição
            </h2>
            <p className="text-muted-foreground">
              Garanta sua vaga participando abaixo.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm relative min-h-[500px]">
            
            {/* Loading Spinner (aparece enquanto o iframe carrega) */}
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-card z-10">
                <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Carregando inscrições...</p>
              </div>
            )}

            {/* IFRAME: A mágica acontece aqui.
                allow="payment" é necessário para processar pagamentos dentro do iframe se houver.
            */}
            <iframe
              src={WIDGET_URL}
              title="Inscrição Even3"
              className="w-full h-[600px] md:h-[700px] border-0"
              onLoad={() => setIsLoading(false)}
              allow="payment; clipboard-write" 
              loading="lazy"
            />

          </div>
          
          <div className="text-center mt-6">
            <p className="text-xs text-muted-foreground">
              Processado via Even3. Ambiente Seguro.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default QuasarRegistration;