import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { config } from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getAvailableModels } from "@/lib/gemini";
import { MAX_CHARS, MIN_CHARS, type Estilo, type Lang } from "@/lib/types";

if (!process.env.GEMINI_API_KEY) {
  config({ path: path.resolve(process.cwd(), "..", ".env") });
}

const ESTILOS_VALIDOS: Estilo[] = ["paragrafos", "bullet", "executivo"];

const SYSTEM: Record<Lang, string> = {
  pt: `Você é um editor sênior. Produza resumos fiéis ao texto-fonte.

Regras:
- Não invente fatos, nomes, números, datas ou conclusões.
- Preserve nomes próprios e cifras.
- Não escreva preâmbulo, título extra nem fechamento.
- Responda apenas com o resumo, em português.`,
  en: `You are a senior editor. Produce summaries that stay faithful to the source.

Rules:
- Do not invent facts, names, numbers, dates, or conclusions.
- Preserve proper nouns and figures.
- Do not add a preamble, extra title, or closing remark.
- Reply with the summary only, in English.`,
};

const FORMATOS: Record<Lang, Record<Estilo, string>> = {
  pt: {
    paragrafos:
      "Formato: até 3 parágrafos curtos, linguagem clara e objetiva, tom editorial.",
    bullet:
      "Formato: no máximo 5 tópicos iniciados por •. Uma ideia por linha, sem frases longas.",
    executivo:
      "Formato: resumo executivo em 2 ou 3 frases, focado no que importa para uma decisão rápida.",
  },
  en: {
    paragrafos:
      "Format: up to 3 short paragraphs, clear and objective, editorial tone.",
    bullet:
      "Format: at most 5 bullet points starting with •. One idea per line, no long sentences.",
    executivo:
      "Format: executive summary in 2 or 3 sentences, focused on what matters for a quick decision.",
  },
};

function mensagemErro(lang: Lang, chave: "required" | "short" | "long" | "key" | "model" | "empty" | "generic") {
  const mapa = {
    pt: {
      required: "Texto é obrigatório",
      short: "O texto é curto demais para resumir",
      long: "O texto ultrapassa o limite de 12.000 caracteres",
      key: "API key não configurada",
      model: "Nenhum modelo disponível",
      empty: "A IA devolveu uma resposta vazia",
      generic: "Erro ao gerar o resumo",
    },
    en: {
      required: "Text is required",
      short: "The text is too short to summarize",
      long: "The text exceeds the 12,000-character limit",
      key: "API key is not configured",
      model: "No models available",
      empty: "The model returned an empty response",
      generic: "Error generating the summary",
    },
  };
  return mapa[lang][chave];
}

export async function POST(request: NextRequest) {
  let idioma: Lang = "pt";

  try {
    let body: { texto?: unknown; estilo?: unknown; idioma?: unknown };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ erro: mensagemErro("pt", "required") }, { status: 400 });
    }

    idioma = body.idioma === "en" ? "en" : "pt";
    const estilo: Estilo = ESTILOS_VALIDOS.includes(body.estilo as Estilo)
      ? (body.estilo as Estilo)
      : "paragrafos";

    if (!body.texto || typeof body.texto !== "string") {
      return NextResponse.json({ erro: mensagemErro(idioma, "required") }, { status: 400 });
    }

    const texto = body.texto.trim();
    if (texto.length < MIN_CHARS) {
      return NextResponse.json({ erro: mensagemErro(idioma, "short") }, { status: 400 });
    }
    if (texto.length > MAX_CHARS) {
      return NextResponse.json({ erro: mensagemErro(idioma, "long") }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ erro: mensagemErro(idioma, "key") }, { status: 500 });
    }

    const modelName = process.env.GEMINI_MODEL || (await getAvailableModels(apiKey))[0];
    if (!modelName) {
      return NextResponse.json({ erro: mensagemErro(idioma, "model") }, { status: 500 });
    }

    const prompt = `${FORMATOS[idioma][estilo]}\n\nTEXTO:\n${texto}`;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: SYSTEM[idioma],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 1024,
      },
    });

    const result = await model.generateContent(prompt);
    const resumo = result.response?.text?.()?.trim() ?? "";

    if (!resumo) {
      throw new Error(mensagemErro(idioma, "empty"));
    }

    return NextResponse.json({ resumo });
  } catch (error) {
    console.error("Erro ao resumir:", error);
    const isDev = process.env.NODE_ENV === "development";
    const msg = error instanceof Error ? error.message : mensagemErro(idioma, "generic");
    return NextResponse.json(
      { erro: isDev ? msg : mensagemErro(idioma, "generic") },
      { status: 500 }
    );
  }
}
