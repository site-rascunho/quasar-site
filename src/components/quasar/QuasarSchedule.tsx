import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  Coffee, 
  Mic, 
  Users, 
  Star, 
  ChevronRight,
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils"; // Assumindo que você tem o utilitário cn configurado

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
      case "talk": return <Mic className="w-4 h-4" />;
      case "break": return <Coffee className="w-4 h-4" />;
      case "ceremony": return <Star className="w-4 h-4" />;
      case "networking": return <Users className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getItemStyles = (type: ScheduleItem["type"]) => {
    switch (type) {
      case "talk":
        return "border-primary/30 bg-card hover:border-primary/60";
      case "ceremony":
        return "border-amber-500/30 bg-amber-500/5 hover:border-amber-500/60";
      case "break":
        return "border-muted bg-muted/20 opacity-80 hover:opacity-100";
      case "networking":
        return "border-indigo-500/30 bg-indigo-500/5 hover:border-indigo-500/60";
      default:
        return "border-border bg-card";
    }
  };

  return (
    <section id="programacao" className="py-24 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-1/4 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-light text-foreground tracking-tight">
            Programação <span className="font-semibold text-primary">do Evento</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Confira as atividades planejadas para os dois dias de imersão em tecnologia e inovação.
          </p>
        </div>

        {/* Day Tabs */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-secondary/50 p-1.5 rounded-full border border-border/50 shadow-sm backdrop-blur-sm">
            {schedule.map((day, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDay(idx)}
                className={cn(
                  "px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2",
                  activeDay === idx
                    ? "bg-background text-primary shadow-md scale-105 ring-1 ring-border"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                )}
              >
                <Calendar className="w-4 h-4" />
                <span>{day.day}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Date Display */}
        <div className="text-center mb-12 animate-fade-in-up">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary border border-primary/10 text-sm font-medium">
             <Clock className="w-4 h-4" />
             {schedule[activeDay].date}
           </div>
        </div>

        {/* Schedule Grid */}
        <div className="max-w-4xl mx-auto space-y-6">
          {schedule[activeDay].items.map((item, idx) => (
            <div
              key={idx}
              className="group relative pl-8 md:pl-0 animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {/* Timeline Line (Desktop) */}
              <div className="hidden md:block absolute left-[9.5rem] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent group-last:via-transparent"></div>
              
              <div className="flex flex-col md:flex-row gap-6 md:items-center relative">
                
                {/* Time Column */}
                <div className="md:w-32 flex-shrink-0 text-right">
                  <span className="text-xl font-light tracking-tighter text-foreground/80 group-hover:text-primary transition-colors duration-300">
                    {item.time}
                  </span>
                </div>

                {/* Timeline Dot */}
                <div className="hidden md:flex absolute left-[9.5rem] -translate-x-1/2 items-center justify-center w-4 h-4 rounded-full border-2 border-background bg-muted-foreground/30 group-hover:bg-primary group-hover:scale-125 transition-all duration-300 z-10"></div>

                {/* Content Card */}
                <div className={cn(
                  "flex-1 p-5 rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden",
                  getItemStyles(item.type)
                )}>
                  {/* Icon Watermark (Background) */}
                  <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 scale-150 text-foreground">
                    {getIcon(item.type) && <div className="[&>svg]:w-24 [&>svg]:h-24">{getIcon(item.type)}</div>}
                  </div>

                  <div className="flex items-start justify-between gap-4 relative z-10">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn(
                          "inline-flex p-1.5 rounded-md text-xs", 
                          item.type === 'break' ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
                        )}>
                          {getIcon(item.type)}
                        </span>
                        <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground/70">
                          {item.type === 'talk' ? 'Palestra' : 
                           item.type === 'break' ? 'Intervalo' : 
                           item.type === 'networking' ? 'Networking' : 'Cerimônia'}
                        </span>
                      </div>
                      
                      <h4 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      
                      {item.speaker && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1.5 pt-1">
                          <Users className="w-3 h-3" />
                          {item.speaker}
                        </p>
                      )}
                    </div>

                    {item.speaker && (
                      <div className="hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                        <div className="bg-background p-2 rounded-full shadow-sm border border-border">
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuasarSchedule;