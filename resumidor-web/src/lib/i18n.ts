export type Lang = "pt" | "en";

export const translations = {
  pt: {
    title: "Resumidor IA",
    subtitle: "Cole um texto e a IA gerará um resumo em segundos",
    styleLabel: "Estilo do resumo",
    styles: {
      paragrafos: "Parágrafos (até 3)",
      bullet: "Bullet points (5 itens)",
      executivo: "Resumo executivo",
    },
    textLabel: "Texto para resumir",
    placeholder: "Cole aqui o artigo, notícia ou qualquer texto que deseja resumir...",
    errorEmpty: "Digite ou cole um texto para resumir.",
    errorGeneric: "Erro ao gerar resumo.",
    btnGenerate: "Gerar resumo",
    btnLoading: "Gerando resumo...",
    resultTitle: "Resumo",
    footer: "Powered by Google Gemini • Deploy no Vercel",
  },
  en: {
    title: "AI Summarizer",
    subtitle: "Paste text and AI will generate a summary in seconds",
    styleLabel: "Summary style",
    styles: {
      paragrafos: "Paragraphs (up to 3)",
      bullet: "Bullet points (5 items)",
      executivo: "Executive summary",
    },
    textLabel: "Text to summarize",
    placeholder: "Paste your article, news or any text you want to summarize here...",
    errorEmpty: "Type or paste text to summarize.",
    errorGeneric: "Error generating summary.",
    btnGenerate: "Generate summary",
    btnLoading: "Generating summary...",
    resultTitle: "Summary",
    footer: "Powered by Google Gemini • Deploy on Vercel",
  },
} as const;
