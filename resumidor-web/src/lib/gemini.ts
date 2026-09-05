let cachedModels: string[] | null = null;
let cacheTime = 0;
const CACHE_MS = 1000 * 60 * 5; // 5 min

export async function getAvailableModels(apiKey: string): Promise<string[]> {
  if (cachedModels && Date.now() - cacheTime < CACHE_MS) {
    return cachedModels;
  }
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
  );
  if (!res.ok) {
    throw new Error(`Gemini models request failed (${res.status})`);
  }
  const data = await res.json();
  const supports = (m: {
    supportedGenerationMethods?: string[];
    supported_generation_methods?: string[];
  }) =>
    m?.supportedGenerationMethods?.includes("generateContent") ||
    m?.supported_generation_methods?.includes("generateContent");
  const models: string[] = (data.models || [])
    .filter(supports)
    .map((m: { name: string }) => m.name.replace("models/", ""));
  cachedModels = models;
  cacheTime = Date.now();
  return models;
}
