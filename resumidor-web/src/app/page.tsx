"use client";

import { useState, useCallback } from "react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { translations, type Lang } from "@/lib/i18n";

type Estilo = "paragrafos" | "bullet" | "executivo";

const ESTILOS: Estilo[] = ["paragrafos", "bullet", "executivo"];

export default function Home() {
  const [lang, setLang] = useState<Lang>("pt");
  const [texto, setTexto] = useState("");
  const [estilo, setEstilo] = useState<Estilo>("paragrafos");
  const [resumo, setResumo] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const t = translations[lang];

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErro("");
      setResumo("");

      const textoTripado = texto.trim();
      if (!textoTripado) {
        setErro(translations[lang].errorEmpty);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch("/api/resumir", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            texto: textoTripado,
            estilo,
            idioma: lang,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.erro || translations[lang].errorGeneric);
        }

        setResumo(data.resumo);
      } catch (err) {
        setErro(err instanceof Error ? err.message : translations[lang].errorGeneric);
      } finally {
        setLoading(false);
      }
    },
    [texto, estilo, lang]
  );

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <header className="flex flex-col items-center gap-6 mb-10">
        <div className="w-full flex justify-end">
          <LanguageSelector lang={lang} onChange={setLang} />
        </div>
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            {t.title}
          </h1>
          <p className="text-zinc-400 text-lg">{t.subtitle}</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="estilo"
            className="block text-sm font-medium text-zinc-300 mb-2"
          >
            {t.styleLabel}
          </label>
          <div className="flex flex-wrap gap-3">
            {ESTILOS.map((value) => (
              <label
                key={value}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="estilo"
                  value={value}
                  checked={estilo === value}
                  onChange={(e) => setEstilo(e.target.value as Estilo)}
                  className="w-4 h-4 accent-indigo-500"
                />
                <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                  {t.styles[value]}
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
            {t.textLabel}
          </label>
          <textarea
            id="texto"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder={t.placeholder}
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
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden />
              {t.btnLoading}
            </>
          ) : (
            t.btnGenerate
          )}
        </button>
      </form>

      {resumo && (
        <section className="mt-10 p-6 rounded-xl bg-zinc-900/60 border border-zinc-700/40">
          <h2 className="text-lg font-semibold text-zinc-200 mb-3 flex items-center gap-2">
            <span className="text-green-500" aria-hidden>✓</span>
            {t.resultTitle}
          </h2>
          <div className="text-zinc-300 whitespace-pre-wrap leading-relaxed">
            {resumo}
          </div>
        </section>
      )}

      <footer className="mt-16 text-center text-zinc-500 text-sm">
        {t.footer}
      </footer>
    </main>
  );
}
