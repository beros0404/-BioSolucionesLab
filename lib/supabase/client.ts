import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Try NEXT_PUBLIC_ variables first, fallback to SUPABASE_
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error(
      'Missing Supabase environment variables. Please check your .env.local or project settings.'
    )
  }

  return createBrowserClient(url, key)
}
