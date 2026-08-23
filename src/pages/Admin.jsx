import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext.jsx'
import { supabase } from '../lib/supabaseClient.js'
import {
  Trash2,
  Plus,
  ArrowLeft,
  LogOut,
  Check,
  Save,
  Eye,
  EyeOff,
  AlertTriangle,
  Database,
  RefreshCw,
  Lock,
  ExternalLink,
} from 'lucide-react'

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block font-mono text-xs text-paper/60">{label}</span>
      <input
        {...props}
        className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-paper outline-none focus:border-cobalt-soft focus:shadow-[0_0_10px_rgba(96,122,254,0.3)] transition-all"
      />
    </label>
  )
}

function TextAreaField({ label, rows = 3, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block font-mono text-xs text-paper/60">{label}</span>
      <textarea
        {...props}
        rows={rows}
        className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-paper outline-none focus:border-cobalt-soft focus:shadow-[0_0_10px_rgba(96,122,254,0.3)] transition-all"
      />
    </label>
  )
}

function SaveButton({ onClick, saved, busy }) {
  return (
    <button
      onClick={onClick}
      disabled={busy}
      className="flex items-center gap-1.5 rounded-lg bg-cobalt px-5 py-2 font-mono text-xs text-paper transition-all hover:bg-cobalt-soft hover:shadow-[0_0_12px_rgba(96,122,254,0.4)] disabled:opacity-50 active:scale-95"
    >
      {busy ? (
        'Saving…'
      ) : saved ? (
        <>
          <Check className="h-3.5 w-3.5 text-signal" />
          <span>Saved ✓</span>
        </>
      ) : (
        <>
          <Save className="h-3.5 w-3.5" />
          <span>Save section</span>
        </>
      )}
    </button>
  )
}

function Panel({ title, children }) {
  return (
    <div className="rounded-xl border border-white/10 bg-ink-surface/90 p-6 backdrop-blur-md shadow-xl neon-card">
      <h2 className="mb-5 font-display text-2xl tracking-wide text-signal flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_6px_#2ED67A]" />
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function LoginGate({ isConfigured }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    if (!isConfigured) {
      setError(
        'Supabase environment variables (VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY) are not set. Please add them in your Vercel Project Settings or local .env file.',
      )
      return
    }

    setBusy(true)
    setError(null)

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })
      if (signInError) {
        setError(signInError.message)
      }
    } catch (err) {
      setError(err.message || 'Unable to connect to Supabase authentication service.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-signal/40 bg-signal/10 shadow-[0_0_15px_rgba(46,214,122,0.25)]">
          <Lock className="h-5 w-5 text-signal" />
        </div>
        <div>
          <h1 className="font-display text-3xl neon-gradient-text">CMS Admin Panel</h1>
          <p className="font-mono text-xs text-paper/50">Favor Charles Owuor Portfolio</p>
        </div>
      </div>

      {!isConfigured && (
        <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 font-mono text-xs text-amber-200">
          <div className="flex items-center gap-2 mb-2 font-semibold text-amber-300">
            <AlertTriangle className="h-4 w-4" />
            <span>Supabase Not Configured</span>
          </div>
          <p className="leading-relaxed text-amber-200/90 mb-3">
            To enable the live CMS, configure your Supabase project keys in Vercel (or your local{' '}
            <code>.env</code> file):
          </p>
          <ul className="list-disc pl-4 space-y-1 text-paper/70 text-[11px]">
            <li>
              <code>VITE_SUPABASE_URL</code>
            </li>
            <li>
              <code>VITE_SUPABASE_ANON_KEY</code>
            </li>
          </ul>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md">
        <Field
          label="Admin Email"
          type="email"
          required
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
        />
        <Field
          label="Password"
          type="password"
          required
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 font-mono text-xs text-red-300">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-cobalt py-2.5 font-mono text-xs font-semibold text-paper hover:bg-cobalt-soft hover:shadow-[0_0_12px_rgba(96,122,254,0.4)] transition-all disabled:opacity-50 active:scale-95"
        >
          {busy ? 'Verifying credentials…' : 'Authenticate Session'}
        </button>
      </form>

      <div className="mt-6 flex items-center justify-between font-mono text-xs text-paper/40">
        <Link
          to="/"
          className="inline-flex items-center gap-1 hover:text-signal transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Return to portfolio
        </Link>
        <a
          href="https://supabase.com/dashboard"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 hover:text-paper transition-colors"
        >
          <span>Supabase Dashboard</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  )
}

export default function Admin() {
  const {
    content,
    loading,
    error: ctxError,
    updateSection,
    resetToDefaults,
    savedAt,
    session,
    isConfigured,
    reloadContent,
  } = useContent()

  const [hero, setHero] = useState(content.hero || {})
  const [about, setAbout] = useState(content.about || {})
  const [skillsText, setSkillsText] = useState((content.about?.skills || []).join(', '))
  const [projects, setProjects] = useState(content.projects || [])
  const [contact, setContact] = useState(content.contact || {})

  const [savedFlags, setSavedFlags] = useState({})
  const [busyFlags, setBusyFlags] = useState({})
  const [actionError, setActionError] = useState(null)

  // Keep local state in sync whenever content is loaded or refreshed from Supabase
  useEffect(() => {
    if (content) {
      setHero(content.hero || {})
      setAbout(content.about || {})
      setSkillsText((content.about?.skills || []).join(', '))
      setProjects(content.projects || [])
      setContact(content.contact || {})
    }
  }, [content])

  async function withBusy(key, fn) {
    setActionError(null)
    setBusyFlags((s) => ({ ...s, [key]: true }))
    try {
      await fn()
      setSavedFlags((s) => ({ ...s, [key]: true }))
      setTimeout(() => setSavedFlags((s) => ({ ...s, [key]: false })), 2000)
    } catch (err) {
      setActionError(err.message || 'Failed to save changes')
    } finally {
      setBusyFlags((s) => ({ ...s, [key]: false }))
    }
  }

  const saveHero = () => withBusy('hero', () => updateSection('hero', hero))

  const saveAbout = () => {
    const skills = skillsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    const next = { ...about, skills }
    setAbout(next)
    return withBusy('about', () => updateSection('about', next))
  }

  const saveContact = () => withBusy('contact', () => updateSection('contact', contact))

  const saveProjects = (nextProjects) => {
    setProjects(nextProjects)
    return withBusy('projects', () => updateSection('projects', nextProjects))
  }

  function addProject() {
    const next = [
      ...projects,
      {
        id: `project-${Date.now()}`,
        title: 'New Architecture',
        category: 'Full-Stack',
        description: 'Describe the core capabilities and engineering architecture.',
        highlights: ['Key highlight bullet point 1', 'Key highlight bullet point 2'],
        tags: ['Go', 'React', 'PostgreSQL'],
        githubUrl: '',
        liveUrl: '',
        link: '',
        featured: false,
        hidden: false,
      },
    ]
    saveProjects(next)
  }

  function updateProject(id, patch) {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)))
  }

  function removeProject(id) {
    saveProjects(projects.filter((p) => p.id !== id))
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-3 font-mono text-sm text-signal">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span>Synchronizing content state…</span>
        </div>
      </div>
    )
  }

  if (!session) {
    return <LoginGate isConfigured={isConfigured} />
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      {/* Admin Top Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="font-display text-5xl neon-gradient-text">CMS Administration</h1>
          <p className="font-mono text-xs text-paper/50 mt-1">
            {savedAt ? `Last saved to cloud: ${savedAt.toLocaleString()}` : 'Ready to save'}
            {' · '}
            Logged in as <span className="text-signal">{session.user.email}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => reloadContent()}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-paper/70 hover:text-paper hover:bg-white/10 transition-all"
            title="Reload latest from cloud"
          >
            <RefreshCw className="h-3.5 w-3.5 text-cobalt-soft" />
            <span>Reload</span>
          </button>
          <Link
            to="/"
            className="flex items-center gap-1 font-mono text-xs text-paper/70 hover:text-signal transition-colors px-2 py-1.5"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            View Site
          </Link>
          <button
            onClick={() => supabase.auth.signOut()}
            className="flex items-center gap-1 rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-1.5 font-mono text-xs text-rose-400 hover:bg-rose-500/20 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        </div>
      </div>

      {(ctxError || actionError) && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 font-mono text-xs text-red-300">
          <div className="flex items-center gap-2 mb-1 font-semibold text-red-400">
            <AlertTriangle className="h-4 w-4" />
            <span>Error Notice</span>
          </div>
          {actionError || ctxError}
        </div>
      )}

      <div className="space-y-8">
        {/* HERO SECTION */}
        <Panel title="Hero Section">
          <Field
            label="Name"
            value={hero.name || ''}
            onChange={(e) => setHero({ ...hero, name: e.target.value })}
          />
          <Field
            label="Role / Title"
            value={hero.role || ''}
            onChange={(e) => setHero({ ...hero, role: e.target.value })}
          />
          <TextAreaField
            label="Tagline / Mission"
            value={hero.tagline || ''}
            onChange={(e) => setHero({ ...hero, tagline: e.target.value })}
          />
          <Field
            label="Status Badge"
            value={hero.status || ''}
            onChange={(e) => setHero({ ...hero, status: e.target.value })}
          />
          <SaveButton onClick={saveHero} saved={savedFlags.hero} busy={busyFlags.hero} />
        </Panel>

        {/* ABOUT SECTION */}
        <Panel title="About Profile & Skills">
          <TextAreaField
            label="Introduction"
            value={about.intro || ''}
            onChange={(e) => setAbout({ ...about, intro: e.target.value })}
          />
          <TextAreaField
            label="Biography & Background"
            rows={4}
            value={about.bio || ''}
            onChange={(e) => setAbout({ ...about, bio: e.target.value })}
          />
          <Field
            label="Skills (Comma-separated list)"
            value={skillsText}
            onChange={(e) => setSkillsText(e.target.value)}
          />
          <SaveButton onClick={saveAbout} saved={savedFlags.about} busy={busyFlags.about} />
        </Panel>

        {/* PROJECTS SECTION */}
        <Panel title="Projects & Technical Architectures">
          <div className="space-y-6">
            {projects.map((p, idx) => (
              <div
                key={p.id}
                className={`rounded-xl border p-5 space-y-4 transition-colors ${
                  p.hidden
                    ? 'border-amber-500/30 bg-amber-500/[0.02]'
                    : 'border-white/15 bg-white/[0.03]'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-signal font-semibold">#{idx + 1}</span>
                    <span className="font-mono text-xs text-paper/50">{p.id}</span>

                    {p.hidden ? (
                      <span className="inline-flex items-center gap-1 rounded bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 font-mono text-[10px] text-amber-400 font-semibold">
                        <EyeOff className="h-3 w-3" />
                        Hidden (Draft)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 font-mono text-[10px] text-signal font-semibold">
                        <Eye className="h-3 w-3" />
                        Published
                      </span>
                    )}

                    {p.featured && !p.hidden && (
                      <span className="rounded bg-cobalt/20 border border-cobalt-soft/40 px-2 py-0.5 font-mono text-[10px] text-cobalt-soft font-semibold">
                        Featured
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => removeProject(p.id)}
                    className="flex items-center gap-1 font-mono text-xs text-rose-400 hover:text-rose-300 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Project Title"
                    value={p.title || ''}
                    onChange={(e) => updateProject(p.id, { title: e.target.value })}
                  />
                  <Field
                    label="Category (e.g. Full-Stack, Backend & Systems, AI & FinTech, Utilities)"
                    value={p.category || ''}
                    onChange={(e) => updateProject(p.id, { category: e.target.value })}
                  />
                </div>

                <TextAreaField
                  label="Description"
                  value={p.description || ''}
                  onChange={(e) => updateProject(p.id, { description: e.target.value })}
                />

                <TextAreaField
                  label="Technical Highlights (One bullet point per line)"
                  value={(p.highlights || []).join('\n')}
                  onChange={(e) =>
                    updateProject(p.id, {
                      highlights: e.target.value.split('\n').map((h) => h.trim()).filter(Boolean),
                    })
                  }
                />

                <Field
                  label="Tags (Comma-separated, e.g. Go, React, PostgreSQL, JWT)"
                  value={(p.tags || []).join(', ')}
                  onChange={(e) =>
                    updateProject(p.id, {
                      tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                    })
                  }
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="GitHub Repository URL (optional)"
                    placeholder="https://github.com/..."
                    value={p.githubUrl || ''}
                    onChange={(e) => updateProject(p.id, { githubUrl: e.target.value })}
                  />
                  <Field
                    label="Live Deployed Demo URL (optional)"
                    placeholder="https://app.vercel.app"
                    value={p.liveUrl || ''}
                    onChange={(e) => updateProject(p.id, { liveUrl: e.target.value })}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-white/5">
                  <label className="flex items-center gap-2 font-mono text-xs text-paper/80 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={Boolean(p.hidden)}
                      onChange={(e) => updateProject(p.id, { hidden: e.target.checked })}
                      className="rounded border-white/20 bg-white/5 text-amber-400 focus:ring-0"
                    />
                    <span className={p.hidden ? 'text-amber-400 font-semibold' : 'text-paper/70'}>
                      Hide from public site (Work in progress / Polishing)
                    </span>
                  </label>

                  <label className="flex items-center gap-2 font-mono text-xs text-paper/80 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={Boolean(p.featured)}
                      onChange={(e) => updateProject(p.id, { featured: e.target.checked })}
                      className="rounded border-white/20 bg-white/5 text-signal focus:ring-0"
                    />
                    <span>Feature on Landing Page</span>
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
            <button
              onClick={addProject}
              className="flex items-center gap-1.5 rounded-lg border border-white/20 px-4 py-2 font-mono text-xs text-paper/90 hover:border-signal hover:text-signal transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Add New Project
            </button>
            <SaveButton
              onClick={() => saveProjects(projects)}
              saved={savedFlags.projects}
              busy={busyFlags.projects}
            />
          </div>
        </Panel>

        {/* CONTACT SECTION */}
        <Panel title="Contact & Social Channels">
          <Field
            label="Email Address"
            value={contact.email || ''}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
          />
          <Field
            label="GitHub Profile URL"
            value={contact.github || ''}
            onChange={(e) => setContact({ ...contact, github: e.target.value })}
          />
          <Field
            label="LinkedIn Profile URL"
            value={contact.linkedin || ''}
            onChange={(e) => setContact({ ...contact, linkedin: e.target.value })}
          />
          <TextAreaField
            label="Contact Intro Message"
            value={contact.message || ''}
            onChange={(e) => setContact({ ...contact, message: e.target.value })}
          />
          <SaveButton onClick={saveContact} saved={savedFlags.contact} busy={busyFlags.contact} />
        </Panel>

        {/* FACTORY RESET */}
        <div className="pt-4 text-center">
          <button
            onClick={() =>
              confirm('Reset all content back to the built-in defaults from CV?') &&
              resetToDefaults()
            }
            className="font-mono text-xs text-paper/40 hover:text-red-400 transition-colors"
          >
            Reset all content back to factory defaults
          </button>
        </div>
      </div>
    </div>
  )
}
