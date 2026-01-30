import { MapPin } from "lucide-react";

const QuasarLocation = () => {
  return (
    <section id="local" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-light text-foreground text-center mb-8">
          Local do Evento
        </h2>
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-foreground" />
            <p className="text-lg font-medium text-foreground">
              Estação Ciência, Cultura e Artes
            </p>
          </div>
          <p className="text-muted-foreground">
            Av. João Cirilo da Silva, s/n - Altiplano Cabo Branco<br />
            João Pessoa - PB, 58046-010
          </p>
        </div>

        {/* Interactive Map */}
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video w-full bg-muted overflow-hidden">
            <iframe
              src="https://maps.google.com/maps?q=Estação%20Cabo%20Branco%20-%20Ciência,%20Cultura%20e%20Artes&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Estação Ciência"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuasarLocation;