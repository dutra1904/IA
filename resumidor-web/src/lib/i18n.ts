import type { Estilo, Lang } from "./types";

export type { Lang };

type StyleCopy = { label: string; hint: string };

type Dictionary = {
  brand: string;
  badge: string;
  titleBefore: string;
  titleAccent: string;
  titleAfter: string;
  subtitle: string;
  styleLabel: string;
  styles: Record<Estilo, StyleCopy>;
  textLabel: string;
  placeholder: string;
  charCount: string;
  tryExample: string;
  clear: string;
  shortcut: string;
  errorEmpty: string;
  errorShort: string;
  errorLong: string;
  errorGeneric: string;
  btnGenerate: string;
  btnLoading: string;
  btnCancel: string;
  resultTitle: string;
  copy: string;
  copied: string;
  stats: string;
  statsCompact: string;
  footer: string;
};

export const translations: Record<Lang, Dictionary> = {
  pt: {
    brand: "Resumidor",
    badge: "Resumo com Gemini",
    titleBefore: "Resumos que ",
    titleAccent: "vão direto ao ponto",
    titleAfter: "",
    subtitle:
      "Cole um artigo, relatório ou nota. Escolha o formato e receba um resumo fiel aos fatos, sem enrolação.",
    styleLabel: "Formato",
    styles: {
      paragrafos: { label: "Parágrafos", hint: "Até 3 blocos, tom editorial" },
      bullet: { label: "Tópicos", hint: "Cinco pontos essenciais" },
      executivo: { label: "Executivo", hint: "2–3 frases para decidir" },
    },
    textLabel: "Texto original",
    placeholder:
      "Cole aqui o artigo, a ata ou o relatório que precisa resumir…",
    charCount: "{n} / {max} caracteres",
    tryExample: "Usar exemplo",
    clear: "Limpar",
    shortcut: "Ctrl + Enter",
    errorEmpty: "Cole um texto para gerar o resumo.",
    errorShort: "O texto é curto demais para um resumo com qualidade.",
    errorLong: "O texto ultrapassa o limite de 12.000 caracteres.",
    errorGeneric: "Não foi possível gerar o resumo. Tente de novo em instantes.",
    btnGenerate: "Gerar resumo",
    btnLoading: "Analisando o texto…",
    btnCancel: "Cancelar",
    resultTitle: "Resumo",
    copy: "Copiar",
    copied: "Copiado",
    stats: "{from} → {to} palavras · {pct}% mais curto",
    statsCompact: "{from} → {to} palavras",
    footer: "Next.js · Google Gemini · Pronto para o Vercel",
  },
  en: {
    brand: "Summarizer",
    badge: "Gemini-powered",
    titleBefore: "Summaries that ",
    titleAccent: "get to the point",
    titleAfter: "",
    subtitle:
      "Paste an article, report, or note. Pick a format and get a factual summary — no filler.",
    styleLabel: "Format",
    styles: {
      paragrafos: { label: "Paragraphs", hint: "Up to 3 editorial blocks" },
      bullet: { label: "Bullets", hint: "Five essential points" },
      executivo: { label: "Executive", hint: "2–3 sentences to decide" },
    },
    textLabel: "Source text",
    placeholder: "Paste the article, notes, or report you need summarized…",
    charCount: "{n} / {max} characters",
    tryExample: "Use sample",
    clear: "Clear",
    shortcut: "Ctrl + Enter",
    errorEmpty: "Paste some text to generate a summary.",
    errorShort: "The text is too short for a useful summary.",
    errorLong: "The text exceeds the 12,000-character limit.",
    errorGeneric: "Could not generate the summary. Please try again shortly.",
    btnGenerate: "Generate summary",
    btnLoading: "Analyzing the text…",
    btnCancel: "Cancel",
    resultTitle: "Summary",
    copy: "Copy",
    copied: "Copied",
    stats: "{from} → {to} words · {pct}% shorter",
    statsCompact: "{from} → {to} words",
    footer: "Next.js · Google Gemini · Ready for Vercel",
  },
};
