import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Resumidor IA - Resuma artigos com inteligência artificial",
  description: "Cole seu texto e a IA gerará um resumo em segundos. Parágrafos, bullet points ou resumo executivo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
