import { Section } from "@/components/layout/Section";
import { Eye, Heart, Zap } from "lucide-react";

const pillars = [
  {
    title: "Transparência Total",
    description:
      "Nenhuma pergunta fica sem resposta. Explico cada cláusula do contrato, cada taxa e cada etapa do financiamento. Sem surpresas no final.",
    icon: Eye,
  },
  {
    title: "Empatia Humana",
    description:
      "Sei que é o investimento da sua vida. Respeito seu tempo, suas dúvidas e seus medos. O atendimento é no seu ritmo, não no meu.",
    icon: Heart,
  },
  {
    title: "Agilidade e Foco",
    description:
      "Conheço os atalhos da burocracia bancária. Trabalho para que sua aprovação seja rápida e você pegue as chaves o quanto antes.",
    icon: Zap,
  },
];

export function Pillars() {
  return (
    <Section id="services">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Pilares do Meu Trabalho
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-500">
          Não vendo apenas imóveis, construo relacionamentos baseados em três
          princípios fundamentais que garantem a segurança do seu investimento.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {pillars.map((pillar, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition-colors group-hover:bg-blue-700 group-hover:text-white">
              <pillar.icon className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-slate-900">
              {pillar.title}
            </h3>
            <p className="text-slate-500 leading-relaxed">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
