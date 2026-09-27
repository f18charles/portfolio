import { NavLink, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useContent } from '../context/ContentContext.jsx'
import { Terminal, Code2, User, Mail, Menu, X, ArrowUpRight, PenLine, FileText } from 'lucide-react'

const baseLinks = [
  { to: '/', label: 'Overview', icon: Terminal },
  { to: '/projects', label: 'Projects', icon: Code2 },
  { to: '/articles', label: 'Writing', icon: PenLine },
  { to: '/about', label: 'About & CV', icon: User },
  { to: '/contact', label: 'Contact', icon: Mail },
]

export default function Navbar() {
  const { content } = useContent()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const hasArticles = (content.articles || []).some((a) => !a.hidden)
  const links = baseLinks.filter((l) => l.to !== '/articles' || hasArticles)
  const resumeUrl = content.contact?.resumeUrl || content.hero?.resumeUrl

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/95">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <NavLink
          to="/"
          className="font-display text-lg font-semibold tracking-tight text-paper"
        >
          {content.hero.name.split(' ')[0]}
          <span className="text-cobalt-soft">.dev</span>
        </NavLink>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] p-1 md:flex">
          {links.map((l) => {
            const isActive = l.to === '/' ? location.pathname === '/' : location.pathname.startsWith(l.to)
            const Icon = l.icon
            return (
              <NavLink
                key={l.to}
                to={l.to}
                className={`relative flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-xs transition-colors ${
                  isActive ? 'text-paper' : 'text-paper/55 hover:text-paper'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavTab"
                    className="absolute inset-0 rounded-md bg-white/[0.08]"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 opacity-70" />
                  {l.label}
                </span>
              </NavLink>
            )
          })}
        </div>

        {/* Action Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {resumeUrl && (
            <Link
              to="/resume"
              className="flex items-center gap-1.5 rounded-lg border border-white/15 px-3.5 py-1.5 font-mono text-xs text-paper/75 transition-colors hover:border-white/30 hover:text-paper"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Résumé</span>
            </Link>
          )}
          <NavLink
            to="/contact"
            className="flex items-center gap-1.5 rounded-lg bg-cobalt px-3.5 py-1.5 font-mono text-xs font-medium text-paper transition-colors hover:bg-cobalt-soft"
          >
            <span>Get in touch</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </NavLink>
        </div>

        {/* Mobile Toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-paper md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-1 border-t border-white/10 bg-ink-surface px-6 py-4 md:hidden"
          >
            {links.map((l) => {
              const isActive = l.to === '/' ? location.pathname === '/' : location.pathname.startsWith(l.to)
              const Icon = l.icon
              return (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-2.5 font-mono text-sm transition-colors ${
                    isActive
                      ? 'bg-white/[0.08] text-paper'
                      : 'text-paper/65 hover:bg-white/5 hover:text-paper'
                  }`}
                >
                  <Icon className="h-4 w-4 opacity-70" />
                  {l.label}
                </NavLink>
              )
            })}
            {resumeUrl && (
              <Link
                to="/resume"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg border border-white/10 px-4 py-2.5 font-mono text-sm text-paper/65 transition-colors hover:bg-white/5 hover:text-paper"
              >
                <FileText className="h-4 w-4 opacity-70" />
                View résumé
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
