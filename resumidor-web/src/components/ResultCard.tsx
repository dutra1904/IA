"use client";

import { useState } from "react";
import { translations, type Lang } from "@/lib/i18n";
import { compressionLabel } from "@/lib/text";

type Props = {
  lang: Lang;
  original: string;
  resumo: string;
};

export function ResultCard({ lang, original, resumo }: Props) {
  const t = translations[lang];
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(resumo);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  const stats = compressionLabel(original, resumo, t.stats, t.statsCompact);

  return (
    <section
      aria-live="polite"
      className="overflow-hidden rounded-2xl border border-ink-border/80 bg-ink-surface/70 shadow-card"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-border/70 px-5 py-3.5">
        <div>
          <h2 className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-moss-bright" aria-hidden />
            {t.resultTitle}
          </h2>
          <p className="mt-0.5 text-xs text-zinc-500">{stats}</p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-lg border border-ink-border bg-ink-elevated px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:border-moss/50 hover:text-white"
        >
          {copied ? t.copied : t.copy}
        </button>
      </div>
      <div className="px-5 py-5 text-[0.95rem] leading-relaxed text-zinc-200 whitespace-pre-wrap">
        {resumo}
      </div>
    </section>
  );
}

export function ResultSkeleton() {
  return (
    <div
      className="rounded-2xl border border-ink-border/80 bg-ink-surface/50 p-5"
      aria-hidden
    >
      <div className="skeleton mb-4 h-3 w-28 rounded" />
      <div className="space-y-2.5">
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-11/12 rounded" />
        <div className="skeleton h-3 w-4/5 rounded" />
        <div className="skeleton h-3 w-2/3 rounded" />
      </div>
    </div>
  );
}
