import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext"; // Importando o contexto

// Imports das imagens (mantidos iguais)
import aleksKissinger from "@/assets/speakers/aleks-kissinger.jpg";
import fernandoBrandao from "@/assets/speakers/fernando-brandao.jpg";
import amirCaldeira from "@/assets/speakers/amir-caldeira.jpg";
import renatoPortugal from "@/assets/speakers/renato-portugal.jpg";
import MarinaAnsanelli from '@/assets/speakers/marina-ansanelli.jpeg';
import FedericoHolik from '@/assets/speakers/federico-holik.jpeg'; 
import DanielHaro from '@/assets/speakers/daniel-moraes.jpeg'; 
import EricoTexeira from '@/assets/speakers/erico-texeira.jpeg';
import SamsonAbramsky from '@/assets/speakers/samson-abramsky.jpeg';
import RafaelChaves from '@/assets/speakers/rafael-chaves.jpeg';

interface Speaker {
  id: number;
  name: string;
  titleKey: string; // Chave para buscar o título no translations.ts
  institution: string;
  image: string;
  bioPt: string; // Biografia em Português
  bioEn: string; // Biografia em Inglês
}

// Atualizamos os dados para incluir bioPt e bioEn
const speakersData: Speaker[] = [
  {
    id: 1,
    name: "Samson Abramsky",
    titleKey: "professor",
    institution: "University of Oxford / University College London",
    image: SamsonAbramsky,
    bioPt:
      "Samson Abramsky é Professor Emérito no Department of Computer Science da University of Oxford e atua como Professor de Ciência da Computação na University College London. É Fellow da Royal Society (FRS). É um dos pioneiros da Categorical Quantum Mechanics, usando teoria das categorias para conectar lógica, semântica e física, com contribuições fundamentais para contextualidade e não-localidade.",
    bioEn:
      "Samson Abramsky is an Emeritus Professor in the Department of Computer Science at the University of Oxford and a Professor of Computer Science at University College London. He is a Fellow of the Royal Society (FRS). A pioneer in Categorical Quantum Mechanics, he applies category theory to connect logic, semantics, and physics, with major contributions to contextuality and non-locality."
  },
  {
    id: 2,
    name: "Fernando Brandão",
    titleKey: "head",
    institution: "AWS / Caltech",
    image: fernandoBrandao,
    bioPt:
      "Fernando Brandão é head of quantum algorithms na Amazon Web Services (AWS) e Bren Professor of Theoretical Physics no Caltech. Sua pesquisa em informação quântica abrange, entre outros temas, teoria do emaranhamento, complexidade quântica e o estudo de algoritmos e limites fundamentais de computação quântica.",
    bioEn:
      "Fernando Brandão is the head of quantum algorithms at Amazon Web Services (AWS) and the Bren Professor of Theoretical Physics at Caltech. His research in quantum information spans entanglement theory, quantum complexity, and the study of algorithms and fundamental limits of quantum computation."
  },
  {
    id: 3,
    name: "Amir Caldeira",
    titleKey: "professor",
    institution: "UNICAMP",
    image: amirCaldeira,
    bioPt:
      "Amir O. Caldeira é físico teórico e professor na Universidade Estadual de Campinas (UNICAMP). É conhecido pelo modelo Caldeira–Leggett, desenvolvido em colaboração com Anthony Leggett (Nobel de Física de 2003), que descreve dissipação e decoerência em sistemas quânticos acoplados a um ambiente.",
    bioEn:
      "Amir O. Caldeira is a theoretical physicist and a professor at UNICAMP. He is renowned for the Caldeira–Leggett model, developed in collaboration with Anthony Leggett (2003 Nobel Prize in Physics), which describes dissipation and decoherence in quantum systems coupled to an environment."
  },
  {
    id: 4,
    name: "Rafael Chaves",
    titleKey: "professor",
    institution: "IIP / UFRN",
    image: RafaelChaves,
    bioPt:
      "Rafael Chaves é professor na UFRN e Deputy Director do Instituto Internacional de Física (IIP-UFRN). Lidera iniciativas e colaborações em Informação Quântica e Fundamentos, e é membro afiliado da Academia Brasileira de Ciências.",
    bioEn:
      "Rafael Chaves is a professor at UFRN and Deputy Director of the International Institute of Physics (IIP-UFRN). He leads research efforts and collaborations in Quantum Information and Foundations, and is an Affiliate Member of the Brazilian Academy of Sciences."
  },
  {
    id: 5,
    name: "Aleks Kissinger",
    titleKey: "professor",
    institution: "University of Oxford",
    image: aleksKissinger,
    bioPt:
      "Aleks Kissinger é Professor of Quantum Computing na University of Oxford e co-lidera o Quantum Group do departamento. Sua pesquisa cobre software quântico (compilação, verificação e simulação), com forte atuação em métodos diagramáticos e no ZX-calculus — uma linguagem gráfica introduzida por Coecke e Duncan e hoje amplamente usada em otimização e raciocínio sobre circuitos quânticos.",
    bioEn:
      "Aleks Kissinger is a Professor of Quantum Computing at the University of Oxford and joint head of the department’s Quantum Group. His work spans quantum software (compilation, verification, and simulation), with a strong focus on diagrammatic methods and the ZX-calculus—a graphical language introduced by Coecke and Duncan and now widely used for reasoning about and optimizing quantum circuits."
  },
  {
    id: 6,
    name: "Renato Portugal",
    titleKey: "researcher",
    institution: "LNCC (MCTI)",
    image: renatoPortugal,
    bioPt:
      "Renato Portugal é Pesquisador Titular (Full Researcher) do Laboratório Nacional de Computação Científica (LNCC/MCTI). Atua em computação quântica e caminhadas quânticas e é autor do livro 'Quantum Walks and Search Algorithms', referência didática na área.",
    bioEn:
      "Renato Portugal is a Full Researcher at the National Laboratory for Scientific Computing (LNCC/MCTI). He works on quantum computing and quantum walks and authored the textbook 'Quantum Walks and Search Algorithms', a widely used reference in the field."
  },
  {
    id: 9,
    name: "Erico Teixeira",
    titleKey: "researcher",
    institution: "Venturus",
    image: EricoTexeira,
    bioPt:
      "Erico Souza Teixeira é pesquisador em Computação Quântica no Venturus. Possui PhD em Química Teórica e Computacional e atua na interface entre pesquisa e aplicação, com foco em química computacional quântica, bioinformática e desenvolvimento de algoritmos para problemas de alta complexidade.",
    bioEn:
      "Erico Souza Teixeira is a Quantum Computing researcher at Venturus. He holds a PhD in Theoretical and Computational Chemistry and works at the intersection of research and application, focusing on quantum computational chemistry, bioinformatics, and algorithm development for high-complexity problems."
  },
  {
    id: 8,
    name: "Marina Ansanelli",
    titleKey: "student",
    institution: "Perimeter Institute",
    image: MarinaAnsanelli,
    bioPt:
      "Marina Maciel Ansanelli é doutoranda (PhD candidate) no Perimeter Institute e recipient do Emmy Noether Emerging Talent Fund. Sua pesquisa está em fundamentos quânticos, com ênfase em inferência causal quântica (quantum causal inference) e em como estruturas causais ajudam a explicar vantagens e comportamentos não-clássicos.",
    bioEn:
      "Marina Maciel Ansanelli is a PhD candidate at Perimeter Institute and a recipient of the Emmy Noether Emerging Talent Fund. Her research is in quantum foundations, with a focus on quantum causal inference and how causal structures help explain quantum advantages and non-classical phenomena."
  },
  {
    id: 7,
    name: "Federico Holik",
    titleKey: "researcher",
    institution: "CONICET / UNLP (Instituto de Física La Plata)",
    image: FedericoHolik,
    bioPt:
      "Federico Hernán Holik é Investigador Adjunto (Adjoint Researcher) do CONICET no Instituto de Física La Plata (UNLP/CONICET). Sua pesquisa explora fundamentos da mecânica quântica, lógica quântica e aspectos probabilísticos e algébricos da informação quântica.",
    bioEn:
      "Federico Hernán Holik is an Adjoint Researcher at CONICET at the Institute of Physics La Plata (UNLP/CONICET). His work explores quantum foundations, quantum logic, and probabilistic and algebraic aspects of quantum information."
  },
  {
    id: 10,
    name: "Daniel Haro",
    titleKey: "head",
    institution: "Venturus",
    image: DanielHaro,
    bioPt:
      "Daniel de Haro Moraes é Head de Tecnologias Emergentes no Venturus. Lidera iniciativas em computação quântica, incluindo programas de 'Quantum Readiness', além de atuar com temas correlatos como blockchain e cibersegurança aplicada.",
    bioEn:
      "Daniel de Haro Moraes is Head of Emerging Technologies at Venturus. He leads initiatives in quantum computing, including 'Quantum Readiness' programs, and also works on related areas such as blockchain and applied cybersecurity."
  }
];

const QuasarSpeakers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const { t, language } = useLanguage(); // Hook do idioma

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % speakersData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + speakersData.length) % speakersData.length);
  };

  // Função auxiliar para pegar o título traduzido com segurança
  const getTranslatedTitle = (key: string) => {
    // @ts-ignore - Acesso dinâmico ao objeto de traduções
    return t.speakers.role[key] || key;
  };

  return (
    <section id="palestrantes" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-light text-foreground text-center mb-16">
          {t.speakers.title}
        </h2>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {speakersData.map((speaker) => (
            <button
              key={speaker.id}
              onClick={() => setSelectedSpeaker(speaker)}
              className="group text-left bg-background p-6 transition-all duration-300 hover:shadow-lg"
            >
              <div className="aspect-square overflow-hidden mb-4 grayscale group-hover:grayscale-0 transition-all duration-300">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-1">
                {speaker.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-1">
                {getTranslatedTitle(speaker.titleKey)}
              </p>
              <p className="text-sm text-muted-foreground">
                {speaker.institution}
              </p>
            </button>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {speakersData.map((speaker) => (
                <button
                  key={speaker.id}
                  onClick={() => setSelectedSpeaker(speaker)}
                  className="min-w-full px-4 text-left"
                >
                  <div className="bg-background p-6">
                    <div className="aspect-square overflow-hidden mb-4 grayscale">
                      <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-1">
                      {speaker.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      {getTranslatedTitle(speaker.titleKey)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {speaker.institution}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              className="p-2 border border-border hover:bg-accent transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {speakersData.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentIndex ? "bg-foreground" : "bg-border"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="p-2 border border-border hover:bg-accent transition-colors"
              aria-label="Próximo"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Speaker Modal */}
        <Dialog open={!!selectedSpeaker} onOpenChange={() => setSelectedSpeaker(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-light">
                {selectedSpeaker?.name}
              </DialogTitle>
            </DialogHeader>
            {selectedSpeaker && (
              <div className="grid md:grid-cols-2 gap-6 pt-4">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={selectedSpeaker.image}
                    alt={selectedSpeaker.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    {getTranslatedTitle(selectedSpeaker.titleKey)}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {selectedSpeaker.institution}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {/* Exibe a bio baseada no idioma selecionado */}
                    {language === 'pt' ? selectedSpeaker.bioPt : selectedSpeaker.bioEn}
                  </p>
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