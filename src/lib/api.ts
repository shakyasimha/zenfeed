export const API_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "http://192.168.1.67:8000";

export interface Source {
  id: number;
  name: string;
  url: string;
  icon_url?: string | null;
  is_active?: boolean;
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
