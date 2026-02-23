import { prisma } from "@/lib/prisma";
import ProjectForm from "@/components/admin/ProjectForm";

export default async function NewProjectPage() {
  const [regions, constructors] = await Promise.all([
    prisma.region.findMany({ orderBy: { name: "asc" } }),
    prisma.constructor.findMany({ orderBy: { name: "asc" } }),
  ]);

  return <ProjectForm regions={regions} constructors={constructors} />;
}
