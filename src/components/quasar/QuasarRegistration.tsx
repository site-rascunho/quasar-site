import { useEffect } from "react";
import { ShieldCheck, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const QuasarRegistration = () => {
  const { t, language } = useLanguage(); // Captura o idioma atual

  useEffect(() => {
    // Limpa o container antes de inserir o novo script para evitar duplicação ou conteúdo errado
    const widgetContainer = document.getElementById("even3-widget-ticket");
    if (widgetContainer) widgetContainer.innerHTML = "";

    const script = document.createElement("script");
    // Usa o idioma atual (pt ou en) na URL do script
    script.src = `https://www.even3.com.br/widget/js?e=ii-encontro-quasar-688507&t=ticket&lang=${language}`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Limpeza ao desmontar ou trocar de idioma
      document.body.removeChild(script);
      if (widgetContainer) widgetContainer.innerHTML = "";
    };
  }, [language]); // Recarrega quando o idioma mudar

  return (
    <section id="inscricao" className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-50/[0.03] bg-[bottom_1px] [mask-image:linear-gradient(to_bottom,transparent,white)] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
              {t.registration.title}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t.registration.description}
            </p>
          </div>

          {/* Card Container */}
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden relative">
            
            {/* BOTÃO MOBILE (Link Atualizado e Texto Traduzido) */}
            <div className="md:hidden p-6 pb-2">
              <a
                href="https://www.even3.com.br/tickets/get/ii-encontro-quasar-688507?even3_orig=get_tickets"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full px-6 py-4 bg-[#0097FF] hover:bg-[#007acc] text-white rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl gap-2 active:scale-95"
              >
                <ExternalLink className="w-4 h-4" />
                {/* @ts-ignore */}
                {t.registration.openExternal}
              </a>
              <div className="text-center mt-4 mb-2">
                <span className="text-xs text-muted-foreground uppercase tracking-widest px-2 bg-card relative z-10">
                  {/* @ts-ignore */}
                  {t.registration.orFillBelow}
                </span>
                <div className="absolute left-0 right-0 h-px bg-border -mt-2 z-0 mx-6"></div>
              </div>
            </div>

            {/* Widget Area */}
            <div className="w-full relative bg-white p-4 md:p-8 min-h-[400px]">
               {/* Container alvo do script do Even3 */}
               <div id="even3-widget-ticket"></div>
            </div>

            {/* Footer de Segurança */}
            <div className="bg-secondary/30 p-4 border-t border-border flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
              {t.registration.secure}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuasarRegistration;