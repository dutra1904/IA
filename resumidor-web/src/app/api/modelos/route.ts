import { NextResponse } from "next/server";
import path from "path";
import { config } from "dotenv";
import { getAvailableModels } from "@/lib/gemini";

if (!process.env.GEMINI_API_KEY) {
  config({ path: path.resolve(process.cwd(), "..", ".env") });
}

export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ erro: "API key não configurada" }, { status: 500 });
  }

  try {
    const modelos = await getAvailableModels(apiKey);
    return NextResponse.json({ modelos });
  } catch (error) {
    console.error("Erro:", error);
    return NextResponse.json(
      { erro: "Erro ao listar modelos" },
      { status: 500 }
    );
  }
}
