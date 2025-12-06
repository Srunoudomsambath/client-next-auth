export async function apiFetch(endpoint: string, token: string, options: RequestInit = {}) {
  const res = await fetch(`http://localhost:8080${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
