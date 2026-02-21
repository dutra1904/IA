"use client";

import type { Lang } from "@/lib/i18n";

type Props = {
  lang: Lang;
  onChange: (lang: Lang) => void;
};

const options: { value: Lang; label: string }[] = [
  { value: "pt", label: "Português" },
  { value: "en", label: "English" },
];

export function LanguageSelector({ lang, onChange }: Props) {
  return (
    <div className="flex gap-1 p-1 rounded-lg bg-zinc-800/80 border border-zinc-700/50">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            lang === opt.value
              ? "bg-indigo-600 text-white"
              : "text-zinc-400 hover:text-white hover:bg-zinc-700/50"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
