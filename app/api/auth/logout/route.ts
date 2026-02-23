import { NextResponse } from "next/server";
import { destroyAdminSession } from "@/lib/auth";

export async function POST() {
  try {
    await destroyAdminSession();
    return NextResponse.json({
      success: true,
      message: "Logout realizado com sucesso",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
