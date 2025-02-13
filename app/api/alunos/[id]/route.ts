import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { NextRequest } from "next/server";

const prisma = new PrismaClient();

// Buscar um aluno pelo ID (GET)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const aluno = await prisma.aluno.findUnique({
      where: { id: Number(params.id) },
    });

    if (!aluno) {
      return NextResponse.json({ error: "Aluno não encontrado" }, { status: 404 });
    }

    return NextResponse.json(aluno, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar aluno" }, { status: 500 });
  }
}
