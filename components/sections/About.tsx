import { Section } from "@/components/layout/Section";

export function About() {
  return (
    <Section id="about">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-blue-700">
          Minha História
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Por que faço o que faço
        </h2>

        <div className="mt-8 space-y-6 text-lg text-slate-500 leading-relaxed">
          <p>
            Minha jornada no mercado imobiliário começou com um propósito muito
            claro: ajudar pessoas comuns a conquistarem algo extraordinário — o
            primeiro lar.
          </p>

          <p>
            Durante 6 anos atuei como corretor especializado em imóveis
            econômicos e no programa Minha Casa Minha Vida, acompanhando de
            perto a realidade de famílias que sonhavam com a casa própria, mas
            se sentiam perdidas diante da burocracia, das dúvidas e das
            incertezas. Foi nesse cenário que encontrei minha missão:
            simplificar caminhos, traduzir processos e transformar insegurança
            em confiança.
          </p>

          <blockquote className="border-l-4 border-blue-700 pl-6 italic text-white">
            &ldquo;Mais do que vender imóveis, sempre acreditei em construir
            histórias.&rdquo;
          </blockquote>

          <p>
            Ao longo desses anos, participei de momentos que marcaram minha
            trajetória — chaves entregues, lágrimas de alegria, abraços
            apertados e a certeza de que cada contrato assinado representava
            muito mais do que uma venda: representava conquista, estabilidade e
            recomeço.
          </p>

          <p>
            Por isso, minha atuação sempre foi baseada em transparência,
            orientação clara e acompanhamento próximo em cada etapa da jornada
            do cliente.
          </p>

          <p>
            São Paulo pode ser uma cidade imensa e cheia de possibilidades, mas
            encontrar o imóvel certo exige estratégia, conhecimento e alguém que
            realmente se importe com o seu objetivo. É exatamente isso que
            ofereço: experiência prática, visão de mercado e compromisso real
            com o seu sonho.
          </p>

          <p className="font-medium text-white">
            Hoje, continuo movido pelo mesmo propósito do primeiro dia — ajudar
            pessoas a transformarem o sonho da casa própria em realidade.
          </p>
        </div>
      </div>
    </Section>
  );
}
