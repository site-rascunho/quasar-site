import { useState } from "react";
import { ArrowRight, Quote } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import aleksKissinger from "@/assets/speakers/aleks-kissinger.jpg";
import fernandoBrandao from "@/assets/speakers/fernando-brandao.jpg";
import amirCaldeira from "@/assets/speakers/amir-caldeira.jpg";
import renatoPortugal from "@/assets/speakers/renato-portugal.jpg";
import MarinaAnsanelli from '@/assets/speakers/marina-ansanelli.jpeg';
import FedericoHolik from '@/assets/speakers/federico-holik.jpeg'; 
import DanielHaro from '@/assets/speakers/daniel-moraes.jpeg'; 
import EricoTexeira from '@/assets/speakers/erico-texeira.png';
import SamsonAbramsky from '@/assets/speakers/samson-abramsky.jpeg';
import RafaelChaves from '@/assets/speakers/rafael-chaves.jpeg';

interface Speaker {
  id: number;
  name: string;
  title: {
    pt: string;
    en: string;
  };
  institution: string;
  image: string;
  bio: {
    pt: string;
    en: string;
  };
}

const speakers: Speaker[] = [
  {
    id: 1,
    name: "Samson Abramsky",
    title: {
      pt: "Professor Emérito",
      en: "Professor Emeritus"
    },
    institution: "University of Oxford",
    image: SamsonAbramsky,
    bio: {
      pt: "Samson Abramsky é Professor Emérito de Ciência da Computação na Universidade de Oxford e Fellow da Royal Society. É um dos fundadores da Mecânica Quântica Categórica, aplicando teoria das categorias para unificar lógica e física. Seu trabalho revolucionou o entendimento da contextualidade, não-localidade e semântica da computação quântica.",
      en: "Samson Abramsky is Professor Emeritus of Computer Science at the University of Oxford and a Fellow of the Royal Society. He is one of the founders of Categorical Quantum Mechanics, applying category theory to unify logic and physics. His work has revolutionized the understanding of contextuality, non-locality, and the semantics of quantum computing."
    }
  },
  {
    id: 2,
    name: "Fernando Brandão",
    title: {
      pt: "Head de Algoritmos Quânticos",
      en: "Head of Quantum Algorithms"
    },
    institution: "AWS / Caltech",
    image: fernandoBrandao,
    bio: {
      pt: "Fernando Brandão é referência global em tecnologia, atua como Diretor de Algoritmos Quânticos na Amazon Web Services (AWS) e Professor Bren no Caltech. Seus trabalhos premiados redefiniram o entendimento sobre emaranhamento e 'supremacia quântica', liderando o desenvolvimento de hardware e software para a próxima geração de computadores.",
      en: "Fernando Brandão is a global reference in technology, serving as Head of Quantum Algorithms at Amazon Web Services (AWS) and Bren Professor at Caltech. His award-winning work has redefined the understanding of entanglement and 'quantum supremacy', leading the development of hardware and software for the next generation of computers."
    }
  },
  {
    id: 3,
    name: "Amir Caldeira",
    title: {
      pt: "Professor Emérito",
      en: "Professor Emeritus"
    },
    institution: "UNICAMP",
    image: amirCaldeira,
    bio: {
      pt: "Amir Caldeira é Professor Emérito da Universidade Estadual de Campinas (UNICAMP) e um dos físicos brasileiros mais citados internacionalmente. É conhecido pelo modelo Caldeira-Leggett, desenvolvido com Anthony Leggett (Nobel de Física 2003), que descreve a dissipação em sistemas quânticos. Suas contribuições foram fundamentais para o entendimento da decoerência quântica.",
      en: "Amir Caldeira is Professor Emeritus at the State University of Campinas (UNICAMP) and one of the most internationally cited Brazilian physicists. He is known for the Caldeira-Leggett model, developed with Anthony Leggett (Nobel Prize in Physics 2003), which describes dissipation in quantum systems. His contributions were fundamental to the understanding of quantum decoherence."
    }
  },
  {
    id: 4,
    name: "Rafael Chaves",
    title: {
      pt: "Professor e Vice-diretor",
      en: "Professor and Vice-Director"
    },
    institution: "IIP",
    image: RafaelChaves,
    bio: {
      pt: "Rafael Chaves é Professor na UFRN e Vice-diretor do Instituto Internacional de Física (IIP). Lidera o grupo de pesquisa em Informação e Matéria Quântica e é membro afiliado da Academia Brasileira de Ciências. Suas pesquisas pioneiras focam em causalidade quântica, aprendizado de máquina quântico e fundamentos da mecânica quântica.",
      en: "Rafael Chaves is a Professor at UFRN and Vice-Director of the International Institute of Physics (IIP). He leads the research group on Quantum Information and Matter and is an affiliate member of the Brazilian Academy of Sciences. His pioneering research focuses on quantum causality, quantum machine learning, and foundations of quantum mechanics."
    }
  },
  {
    id: 5,
    name: "Aleks Kissinger",
    title: {
      pt: "Professor Associado",
      en: "Associate Professor"
    },
    institution: "University of Oxford",
    image: aleksKissinger,
    bio: {
      pt: "Aleks Kissinger é Professor Associado de Ciência da Computação na Universidade de Oxford. É um dos criadores do ZX-calculus, uma linguagem gráfica para raciocínio sobre computação quântica. Seu trabalho em fundamentos da mecânica quântica e verificação de circuitos quânticos tem impacto significativo na área.",
      en: "Aleks Kissinger is an Associate Professor of Computer Science at the University of Oxford. He is one of the creators of the ZX-calculus, a graphical language for reasoning about quantum computing. His work on the foundations of quantum mechanics and quantum circuit verification has had a significant impact on the field."
    }
  },
  {
    id: 6,
    name: "Renato Portugal",
    title: {
      pt: "Pesquisador Titular",
      en: "Senior Researcher"
    },
    institution: "LNCC",
    image: renatoPortugal,
    bio: {
      pt: "Renato Portugal é Pesquisador Titular do Laboratório Nacional de Computação Científica (LNCC). É autor de livros sobre computação quântica e caminhadas quânticas, sendo uma referência internacional na área. Suas pesquisas em algoritmos quânticos contribuíram para o avanço da computação quântica no Brasil.",
      en: "Renato Portugal is a Senior Researcher at the National Laboratory for Scientific Computing (LNCC). He is the author of books on quantum computing and quantum walks, being an international reference in the area. His research on quantum algorithms has contributed to the advancement of quantum computing in Brazil."
    }
  },
  {
    id: 9,
    name: "Erico Teixeira",
    title: {
      pt: "Pesquisador Líder",
      en: "Lead Researcher"
    },
    institution: "Venturus",
    image: EricoTexeira,
    bio: {
      pt: "Erico Teixeira é Doutor em Química Teórica e especialista em Computação Quântica. Une o rigor acadêmico à aplicação industrial, desenvolvendo algoritmos pioneiros para resolver problemas complexos de química e otimização em cenários reais de mercado.",
      en: "Erico Teixeira holds a PhD in Theoretical Chemistry and is a specialist in Quantum Computing. He combines academic rigor with industrial application, developing pioneering algorithms to solve complex chemistry and optimization problems in real market scenarios."
    }
  },
  {
    id: 8,
    name: "Marina Ansanelli",
    title: {
      pt: "Pesquisadora de Doutorado",
      en: "PhD Candidate"
    },
    institution: "Perimeter Institute",
    image: MarinaAnsanelli,
    bio: {
      pt: 'Marina é uma doutoranda no último ano no Perimeter Institute for Theoretical Physics, no Canadá, sob a supervisão de Robert Spekkens. Seus principais interesses são causalidade clássica e quântica, bem como suas conexões com outras áreas dos fundamentos da mecanica quantica, como teorias de recursos, teorias probabilísticas generalizadas e experimentos do tipo “amigo de Eugene Wigner”.',
      en: 'Marina is a final year PhD student at the Perimeter Institute for Theoretical Physics, in Canada, under the supervision of Robert Spekkens. Her main interests are classical and quantum causality, as well as its connections to other areas of quantum foundations such as resource theories, generalized probabilistic theories and Wigner\'s friend though experiments.'
    }
  },
  {
    id: 7,
    name: "Federico Holik",
    title: {
      pt: "Pesquisador Sênior",
      en: "Senior Researcher"
    },
    institution: "CONICET / UNLP",
    image: FedericoHolik,
    bio: {
      pt: "Federico Holik é autoridade latino-americana em Lógica e Fundamentos Quânticos. Atuando pelo CONICET, seu trabalho investiga a estrutura matemática profunda da informação quântica, criando as bases teóricas essenciais para o desenvolvimento de novas tecnologias computacionais.",
      en: "Federico Holik is a Latin American authority on Logic and Quantum Foundations. Working for CONICET, his work investigates the deep mathematical structure of quantum information, creating the essential theoretical bases for the development of new computational technologies."
    }
  },
  {
    id: 10,
    name: "Daniel Haro",
    title: {
      pt: "Head de Tecnologias Emergentes",
      en: "Head of Emerging Technologies"
    },
    institution: "Venturus",
    image: DanielHaro,
    bio: {
      pt: "Daniel Haro é Líder estratégico de inovação no Venturus, focado em preparar grandes empresas para a era do 'Quantum Readiness'. Atua na linha de frente da tradução tecnológica, conectando a ciência quântica avançada a aplicações de mercado e novos modelos de negócios.",
      en: "Daniel Haro is a Strategic Innovation Leader at Venturus, focused on preparing large companies for the 'Quantum Readiness' era. He operates on the front lines of technological translation, connecting advanced quantum science to market applications and new business models."
    }
  },
  {
    id: 11,
    name: "Bárbara Amaral",
    title: {
      pt: "Professora Doutora",
      en: "Professor"
    },
    institution: "USP",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800", // Placeholder
    bio: {
      pt: "Bárbara Amaral é professora no Instituto de Física da USP. Sua pesquisa foca em fundamentos da teoria quântica, teoria de informação quântica e contextualidade. Tem contribuído significativamente para a caracterização de correlações quânticas e suas aplicações em processamento de informação.",
      en: "Bárbara Amaral is a professor at the Physics Institute of USP. Her research focuses on foundations of quantum theory, quantum information theory, and contextuality. She has contributed significantly to the characterization of quantum correlations and their applications in information processing."
    }
  },
  {
    id: 12,
    name: "Roberto Serra",
    title: {
      pt: "Professor Associado",
      en: "Associate Professor"
    },
    institution: "UFABC",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800", // Placeholder
    bio: {
      pt: "Roberto Serra é Professor na UFABC e pesquisador em termodinâmica quântica e informação quântica experimental. Seu grupo realizou experimentos pioneiros sobre a flecha do tempo em sistemas quânticos e relações de flutuação, explorando os limites entre a física quântica e a termodinâmica.",
      en: "Roberto Serra is a Professor at UFABC and a researcher in quantum thermodynamics and experimental quantum information. His group performed pioneering experiments on the arrow of time in quantum systems and fluctuation relations, exploring the boundaries between quantum physics and thermodynamics."
    }
  }
];

const QuasarSpeakers = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  // Filter out placeholders for the display if necessary, or keep them. 
  // keeping the original list logic.
  const displaySpeakers = speakers.filter(s => s.id <= 10);

  return (
    <section id="palestrantes" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-light text-foreground text-center mb-16">
          {t.speakers.title}
        </h2>

        {/* Desktop Grid (Modernizado) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displaySpeakers.map((speaker) => (
            <button
              key={speaker.id}
              onClick={() => setSelectedSpeaker(speaker)}
              className="group relative flex flex-col h-full text-left bg-background hover:bg-card border border-border/50 hover:border-primary/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              {/* Imagem com Efeitos */}
              <div className="aspect-square overflow-hidden relative bg-muted">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                {/* Gradiente sutil no hover */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply" />
              </div>

              {/* Conteúdo do Card */}
              <div className="p-6 flex flex-col flex-grow relative">
                {/* Nome */}
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-tight">
                  {speaker.name}
                </h3>
                
                {/* Cargo */}
                <p className="text-sm text-muted-foreground font-medium line-clamp-2 mb-6 flex-grow">
                  {speaker.title[language]}
                </p>

                {/* Footer do Card com Instituição e Seta */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50 group-hover:border-primary/10 transition-colors">
                  <span className="text-xs font-bold text-muted-foreground/80 uppercase tracking-widest group-hover:text-primary/80 transition-colors">
                    {speaker.institution}
                  </span>
                  
                  {/* Ícone de Seta Animado */}
                  <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Mobile Carousel (Mantido como estava) */}
        <div className="md:hidden -mx-6 px-6">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 pb-8">
              {displaySpeakers.map((speaker) => (
                <CarouselItem key={speaker.id} className="pl-4 basis-[90%] sm:basis-[60%]">
                  <button
                    onClick={() => setSelectedSpeaker(speaker)}
                    className="w-full h-full text-left group"
                  >
                    <div className="bg-background rounded-2xl overflow-hidden border border-border/50 shadow-sm transition-all duration-300 active:scale-[0.98] h-full flex flex-col">
                      <div className="aspect-square overflow-hidden relative">
                        <img
                          src={speaker.image}
                          alt={speaker.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-active:scale-105 grayscale-[20%]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white/90 text-[10px] uppercase tracking-wider font-semibold mb-1 bg-black/30 backdrop-blur-sm inline-block px-2 py-0.5 rounded-full border border-white/10">
                             {speaker.institution}
                          </p>
                          <h3 className="text-xl font-bold text-white leading-tight">
                            {speaker.name}
                          </h3>
                        </div>
                      </div>
                      
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground leading-snug">
                            {speaker.title[language]}
                            </p>
                        </div>

                        <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wide">
                            {/* @ts-ignore */}
                            <span>{t.speakers.seeMore || "Ver perfil"}</span>
                            <ArrowRight className="w-3 h-3 transition-transform group-active:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Speaker Modal - Ajustado para não ficar gigante no Mobile */}
        <Dialog open={!!selectedSpeaker} onOpenChange={() => setSelectedSpeaker(null)}>
          <DialogContent className="max-w-4xl p-0 overflow-y-auto max-h-[90vh] md:max-h-[unset] md:overflow-hidden bg-card border-none shadow-2xl rounded-2xl md:rounded-3xl">
            {selectedSpeaker && (
              <div className="flex flex-col md:flex-row">
                
                {/* Coluna da Imagem: Altura fixa no mobile (h-56) em vez de aspect-square */}
                <div className="relative w-full h-56 sm:h-72 md:h-auto md:w-2/5 md:aspect-auto md:min-h-[450px] group flex-shrink-0">
                  <img
                    src={selectedSpeaker.image}
                    alt={selectedSpeaker.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/5"></div>
                </div>

                {/* Coluna de Conteúdo */}
                <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col justify-center bg-background/95 backdrop-blur-sm relative">
                   
                   <div className="mb-6 md:mb-8 md:pr-8">
                      <div className="inline-flex items-center gap-2 mb-4">
                         <span className="px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 shadow-sm">
                           {selectedSpeaker.institution}
                         </span>
                      </div>
                      
                      {/* Texto reduzido levemente no mobile para economizar espaço */}
                      <DialogTitle className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 leading-tight tracking-tight">
                        {selectedSpeaker.name}
                      </DialogTitle>
                      
                      <p className="text-lg md:text-xl font-medium text-muted-foreground/90 flex items-center gap-2">
                        {selectedSpeaker.title[language]}
                      </p>
                   </div>

                   <div className="relative">
                      <Quote className="absolute -top-4 -left-2 w-8 h-8 text-primary/10 rotate-180" />
                      
                      <div className="prose prose-sm md:prose-base text-muted-foreground leading-relaxed max-h-[300px] overflow-y-auto pr-4 custom-scrollbar relative z-10 pl-1">
                         <p>{selectedSpeaker.bio[language]}</p>
                      </div>
                   </div>

                   <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default QuasarSpeakers;