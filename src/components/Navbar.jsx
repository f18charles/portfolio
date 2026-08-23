import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useContent } from '../context/ContentContext.jsx'
import { Terminal, Code2, User, Mail, Menu, X, ArrowUpRight } from 'lucide-react'

const links = [
  { to: '/', label: 'Overview', icon: Terminal },
  { to: '/projects', label: 'Projects', icon: Code2 },
  { to: '/about', label: 'About & CV', icon: User },
  { to: '/contact', label: 'Contact', icon: Mail },
]

export default function Navbar() {
  const { content } = useContent()
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <NavLink to="/" className="group flex items-center gap-1.5 font-display text-2xl tracking-wide text-paper transition-transform active:scale-95">
          <span>{content.hero.name.split(' ')[0]}</span>
          <span className="text-signal drop-shadow-[0_0_6px_rgba(46,214,122,0.8)]">.dev</span>
        </NavLink>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-1 md:flex rounded-full border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-sm">
          {links.map((l) => {
            const isActive = l.to === '/' ? location.pathname === '/' : location.pathname.startsWith(l.to)
            const Icon = l.icon
            return (
              <NavLink
                key={l.to}
                to={l.to}
                className={`relative flex items-center gap-1.5 px-4 py-1.5 font-mono text-xs tracking-wide transition-all rounded-full ${
                  isActive
                    ? 'text-paper font-semibold'
                    : 'text-paper/60 hover:text-paper hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavTab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cobalt/40 to-signal/30 border border-signal/40 shadow-[0_0_12px_rgba(46,214,122,0.25)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-signal' : 'text-paper/40'}`} />
                  {l.label}
                </span>
              </NavLink>
            )
          })}
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <NavLink
            to="/contact"
            className="flex items-center gap-1.5 rounded-full border border-signal/40 bg-signal/10 px-4 py-1.5 font-mono text-xs font-semibold text-signal transition-all hover:bg-signal/20 hover:shadow-[0_0_15px_rgba(46,214,122,0.4)] active:scale-95"
          >
            <span>Let&apos;s Connect</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </NavLink>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-paper md:hidden transition-colors hover:border-signal/50"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5 text-signal" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-white/10 bg-ink-surface/95 px-6 py-4 md:hidden backdrop-blur-xl space-y-2"
          >
            {links.map((l) => {
              const isActive = l.to === '/' ? location.pathname === '/' : location.pathname.startsWith(l.to)
              const Icon = l.icon
              return (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-2.5 font-mono text-sm transition-all ${
                    isActive
                      ? 'bg-signal/15 text-signal font-semibold border border-signal/30'
                      : 'text-paper/70 hover:bg-white/5 hover:text-paper'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-signal' : 'text-paper/40'}`} />
                  {l.label}
                </NavLink>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
