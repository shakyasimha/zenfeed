export const API_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "http://192.168.1.67:8000";

export interface Source {
  id: number;
  name: string;
  url: string;
  icon_url?: string | null;
  is_active?: boolean;
}

export interface Article {
  id: number;
  source_id: number;
  url: string;
  title: string;
  snippet?: string | null;
  image_url?: string | null;
  published_at?: string | null;
  source?: Source;
}

export async function fetchSources(): Promise<Source[]> {
  const res = await fetch(`${API_URL}/api/sources`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Server responded with ${res.status}`);

  const json = await res.json();
  const list: Source[] = Array.isArray(json) ? json : (json.data ?? []);
  return list.filter((s) => s.is_active !== false);
}

export async function fetchArticles(
  sourceId?: number | null,
): Promise<Article[]> {
  const query = sourceId ? `?source_id=${sourceId}` : "";
  const res = await fetch(`${API_URL}/api/articles${query}`, {
    headers: { Accept: "application/json" },
  });

  if (!res.ok) throw new Error(`Server responded with ${res.status}`);

  const json = await res.json();
  return Array.isArray(json) ? json : (json.data ?? []);
}
