import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticatedFromRequest } from "@/lib/auth";

// GET /api/constructors — List all constructors
export async function GET() {
  try {
    const constructors = await prisma.constructor.findMany({
      include: {
        _count: { select: { projects: true } },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(constructors);
  } catch (error) {
    console.error("Error fetching constructors:", error);
    return NextResponse.json(
      { error: "Erro ao buscar construtoras" },
      { status: 500 },
    );
  }
}

// POST /api/constructors — Create or update a constructor
export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticatedFromRequest(request);
    if (!authenticated) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { id, name, logoUrl, phone, email } = body;

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
      const constructor = await prisma.constructor.update({
        where: { id },
        data: { name, slug, logoUrl, phone, email },
      });
      return NextResponse.json(constructor);
    }

    const constructor = await prisma.constructor.create({
      data: { name, slug, logoUrl, phone, email },
    });

    return NextResponse.json(constructor, { status: 201 });
  } catch (error) {
    console.error("Error creating/updating constructor:", error);
    return NextResponse.json(
      { error: "Erro ao salvar construtora" },
      { status: 500 },
    );
  }
}
