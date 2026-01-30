import estacaoCiencias from "@/assets/estacao-ciencias.jpg";

const QuasarHero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${estacaoCiencias})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <p className="text-white/80 text-sm md:text-base tracking-widest uppercase mb-4 reveal">
          Julho/Agosto 2026 • João Pessoa, Brasil
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-tight mb-6 reveal">
          II Encontro Quasar
        </h1>
        <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto mb-8 reveal-delayed">
          Inauguração do Centro Internacional de Computação Quântica (CIQUANTA)
        </p>
        <a 
          href="#inscricao"
          className="inline-block bg-white text-foreground px-8 py-3 text-sm font-medium hover:bg-white/90 transition-colors duration-200 reveal-delayed"
        >
          Inscreva-se
        </a>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-px h-12 bg-white/40 animate-pulse" />
      </div>
    </section>
  );
};

export default QuasarHero;
