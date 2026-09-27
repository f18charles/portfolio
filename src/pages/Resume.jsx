import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext.jsx'
import PageWrapper from '../components/PageWrapper.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import { ArrowLeft, Printer, FileText, Download } from 'lucide-react'

const pretty = (url) => (url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : '')

export default function Resume() {
  const { content } = useContent()
  const { hero = {}, about = {}, projects = [], contact = {} } = content
  const pdfUrl = contact.resumeUrl || hero.resumeUrl
  const docxUrl = contact.resumeDocxUrl

  useEffect(() => {
    const prev = document.title
    document.title = `${hero.name || 'Résumé'} — Résumé`
    return () => {
      document.title = prev
    }
  }, [hero.name])

  const shownProjects = projects.filter((p) => !p.hidden).slice(0, 4)

  return (
    <PageWrapper className="mx-auto max-w-3xl px-6 py-16 md:py-20">
      {/* Toolbar (hidden when printing) */}
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <Link
          to="/about"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-paper/60 transition-colors hover:text-paper"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to profile
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          {pdfUrl && (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              download
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3.5 py-1.5 font-mono text-xs text-paper/80 transition-colors hover:border-white/30 hover:text-paper"
            >
              <Download className="h-3.5 w-3.5" />
              PDF
            </a>
          )}
          {docxUrl && (
            <a
              href={docxUrl}
              target="_blank"
              rel="noreferrer"
              download
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3.5 py-1.5 font-mono text-xs text-paper/80 transition-colors hover:border-white/30 hover:text-paper"
            >
              <FileText className="h-3.5 w-3.5" />
              DOCX
            </a>
          )}
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-cobalt px-3.5 py-1.5 font-mono text-xs font-medium text-paper transition-colors hover:bg-cobalt-soft"
          >
            <Printer className="h-3.5 w-3.5" />
            Print / Save as PDF
          </button>
        </div>
      </div>

      <SectionLabel>resume --print-ready</SectionLabel>

      {/* Document */}
      <article className="resume-doc rounded-xl border border-white/10 bg-white/[0.02] p-8">
        <header className="border-b border-white/10 pb-4">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-paper">
            {hero.name}
          </h1>
          <p className="mt-1 text-sm text-paper/70">{hero.role}</p>
          <p className="mt-2 font-mono text-xs text-paper/55">
            {[contact.email, pretty(contact.github), pretty(contact.linkedin)]
              .filter(Boolean)
              .join('  ·  ')}
          </p>
        </header>

        {/* Summary */}
        <section className="mt-5">
          <h2 className="text-xs font-medium uppercase tracking-wide text-paper/45">Summary</h2>
          <p className="mt-2 text-sm leading-relaxed text-paper/80">{about.intro}</p>
        </section>

        {/* Skills */}
        {about.skills?.length > 0 && (
          <section className="mt-5">
            <h2 className="text-xs font-medium uppercase tracking-wide text-paper/45">Skills</h2>
            <p className="mt-2 text-sm leading-relaxed text-paper/80">
              {about.skills.join(' · ')}
            </p>
          </section>
        )}

        {/* Projects */}
        {shownProjects.length > 0 && (
          <section className="mt-5">
            <h2 className="text-xs font-medium uppercase tracking-wide text-paper/45">
              Selected projects
            </h2>
            <div className="mt-3 space-y-4">
              {shownProjects.map((p) => (
                <div key={p.id || p.title}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold text-paper">{p.title}</h3>
                    <span className="font-mono text-[11px] text-paper/50">
                      {[p.period, p.role].filter(Boolean).join(' · ')}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-paper/75">{p.description}</p>
                  {p.tags?.length > 0 && (
                    <p className="mt-1 font-mono text-[11px] text-paper/50">{p.tags.join(', ')}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {about.education?.length > 0 && (
          <section className="mt-5">
            <h2 className="text-xs font-medium uppercase tracking-wide text-paper/45">Education</h2>
            <div className="mt-3 space-y-2">
              {about.education.map((edu, i) => (
                <div key={i} className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-sm text-paper/80">
                    <span className="font-semibold text-paper">{edu.degree}</span>
                    {edu.institution ? ` — ${edu.institution}` : ''}
                  </span>
                  <span className="font-mono text-[11px] text-paper/50">{edu.period}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
    </PageWrapper>
  )
}
