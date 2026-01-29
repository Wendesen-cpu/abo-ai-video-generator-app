import { createBrowserClient } from '@supabase/ssr'

/**
 * Create a Supabase browser client using NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.
 *
 * Reads the corresponding environment variables and returns an initialized browser Supabase client.
 * This will throw at runtime if either environment variable is undefined.
 *
 * @returns A Supabase browser client instance.
 */
export function createClient() {
  // Create a supabase client on the browser with project url and public anon key
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}