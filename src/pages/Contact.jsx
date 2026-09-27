import { useState } from 'react'
import { useContent } from '../context/ContentContext.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import PageWrapper from '../components/PageWrapper.jsx'
import { GithubIcon, LinkedinIcon, DevToIcon, XIcon } from '../components/Icons.jsx'
import { Mail, Copy, Check, Send, ArrowUpRight, FileText } from 'lucide-react'
import confetti from 'canvas-confetti'

const pretty = (url) => (url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : '')

export default function Contact() {
  const { content } = useContent()
  const { contact } = content
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = (e) => {
    navigator.clipboard.writeText(contact.email)
    setCopied(true)

    const rect = e.currentTarget.getBoundingClientRect()
    const x = (rect.left + rect.width / 2) / window.innerWidth
    const y = (rect.top + rect.height / 2) / window.innerHeight

    try {
      confetti({
        particleCount: 18,
        spread: 40,
        origin: { x, y },
        colors: ['#607AFE', '#2ED67A'],
      })
    } catch {
      // Ignore if canvas is unavailable
    }

    setTimeout(() => setCopied(false), 2000)
  }

  const contactChannels = [
    {
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
      icon: Mail,
    },
    {
      label: 'GitHub',
      value: pretty(contact.github) || 'github.com/f18charles',
      href: contact.github,
      icon: GithubIcon,
    },
    {
      label: 'LinkedIn',
      value: pretty(contact.linkedin) || 'linkedin.com/in/favorowuor',
      href: contact.linkedin,
      icon: LinkedinIcon,
    },
    {
      label: 'Dev.to',
      value: pretty(contact.devto) || 'dev.to/f18charles',
      href: contact.devto,
      icon: DevToIcon,
    },
    {
      label: 'X',
      value: pretty(contact.x) || 'x.com/f18charles',
      href: contact.x,
      icon: XIcon,
    },
    {
      label: 'Résumé',
      value: 'View · Print · PDF · DOCX',
      href: '/resume',
      icon: FileText,
    },
  ].filter((ch) => ch.href)

  return (
    <PageWrapper className="mx-auto max-w-4xl px-6 py-20 md:py-24">
      {/* Header */}
      <SectionLabel>contact</SectionLabel>
      <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
        Let&apos;s build together
      </h1>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper/80">{contact.message}</p>

      {/* Direct email */}
      <div className="card mt-10 flex flex-col items-stretch justify-between gap-4 rounded-xl p-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-paper/60">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-[11px] text-paper/45">Direct email</span>
            <span className="font-mono text-sm text-paper">{contact.email}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 font-mono text-xs text-paper/80 transition-colors hover:border-white/30 hover:text-paper"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 opacity-70" />
                <span>Copy</span>
              </>
            )}
          </button>

          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-2 rounded-lg bg-cobalt px-5 py-2.5 font-mono text-xs font-medium text-paper transition-colors hover:bg-cobalt-soft"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Compose</span>
          </a>
        </div>
      </div>

      {/* Channels */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contactChannels.map((ch) => {
          const Icon = ch.icon
          return (
            <a
              key={ch.label}
              href={ch.href}
              target="_blank"
              rel="noreferrer"
              className="card group flex flex-col justify-between rounded-xl p-5"
            >
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5 text-paper/45" />
                <ArrowUpRight className="h-4 w-4 text-paper/35 transition-transform group-hover:translate-x-0.5" />
              </div>

              <div className="mt-6">
                <span className="block text-[11px] text-paper/45">{ch.label}</span>
                <span className="mt-1 block truncate font-mono text-xs text-paper/85">
                  {ch.value}
                </span>
              </div>
            </a>
          )
        })}
      </div>

      {/* Availability */}
      <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-6">
        <span className="inline-flex items-center gap-2 font-mono text-xs text-signal">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" />
          Available for new opportunities
        </span>
        <p className="mt-3 text-xs leading-relaxed text-paper/60">
          Open to backend engineering, distributed systems, AI integrations, and full-stack software
          development opportunities worldwide.
        </p>
      </div>
    </PageWrapper>
  )
}
