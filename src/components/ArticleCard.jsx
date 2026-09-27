import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowUpRight, BookOpen } from 'lucide-react'
import { DevToIcon, XIcon } from './Icons.jsx'

const sourceStyles = {
  'dev.to': {
    Icon: DevToIcon,
    label: 'dev.to',
    accent: 'text-cobalt-soft',
    badge: 'border-cobalt-soft/30 bg-cobalt/10 text-cobalt-soft',
  },
  x: {
    Icon: XIcon,
    label: 'X / Twitter',
    accent: 'text-paper',
    badge: 'border-white/20 bg-white/5 text-paper',
  },
}

const fallbackSource = {
  Icon: BookOpen,
  label: 'Article',
  accent: 'text-signal',
  badge: 'border-signal/30 bg-signal/10 text-signal',
}

export default function ArticleCard({ article, index = 0, featured = false }) {
  const source = sourceStyles[article.source] || fallbackSource
  const SourceIcon = source.Icon

  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-ink-surface/80 p-6 backdrop-blur-md transition-all duration-300 hover:border-signal/50 hover:shadow-[0_0_25px_-5px_rgba(46,214,122,0.25)] ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-signal/10 blur-3xl transition-opacity duration-300 group-hover:bg-signal/20"
      />

      <div className="relative">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${source.badge}`}
          >
            <SourceIcon className="h-3 w-3" />
            {source.label}
          </span>
          <span className="font-mono text-[10px] text-paper/40">0{index + 1}</span>
        </div>

        <h3
          className={`mt-4 font-display tracking-wide text-paper transition-colors group-hover:text-white ${
            featured ? 'text-3xl md:text-4xl' : 'text-2xl'
          }`}
        >
          {article.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-paper/70">{article.excerpt}</p>

        {article.tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-paper/60"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="relative mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-4 font-mono text-[11px] text-paper/50">
        <div className="flex items-center gap-4">
          {article.date && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-paper/40" />
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          )}
          {article.readTime && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-paper/40" />
              {article.readTime}
            </span>
          )}
        </div>

        <span className={`inline-flex items-center gap-1 font-semibold ${source.accent}`}>
          Read
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.a>
  )
}
