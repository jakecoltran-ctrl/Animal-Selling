import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      `Missing Supabase env vars. URL: ${supabaseUrl ? "set" : "missing"}, Key: ${supabaseKey ? "set" : "missing"}`
    );
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}
