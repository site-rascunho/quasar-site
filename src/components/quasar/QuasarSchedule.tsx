import { useState, useEffect } from "react";
import { Clock, Coffee, Mic, Users, ArrowRight, Zap, Quote, X } from "lucide-react";
import { cn } from "@/lib/utils";
import QuasarLogo from "@/assets/logo-quasar-branca-zoom.png";
import { useLanguage } from "@/contexts/LanguageContext"; // Importe

interface ScheduleItem {
  time: string;
  titleKey: string; // Chave de tradução ou texto fixo se for nome de palestra específica
  speaker?: string;
  type: "talk" | "break" | "ceremony" | "networking";
}

interface DaySchedule {
  dayKey: string; // 'day1' ou 'day2'
  date: string;
  items: ScheduleItem[];
}

const QuasarSchedule = () => {
  const [activeDay, setActiveDay] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<ScheduleItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage(); // Hook

  // Dados dentro do componente para acessar 't' se quiséssemos, 
  // mas como as chaves são estáticas, podemos manter a estrutura e traduzir na renderização.
  const scheduleData: DaySchedule[] = [
    {
      dayKey: "day1",
      date: t.hero.dateLocation.split("•")[0].trim(), // Reutiliza a data do Hero ou string fixa
      items: [
        { time: "08:00", titleKey: "checkin", type: "break" },
        { time: "09:45", titleKey: "opening", type: "ceremony" },
        { time: "10:30", titleKey: "talk", speaker: "...", type: "talk" },
        { time: "11:15", titleKey: "talk", speaker: "...", type: "talk" },
        { time: "12:00", titleKey: "lunch", type: "break" },
        { time: "14:00", titleKey: "talk", speaker: "...", type: "talk" },
        { time: "14:45", titleKey: "talk", speaker: "...", type: "talk" },
        { time: "15:30", titleKey: "break", type: "break" },
        { time: "16:00", titleKey: "talk", speaker: "...", type: "talk" },
        { time: "16:45", titleKey: "talk", speaker: "...", type: "talk" },
        { time: "17:30", titleKey: "panel", type: "networking" },
      ]
    },
    {
      dayKey: "day2",
      date: t.hero.dateLocation.split("•")[0].trim(),
      items: [
        { time: "09:00", titleKey: "checkin", type: "break" },
        { time: "09:45", titleKey: "talk", speaker: "...", type: "talk" },
        { time: "10:30", titleKey: "talk", speaker: "...", type: "talk" },
        { time: "11:15", titleKey: "talk", speaker: "...", type: "talk" },
        { time: "12:00", titleKey: "lunch", type: "break" },
        { time: "14:00", titleKey: "talk", speaker: "...", type: "talk" },
        { time: "15:45", titleKey: "talk", speaker: "...", type: "talk" },
        { time: "15:30", titleKey: "break", type: "break" },
        { time: "16:00", titleKey: "talk", speaker: "...", type: "talk" },
        { time: "16:45", titleKey: "talk", speaker: "...", type: "talk" },
        { time: "17:30", titleKey: "talk", speaker: "...", type: "talk" },
        { time: "18:15", titleKey: "closing", type: "ceremony" },
      ]
    }
  ];

  // Helper para traduzir o título do item
  const getItemTitle = (key: string) => {
    // @ts-ignore
    return t.schedule.items[key] || key + " (Title)";
  };

  // Helper para traduzir o dia
  const getDayTitle = (key: string) => {
    // @ts-ignore
    return t.schedule[key] || key;
  };

  const handleOpenModal = (item: ScheduleItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
    setTimeout(() => setSelectedItem(null), 300);
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleCloseModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const renderItem = (item: ScheduleItem, index: number) => {
    const title = getItemTitle(item.titleKey);
    const isQuasarItem = title.toLowerCase().includes("quasar");
    const isHighlight = item.type === "ceremony" || item.type === "networking" || isQuasarItem;
    
    // ... Lógica de renderização do Break ...
    if (item.type === "break") {
       return (
        <div key={index} className="relative py-6 flex items-center justify-center group select-none">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent group-hover:via-muted-foreground/30 transition-all duration-500"></div>
          <div className="relative z-10 bg-secondary/30 px-10 py-3 rounded-full border border-border/60 shadow-sm flex items-center gap-4 text-muted-foreground backdrop-blur-md hover:bg-secondary/50 hover:border-primary/20 transition-all duration-300">
            <span className="font-mono text-sm md:text-base opacity-90 font-medium text-foreground">{item.time}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
            <span className="uppercase tracking-wide text-xs md:text-sm font-bold flex items-center gap-2.5 text-foreground/80">
              <Coffee className="w-4 h-4 flex-shrink-0 text-primary/70" />
              {title}
            </span>
          </div>
        </div>
      );
    }

    let IconComponent = Mic;
    if (item.type === 'networking') IconComponent = Users;
    
    return (
      <div 
        key={index}
        className="relative group perspective-1000 cursor-pointer"
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        onClick={() => handleOpenModal(item)}
        role="button"
        aria-label={`Ver detalhes de ${title}`}
      >
        <div className={cn(
          "relative p-5 md:p-6 rounded-2xl border transition-all duration-500 ease-out overflow-hidden backdrop-blur-md",
          "bg-card/40 hover:bg-card/60",
          isQuasarItem 
            ? "hover:shadow-[0_0_40px_-10px_rgba(var(--primary),0.3)] hover:border-primary/50"
            : "hover:shadow-[0_0_30px_-5px_rgba(var(--primary),0.1)] hover:border-primary/30",
          hoveredIndex === index ? "-translate-y-1 scale-[1.005]" : "",
          isHighlight ? "border-primary/10 bg-primary/[0.03]" : "border-border/40"
        )}>
           {/* ... Efeitos visuais mantidos ... */}
           {isQuasarItem && (
             <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 blur-[100px] rounded-full mix-blend-screen"></div>
             </div>
          )}

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 relative z-10">
            <div className="flex items-center gap-4 min-w-[130px]">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center border shadow-sm transition-all duration-300 relative overflow-hidden group-hover:scale-105",
                isQuasarItem ? "bg-primary text-primary-foreground border-primary shadow-primary/20" :
                isHighlight ? "bg-primary/10 text-primary border-primary/20" : 
                "bg-secondary/50 text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
              )}>
                {isQuasarItem ? (
                  <img src={QuasarLogo} alt="Quasar Logo" className="w-10 h-10 object-contain" />
                ) : (
                  <IconComponent className="w-6 h-6" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-foreground font-mono tabular-nums">
                  {item.time}
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-1.5">
              <h4 className={cn(
                "text-lg md:text-xl font-semibold tracking-tight transition-colors leading-tight",
                isQuasarItem ? "text-primary" : "text-foreground group-hover:text-primary"
              )}>
                {title}
              </h4>
              
              {item.speaker && (
                <div className="flex items-center gap-2 text-muted-foreground/80 group-hover:text-foreground transition-colors">
                  <Quote className="w-3 h-3 rotate-180 opacity-50" />
                  <p className="text-sm font-medium">{item.speaker}</p>
                </div>
              )}
            </div>
            {/* ... Seta mantida ... */}
             <div className="hidden md:flex items-center justify-end pl-4">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300",
                isQuasarItem ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"
              )}>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="programacao" className="py-24 bg-background relative overflow-hidden">
      {/* ... Background effects mantidos ... */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none opacity-40"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-border text-secondary-foreground text-xs font-medium mb-4 animate-fade-in-up backdrop-blur-sm">
            <Zap className="w-3 h-3 text-primary fill-primary" />
            {t.schedule.badge}
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            {t.schedule.title}
          </h2>
          
          <p className="max-w-xl text-base text-muted-foreground">
            {t.schedule.description}
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="bg-secondary/40 p-1.5 rounded-2xl flex gap-1 backdrop-blur-md border border-border/50 shadow-sm">
            {scheduleData.map((day, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDay(idx)}
                className={cn(
                  "relative px-6 md:px-10 py-3 rounded-xl text-sm font-medium transition-all duration-300 overflow-hidden min-w-[120px]",
                  activeDay === idx
                    ? "text-primary-foreground shadow-md bg-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                )}
              >
                <div className="relative z-10 flex flex-col items-center gap-0.5">
                  <span className={cn("text-sm md:text-base font-bold")}>
                    {getDayTitle(day.dayKey)}
                  </span>
                  <span className={cn("text-[10px] md:text-xs opacity-80")}>
                    {day.date}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-3 md:space-y-4">
          <div key={activeDay} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {scheduleData[activeDay].items.map((item, idx) => renderItem(item, idx))}
          </div>
        </div>
      </div>

      {/* Modal de Detalhes (Simplificado para manter foco na tradução) */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 sm:p-0">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={handleCloseModal}
          ></div>
          <div className="relative z-50 w-full max-w-lg bg-card border border-border shadow-2xl rounded-t-2xl md:rounded-2xl overflow-hidden p-6 md:p-8">
             <button onClick={handleCloseModal} className="absolute right-4 top-4 p-2"><X className="w-5 h-5"/></button>
             <h3 className="text-2xl font-bold mb-4">{getItemTitle(selectedItem.titleKey)}</h3>
             <p className="text-muted-foreground">{t.schedule.detailsComingSoon}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default QuasarSchedule;