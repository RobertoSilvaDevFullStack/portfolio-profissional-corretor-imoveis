import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const journeyItems = [
  {
    year: "2018",
    title: "O Início da Jornada",
    description:
      "Meu primeiro dia no escritório. Muita vontade de aprender e um caderno cheio de anotações sobre financiamento habitacional.",
  },
  {
    year: "2019",
    title: "A Primeira Entrega",
    description:
      "A emoção de entregar as chaves para a Dona Maria, minha primeira cliente do Minha Casa Minha Vida. Um momento inesquecível.",
  },
  {
    year: "2021",
    title: "Superando a Pandemia",
    description:
      "Mesmo nos tempos difíceis, adaptamos o atendimento digital e garantimos que 45 famílias não perdessem seus contratos.",
  },
];

export function Journey() {
  return (
    <Section variant="dark">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Minha Jornada em Imagens
          </h2>
          <p className="mt-4 text-blue-200">
            Momentos que definiram minha carreira e as vidas que ajudei a
            transformar.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            className="bg-blue-600 text-white hover:bg-blue-500"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {journeyItems.map((item, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl bg-blue-900/50 border border-blue-800/30"
          >
            <div className="aspect-video w-full overflow-hidden">
              <div className="bg-gradient-to-br from-blue-800 to-slate-900 w-full h-full flex items-center justify-center text-blue-500">
                <span className="text-xs uppercase tracking-widest font-semibold">
                  Imagem {item.year}
                </span>
              </div>
            </div>
            <div className="p-6">
              <span className="inline-block rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-300 mb-3">
                {item.year}
              </span>
              <h3 className="mb-2 text-xl font-bold text-white">
                {item.title}
              </h3>
              <p className="text-sm text-blue-200/70 line-clamp-3">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
