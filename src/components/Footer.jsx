import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext.jsx'
import { Mail, ArrowUpRight, Lock, FileText } from 'lucide-react'
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
    { label: 'GitHub', href: contact.github, Icon: GithubIcon },
    { label: 'LinkedIn', href: contact.linkedin, Icon: LinkedinIcon },
    { label: 'Dev.to', href: contact.devto, Icon: DevToIcon },
    { label: 'X', href: contact.x, Icon: XIcon },
  ].filter((s) => s.href)

  return (
    <footer className="border-t border-white/10 bg-ink-surface/60 px-6 py-12">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
        <div className="space-y-3">
          <Link to="/" className="font-display text-lg font-semibold tracking-tight text-paper">
            {hero.name?.split(' ')[0] || 'Favor'}
            <span className="text-cobalt-soft">.dev</span>
          </Link>
          <p className="max-w-xs text-xs leading-relaxed text-paper/55">
            {hero.role}. Building resilient backend systems, distributed architectures, and
            AI-integrated software.
          </p>
          {resumeUrl && (
            <Link
              to="/resume"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-paper/70 transition-colors hover:text-paper"
            >
              <FileText className="h-3.5 w-3.5" />
              Résumé
            </Link>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-medium text-paper/45">Navigate</h3>
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-xs text-paper/60 transition-colors hover:text-paper"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-medium text-paper/45">Connect</h3>
          <div className="flex flex-wrap items-center gap-4">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-paper/60 transition-colors hover:text-paper"
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{label}</span>
              </a>
            ))}
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-1.5 text-xs text-paper/60 transition-colors hover:text-paper"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Email</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-paper/40 md:flex-row">
        <p>
          © {year} {hero.name}. Built with React, Tailwind & Framer Motion.
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
