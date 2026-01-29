import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Create and return a Supabase server-side client configured to use Next.js server cookies.
 *
 * The client is initialized from NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
 * and includes a cookies adapter that delegates `getAll` to the Next.js server cookie store.
 * The adapter's `setAll` applies each cookie to the store and silently ignores errors
 * (for example, when called from a Server Component).
 *
 * @returns A Supabase client instance configured for server-side use with Next.js cookies.
 */
export async function createClient() {
    const cookieStore = await cookies()

    // Create a server-side Supabase client with logging in standard search params and cookies
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    )
}