import { useState } from "react";
import { MapPin, ExternalLink, Map as MapIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const QuasarLocation = () => {
  const { t } = useLanguage();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Alteração: Removidas latitude e longitude.
  // Usamos apenas o nome do local para que o Google encontre a entidade correta.
  const mapQueryName = encodeURIComponent("Estação Cabo Branco - Ciência, Cultura e Artes");

  // Link externo para abrir a pesquisa no site/app do Google Maps
  const googleMapsExternalUrl = `https://www.google.com/maps/search/?api=1&query=${mapQueryName}`;

  // URL do Iframe baseada no nome (parâmetro q=)
  // t= (tipo de mapa, vazio é padrão)
  // z=16 (zoom)
  // output=embed (formato para iframe)
  const mapEmbedUrl = `https://maps.google.com/maps?q=${mapQueryName}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

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
            
            {/* Fallback UI: Aparece se o mapa falhar */}
            {hasError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-card p-6 text-center animate-in fade-in duration-300">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <MapIcon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Ver localização no mapa</h3>
                <p className="text-muted-foreground mb-6 max-w-sm">
                  Não foi possível carregar a visualização aqui. Abra diretamente no Google Maps.
                </p>
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <a href={googleMapsExternalUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    Abrir no Google Maps
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            ) : (
              /* Iframe usando query por nome */
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t.location.place}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  console.log("Erro ao carregar mapa");
                  setHasError(true);
                  setIsLoading(false);
                }}
              />
            )}
            
            {/* Loading Skeleton */}
            {isLoading && !hasError && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
                <MapPin className="w-8 h-8 text-muted-foreground/50" />
              </div>
            )}
          </div>
          
          {/* Botão auxiliar para mobile (sempre visível) */}
          <div className="mt-4 text-center md:hidden">
            <Button variant="outline" size="sm" asChild className="w-full">
              <a href={googleMapsExternalUrl} target="_blank" rel="noopener noreferrer">
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