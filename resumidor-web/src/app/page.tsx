"use client";

import { useState } from "react";

type Estilo = "paragrafos" | "bullet" | "executivo";

const ESTILOS: { value: Estilo; label: string }[] = [
  { value: "paragrafos", label: "Parágrafos (até 3)" },
  { value: "bullet", label: "Bullet points (5 itens)" },
  { value: "executivo", label: "Resumo executivo" },
];

export default function Home() {
  const [texto, setTexto] = useState("");
  const [estilo, setEstilo] = useState<Estilo>("paragrafos");
  const [resumo, setResumo] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setResumo("");

    const textoTripado = texto.trim();
    if (!textoTripado) {
      setErro("Digite ou cole um texto para resumir.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/resumir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto: textoTripado, estilo }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.erro || "Erro ao gerar resumo");
      }

      setResumo(data.resumo);
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao gerar resumo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          Resumidor IA
        </h1>
        <p className="text-zinc-400 text-lg">
          Cole um texto e a IA gerará um resumo em segundos
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="estilo"
            className="block text-sm font-medium text-zinc-300 mb-2"
          >
            Estilo do resumo
          </label>
          <div className="flex flex-wrap gap-3">
            {ESTILOS.map((op) => (
              <label
                key={op.value}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="estilo"
                  value={op.value}
                  checked={estilo === op.value}
                  onChange={(e) => setEstilo(e.target.value as Estilo)}
                  className="w-4 h-4 accent-indigo-500"
                />
                <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                  {op.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="texto"
            className="block text-sm font-medium text-zinc-300 mb-2"
          >
            Texto para resumir
          </label>
          <textarea
            id="texto"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Cole aqui o artigo, notícia ou qualquer texto que deseja resumir..."
            rows={8}
            className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-zinc-700/50 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all resize-y min-h-[160px]"
            disabled={loading}
          />
        </div>

        {erro && (
          <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {erro}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Gerando resumo...
            </>
          ) : (
            "Gerar resumo"
          )}
        </button>
      </form>

      {resumo && (
        <section className="mt-10 p-6 rounded-xl bg-zinc-900/60 border border-zinc-700/40">
          <h2 className="text-lg font-semibold text-zinc-200 mb-3 flex items-center gap-2">
            <span className="text-green-500">✓</span> Resumo
          </h2>
          <div className="text-zinc-300 whitespace-pre-wrap leading-relaxed">
            {resumo}
          </div>
        </section>
      )}

      <footer className="mt-16 text-center text-zinc-500 text-sm">
        Powered by Google Gemini • Deploy no Vercel
      </footer>
    </main>
  );
}
