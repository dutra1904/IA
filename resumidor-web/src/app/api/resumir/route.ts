import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { config } from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getAvailableModels } from "@/lib/gemini";

if (!process.env.GEMINI_API_KEY) {
  config({ path: path.resolve(process.cwd(), "..", ".env") });
}

type Lang = "pt" | "en";

const PROMPTS: Record<Lang, Record<string, string>> = {
  pt: {
    paragrafos:
      "Resuma o seguinte texto em até 3 parágrafos, mantendo os pontos principais. Use linguagem clara e objetiva. Responda em português.",
    bullet:
      "Resuma o seguinte texto em bullet points (lista com •), com no máximo 5 tópicos. Seja conciso e destaque apenas o essencial. Responda em português.",
    executivo:
      "Gere um resumo executivo (2-3 frases) do texto abaixo. Foque nos pontos mais importantes para decisão rápida. Responda em português.",
  },
  en: {
    paragrafos:
      "Summarize the following text in up to 3 paragraphs, keeping the main points. Use clear and objective language. Respond in English.",
    bullet:
      "Summarize the following text in bullet points (list with •), with at most 5 topics. Be concise and highlight only the essential. Respond in English.",
    executivo:
      "Generate an executive summary (2-3 sentences) of the text below. Focus on the most important points for quick decision-making. Respond in English.",
  },
};

export async function POST(request: NextRequest) {
  try {
    const { texto, estilo = "paragrafos", idioma = "pt" } = await request.json();

    if (!texto || typeof texto !== "string") {
      return NextResponse.json(
        { erro: idioma === "en" ? "Text is required" : "Texto é obrigatório" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { erro: "API key not configured" },
        { status: 500 }
      );
    }

    const modelName =
      process.env.GEMINI_MODEL ||
      (await getAvailableModels(apiKey))[0];

    if (!modelName) {
      return NextResponse.json(
        { erro: "No models available" },
        { status: 500 }
      );
    }

    const lang = idioma === "en" ? "en" : "pt";
    const promptBase = PROMPTS[lang][estilo] ?? PROMPTS[lang].paragrafos;
    const prompt = `${promptBase}\n\nTEXTO:\n${texto}`;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(prompt);
    const resumo = result.response?.text?.() ?? "";

    if (!resumo) {
      throw new Error("Empty Gemini response");
    }

    return NextResponse.json({ resumo });
  } catch (error) {
    console.error("Erro ao resumir:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    const isDev = process.env.NODE_ENV === "development";
    return NextResponse.json(
      { erro: isDev ? msg : "Error generating summary" },
      { status: 500 }
    );
  }
}
