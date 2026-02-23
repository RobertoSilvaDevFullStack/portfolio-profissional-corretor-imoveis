import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticatedFromRequest } from "@/lib/auth";

// GET /api/regions — List all regions with project count
export async function GET() {
  try {
    const regions = await prisma.region.findMany({
      include: {
        _count: { select: { projects: true } },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(regions);
  } catch (error) {
    console.error("Error fetching regions:", error);
    return NextResponse.json(
      { error: "Erro ao buscar regiões" },
      { status: 500 },
    );
  }
}

// POST /api/regions — Create or update a region
export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticatedFromRequest(request);
    if (!authenticated) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { id, name, description, imageUrl } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Nome é obrigatório" },
        { status: 400 },
      );
    }

    const slug = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    if (id) {
      const region = await prisma.region.update({
        where: { id },
        data: { name, slug, description, imageUrl },
      });
      return NextResponse.json(region);
    }

    const region = await prisma.region.create({
      data: { name, slug, description, imageUrl },
    });

    return NextResponse.json(region, { status: 201 });
  } catch (error) {
    console.error("Error creating/updating region:", error);
    return NextResponse.json(
      { error: "Erro ao salvar região" },
      { status: 500 },
    );
  }
}
