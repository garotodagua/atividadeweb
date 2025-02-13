import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Criar um novo aluno (POST)
export async function POST(req: Request) {
  try {
    const { nome, email, matricula } = await req.json();

    if (!nome || !email || !matricula) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
    }

    const novoAluno = await prisma.aluno.create({
      data: { nome, email, matricula },
    });

    return NextResponse.json(novoAluno, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar aluno" }, { status: 500 });
  }
}

// Listar todos os alunos (GET)
export async function GET() {
  try {
    const alunos = await prisma.aluno.findMany();
    return NextResponse.json(alunos, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar alunos" }, { status: 500 });
  }
}
