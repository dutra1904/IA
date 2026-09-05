"use client";

import type { Lang } from "@/lib/types";

type Props = {
  lang: Lang;
  onChange: (lang: Lang) => void;
};

const options: { value: Lang; label: string; full: string }[] = [
  { value: "pt", label: "PT", full: "Português" },
  { value: "en", label: "EN", full: "English" },
];

export function LanguageSelector({ lang, onChange }: Props) {
  return (
    <div
      className="inline-flex rounded-lg border border-ink-border/80 bg-ink-surface/80 p-1"
      role="group"
      aria-label="Language"
    >
      {options.map((opt) => {
        const active = lang === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={active}
            aria-label={opt.full}
            className={`min-w-[2.75rem] rounded-md px-3 py-1.5 text-xs font-semibold tracking-wide transition-colors ${
              active
                ? "bg-moss text-ink shadow-sm"
                : "text-zinc-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
