import estacaoCiencias from "@/assets/estacao-ciencias.jpg";

const QuasarHero = () => {
  
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("inscricao");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image com leve escala para efeito de profundidade */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{ backgroundImage: `url(${estacaoCiencias})` }}
      />
      
      {/* Overlay aprimorado para melhor contraste e sofisticação */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 flex flex-col items-center justify-center h-full pt-20">
        
        {/* Badge de Data e Local */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <p className="text-white/90 text-xs md:text-sm tracking-[0.2em] uppercase font-medium">
            Julho/Agosto 2026 • João Pessoa
          </p>
        </div>

        {/* Título Principal */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter mb-6 drop-shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
          II Encontro <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-white to-blue-200">Quasar</span>
        </h1>

        {/* Subtítulo Descritivo */}
        <p className="text-lg md:text-2xl text-white/80 font-light max-w-3xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          Inauguração do <strong className="text-white font-medium">Centro Internacional de Computação Quântica</strong> (CIQUANTA)
        </p>

        {/* Botão de Ação (CTA) */}
        <a 
          href="#inscricao"
          onClick={handleScroll} 
          className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black text-sm md:text-base font-bold tracking-wide overflow-hidden rounded transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] animate-in fade-in zoom-in duration-1000 delay-300 cursor-pointer"
        >
          <span className="relative z-10">GARANTIR PRESENÇA</span>
          {/* Efeito de brilho no hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </a>
      </div>
      
      {/* Indicador de Scroll Minimalista */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-500">
        <span className="text-[10px] uppercase tracking-widest text-white/70">Descubra</span>
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default QuasarHero;