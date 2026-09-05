"use client";

import type { Estilo } from "@/lib/types";
import { ESTILOS } from "@/lib/types";
import { translations, type Lang } from "@/lib/i18n";

type Props = {
  lang: Lang;
  value: Estilo;
  onChange: (estilo: Estilo) => void;
};

const ICONS: Record<Estilo, string> = {
  paragrafos: "¶",
  bullet: "•",
  executivo: "▸",
};

export function StylePicker({ lang, value, onChange }: Props) {
  const t = translations[lang];

  return (
    <div>
      <p id="style-label" className="mb-2.5 text-sm font-medium text-zinc-300">
        {t.styleLabel}
      </p>
      <div
        role="radiogroup"
        aria-labelledby="style-label"
        className="grid grid-cols-1 gap-2 sm:grid-cols-3"
      >
        {ESTILOS.map((estilo) => {
          const selected = value === estilo;
          const copy = t.styles[estilo];
          return (
            <button
              key={estilo}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(estilo)}
              className={`rounded-xl border px-4 py-3 text-left transition-all ${
                selected
                  ? "border-moss/70 bg-moss-soft shadow-card"
                  : "border-ink-border/80 bg-ink-surface/60 hover:border-zinc-500 hover:bg-ink-elevated"
              }`}
            >
              <span className="mb-1 flex items-center gap-2">
                <span
                  className={`text-sm ${selected ? "text-moss-bright" : "text-zinc-500"}`}
                  aria-hidden
                >
                  {ICONS[estilo]}
                </span>
                <span className="text-sm font-semibold text-zinc-100">
                  {copy.label}
                </span>
              </span>
              <span className="block text-xs leading-relaxed text-zinc-400">
                {copy.hint}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
