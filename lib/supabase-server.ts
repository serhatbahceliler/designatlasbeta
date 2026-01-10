import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();
  
  // Get auth session from cookies
  // Supabase stores session in cookies with pattern: sb-{project-ref}-auth-token
  const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
  const cookieName = projectRef ? `sb-${projectRef}-auth-token` : 'sb-auth-token';
  
  const authCookie = cookieStore.get(cookieName)?.value;
  
  const client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  // If we have an auth cookie, set the session
  if (authCookie) {
    try {
      const session = JSON.parse(authCookie);
      if (session?.access_token) {
        client.auth.setSession({
          access_token: session.access_token,
          refresh_token: session.refresh_token || '',
        });
      }
    } catch (e) {
      // Cookie parse error, continue without session
    }
  }

  return client;
}

// Alternative: Get user from request headers (token passed from client)
export function createSupabaseClientFromToken(token: string) {
  const client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });

  if (token) {
    client.auth.setSession({
      access_token: token,
      refresh_token: '',
    });
  }

  return client;
}
