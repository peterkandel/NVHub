import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !anonKey) {
    const missing = [
      !url && "NEXT_PUBLIC_SUPABASE_URL",
      !anonKey && "NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    ].filter(Boolean);
    const message = `[SUPABASE] Missing environment variable(s): ${missing.join(", ")}. Set them in .env.local and restart Next.js.`;

    if (typeof window !== "undefined") {
      console.error(message, {
        urlExists: !!url,
        anonKeyExists: !!anonKey,
      });
    }

    throw new Error(message);
  }

  return createBrowserClient(url, anonKey);
}
