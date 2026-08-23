import { createClient } from '@supabase/supabase-js'

const rawUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

export const isSupabaseConfigured = Boolean(
  rawUrl &&
    rawKey &&
    !rawUrl.includes('your-project-ref') &&
    !rawKey.includes('your-anon-public-key') &&
    rawUrl.startsWith('https://'),
)

const url = isSupabaseConfigured ? rawUrl : 'https://placeholder-project.supabase.co'
const anonKey = isSupabaseConfigured ? rawKey : 'placeholder-anon-key'

if (!isSupabaseConfigured) {
  console.warn(
    'Supabase credentials are not configured or invalid. The portfolio is operating in local static fallback mode. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable live CMS synchronization.',
  )
}

export const supabase = createClient(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})
