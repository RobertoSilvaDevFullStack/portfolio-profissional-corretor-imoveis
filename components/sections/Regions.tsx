import { Section } from "@/components/layout/Section";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LogoCarousel } from "@/components/ui/LogoCarousel";
import { prisma } from "@/lib/prisma";
import { RegionCard } from "@/components/ui/RegionCard";

export async function Regions() {
  const regions = await prisma.region.findMany({
    include: {
      projects: {
        select: {
          id: true,
          slug: true,
          name: true,
          neighborhood: true,
          images: {
            where: { isHero: true },
            take: 1,
            select: { url: true },
          },
        },
        take: 5, // Pegar até 5 projetos para ter variedade no slideshow
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  // Mapeia gradientes para dar variedade visual (fallback se não tiver imagem)
  const gradients = [
    "from-blue-900/80",
    "from-slate-900/80",
    "from-indigo-900/80",
    "from-gray-900/80",
  ];

  return (
    <Section variant="alternate" id="regions">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between mb-12">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Regiões Atendidas
          </h2>
          <p className="mt-4 text-slate-600">
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
        {regions.length > 0 ? (
          regions.map((region, index) => {
            const gradient = gradients[index % gradients.length];
            // Preparar dados para o componente cliente
            const projectsWithImages = region.projects
              .filter((p) => p.images.length > 0)
              .map((p) => ({
                slug: p.slug,
                imageUrl: p.images[0].url,
              }));

            // Bairros únicos para exibir nas tags
            const uniqueNeighborhoods = Array.from(
              new Set(region.projects.map((p) => p.neighborhood)),
            ).slice(0, 3);

            return (
              <RegionCard
                key={region.id}
                name={region.name}
                slug={region.slug}
                description={region.description}
                areas={uniqueNeighborhoods}
                gradient={gradient}
                fallbackImageUrl={region.imageUrl}
                projectImages={projectsWithImages}
              />
            );
          })
        ) : (
          <div className="col-span-full py-12 text-center text-slate-600">
            Nenhuma região cadastrada no momento.
          </div>
        )}
      </div>

      <LogoCarousel />
    </Section>
  );
}
