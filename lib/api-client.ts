// API client helper for authenticated requests
import { supabase } from '@/lib/supabase';

export async function getAuthHeaders(): Promise<HeadersInit> {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.access_token) {
    throw new Error("Not authenticated");
  }

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${session.access_token}`,
  };
}

export async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = await getAuthHeaders();
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(error.error || `API error: ${response.statusText}`);
  }

  return response.json();
}
