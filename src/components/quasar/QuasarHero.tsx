import estacaoCiencias from "@/assets/estacao-ciencias.jpg";
import quasarLogo from "@/assets/logo-quasar-branca.png";
import { useLanguage } from "@/contexts/LanguageContext";

const QuasarHero = () => {
  const { t } = useLanguage();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("inscricao");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{ backgroundImage: `url(${estacaoCiencias})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 flex flex-col items-center justify-center h-full pt-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <p className="text-white/90 text-xs md:text-sm tracking-[0.2em] uppercase font-medium">
            {t.hero.dateLocation}
          </p>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter mb-6 drop-shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
          <span className="inline-flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2">
            {t.hero.titlePrefix}
            <img
              src={quasarLogo}
              alt="Quasar"
              className="inline-block h-[1.3em] w-auto align-baseline drop-shadow-2xl transform translate-y-4"
            />
            {t.hero.TitleSuffix}
          </span>
        </h1>

        <p className="text-lg md:text-2xl text-white/80 font-light max-w-3xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          {t.hero.subtitle}
        </p>

        <a
          href="#inscricao"
          onClick={handleScroll}
          className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black text-sm md:text-base font-bold tracking-wide overflow-hidden rounded transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] animate-in fade-in zoom-in duration-1000 delay-300 cursor-pointer"
        >
          <span className="relative z-10">{t.hero.cta}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </a>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-500">
        <span className="text-[10px] uppercase tracking-widest text-white/70">{t.hero.scroll}</span>
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default QuasarHero;