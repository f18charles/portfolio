import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.js'
import defaultContent from '../data/defaultContent.js'

const ROW_ID = 'site'
const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  const [content, setContent] = useState(defaultContent)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [savedAt, setSavedAt] = useState(null)
  const [session, setSession] = useState(null)

  // Load the site content from Supabase on first render.
  const loadContent = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    try {
      const { data, error: fetchError } = await supabase
        .from('content')
        .select('data, updated_at')
        .eq('id', ROW_ID)
        .maybeSingle()

      if (fetchError) {
        console.warn('Could not load content from Supabase:', fetchError.message)
        setError(fetchError.message)
        setLoading(false)
        return
      }

      if (data?.data && Object.keys(data.data).length > 0) {
        setContent({ ...defaultContent, ...data.data })
        setSavedAt(data.updated_at ? new Date(data.updated_at) : null)
      }
    } catch (err) {
      console.warn('Supabase fetch exception:', err)
      setError(err.message || 'Failed to connect to Supabase')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadContent()
  }, [loadContent])

  // Track auth session so the Admin page knows if someone's logged in.
  useEffect(() => {
    if (!isSupabaseConfigured) return

    supabase.auth
      .getSession()
      .then(({ data }) => setSession(data?.session ?? null))
      .catch((err) => console.warn('Supabase auth session error:', err))

    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
    })

    return () => listener?.subscription?.unsubscribe?.()
  }, [])

  async function writeContent(next) {
    setContent(next)

    if (!isSupabaseConfigured) {
      const msg = 'Supabase environment variables are missing. Changes applied locally only.'
      setError(msg)
      throw new Error(msg)
    }

    const { error: writeError } = await supabase
      .from('content')
      .upsert(
        { id: ROW_ID, data: next, updated_at: new Date().toISOString() },
        { onConflict: 'id' },
      )

    if (writeError) {
      console.error('Could not save to Supabase:', writeError.message)
      setError(writeError.message)
      throw writeError
    }
    setSavedAt(new Date())
    setError(null)
  }

  const updateSection = useCallback(
    (section, value) => writeContent({ ...content, [section]: value }),
    [content],
  )

  const resetToDefaults = useCallback(() => writeContent(defaultContent), [])

  return (
    <ContentContext.Provider
      value={{
        content,
        loading,
        error,
        updateSection,
        resetToDefaults,
        savedAt,
        session,
        isConfigured: isSupabaseConfigured,
        reloadContent: loadContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used inside ContentProvider')
  return ctx
}
