import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext.jsx'
import { Mail, ArrowUpRight, Terminal, Lock } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons.jsx'

export default function Footer() {
  const { content } = useContent()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-ink-surface/40 px-6 py-12 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 font-mono text-xs text-paper/50 md:flex-row">
        <div className="flex items-center gap-3">
          <Terminal className="h-4 w-4 text-cobalt-soft" />
          <p>© {year} {content.hero.name}. Built with React, Tailwind & Framer Motion.</p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <a
            href={content.contact.github}
            className="flex items-center gap-1.5 text-paper/60 transition-colors hover:text-cobalt-soft hover:drop-shadow-[0_0_8px_rgba(96,122,254,0.8)]"
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            <span>github</span>
            <ArrowUpRight className="h-3 w-3 opacity-60" />
          </a>

          <a
            href={content.contact.linkedin}
            className="flex items-center gap-1.5 text-paper/60 transition-colors hover:text-violet-soft hover:drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedinIcon className="h-3.5 w-3.5" />
            <span>linkedin</span>
            <ArrowUpRight className="h-3 w-3 opacity-60" />
          </a>

          <a
            href={`mailto:${content.contact.email}`}
            className="flex items-center gap-1.5 text-paper/60 transition-colors hover:text-signal hover:drop-shadow-[0_0_8px_rgba(46,214,122,0.8)]"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>email</span>
            <ArrowUpRight className="h-3 w-3 opacity-60" />
          </a>

          <Link
            to="/admin"
            className="flex items-center gap-1 text-paper/30 transition-colors hover:text-paper/70"
            title="CMS Admin Panel"
          >
            <Lock className="h-3 w-3" />
            <span>admin</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
