import { useState } from "react";
import { MapPin, ExternalLink, Map as MapIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const QuasarLocation = () => {
  const { t } = useLanguage();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Endereço codificado para URL
  const mapQuery = encodeURIComponent("Estação Cabo Branco - Ciência, Cultura e Artes");
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <section id="local" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-light text-foreground text-center mb-8">
          {t.location.title}
        </h2>
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-foreground" />
            <p className="text-lg font-medium text-foreground">
              {t.location.place}
            </p>
          </div>
          <p className="text-muted-foreground">
            Av. João Cirilo da Silva, s/n - Altiplano Cabo Branco<br />
            João Pessoa - PB, 58046-010
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="aspect-video w-full bg-muted rounded-xl overflow-hidden border border-border relative">
            
            {/* Fallback UI: Aparece se houver erro */}
            {hasError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-card p-6 text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <MapIcon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Não foi possível carregar o mapa</h3>
                <p className="text-muted-foreground mb-6 max-w-sm">
                  Para visualizar a localização exata do evento, abra diretamente no Google Maps.
                </p>
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    Abrir no Google Maps
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            ) : (
              /* Iframe do Mapa */
              <iframe
                src="https://www.google.com/maps/place/Esta%C3%A7%C3%A3o+Cabo+Branco+-+Ci%C3%AAncia,+Cultura+e+Artes/@-7.1495621,-34.7980095,17z/data=!3m1!4b1!4m6!3m5!1s0x7acc3156da82885:0x488b41b7d2620033!8m2!3d-7.1495621!4d-34.7980095!16s%2Fg%2F1230vdlt?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D" // Substituí por um embed genérico da Estação Cabo Branco/Altiplano como exemplo. Você deve colocar o embed real aqui.
                width="100%"
                height="100%"
                style={{ border: 0, opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t.location.place}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setHasError(true);
                  setIsLoading(false);
                }}
              />
            )}
            
            {/* Loading Skeleton enquanto carrega */}
            {isLoading && !hasError && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
                <MapPin className="w-8 h-8 text-muted-foreground/50" />
              </div>
            )}
          </div>
          
          {/* Botão extra para mobile (sempre visível abaixo do mapa para garantir) */}
          <div className="mt-4 text-center md:hidden">
            <Button variant="outline" size="sm" asChild className="w-full">
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                Abrir rota no App de Mapas
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuasarLocation;