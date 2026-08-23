import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient.js'
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
  useEffect(() => {
    let cancelled = false

    async function load() {
      const { data, error: fetchError } = await supabase
        .from('content')
        .select('data, updated_at')
        .eq('id', ROW_ID)
        .single()

      if (cancelled) return

      if (fetchError) {
        // Table/row might not exist yet, or env vars might be missing —
        // fall back to the built-in defaults so the site still renders.
        console.error('Could not load content from Supabase:', fetchError.message)
        setError(fetchError.message)
        setLoading(false)
        return
      }

      // Merge over defaults so missing fields (e.g. a brand new empty row)
      // don't break the page.
      setContent({ ...defaultContent, ...(data?.data ?? {}) })
      setSavedAt(data?.updated_at ? new Date(data.updated_at) : null)
      setLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  // Track auth session so the Admin page knows if someone's logged in.
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  async function writeContent(next) {
    setContent(next)
    const { error: writeError } = await supabase
      .from('content')
      .update({ data: next, updated_at: new Date().toISOString() })
      .eq('id', ROW_ID)

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
      value={{ content, loading, error, updateSection, resetToDefaults, savedAt, session }}
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
