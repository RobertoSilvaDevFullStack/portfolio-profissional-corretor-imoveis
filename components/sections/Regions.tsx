import { Section } from "@/components/layout/Section";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LogoCarousel } from "@/components/ui/LogoCarousel";

const regions = [
  {
    name: "Zona Norte",
    slug: "zona-norte",
    areas: ["Santana", "Tucuruvi"],
    gradient: "from-blue-900/80",
  },
  {
    name: "Zona Sul",
    slug: "zona-sul",
    areas: ["Sto Amaro", "Interlagos"],
    gradient: "from-slate-900/80",
  },
  {
    name: "Zona Leste",
    slug: "zona-leste",
    areas: ["Tatuapé", "Itaquera"],
    gradient: "from-blue-900/80",
  },
  {
    name: "Zona Oeste",
    slug: "zona-oeste",
    areas: ["Barra Funda", "Lapa"],
    gradient: "from-slate-900/80",
  },
];

export function Regions() {
  return (
    <Section variant="alternate" id="regions">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between mb-12">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Regiões Atendidas
          </h2>
          <p className="mt-4 text-slate-500">
            Encontre o imóvel ideal perto do seu trabalho ou da sua família.
          </p>
        </div>
        <Link
          href="/imoveis"
          className="group flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800"
        >
          Ver todos os imóveis
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {regions.map((region, index) => (
          <Link
            key={index}
            href={`/imoveis?region=${region.slug}`}
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-800 cursor-pointer block"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-t ${region.gradient} via-transparent to-transparent transition-opacity z-10`}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 transition-transform duration-500 group-hover:scale-105" />

            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <div className="mb-2 flex gap-2">
                {region.areas.map((area, i) => (
                  <span
                    key={i}
                    className="inline-block rounded bg-white/20 px-2 py-0.5 text-[10px] uppercase font-bold text-white backdrop-blur-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                {region.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      <LogoCarousel />
    </Section>
  );
}
