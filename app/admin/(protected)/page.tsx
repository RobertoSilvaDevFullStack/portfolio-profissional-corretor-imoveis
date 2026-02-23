import { prisma } from "@/lib/prisma";
import {
  LayoutDashboard,
  Building2,
  MapPin,
  HardHat,
  FileText,
} from "lucide-react";

async function getStats() {
  const [projects, regions, constructors, publishedProjects] =
    await Promise.all([
      prisma.project.count(),
      prisma.region.count(),
      prisma.constructor.count(),
      prisma.project.count({ where: { published: true } }),
    ]);

  return { projects, regions, constructors, publishedProjects };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-2">
          Bem-vindo ao painel administrativo do seu portfólio.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total de Projetos"
          value={stats.projects}
          icon={Building2}
          color="text-blue-600"
          bg="bg-blue-100"
        />
        <StatsCard
          title="Projetos Publicados"
          value={stats.publishedProjects}
          icon={FileText}
          color="text-green-600"
          bg="bg-green-100"
        />
        <StatsCard
          title="Regiões"
          value={stats.regions}
          icon={MapPin}
          color="text-purple-600"
          bg="bg-purple-100"
        />
        <StatsCard
          title="Construtoras"
          value={stats.constructors}
          icon={HardHat}
          color="text-orange-600"
          bg="bg-orange-100"
        />
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon: Icon, color, bg }: any) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100 transition-all hover:shadow-md">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-lg ${bg}`}
        >
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
