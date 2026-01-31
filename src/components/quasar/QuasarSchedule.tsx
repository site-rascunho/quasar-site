import { useState } from "react";
import { Clock, Coffee, Mic, Users, Star, Calendar } from "lucide-react";

interface ScheduleItem {
  time: string;
  title: string;
  speaker?: string;
  type: "talk" | "break" | "ceremony" | "networking";
}

interface DaySchedule {
  day: string;
  date: string;
  items: ScheduleItem[];
}

const schedule: DaySchedule[] = [
  {
    day: "Dia 1",
    date: "Julho/Agosto 2026",
    items: [
      { time: "08:00", title: "Credenciamento", type: "break" },
      { time: "09:45", title: "Quasar (abertura / institucional)", type: "ceremony" },
      { time: "10:30", title: "Palestra 1", speaker: "...", type: "talk" },
      { time: "11:15", title: "Palestra 2", speaker: "...", type: "talk" },
      { time: "12:00", title: "Almoço", type: "break" },
      { time: "14:00", title: "Palestra 3", speaker: "...", type: "talk" },
      { time: "14:45", title: "Palestra 4", speaker: "...", type: "talk" },
      { time: "15:30", title: "Coffee break", type: "break" },
      { time: "16:00", title: "Palestra 5", speaker: "...", type: "talk" },
      { time: "16:45", title: "Palestra 6", speaker: "...", type: "talk" },
      { time: "17:30", title: "Painel", type: "networking" },
    ]
  },
  {
    day: "Dia 2",
    date: "Julho/Agosto 2026",
    items: [
      { time: "09:00", title: "Credenciamento", type: "break" },
      { time: "09:45", title: "Palestra 1", speaker: "...", type: "talk" },
      { time: "10:30", title: "Palestra 2", speaker: "...", type: "talk" },
      { time: "11:15", title: "Palestra 3", speaker: "...", type: "talk" },
      { time: "12:00", title: "Almoço", type: "break" },
      { time: "14:00", title: "Palestra 4", speaker: "...", type: "talk" },
      { time: "15:45", title: "Palestra 5", speaker: "...", type: "talk" },
      { time: "15:30", title: "Coffee break", type: "break" },
      { time: "16:00", title: "Palestra 6", speaker: "...", type: "talk" },
      { time: "16:45", title: "Palestra 7", speaker: "...", type: "talk" },
      { time: "17:30", title: "Palestra 8", speaker: "...", type: "talk" },
      { time: "18:15", title: "Encerramento", type: "ceremony" },
    ]
  }
];

const QuasarSchedule = () => {
  const [activeDay, setActiveDay] = useState(0);

  const getIcon = (type: ScheduleItem["type"]) => {
    switch (type) {
      case "talk":
        return <Mic className="w-4 h-4" />;
      case "ceremony":
        return <Star className="w-4 h-4" />;
      case "break":
        return <Coffee className="w-4 h-4" />;
      case "networking":
        return <Users className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeColorClass = (type: ScheduleItem["type"]) => {
    switch (type) {
      case "talk":
        return "bg-primary/10 text-primary border-primary/20";
      case "ceremony":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20"; // Destaque para cerimônias
      case "networking":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "break":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-secondary text-foreground";
    }
  };

  return (
    <section id="programacao" className="py-24 bg-background relative overflow-hidden">
      {/* Elemento decorativo de fundo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-secondary/30 rounded-full blur-3xl -z-10 pointer-events-none opacity-50" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-light text-foreground tracking-tight">
            Programação
          </h2>
          <p className="text-muted-foreground font-light max-w-xl mx-auto">
            Confira a agenda completa do evento e prepare-se para dois dias de imersão em computação quântica.
          </p>
        </div>

        {/* Day Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-secondary p-1 rounded-full border border-border/50 shadow-sm">
            {schedule.map((day, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDay(idx)}
                className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeDay === idx
                    ? "bg-background text-foreground shadow-md scale-105"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                }`}
              >
                <span className="block md:inline">{day.day}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Schedule List */}
        <div className="max-w-4xl mx-auto">
           {/* Date Display */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-10 animate-fade-in-up">
            <Calendar className="w-4 h-4" />
            <span>{schedule[activeDay].date}</span>
          </div>

          <div 
            key={activeDay} // Key forces re-render for animation
            className="relative space-y-0 animate-fade-in-up"
          >
            {/* Linha vertical contínua da timeline */}
            <div className="absolute left-[27px] md:left-[120px] top-4 bottom-4 w-px bg-border/60" />

            {schedule[activeDay].items.map((item, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col md:flex-row gap-6 md:gap-10 pb-8 last:pb-0"
              >
                {/* Time (Desktop: Left, Mobile: Next to title) */}
                <div className="hidden md:flex w-[120px] justify-end pt-3">
                  <span className="text-sm font-semibold tracking-wide text-muted-foreground group-hover:text-foreground transition-colors">
                    {item.time}
                  </span>
                </div>

                {/* Timeline Node */}
                <div className="absolute left-[13px] md:left-[106px] top-3 z-10">
                  <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg bg-background ${getTypeColorClass(item.type)}`}>
                    {getIcon(item.type)}
                  </div>
                </div>

                {/* Content Card */}
                <div className="flex-1 pl-12 md:pl-0">
                  <div className="bg-card/50 hover:bg-secondary/40 border border-transparent hover:border-border/50 rounded-xl p-5 md:p-6 transition-all duration-300 hover:shadow-elegant">
                    {/* Time for Mobile */}
                    <div className="md:hidden text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {item.time}
                    </div>

                    <div className="flex flex-col gap-1">
                      <h4 className={`text-lg font-medium ${item.type === "break" ? "text-muted-foreground italic" : "text-foreground"}`}>
                        {item.title}
                      </h4>
                      
                      {item.speaker && (
                        <p className="text-sm text-muted-foreground/80 flex items-center gap-2 mt-1">
                          <span className="w-1 h-1 rounded-full bg-primary/40" />
                          {item.speaker}
                        </p>
                      )}

                      {/* Optional: Tag do tipo (pode remover se achar poluído) */}
                      {/* <div className="mt-3 flex">
                        <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${getTypeColorClass(item.type)} bg-transparent`}>
                          {item.type === 'talk' ? 'Palestra' : item.type === 'break' ? 'Intervalo' : item.type === 'ceremony' ? 'Cerimônia' : 'Networking'}
                        </span>
                      </div> 
                      */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuasarSchedule;