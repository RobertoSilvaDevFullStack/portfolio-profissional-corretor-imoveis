import { prisma } from "@/lib/prisma";
import { ProjectCard } from "@/components/projects/ProjectCard";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const dynamic = "force-dynamic";

export default async function ProjectsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const regionSlug =
    typeof params.region === "string" ? params.region : undefined;

  // Build query filter
  const where: any = { published: true };
  if (regionSlug) {
    where.region = { slug: regionSlug };
  }

  // Fetch data
  const [projects, regions] = await Promise.all([
    prisma.project.findMany({
      where,
      include: {
        region: true,
        constructor: true,
        images: { where: { isHero: true }, take: 1 },
      },
      orderBy: { featured: "desc" },
    }),
    prisma.region.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { projects: true } } },
    }),
  ]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl font-serif">
            Nossos Empreendimentos
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Encontre o imóvel ideal nas melhores regiões, com a qualidade das
            principais construtoras do mercado.
          </p>
        </div>

        {/* Region Filter Tabs */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          <Link
            href="/imoveis"
            className={cn(
              "rounded-full px-6 py-2 text-sm font-medium transition-all shadow-sm",
              !regionSlug
                ? "bg-blue-700 text-white shadow-md ring-2 ring-blue-700 ring-offset-2"
                : "bg-white text-slate-600 hover:bg-slate-100",
            )}
          >
            Todos
          </Link>
          {regions.map((region: any) => (
            <Link
              key={region.id}
              href={`/imoveis?region=${region.slug}`}
              className={cn(
                "rounded-full px-6 py-2 text-sm font-medium transition-all shadow-sm",
                regionSlug === region.slug
                  ? "bg-blue-700 text-white shadow-md ring-2 ring-blue-700 ring-offset-2"
                  : "bg-white text-slate-600 hover:bg-slate-100",
              )}
            >
              {region.name} ({region._count.projects})
            </Link>
          ))}
        </div>

        {/* Project Grid */}
        {projects.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project: any) => (
              <ProjectCard key={project.id} project={project as any} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="mx-auto h-16 w-16 text-slate-300 mb-4">
              {/* Icon placeholder */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-900">
              Nenhum imóvel encontrado
            </h3>
            <p className="text-slate-500 mt-2">
              Tente selecionar outra região ou volte mais tarde.
            </p>
            <Link href="/imoveis" className="mt-6 inline-block">
              <Button variant="outline">Limpar Filtros</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
