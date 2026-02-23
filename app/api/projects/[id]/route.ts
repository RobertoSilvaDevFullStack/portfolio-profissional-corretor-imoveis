import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticatedFromRequest } from "@/lib/auth";

type RouteParams = { params: Promise<{ id: string }> };

// GET /api/projects/[id] — Get project detail by ID or slug
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const project = await prisma.project.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        region: true,
        constructor: true,
        images: { orderBy: { order: "asc" } },
        floorPlans: { orderBy: { order: "asc" } },
        files: true,
        typologies: true,
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Projeto não encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Erro ao buscar projeto" },
      { status: 500 },
    );
  }
}

// PUT /api/projects/[id] — Update a project
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const authenticated = await isAuthenticatedFromRequest(request);
    if (!authenticated) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const {
      images,
      floorPlans,
      files,
      typologies,
      region,
      constructor: _constructor,
      ...projectData
    } = body;

    // Delete existing nested records if new ones provided
    if (images) {
      await prisma.projectImage.deleteMany({ where: { projectId: id } });
    }
    if (floorPlans) {
      await prisma.floorPlan.deleteMany({ where: { projectId: id } });
    }
    if (files) {
      await prisma.projectFile.deleteMany({ where: { projectId: id } });
    }
    if (typologies) {
      await prisma.typology.deleteMany({ where: { projectId: id } });
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...projectData,
        condoFeatures: projectData.condoFeatures || undefined,
        unitFeatures: projectData.unitFeatures || undefined,
        launchDate: projectData.launchDate
          ? new Date(projectData.launchDate)
          : undefined,
        deliveryDate: projectData.deliveryDate
          ? new Date(projectData.deliveryDate)
          : undefined,
        images: images?.length ? { create: images } : undefined,
        floorPlans: floorPlans?.length ? { create: floorPlans } : undefined,
        files: files?.length ? { create: files } : undefined,
        typologies: typologies?.length ? { create: typologies } : undefined,
      },
      include: {
        region: true,
        constructor: true,
        images: { orderBy: { order: "asc" } },
        floorPlans: { orderBy: { order: "asc" } },
        files: true,
        typologies: true,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar projeto" },
      { status: 500 },
    );
  }
}

// DELETE /api/projects/[id] — Delete a project
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const authenticated = await isAuthenticatedFromRequest(request);
    if (!authenticated) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.project.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Projeto deletado" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Erro ao deletar projeto" },
      { status: 500 },
    );
  }
}
