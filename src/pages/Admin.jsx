import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext.jsx'
import { supabase } from '../lib/supabaseClient.js'
import { Trash2, Plus, ArrowLeft, LogOut, Check, Save, Eye, EyeOff } from 'lucide-react'

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

function LoginGate() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setBusy(false)
    if (signInError) setError(signInError.message)
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
      <h1 className="mb-2 font-display text-4xl neon-gradient-text">Admin Panel</h1>
      <p className="mb-6 font-mono text-xs text-paper/50">
        Log in with your authenticated Supabase user account to modify portfolio systems.
      </p>
      <form onSubmit={handleLogin} className="space-y-4">
        <Field
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
        />
        <Field
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        {error && <p className="font-mono text-xs text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-cobalt py-2.5 font-mono text-xs font-semibold text-paper hover:bg-cobalt-soft transition-colors disabled:opacity-50"
        >
          {busy ? 'Verifying credentials…' : 'Authenticate Session'}
        </button>
      </form>
      <Link to="/" className="mt-6 inline-flex items-center gap-1 font-mono text-xs text-paper/40 hover:text-signal transition-colors">
        <ArrowLeft className="h-3 w-3" />
        Return to portfolio
      </Link>
    </div>
  )
}

export default function Admin() {
  const { content, loading, error, updateSection, resetToDefaults, savedAt, session } =
    useContent()

  const [hero, setHero] = useState(content.hero || {})
  const [about, setAbout] = useState(content.about || {})
  const [skillsText, setSkillsText] = useState((content.about?.skills || []).join(', '))
  const [projects, setProjects] = useState(content.projects || [])
  const [contact, setContact] = useState(content.contact || {})

  const [savedFlags, setSavedFlags] = useState({})
  const [busyFlags, setBusyFlags] = useState({})

  async function withBusy(key, fn) {
    setBusyFlags((s) => ({ ...s, [key]: true }))
    try {
      await fn()
      setSavedFlags((s) => ({ ...s, [key]: true }))
      setTimeout(() => setSavedFlags((s) => ({ ...s, [key]: false })), 1800)
    } finally {
      setBusyFlags((s) => ({ ...s, [key]: false }))
    }
  }

  const saveHero = () => withBusy('hero', () => updateSection('hero', hero))

  const saveAbout = () => {
    const skills = skillsText.split(',').map((s) => s.trim()).filter(Boolean)
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
    saveProjects([
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
    ])
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
        <p className="font-mono text-sm text-signal">
          Synchronizing content state…
        </p>
      </div>
    )
  }

  if (!session) {
    return <LoginGate />
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      {/* Admin Top Header */}
      <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="font-display text-5xl">CMS Administration</h1>
          <p className="font-mono text-xs text-paper/40 mt-1">
            {savedAt ? `Last saved to cloud: ${savedAt.toLocaleString()}` : 'Ready to save'}
            {' · '}
            Logged in as <span className="text-signal">{session.user.email}</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-1 font-mono text-xs text-paper/70 hover:text-signal transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            View Site
          </Link>
          <button
            onClick={() => supabase.auth.signOut()}
            className="flex items-center gap-1 font-mono text-xs text-rose-400 hover:text-rose-300 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 font-mono text-xs text-red-400">
          Supabase Sync Notice: {error} (Falling back to local cache/defaults).
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

        {/* PROJECTS SECTION (WITH VISIBILITY / HIDE DRAFTS TOGGLE) */}
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
                    
                    {/* Public vs Hidden / Draft Badge */}
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

                {/* Dual URL Support: GitHub & Live Demo */}
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

                {/* Project Visibility & Feature Toggles */}
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

        {/* CONTACT SECTION (LOCATION REMOVED) */}
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
