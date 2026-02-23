import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticatedFromRequest } from "@/lib/auth";

// GET /api/projects — List projects with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get("region");
    const status = searchParams.get("status");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = { published: true };

    if (region) where.region = { slug: region };
    if (status) where.status = status;
    if (featured === "true") where.featured = true;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { neighborhood: { contains: search, mode: "insensitive" } },
        { address: { contains: search, mode: "insensitive" } },
      ];
    }

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        include: {
          region: { select: { id: true, name: true, slug: true } },
          constructor: {
            select: { id: true, name: true, slug: true, logoUrl: true },
          },
          images: {
            where: { isHero: true },
            take: 1,
            orderBy: { order: "asc" },
          },
        },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        skip,
        take: limit,
      }),
      prisma.project.count({ where }),
    ]);

    return NextResponse.json({
      projects,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Erro ao buscar projetos" },
      { status: 500 },
    );
  }
}

// POST /api/projects — Create a new project
export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticatedFromRequest(request);
    if (!authenticated) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();

    // Generate slug from name
    const slug = body.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    // Check slug uniqueness
    const existing = await prisma.project.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: "Já existe um projeto com este nome" },
        { status: 409 },
      );
    }

    const { images, floorPlans, files, typologies, ...projectData } = body;

    const project = await prisma.project.create({
      data: {
        ...projectData,
        slug,
        condoFeatures: projectData.condoFeatures || [],
        unitFeatures: projectData.unitFeatures || [],
        launchDate: projectData.launchDate
          ? new Date(projectData.launchDate)
          : null,
        deliveryDate: projectData.deliveryDate
          ? new Date(projectData.deliveryDate)
          : null,
        images: images?.length ? { create: images } : undefined,
        floorPlans: floorPlans?.length ? { create: floorPlans } : undefined,
        files: files?.length ? { create: files } : undefined,
        typologies: typologies?.length ? { create: typologies } : undefined,
      },
      include: {
        region: true,
        constructor: true,
        images: true,
        floorPlans: true,
        files: true,
        typologies: true,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Erro ao criar projeto" },
      { status: 500 },
    );
  }
}
