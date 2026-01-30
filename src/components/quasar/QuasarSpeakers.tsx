import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import aleksKissinger from "@/assets/speakers/aleks-kissinger.jpg";
import fernandoBrandao from "@/assets/speakers/fernando-brandao.jpg";
import amirCaldeira from "@/assets/speakers/amir-caldeira.jpg";
import renatoPortugal from "@/assets/speakers/renato-portugal.jpg";
import MarinaAnsanelli from '@/assets/speakers/marina-ansanelli.jpg';
import FedericoHolik from '@/assets/speakers/daniel-moraes.jpg'; // Ajuste o nome do arquivo
import DanielHaro from '@/assets/speakers/federico-holik.jpg'; // Ajuste o nome do arquivo

interface Speaker {
  id: number;
  name: string;
  title: string;
  institution: string;
  image: string;
  bio: string;
}

const speakers: Speaker[] = [
  {
    id: 1,
    name: "Fernando Brandão",
    title: "Professor de Física Teórica",
    institution: "Caltech / Amazon",
    image: fernandoBrandao,
    bio: "Fernando Brandão é Professor Bren de Física Teórica no Caltech e Diretor de Pesquisa Quântica na Amazon Web Services. Seus trabalhos pioneiros em teoria de informação quântica incluem contribuições fundamentais em emaranhamento quântico, termodinâmica quântica e algoritmos quânticos. Recebeu diversos prêmios internacionais por suas contribuições à física quântica."
  },
  {
    id: 2,
    name: "Amir Caldeira",
    title: "Professor Emérito",
    institution: "UNICAMP",
    image: amirCaldeira,
    bio: "Amir Caldeira é Professor Emérito da Universidade Estadual de Campinas (UNICAMP) e um dos físicos brasileiros mais citados internacionalmente. É conhecido pelo modelo Caldeira-Leggett, desenvolvido com Anthony Leggett (Nobel de Física 2003), que descreve a dissipação em sistemas quânticos. Suas contribuições foram fundamentais para o entendimento da decoerência quântica."
  },
  {
    id: 3,
    name: "Aleks Kissinger",
    title: "Professor Associado",
    institution: "University of Oxford",
    image: aleksKissinger,
    bio: "Aleks Kissinger é Professor Associado de Ciência da Computação na Universidade de Oxford. É um dos criadores do ZX-calculus, uma linguagem gráfica para raciocínio sobre computação quântica. Seu trabalho em fundamentos da mecânica quântica e verificação de circuitos quânticos tem impacto significativo na área."
  },
  {
    id: 4,
    name: "Renato Portugal",
    title: "Pesquisador Titular",
    institution: "LNCC",
    image: renatoPortugal,
    bio: "Renato Portugal é Pesquisador Titular do Laboratório Nacional de Computação Científica (LNCC). É autor de livros sobre computação quântica e caminhadas quânticas, sendo uma referência internacional na área. Suas pesquisas em algoritmos quânticos contribuíram para o avanço da computação quântica no Brasil."
  },
  {
    id: 5,
    name: "Marina Ansanelli",
    title: "PhD Student",
    institution: "Perimeter Institute",
    image: MarinaAnsanelli,
    bio: "Pesquisadora em Fundamentos Quânticos e Inferência Causal. Recebedora do Emmy Noether Emerging Talent Fund.",
  },
  {
    id: 6,
    name: "Marina Ansanelli",
    title: "PhD Student",
    institution: "Perimeter Institute",
    image: FedericoHolik,
    bio: "Pesquisadora em Fundamentos Quânticos e Inferência Causal. Recebedora do Emmy Noether Emerging Talent Fund.",
  },
  {
    id: 7,
    name: "Daniel Haro",
    title: "Chefe de Tecnologias Emergentes",
    institution: "Venturus",
    image: DanielHaro,
    bio: "Líder de Tecnologias Emergentes no Venturus. Foca na preparação de empresas para a era quântica (Quantum Readiness) e na construção de pontes entre a investigação científica e o mercado.",
  }
];

const QuasarSpeakers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % speakers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + speakers.length) % speakers.length);
  };

  return (
    <section id="palestrantes" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-light text-foreground text-center mb-16">
          Palestrantes Confirmados
        </h2>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {speakers.map((speaker) => (
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
                {speaker.title}
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
              {speakers.map((speaker) => (
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
                      {speaker.title}
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
              {speakers.map((_, idx) => (
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
                    {selectedSpeaker.title}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {selectedSpeaker.institution}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedSpeaker.bio}
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
