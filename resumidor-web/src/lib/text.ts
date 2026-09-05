export function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

export function compressionLabel(
  original: string,
  summary: string,
  template: string,
  compactTemplate: string
): string {
  const from = countWords(original);
  const to = countWords(summary);
  if (from === 0) return compactTemplate.replace("{from}", "0").replace("{to}", String(to));

  const pct = Math.round((1 - to / from) * 100);
  if (pct <= 0) {
    return compactTemplate
      .replace("{from}", from.toLocaleString())
      .replace("{to}", to.toLocaleString());
  }

  return template
    .replace("{from}", from.toLocaleString())
    .replace("{to}", to.toLocaleString())
    .replace("{pct}", String(pct));
}
