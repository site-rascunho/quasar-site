import React from 'react';

const QuasarAbout = () => {
  return (
    <section id="sobre" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-justify">
          <h2 className="text-3xl md:text-4xl font-light text-foreground text-center mb-8">
            Sobre o Evento
          </h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              O II Encontro Quasar será realizado em João Pessoa (PB), na Universidade Federal da Paraíba (UFPB). 
              Nesta segunda edição, o evento consolida o Encontro Quasar como um espaço de formação, debate técnico 
              e articulação científica em tecnologias quânticas, acompanhando a rápida expansão da área no cenário 
              nacional e internacional e conectando pesquisa, capacitação e construção de redes.
            </p>
            <p>
              Esta edição se insere diretamente no fortalecimento do ecossistema local de computação quântica, 
              em diálogo com iniciativas estratégicas como o CIQUANTA (International Centre for Quantum Computing), 
              que vem impulsionando infraestrutura, colaboração e visibilidade internacional para a pesquisa na Paraíba. 
              No mesmo espírito, o evento também se articula com a Liga de Computação Quântica (Liga), ampliando o 
              engajamento de estudantes e jovens pesquisadores, organizando trilhas de aprendizagem, atividades 
              formativas e espaços de participação ativa ao longo da programação.
            </p>
            <p>
              A realização do II Encontro Quasar é resultado direto da experiência bem-sucedida da primeira edição, 
              que aproximou pesquisadores, estudantes e profissionais de diferentes instituições e áreas relacionadas 
              às tecnologias quânticas. A partir desse legado, o evento amplia seu escopo ao reunir temas atuais, 
              abordagens interdisciplinares e discussões que conectam fundamentos teóricos, métodos de implementação, 
              software e aplicações práticas, com foco em desafios reais de pesquisa e desenvolvimento.
            </p>
            <p>
              Ao dar continuidade a essa trajetória, o II Encontro Quasar fortalece a integração entre grupos de 
              pesquisa, estimula a produção científica e a formação avançada (incluindo projetos de pós-doutorado, 
              artigos e trabalhos de conclusão), e amplia o interesse da comunidade acadêmica e do público em geral 
              por tecnologias quânticas. Com isso, contribui de forma concreta para a consolidação de João Pessoa 
              como um polo nacional de referência na área, alinhado às novas oportunidades de cooperação científica 
              e inovação.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuasarAbout;