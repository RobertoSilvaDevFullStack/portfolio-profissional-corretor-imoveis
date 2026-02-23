import { prisma } from "@/lib/prisma";
import ProjectForm from "@/components/admin/ProjectForm";
import { notFound } from "next/navigation";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [project, regions, constructors] = await Promise.all([
    prisma.project.findUnique({
      where: { id },
      include: {
        images: { orderBy: { order: "asc" } },
        floorPlans: { orderBy: { order: "asc" } },
        files: true,
        typologies: true,
      },
    }),
    prisma.region.findMany({ orderBy: { name: "asc" } }),
    prisma.constructor.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <ProjectForm
      initialData={project}
      regions={regions}
      constructors={constructors}
    />
  );
}
