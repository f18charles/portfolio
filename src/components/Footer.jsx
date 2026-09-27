import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext.jsx'
import { Mail, ArrowUpRight, Terminal, Lock, FileText } from 'lucide-react'
import { GithubIcon, LinkedinIcon, DevToIcon, XIcon } from './Icons.jsx'

const navLinks = [
  { to: '/', label: 'Overview' },
  { to: '/projects', label: 'Projects' },
  { to: '/articles', label: 'Articles' },
  { to: '/about', label: 'About & CV' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  const { content } = useContent()
  const year = new Date().getFullYear()
  const { contact = {}, hero = {} } = content
  const resumeUrl = contact.resumeUrl || hero.resumeUrl

  const socials = [
    { label: 'GitHub', href: contact.github, Icon: GithubIcon, accent: 'hover:text-cobalt-soft hover:drop-shadow-[0_0_8px_rgba(96,122,254,0.8)]' },
    { label: 'LinkedIn', href: contact.linkedin, Icon: LinkedinIcon, accent: 'hover:text-violet-soft hover:drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]' },
    { label: 'Dev.to', href: contact.devto, Icon: DevToIcon, accent: 'hover:text-signal hover:drop-shadow-[0_0_8px_rgba(46,214,122,0.8)]' },
    { label: 'X', href: contact.x, Icon: XIcon, accent: 'hover:text-paper hover:drop-shadow-[0_0_8px_rgba(250,250,249,0.7)]' },
  ].filter((s) => s.href)

  return (
    <footer className="border-t border-white/10 bg-ink-surface/40 px-6 py-12 backdrop-blur-sm">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
        <div className="space-y-3">
          <Link to="/" className="flex items-center gap-1.5 font-display text-2xl tracking-wide text-paper">
            <span>{hero.name?.split(' ')[0] || 'Favor'}</span>
            <span className="text-signal drop-shadow-[0_0_6px_rgba(46,214,122,0.8)]">.dev</span>
          </Link>
          <p className="max-w-xs font-mono text-xs leading-relaxed text-paper/50">
            {hero.role}. Building resilient backend systems, distributed architectures, and AI-integrated software.
          </p>
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              download
              className="inline-flex items-center gap-1.5 font-mono text-xs text-signal transition-colors hover:underline"
            >
              <FileText className="h-3.5 w-3.5" />
              Download Résumé
            </a>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-[11px] uppercase tracking-widest text-paper/40">Navigate</h3>
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="font-mono text-xs text-paper/60 transition-colors hover:text-signal"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-[11px] uppercase tracking-widest text-paper/40">Connect</h3>
          <div className="flex flex-wrap items-center gap-3">
            {socials.map(({ label, href, Icon, accent }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                title={label}
                className={`inline-flex items-center gap-1.5 font-mono text-xs text-paper/60 transition-colors ${accent}`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{label}</span>
              </a>
            ))}
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-1.5 font-mono text-xs text-paper/60 transition-colors hover:text-signal hover:drop-shadow-[0_0_8px_rgba(46,214,122,0.8)]"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Email</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 font-mono text-xs text-paper/40 md:flex-row">
        <p className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-cobalt-soft" />© {year} {hero.name}. Built with React, Tailwind & Framer Motion.
        </p>
        <Link
          to="/admin"
          className="flex items-center gap-1 transition-colors hover:text-paper/70"
          title="CMS Admin Panel"
        >
          <Lock className="h-3 w-3" />
          <span>admin</span>
          <ArrowUpRight className="h-3 w-3 opacity-60" />
        </Link>
      </div>
    </footer>
  )
}
