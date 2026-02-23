import { NextResponse } from "next/server";
import { createAdminSession, getAdminPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: "Senha é obrigatória" },
        { status: 400 },
      );
    }

    const adminPassword = getAdminPassword();

    if (password !== adminPassword) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
    }

    await createAdminSession();

    return NextResponse.json({
      success: true,
      message: "Login realizado com sucesso",
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
