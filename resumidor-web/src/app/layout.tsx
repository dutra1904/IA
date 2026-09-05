import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Resumidor — resumos fiéis em segundos",
  description:
    "Cole um artigo, relatório ou nota e gere um resumo em parágrafos, tópicos ou formato executivo. Powered by Google Gemini.",
  keywords: ["resumo", "IA", "Gemini", "summarizer", "artigos"],
  openGraph: {
    title: "Resumidor — resumos fiéis em segundos",
    description:
      "Ferramenta de resumo com formatos editorial, tópicos e executivo.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
