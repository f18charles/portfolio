import { useState } from 'react'
import { motion } from 'framer-motion'
import { useContent } from '../context/ContentContext.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import PageWrapper from '../components/PageWrapper.jsx'
import { GithubIcon, LinkedinIcon } from '../components/Icons.jsx'
import { Mail, Copy, Check, Send, MessageSquare, ArrowUpRight } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function Contact() {
  const { content } = useContent()
  const { contact } = content
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = (e) => {
    navigator.clipboard.writeText(contact.email)
    setCopied(true)

    // Trigger subtle confetti burst
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (rect.left + rect.width / 2) / window.innerWidth
    const y = (rect.top + rect.height / 2) / window.innerHeight

    try {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { x, y },
        colors: ['#2ED67A', '#607AFE', '#C084FC'],
      })
    } catch {
      // Fallback silently if canvas is unavailable
    }

    setTimeout(() => setCopied(false), 2000)
  }

  const contactChannels = [
    {
      label: 'Email Inbox',
      value: contact.email,
      href: `mailto:${contact.email}`,
      icon: Mail,
      accent: 'text-signal',
      border: 'hover:border-signal/50',
      action: 'Send Message',
    },
    {
      label: 'GitHub Profile',
      value: contact.github ? contact.github.replace('https://', '') : 'github.com/f18charles',
      href: contact.github,
      icon: GithubIcon,
      accent: 'text-cobalt-soft',
      border: 'hover:border-cobalt-soft/50',
      action: 'Follow & Connect',
    },
    {
      label: 'LinkedIn Network',
      value: 'linkedin.com/in/favorowuor',
      href: contact.linkedin,
      icon: LinkedinIcon,
      accent: 'text-violet-soft',
      border: 'hover:border-violet-soft/50',
      action: 'Connect',
    },
  ]

  return (
    <PageWrapper className="mx-auto max-w-4xl px-6 py-20 md:py-24">
      {/* Header */}
      <SectionLabel>contact --initiate-handshake</SectionLabel>
      <h1 className="font-display text-6xl tracking-wide md:text-7xl">
        Let&apos;s <span className="neon-gradient-text">Build Together</span>
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/80">
        {contact.message}
      </p>

      {/* Quick Direct Email Banner */}
      <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-xl border border-white/10 bg-ink-surface/80 p-6 backdrop-blur-md neon-card">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-signal/10 border border-signal/30 text-signal shadow-[0_0_15px_rgba(46,214,122,0.3)]">
            <Mail className="h-6 w-6" />
          </div>
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-paper/50 block">Direct Channel</span>
            <span className="font-mono text-base font-semibold text-paper selection:bg-signal selection:text-ink">
              {contact.email}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 font-mono text-xs text-paper/90 transition-all hover:border-signal/50 hover:text-signal active:scale-95"
            title="Copy email to clipboard"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-signal animate-bounce" />
                <span className="text-signal font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-paper/60" />
                <span>Copy Address</span>
              </>
            )}
          </button>

          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-2 rounded-lg bg-signal px-5 py-2.5 font-mono text-xs font-semibold text-ink shadow-[0_0_15px_rgba(46,214,122,0.4)] transition-all hover:bg-signal-soft hover:shadow-[0_0_20px_rgba(46,214,122,0.6)] active:scale-95"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Compose</span>
          </a>
        </div>
      </div>

      {/* Network Links Grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {contactChannels.map((ch) => {
          const Icon = ch.icon
          return (
            <a
              key={ch.label}
              href={ch.href}
              target="_blank"
              rel="noreferrer"
              className={`group flex flex-col justify-between rounded-xl border border-white/10 bg-ink-surface/50 p-5 backdrop-blur-sm transition-all ${ch.border} hover:bg-white/[0.04]`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`h-5 w-5 ${ch.accent}`} />
                <ArrowUpRight className="h-4 w-4 text-paper/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper" />
              </div>

              <div className="mt-6">
                <span className="font-mono text-[11px] uppercase tracking-wider text-paper/40 block">
                  {ch.label}
                </span>
                <span className="font-mono text-xs text-paper/90 group-hover:text-white mt-1 block truncate">
                  {ch.value}
                </span>
              </div>
            </a>
          )
        })}
      </div>

      {/* Availability Card */}
      <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-signal font-semibold">
            Status: Active & Ready for New Challenges
          </span>
        </div>
        <p className="mt-3 font-mono text-xs text-paper/60 leading-relaxed">
          Open to backend engineering, distributed systems, AI integrations, and full-stack software development opportunities worldwide.
        </p>
      </div>
    </PageWrapper>
  )
}
