"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface JourneyItem {
  year: string;
  title: string;
  description: string;
  image?: string;
}

const journeyItems: JourneyItem[] = [
  {
    year: "2018",
    title: "Primeiro Dia como Corretor",
    description:
      "O início de tudo. Meu primeiro dia atuando como corretor de imóveis, com muita vontade de aprender e ajudar famílias a realizarem seus sonhos.",
    image: "/roberto-no-primeiro-dia-como-corretor.jpeg",
  },
  {
    year: "2019",
    title: "A Primeira Venda",
    description:
      "Após 10 meses de muita dedicação e foco, a emoção indescritível de realizar a minha primeira venda. O sentimento de que eu estava exatamente onde deveria estar.",
    image: "/roberto-apos-a-primeira-venda.jpeg",
  },
  {
    year: "2019",
    title: "A Casa Própria do Casal",
    description:
      "Um momento marcante na vida deste simpático casal, conquistando sua primeira casa própria e iniciando uma grande etapa juntos.",
    image: "/casal-conquista-primeiro-imovel.jpeg",
  },
  {
    year: "2020",
    title: "O Lar dos Noivos",
    description:
      "Mesmo em meio às incertezas da pandemia, conseguimos fechar negócio, trazendo paz para que eles pudessem focar nos planos do casamento.",
    image: "/noivos-compram-imovel-pandemia.jpeg",
  },
  {
    year: "2020",
    title: "Atendimento Sem Fronteiras",
    description:
      "Adaptei todo meu atendimento para o meio digital e as vendas seguiram firmes. A emoção de comprar uma casa continua viva, não importa a barreira.",
    image: "/venda-realizada-casal-pandemia-1.jpeg",
  },
  {
    year: "2021",
    title: "Visão Para Investidores",
    description:
      "Identificamos excelentes oportunidades de investimento mesmo com a economia oscilante, focando em propriedades que garantem rentabilidade contínua.",
    image: "/venda-investidor-pandemia.jpeg",
  },
  {
    year: "2021",
    title: "Campeão de Vendas",
    description:
      "Ser reconhecido como Campeão de Vendas coroa todo esse trabalho e me motiva a ajudar ainda mais pessoas a realizarem a conquista da casa própria de forma segura.",
    image: "/roberto-celebrando-campeao-vendas.jpeg",
  },
  {
    year: "2022",
    title: "O Sonho de Mãe e Filho",
    description:
      "Uma das histórias mais comoventes. Mãe e filho juntos, felizes, recebendo a documentação e as chaves. Esses são os sorrisos que impulsionam meu dia.",
    image: "/mae-e-filho-realizam-sonho-primeiro-imovel.jpeg",
  },
  {
    year: "2023",
    title: "Conquista na Zona Leste",
    description:
      "Mais uma vitória espetacular. Casal celebrando o novo imóvel na região da Zona Leste, em um bairro com excelente infraestrutura e futuro promissor.",
    image: "/casal-conquista-imovel-zona-leste.jpeg",
  },
  {
    year: "2026",
    title: "Estabilidade e Independência",
    description:
      "É extremamente recompensador ver um jovem conquistando seu primeiro apartamento, garantindo estabilidade e independência logo cedo.",
    image: "/jovem-conquista-primeiro-imovel.jpg",
  },
];

export function BookFlip() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const totalPages = journeyItems.length;

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentPage < totalPages - 1) {
        setDirection("next");
        setCurrentPage((prev) => prev + 1);
      } else {
        // Quando chegar ao fim, volta para o início (opcional, ou para a animação)
        setDirection("next");
        setCurrentPage(0);
      }
    }, 5000); // Muda a cada 5 segundos

    return () => clearInterval(interval);
  }, [currentPage, totalPages]);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setDirection("next");
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setDirection("prev");
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[500px] perspective-1000">
      {/* Controls */}
      <div className="absolute -top-16 right-0 flex gap-2 z-20">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="p-2 rounded-full border border-white/20 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Book Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {journeyItems.map((item, index) => {
          // Logic to determine z-index and rotation based on current page
          let zIndex = 0;
          let rotateY = 0;
          let opacity = 1;
          let translateX = 0;

          if (index === currentPage) {
            zIndex = 10;
            rotateY = 0;
            translateX = 0;
          } else if (index < currentPage) {
            zIndex = 5;
            rotateY = -180; // Flipped to left
            opacity = 0;
            translateX = -50;
          } else {
            zIndex = 5 - (index - currentPage);
            rotateY = 0;
            opacity = index === currentPage + 1 ? 0.5 : 0;
            translateX = 20 * (index - currentPage);
          }

          return (
            <div
              key={index}
              className="absolute w-full md:w-[80%] h-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl transition-all duration-1000 ease-in-out transform-style-3d origin-left"
              style={{
                zIndex,
                opacity: index === currentPage ? 1 : opacity,
                transform: `translateX(${translateX}px) rotateY(${rotateY}deg) scale(${
                  index === currentPage ? 1 : 0.9
                })`,
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                {/* Image Side */}
                <div className="relative h-full overflow-hidden bg-slate-800">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-6 left-6 z-20">
                    <span className="inline-block px-4 py-1 rounded-full bg-blue-600/90 text-white font-bold text-sm mb-2 backdrop-blur-sm shadow-lg">
                      {item.year}
                    </span>
                  </div>
                </div>

                {/* Text Side */}
                <div className="p-8 md:p-12 flex flex-col justify-center bg-slate-900 text-white relative">
                  {/* Paper texture overlay */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />

                  <div className="relative z-10">
                    <h3 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                      {item.title}
                    </h3>
                    <p className="text-lg text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="absolute bottom-6 right-6 text-slate-600 text-sm font-mono">
                    Página {index + 1} de {totalPages}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
