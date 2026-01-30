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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.226933569726!2d-34.80208292418512!3d-7.099665569606138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7acdd6210469271%3A0x6e964177651e7027!2sEsta%C3%A7%C3%A3o%20Cabo%20Branco%20-%20Ci%C3%AAncia%2C%20Cultura%20e%20Artes!5e0!3m2!1spt-BR!2sbr!4v1706640000000!5m2!1spt-BR!2sbr"
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