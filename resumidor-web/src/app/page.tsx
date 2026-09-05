"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ResultCard, ResultSkeleton } from "@/components/ResultCard";
import { StylePicker } from "@/components/StylePicker";
import { EXAMPLES } from "@/lib/examples";
import { translations } from "@/lib/i18n";
import { MAX_CHARS, MIN_CHARS, type Estilo, type Lang } from "@/lib/types";

export default function Home() {
  const [lang, setLang] = useState<Lang>("pt");
  const [texto, setTexto] = useState("");
  const [estilo, setEstilo] = useState<Estilo>("paragrafos");
  const [resumo, setResumo] = useState("");
  const [fonteResumo, setFonteResumo] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  const t = translations[lang];

  useEffect(() => {
    const saved = window.localStorage.getItem("resumidor-lang");
    if (saved === "pt" || saved === "en") {
      setLang(saved);
    }
  }, []);

  const handleLang = useCallback((next: Lang) => {
    setLang(next);
    window.localStorage.setItem("resumidor-lang", next);
    document.documentElement.lang = next === "en" ? "en" : "pt-BR";
  }, []);

  const handleCancel = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setLoading(false);
  }, []);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      setErro("");

      const textoLimpo = texto.trim();
      if (!textoLimpo) {
        setErro(t.errorEmpty);
        return;
      }
      if (textoLimpo.length < MIN_CHARS) {
        setErro(t.errorShort);
        return;
      }
      if (textoLimpo.length > MAX_CHARS) {
        setErro(t.errorLong);
        return;
      }

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      setResumo("");
      setFonteResumo("");

      try {
        const res = await fetch("/api/resumir", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            texto: textoLimpo,
            estilo,
            idioma: lang,
          }),
          signal: controller.signal,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.erro || t.errorGeneric);
        }

        setResumo(data.resumo);
        setFonteResumo(textoLimpo);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }
        setErro(err instanceof Error ? err.message : t.errorGeneric);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    },
    [texto, estilo, lang, t]
  );

  const nearLimit = texto.length > MAX_CHARS * 0.9;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-5 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span
            className="grid h-8 w-8 place-items-center rounded-lg bg-moss text-sm font-bold text-ink"
            aria-hidden
          >
            R
          </span>
          <span className="text-sm font-semibold tracking-tight text-zinc-100">
            {t.brand}
          </span>
        </div>
        <LanguageSelector lang={lang} onChange={handleLang} />
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-16 sm:px-6">
        <section className="mb-10 pt-4 text-center sm:pt-8">
          <p className="mb-4 inline-flex items-center rounded-full border border-moss/30 bg-moss-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-moss-bright">
            {t.badge}
          </p>
          <h1 className="text-balance text-4xl font-normal leading-tight tracking-tight text-zinc-50 sm:text-5xl">
            {t.titleBefore}
            <em className="font-display italic text-moss-bright">{t.titleAccent}</em>
            {t.titleAfter}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-zinc-400 sm:text-lg">
            {t.subtitle}
          </p>
        </section>

        <form onSubmit={handleSubmit} className="space-y-6">
          <StylePicker lang={lang} value={estilo} onChange={setEstilo} />

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label htmlFor="texto" className="text-sm font-medium text-zinc-300">
                {t.textLabel}
              </label>
              <div className="flex items-center gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setTexto(EXAMPLES[lang]);
                    setErro("");
                  }}
                  className="text-zinc-400 transition-colors hover:text-moss-bright"
                >
                  {t.tryExample}
                </button>
                {texto && (
                  <button
                    type="button"
                    onClick={() => {
                      setTexto("");
                      setErro("");
                    }}
                    className="text-zinc-500 transition-colors hover:text-zinc-200"
                  >
                    {t.clear}
                  </button>
                )}
              </div>
            </div>
            <textarea
              id="texto"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  void handleSubmit();
                }
              }}
              placeholder={t.placeholder}
              rows={9}
              maxLength={MAX_CHARS + 200}
              disabled={loading}
              className="min-h-[180px] w-full resize-y rounded-2xl border border-ink-border/80 bg-ink-surface/80 px-4 py-3.5 text-sm text-white placeholder-zinc-600 shadow-card transition-all focus:border-moss/50 focus:outline-none focus:ring-2 focus:ring-moss/25 disabled:opacity-70"
            />
            <p
              className={`mt-2 text-right text-xs ${
                texto.length > MAX_CHARS
                  ? "text-red-400"
                  : nearLimit
                    ? "text-amber-400"
                    : "text-zinc-500"
              }`}
            >
              {t.charCount
                .replace("{n}", texto.length.toLocaleString(lang === "en" ? "en" : "pt-BR"))
                .replace("{max}", MAX_CHARS.toLocaleString(lang === "en" ? "en" : "pt-BR"))}
            </p>
          </div>

          {erro && (
            <div
              role="alert"
              className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              {erro}
            </div>
          )}

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-moss px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-moss-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span
                    className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-ink/25 border-t-ink"
                    aria-hidden
                  />
                  {t.btnLoading}
                </>
              ) : (
                t.btnGenerate
              )}
            </button>
            {loading ? (
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-xl border border-ink-border px-4 py-3.5 text-sm font-medium text-zinc-300 hover:bg-white/5"
              >
                {t.btnCancel}
              </button>
            ) : (
              <p className="hidden text-center text-xs text-zinc-500 sm:block sm:min-w-[7.5rem]">
                {t.shortcut}
              </p>
            )}
          </div>
        </form>

        <div className="mt-10">
          {loading && <ResultSkeleton />}
          {!loading && resumo && (
            <ResultCard lang={lang} original={fonteResumo} resumo={resumo} />
          )}
        </div>
      </main>

      <footer className="px-4 py-8 text-center text-xs text-zinc-600">
        {t.footer}
      </footer>
    </div>
  );
}
