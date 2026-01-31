import { useState, useEffect } from "react";
import { 
  Clock, 
  Coffee, 
  Mic, 
  Users, 
  ArrowRight,
  Zap,
  Quote,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
// Importando a logo da Quasar
import QuasarLogo from "@/assets/logo-quasar-branca-zoom.png";

// --- Tipos ---
interface ScheduleItem {
  time: string;
  title: string;
  speaker?: string;
  description?: string; 
  type: "talk" | "break" | "ceremony" | "networking";
}

interface DaySchedule {
  day: string;
  date: string;
  items: ScheduleItem[];
}

// --- Dados ---
const schedule: DaySchedule[] = [
  {
    day: "Dia 1",
    date: "Julho/Agosto 2026",
    items: [
      { time: "08:00", title: "Credenciamento", type: "break" },
      { time: "09:45", title: "Quasar: Abertura Institucional", type: "ceremony" },
      { time: "10:30", title: "Palestra 1: ", speaker: "...", type: "talk" },
      { time: "11:15", title: "Palestra 2: ", speaker: "...", type: "talk" },
      { time: "12:00", title: "Almoço", type: "break" },
      { time: "14:00", title: "Palestra 3: ", speaker: "...", type: "talk" },
      { time: "14:45", title: "Palestra 4: ", speaker: "...", type: "talk" },
      { time: "15:30", title: "Coffee break", type: "break" },
      { time: "16:00", title: "Palestra 5: ", speaker: "...", type: "talk" },
      { time: "16:45", title: "Palestra 6: ", speaker: "...", type: "talk" },
      { time: "17:30", title: "Painel de Discussão", type: "networking" },
    ]
  },
  {
    day: "Dia 2",
    date: "Julho/Agosto 2026",
    items: [
      { time: "09:00", title: "Credenciamento", type: "break" },
      { time: "09:45", title: "Palestra 1: ", speaker: "...", type: "talk" },
      { time: "10:30", title: "Palestra 2: ", speaker: "...", type: "talk" },
      { time: "11:15", title: "Palestra 3: ", speaker: "...", type: "talk" },
      { time: "12:00", title: "Almoço", type: "break" },
      { time: "14:00", title: "Palestra 4: ", speaker: "...", type: "talk" },
      { time: "15:45", title: "Palestra 5: ", speaker: "...", type: "talk" },
      { time: "15:30", title: "Coffee break", type: "break" },
      { time: "16:00", title: "Palestra 6: ", speaker: "...", type: "talk" },
      { time: "16:45", title: "Palestra 7: ", speaker: "...", type: "talk" },
      { time: "17:30", title: "Palestra 8: ", speaker: "...", type: "talk" },
      { time: "18:15", title: "Quasar: Encerramento e Próximos Passos", type: "ceremony" },
    ]
  }
];

const QuasarSchedule = () => {
  const [activeDay, setActiveDay] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Estados para o Modal
  const [selectedItem, setSelectedItem] = useState<ScheduleItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    const isQuasarItem = item.title.toLowerCase().includes("quasar");

    // Estilo "Separador" para Breaks
if (item.type === "break") {
      return (
        <div key={index} className="relative py-6 flex items-center justify-center group select-none">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent group-hover:via-muted-foreground/30 transition-all duration-500"></div>
          <div className="relative z-10 bg-secondary/30 px-10 py-3 rounded-full border border-border/60 shadow-sm flex items-center gap-4 text-muted-foreground backdrop-blur-md hover:bg-secondary/50 hover:border-primary/20 transition-all duration-300">
            <span className="font-mono text-sm md:text-base opacity-90 font-medium text-foreground">{item.time}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
            <span className="uppercase tracking-wide text-xs md:text-sm font-bold flex items-center gap-2.5 text-foreground/80">
              <Coffee className="w-4 h-4 flex-shrink-0 text-primary/70" />
              {item.title}
            </span>
          </div>
        </div>
      );
    }

    const isHighlight = item.type === "ceremony" || item.type === "networking" || isQuasarItem;
    
    // Determina o ícone padrão para os outros tipos
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
        aria-label={`Ver detalhes de ${item.title}`}
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
          
          {isQuasarItem && (
             <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 blur-[100px] rounded-full mix-blend-screen"></div>
             </div>
          )}

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 relative z-10">
            
            {/* Coluna da Esquerda: Tempo e Ícone/Imagem */}
            <div className="flex items-center gap-4 min-w-[130px]">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center border shadow-sm transition-all duration-300 relative overflow-hidden group-hover:scale-105",
                isQuasarItem ? "bg-primary text-primary-foreground border-primary shadow-primary/20" :
                isHighlight ? "bg-primary/10 text-primary border-primary/20" : 
                "bg-secondary/50 text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
              )}>
                {/* Condicional: Se for item Quasar mostra a IMAGEM, senão mostra o ÍCONE */}
                {isQuasarItem ? (
                  <img 
                    src={QuasarLogo} 
                    alt="Quasar Logo" 
                    className="w-10 h-10 object-contain" 
                  />
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
                {item.title}
              </h4>
              
              {item.speaker && (
                <div className="flex items-center gap-2 text-muted-foreground/80 group-hover:text-foreground transition-colors">
                  <Quote className="w-3 h-3 rotate-180 opacity-50" />
                  <p className="text-sm font-medium">{item.speaker}</p>
                </div>
              )}

              <p className="text-xs text-primary/0 group-hover:text-primary/70 transition-all transform translate-y-2 group-hover:translate-y-0 pt-1">
                Clique para ver detalhes
              </p>
            </div>

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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none opacity-40"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-border text-secondary-foreground text-xs font-medium mb-4 animate-fade-in-up backdrop-blur-sm">
            <Zap className="w-3 h-3 text-primary fill-primary" />
            Agenda Oficial 2026
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Cronograma
          </h2>
          
          <p className="max-w-xl text-base text-muted-foreground">
            Dois dias intensos de imersão tecnológica. Clique nas atividades para ver mais detalhes.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="bg-secondary/40 p-1.5 rounded-2xl flex gap-1 backdrop-blur-md border border-border/50 shadow-sm">
            {schedule.map((day, idx) => (
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
                    {day.day}
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
            {schedule[activeDay].items.map((item, idx) => renderItem(item, idx))}
          </div>
        </div>
      </div>

      {/* Modal de Detalhes */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 sm:p-0">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={handleCloseModal}
            aria-hidden="true"
          ></div>

          <div 
            className="relative z-50 w-full max-w-lg bg-card border border-border shadow-2xl rounded-t-2xl md:rounded-2xl overflow-hidden animate-in slide-in-from-bottom-10 zoom-in-95 duration-300 sm:my-8 sm:align-middle"
            role="dialog"
            aria-modal="true"
          >
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
            
            <div className="p-6 md:p-8 relative">
              <button 
                onClick={handleCloseModal} 
                className="absolute right-4 top-4 p-2 rounded-full bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6 pr-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                    <Clock className="w-3 h-3 mr-1" />
                    {selectedItem.time}
                  </span>
                   <span className="text-xs text-muted-foreground">
                     {schedule[activeDay].day}, {schedule[activeDay].date}
                   </span>
                </div>
                <h3 className="text-2xl font-bold text-foreground leading-tight">
                  {selectedItem.title}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="prose prose-sm md:prose-base text-muted-foreground dark:prose-invert">
                  <p className="leading-relaxed">
                    Aqui você encontrará todos os detalhes sobre esta atividade. 
                    Este espaço é reservado para uma descrição aprofundada dos tópicos que serão abordados, 
                    os objetivos da sessão e o que os participantes podem esperar aprender.
                  </p>
                  <p>
                    Conteúdo adicional como pré-requisitos, materiais necessários ou links relevantes 
                    também seriam exibidos aqui.
                  </p>
                </div>

                {selectedItem.speaker && (
                  <div className="mt-8 pt-6 border-t border-border/50 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center border border-border shrink-0">
                       <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-1">Palestrante</h4>
                      <p className="font-medium text-lg">{selectedItem.speaker}</p>
                      <p className="text-sm text-muted-foreground">Biografia curta do palestrante apareceria aqui.</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-end">
                <button 
                   onClick={handleCloseModal}
                   className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors text-sm font-medium"
                >
                  Fechar Detalhes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default QuasarSchedule;