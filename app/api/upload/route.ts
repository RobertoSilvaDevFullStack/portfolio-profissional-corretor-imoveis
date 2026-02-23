import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedFromRequest } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
const ALLOWED_FILE_TYPES = [...ALLOWED_IMAGE_TYPES, "application/pdf"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function generateFileName(originalName: string): string {
  const ext = path.extname(originalName);
  const baseName = path
    .basename(originalName, ext)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 50);
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${baseName}-${timestamp}-${random}${ext.toLowerCase()}`;
}

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticatedFromRequest(request);
    if (!authenticated) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const category = (formData.get("category") as string) || "general";

    if (!files.length) {
      return NextResponse.json(
        { error: "Nenhum arquivo enviado" },
        { status: 400 },
      );
    }

    // Create category subdirectory
    const categoryDir = path.join(UPLOAD_DIR, category);
    await mkdir(categoryDir, { recursive: true });

    const uploaded: { name: string; url: string; type: string }[] = [];

    for (const file of files) {
      // Validate file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        return NextResponse.json(
          {
            error: `Tipo de arquivo não permitido: ${file.type}. Aceito: imagens (JPEG, PNG, WebP) e PDFs`,
          },
          { status: 400 },
        );
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `Arquivo muito grande. Máximo: 10MB` },
          { status: 400 },
        );
      }

      const fileName = generateFileName(file.name);
      const filePath = path.join(categoryDir, fileName);
      const buffer = Buffer.from(await file.arrayBuffer());

      await writeFile(filePath, buffer);

      uploaded.push({
        name: file.name,
        url: `/uploads/${category}/${fileName}`,
        type: file.type,
      });
    }

    return NextResponse.json({
      success: true,
      files: uploaded,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Erro ao fazer upload do arquivo" },
      { status: 500 },
    );
  }
}
