import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const prompts: Record<string, string> = {
  paragrafos: `Resuma o seguinte texto em até 3 parágrafos, mantendo os pontos principais.
Use linguagem clara e objetiva.`,
  bullet: `Resuma o seguinte texto em bullet points (lista com •), com no máximo 5 tópicos.
Seja conciso e destaque apenas o essencial.`,
  executivo: `Gere um resumo executivo (2-3 frases) do texto abaixo.
Foque nos pontos mais importantes para decisão rápida.`,
};

export async function POST(request: NextRequest) {
  try {
    const { texto, estilo = "paragrafos" } = await request.json();

    if (!texto || typeof texto !== "string") {
      return NextResponse.json(
        { erro: "Texto é obrigatório" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { erro: "API key não configurada" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const promptBase = prompts[estilo] || prompts.paragrafos;
    const prompt = `${promptBase}\n\nTEXTO:\n${texto}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const resumo = response.text();

    return NextResponse.json({ resumo });
  } catch (error) {
    console.error("Erro ao resumir:", error);
    return NextResponse.json(
      { erro: "Erro ao gerar resumo. Tente novamente." },
      { status: 500 }
    );
  }
}
